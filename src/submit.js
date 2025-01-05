import React, { useState } from 'react';
import { useStore } from './store';
import toast from 'react-hot-toast';

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
            toast.error('Please create some nodes and connect them before submitting.');
            return;
        }

        if (nodes.length === 0) {
            toast.error('Please add at least one node to the pipeline.');
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
                toast.success(
                    <div>
                        <h3 style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Pipeline Analysis</h3>
                        <p style={{ margin: '4px 0' }}>Number of Nodes: {data.num_nodes}</p>
                        <p style={{ margin: '4px 0' }}>Number of Edges: {data.num_edges}</p>
                        <p style={{ margin: '4px 0' }}>Is DAG: {data.is_dag ? 'Yes' : 'No'}</p>
                    </div>,
                    {
                        duration: 5000,
                        style: {
                            padding: '16px',
                            borderRadius: '8px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            } else {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.detail || errorData?.message || 'Unknown error occurred';
                console.error('Server Error Response:', errorData);
                toast.error(`Failed to analyze the pipeline: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            toast.error('Could not connect to the backend server. Please ensure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
            <button
                onClick={handleSubmit}
                type="button"
                style={{
                    padding: '10px 20px',
                    backgroundColor: loading ? 'rgba(0, 4, 255, 0.5)' : 'rgba(0, 4, 255, 0.5)',
                    color: loading ? '#6b7280' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
                disabled={loading}
                
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>  
    );
};
