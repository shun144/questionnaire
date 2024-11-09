import{q as c,r as m,j as e,a as x}from"./app-DaAR2GBw.js";import{A as h}from"./ApplicationLogo-DpWcFCOj.js";import{N as a,D as s,R as r}from"./ResponsiveNavLink-DeyeeXme.js";function f({header:t,children:d}){const i=c().props.auth.user,[n,o]=m.useState(!1);return e.jsxs("div",{className:"flex flex-col min-h-screen h-screen bg-gray-100",children:[e.jsxs("nav",{className:"bg-white border-b border-gray-100",children:[e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex justify-between h-16",children:[e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"shrink-0 flex items-center",children:e.jsx(x,{href:"/",children:e.jsx(h,{className:"block h-9 w-auto fill-current text-gray-800"})})}),e.jsxs("div",{className:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex",children:[e.jsx(a,{href:route("admin.dashboard"),active:route().current("admin.dashboard"),children:"ユーザ一覧"}),e.jsx(a,{href:route("admin.logs"),active:route().current("admin.logs"),children:"ログ一覧"})]})]}),e.jsx("div",{className:"hidden sm:flex sm:items-center sm:ms-6",children:e.jsx("div",{className:"ms-3 relative",children:e.jsxs(s,{children:[e.jsx(s.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsxs("button",{type:"button",className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150",children:[i.name,e.jsx("svg",{className:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})}),e.jsxs(s.Content,{children:[e.jsx(s.Link,{href:route("admin.profile.edit"),children:"プロフィール"}),e.jsx(s.Link,{href:route("admin.logout"),method:"post",as:"button",children:"ログアウト"})]})]})})}),e.jsx("div",{className:"-me-2 flex items-center sm:hidden",children:e.jsx("button",{onClick:()=>o(l=>!l),className:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out",children:e.jsxs("svg",{className:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("path",{className:n?"hidden":"inline-flex",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"}),e.jsx("path",{className:n?"inline-flex":"hidden",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})]})})})]})}),e.jsxs("div",{className:(n?"block":"hidden")+" sm:hidden",children:[e.jsxs("div",{className:"pt-2 pb-3 space-y-1",children:[e.jsx(r,{href:route("admin.dashboard"),active:route().current("admin.dashboard"),children:"ユーザ一覧"}),e.jsx(r,{href:route("admin.logs"),active:route().current("admin.logs"),children:"ログ一覧"})]}),e.jsxs("div",{className:"pt-4 pb-1 border-t border-gray-200",children:[e.jsxs("div",{className:"px-4",children:[e.jsx("div",{className:"font-medium text-base text-gray-800",children:i.name}),e.jsx("div",{className:"font-medium text-sm text-gray-500",children:i.email})]}),e.jsxs("div",{className:"mt-3 space-y-1",children:[e.jsx(r,{href:route("admin.profile.edit"),children:"プロフィール"}),e.jsx(r,{method:"post",href:route("admin.logout"),as:"button",children:"ログアウト"})]})]})]})]}),e.jsx("header",{className:"bg-white shadow",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:t})}),e.jsx("main",{className:"grow overflow-scroll",children:d})]})}export{f as A};
