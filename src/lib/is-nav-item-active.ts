export type Matcher =
  | { type: "startsWith"; href: string }
  | { type: "equals"; href: string };

interface NavItemActiveParams {
  disabled?: boolean;
  external?: boolean;
  href?: string;
  matcher?: Matcher;
  pathname: string;
}

export function isNavItemActive({
  disabled = false,
  external = false,
  href,
  matcher,
  pathname,
}: NavItemActiveParams): boolean {
  if (disabled || !href || external) {
    return false;
  }

  if (matcher) {
    switch (matcher.type) {
      case "startsWith":
        return pathname.startsWith(matcher.href);
      case "equals":
        return pathname === matcher.href;
      default:
        return false;
    }
  }

  return pathname === href;
}
