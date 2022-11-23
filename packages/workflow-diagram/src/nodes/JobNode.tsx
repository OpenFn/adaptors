import React, { memo, useState } from 'react';

import cc from 'classcat';
import type { NodeProps } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import { NodeData } from 'layout/types';

function PlusButton() {
  return (
    <button
      id="plusButton"
      className="transition duration-500 ease-in-out pointer-events-auto rounded-full bg-indigo-600 py-1 px-4 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
    >
      <svg
        id="plusIcon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    </button>
  );
}

const JobNode = ({
  data,
  isConnectable,
  selected,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps<NodeData>) => {
  const [isMouseInside, setIsMouseInside] = useState(false);

  const mouseEnter = () => {
    setIsMouseInside(true);
  };
  const mouseLeave = () => {
    setIsMouseInside(false);
  };

  return (
    <div
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={cc([
        'bg-white',
        'cursor-pointer',
        'h-full',
        'p-2',
        'rounded-md',
        'shadow-sm',
        'text-center',
        'text-xs',
        selected ? 'ring-2' : 'ring-0.5',
        selected ? 'ring-indigo-500' : 'ring-black',
        selected ? 'ring-opacity-20' : 'ring-opacity-5',
      ])}
    >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        style={{ border: 'none', height: 0, top: 0 }}
      />

      <div
        className={cc([
          'h-full',
          'text-center',
          !data.hasChildren ? 'items-center' : false,
        ])}
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p>{data?.label}</p>
        </div>
        {isMouseInside && <PlusButton />}
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
        style={{ border: 'none', height: 0, top: 0 }}
      />
    </div>
  );
};

JobNode.displayName = 'JobNode';

export default memo(JobNode);
