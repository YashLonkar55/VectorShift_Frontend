import { Position } from 'reactflow';
import { AbstractNode } from '../component/AbstractNode';

export const ConditionalNode = ({ id, data }) => (
  <AbstractNode
    id={id}
    type="conditional"
    label="Conditional"
    fields={[
      { name: 'if', label: 'If', type: 'text' },
      { name: 'then', label: 'Then', type: 'text' },
      { name: 'else', label: 'Else', type: 'text' },
    ]}
    initialValues={{
      if: data?.if || '',
      then: data?.then || '',
      else: data?.else || '',
    }}
    handles={[
      { id: `${id}-true`, type: 'source', position: Position.Right },
      { id: `${id}-false`, type: 'source', position: Position.Right },
      { id: `${id}-input`, type: 'target', position: Position.Left },
    ]}
  />
);
