import { Position } from 'reactflow';
import { AbstractNode } from '../component/AbstractNode';

export const TextProcessingNode = ({ id, data }) => (
  <AbstractNode
    id={id}
    type="textProcessing"
    label="Text Processing"
    fields={[
      { name: 'action', label: 'Action', type: 'select', options: ['Uppercase', 'Lowercase', 'Trim'] },
      { name: 'text', label: 'Text', type: 'text' },
    ]}
    initialValues={{
      action: data?.action || 'Uppercase',
      text: data?.text || '',
    }}
    handles={[
      { id: `${id}-output`, type: 'source', position: Position.Right },
      { id: `${id}-input`, type: 'target', position: Position.Left },
    ]}
  />
);
