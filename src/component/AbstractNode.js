// AbstractNode.js
import { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { TiDelete } from "react-icons/ti";
import './AbstractNode.css';

export const AbstractNode = ({
  id,
  label,
  fields = [],
  initialValues = {},
  handles = [],
}) => {
  const [state, setState] = useState(initialValues);
  const { setNodes } = useReactFlow();

  const handleChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="node-container">
      <div className="node-header">
        <span className="node-header-text">{label}</span>
        <button 
          className="delete-button"
          onClick={handleDelete}
          aria-label="Delete node"
        >
          <TiDelete size={25} />
        </button>
      </div>
      <div className="node-content">
        {fields.map((field) => (
          <div key={field.name} className="field-container">
            <label className="field-label">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                className="field-select"
                value={state[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="field-input"
                type={field.type}
                value={state[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className="handle"
          style={handle.style}
        />
      ))}
    </div>
  );
};

