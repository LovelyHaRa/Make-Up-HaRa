import Joi from '@hapi/joi';
import Post from '../../database/models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import SanitizeOption from '../../lib/sanitize-html/SanitizeOption';
import moment from 'moment';

// html 태그 필터링
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, { allowedTags: [] });
  return filtered.length < 150 ? filtered : `${filtered.slice(0, 150)}...`;
};

/**
 * 포스트 작성 API
 * GET /api/post/list
 */
export const list = async (ctx) => {
  /* parameter 설정 */
  const page = parseInt(ctx.query.page || '1', 10);
  const block = parseInt(ctx.query.block || '10', 10);
  if (page < 1 || block < 1) {
    ctx.status = 400; // Bad Request
    return;
  }
  /* 필터링 정보 */
  const { tag, username, query, oldest } = ctx.query;
  const day = parseInt(ctx.query.day || '0', 10);
  const queryObj = {
    ...(username ? { 'publisher.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
    ...(query
      ? {
          $or: [
            { title: { $regex: '.*' + query + '.*', $options: 'i' } },
            { body: { $regex: '.*' + query + '.*', $options: 'i' } },
          ],
        }
      : {}),
    ...(day > 0
      ? { publishedDate: { $gte: moment().subtract(day, 'days') } }
      : {}),
  };
  const sortObj = {
    _id: oldest && oldest === 'true' ? 1 : -1,
  };
  /* 데이터베이스 검색 */
  try {
    const postList = await Post.find(queryObj)
      .sort(sortObj)
      .skip((page - 1) * block)
      .limit(block)
      .lean();
    const postCount = await Post.countDocuments(queryObj);
    ctx.set('Makeuphara-Post-Count', postCount);
    ctx.set('Makeuphara-Post-Last-Page', Math.ceil(postCount / block));
    ctx.body = postList.map((post) => ({
      ...post,
      title:
        post.title.length < 50 ? post.title : `${post.title.slice(0, 150)}...`,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

/* post 정보를 state에 저장하는 미들웨어 */
export const getPostById = async (ctx, next) => {
  // 1. 파라미터 추출
  const { id } = ctx.params;
  // 2. ObjectId 검증
  const { ObjectId } = mongoose.Types;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    // 3. 데이터베이스 검색
    const post = await Post.findById(id); // 포스트 검색
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    // 4. 컨텍스트에 포스트 삽입
    ctx.state.post = post; // 포스트 상태 저장
    return next(); // 다음 미들웨어 호출
  } catch (error) {
    ctx.throw(500, error);
  }
};

/* publisher 검증 */
export const isPublisher = (ctx, next) => {
  // 1. 컨텍스트 추출
  const { user, post } = ctx.state;
  // 2. 로그인 유저와 퍼블리셔 일치여부 확인
  if (post.publisher._id.toString() !== user._id) {
    ctx.status = 403; //Forbidden
    return;
  }
  return next();
};

/**
 * 특정 포스트 불러오기 API
 * POST /api/post/:id
 */
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

/**
 * 포스트 작성 API
 * POST /api/post/write
 */
export const write = async (ctx) => {
  /* validate */
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  });
  /* validate result */
  const result = schema.validate(ctx.request.body);
  /* validate failure */
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  /* data push */
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, SanitizeOption),
    tags,
    publisher: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 포스트 수정 API
 * PATCH /api/post/:id
 */
export const update = async (ctx) => {
  /* params */
  const { id } = ctx.params;
  /* validate */
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  });
  /* validate result */
  const result = schema.validate(ctx.request.body);
  /* validate failure */
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
  }
  /* data push */
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, SanitizeOption);
  }
  nextData.publisher = ctx.state.user;
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true,
    });
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 포스트 삭제 API
 * DELETE /api/post/:id
 */
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    // remove는 이전 버전에서 사용
    await Post.findByIdAndDelete(id);
    ctx.status = 204;
  } catch (error) {
    ctx.throw(500, error);
  }
};
