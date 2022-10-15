import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/common';

function NotFoundPage() {
  return (
    <Layout>
      <div className="container">
        <article className="content" style={{ textAlign: 'center' }}>
          <h1 className="content-title">Error 404</h1>
          <section className="content-body">
            <p>
              Huh. It look's like that page can't be found. You can
              {' '}
              <Link to="/">return home</Link>
              {' '}
              to start over.
            </p>
            <p>Here's a cute picture to make it up to you.</p>
          </section>
          <img
            className="random-image"
            alt="Random cute animal"
            src="https://source.unsplash.com/640x480?cute-animals"
          />
        </article>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
