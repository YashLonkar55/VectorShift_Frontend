import { DraggableNode } from './draggableNode';
import './toolbar.css';
import { 
    FiBox, 
    FiCpu, 
    FiSend, 
    FiType, 
    FiServer,
    FiGlobe, 
    FiGitBranch,
    FiPercent,
    FiCode 
} from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';

export const PipelineToolbar = () => {
    const nodes = [
        { type: 'customInput', label: 'Input', icon: <FiBox className="icon" /> },
        { type: 'llm', label: 'LLM', icon: <BsRobot className="icon" /> },
        { type: 'customOutput', label: 'Output', icon: <FiSend className="icon" /> },
        { type: 'text', label: 'Text', icon: <FiType className="icon" /> },
        { type: 'apiRequest', label: 'API Request', icon: <FiServer className="icon" /> },
        { type: 'apiRequest', label: 'URL', icon: <FiGlobe className="icon" /> },
        { type: 'conditional', label: 'Conditional', icon: <FiGitBranch className="icon" /> },
        { type: 'calculation', label: 'Calculation', icon: <FiPercent className="icon" /> },
        { type: 'logic', label: 'Logic', icon: <FiCode className="icon" /> }
    ];

    return (
        <div className="toolbar-container">
            <div className="toolbar-content">
                <div className="toolbar-brand">
                    <FiCpu />
                    Pipeline Builder
                </div>
                <div className="toolbar-items">
                    {nodes.map((node) => (
                        <DraggableNode
                            key={`${node.type}-${node.label}`}
                            type={node.type}
                            label={
                                <span className="draggable-item">
                                    {node.icon}
                                    {node.label}
                                </span>
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
