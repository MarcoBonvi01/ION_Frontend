import * as React from "react";
import { Link, type LinkProps } from "react-router-dom";

// Definisco le props, rinominando "to" in "href"
interface Props extends Omit<LinkProps, "to"> {
  href: LinkProps["to"];
}

export const RouterLink = React.forwardRef<HTMLAnchorElement, Props>(
  function RouterLink({ href, ...other }, ref) {
    return <Link ref={ref} to={href} {...other} />;
  }
);
