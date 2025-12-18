import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { Navigation, SocialLinks, ThemeToggle } from '.';
import {
  applyTheme,
  getInitialTheme,
  getStoredTheme,
  persistTheme,
  subscribeToSystemTheme,
  ThemePreference,
} from '../../utils/theme';
import '../../styles/app.scss';

const CURRENT_YEAR = new Date().getFullYear();

interface GhostSettingsNode {
  title: string;
  description: string;
  lang: string;
  codeinjection_styles: string;
  navigation: any;
  cover_image?: string | null;
}

interface AllGhostSettings {
  edges: { node: GhostSettingsNode }[];
}

interface DataProps {
  file?: any;
  allGhostSettings: AllGhostSettings;
}

interface DefaultLayoutProps {
  data: DataProps;
  children: React.ReactNode;
  bodyClass?: string;
  isHome?: boolean;
}

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
function DefaultLayout({ data, children, bodyClass = '', isHome = false }: DefaultLayoutProps) {
  const site = { ...data.allGhostSettings.edges[0].node, cover_image: null };
  const descriptionParts = site.description.split('.');
  descriptionParts.pop();

  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  React.useEffect(() => {
    const scrollProgress = document.getElementById('scroll-progress');
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const handleScroll = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollProgress) {
        scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bannerTitleRef = useRef<HTMLDivElement | null>(null);
  const preferenceRef = useRef({ hasExplicitPreference: false });
  const [theme, setTheme] = useState<ThemePreference>(() =>
    typeof window === 'undefined' ? 'light' : getInitialTheme(),
  );

  useEffect(() => {
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme ?? getInitialTheme();

    preferenceRef.current.hasExplicitPreference = Boolean(storedTheme);
    setTheme(initialTheme);

    const unsubscribe = subscribeToSystemTheme((systemTheme) => {
      if (!preferenceRef.current.hasExplicitPreference) {
        setTheme(systemTheme);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      preferenceRef.current.hasExplicitPreference = true;
      persistTheme(nextTheme);
      return nextTheme;
    });
  };

  useEffect(() => {
    function handleScroll() {
      if (!bannerTitleRef.current) return;
      const banner = bannerTitleRef.current;
      const rect = banner.getBoundingClientRect();
      const bannerHeight = rect.height;

      // The point at which 40% of the banner has left the viewport (from the top)
      const trigger = -bannerHeight * 0.4;
      let progress = 0;

      if (rect.top < trigger) {
        // How much of the banner has scrolled past the trigger point
        progress = (trigger - rect.top) / (bannerHeight * 0.5);
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;
      } else {
        progress = 0;
      }

      banner.style.setProperty('--title-blur', progress.toString());
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type='text/css'>{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>

      <div className='viewport'>
        <div className='viewport-top'>
          {/* The main header section on top of the screen */}
          <header
            className='site-head'
            style={site.cover_image ? { backgroundImage: `url(${site.cover_image})` } : {}}
          >
            <div className='container'>
              {!isHome && (
                <div className='site-mast'>
                  <div className='site-nav-left'>
                    <Navigation data={site.navigation} navClass='site-nav-item' />
                  </div>
                  <div className='site-mast-right mast-small'>
                    <div className='site-actions'>
                      <ThemeToggle onToggle={handleThemeToggle} theme={theme} />
                      <SocialLinks isHome={isHome} />
                    </div>
                  </div>
                </div>
              )}
              {isHome && (
                <div className='site-hero'>
                  <div className='site-banner' ref={bannerTitleRef}>
                    <h1 className='site-banner-title three-d' data-line={site.title}>
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
                  <nav className='site-nav site-nav-home'>
                    <div className='site-nav-left'>
                      <Navigation data={site.navigation} navClass='site-nav-item' />
                    </div>
                    <div className='site-nav-right'>
                      <div className='site-actions'>
                        <ThemeToggle onToggle={handleThemeToggle} theme={theme} />
                      </div>
                    </div>
                  </nav>
                </div>
              )}
            </div>
          </header>
          <section aria-hidden='true' className='skewed' />
          <main id='site-main'>
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

function DefaultLayoutSettingsQuery(props: Omit<DefaultLayoutProps, 'data'>) {
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
      render={(data: DataProps) => <DefaultLayout data={data} {...props} />}
    />
  );
}

export default DefaultLayoutSettingsQuery;
