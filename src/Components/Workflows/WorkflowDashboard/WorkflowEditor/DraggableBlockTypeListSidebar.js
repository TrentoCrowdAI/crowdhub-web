import React from 'react';


export default ({blockTypes}) => (
  <div>
    {
      blockTypes.map(blockType => (
        <div
          key={blockType.id}
          style={{borderColor: blockType.data.nodeDefinition.color}}
          draggable={true}
          onDragStart={event => event.dataTransfer.setData('blockType', JSON.stringify(blockType))}>
          {blockType.data.nodeDefinition.name}
        </div>
      ))
    }
  </div>
);
