import Joi from '@hapi/joi';
import Document, { Title } from '../../database/models/document';

export const write = async ctx => {
  const { id } = ctx.params;
  if (id === null) {
    ctx.status = 404;
    return;
  }
};
