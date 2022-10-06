import React, { useEffect } from 'react';

function SelectBox({ channels, changeChannel }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>Kanallar</h1>
      <select onChange={changeChannel}>
        {channels.map((ch) => (
          <option value={ch} key={ch}>
            {ch}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
