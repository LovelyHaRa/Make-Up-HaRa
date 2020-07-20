import Post from '../../database/models/post';
import { WikiTitle } from '../../database/models/document';

// react native 전용 통합 검색 API
export const totalSearch = async (ctx) => {
  /* parameter 설정 */
  const page = parseInt(ctx.query.page || '1', 10);
  const block = parseInt(ctx.query.block || '10', 10);
  if (page < 1 || block < 1) {
    ctx.status = 400; // Bad Request
    return;
  }
  /* 필터링 정보 */
  const { query } = ctx.query;
  if (!query || query === '') {
    ctx.status = 404; // Not Found
    return;
  }
  const postQuery = {
    $or: [
      { title: { $regex: '.*' + query + '.*', $options: 'i' } },
      { body: { $regex: '.*' + query + '.*', $options: 'i' } },
    ],
  };
  const wikiQuery = {
    name: { $regex: '.*' + query + '.*', $options: 'i' },
    lately: { $gt: 0 },
  };

  try {
    const postList = await Post.find(postQuery)
      .sort({ _id: -1 })
      .skip((page - 1) * block)
      .limit(block)
      .lean();
    const documentList = await WikiTitle.find(wikiQuery)
      .sort({ _id: -1 })
      .skip((page - 1) * block)
      .limit(block)
      .lean();
    const totalList = documentList.concat(postList);
    ctx.body = totalList;
  } catch (error) {
    ctx.throw(500, error);
  }
};
