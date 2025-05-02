'use client'

import React, { useRef, useState } from 'react';
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
  const fgRef = useRef<ForceGraphMethods>(null);
  const [hoverNode, setHoverNode] = useState<ClothingNode | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const [selectedNode, setSelectedNode] = useState<ClothingNode | null>(null);
  const [selectedPos, setSelectedPos] = useState({ x: 0, y: 0 });

  // Track mouse position manually
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoverPos({ x: e.pageX, y: e.pageY });
  };

  

  const imageCache: { [url: string]: HTMLImageElement } = {};

const renderNode = (node: ClothingNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
  const size = 12;

  if (node.image) {
    let img = imageCache[node.image];

    if (!img) {
      img = new Image();
      img.src = node.image;
      imageCache[node.image] = img;
      //img.onload = () => {
        // Trigger re-render once image is loaded
        //fgRef.current?.refreshCanvas();
      //};
    }

    // Only draw if loaded
    if (img.complete && img.naturalWidth !== 0) {
      ctx.drawImage(img, node.x! - size / 2, node.y! - size / 2, size, size);
    }
  } else {
    // Draw a fallback dot
    ctx.beginPath();
    ctx.arc(node.x!, node.y!, size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  if (node.type === 'clothing') {
    ctx.font = `${6 / globalScale}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#111';
    ctx.fillText(node.name, node.x!, node.y! + size / 2 + 6 / globalScale);
  }
};

  

  const handleNodeHover = (node: ClothingNode | null) => {
    if (node?.type === 'clothing') {
      setHoverNode(node);
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
    <div
      onMouseMove={handleMouseMove}
      className='absolute fixed w-screen left-0'
    >

      {selectedNode && (
        <div
          style={{
            position: 'absolute',
            left: selectedPos.x + 2,
            top: selectedPos.y + 2,
            background: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
            zIndex: 1000
          }}
        >
          <strong>{selectedNode.name}</strong>
          <br />
          <button onClick={() => onClothingClick?.(selectedNode.id)}>
            View outfits
          </button>
        </div>
      )}

      <ForceGraph2D
        ref={fgRef}
        
        graphData={data}
        backgroundColor="#fff"
        nodeId="id"
        nodeCanvasObject={(node, ctx, globalScale) => renderNode(node, ctx, globalScale)}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        linkColor={() => '#111'}
        linkWidth={1}
        cooldownTicks={50}
        onEngineStop={() => fgRef.current?.zoomToFit(800,400)}
        on
      />
    </div>
  );
};

export default ClothingGraph;
