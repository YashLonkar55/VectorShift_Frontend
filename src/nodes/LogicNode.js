import { Position } from 'reactflow';
import { AbstractNode } from '../component/AbstractNode';

export const LogicNode = ({ id, data }) => (
  <AbstractNode
    id={id}
    type="logic"
    label="Logic"
    fields={[
      { name: 'condition', label: 'Condition', type: 'select', options: ['Equal', 'Not Equal', 'Greater', 'Less'] },
      { name: 'value', label: 'Value', type: 'text' },
    ]}
    initialValues={{
      condition: data?.condition || 'Equal',
      value: data?.value || '',
    }}
    handles={[
      { id: `${id}-output`, type: 'source', position: Position.Right },
      { id: `${id}-input`, type: 'target', position: Position.Left },
    ]}
  />
);
