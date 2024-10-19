import{r as o,j as t}from"./app-Fxrr18RL.js";import{a as Q,b as U,e as _,g as u}from"./utils-DtvS6Fzu.js";import{u as i}from"./store-B-sIPZ31.js";import H from"./QuestionNode-HfxygJ9c.js";import M from"./ResultNode-BawjOpux.js";import{D as X}from"./core.esm-PeMqG9ak.js";import x from"./Draggable-Bsuyemzm.js";import Y from"./Droppable-B0ef5LCv.js";import{u as G,a as L,b as P,c as $,r as z,i as J,S as K,B as W,d as Z,e as v}from"./index-BdOFtew_.js";import{_ as h,I as ee}from"./index-Dk9bAGlJ.js";import"./react-3fYLzgl2.js";import"./ChoiceSourceHandle-ClxD4gBg.js";import"./index-BFep6aaj.js";import"./iconBase-DN5vp9AL.js";const se=({flowId:c})=>{const[w,N,j]=G([]),[C,a,E]=L([]),{screenToFlowPosition:S,addNodes:p,setViewport:te}=P(),[l,y]=o.useState();i(e=>e.setFirstNodeId);const g=i(e=>e.firstNodeId),m=i(e=>e.flowTitle),f=i(e=>e.flowUrl),I=o.useMemo(()=>({questionNode:H,resultNode:M}),[]);o.useEffect(()=>{(async()=>{const e=await Q(c),s=await U(c);N(e),a(s)})()},[]);const R=o.useCallback(e=>a(s=>$(e,s)),[a]),k=e=>{const s=u(),n=u();p({id:s,data:{topic:"",choices:[{id:n,content:""}]},position:e,type:"questionNode",dragHandle:".custom-drag-handle"})},D=e=>{const s=u();p({id:s,data:{result:""},position:e,type:"resultNode",dragHandle:".custom-drag-handle"})},F=o.useCallback(({active:e,over:s,delta:n,activatorEvent:r})=>{if(!(s==null||s.id!="droppableA")&&r instanceof MouseEvent){const V=r.pageX+n.x,B=r.pageY+n.y,b=S({x:V,y:B});e.id==="draggable-question"&&k(b),e.id==="draggable-result"&&D(b)}},[]),T=o.useCallback(()=>{if(l){const e=l.toObject();(async()=>{try{const s=await _(c,e.nodes,e.edges,g,m,f);h.success("Successfully toasted!",{duration:3e3})}catch{h.error("失敗!")}})()}},[l,g,m,f]),d=o.useRef(!0),q=o.useCallback((e,s)=>{d.current=!0,a(n=>z(e,s,n))},[]),A=o.useCallback(()=>{d.current=!1},[]),O=o.useCallback((e,s)=>{d.current||a(n=>n.filter(r=>r.id!==s.id)),d.current=!0},[]);return t.jsxs("div",{className:"flex h-full",children:[t.jsxs(X,{onDragEnd:F,children:[t.jsxs("div",{className:"w-[10%] flex items-center flex-col gap-y-3 pt-3 bg-slate-800",children:[t.jsx(x,{id:"draggable-question",label:"質問追加"}),t.jsx(x,{id:"draggable-result",label:"結果追加"}),t.jsx("button",{className:"bg-purple-700 border rounded w-[120px] h-[80px] text-white",onClick:T,children:"保存"})]}),t.jsx(Y,{id:"droppableA",children:t.jsxs(J,{nodes:w,edges:C,nodeTypes:I,edgeTypes:{smoothstep:K},onEdgesChange:E,onNodesChange:j,fitView:!0,fitViewOptions:{padding:.2},snapToGrid:!0,onReconnect:q,onReconnectStart:A,onReconnectEnd:O,onConnect:R,onInit:y,children:[t.jsx(W,{color:"#222",variant:Z.Lines,gap:20}),t.jsx(v,{})]})})]}),t.jsx(ee,{position:"bottom-right",reverseOrder:!1})]})},xe=o.memo(se);export{xe as default};
