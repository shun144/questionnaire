import{r as i,j as e,Y as N}from"./app-Po51A7Cn.js";import H from"./NotFinished-Ef4k8-lL.js";import R from"./CityHeavenQuestion-BhBWYItL.js";import S from"./CityHeavenResult-CjPatS8u.js";import w from"./Header-vaKCLTRh.js";import E from"./Footer-Cq09I1jy.js";import{u as o}from"./store-CGTofLqS.js";import{Q as I}from"./useQuery-CTSXLNFb.js";import{Q as q}from"./queryClient-C09nGE_z.js";import"./index-CMXpg0jC.js";import"./iconBase-CtQAnfA3.js";import"./react-bkPmn1Wh.js";import"./ResetButton-Bcmi6yV9.js";import"./index-BBZ6V2VK.js";/* empty css                */import"./Skelton-BgYImcfB.js";import"./GirlsView-BcuohaYB.js";import"./utils-CvcR3l7b.js";import"./index-Ay0O9Fdk.js";import"./ApiError-CNMZrBd0.js";const J=new q,O=({ownerName:d,title:u,questions:c,results:p,edges:l,firstQuestionId:a})=>{const f=o(t=>t.setQuestionnarieDatas),g=o(t=>t.setCurrentQuestionnarie),n=o(t=>t.currentQuestionnarie),Q=o(t=>t.setFirstQuestionId),[x,j]=i.useState(!0);return i.useEffect(()=>{const t=JSON.parse(c),y=JSON.parse(p),h=JSON.parse(l),C=t.map(s=>({id:s.id,topic:s.data.topic,choices:s.data.choices.map(r=>{var m;return{id:r.id,content:r.content,salesPoints:r.salePoints,nextId:(m=h.find(F=>F.sourceHandle===r.id))==null?void 0:m.targetHandle}}),category:"question"})),v=y.map(s=>({id:s.id,result:s.data.result,message:s.data.message,img:s.data.img,url:s.data.url,category:"result"}));f([...C,...v]),Q(a),g(a),j(!1)},[]),e.jsxs(e.Fragment,{children:[e.jsx(N,{title:"診断"}),e.jsxs("div",{className:"w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden",children:[e.jsx(w,{title:u}),e.jsx("div",{className:" bg-slate-100 grow",children:!x&&e.jsx(e.Fragment,{children:e.jsxs(I,{client:J,children:[n.category==="question"&&e.jsx(R,{}),n.category==="result"&&e.jsx(S,{}),n.category==="none"&&e.jsx(H,{})]})})}),e.jsx(E,{ownerName:d})]})]})},ee=i.memo(O);export{ee as default};