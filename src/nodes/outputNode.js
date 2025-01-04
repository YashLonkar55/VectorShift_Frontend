import { AbstractNode } from '../component/AbstractNode';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => (
  <AbstractNode
    id={id}
    label="Output"
    fields={[
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'type', label: 'Type', type: 'select', options: ['Text', 'Image'] },
    ]}
    initialValues={{
      name: data?.outputName || id.replace('customOutput-', 'output_'),
      type: data?.outputType || 'Text',
    }}
    handles={[
      { id: `${id}-value`, type: 'target', position: Position.Left },
    ]}
  />
);
