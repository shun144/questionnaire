import{r as c,j as r}from"./app-D37GFJK7.js";import{u as g}from"./core.esm-C-cttlut.js";const x=({id:a,label:o,btnColor:e="indigo"})=>{const{setNodeRef:n,listeners:i,attributes:l,transform:t,isDragging:s}=g({id:a}),d=t?`translate(${t.x}px, ${t.y}px)`:void 0;return r.jsx("div",{ref:n,...l,...i,style:{transform:d,height:"fit-content"},className:"w-[80%]",children:r.jsx("div",{className:`flex justify-center items-center bg-stone-200 h-16 text-${e}-500 font-extrabold border-4 border-${e}-500 rounded-lg shadow transition-all duration-300
        hover:bg-${e}-600 hover:text-stone-300 hover:border-slate-200 hover:shadow-xl`,style:{cursor:s?"grabbing":"grab",opacity:s?.5:void 0},children:r.jsx("p",{className:"text-center select-none",children:o})})})},h=c.memo(x);export{h as default};