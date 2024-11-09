import{j as i}from"./app-Po51A7Cn.js";import{j as w,k as x,i as y,e as A,f as E,h as j}from"./index-YXVZuvUv.js";import C from"./ModelNode-Bzhh1eqm.js";const b=t=>{const r=Array.from(t.matchAll(/model \w+{[\w\s:;\[\]]+}/g)).map(s=>s[0]),o=r.map(s=>{var n,e;return(e=(n=Array.from(s.matchAll(/model (\w+)/g)))==null?void 0:n[0])==null?void 0:e[1]}),a=r.map((s,n)=>({name:o[n],fields:Array.from(s.matchAll(/(\w+): (\w+)/g)).map(e=>{const m=e==null?void 0:e[1],c=e==null?void 0:e[2],h=!!(o!=null&&o.find(f=>c==null?void 0:c.includes(f)));return{name:m,type:c,hasConnections:h}})})),d=[];return a.forEach(s=>{s.fields.forEach(n=>{const e=o==null?void 0:o.find(m=>{var c;return(c=n==null?void 0:n.type)==null?void 0:c.includes(m)});e&&d.push({target:e,source:s.name,name:n.name})})}),{models:a.map(s=>({...s,isChild:a.some(n=>n.fields.find(e=>{var m;return(m=e.type)==null?void 0:m.includes(s.name)}))})),connections:d}},k=`
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
`,{models:p,connections:N}=b(k);let g=0,u=0;const S=p.length;let l=1;for(;!(l**2>=S);)l++;const M=p.map((t,r)=>{const o=g*300,a=u*300;return l%r===0?(u=0,g+=1):u+=1,{id:t.name,position:{x:o,y:a},data:t,type:"model"}}),V=N.map(t=>{const r=`${t.source}-${t.name}`;return{id:r,source:t.source,target:t.target,sourceHandle:r,targetHandle:t.target,animated:!0}}),v={model:C};function T(){const[t,r,o]=w(M),[a,d,s]=x(V);return i.jsx("div",{className:"w-screen h-screen bg-slate-950",children:i.jsxs(y,{defaultNodes:t,defaultEdges:a,nodeTypes:v,fitView:!0,fitViewOptions:{padding:.4},children:[i.jsx(A,{color:"#222",variant:E.Lines}),i.jsx(j,{})]})})}export{T as default};
