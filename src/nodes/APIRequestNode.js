import { Position } from 'reactflow';
import { AbstractNode } from '../component/AbstractNode';

export const APIRequestNode = ({ id, data }) => (
  <AbstractNode
    id={id}
    type="apiRequest"
    label="API Request"
    fields={[
      { name: 'url', label: 'URL', type: 'text' },
      { name: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'] },
    ]}
    initialValues={{
      url: data?.url || '',
      method: data?.method || 'GET',
    }}
    handles={[
      { id: `${id}-response`, type: 'source', position: Position.Right },
      { id: `${id}-request`, type: 'target', position: Position.Left },
    ]}
  />
);
