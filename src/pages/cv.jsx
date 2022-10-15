import React from 'react';
import Helmet from 'react-helmet';
import { Layout, CVRaw } from '../components/common';

function CVPage() {
  return (
    <>
      <Helmet>
        <meta name='robots' content='noindex' />
        <title>Dermot Hughes CV</title>
      </Helmet>
      <Layout>
        <div className='download-link'>
          <a href='../dermot-hughes-cvraw.pdf'>
            <button className='download-btn' type='button'>
              👉 Download PDF
            </button>
          </a>
        </div>
        <CVRaw />
      </Layout>
    </>
  );
}

export default CVPage;
