import React from 'react';


export default ({tools}) => (
  <div>
    {
      tools.map(tool => (
        <div
          key={tool.id}
          style={{borderColor: tool.data.model.color}}
          draggable={true}
          onDragStart={event =>  event.dataTransfer.setData('blockType', JSON.stringify(tool))}
        >
          {tool.data.model.name}
        </div>
      ))
    }
  </div>
);
