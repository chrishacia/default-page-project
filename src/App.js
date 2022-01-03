// @flow

import * as React from 'react';
import {domains} from './data/domains';
import OfferForm from './components/OfferForm.react';
import NavBar from './components/NavBar.react';
import UnknownDomain from './components/UnknownDomain.react';
import DomainDetails from './components/DomainDetails.react';

export function App(): React.MixedElement {
  const host = window.location.hostname;
  let confirmedDomain = null;
  if (Object.keys(domains).includes(host)) {
    confirmedDomain = host;
    if (domains[host].redirects != null) {
      window.location.href = domains[host].redirects;
      return <div />;
    }
    if (domains[host].reserved === true) {
      window.location.href = '/reserved';
      return <div />;
    }
  }

  if (confirmedDomain == null) {
    return (
      <>
        <NavBar />
        <UnknownDomain />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="container-md mt-4 text-dark">
        <h1 className="display-6">
          Welcome to <span className="text-purple">{host}</span>
        </h1>

        <div className="row">
          <div className="col-sm-6 col-md-6">
            <h3>This domain is currently parked</h3>
            <p>
              It is sitting and collecting the digital dust currently. The use
              for this domain is unknown at the moment. The owner isn't sure if
              they want to build on it, or get rid of it. So it sits. That said
              it may be for sale or lease to the right person. If you are
              interested feel free to reach out and inquire.
            </p>
            <DomainDetails domain={domains[confirmedDomain]} />
          </div>
          <div className="col">
            <OfferForm />
          </div>
        </div>
      </div>
    </>
  );
}
