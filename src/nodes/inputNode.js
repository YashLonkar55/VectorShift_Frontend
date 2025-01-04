import { useState } from 'react'; // For managing state
import { Handle, Position } from 'reactflow'; // For React Flow components
import { AbstractNode } from '../component/AbstractNode';

export const InputNode = ({ id, data }) => (
  <AbstractNode
    id={id}
    type="input"
    label="Input"
    fields={[
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'type', label: 'Type', type: 'select', options: ['Text', 'File'] },
    ]}
    initialValues={{
      name: data?.inputName || id.replace('customInput-', 'input_'),
      type: data?.inputType || 'Text',
    }}
    handles={[
      { id: `${id}-value`, type: 'source', position: Position.Right },
    ]}
  />
);
