'use client'

import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';

// Define custom node types
export interface ClothingNode {
  id: string; // Unique identifier for the node
  type: 'clothing' | 'outfit'; // Type of the node
  name: string; // Name of the clothing or outfit
  image?: string; // Optional image URL for the node
  x?: number; // X-coordinate of the node
  y?: number; // Y-coordinate of the node
  fx?: number; // Fixed X-coordinate
  fy?: number; // Fixed Y-coordinate
}

export interface ClothingLink {
  source: string | ClothingNode; // Source node or ID
  target: string | ClothingNode; // Target node or ID
}

export interface GraphData {
  nodes: ClothingNode[]; // Array of nodes
  links: ClothingLink[]; // Array of links connecting nodes
}

export interface ClothingGraphProps {
  data: GraphData; // Graph data containing nodes and links
  onClothingClick?: (id: string) => void; // Callback for when a clothing node is clicked
}

const ClothingGraph: React.FC<ClothingGraphProps> = ({ data, onClothingClick }) => {
  // Reference to the ForceGraph2D instance
  const fgRef = useRef<ForceGraphMethods<ClothingNode, ClothingLink> | undefined>(undefined) as React.MutableRefObject<ForceGraphMethods<ClothingNode, ClothingLink> | undefined>;

  useEffect(() => {
    // forceRef.current.d3Force("collide", d3.forceCollide(13));
    fgRef.current!.d3Force("charge")!.strength(-1);
    fgRef.current!.d3Force("link")!.distance(30);
    fgRef.current!.d3Force("charge")!.distanceMax(100);
  }, []);


  // State to track the currently hovered node
  const [hoverNode, setHoverNode] = useState<ClothingNode | null>(null);

  // State to track the mouse position for hover effects
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  // State to track the currently selected node
  const [selectedNode, setSelectedNode] = useState<ClothingNode | null>(null);

  // State to track the position of the selected node
  const [selectedPos, setSelectedPos] = useState({ x: 0, y: 0 });

  // Track mouse position manually for hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoverPos({ x: e.pageX, y: e.pageY });
  };

  // Cache for storing loaded images
  const imageCache: { [url: string]: HTMLImageElement } = {};

  // Function to render a node on the canvas
  const renderNode = (node: ClothingNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const size = node.type === 'clothing' ? 5 : 10; // Node size


    if (node.image) {
      let img = imageCache[node.image];

      // Load the image if not already cached
      if (!img) {

        img = new Image();
        img.src = node.image;
        imageCache[node.image] = img;
      }

      if (img.complete && img.naturalWidth !== 0) {
        const ratio = img.naturalHeight / img.naturalWidth
        ctx.save(); // Save the current state

        // Create a circular clipping path
        // ctx.beginPath();
        // ctx.arc(node.x!, node.y!, size / 3, 0, 2 * Math.PI);
        // ctx.closePath();
        // ctx.clip(); // Apply the clipping region

        // Draw the image inside the clipped circle

        ctx.drawImage(img, node.x! - size / 2, node.y! - size / 2, size, size * ratio);

        ctx.restore(); // Restore the previous state (remove clipping)
      }
    } else {
      // Draw a fallback dot if no image is available
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, size / 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#333';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Render the node name if it is of type 'clothing'
    if (node.type === 'clothing') {
      ctx.font = `${12 / globalScale}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#111';
      ctx.fillText(node.name, node.x!, node.y! + size / 2 + 6 / globalScale);
    }
  };

  // Handle hover events on nodes
  const handleNodeHover = (node: ClothingNode | null) => {
    if (node?.type === 'clothing') {
      setHoverNode(node);
    } else {
      setHoverNode(null);
    }
  };

  // Handle click events on nodes
  const handleNodeClick = (node: ClothingNode) => {
    if (node?.type === 'clothing') {
      onClothingClick?.(node.id); // Trigger the callback with the node ID
      //setSelectedNode(node); // Set the selected node
      //setSelectedPos(hoverPos); // Set the position for the tooltip
      window.location.href = `/closet/${node.id}`; // Redirect to the outfit page
    }
    if (node?.type === 'outfit') {
      setSelectedNode(node); // Set the selected node
      setSelectedPos(hoverPos); // Set the position for the tooltip
      //window.location.href = `/fit/${node.id}`; // Redirect to the outfit page
      window.location.href = `/diary/fitcheck`; // example

    }
  };

  return (
    <div
      onMouseMove={handleMouseMove} // Track mouse movement
      className='absolute w-screen left-0' // Styling for the container
    >
      {/* Render a tooltip for the selected node */}
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

      {/* Render the ForceGraph2D component */}
      <ForceGraph2D
        ref={fgRef} // Reference to the graph instance
        graphData={data} // Graph data
        backgroundColor="#fff" // Background color of the canvas
        nodeId="id" // Node ID field
        nodeCanvasObject={(node, ctx, globalScale) => renderNode(node, ctx, globalScale)} // Custom node rendering
        onNodeHover={handleNodeHover} // Handle hover events
        onNodeClick={handleNodeClick} // Handle click events
        linkColor={() => '#AAA'} // Link color
        linkWidth={1} // Link width
        cooldownTicks={50} // Number of ticks before stopping the simulation
        onEngineStop={() => {
          // Automatically zoom to fit the graph when the simulation stops
          const screenWidth = window.innerWidth;
          const padding = screenWidth <= 768 ? -100 : 100; // Adjust padding for mobile and desktop
          fgRef.current?.zoomToFit(500, padding);
        }}
      />
    </div>
  );
};

export default ClothingGraph;
