import Joi from '@hapi/joi';
import Document, { WikiTitle } from '../../database/models/document';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import SanitizeOption from '../../lib/sanitize-html/SanitizeOption';

export const getTitleById = async (ctx, next) => {
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
    const title = await WikiTitle.findById(id); // 타이틀 검색
    if (!title) {
      ctx.status = 404; // Not Found
      return;
    }
    // 4. 컨텍스트에 타이틀 삽입
    ctx.state.wikititle = title; // 타이틀 상태 저장
    return next(); // 다음 미들웨어 호출
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const getTitle = async ctx => {
  ctx.body = ctx.state.wikititle;
};

export const write = async ctx => {
  /* validate */
  const schema = Joi.object().keys({
    body: Joi.string().required(),
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
  try {
    const { _id, lately } = { ...ctx.state.wikititle._doc };
    const title = await WikiTitle.findByIdAndUpdate(
      _id,
      { lately: lately + 1 },
      { new: true },
    );
    const revision = title._doc.lately;
    const { body } = ctx.request.body;
    const document = new Document({
      title: title,
      body: sanitizeHtml(body, SanitizeOption),
      publisher: ctx.state.user,
      revision,
    });

    await document.save();
    ctx.body = document;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const requestDocument = async ctx => {
  try {
    const titleList = await WikiTitle.find({ lately: 0 }).lean();
    ctx.body = titleList.map(title => ({
      ...title,
      name:
        title.name.length < 50 ? title.name : `${title.name.slice(0, 50)}...`,
    }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const addTitle = async ctx => {
  const { name } = ctx.request.body;
  const title = new WikiTitle({
    name,
    lately: 0,
  });
  try {
    await title.save();
    ctx.body = title;
  } catch (error) {
    ctx.throw(500, error);
  }
};
