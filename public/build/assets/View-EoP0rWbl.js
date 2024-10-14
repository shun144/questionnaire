import{j as i}from"./app-Djr3pS6i.js";import{u as w,a as x,i as y,B as A,d as C,C as E}from"./index-FTrqLg0J.js";import j from"./ModelNode-BrqZJ0or.js";const b=t=>{const r=Array.from(t.matchAll(/model \w+{[\w\s:;\[\]]+}/g)).map(s=>s[0]),o=r.map(s=>{var n,e;return(e=(n=Array.from(s.matchAll(/model (\w+)/g)))==null?void 0:n[0])==null?void 0:e[1]}),a=r.map((s,n)=>({name:o[n],fields:Array.from(s.matchAll(/(\w+): (\w+)/g)).map(e=>{const m=e==null?void 0:e[1],c=e==null?void 0:e[2],h=!!(o!=null&&o.find(f=>c==null?void 0:c.includes(f)));return{name:m,type:c,hasConnections:h}})})),d=[];return a.forEach(s=>{s.fields.forEach(n=>{const e=o==null?void 0:o.find(m=>{var c;return(c=n==null?void 0:n.type)==null?void 0:c.includes(m)});e&&d.push({target:e,source:s.name,name:n.name})})}),{models:a.map(s=>({...s,isChild:a.some(n=>n.fields.find(e=>{var m;return(m=e.type)==null?void 0:m.includes(s.name)}))})),connections:d}},N=`
model Post{
  id: number;
  title: string;
  author: User;
  comments: Comment[];
  createdAt: Date
}

model Comment{
  id: number;
  text: string;
}

model User{
  id: number;
  name: string;
  emal: string;
}
`,{models:p,connections:S}=b(N);let g=0,u=0;const k=p.length;let l=1;for(;!(l**2>=k);)l++;const B=p.map((t,r)=>{const o=g*300,a=u*300;return l%r===0?(u=0,g+=1):u+=1,{id:t.name,position:{x:o,y:a},data:t,type:"model"}}),M=S.map(t=>{const r=`${t.source}-${t.name}`;return{id:r,source:t.source,target:t.target,sourceHandle:r,targetHandle:t.target,animated:!0}}),V={model:j};function T(){const[t,r,o]=w(B),[a,d,s]=x(M);return i.jsx("div",{className:"w-screen h-screen bg-slate-950",children:i.jsxs(y,{defaultNodes:t,defaultEdges:a,nodeTypes:V,fitView:!0,fitViewOptions:{padding:.4},children:[i.jsx(A,{color:"#222",variant:C.Lines}),i.jsx(E,{})]})})}export{T as default};
