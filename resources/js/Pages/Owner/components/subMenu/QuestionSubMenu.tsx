import { memo } from 'react';
import { Menu, Item, TriggerEvent, ItemParams, useContextMenu } from "react-contexify";
import { useOwnerStore } from '../../store';
import { useCallback } from "react";
import { useReactFlow } from '@xyflow/react';

const QUESTION_MENU_ID = "question-menu-id";
const { show } = useContextMenu({ id: QUESTION_MENU_ID });

export const showContextMenu = (event: TriggerEvent, nodeId: string) => {
  show({ event, props: { nodeId } });
}

const QuestionSubMenu = () => {
  const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
  const addQnodeNum = useOwnerStore((state) => state.addQnodeNum);
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
    addQnodeNum(-1);
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

export default memo(QuestionSubMenu)