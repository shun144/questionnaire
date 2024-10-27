import{r,j as e,y as q}from"./app-Bo7i6JCS.js";import{u as o}from"./store-C_vXhjzy.js";import{u as I}from"./index-BlTeKDJp.js";import{n as x}from"./index-CDe5uIYv.js";import"./react-E80T1p_a.js";const L=({id:m,initialTitle:f,initialUrl:h})=>{const[n,g]=r.useState(f),[i,p]=r.useState(h),[l,c]=r.useState({}),{getNodes:d,getEdges:b,getViewport:w}=I(),j=o(t=>t.firstNodeId),a=o(t=>t.setIsDirty),N=o(t=>t.isDirty),v=t=>{t.preventDefault(),console.log(d());const u=d(),k=b(),C=u.filter(s=>s.type==="qNode"),D=u.filter(s=>s.type==="rNode"),{x:E,y:F,zoom:O}=w();q.post(`/flow/${m}`,{update_questions:JSON.stringify(C),update_results:JSON.stringify(D),update_edges:JSON.stringify(k),first_question_id:j,title:n,url:i,x:E,y:F,zoom:O},{onSuccess:()=>{c({}),x.success("保存しました",{duration:4e3}),a(!1)},onError:s=>{c(s);for(const _ of Object.values(s))x.error(_,{duration:5e3})}})},y=r.useCallback(t=>{g(t.currentTarget.value),a(!0)},[]),S=t=>{p(t.target.value),a(!0)};return e.jsx("div",{className:"h-14 w-full bg-white",children:e.jsx("div",{className:"h-full w-full flex justify-center items-center bg-slate-100",children:e.jsxs("form",{onSubmit:v,className:"w-full h-14 flex justify-around items-center",children:[e.jsx("div",{className:"h-10 w-16",children:e.jsxs("button",{className:"relative w-full h-full bg-indigo-500 px-2 text-white rounded-md shadow-xl transition-all hover:bg-indigo-600 select-none hover:shadow-xl duration-200",children:["保 存",N&&e.jsxs("span",{className:"absolute flex h-3 w-3 -top-1 -right-1",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-rose-500 opacity-85"})]})]})}),e.jsxs("div",{className:"flex justify-center items-center gap-x-10",children:[e.jsxs("div",{className:" flex flex-col items-center w-96",children:[e.jsx("div",{children:l.title&&e.jsx("div",{className:"text-sm text-red-500",children:l.title})}),e.jsxs("div",{className:"flex w-full flex-row items-center",children:[e.jsx("label",{htmlFor:"title",className:"block text-sm font-medium text-gray-800 px-3 h-10 leading-10 bg-slate-300 text-center",children:"タイトル"}),e.jsx("input",{type:"text",id:"title",placeholder:"タイトルを入力してください",maxLength:50,className:"grow bg-slate-100 border border-slate-300 text-gray-900 text-sm focus:ring-transparent focus:border-slate-400 block  p-2.5 h-full placeholder-slate-400 shadow",onChange:y,value:n})]})]}),e.jsxs("div",{className:" flex flex-col items-center w-96",children:[e.jsx("div",{children:l.url&&e.jsx("div",{className:"text-sm text-red-500",children:l.url})}),e.jsxs("div",{className:"flex w-full flex-row items-center",children:[e.jsx("label",{htmlFor:"url",className:"block text-sm font-medium text-gray-800 px-3 h-10 leading-10 bg-slate-300 text-center",children:"URL"}),e.jsx("input",{type:"text",id:"url",placeholder:"URLを入力してください",maxLength:50,className:`grow bg-slate-100  text-gray-900 text-sm focus:ring-transparent  block  p-2.5 h-full placeholder-slate-400 shadow ${l.url?"border-rose-300 focus:border-rose-400 border-2":"border-slate-300 focus:border-slate-400 border"} `,onChange:S,value:i})]})]})]})]})})})},$=r.memo(L);export{$ as default};