import { Menu, Item, TriggerEvent, Separator, Submenu, ItemParams, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useOwnerStore } from '../../store';
import { useCallback } from "react";
import { useReactFlow } from '@xyflow/react';

const QUESTION_MENU_ID = "cityheaven-qestion-menu-id";
const { show } = useContextMenu({ id: QUESTION_MENU_ID });

export const showContextMenu = (event: TriggerEvent, nodeId: string) => {
  show({ event, props: { nodeId } });
}

const FlowMenu = () => {
  const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
  // const firstNodeId = useOwnerStore((state) => state.firstNodeId);
  const { deleteElements } = useReactFlow();


  const handleUpdateFirstQuestion = useCallback((params: ItemParams) => {
    if (!params.props) {
      return
    }
    setFirstNodeId(params.props['nodeId'])
  }, [setFirstNodeId]);


  const deleteNode = useCallback((params: ItemParams) => {
    if (!params.props) {
      return
    }
    deleteElements({ nodes: [{ id: params.props['nodeId'] }] });
  }, []);

  return (
    <Menu id={QUESTION_MENU_ID}>
      <Item
        closeOnClick={true}
        onClick={(params) => handleUpdateFirstQuestion(params)}>
        1問目に設定
      </Item>
      <Item
        closeOnClick={true}
        onClick={(params) => deleteNode(params)}>
        削除
      </Item>
    </Menu>
  )
}

export default FlowMenu