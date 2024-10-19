import { memo, CSSProperties } from 'react';
import {
  Handle,
  HandleType,
  Position,
  useHandleConnections,
} from '@xyflow/react';

export type Props = {
  id: string;
  type: HandleType;
  position: Position;
  connectionLimit: number;
  style: CSSProperties;
}

const ChoiceSourceHandle = ({ id, type, position, connectionLimit, style }: Props) => {

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

export default memo(ChoiceSourceHandle);
