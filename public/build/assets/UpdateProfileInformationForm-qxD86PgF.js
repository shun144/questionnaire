import{q as p,W as j,j as e,a as v}from"./app-MNzaSWed.js";import{T as n,I as m}from"./TextInput-BbtmlFoK.js";import{I as l}from"./InputLabel-DbN61rcf.js";import{P as g}from"./PrimaryButton-DmcJVVsV.js";import{X as y}from"./transition-DnuR3wA2.js";function w({mustVerifyEmail:o,status:c,className:u=""}){const s=p().props.auth.user,{data:t,setData:i,patch:d,errors:r,processing:x,recentlySuccessful:f}=j({name:s.name,email:s.email}),h=a=>{a.preventDefault(),d(route("admin.profile.update"))};return e.jsxs("section",{className:u,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"プロフィール"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"プロフィール情報やメールアドレスを更新します"})]}),e.jsxs("form",{onSubmit:h,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"name",value:"Name"}),e.jsx(n,{id:"name",className:"mt-1 block w-full",value:t.name,onChange:a=>i("name",a.target.value),required:!0,isFocused:!0,autoComplete:"name"}),e.jsx(m,{className:"mt-2",message:r.name})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"email",value:"Email"}),e.jsx(n,{id:"email",type:"email",className:"mt-1 block w-full",value:t.email,onChange:a=>i("email",a.target.value),required:!0,autoComplete:"username"}),e.jsx(m,{className:"mt-2",message:r.email})]}),o&&s.email_verified_at===null&&e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm mt-2 text-gray-800",children:["Your email address is unverified.",e.jsx(v,{href:route("admin.verification.send"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),c==="verification-link-sent"&&e.jsx("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(g,{disabled:x,children:"Save"}),e.jsx(y,{show:f,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{w as default};