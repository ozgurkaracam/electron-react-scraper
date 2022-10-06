import moment from 'moment';
import React, { useEffect } from 'react';
import { FormSelect } from 'react-bootstrap';

function SelectBox({ channels, changeChannel, selectedchannel }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="top">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Kanallar</h1>
        <span>
          {moment().format('D-M-Y')} Tarihinde ek$isözlük'te En Çok Entry
          Girilen Başlıklar
        </span>
      </div>
      <FormSelect
        value={selectedchannel}
        className="form-control"
        onChange={changeChannel}
      >
        <option value="">Kanal Seçiniz!</option>
        {channels.map((ch) => (
          <option value={ch.link} key={ch.link}>
            #{ch.title}
          </option>
        ))}
      </FormSelect>
    </div>
  );
}

export default SelectBox;
