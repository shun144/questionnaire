import{r as c,j as e}from"./app-MNzaSWed.js";import{u as m,H as d,P as x}from"./index-BV5GjtqN.js";import{a,m as o}from"./constants-zrKFsk20.js";import{showContextMenu as u}from"./ResultSubMenu-CUoiHNyY.js";import{B as f}from"./index-Dg3Bogek.js";import p from"./ImageUploader-NEcEdkp-.js";import"./index-EmrQ07aD.js";import"./store-4eFm_Nke.js";import"./react-9o_-8awh.js";import"./iconBase-C8iXxnql.js";const g=({id:s,data:r})=>{const{updateNodeData:l}=m(),n=t=>{l(s,{result:t.currentTarget.value})},i=t=>{l(s,{message:t.currentTarget.value})};return e.jsxs("div",{className:"rounded-md w-96 bg-slate-900 shadow-lg border-slate-300 border-2",children:[e.jsx("div",{className:"h-10 dhandle rounded-t-md bg-orange-500 flex justify-end items-center px-2 transition-all hover:bg-orange-600",children:e.jsx(f,{className:"w-6 h-full text-slate-200 text-md cursor-pointer transition-all hover:text-slate-50 hover:bg-orange-400",onClick:t=>u(t,s)})}),e.jsx("div",{className:"flex flex-col justify-center items-center cursor-default pt-3 px-3",children:e.jsx(p,{nodeId:s,initImgUrl:r.img})}),e.jsx("div",{className:"flex flex-col justify-center items-center cursor-default pt-3 px-3",children:e.jsxs("div",{className:"w-full flex flex-col justify-center items-center relative",children:[e.jsx("label",{htmlFor:"result",className:"self-start block text-md font-semibold text-orange-400",children:`診 断 結 果（${a}文字）`}),e.jsx("textarea",{id:"result",rows:3,className:"nowheel block resize-none p-2.5 w-full text-md text-slate-200 placeholder-slate-500 bg-slate-800 rounded-sm border-1 ring-0 border-slate-400 focus:ring-0 focus:border-slate-200",value:r.result,onChange:t=>n(t),placeholder:"診断結果を入力してください",maxLength:a}),e.jsx(d,{id:s,position:x.Left,type:"target",style:{cursor:"pointer",top:18,left:-25}})]})}),e.jsx("div",{className:"flex flex-col justify-center items-center cursor-default pt-6 pb-6 px-3",children:e.jsxs("div",{className:"w-full flex flex-col justify-center items-center relative",children:[e.jsx("label",{htmlFor:"message",className:"self-start block text-md font-semibold text-orange-400",children:`メッセージ（${o}文字）`}),e.jsx("textarea",{id:"message",rows:5,className:"nowheel block resize-none p-2.5 w-full text-md text-slate-200 placeholder-slate-500 bg-slate-800 rounded-sm border-1 ring-0 border-slate-400 focus:ring-0 focus:border-slate-200",value:r.message,onChange:t=>i(t),placeholder:"メッセージを入力してください",maxLength:o})]})})]})},C=c.memo(g);export{C as default};