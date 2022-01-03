import * as React from 'react';

export default function DomainDetails(props): React.MixedElement {
  const {create_date, tld, sld_length} = props.domain;

  function calcTimeDiff(created, expiring) {
    return Math.abs(
      new Date(expiring - created.getTime()).getUTCFullYear() - 1970,
    );
  }

  return (
    <>
      <h3>Domain Details</h3>
      <div className="row">
        <div className="col-6">
          <strong>Creation Date</strong>
        </div>
        <div className="col-6">{create_date}</div>
      </div>
      <div className="row">
        <div className="col-6">
          <strong>Age</strong>
        </div>
        <div className="col-6">
          {calcTimeDiff(new Date(create_date), Date.now())} years
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <strong>TLD</strong>
        </div>
        <div className="col-6">{!tld ? 'n/a' : tld}</div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="col-6"></div>
          <strong>Length</strong>
        </div>
        <div className="col-6">{sld_length}</div>
      </div>
    </>
  );
}
