import{r as t,j as r,Y as x}from"./app-Bo7i6JCS.js";import{R as c}from"./index-BlTeKDJp.js";import{A as j}from"./AuthenticatedLayout-s4WxLRcV.js";import w from"./StandardFlow-C7zjUsnJ.js";import{u as F}from"./store-C_vXhjzy.js";import{I as N}from"./index-CDe5uIYv.js";import S from"./QuestionSubMenu-BMGdV5JM.js";import h from"./ResultSubMenu-C44UfUxl.js";import O from"./FlowHeader-Nd4i1zvj.js";import"./ApplicationLogo-CcXZgMgl.js";import"./ResponsiveNavLink-DpYThTQY.js";import"./transition-B8PtAmJ1.js";import"./utils-Cmb2_2w0.js";import"./StandardQuestionNode-WCnr8jMp.js";import"./ChoiceSourceHandle-DpfmfhiL.js";import"./index-Vh4xxwgf.js";import"./iconBase-CU--X7uj.js";import"./index-BL2QBkne.js";import"./StandardResultNode-ByPGIWEO.js";import"./core.esm-YpSGGpUm.js";import"./Draggable-729lfuPj.js";import"./Droppable-Dists6yI.js";/* empty css             *//* empty css                           */import"./react-E80T1p_a.js";import"./index-9QoywREl.js";const E=({id:o,quesitions:i,results:e,edges:s,title:m,url:p,initFirstQuestionId:a,x:l,y:d,zoom:n})=>{const f=F(u=>u.setFirstNodeId);return t.useEffect(()=>{f(a)},[]),r.jsxs(j,{children:[r.jsx(x,{title:"Board"}),r.jsxs(c,{children:[r.jsxs("div",{className:"h-full w-full flex flex-col",children:[r.jsx(O,{id:o,initialTitle:m,initialUrl:p}),r.jsx(w,{initialNodes:[...JSON.parse(i),...JSON.parse(e)],initialEdges:JSON.parse(s),defaultViewport:{x:l,y:d,zoom:n}})]}),r.jsx(N,{position:"bottom-right",reverseOrder:!1}),r.jsx(S,{}),r.jsx(h,{})]})]})},W=t.memo(E);export{W as default};