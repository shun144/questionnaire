import{j as t}from"./app-DpxkVMrK.js";import{u as m}from"./core.esm-Fkv0BRu6.js";import{DraggableBlockSource as f}from"./DraggableBlockSource-uysq9xOH.js";const p=({id:e,label:s})=>{const{setNodeRef:o,listeners:a,attributes:n,transform:r,isDragging:i}=m({id:e}),g=r?`translate(${r.x}px, ${r.y}px)`:void 0;return t.jsx("div",{ref:o,...n,...a,style:{transform:g,height:"fit-content"},children:t.jsx(f,{isDragging:i,label:s})})};export{p as Draggable};