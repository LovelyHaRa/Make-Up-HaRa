import User from '../../database/models/user';
import Joi from '@hapi/joi';

// 이름 검색
const isExistName = async (ctx, name) => {
  try {
    const exists = await User.findByName(name);
    const existsid = await User.findByUsername(name);
    return !!exists || !!existsid;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 마이페이지 이름 중복 체크
 * POST /api/user/checkName
 */
export const checkName = async (ctx) => {
  const { name } = ctx.request.body;
  const { username } = ctx.state.user;
  let existName = {};
  try {
    const exists = await isExistName(ctx, name);
    existName.result = exists ? false : true;
    if (exists) {
      if (name === username) {
        existName.result = true;
      } else {
        existName.message = '이미 사용중인 이름입니다.';
      }
    } else if (!exists) {
      if (name === '') {
        existName.result = false;
        existName.message = '이름을 입력해 주십시오.';
      } else if (name && name.includes(' ')) {
        existName.result = false;
        existName.message = '공백은 포함될 수없습니다.';
      }
    }
    ctx.body = existName;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 마이페이지 이름 수정
 * PATCH /api/user/updateName
 */
export const updateName = async (ctx) => {
  /* validate */
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
  });
  /* validate result */
  const result = schema.validate(ctx.request.body);
  /* validate failure */
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
  }
  const { id, name } = ctx.request.body;
  const { _id, username } = ctx.state.user;
  if (_id !== id) {
    ctx.status = 401;
    return;
  }
  const exists = await isExistName(ctx, name);
  if (exists || (!exists && name === '')) {
    if (name !== username) {
      ctx.status = 409;
      return;
    }
  }
  try {
    const user = await User.findByIdAndUpdate(id, { name }, { new: true });
    if (!user) {
      ctx.status = 404;
      return;
    }
    ctx.body = user.serialize();
    // jwt 토큰 재발급
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};
