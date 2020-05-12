/* HTML 태그 필터링 */
export default {
  allowedTags: [
    'h1',
    'h2',
    'blockquote',
    'p',
    'a',
    'ul',
    'ol',
    'nl',
    'li',
    'b',
    'i',
    'del',
    'embed',
    'ins',
    'strong',
    's',
    'em',
    'strike',
    'code',
    'hr',
    'br',
    'div',
    'table',
    'thead',
    'caption',
    'tbody',
    'tr',
    'th',
    'td',
    'pre',
    'iframe',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src', 'width'],
    li: ['class'],
    iframe: ['src', 'class', 'frameborder', 'allowfullscreen'],
    p: ['class'],
    b: ['class'],
  },
  allowedSchemes: ['data', 'http', 'https'],
  allowedIframeHostnames: ['www.youtube.com', 'youtu.be'],
};
