import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

// const handleStyle = { left: 10 };

const TextUpdaterNode = () => {

  const onChange = useCallback(() => {
    // console.log(evt.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Left} id="a" />
      <div>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default TextUpdaterNode;