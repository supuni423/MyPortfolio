import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'About', href: getPermalink('/#about') },
    { text: 'Skills', href: getPermalink('/#skills') },
    { text: 'Projects', href: getPermalink('/#projects') },
    { text: 'Education', href: getPermalink('/#education') },
    { text: 'Writing', href: getPermalink('/#writing') },
    { text: 'Contact', href: getPermalink('/#contact') },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Projects', href: getPermalink('/#projects') },
        { text: 'Writing', href: getPermalink('/#writing') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/supuni423' },
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/in/supuni-dissanayake-081818315',
    },
    { ariaLabel: 'Hashnode', icon: 'simple-icons:hashnode', href: 'https://supunihashnodedev.hashnode.dev' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:dissanayakesupuni423@gmail.com' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `© ${new Date().getFullYear()} Supuni Dissanayake. All rights reserved.`,
};
