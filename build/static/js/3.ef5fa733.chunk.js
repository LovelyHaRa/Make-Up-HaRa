(this["webpackJsonpmakeuphara-front-end"]=this["webpackJsonpmakeuphara-front-end"]||[]).push([[3],{159:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(45),c=n(8),o=n(18),s=n.n(o),u=n(20),i=n(2),m=n(1),p=n(21),E=n(24),f=n(10),b=n(61),h=n(51);function d(){var e=Object(i.a)(["\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  &:first-child {\n    padding-top: 0;\n  }\n  & + & {\n    border-top: 1px solid ",";\n  }\n  h2 {\n    font-size: 1.5rem;\n    font-weight: 500;\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n  }\n  .tags {\n    display: flex;\n    justify-content: flex-end;\n  }\n  & > a {\n    margin-top: 1rem;\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n  }\n"]);return d=function(){return e},e}var g=m.c.div(d(),(function(e){return e.theme.postBorder}),(function(e){return e.theme.text}),(function(e){return e.theme.hoverText}),(function(e){return e.theme.text}),(function(e){return e.theme.hoverText})),v=function(e){var t=e.post,n=e.username,r=t._id,l=t.title,c=t.body,o=t.tags,s=t.publisher,u=t.publishedDate;return a.a.createElement(g,null,a.a.createElement("h2",null,a.a.createElement(f.b,{to:"/blog/@".concat(s.username,"/").concat(r)},l)),a.a.createElement(b.a,{username:s.username,publishedDate:u}),a.a.createElement(h.a,{tags:o,username:n}),a.a.createElement(f.b,{to:"/blog/@".concat(s.username,"/").concat(r)},c))},O=n(27),j=n(25);function k(){var e=Object(i.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  .title {\n    font-size: 1.25rem;\n    color: ",";\n  }\n  .sub-title {\n    font-size: 1rem;\n  }\n"]);return k=function(){return e},e}function L(){var e=Object(i.a)(["\n  margin-top: 3rem;\n"]);return L=function(){return e},e}function T(){var e=Object(i.a)(["\n  margin-top: 3rem;\n"]);return T=function(){return e},e}var x=m.c.div(T()),A=Object(m.c)(j.a)(L()),D=m.c.div(k(),(function(e){return e.theme.text})),w=function(e){return e.isDarkTheme?a.a.createElement(E.b,{violet:"true",to:"/blog/write"},"\ud3ec\uc2a4\ud2b8 \uc791\uc131"):a.a.createElement(E.b,{cyan:"true",to:"/blog/write"},"\ud3ec\uc2a4\ud2b8 \uc791\uc131")},y=function(e){var t=e.postList,n=e.loading,r=e.error,l=e.showWriteButton,c=e.isDarkTheme,o=e.username,s=e.tag;return r?a.a.createElement(p.a,null,a.a.createElement(A,null,a.a.createElement("span",{className:"error-title"},"\ube14\ub85c\uadf8 \ub9ac\uc2a4\ud2b8 \uc694\uccad \uc2e4\ud328."),a.a.createElement("span",{className:"error-msg"},"ERROR MESSAGE: ",r.message))):a.a.createElement(p.a,null,a.a.createElement(x,null,a.a.createElement(O.a,null,o&&a.a.createElement("title",null,o," - MAKE UP HARA :: BLOG"),s&&a.a.createElement("title",null,"#",s," - MAKE UP HARA :: BLOG"),o&&s&&a.a.createElement("title",null,o,"#",s," - MAKE UP HARA :: BLOG")),a.a.createElement(D,null,a.a.createElement("span",{className:"title"},"BLOG",o&&!s&&a.a.createElement("span",null," ","- ",a.a.createElement("span",{className:"sub-title"},o)),s&&!o&&a.a.createElement("span",null," ","- ",a.a.createElement("span",{className:"sub-title"},"#",s)),o&&s&&a.a.createElement("span",null," ","- ",a.a.createElement("span",{className:"sub-title"},o),a.a.createElement("span",{className:"sub-title"},"#",s))),l&&a.a.createElement(w,{isDarkTheme:c})),!n&&t&&a.a.createElement("div",null,t.map((function(e){return a.a.createElement(v,{post:e,username:o,key:e._id})})))))},B=n(83),N=Object(B.a)((function(){return Promise.resolve().then(n.bind(null,97))}));t.default=Object(l.e)((function(e){var t=e.location,n=e.match,l=Object(c.b)(),o=Object(c.c)((function(e){var t=e.post,n=e.loading,r=e.user,a=e.theme;return{postList:t.postList,error:t.postListError,loading:n["post/GET_LIST"],user:r.user,isDarkTheme:a.isDarkTheme}})),i=o.postList,m=o.error,p=o.loading,E=o.user,f=o.isDarkTheme,b=n.params.username,h=s.a.parse(t.search,{ignoreQueryPrefix:!0}),d=h.tag,g=h.page,v=Object(r.useRef)(!1);return Object(r.useEffect)((function(){return l(Object(u.c)({username:b,tag:d,page:g})),v.current=!0,function(){l(Object(u.h)()),v.current=!1}}),[l,d,g,b]),a.a.createElement(a.a.Fragment,null,a.a.createElement(y,{loading:p,error:m,postList:i,showWriteButton:E,isDarkTheme:f,username:b,tag:d}),v.current&&!m&&a.a.createElement(N,null))}))}}]);
//# sourceMappingURL=3.ef5fa733.chunk.js.map