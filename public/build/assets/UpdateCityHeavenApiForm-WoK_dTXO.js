import{r as o,W as w,j as e,y as I}from"./app-CKUasEkn.js";import{T as h,I as f}from"./TextInput-Dtj-0vot.js";import{I as j}from"./InputLabel-CO99aJdj.js";import{X as C}from"./transition-Bop5StqK.js";const D=({className:v="",masking_access_key:s,masking_shop_id:a})=>{const n=o.useRef(null),c=o.useRef(null),{data:i,setData:d,errors:p,put:y,reset:r,processing:l,recentlySuccessful:g}=w({access_key:"",shop_id:""}),b=t=>{t.preventDefault(),y(route("cityheaven.update"),{preserveScroll:!0,onSuccess:()=>r(),onError:u=>{var x,m;u.access_key&&(r("access_key"),(x=n.current)==null||x.focus()),u.current_password&&(r("shop_id"),(m=c.current)==null||m.focus())}})},N=t=>{t.preventDefault(),I.delete("/city-heaven",{preserveScroll:!0,onBefore:()=>confirm(`資格情報を削除してよろしいですか？
作成済みのシティヘブン診断結果が表示されなくなります`),onFinish:()=>r()})};return e.jsxs("section",{className:v,children:[e.jsxs("header",{children:[e.jsx("h2",{className:`text-lg font-medium text-gray-900 inline-block
                after:ml-2 after:text-[10px] after:font-bold after:py-1 after:px-2 after:text-white after:rounded-full
                ${s&&a?"after:content-['登録済み']   after:bg-emerald-500":"after:content-['未登録']  after:bg-red-500 "}
                `,children:"シティヘブンAPI利用 資格情報"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"シティヘブンチェック診断を利用する場合、シティヘブンAPIに関する資格情報（アクセスキーと店舗ID）が必要です。"})]}),e.jsx("div",{className:"w-full pt-4",children:s&&a&&e.jsx("div",{className:"w-full h-full flex flex-col justify-center items-start",children:e.jsxs("div",{className:"text-[14px] text-white select-none bg-emerald-500/90 py-2 px-4 rounded grid grid-rows-2 grid-cols-2 gap-y-1 w-52",style:{gridTemplateColumns:"1fr 35px"},children:[e.jsx("div",{className:"",children:"登録済みアクセスキー："}),e.jsx("div",{className:"text-end",children:s}),e.jsx("div",{className:"",children:"登録済み店舗ID："}),e.jsx("div",{className:"text-end",children:a})]})})}),e.jsxs("form",{onSubmit:b,className:"mt-12 space-y-6",children:[e.jsxs("div",{children:[e.jsx(j,{htmlFor:"access_key",value:"アクセスキー"}),e.jsx(h,{id:"access_key",ref:n,value:i.access_key,onChange:t=>d("access_key",t.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"access-key"}),e.jsx(f,{message:p.access_key,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(j,{htmlFor:"shop_id",value:"店舗ID"}),e.jsx(h,{id:"shop_id",ref:c,value:i.shop_id,onChange:t=>d("shop_id",t.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"shop-id"}),e.jsx(f,{message:p.shop_id,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-end justify-center gap-2",children:[e.jsx("button",{className:` py-2 px-3 text-white rounded shadow transition-all 
                            ${l?" bg-slate-400 hover:bg-slate-400":"bg-indigo-500 hover:bg-indigo-600"}`,disabled:l,children:"保 存"}),e.jsx(C,{show:g,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-gray-600",children:"保存完了"})})]}),e.jsx("button",{className:` py-2 px-3 text-white rounded shadow transition-all  ${!s||!a||l?"bg-slate-400 hover:bg-slate-400":"bg-red-500 hover:bg-red-600"}`,disabled:!s||!a||l,onClick:N,children:"削 除"})]})]})]})},T=o.memo(D);export{T as default};
