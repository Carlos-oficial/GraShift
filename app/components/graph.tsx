"use client";

import React, { useRef, useState, MouseEvent } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';

// Define custom node types
export interface ClothingNode {
  id: string;
  type: 'clothing' | 'outfit';
  name: string;
  image?: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface ClothingLink {
  source: string | ClothingNode;
  target: string | ClothingNode;
}

export interface GraphData {
  nodes: ClothingNode[];
  links: ClothingLink[];
}

export interface ClothingGraphProps {
  data: GraphData;
  onClothingClick?: (id: string) => void;
}

const ClothingGraph: React.FC<ClothingGraphProps> = ({ data, onClothingClick }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [hoverNode, setHoverNode] = useState<ClothingNode | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const renderNode = (node: ClothingNode, ctx: CanvasRenderingContext2D) => {
    const size = 32;
    const img = new Image();
    img.src = node.image || '';

    ctx.drawImage(img, node.x! - size / 2, node.y! - size / 2, size, size);

    if (node.type === 'clothing') {
      ctx.font = '6px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#111111';
      ctx.fillText(node.name, node.x!, node.y! + size / 2 + 6);
    }
  };

  const handleNodeHover = (node: ClothingNode | null, event: MouseEvent) => {
    if (node?.type === 'clothing') {
      setHoverNode(node);
      setHoverPos({ x: event.pageX, y: event.pageY });
    } else {
      setHoverNode(null);
    }
  };

  const handleNodeClick = (node: ClothingNode) => {
    if (node?.type === 'clothing') {
      onClothingClick?.(node.id);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {hoverNode && (
        <div
          style={{
            position: 'absolute',
            left: hoverPos.x + 10,
            top: hoverPos.y + 10,
            background: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
            zIndex: 1000
          }}
        >
          <strong>{hoverNode.name}</strong>
          <br />
          <button onClick={() => onClothingClick?.(hoverNode.id)}>
            View outfits
          </button>
        </div>
      )}

      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        backgroundColor="#fff"
        nodeId="id"
        nodeCanvasObject={renderNode}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        linkColor={() => '#111'}
        linkWidth={1}
        cooldownTicks={50}
        onEngineStop={() => fgRef.current?.zoomToFit(10)}
      />
    </div>
  );
};

export default ClothingGraph;
