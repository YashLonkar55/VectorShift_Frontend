// import { useState } from 'react'; // For managing state
import {Position } from 'reactflow'; // For React Flow components
import { AbstractNode } from '../component/AbstractNode';

export const inputNode1 = ({ id, data }) => (
  <AbstractNode
    id={id}
    type="input1"
    label="Input1"
    fields={[
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'type', label: 'Type', type: 'select', options: ['Text', 'File'] },
    ]}
    initialValues={{
      name: data?.inputName || id.replace('custom1Input-', 'input1_'),
      type: data?.inputType || 'Text',
    }}
    handles={[
      { id: `${id}-value`, type: 'source', position: Position.Right },
    ]}
  />
);
