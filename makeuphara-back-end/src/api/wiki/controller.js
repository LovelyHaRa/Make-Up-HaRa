import Joi from '@hapi/joi';
import Document, { WikiTitle } from '../../database/models/document';

export const write = async ctx => {
  const { id } = ctx.params;
  if (id === null) {
    ctx.status = 404;
    return;
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
