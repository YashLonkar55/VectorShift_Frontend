import React, { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [loading, setLoading] = useState(false);

    // Get nodes and edges from the store
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        // Validate if nodes and edges exist
        console.log('Nodes:', nodes);
        console.log('Edges:', edges);
        if (!nodes || !edges) {
            alert('Please create some nodes and connect them before submitting.');
            return;
        }

        if (nodes.length === 0) {
            alert('Please add at least one node to the pipeline.');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    data: node.data,
                    position: node.position
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target
                }))
            };

            console.log("Sending payload:", JSON.stringify(payload, null, 2));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                alert(
                    `Pipeline Analysis:\nNumber of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag ? 'Yes' : 'No'}`
                );
            } else {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.detail || errorData?.message || 'Unknown error occurred';
                console.error('Server Error Response:', errorData);
                alert(`Error: Failed to analyze the pipeline.\nDetails: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('Error: Could not connect to the backend server. Please ensure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                onClick={handleSubmit}
                type="button"
                style={{
                    padding: '8px 16px',
                    backgroundColor: loading ? '#e2e8f0' : '#f6f8fa',
                    border: '1px solid #2a2b2c',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '13px',
                }}
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
};
