// @flow
import * as React from 'react';
import axios from 'axios';
import validator from 'validator';

import {useState} from 'react';

export default function OfferForm(): React.MixedElement {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [offer, setOffer] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setOffer('');
  };

  const submitForm = () => {
    setSuccessMsg('');
    setErrMsg('');
    if (!name && !email && !offer) {
      setErrMsg('All fields are required, please fill in all fields');
      return;
    }

    if (!validator.matches(name, /^[\w\-\s.,']+$/)) {
      setErrMsg(
        'Name field has invalid characters. A-Z, 0-9, spaces, hyphens only',
      );
      return;
    }

    if (!validator.isEmail(email)) {
      setErrMsg('Email field is invalid. Valid example jsmith@example.com');
      return;
    }

    if (!validator.isNumeric(offer)) {
      setErrMsg('Offer field is invalid. Numeric values only');
      return;
    }

    axios
      .post('/makeoffer.php', {
        name,
        email,
        offer,
      })
      .then(res => {
        console.log(res);
        setSuccessMsg(
          'Your offer has been submitted, you should hear back from someone in a couple days. Thanks',
        );
        resetForm();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h3>Make an offer</h3>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Full name"
          value={name ?? ''}
          onChange={e => setName(e.currentTarget.value)}
        />
        <label htmlFor="name">Name</label>
      </div>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="email"
          placeholder="Email address"
          value={email ?? ''}
          onChange={e => setEmail(e.currentTarget.value)}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="offer"
          placeholder="Opening offer"
          value={offer ?? ''}
          onChange={e => setOffer(e.currentTarget.value)}
        />
        <label htmlFor="offer">Opening offer (in US Dollar)</label>
      </div>
      {errMsg && (
        <div className="alert alert-danger" role="alert">
          {errMsg}
        </div>
      )}
      {successMsg && (
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      )}
      <div className="mb-3 text-end">
        <button
          className="btn btn-primary"
          onClick={submitForm}
          disabled={true}>
          Send
        </button>
      </div>
    </>
  );
}
