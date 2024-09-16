import React from 'react'
import { Node, NodeProps, Handle, Position } from '@xyflow/react';
import { Model } from './types';


const ModelNode = ({ data }: NodeProps<Node<Model>>) => {
  return (
    <div className="rounded-t-md min-w-64">
      {data.isChild && <Handle id={data.name} position={Position.Top} type="target" />}
      <div className="rounded-t-md p-1 text-center bg-slate-500">
        <p className='font-bold text-white'>
          {data.name}
        </p>
      </div>
      {data.fields.map(({ name: fieldName, type: fieldType, hasConnections }, index) => (
        <div key={fieldName} className='flex justify-between p-1 text-white bg-slate-800'>
          <div>{fieldName}</div>
          <div>{fieldType}</div>

          {hasConnections && <Handle
            id={`${data.name}-${fieldName}`}
            position={Position.Right}
            type="source"
            style={{ top: 32 + 16 + 32 * index }}
          />}

        </div>
      ))}
    </div>
  )
}

export default ModelNode