// import React, { memo, ChangeEvent } from 'react'

// type Props = {
//   id: string;
//   label: string;
//   placeholder: string;
// }

// const TextForm = ({ id, label, placeholder }: Props) => {
//   return (
//     <>
//       <div className='flex flex-row items-center w-96 bg-slate-200'>
//         <label htmlFor={id} className="block text-sm font-medium text-gray-900 px-3">{label}</label>
//         <input
//           type="text" id={id} placeholder={placeholder}
//           className="bg-slate-100 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full placeholder-slate-400"
//           onChange={onChange}
//         // onChange={(event) => setFlowTitle(event.currentTarget.value)} value={flowTitle}
//         />
//       </div></>
//   )
// }

// export default memo(TextForm);