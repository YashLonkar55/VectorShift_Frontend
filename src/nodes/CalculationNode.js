import { Position } from 'reactflow';
import { AbstractNode } from '../component/AbstractNode';

export const CalculationNode = ({ id, data }) => (
  <AbstractNode
    id={id}
    type="calculation"
    label="Calculation"
    fields={[
      { name: 'operation', label: 'Operation', type: 'select', options: ['Add', 'Subtract', 'Multiply', 'Divide'] },
      { name: 'value1', label: 'Value 1', type: 'number' },
      { name: 'value2', label: 'Value 2', type: 'number' },
    ]}
    initialValues={{
      operation: data?.operation || 'Add',
      value1: data?.value1 || 0,
      value2: data?.value2 || 0,
    }}
    handles={[
      { id: `${id}-result`, type: 'source', position: Position.Right },
      { id: `${id}-input1`, type: 'target', position: Position.Left },
      { id: `${id}-input2`, type: 'target', position: Position.Left },
    ]}
  />
);
