import React, { useEffect, useState } from 'react';

function Entries({ titles }) {
  return (
    <div className="botWrapper">
      <div className="bot">
        {titles.map((title) => {
          return (
            <div
              key={title.link}
              style={{ borderBottom: '1px solid gray', padding: '15px 10px' }}
            >
              <a
                href={title.link}
                style={{ color: 'white' }}
                target="_blank"
                rel="noreferrer"
              >
                {title.title} ({title.entryCount})
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Entries;
