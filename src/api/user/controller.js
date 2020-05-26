import User from '../../database/models/user';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';

const isExistUsername = async (ctx, username) => {
  try {
    const exists = await User.findByName(username);
    const existsid = await User.findByUsername(username);
    return !!exists || !!existsid;
  } catch (error) {
    ctx.throw(500, error);
  }
};

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
 * ID 중복 체크
 * POST /api/user/check/username
 */
export const checkUsername = async (ctx) => {
  const { username } = ctx.request.body;
  let existUserName = {};
  const reg = /^[A-Za-z0-9_]{4,20}$/;
  try {
    const exists = await isExistUsername(ctx, username);
    existUserName.result = exists ? false : true;
    if (exists) {
      existUserName.message = '사용할 수 없는 ID입니다.';
    } else if (!exists) {
      if (!reg.test(username)) {
        existUserName.result = false;
        existUserName.message =
          '4자 이상 20자 이하, 영문/숫자/_을 조합하여 사용할 수 있습니다';
      }
    }
    ctx.body = existUserName;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 이름 중복 체크
 * POST /api/user/check/name
 */
export const checkName = async (ctx) => {
  const { username, name } = ctx.request.body;
  let existName = {};
  try {
    const exists = await isExistName(ctx, name);
    existName.result = exists ? false : true;
    if (exists) {
      if (name === username && name !== '') {
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
 * PATCH /api/user/profile
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

/**
 * 마이페이지 비밀번호 변경
 * PATCH /api/user/password
 */
export const changePassword = async (ctx) => {
  /* validate */
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
  });
  /* validate result */
  const result = schema.validate(ctx.request.body);
  /* validate failure */
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
  }
  const { id, password, newPassword } = ctx.request.body;
  const { _id } = ctx.state.user;
  if (_id !== id) {
    ctx.status = 401;
    return;
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const vaild = await user.checkPassword(password);
    if (!vaild) {
      ctx.status = 412;
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateUser = await User.findByIdAndUpdate(
      id,
      { hashedPassword },
      { new: true },
    );
    ctx.body = updateUser.serialize();
  } catch (error) {
    ctx.throw(500, error);
  }
};
