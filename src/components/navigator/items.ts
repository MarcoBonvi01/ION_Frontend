import type { Matcher } from "../../lib/is-nav-item-active";
import { paths } from "../../paths";
import type { icons } from "./nav-icons";

export type NavItemType = {
  k: string;
  title?: string;
  href?: string;
  icon?: keyof typeof icons;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  matcher?: Matcher;
  items?: NavItemType[];
};

export const navItems: NavItemType[] = [
  {
    k: "home",
    title: "Home",
    items: [
      {
        k: "portfolio",
        title: "Portfolio",
        icon: "card-holder",
        href: paths.home.portfolio,
      },
      {
        k: "worker",
        title: "Worker",
        icon: "presentation-chart",
        href: paths.home.worker,
      },
    ],
  },
];
