import React, { useEffect, useState } from 'react';

function Entries({ titles }) {
  return (
    <div style={{ height: '400px', overflow: 'scroll' }}>
      {titles.map((title) => {
        return (
          <div key={title.link}>
            {title.title} ({title.entryCount})
          </div>
        );
      })}
    </div>
  );
}

export default Entries;
