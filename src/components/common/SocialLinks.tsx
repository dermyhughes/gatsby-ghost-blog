import React from 'react';

interface SocialLinkProps {
  isHome?: boolean;
  href: string;
  icon: string;
  alt: string;
}

const SocialLink = ({ isHome = false, href, icon, alt }: SocialLinkProps) => {
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
};

interface SocialLinksProps {
  isHome?: boolean;
}

const SocialLinks = ({ isHome = false }: SocialLinksProps) => {
  const socialLinks: SocialLinkProps[] = [
    {
      href: 'https://github.com/dermyhughes',
      icon: 'github',
      alt: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/dermot-hughes-a96b67b6',
      icon: 'linkedin',
      alt: 'LinkedIn',
    },
  ];

  return (
    <div className='social-container'>
      {socialLinks.map((link) => (
        <SocialLink key={link.href} isHome={isHome} {...link} />
      ))}
    </div>
  );
};

export default SocialLinks;
