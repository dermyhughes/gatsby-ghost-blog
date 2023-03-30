import React from 'react';
import PropTypes from 'prop-types';

function SocialLink({ isHome, href, icon, alt }) {
  return (
    <a
      className={`site-nav-item ${isHome ? 'home' : ''}`}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img className='site-nav-icon' src={`/images/icons/${icon}.svg`} alt={alt} />
    </a>
  );
}

SocialLink.propTypes = {
  isHome: PropTypes.bool,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

SocialLink.defaultProps = {
  isHome: false,
};

function SocialLinks({ isHome }) {
  const socialLinks = [
    {
      href: 'https://github.com/dermyhughes',
      icon: 'github',
      alt: 'GitHub',
    },
    {
      href: 'https://codepen.io/dermyhughes/',
      icon: 'codepen',
      alt: 'Codepen',
    },
    {
      href: 'https://www.linkedin.com/in/dermot-hughes-a96b67b6',
      icon: 'linkedin',
      alt: 'LinkedIn',
    },
    {
      href: 'https://twitter.com/DermyHughes',
      icon: 'twitter',
      alt: 'Twitter',
    },
  ];

  return (
    <div className='social-container'>
      {socialLinks.map((link) => (
        <SocialLink key={link.href} isHome={isHome} {...link} />
      ))}
    </div>
  );
}

SocialLinks.propTypes = {
  isHome: PropTypes.bool,
};

SocialLinks.defaultProps = {
  isHome: false,
};

export default SocialLinks;
