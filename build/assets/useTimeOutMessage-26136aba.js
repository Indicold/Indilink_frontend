import{r as n,j as e,k as I}from"./index-5844006b.js";import{p as k,q as p,r as j,s as w}from"./index.esm-7bfd96a9.js";import{C as S}from"./CloseButton-c57fedcd.js";import{m as D}from"./isNil-a0467d53.js";function H(s,t=0,l=!0){const o=n.useRef(),r=n.useRef(s),c=n.useCallback(()=>{o.current&&clearTimeout(o.current)},[]),i=n.useCallback(()=>{o.current&&clearTimeout(o.current),l&&(o.current=setTimeout(()=>{var u;(u=r.current)==null||u.call(r)},t))},[t,l]);return n.useEffect(()=>{r.current=s},[s]),n.useEffect(()=>(i(),c),[t,l,i,c]),{clear:c,reset:i}}const M={success:{color:"text-emerald-400",icon:e.jsx(k,{})},info:{color:"text-blue-400",icon:e.jsx(p,{})},warning:{color:"text-yellow-400",icon:e.jsx(j,{})},danger:{color:"text-red-400",icon:e.jsx(w,{})}},P=s=>{const{type:t="info",custom:l,iconColor:o}=s,r=M[t];return e.jsx("span",{className:`text-2xl ${o||r.color}`,children:l||r.icon})},y="warning",Y={success:{backgroundColor:"bg-emerald-50 dark:bg-emerald-500",titleColor:"text-emerald-700 dark:text-emerald-50",textColor:"text-emerald-500 dark:text-emerald-50",iconColor:"text-emerald-400 dark:text-emerald-50",icon:e.jsx(k,{})},info:{backgroundColor:"bg-blue-50 dark:bg-blue-500",titleColor:"text-blue-700 dark:text-blue-100",textColor:"text-blue-500 dark:text-blue-100",iconColor:"text-blue-400 dark:text-blue-100",icon:e.jsx(p,{})},warning:{backgroundColor:"bg-yellow-50 dark:bg-yellow-500",titleColor:"text-yellow-700 dark:text-yellow-50",textColor:"text-yellow-500 dark:text-yellow-50",iconColor:"text-yellow-400 dark:text-yellow-50",icon:e.jsx(j,{})},danger:{backgroundColor:"bg-red-50 dark:bg-red-500",titleColor:"text-red-700 dark:text-red-100",textColor:"text-red-500 dark:text-red-100",iconColor:"text-red-400 dark:text-red-100",icon:e.jsx(w,{})}},_=["success","danger","info","warning"],$=n.forwardRef((s,t)=>{const{children:l,className:o,closable:r=!1,customClose:c,customIcon:i,duration:u=3e3,title:d=null,onClose:x,rounded:h=!0,showIcon:C=!1,triggerByToast:T=!1,...E}=s,f=(()=>{const{type:a=y}=s;return _.includes(a)?a:y})(),m=Y[f],[g,b]=n.useState("show"),{clear:N}=H(x,u,u>0),v=a=>{b("hiding"),x==null||x(a),N(),T||setTimeout(()=>{b("hide")},400)},A=()=>e.jsx("div",{className:"cursor-pointer",role:"presentation",onClick:a=>v(a),children:c||e.jsx(S,{defaultStyle:!1})}),R=I("alert","p-4 relative flex",m.backgroundColor,m.textColor,d?"":"font-semibold",r?"justify-between":"",r&&!d?"items-center":"",h&&"rounded-lg",o);return g==="hide"?null:e.jsxs(D.div,{ref:t,className:R,initial:{opacity:1},animate:g==="hiding"?"exit":"animate",transition:{duration:.25,type:"tween"},variants:{animate:{opacity:1},exit:{opacity:0}},...E,children:[e.jsxs("div",{className:`flex ${d?"":"items-center"}`,children:[C&&e.jsx(P,{iconColor:m.iconColor,custom:i,type:f}),e.jsxs("div",{className:C?"ltr:ml-2 rtl:mr-2":"",children:[d?e.jsx("div",{className:`font-semibold mb-1 ${m.titleColor}`,children:d}):null,l]})]}),r?A():null]})});$.displayName="Alert";function X(s=3e3){const[t,l]=n.useState("");return n.useEffect(()=>{if(t){const o=setTimeout(()=>l(""),s);return()=>{clearTimeout(o)}}},[t]),[t,l]}export{$ as A,X as u};