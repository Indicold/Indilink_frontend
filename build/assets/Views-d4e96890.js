import{Q as L,T as b,g as w,U as N,V as C,W as $,X as D,Y as I,r,o as i,j as t,k as y,Z as P,A as V,$ as z,w as R,a0 as T,a1 as p,a2 as M,a3 as O,a4 as d,l as F,u as m,a5 as K,a6 as x,a7 as j,M as G,a8 as S,a9 as l}from"./index-5844006b.js";var U=Object.prototype;function Y(e){var a=e&&e.constructor,s=typeof a=="function"&&a.prototype||U;return e===s}var k=Y;function H(e,a){return function(s){return e(a(s))}}var B=H,X=B,Q=X(Object.keys,Object),W=Q,Z=k,q=W,J=Object.prototype,ee=J.hasOwnProperty;function te(e){if(!Z(e))return q(e);var a=[];for(var s in Object(e))ee.call(e,s)&&s!="constructor"&&a.push(s);return a}var se=te,ae=L,re=b;function ne(e){return e!=null&&re(e.length)&&!ae(e)}var oe=ne,ie=se,ce=N,ue=C,le=$,pe=oe,ye=D,he=k,me=I,de="[object Map]",_e="[object Set]",fe=Object.prototype,xe=fe.hasOwnProperty;function je(e){if(e==null)return!0;if(pe(e)&&(le(e)||typeof e=="string"||typeof e.splice=="function"||ye(e)||me(e)||ue(e)))return!e.length;var a=ce(e);if(a==de||a==_e)return!e.size;if(he(e))return!ie(e).length;for(var s in e)if(xe.call(e,s))return!1;return!0}var ge=je;const g=w(ge);function Ee(e=[],a=[],s=!1){const n=r.useMemo(()=>a.some(o=>e.includes(o)),[a,e]);return g(a)||g(e)||typeof a>"u"?!s:n}const ve=[{key:"signIn",path:"/sign-in",component:r.lazy(()=>i(()=>import("./index-74591b5b.js"),["assets/index-74591b5b.js","assets/index-5844006b.js","assets/index-47826158.css","assets/index.esm-1de59bdb.js","assets/isNil-a0467d53.js","assets/useTimeOutMessage-26136aba.js","assets/index.esm-7bfd96a9.js","assets/CloseButton-c57fedcd.js","assets/PasswordInput-cce7ac11.js","assets/ActionLink-bc4dac0b.js"])),authority:[]},{key:"signUp",path:"/sign-up",component:r.lazy(()=>i(()=>import("./index-e312e86e.js"),["assets/index-e312e86e.js","assets/index-5844006b.js","assets/index-47826158.css","assets/index.esm-1de59bdb.js","assets/isNil-a0467d53.js","assets/PasswordInput-cce7ac11.js","assets/index.esm-7bfd96a9.js","assets/ActionLink-bc4dac0b.js"])),authority:[]},{key:"forgotPassword",path:"/forgot-password",component:r.lazy(()=>i(()=>import("./index-eaf046e2.js"),["assets/index-eaf046e2.js","assets/index-5844006b.js","assets/index-47826158.css","assets/index.esm-1de59bdb.js","assets/isNil-a0467d53.js","assets/useTimeOutMessage-26136aba.js","assets/index.esm-7bfd96a9.js","assets/CloseButton-c57fedcd.js","assets/ActionLink-bc4dac0b.js","assets/ReactToastify-f2ebcc7d.css"])),authority:[]},{key:"VerfyOtp",path:"/VerfyOtp",component:r.lazy(()=>i(()=>import("./index-7aae722d.js"),["assets/index-7aae722d.js","assets/index-5844006b.js","assets/index-47826158.css","assets/index.esm-1de59bdb.js","assets/isNil-a0467d53.js","assets/useTimeOutMessage-26136aba.js","assets/index.esm-7bfd96a9.js","assets/CloseButton-c57fedcd.js","assets/ActionLink-bc4dac0b.js","assets/ReactToastify-f2ebcc7d.css"])),authority:[]},{key:"resetPassword",path:"/reset-password",component:r.lazy(()=>i(()=>import("./index-e09816ee.js"),["assets/index-e09816ee.js","assets/index-5844006b.js","assets/index-47826158.css","assets/index.esm-1de59bdb.js","assets/isNil-a0467d53.js","assets/useTimeOutMessage-26136aba.js","assets/index.esm-7bfd96a9.js","assets/CloseButton-c57fedcd.js","assets/PasswordInput-cce7ac11.js","assets/ActionLink-bc4dac0b.js","assets/ReactToastify-f2ebcc7d.css"])),authority:[]},{key:"basicInformation",path:"/basic-information",component:r.lazy(()=>i(()=>import("./index-add81061.js"),["assets/index-add81061.js","assets/index-5844006b.js","assets/index-47826158.css","assets/index.esm-1de59bdb.js","assets/isNil-a0467d53.js","assets/ReactToastify-f2ebcc7d.css"])),authority:[]}],Ae=[...ve],Pe=[{key:"home",path:"/home",component:r.lazy(()=>i(()=>import("./Home-628df892.js"),["assets/Home-628df892.js","assets/index-5844006b.js","assets/index-47826158.css"])),authority:[]},{key:"singleMenuItem",path:"/single-menu-view",component:r.lazy(()=>i(()=>import("./SingleMenuView-b04b8e68.js"),["assets/SingleMenuView-b04b8e68.js","assets/index-5844006b.js","assets/index-47826158.css"])),authority:[]},{key:"collapseMenu.item1",path:"/collapse-menu-item-view-1",component:r.lazy(()=>i(()=>import("./CollapseMenuItemView1-e21a76bb.js"),["assets/CollapseMenuItemView1-e21a76bb.js","assets/index-5844006b.js","assets/index-47826158.css"])),authority:[]},{key:"collapseMenu.item2",path:"/collapse-menu-item-view-2",component:r.lazy(()=>i(()=>import("./CollapseMenuItemView2-c8f0ea2a.js"),["assets/CollapseMenuItemView2-c8f0ea2a.js","assets/index-5844006b.js","assets/index-47826158.css"])),authority:[]},{key:"groupMenu.single",path:"/group-single-menu-item-view",component:r.lazy(()=>i(()=>import("./GroupSingleMenuItemView-fcb389d4.js"),["assets/GroupSingleMenuItemView-fcb389d4.js","assets/index-5844006b.js","assets/index-47826158.css"])),authority:[]},{key:"groupMenu.collapse.item1",path:"/group-collapse-menu-item-view-1",component:r.lazy(()=>i(()=>import("./GroupCollapseMenuItemView1-474d0b0c.js"),["assets/GroupCollapseMenuItemView1-474d0b0c.js","assets/index-5844006b.js","assets/index-47826158.css"])),authority:[]},{key:"groupMenu.collapse.item2",path:"/group-collapse-menu-item-view-2",component:r.lazy(()=>i(()=>import("./GroupCollapseMenuItemView2-1ef5fe39.js"),["assets/GroupCollapseMenuItemView2-1ef5fe39.js","assets/index-5844006b.js","assets/index-47826158.css"])),authority:[]}],_=r.forwardRef((e,a)=>{const{className:s,children:n,asElement:o="div",...c}=e;return t.jsx(o,{ref:a,className:y("container mx-auto",s),...c,children:n})});_.displayName="Container";const E=()=>t.jsxs("div",{className:"flex items-center justify-between flex-auto w-full",children:[t.jsxs("span",{children:["Copyright © ",`${new Date().getFullYear()}`," ",t.jsx("span",{className:"font-semibold",children:`${V}`})," All rights reserved."]}),t.jsxs("div",{className:"",children:[t.jsx("a",{className:"text-gray",href:"/#",onClick:e=>e.preventDefault(),children:"Term & Conditions"}),t.jsx("span",{className:"mx-2 text-muted",children:" | "}),t.jsx("a",{className:"text-gray",href:"/#",onClick:e=>e.preventDefault(),children:"Privacy & Policy"})]})]});function Re({pageContainerType:e="contained"}){return t.jsx("footer",{className:y(`footer flex flex-auto items-center h-16 ${P}`),children:e==="contained"?t.jsx(_,{children:t.jsx(E,{})}):t.jsx(E,{})})}const v=({header:e,...a})=>{const s=e;return t.jsx(s,{...a})},Te=e=>{const{pageContainerType:a="default",children:s,header:n,contained:o=!1,extraHeader:c,footer:u=!0}=e;return t.jsxs("div",{className:"h-full flex flex-auto flex-col justify-between",children:[t.jsx("main",{className:"h-full",children:t.jsxs("div",{className:y("page-container relative h-full flex flex-auto flex-col",a!=="gutterless"&&`${P} ${z}`,a==="contained"&&"container mx-auto"),children:[(n||c)&&t.jsxs("div",{className:y(o&&"container mx-auto","flex items-center justify-between mb-4"),children:[t.jsxs("div",{children:[n&&typeof n=="string"&&t.jsx("h3",{children:n}),t.jsx(r.Suspense,{fallback:t.jsx("div",{}),children:n&&typeof n!="string"&&t.jsx(v,{header:n})})]}),t.jsx(r.Suspense,{fallback:t.jsx("div",{}),children:c&&typeof c!="string"&&t.jsx(v,{header:c})})]}),a==="contained"?t.jsx(_,{className:"h-full",children:t.jsx(t.Fragment,{children:s})}):t.jsx(t.Fragment,{children:s})]})}),u&&t.jsx(Re,{pageContainerType:a})]})},{unAuthenticatedEntryPath:Oe}=d,ke=()=>{const{authenticated:e}=R(),a=T();return e?t.jsx(O,{}):t.jsx(p,{replace:!0,to:`${Oe}?${M}=${a.pathname}`})},{authenticatedEntryPath:Le}=d,be=()=>{const{authenticated:e}=R();return e?t.jsx(p,{to:Le}):t.jsx(O,{})},we=e=>{const{userAuthority:a=[],authority:s=[],children:n}=e,o=Ee(a,s);return t.jsx(t.Fragment,{children:o?n:t.jsx(p,{to:"/access-denied"})})},A=({component:e,routeKey:a,...s})=>{const n=T(),o=F(),c=m(h=>h.theme.layout.type),u=m(h=>h.theme.layout.previousType),f=r.useCallback(()=>{o(K(a)),s.layout&&s.layout!==c&&(o(x(c)),o(j(s.layout))),!s.layout&&u&&c!==u&&(o(j(u)),o(x("")))},[o,c,u,s.layout,a]);return r.useEffect(()=>{f()},[n,f]),t.jsx(e,{...s})},{authenticatedEntryPath:Ne}=d,Ce=e=>{const a=m(s=>s.auth.user.authority);return t.jsxs(S,{children:[t.jsxs(l,{path:"/",element:t.jsx(ke,{}),children:[t.jsx(l,{path:"/",element:t.jsx(p,{replace:!0,to:Ne})}),Pe.map((s,n)=>t.jsx(l,{path:s.path,element:t.jsx(we,{userAuthority:a,authority:s.authority,children:t.jsx(Te,{...e,...s.meta,children:t.jsx(A,{routeKey:s.key,component:s.component,...s.meta})})})},s.key+n)),t.jsx(l,{path:"*",element:t.jsx(p,{replace:!0,to:"/"})})]}),t.jsx(l,{path:"/",element:t.jsx(be,{}),children:Ae.map(s=>t.jsx(l,{path:s.path,element:t.jsx(A,{routeKey:s.key,component:s.component,...s.meta})},s.path))})]})},De=e=>t.jsx(r.Suspense,{fallback:t.jsx(G,{loading:!0}),children:t.jsx(Ce,{...e})});export{De as V,B as _,g as i,Ee as u};
