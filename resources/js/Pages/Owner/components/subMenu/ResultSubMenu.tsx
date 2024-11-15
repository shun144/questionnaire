import { memo } from 'react';
import { Menu, Item, TriggerEvent, ItemParams, useContextMenu } from "react-contexify";
import { useCallback } from "react";
import { useReactFlow } from '@xyflow/react';
import { useOwnerStore } from '../../store';

const RESUTL_MENU_ID = "result-menu-id";
const { show } = useContextMenu({ id: RESUTL_MENU_ID });

export const showContextMenu = (event: TriggerEvent, nodeId: string) => {
  show({ event, props: { nodeId } });
}

const ResultSubMenu = () => {
  const addRnodeNum = useOwnerStore((state) => state.addRnodeNum);
  const { deleteElements } = useReactFlow();

  const deleteNode = useCallback((params: ItemParams) => {
    if (!params.props) {
      return
    }
    deleteElements({ nodes: [{ id: params.props['nodeId'] }] });
    addRnodeNum(-1);
  }, []);

  return (
    <Menu id={RESUTL_MENU_ID}>
      <Item
        closeOnClick={true}
        onClick={(params) => deleteNode(params)}>
        削除
      </Item>
    </Menu>
  )
}

export default memo(ResultSubMenu)