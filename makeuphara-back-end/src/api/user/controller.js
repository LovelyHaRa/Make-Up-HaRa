import User from '../../database/models/user';

export const checkExistName = async (ctx) => {
  const { name } = ctx.request.body;
  let existName = {};
  try {
    const exists = await User.findByName(name);
    existName.result = exists ? false : true;
    if (exists) {
      existName.message = '이미 사용중인 이름입니다.';
    } else if (!exists && name === '') {
      existName.result = false;
      existName.message = '이름을 입력해 주십시오.';
    }
    ctx.body = existName;
  } catch (error) {
    ctx.throw(500, error);
  }
};
