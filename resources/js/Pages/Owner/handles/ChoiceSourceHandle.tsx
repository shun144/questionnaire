import React, { CSSProperties } from 'react';
import {
  Handle,
  HandleType,
  Position,
  useHandleConnections,
} from '@xyflow/react';

// import './index.css'


export type ChoiceSourceHandleProps = {
  id: string;
  type: HandleType;
  position: Position;
  connectionLimit: number;
  style: CSSProperties;
}

const ChoiceSourceHandle = ({ id, type, position, connectionLimit, style }: ChoiceSourceHandleProps) => {

  // コネクション情報
  const connections = useHandleConnections({ id, type });

  return (
    <Handle
      id={id}
      type={type}
      position={position}
      isConnectable={connections.length < connectionLimit}  // コネクション数を制限する
      style={{ ...style, cursor: "pointer" }
      } />
  );
};

export default ChoiceSourceHandle;
