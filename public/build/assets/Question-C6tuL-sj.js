import{r as n,j as e}from"./app-CBSrSIhT.js";import{useQuestionnaireContext as f}from"./QuestionnaireProvider-X4wG7sGz.js";import b from"./Indicator-Dv4__DGf.js";import{G as j}from"./iconBase-BZeQPJ4Z.js";import"./index-SudRYcli.js";function w(t){return j({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"48",d:"M244 400 100 256l144-144M120 256h292"},child:[]}]})(t)}const g=()=>{const{quizeData:t,showScore:d,currentQuestion:s,setCurrentQuestion:a,setAnswerHistories:o,setShowScore:c}=f(),[m,x]=n.useState(!1);n.useEffect(()=>{s>=2?x(!0):x(!1)},[s]);const p=()=>{a(l=>l-1),o(l=>l.slice(0,-1))},h=l=>{const r={id:t[s-1].quizeNo,question:t[s-1].topic,answer:l};o(u=>[...u,r]);const i=s+1;i>t.length?c(!0):a(i)};return e.jsx(e.Fragment,{children:!d&&t.length>0&&e.jsx("div",{className:"h-full w-full flex flex-col justify-start items-center px-4",children:e.jsxs("div",{className:"w-full md:w-6/12",children:[e.jsx("div",{className:"w-full h-[50px] md:min-h-[75px] md:max-h-[75px]",children:e.jsx(b,{})}),e.jsxs("div",{className:"rounded-t-lg w-full border border-red-100 mb-7",style:{boxShadow:"10px 8px 1px rgba(0, 0, 0, .3)"},children:[e.jsxs("div",{className:"w-full rounded-t-lg bg-slate-900 text-white flex justify-center items-center text-lg px-3 py-3 md:text-2xl md:px-5 md:py-7 md:h-[100px]",children:[e.jsx("div",{className:"w-1/12",children:`Q${s}`}),e.jsx("div",{className:"w-11/12 text-center break-all line-clamp-2 pl-4",children:t[s-1].topic})]}),e.jsx("div",{className:"bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400",children:e.jsx("div",{className:"flex flex-col justify-center items-center h-full gap-y-4 py-4 mb:gap-y-7 mb:py-8",children:t[s-1].choices.map(({choiceNo:l,content:r},i)=>e.jsxs("button",{onClick:()=>h(r),className:"w-[90%] min-h-[60px] max-h-[60px] py-4 overflow-hidden bg-white rounded-md flex justify-start items-center transition-opacity duration-300 hoverable:hover:opacity-70 md:min-h-[75px] md:max-h-[75px]",style:{boxShadow:"8px 6px 1px rgba(0, 0, 0, .3)"},children:[e.jsx("div",{className:"w-1/12 px-1",children:e.jsx("div",{className:"text-center font-bold bg-amber-100 rounded-full my-0 mx-auto flex justify-center items-center text-lg h-[35px] w-[35px] md:text-2xl md:h-[50px] md:w-[50px]",children:e.jsx("p",{children:String.fromCharCode(i+65)})})}),e.jsx("div",{className:"w-11/12  font-bold text-start break-all line-clamp-2 min-h-[20px] max-h-[40px] leading-[20px] text-lg pl-8 pr-4 md:text-2xl md:pl-4 md:min-h-[30px] md:max-h-[60px] md:leading-[30px]",children:r})]},l))})})]}),m&&e.jsx("div",{className:"flex justify-start items-start",children:e.jsxs("button",{className:"bg-blue-500 hoverable:hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex justify-center items-center gap-1 shadow-2xl",onClick:p,children:[e.jsx(w,{className:"text-xl"}),e.jsx("p",{children:"1つ前の質問に戻る"})]})})]})})})},S=n.memo(g);export{S as default};
