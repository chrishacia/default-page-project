import * as React from 'react';

export default function UnknownDomain(): React.MixedElement {
  // TODO: come back and add some functionality to capture unknown domain for later review
  return (
    <div className="container-md mt-4 text-dark">
      Hey there! Not sure how or why this domain you are visiting is pointing at
      this server... But its not one of mine... :-)
    </div>
  );
}
