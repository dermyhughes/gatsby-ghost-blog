import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';
import Prism from 'prismjs';

import { Navigation } from '.';
import config from '../../utils/siteConfig';

// Styles
import '../../styles/app.css';

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
function DefaultLayout({
  data, children, bodyClass, isHome,
}) {
  const site = data.allGhostSettings.edges[0].node;
  site.cover_image = null;
  const nameSplit = site.description.split('.');
  nameSplit.pop();
  const d = new Date();

  useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll();
  });

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
        <body className={bodyClass} />
      </Helmet>

      <div className="viewport">
        <div className="viewport-top">
          {/* The main header section on top of the screen */}
          <header
            className="site-head"
            style={{
              ...(site.cover_image && {
                backgroundImage: `url(${site.cover_image})`,
              }),
            }}
          >
            <div className="container">
              {!isHome && (
                <div className="site-mast">
                  <div className="site-nav-left">
                    <Navigation
                      data={site.navigation}
                      navClass="site-nav-item"
                    />
                  </div>
                  <div className="site-mast-right mast-small">
                    <SocialLinks isHome={isHome} />
                  </div>
                </div>
              )}
              {isHome && (
                <div>
                  <div className="site-banner">
                    <h1
                      className="site-banner-title three-d"
                      data-line={site.title}
                    >
                      {site.title}
                    </h1>
                    <div className="site-banner-desc">
                      {nameSplit.map((item, i) => (
                        <div className="highlight-container" key={i}>
                          <span className="highlight">
                            {item}
                            .
                          </span>
                        </div>
                      ))}
                    </div>
                    <SocialLinks isHome={isHome} />
                  </div>

                  <nav className="site-nav">
                    <div className="site-nav-left">
                      <Navigation
                        data={site.navigation}
                        navClass="site-nav-item"
                      />
                    </div>
                  </nav>
                </div>
              )}
            </div>
          </header>
          <section aria-hidden="true" className="skewed" />
          <main className="site-main">
            {/* All the main content gets inserted here, index.js, post.js */}
            {children}
          </main>
        </div>

        <div className="viewport-bottom">
          {/* The footer at the very bottom of the screen */}
          <footer className="site-foot">
            <div className="site-foot-nav container">
              <div className="site-foot-nav-left">
                <Link to="/">{site.title}</Link>
                {' '}
                ©
                {d.getFullYear()}
                .
              </div>
              <div className="site-foot-nav-right">
                <Navigation
                  data={site.navigation}
                  navClass="site-foot-nav-item"
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
};

function SocialLinks({ isHome }) {
  return (
    <div className="social-container">
      <a
        className={`site-nav-item ${isHome ? 'home' : ''}`}
        href="https://github.com/dermyhughes"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="site-nav-icon"
          src="/images/icons/github.svg"
          alt="GitHub"
        />
      </a>
      <a
        className={`site-nav-item ${isHome ? 'home' : ''}`}
        href="https://codepen.io/dermyhughes/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="site-nav-icon"
          src="/images/icons/codepen.svg"
          alt="Codepen"
        />
      </a>
      <a
        className={`site-nav-item ${isHome ? 'home' : ''}`}
        href="https://www.linkedin.com/in/dermot-hughes-a96b67b6"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="site-nav-icon"
          src="/images/icons/linkedin.svg"
          alt="LinkedIn"
        />
      </a>
      <a
        className={`site-nav-item ${isHome ? 'home' : ''}`}
        href="https://twitter.com/DermyHughes"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="site-nav-icon"
          src="/images/icons/twitter.svg"
          alt="Twitter"
        />
      </a>
    </div>
  );
}

SocialLinks.propTypes = {
  isHome: PropTypes.bool,
};
function DefaultLayoutSettingsQuery(props) {
  return (
    <StaticQuery
      query={graphql`
        query GhostSettings {
          allGhostSettings {
            edges {
              node {
                ...GhostSettingsFields
              }
            }
          }
          file(relativePath: { eq: "ghost-icon.png" }) {
            childImageSharp {
              gatsbyImageData(width: 30, height: 30, layout: FIXED)
            }
          }
        }
      `}
      render={(data) => <DefaultLayout data={data} {...props} />}
    />
  );
}

export default DefaultLayoutSettingsQuery;
