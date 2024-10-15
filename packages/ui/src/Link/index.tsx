import * as React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  newTab?: boolean;
  href: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  newTab,
  ...other
}) => {
  return (
    <a
      href={href}
      rel={newTab ? 'noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
      {...other}>
      {children}
    </a>
  );
};
