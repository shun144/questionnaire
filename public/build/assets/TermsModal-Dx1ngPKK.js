import{r as t,j as e}from"./app-BQAl0iGL.js";import{M as m}from"./Modal-Dp7g2Mk1.js";import"./transition-C1GdvH3R.js";const x=({isOpen:a,setIsOpen:i})=>{const[r,d]=t.useState(!1),l=t.useRef(null);return t.useEffect(()=>{const c=()=>{if(l.current){const o=l.current,n=o.scrollTop+o.clientHeight>=o.scrollHeight;console.log(n),d(n)}},s=l.current;return s&&s.addEventListener("scroll",c),()=>{s&&s.removeEventListener("scroll",c)}},[]),e.jsx(m,{show:a,onClose:()=>i(!1),maxWidth:"2xl",children:e.jsx("div",{className:"h-[800px] max-h-[800px]  px-2 pt-5 pb-10",children:e.jsxs("div",{className:"w-full flex flex-col justify-center items-center gap-y-6 h-full ",children:[e.jsx("div",{className:"text-3xl",children:"利用規約"}),e.jsx("div",{ref:l,className:"w-11/12 border border-slate-200 rounded overflow-y-auto",children:e.jsx("div",{className:"h-[900px]",children:"aaa"})}),e.jsx("div",{className:"w-full flex justify-center items-center",children:e.jsx("button",{className:`border rounded px-2 py-2 text-white ${r?"bg-indigo-400":""}`,disabled:!r,children:"利用規約に同意する"})})]})})})},p=t.memo(x);export{p as default};