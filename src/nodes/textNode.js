import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textRef = useRef(null);

  // Function to detect variables in the format {{ variableName }}
  const detectVariables = (input) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g;
    const matches = Array.from(input.matchAll(regex)).map((match) => match[1]);
    setVariables([...new Set(matches)]); // Remove duplicates
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    detectVariables(newText);
  };

  useEffect(() => {
    if (textRef.current) {
      // Adjust height dynamically based on text content
      textRef.current.style.height = 'auto';
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [currText]);

  return (
    <div
      style={{
        width: `${Math.min(Math.max(currText.length * 10, 100), 300)}px`, // Adjust width based on text length
        border: '1px solid black',
        padding: '10px',
        borderRadius: '5px',
        background: '#f9f9f9',
        position: 'relative',
        height: `${Math.max(100, variables.length * 30 + 40)}px`, // Ensure enough height for all handles
      }}
    >
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Text Node</div>
      <textarea
        ref={textRef}
        value={currText}
        onChange={handleTextChange}
        style={{
          width: '100%',
          resize: 'none',
          border: 'none',
          outline: 'none',
          fontSize: '14px',
          fontFamily: 'inherit',
        }}
      />
      {variables.map((variable, index) => (
        <div key={`${id}-${variable}`}>
          {/* Target Handle for Variables */}
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{
              top: `${index * 30 + 10}px`, // Space out handles
              background: '#555',
            }}
          />
            {/* Label for the Variable */}
            {/* <span
              style={{
                position: 'absolute',
                top: `${index * 30 + 15}px`,
                left: '-50px',
                padding: '2px 5px',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                background: '#e1e1e1',
              }}
          >
            {variable}
          </span> */}
        </div>
      ))}

      {/* Source Handle positioned at the bottom */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#555',
          position: 'absolute',
          bottom: '10px', // Position it at the bottom of the node
        }}
      />
    </div>
  );
};
