const i=u=>{const a=Array.from(u.matchAll(/model \w+{[\w\s:;\[\]]+}/g)).map(t=>t[0]),r=a.map(t=>{var s,n;return(n=(s=Array.from(t.matchAll(/model (\w+)/g)))==null?void 0:s[0])==null?void 0:n[1]}),e=a.map((t,s)=>({name:r[s],fields:Array.from(t.matchAll(/(\w+): (\w+)/g)).map(n=>{const m=n==null?void 0:n[1],o=n==null?void 0:n[2],g=!!(r!=null&&r.find(h=>o==null?void 0:o.includes(h)));return{name:m,type:o,hasConnections:g}})})),c=[];return e.forEach(t=>{t.fields.forEach(s=>{const n=r==null?void 0:r.find(m=>{var o;return(o=s==null?void 0:s.type)==null?void 0:o.includes(m)});n&&c.push({target:n,source:t.name,name:s.name})})}),{models:e.map(t=>({...t,isChild:e.some(s=>s.fields.find(n=>{var m;return(m=n.type)==null?void 0:m.includes(t.name)}))})),connections:c}},p=`
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
`;export{i as g,p as s};
