import React from 'react';
import Helmet from 'react-helmet';
import { CVRaw } from '../components/common';

function CVPage() {
  return (
    <>
      <Helmet>
        <meta name='robots' content='noindex' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
        <title>Dermot Hughes CV</title>
      </Helmet>
      <CVRaw />
    </>
  );
}

export default CVPage;
