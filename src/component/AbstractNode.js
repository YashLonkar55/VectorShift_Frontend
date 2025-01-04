// AbstractNode.js
import { useState, useStore } from 'react';
import { Handle, Position } from 'reactflow';
import './AbstractNode.css';

export const AbstractNode = ({
  id,
  label,
  fields = [],
  initialValues = {},
  handles = [],
}) => {
  const [state, setState] = useState(initialValues);
  // const updateNodeField = useStore((state) => state.updateNodeField);
  const handleChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    // updateNodeField(id, key, value);  // Use the store's method to update state
  };

  return (
    <div className="node-container">
      <div className="node-header">
        <span className="node-header-text">{label}</span>
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

