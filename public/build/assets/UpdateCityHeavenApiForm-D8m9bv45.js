import{r as m,W as v,j as e}from"./app-CLtd0l1O.js";import{T as u,I as d}from"./TextInput-CQ__0Nbm.js";import{I as x}from"./InputLabel-BTkbWDkk.js";import{P as g}from"./PrimaryButton-CpCf8dpJ.js";import{X as k}from"./transition-BfjG27TQ.js";function P({className:h=""}){const a=m.useRef(null),r=m.useRef(null),{data:c,setData:o,errors:n,put:f,reset:t,processing:y,recentlySuccessful:j}=v({access_key:"",shop_id:""}),_=s=>{s.preventDefault(),f(route("cityheaven.update"),{preserveScroll:!0,onSuccess:()=>t(),onError:l=>{var i,p;l.access_key&&(t("access_key"),(i=a.current)==null||i.focus()),l.current_password&&(t("shop_id"),(p=r.current)==null||p.focus())}})};return e.jsxs("section",{className:h,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"シティヘブンAPI利用時必要項目"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"シティヘブンチェック項目アンケートを利用する場合シティヘブンAPI登録が必要です。"})]}),e.jsxs("form",{onSubmit:_,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(x,{htmlFor:"access_key",value:"アクセスキー"}),e.jsx(u,{id:"access_key",ref:a,value:c.access_key,onChange:s=>o("access_key",s.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"access-key"}),e.jsx(d,{message:n.access_key,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(x,{htmlFor:"shop_id",value:"店舗ID"}),e.jsx(u,{id:"shop_id",ref:r,value:c.shop_id,onChange:s=>o("shop_id",s.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"shop-id"}),e.jsx(d,{message:n.shop_id,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(g,{disabled:y,children:"保存"}),e.jsx(k,{show:j,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-gray-600",children:"保存完了"})})]})]})]})}export{P as default};
