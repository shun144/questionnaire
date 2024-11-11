import { memo, useMemo } from "react";
import HorizontalBarChart, { BarChartProps } from "./HorizontalBarChart";

import { motion, MotionStyle } from 'framer-motion';

interface Props extends BarChartProps {
  colLength: number;
}

const ExpandableRow = ({ flowId, colLength }: Props) => {

  // グラフ行の最大表示高さ
  const maxRowHeight = useMemo(() => 800, [])

  return (
    <tr className="bg-indigo-50 border-b">
      <td colSpan={colLength} className="relative overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3, ease: 'linear' }}
          style={{ originY: 0, maxHeight: `${maxRowHeight}px`, overflowY: 'scroll' } as MotionStyle}
        >
          <HorizontalBarChart flowId={flowId} />
        </motion.div>
      </td>
    </tr>
  );
}

export default memo(ExpandableRow);

