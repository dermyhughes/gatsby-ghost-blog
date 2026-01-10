import * as React from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
  navigation: unknown; // more specific type can be added
  cover_image?: string | null;
}

interface AllGhostSettings {
  edges: { node: GhostSettingsNode }[];
}

interface DataProps {
  file?: unknown;
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
  // Memoise site data to avoid unnecessary re‑renders
  const site = useMemo(
    () => ({ ...data.allGhostSettings.edges[0].node, cover_image: null }),
    [data],
  );

  // Split description once
  const descriptionParts = useMemo(() => {
    const parts = site.description.split('.');
    parts.pop();
    return parts;
  }, [site.description]);

  // Highlight code blocks when children change
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  // Scroll progress bar
  useEffect(() => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const handleScroll = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial update

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Banner blur effect
  const bannerTitleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isHome || !bannerTitleRef.current) return;

    const banner = bannerTitleRef.current;
    const handleScroll = () => {
      const rect = banner.getBoundingClientRect();
      const bannerHeight = rect.height;
      const trigger = -bannerHeight * 0.4;
      let progress = 0;

      if (rect.top < trigger) {
        progress = (trigger - rect.top) / (bannerHeight * 0.5);
        progress = Math.min(Math.max(progress, 0), 1);
      }

      banner.style.setProperty('--title-blur', progress.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial update

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Theme handling
  const preferenceRef = useRef({ hasExplicitPreference: false });
  const [theme, setTheme] = useState<ThemePreference>('light');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme ?? getInitialTheme();

    preferenceRef.current.hasExplicitPreference = Boolean(storedTheme);
    setTheme(initialTheme);
    setHasMounted(true);

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

  const handleThemeToggle = useCallback(() => {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      preferenceRef.current.hasExplicitPreference = true;
      persistTheme(nextTheme);
      return nextTheme;
    });
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
                      {hasMounted && (
                        <ThemeToggle onToggle={handleThemeToggle} theme={theme} />
                      )}
                      <SocialLinks isHome={isHome} />
                    </div>
                  </div>
                </div>
              )}
              {isHome && (
                <div>
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
                  <nav className='site-nav'>
                    <div className='site-nav-left'>
                      <Navigation data={site.navigation} navClass='site-nav-item' />
                    </div>
                    <div className='site-nav-right'>
                      <div className='site-actions'>
                        {hasMounted && (
                          <ThemeToggle onToggle={handleThemeToggle} theme={theme} />
                        )}
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
