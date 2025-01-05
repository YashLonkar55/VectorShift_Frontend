import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { TiDelete } from "react-icons/ti";
import './TextNode.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [containerHeight, setContainerHeight] = useState(150);
  const textRef = useRef(null);
  const { setNodes } = useReactFlow();

  const detectVariables = (input) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g;
    const matches = Array.from(input.matchAll(regex)).map((match) => match[1]);
    setVariables([...new Set(matches)]);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    detectVariables(newText);
  };

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  // Add effect to sync with data.text changes
  useEffect(() => {
    if (data?.text !== undefined && data.text !== currText) {
      setCurrText(data.text);
      detectVariables(data.text);
    }
  }, [data?.text]);

  // Initialize variables on mount
  useEffect(() => {
    detectVariables(currText);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      const scrollHeight = textRef.current.scrollHeight;
      textRef.current.style.height = `${Math.min(scrollHeight, 150)}px`;
      
      // Calculate container height based on both textarea and variables
      const textareaHeight = Math.min(scrollHeight, 150);
      const variablesHeight = variables.length * 30;
      const headerHeight = 45; // header + padding
      const minHeight = 150;
      
      setContainerHeight(Math.max(minHeight, textareaHeight + variablesHeight + headerHeight));
    }
  }, [currText, variables]);

  return (
    <div className="node-container" style={{ height: `${containerHeight}px` }}

    >
        <div className="node-header">
        <div className="node-header-text">Text Node</div>
        <button 
          className="delete-button"
          onClick={handleDelete}
          aria-label="Delete node"
        >
          <TiDelete size={20} />
        </button>
        </div>
      <div className="node-content">
        <textarea
          ref={textRef}
          value={currText}
          onChange={handleTextChange}
          className="text-input"
        />
        {variables.map((variable, index) => (
          <div key={`${id}-${variable}`}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${variable}`}
                style={{
                top: `${index * 30 + 10}px`,
                }}
            />
          </div>
        ))}
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-output`}
            style={{
            bottom: '10px',
            }}
        />
      </div>
    </div>
  );
};


