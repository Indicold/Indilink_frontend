import{r as i,j as s}from"./index-5844006b.js";import{I as u}from"./index.esm-1de59bdb.js";import{n as c,o as l}from"./index.esm-7bfd96a9.js";const d=o=>{const{onVisibleChange:t,...p}=o,[e,n]=i.useState("password"),a=x=>{x.preventDefault();const r=e==="password"?"text":"password";n(r),t==null||t(r==="text")};return s.jsx(u,{...p,type:e,suffix:s.jsx("span",{className:"cursor-pointer text-xl",onClick:a,children:e==="password"?s.jsx(c,{}):s.jsx(l,{})})})};export{d as P};