import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';
import Prism from 'prismjs';

import { Navigation, SocialLinks } from '.';

// Styles
import '../../styles/app.scss';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
function DefaultLayout({ data, children, bodyClass, isHome }) {
  const site = { ...data.allGhostSettings.edges[0].node, cover_image: null };
  const descriptionParts = site.description.split('.');
  descriptionParts.pop();

  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  const [isFontLoaded, setIsFontLoaded] = React.useState(false);
  useEffect(() => {
    const loadFont = async () => {
      try {
        const font = 'Permanent Marker';
        await document.fonts.load(`1em "${font}"`);
        if (document.fonts.check(`1em "${font}"`)) {
          setIsFontLoaded(true);
        }
      } catch (error) {
        console.error(`Failed to load font: ${error}`);
      }
    };

    loadFont();
  }, []);

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type='text/css'>{`${site.codeinjection_styles}`}</style>
        <link
          href='https://fonts.googleapis.com/css2?family=Permanent+Marker&display=block'
          rel='stylesheet'
        />
        <body className={bodyClass} />
      </Helmet>

      <div className='viewport'>
        <div className='viewport-top'>
          {/* The main header section on top of the screen */}
          <header
            className='site-head'
            style={{
              ...(site.cover_image && {
                backgroundImage: `url(${site.cover_image})`,
              }),
            }}
          >
            <div className='container'>
              {!isHome && (
                <div className='site-mast'>
                  <div className='site-nav-left'>
                    <Navigation data={site.navigation} navClass='site-nav-item' />
                  </div>
                  <div className='site-mast-right mast-small'>
                    <SocialLinks isHome={isHome} />
                  </div>
                </div>
              )}
              {isHome && (
                <div>
                  <div className='site-banner'>
                    <h1
                      style={{ visibility: isFontLoaded ? 'visible' : 'hidden' }}
                      className='site-banner-title three-d'
                      data-line={site.title}
                    >
                      {site.title}
                    </h1>

                    <div className='site-banner-desc'>
                      {descriptionParts.map((item, i) => (
                        <div className='highlight-container' key={i}>
                          <span className='highlight'>{item}.</span>
                        </div>
                      ))}
                    </div>
                    <SocialLinks isHome={isHome} />
                  </div>
                  <nav className='site-nav'>
                    <div className='site-nav-left'>
                      <Navigation data={site.navigation} navClass='site-nav-item' />
                    </div>
                  </nav>
                </div>
              )}
            </div>
          </header>
          <section aria-hidden='true' className='skewed' />
          <main className='site-main'>
            {/* All the main content gets inserted here, index.js, post.js */}
            {children}
          </main>
        </div>

        <div className='viewport-bottom'>
          {/* The footer at the very bottom of the screen */}
          <footer className='site-foot'>
            <div className='site-foot-nav container'>
              <div className='site-foot-nav-left'>
                <Link to='/'>{site.title}</Link> ©{CURRENT_YEAR}.
              </div>
              <div className='site-foot-nav-right'>
                <Navigation data={site.navigation} navClass='site-foot-nav-item' />
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

DefaultLayout.defaultProps = {
  bodyClass: '',
  isHome: false,
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
