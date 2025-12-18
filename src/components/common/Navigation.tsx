import * as React from 'react';
import { Link } from 'gatsby';

interface NavItem {
  label: string;
  url: string;
}

interface NavigationProps {
  data: NavItem[];
  navClass?: string;
}

const Navigation = ({ data, navClass = 'site-nav-item' }: NavigationProps) => {
  return (
    <>
      {data.map((navItem) => {
        if (navItem.url.match(/^\s?http(s?)/gi)) {
          return (
            <a
              className={navClass}
              href={navItem.url}
              key={navItem.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {navItem.label}
            </a>
          );
        }

        return (
          <Link
            key={navItem.url}
            to={navItem.url}
            getProps={({ isCurrent, location }) => {
              const path = location.pathname;

              const isHome = navItem.url === '/';
              const isHomeActive = isHome && (path === '/' || path.startsWith('/page/'));

              const isSectionActive =
                !isHome &&
                (path === navItem.url || path.startsWith(`${navItem.url.replace(/\/$/, '')}/`));

              const isActive = isCurrent || isHomeActive || isSectionActive;

              return {
                className: `${navClass}${isActive ? ' active-link' : ''}`,
              };
            }}
          >
            {navItem.label}
          </Link>
        );
      })}
    </>
  );
};

export default Navigation;
