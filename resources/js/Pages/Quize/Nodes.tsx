import React from 'react'
import { Node, NodeProps, Handle, Position } from '@xyflow/react';
import { NodeType, NodeCategory } from './types';

const BoardNode = ({ data }: NodeProps<Node<NodeType>>) => {
  return (

    <>
      {data.category === NodeCategory.QUIZE ? (
        <div className="rounded-t-md min-w-64">
          <Handle id={data.title} position={Position.Left} type="target" />
          <div className="rounded-t-md p-1 text-center bg-slate-500">
            <div className='font-bold text-white'>
              {data.title}
            </div>
          </div>
          {data.choices?.map(({ id: choiceId, content }, index) => (
            <div key={choiceId} className='flex justify-between p-1 text-white bg-slate-800'>
              <div>{content}</div>
              <Handle
                id={`source-${data.title}-${choiceId}`}
                position={Position.Right}
                type="source"
                style={{ top: 32 + 16 + 32 * index }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>結果</div>
      )}

    </>

  )
}

export { BoardNode };