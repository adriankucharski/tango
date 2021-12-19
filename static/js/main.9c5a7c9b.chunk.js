(this.webpackJsonptango=this.webpackJsonptango||[]).push([[0],{138:function(e,t,n){},142:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(19),s=n.n(r),o=n(29),i=n(10),l=n(9),u=n.n(l),d=n(13),j=n(3),b=n(12),h=n.n(b),f=n(155),m=n(16),p=n(1),x="auth",O="https://146.59.45.158:8080",v={authState:null,setAuth:function(e){return null},getAuthState:function(){return null}},g=Object(a.createContext)(v),w=function(e){h.a.defaults.headers.post.Authorization=e.token,h.a.defaults.headers.post["Content-Type"]="application/json",h.a.defaults.headers.get.Authorization=e.token,h.a.defaults.headers.get["Content-Type"]="application/json",h.a.defaults.headers.put.Authorization=e.token},N=function(e){var t=e.children,n=Object(a.useState)(null),c=Object(j.a)(n,2),r=c[0],s=c[1],o=Object(a.useCallback)((function(){try{var e=localStorage.getItem(x);if(!e)throw"No data in local storage";var t=JSON.parse(e);return w(t),s(t),t}catch(n){s(null)}return null}),[]),i=Object(a.useCallback)((function(e){try{localStorage.setItem(x,JSON.stringify(e)),e&&w(e),s(e)}catch(t){s(null),Promise.reject(t)}}),[]);return Object(a.useEffect)((function(){o()}),[]),Object(p.jsx)(g.Provider,{value:{authState:r,setAuth:i,getAuthState:o},children:t})},C=function(){var e=Object(a.useContext)(g),t=e.authState,n=e.setAuth,c=Object(a.useState)(""),r=Object(j.a)(c,2),s=r[0],l=r[1],b=Object(a.useState)(""),v=Object(j.a)(b,2),w=v[0],N=v[1],C=Object(a.useState)(""),k=Object(j.a)(C,2),y=k[0],S=k[1],I=Object(i.f)(),B=function(){var e=Object(d.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={username:w,password:y},e.next=4,h.a.post("".concat(O,"/public/login"),a).then((function(e){var t=e.data;localStorage.setItem(x,JSON.stringify(t)),n(t),I("/tango")})).catch((function(e){l("Username or password are invalid"),n(null)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){t&&I("/")}),[]),Object(p.jsx)(f.a,{onSubmit:B,className:"bg-trello h-[100vh] w-[100%] flex justify-center flex-col",children:Object(p.jsxs)("div",{className:"w-80 mx-auto my-0 flex flex-col align-middle",children:[Object(p.jsxs)(f.a.Group,{controlId:"username",className:"p-2 text-white",children:[Object(p.jsx)(f.a.Label,{children:"Username"}),Object(p.jsx)(f.a.Control,{autoFocus:!0,type:"username",value:w,onChange:function(e){return N(e.target.value)}})]}),Object(p.jsxs)(f.a.Group,{controlId:"password",className:"p-2 text-white",children:[Object(p.jsx)(f.a.Label,{children:"Password"}),Object(p.jsx)(f.a.Control,{type:"password",value:y,onChange:function(e){return S(e.target.value)}})]}),Object(p.jsx)(m.a,{className:"m-4",size:"lg",type:"submit",disabled:!(w.length>0&&y.length>0),children:"Sign-in"}),Object(p.jsx)("p",{className:"text-center text-white bg-[#ff000066] rounded-lg",children:s}),Object(p.jsx)(o.b,{to:"/tango/registration",className:"text-center",children:Object(p.jsx)(m.a,{className:"m-4",size:"sm",variant:"secondary",children:"Create new account"})})]})})},k=n(62),y=n.n(k),S=function(e){var t=e.id,n=e.name,a=Object(i.f)();return Object(p.jsx)(m.a,{onClick:function(e){a("/tango/board/".concat(t,"/").concat(n))},className:"h-[80px]",children:n})},I=n(157),B=function(e){var t=e.boards,n=Object(a.useState)(!1),c=Object(j.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)(""),i=Object(j.a)(o,2),l=i[0],b=i[1],x=Object(a.useState)(""),v=Object(j.a)(x,2),g=v[0],w=v[1],N=Object(a.useCallback)((function(e){return new Promise(Object(d.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),n.next=3,h.a.post("".concat(O,"/board"),{name:l}).then((function(e){var n=e.data;t.push(n),s(!1)})).catch((function(e){w("error"),console.log(e)}));case 3:b("");case 4:case"end":return n.stop()}}),n)}))))}),[l]);return Object(p.jsxs)("div",{className:"max-w-screen-xl mx-auto ",children:[Object(p.jsx)("div",{className:"p-8 md:p-4 max-w-screen-md mx-auto text-white",children:Object(p.jsx)("h3",{children:"Boards"})}),Object(p.jsxs)("div",{className:"px-8 md:px-4 max-w-screen-md mx-auto grid grid-flow-row gap-3 sm:grid-cols-2 md:grid-cols-4",children:[t.map((function(e,t){return Object(p.jsx)(S,{id:e.id,name:e.name},t)})),Object(p.jsx)(m.a,{className:"h-[80px]",variant:"light",onClick:function(){return s(!0)},children:"Create new board"})]}),Object(p.jsxs)(I.a,{show:r,onHide:function(){b(""),w(""),s(!1)},size:"sm",children:[Object(p.jsx)(I.a.Header,{closeButton:!0,children:Object(p.jsx)(I.a.Title,{children:"Create new board"})}),Object(p.jsxs)(I.a.Body,{children:[Object(p.jsxs)(f.a,{onSubmit:N,children:[Object(p.jsx)(f.a.Group,{className:"mb-3",children:Object(p.jsx)(f.a.Control,{type:"text",placeholder:"Add board title",onChange:function(e){return b(e.currentTarget.value)}})}),Object(p.jsx)(m.a,{variant:"primary",type:"submit",children:"Create board"})]}),g&&Object(p.jsx)("p",{className:"text-red-500 pt-2 m-0",children:g})]})]})]})},D=function(){var e=Object(a.useState)(null),t=Object(j.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){h.a.get("".concat(O,"/board/all")).then((function(e){var t=e.data;c(t)})).catch((function(e){console.log(e),c([])}))}),[]),console.log(n),Object(p.jsx)("main",{className:"bg-trello h-[100vh] w-[fit-content] min-w-full",children:null===n?Object(p.jsx)(y.a,{type:"Puff"}):Object(p.jsx)(B,{boards:n})})},E=n(36),A=n(85),F=n(54),P=n(154),T=n(159),L=n(152),z=function(e){var t=e.openButtonName,n=e.addButtonName,c=e.closeButtonName,r=e.placeholder,s=e.submitFormCallback,o=e.className,i=e.buttonTextColor,l=Object(a.useState)(""),b=Object(j.a)(l,2),h=b[0],x=b[1],O=Object(a.useState)(!1),v=Object(j.a)(O,2),g=v[0],w=v[1],N=function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,s(h).then((function(){x(""),w(!1)})).catch((function(){}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(e){w(e)};return Object(p.jsx)(f.a,{onSubmit:N,className:o,children:g?Object(p.jsxs)("div",{className:"bg-[#ebecf0] p-1",children:[Object(p.jsx)(f.a.Group,{controlId:"name",className:"m-2",children:Object(p.jsx)(f.a.Control,{autoFocus:!0,type:"name",value:h,placeholder:r,onChange:function(e){return x(e.target.value)}})}),Object(p.jsx)(m.a,{className:"m-2",size:"sm",type:"submit",disabled:0===h.length,children:n}),Object(p.jsx)(m.a,{className:"m-2",size:"sm",variant:"danger",onClick:function(){return C(!1)},children:c})]}):Object(p.jsx)("button",{className:"!bg-[#ffffff3a] hover:!bg-[#0000009a] btn w-[100%]  ".concat(i),onClick:function(){return C(!0)},children:t})})},H=n(2),G=function(e){var t=e.name,n=e.submitCallback,c=e.className,r=e.buttonClassName,s=e.inputClassName,o=e.inputType,i=void 0===o?"text":o,l=Object(a.useState)(t),b=Object(j.a)(l,2),h=b[0],f=b[1],m=Object(a.useState)(!1),x=Object(j.a)(m,2),O=x[0],v=x[1],g=Object(a.useCallback)(Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n(h),v(!1);case 2:case"end":return e.stop()}}),e)}))),[h]),w="text"===i?Object(p.jsx)("input",{className:"w-[100%]  ".concat(s),onChange:function(e){return f(e.target.value)},onSubmit:g,onBlur:g,onKeyDown:function(e){return"Enter"===e.key&&g()},type:"text",autoFocus:!0,value:h}):Object(p.jsx)("textarea",{className:"w-[100%]  ".concat(s),onChange:function(e){return f(e.target.value)},onSubmit:g,onBlur:g,onKeyDown:function(e){return"Enter"===e.key&&g()},autoFocus:!0,value:h});return Object(p.jsx)("div",{className:"w-[100%] p-2 ".concat(c),children:O?w:Object(p.jsx)("button",{className:"w-[100%] font-bold ".concat(r),onClick:function(){return v(!0)},children:h})})},M=n(148),J=n(149),R=n(150),U=n(151),K=function(e){var t=e.show,n=e.description,a=e.cardName,c=e.card,r=e.errMsg,s=e.boardID,o=e.onCloseModal,i=e.submitChangeNameCallback,l=e.submitChangeDescriptionCallback,j=e.setDescriptionCallback,b=e.setDescription,x=!1,v=function(){var e=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x){e.next=6;break}return x=!0,n="".concat(O,"/board/").concat(s,"/list/").concat(null===t||void 0===t?void 0:t.listId,"/card/").concat(null===t||void 0===t?void 0:t.id),e.next=5,h.a.put(n,t).then((function(){window.location.reload()})).catch((function(e){}));case 5:x=!1;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c){e.next=2;break}return e.abrupt("return");case 2:return(t=Object(H.a)({},c)).state="DELETE",e.next=6,v(t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c){e.next=2;break}return e.abrupt("return");case 2:return(t=Object(H.a)({},c)).state="ARCHIVE",e.next=6,v(t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(p.jsxs)(I.a,{show:t,onHide:o,size:"lg",contentClassName:"!bg-[#e4ebf7]",children:[Object(p.jsx)(I.a.Header,{closeButton:!0,children:Object(p.jsxs)(I.a.Title,{className:"flex flex-row w-[100%] items-center",children:[Object(p.jsx)(M.a,{width:24,height:24}),Object(p.jsx)(G,{name:a,submitCallback:i,buttonClassName:"text-left"})]})}),Object(p.jsxs)(I.a.Body,{className:"flex gap-3",children:[Object(p.jsxs)("div",{className:"w-[80%]",children:[Object(p.jsxs)("div",{className:"flex flex-row w-[100%] items-center text-xl",children:[Object(p.jsx)(J.a,{width:24,height:24}),Object(p.jsx)("span",{className:"p-2",children:"Description"})]}),(null===c||void 0===c?void 0:c.description)?Object(p.jsx)("div",{className:"ml-6",children:Object(p.jsx)(G,{name:n,submitCallback:l,buttonClassName:"text-left",inputType:"textarea"})}):Object(p.jsxs)(f.a,{onSubmit:j,children:[Object(p.jsx)(f.a.Control,{className:"mb-3",value:n,as:"textarea",placeholder:"Add card description",onChange:function(e){return b(e.currentTarget.value)}}),Object(p.jsx)(m.a,{variant:"primary",type:"submit",children:"Save"})]})]}),Object(p.jsxs)("div",{className:"w-[20%] flex flex-col gap-2",children:[Object(p.jsx)("span",{className:"font-bold",children:"Actions"}),Object(p.jsx)(m.a,{variant:"secondary",className:"w-[100%]",onClick:w,children:Object(p.jsxs)("div",{className:"flex items-center",children:[Object(p.jsx)(R.a,{}),Object(p.jsx)("span",{className:"ml-2",children:"Archive"})]})}),Object(p.jsx)(m.a,{variant:"danger",className:"w-[100%]",onClick:g,children:Object(p.jsxs)("div",{className:"flex items-center",children:[Object(p.jsx)(U.a,{}),Object(p.jsx)("span",{className:"ml-2",children:"Delete"})]})})]}),r&&Object(p.jsx)("p",{className:"text-red-500 pt-2 m-0",children:r})]})]})},V=function(e){var t=e.id,n=e.name,c=e.items,r=Object(a.useState)(null),s=Object(j.a)(r,2),i=s[0],l=s[1],b=Object(a.useState)(!1),f=Object(j.a)(b,2),m=f[0],x=f[1],v=Object(a.useState)(!1),g=Object(j.a)(v,2),w=g[0],N=g[1],C=Object(a.useState)(""),k=Object(j.a)(C,2),y=k[0],S=(k[1],Object(a.useState)(null)),I=Object(j.a)(S,2),B=I[0],D=I[1],E=Object(a.useState)(""),A=Object(j.a)(E,2),P=A[0],L=A[1],M=Object(a.useState)(""),J=Object(j.a)(M,2),R=J[0],U=J[1],V=Object(o.c)(),q=Object(j.a)(V,2),Q=q[0],W=(q[1],Object(a.useState)(Q.get("id"))),X=Object(j.a)(W,2),Y=X[0],Z=(X[1],function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),$=Object(a.useCallback)(function(){var e=Object(d.a)(u.a.mark((function e(n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),a={id:null===B||void 0===B?void 0:B.id,description:P,listId:null===B||void 0===B?void 0:B.listId,position:null===B||void 0===B?void 0:B.position,name:R,state:null===B||void 0===B?void 0:B.state},e.next=4,h.a.put("".concat(O,"/board/").concat(Y,"/list/").concat(t,"/card/").concat(null===B||void 0===B?void 0:B.id),a).then((function(){B&&(B.description=P),N(!1)})).catch((function(e){l({variant:"danger",message:"Cannot set description"}),console.log(e),N(!1)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[R,P]),_=Object(a.useCallback)(function(){var e=Object(d.a)(u.a.mark((function e(n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n!==(null===B||void 0===B?void 0:B.description)){e.next=2;break}return e.abrupt("return");case 2:return a={name:null===B||void 0===B?void 0:B.name,listId:null===B||void 0===B?void 0:B.listId,position:null===B||void 0===B?void 0:B.position,description:n,state:null===B||void 0===B?void 0:B.state},e.next=5,h.a.put("".concat(O,"/board/").concat(Y,"/list/").concat(t,"/card/").concat(null===B||void 0===B?void 0:B.id),a).then((function(){B&&(B.description=n),L(n)})).catch((function(e){l({variant:"danger",message:"Cannot set description"}),N(!1)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[B]),ee=Object(a.useCallback)(function(){var e=Object(d.a)(u.a.mark((function e(n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n!==(null===B||void 0===B?void 0:B.name)){e.next=2;break}return e.abrupt("return");case 2:return a={name:n,listId:null===B||void 0===B?void 0:B.listId,position:null===B||void 0===B?void 0:B.position,description:P,state:null===B||void 0===B?void 0:B.state},e.next=5,h.a.put("".concat(O,"/board/").concat(Y,"/list/").concat(t,"/card/").concat(null===B||void 0===B?void 0:B.id),a).then((function(){B&&(B.name=n),U(n)})).catch((function(e){l({variant:"danger",message:"Cannot set description"}),N(!1)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[B]);return Object(p.jsxs)("div",{className:"w-[272px] bg-[#ebecf0] m-2 h-[fit-content]",children:[Object(p.jsx)(G,{name:n,submitCallback:Z}),Object(p.jsx)(F.c,{droppableId:"".concat(t),children:function(e){var t;return Object(p.jsxs)("div",Object(H.a)(Object(H.a)({className:"w-[272px] min-h-[30px]"},e.droppableProps),{},{ref:e.innerRef,children:[null===(t=c)||void 0===t?void 0:t.map((function(e,t){return Object(p.jsx)(F.b,{draggableId:"".concat(e.id),index:t,children:function(t){return Object(p.jsx)("div",Object(H.a)(Object(H.a)(Object(H.a)({ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{onClick:function(){return function(e){D(e),L(e.description),U(e.name),N(!0)}(e)},className:"bg-white rounded-sm m-2 p-3",children:e.name}))}},e.id)})),e.placeholder]}))}},"".concat(t).concat(n)),Object(p.jsx)(K,{show:w,cardName:R,description:P,card:B,boardID:Y,errMsg:y,onCloseModal:function(){N(!1),U("")},submitChangeNameCallback:ee,submitChangeDescriptionCallback:_,setDescriptionCallback:$,setDescription:L}),Object(p.jsx)(z,{openButtonName:"+ Add another card",addButtonName:"Add card",closeButtonName:"Close",placeholder:"Enter card title...",submitFormCallback:function(e){if(m)throw"Another form is submiting";return x(!0),new Promise((function(n){var a={name:e,description:""};return h.a.post("".concat(O,"/board/").concat(Y,"/list/").concat(t,"/card"),a).then((function(t){var a;c?c.push(t.data):c=t.data,c=null===(a=c)||void 0===a?void 0:a.sort((function(e,t){return parseInt(e.position)-parseInt(t.position)})),l({variant:"success",message:"Item added"}),n(e)})).catch((function(e){l({variant:"danger",message:"Cannot add item"})})).finally((function(){return x(!1)}))}))},className:"m-2"}),Object(p.jsxs)(T.a,{className:"absolute !w-[272px] my-2",bg:null===i||void 0===i?void 0:i.variant,onClose:function(){return l(null)},show:Boolean(i),delay:2e3,autohide:!0,children:[Object(p.jsxs)(T.a.Header,{children:[Object(p.jsx)("strong",{className:"me-auto",children:"Status"}),Object(p.jsx)("small",{children:"now"})]}),Object(p.jsx)(T.a.Body,{children:null===i||void 0===i?void 0:i.message})]})]})},q=function(e){Object(A.a)(e);var t=Object(i.f)(),n=Object(a.useState)([]),c=Object(j.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)(null),l=Object(j.a)(o,2),b=l[0],x=l[1],v=Object(a.useState)(!0),g=Object(j.a)(v,2),w=g[0],N=g[1],C=Object(a.useState)(""),k=Object(j.a)(C,2),S=k[0],I=k[1],B=Object(a.useState)(null),D=Object(j.a)(B,2),H=D[0],M=D[1],J=Object(i.g)(),R=J.boardID,U=J.boardName,K=Object(a.useCallback)((function(){r.forEach(function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("".concat(O,"/board/").concat(R,"/list/").concat(t.id,"/card")).then((function(e){var n;t.items=e.data,null===(n=t.items)||void 0===n||n.sort((function(e,t){return parseInt(e.position)-parseInt(t.position)})),console.log(t)})).catch((function(e){var t;500!==(null===(t=e.response)||void 0===t?void 0:t.status)&&x({variant:"danger",message:"".concat(e)})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[r]);Object(a.useEffect)((function(){!R&&!U&&t("/tango")}),[]),Object(a.useEffect)((function(){h.a.get("".concat(O,"/board/").concat(R,"/list")).then((function(e){var t=e.data;s(t),N(!1),x({variant:"success",message:"Board loaded"})})).catch((function(e){x({variant:"danger",message:"".concat(e)})}))}),[]),Object(a.useEffect)((function(){K()}),[w]);var q=Object(a.useCallback)((function(e){return new Promise(Object(d.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={name:e},t.next=3,h.a.post("".concat(O,"/board/").concat(R,"/list"),n).then((function(t){var n=t.data;n.items=[],s([].concat(Object(E.a)(r),[n])),x({variant:"success",message:"Added new a list: ".concat(e)})})).catch((function(e){x({variant:"danger",message:"".concat(e)})}));case 3:case"end":return t.stop()}}),t)}))))}),[r]),Q=function(e){e.items&&(e.items.forEach((function(e,t){return e.position="".concat(t+1)})),e.items.sort((function(e,t){return parseInt(e.position)-parseInt(t.position)})),e.items.forEach(function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.put("".concat(O,"/board/").concat(R,"/list/").concat(t.listId,"/card/").concat(t.id),t).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},W=Object(a.useCallback)(function(){var e=Object(d.a)(u.a.mark((function e(t){var n,a,c,o,i,l,d,b,h,f,m,p,x,O;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.destination){e.next=2;break}return e.abrupt("return");case 2:n=t.source,a=t.destination,c=Object(E.a)(r),n.droppableId===a.droppableId?(o=c.find((function(e){return"".concat(e.id)===n.droppableId})))&&o.items&&(i=o.items.splice(n.index,1),l=Object(j.a)(i,1),d=l[0],o.items.splice(a.index,0,d),Q(o)):(b=c.find((function(e){return"".concat(e.id)===n.droppableId})),h=c.find((function(e){return"".concat(e.id)===a.droppableId})),f=null===b||void 0===b?void 0:b.items,m=null===h||void 0===h?void 0:h.items,f&&m&&(p=f.splice(n.index,1),x=Object(j.a)(p,1),(O=x[0]).listId="".concat(null===h||void 0===h?void 0:h.id),m.splice(a.index,0,O),Q(h),Q(b))),s(c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[r]),X=Object(a.useCallback)(function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.put("".concat(O,"/board"),{name:t},{params:{id:"".concat(R)}}).then((function(){window.history.replaceState(null,"","/tango/board/".concat(R,"/").concat(t))})).catch((function(e){x({variant:"danger",message:"Cannot change the name"}),console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),Y=function(){var e=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),0!==S.length){e.next=3;break}return e.abrupt("return");case 3:return n={username:S},I(""),e.next=7,h.a.post("".concat(O,"/board/").concat(R,"/invite"),n).then((function(){return M({variant:"success",message:"Invitation was sent"})})).catch((function(e){return M({variant:"danger",message:"Error, invitation was not sent. Try again"})}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=Object(p.jsxs)(P.a,{children:[Object(p.jsx)(P.a.Toggle,{variant:"light",className:"after:!hidden",children:Object(p.jsxs)("div",{className:"flex flex-row items-center",children:[Object(p.jsx)(L.a,{color:"black",width:25,height:25}),Object(p.jsx)("span",{className:"text-black ml-2",children:"Invite"})]})}),Object(p.jsxs)(P.a.Menu,{variant:"light",className:"w-72 flex justify-center",children:[Object(p.jsx)("div",{className:"text-center w-[100%]",children:"Invite to board"}),Object(p.jsx)(P.a.Divider,{}),Object(p.jsxs)(f.a,{onSubmit:Y,className:"p-2 flex flex-col gap-6",children:[Object(p.jsx)(f.a.Control,{type:"text",placeholder:"Insert username",value:S,onChange:function(e){return I(e.target.value)}}),Object(p.jsx)(m.a,{className:"w-[100%]",variant:S?"primary":"light",type:"submit",disabled:0===S.length,children:"Send invitation"})]}),Object(p.jsxs)(T.a,{className:"m-2 !w-[272px]",bg:null===H||void 0===H?void 0:H.variant,onClose:function(){return M(null)},show:Boolean(H),delay:2e3,autohide:!0,children:[Object(p.jsxs)(T.a.Header,{children:[Object(p.jsx)("strong",{className:"me-auto",children:"Status"}),Object(p.jsx)("small",{children:"now"})]}),Object(p.jsx)(T.a.Body,{children:null===H||void 0===H?void 0:H.message})]})]})]});return Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{className:"flex flex-row items-center p-2",children:[Object(p.jsx)(G,{name:U,submitCallback:X,className:"w-[fit-content]",buttonClassName:"text-xl text-white"}),Z]}),Object(p.jsxs)("div",{className:"flex",children:[w?Object(p.jsx)(y.a,{type:"Puff",color:"#00BFFF",height:100,width:100}):Object(p.jsx)(F.a,{onDragEnd:function(e){return W(e)},children:r.map((function(e,t){return Object(p.jsx)(V,{id:e.id,name:e.name,position:e.position,items:e.items},t)}))}),Object(p.jsxs)("div",{children:[Object(p.jsx)(z,{openButtonName:"+ Add a list",addButtonName:"Add list",closeButtonName:"Close",placeholder:"Enter list title...",submitFormCallback:q,className:"w-[272px] m-2",buttonTextColor:"text-white"}),Object(p.jsxs)(T.a,{className:"!w-[272px] m-2",bg:null===b||void 0===b?void 0:b.variant,onClose:function(){return x(null)},show:Boolean(b),delay:2e3,autohide:!0,children:[Object(p.jsxs)(T.a.Header,{children:[Object(p.jsx)("strong",{className:"me-auto",children:"Status"}),Object(p.jsx)("small",{children:"now"})]}),Object(p.jsx)(T.a.Body,{children:null===b||void 0===b?void 0:b.message})]})]})]})]})},Q=function(){return Object(p.jsx)("main",{className:"bg-trello h-[100vh] w-[fit-content] min-w-full",children:Object(p.jsx)(q,{})})},W=function(){var e=Object(a.useContext)(g),t=(e.authState,e.setAuth),n=Object(a.useState)(""),c=Object(j.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)(""),l=Object(j.a)(o,2),b=l[0],x=l[1],v=Object(a.useState)(""),w=Object(j.a)(v,2),N=w[0],C=w[1],k=Object(a.useState)(""),y=Object(j.a)(k,2),S=y[0],I=y[1],B=Object(a.useState)(""),D=Object(j.a)(B,2),E=D[0],A=D[1],F=Object(i.f)(),P=!(b.length&&N.length&&S.length&&E.length);Object(a.useEffect)((function(){return t(null)}),[]);var T=function(){var e=Object(d.a)(u.a.mark((function e(n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),S===E){e.next=4;break}return s("Passwords are incorrect"),e.abrupt("return");case 4:return a={username:b,email:N,password:S,matchingPassword:E},e.next=7,h.a.post("".concat(O,"/public/register"),a).then((function(e){F("/tango/login")})).catch((function(e){s("Cannot create account"),t(null)}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsx)(f.a,{onSubmit:T,className:"bg-trello h-[100vh] w-[100%] flex justify-center flex-col",children:Object(p.jsxs)("div",{className:"w-80 mx-auto my-0 flex flex-col align-middle",children:[Object(p.jsxs)(f.a.Group,{controlId:"username",className:"p-2 text-white",children:[Object(p.jsx)(f.a.Label,{children:"Username"}),Object(p.jsx)(f.a.Control,{autoFocus:!0,type:"username",value:b,onChange:function(e){return x(e.target.value)}})]}),Object(p.jsxs)(f.a.Group,{controlId:"email",className:"p-2 text-white",children:[Object(p.jsx)(f.a.Label,{children:"Email"}),Object(p.jsx)(f.a.Control,{autoFocus:!0,type:"email",value:N,onChange:function(e){return C(e.target.value)}})]}),Object(p.jsxs)(f.a.Group,{controlId:"password",className:"p-2 text-white",children:[Object(p.jsx)(f.a.Label,{children:"Password"}),Object(p.jsx)(f.a.Control,{type:"password",value:S,onChange:function(e){return I(e.target.value)}})]}),Object(p.jsxs)(f.a.Group,{controlId:"matchingPassword",className:"p-2 text-white",children:[Object(p.jsx)(f.a.Label,{children:"Repeat password"}),Object(p.jsx)(f.a.Control,{type:"password",value:E,onChange:function(e){return A(e.target.value)}})]}),Object(p.jsx)(m.a,{className:"m-4",size:"lg",type:"submit",disabled:P,children:"Create account"}),Object(p.jsx)("p",{className:"text-center text-white bg-[#ff000066] rounded-lg",children:r})]})})},X=function(){var e=Object(a.useContext)(g).authState;return Object(p.jsx)(o.a,{children:Object(p.jsx)(i.c,{children:e?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(i.a,{path:"/tango",element:Object(p.jsx)(D,{})}),Object(p.jsx)(i.a,{path:"/tango/login",element:Object(p.jsx)(C,{})}),Object(p.jsx)(i.a,{path:"/tango/board/:boardID/:boardName",element:Object(p.jsx)(Q,{})}),Object(p.jsx)(i.a,{path:"/tango/registration",element:Object(p.jsx)(W,{})})]}):Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(i.a,{path:"/tango",element:Object(p.jsx)(C,{})}),Object(p.jsx)(i.a,{path:"/tango/login",element:Object(p.jsx)(C,{})}),Object(p.jsx)(i.a,{path:"/tango/registration",element:Object(p.jsx)(W,{})})]})})})},Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,160)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))},Z=(n(138),n(139),n(156)),$=n(153),_=n(158),ee=function(){var e=Object(a.useContext)(g),t=e.authState,n=e.setAuth;return Object(p.jsx)(Z.a,{bg:"light",expand:"lg",className:"overflow-hidden !fixed w-[100%]",children:Object(p.jsxs)($.a,{children:[Object(p.jsx)(Z.a.Brand,{href:"/tango",children:"Tango"}),t?Object(p.jsx)(_.a.Link,{href:"/tango/login",onClick:function(){return n(null)},children:"Logout"}):Object(p.jsx)(_.a.Link,{href:"/tango",children:"Login"})]})})};s.a.render(Object(p.jsx)(N,{children:Object(p.jsxs)(c.a.StrictMode,{children:[Object(p.jsx)(ee,{}),Object(p.jsx)("div",{className:"pt-[56px]",children:Object(p.jsx)(X,{})})]})}),document.getElementById("root")),Y()}},[[142,1,2]]]);
//# sourceMappingURL=main.9c5a7c9b.chunk.js.map