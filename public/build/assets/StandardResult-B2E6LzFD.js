import{r as l,j as e}from"./app-BQAl0iGL.js";import{u as c}from"./store-CTlBS_2q.js";import{M as u}from"./index-DncrRJhY.js";import{c as f,s as m}from"./utils-Cb3tSaGV.js";/* empty css                */import h from"./StandardResultBg-h11CloRW.js";import"./react-QkcpSqg5.js";import"./iconBase-DktyMWrP.js";const o=()=>{const[i,n]=l.useState(!1),t=l.useRef(null);l.useEffect(()=>(s(),window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)),[]);const s=()=>{t.current&&n(t.current.scrollHeight>t.current.clientHeight)};return{refCheckOverHeight:t,isOverHeight:i}},v=()=>{const{refCheckOverHeight:i,isOverHeight:n}=o(),{refCheckOverHeight:t,isOverHeight:s}=o(),d=c(r=>r.reset),a=c(r=>r.currentQuestionnarie);return l.useEffect(()=>{const r=window.location.pathname,x=a.result;f(r,x)},[]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"h-full max-h-full w-full flex justify-center items-center overflow-hidden relative",children:[e.jsx(h,{}),e.jsxs("div",{className:"w-11/12 md:w-7/12 h-full flex flex-col justify-center items-center",children:[e.jsx("div",{className:"w-full h-[8%] md:h-[10%] text-center flex justify-center items-center z-50",children:e.jsx("div",{className:"text-lg text-violet-400/80 font-bold text-md select-none md:text-4xl",children:"診 断 結 果"})}),e.jsxs("div",{className:"w-full max-h-[82%] md:max-h-[80%] min-h-[40%] bg-white/40 rounded-lg shadow-sm backdrop-blur-[4px] flex flex-col justify-center items-center px-6",children:[e.jsx("div",{className:`w-full h-2/6 max-h-2/6 min-h-2/6 overflow-y-auto mt-3 md:mt-6 flex ${n?"items-start":"items-center"}`,ref:i,children:e.jsx("div",{className:"whitespace-pre-wrap w-full text-base md:text-3xl text-slate-700 font-semibold flex justify-center break-all",dangerouslySetInnerHTML:m(a.result)})}),e.jsx("div",{className:"w-full border-b-2 border-violet-600/20 my-3 md:my-6"}),e.jsx("div",{className:`w-full h-4/6 max-h-4/6 min-h-4/6 overflow-y-auto mb-3 md:mb-6 flex ${s?"items-start":"items-center"}`,ref:t,children:e.jsx("div",{className:"whitespace-pre-wrap  w-full text-base md:text-2xl text-slate-600 font-normal flex justify-center break-all",dangerouslySetInnerHTML:m(a.message)})})]}),e.jsx("div",{className:"w-full h-[10%] md:h-[10%] flex justify-center items-center z-50 mt-2",children:e.jsxs("button",{className:"bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200 text-sm py-2 px-2 md:text-xl md:px-3 z-50",onClick:()=>d(),children:[e.jsx(u,{className:"text-lg md:text-2xl"}),e.jsx("p",{children:"もう一度最初から始める"})]})})]})]})})},O=l.memo(v);export{O as default};