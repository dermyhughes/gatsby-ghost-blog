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
      {data.map((navItem, i) => {
        if (navItem.url.match(/^\s?http(s?)/gi)) {
          return (
            <a
              className={navClass}
              href={navItem.url}
              key={i}
              target='_blank'
              rel='noopener noreferrer'
            >
              {navItem.label}
            </a>
          );
        }
        return (
          <Link
            className={navClass}
            activeClassName='active-link'
            partiallyActive={navItem.url !== '/'}
            to={navItem.url}
            key={i}
          >
            {navItem.label}
          </Link>
        );
      })}
    </>
  );
};

export default Navigation;
