import { memo, CSSProperties } from 'react';
import {
  Handle,
  HandleType,
  Position,
  useHandleConnections,
} from '@xyflow/react';

export type Props = {
  id: string;
  connectionLimit: number;
  style: CSSProperties;
}

const type: HandleType = "source";

const ChoiceSourceHandle = ({ id, connectionLimit, style }: Props) => {

  // コネクション情報
  const connections = useHandleConnections({ id, type });

  return (
    <Handle
      id={id}
      type={type}
      position={Position.Right}
      isConnectable={connections.length < connectionLimit}  // コネクション数を制限する
      style={{ ...style, cursor: "pointer" }
      } />
  );
};

export default memo(ChoiceSourceHandle);
