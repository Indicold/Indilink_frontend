import{r as c,aa as S,K as k,w as F,j as e,ab as v}from"./index-5844006b.js";import{c as P,a as u,b as I,F as A,d as C,e as D,f as x,g as p,I as U,B as $}from"./index.esm-1de59bdb.js";import{u as O,A as q}from"./useTimeOutMessage-26136aba.js";import{P as B}from"./PasswordInput-cce7ac11.js";import{A as g}from"./ActionLink-bc4dac0b.js";import"./Views-d4e96890.js";import"./isNil-a0467d53.js";import"./index.esm-7bfd96a9.js";import"./CloseButton-c57fedcd.js";P().shape({email:u().required("Please enter your email address"),password:u().required("Please enter your password"),rememberMe:I()});const E=b=>{var l,d,i,m;const[o,T]=c.useState(!1),[r,h]=c.useState({username:"",password:""}),f=S(),s=k(a=>{var t;return(t=a==null?void 0:a.auth)==null?void 0:t.apiLoginPostReducer});console.log("LOGIN",(l=s==null?void 0:s.responseData)==null?void 0:l.message);const{disableSubmit:G=!1,className:j,forgotPasswordUrl:w="/forgot-password",signUpUrl:y="/sign-up"}=b;O(),F();const N=a=>{a.preventDefault(),f(v({user_id:r==null?void 0:r.username,password:r==null?void 0:r.password})),console.log("handle")},n=a=>{const t={...r};t[a.target.name]=a.target.value,h(t)};return e.jsxs("div",{className:j,children:[((d=s==null?void 0:s.responseData)==null?void 0:d.message)&&typeof((i=s==null?void 0:s.responseData)==null?void 0:i.message)=="string"&&e.jsx(q,{showIcon:!0,className:"mb-4",type:"danger",children:e.jsx(e.Fragment,{children:(m=s==null?void 0:s.responseData)==null?void 0:m.message})}),e.jsx(A,{children:e.jsx(C,{onSubmit:N,children:e.jsxs(D,{children:[e.jsx(x,{label:"Username",children:e.jsx(p,{type:"text",autoComplete:"off",className:"rounded-[13px]",name:"username",placeholder:"username",onChange:n,component:U})}),e.jsx(x,{label:"Password",children:e.jsx(p,{style:{borderRadius:"13px"},autoComplete:"off",name:"password",placeholder:"Password",onChange:n,component:B})}),e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",value:"",className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e.jsx("label",{htmlFor:"default-checkbox",className:"ml-2 text-sm font-medium text-[#979da8] dark:text-[#979da8]",children:"Remember me"})]}),e.jsx(g,{to:w,className:"ml-2 text-sm font-medium text-[#979da8] dark:text-[#979da8]",children:"Forgot Password?"})]}),e.jsx("div",{className:"w-full flex",children:e.jsx($,{style:{borderRadius:"13px"},block:!0,loading:o,variant:"solid",type:"submit",className:"bg-[#3f8cfe] w-[40%] mx-auto rounded-[30px]",children:o?"Signing in...":"Log in"})}),e.jsx("div",{className:"w-full flex",children:e.jsx("label",{style:{borderRadius:"13px"},className:"text-[#3f8cfe] mx-auto rounded-[30px] font-bold mx-auto py-2",children:o?"Signing in...":"Log in with OTP"})}),e.jsxs("div",{className:"mt-4 text-center text-[#3f8cfe]",children:[e.jsxs("span",{children:["Not a member yet?"," "]}),e.jsx(g,{className:"text-bold decoration-none p-2 pl-4 pr-4 rounded-lg border border-[black] ml-5",to:y,children:"Sign up"})]})]})})})]})},M=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-8",children:e.jsx("h4",{className:"mb-1 text-center",children:"Login to Indicold"})}),e.jsx(E,{disableSubmit:!1})]}),X=M;export{X as default};
