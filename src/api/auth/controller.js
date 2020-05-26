import Joi from '@hapi/joi';
import User from '../../database/models/user';
import axios from 'axios';

export const register = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password, name } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409;
      return;
    }
    const user = new User({
      username,
      name,
      provider: 'local',
    });
    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const vaild = await user.checkPassword(password);
    if (!vaild) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    // jwt 토큰 발급
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const loginWithGoogle = async (ctx) => {
  try {
    const { id_token } = ctx.request.body;
    // id_token 기반으로 프로필 정보 요청
    let userinfo;
    await axios
      .get('https://oauth2.googleapis.com/tokeninfo?id_token=' + id_token)
      .then((response) => {
        userinfo = response.status === 200 && response.data;
      })
      .catch((error) => {
        ctx.throw(error.response.status || 500, error);
      });

    // 사용자 인증
    const { email } = userinfo;
    let user = await User.findByUsername(email);
    if (!user) {
      user = new User({
        username: email,
        name: email,
        provider: 'google',
      });
      await user.save();
    }

    ctx.body = user.serialize();
    // jwt 토큰 발급
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const loginWithNaver = async (ctx) => {
  // 변수 세팅
  const { client_id, client_secret, code, state } = ctx.request.body;

  // access_token 요청
  let data;
  let requestUrl =
    'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code';
  requestUrl += '&client_id=' + client_id;
  requestUrl += '&client_secret=' + client_secret;
  requestUrl += '&code=' + code;
  requestUrl += '&state=' + state;
  await axios
    .get(requestUrl)
    .then((response) => {
      data = response.status === 200 && response.data;
    })
    .catch((error) => {
      ctx.throw(error.response.status || 500, error);
    });

  // 프로필 요청
  let profile;
  const header = 'Bearer ' + data.access_token;
  await axios
    .get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: header },
    })
    .then((response) => {
      profile = response.status === 200 && response.data;
    })
    .catch((error) => {
      ctx.throw(error.response.status || 500, error);
    });

  // 사용자 인증
  const email = profile.response.email;
  let user = await User.findByUsername(email);
  if (!user) {
    user = new User({
      username: email,
      name: email,
      provider: 'naver',
    });
    await user.save();
  }

  ctx.body = user.serialize();
  // jwt 토큰 발급
  const token = user.generateToken();
  ctx.cookies.set('access_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
};

export const loginWithKakao = async (ctx) => {
  // 변수 세팅
  const { client_id, client_secret, code } = ctx.request.body;
  let data;
  let requestUrl =
    'https://kauth.kakao.com/oauth/token?grant_type=authorization_code';
  requestUrl += '&client_id=' + client_id;
  requestUrl += '&client_secret=' + client_secret;
  requestUrl += '&code=' + code;
  await axios
    .get(requestUrl)
    .then((response) => {
      data = response.status === 200 && response.data;
    })
    .catch((error) => {
      // ctx.throw(error.response.status || 500, error);
      console.dir(error);
    });

  // access_token 요청
  if (!data) {
    ctx.status = 500;
    return;
  }
  const { access_token } = data;

  // 프로필 요청
  let profile;
  const header = 'Bearer ' + access_token;
  await axios
    .get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: header },
    })
    .then((response) => {
      profile = response.status === 200 && response.data;
    })
    .catch((error) => {
      console.dir(error);
    });
  console.dir(profile);
  // 사용자 인증
  const email = profile.kakao_account.email;
  if (!email) {
    ctx.status = 400;
    ctx.body = JSON.parse({ message: '이메일을 가져오는데 실패했습니다.' });
  }
  let user = await User.findByUsername(email);
  if (!user) {
    user = new User({
      username: email,
      name: email,
      provider: 'kakao',
    });
    await user.save();
  }

  ctx.body = user.serialize();
  // jwt 토큰 발급
  const token = user.generateToken();
  ctx.cookies.set('access_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
};

export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

export const logout = (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
