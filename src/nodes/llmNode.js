import { Handle, Position } from 'reactflow';
import { AbstractNode } from '../component/AbstractNode';

export const LLMNode = ({ id }) => (
  <AbstractNode
    id={id}
    type="llm"
    label="LLM"
    fields={[]} // No fields for LLM
    handles={[
      { id: `${id}-system`, type: 'target', position: Position.Left, style: { top: '33%' } },
      { id: `${id}-prompt`, type: 'target', position: Position.Left, style: { top: '66%' } },
      { id: `${id}-response`, type: 'source', position: Position.Right },
    ]}
  />
);
