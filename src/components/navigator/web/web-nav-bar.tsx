import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowSquareOut as ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

import { icons } from "../nav-icons";

import { RouterLink } from "../../core/link";
import { Logo } from "../../core/logo";
import { paths } from "../../../paths";
import { isNavItemActive } from "../../../lib/is-nav-item-active";
import { usePathname } from "../../../hooks/use-pathname";
import type { NavItemType } from "../items";

type SideNavProps = {
  color?: "blend_in" | "discrete" | "evident";
  items?: NavItemType[];
};

export const SideNav: React.FC<SideNavProps> = ({ items = [] }) => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        "--SideNav-background": "var(--mui-palette-neutral-50)",
        "--SideNav-color": "var(--mui-palette-text-primary)",
        "--SideNav-border": "1px solid var(--mui-palette-divider)",
        "--NavGroup-title-color": "var(--mui-palette-neutral-600)",
        "--NavItem-color": "var(--mui-palette-neutral-600)",
        "--NavItem-hover-background": "var(--mui-palette-action-hover)",
        "--NavItem-active-background": "var(--mui-palette-primary-main)",
        "--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
        "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
        "--NavItem-icon-color": "var(--mui-palette-neutral-500)",
        "--NavItem-icon-active-color":
          "var(--mui-palette-primary-contrastText)",
        "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-500)",
        "--NavItem-expand-color": "var(--mui-palette-neutral-500)",
        "--NavItem-children-border": "var(--mui-palette-neutral-200)",
        "--NavItem-children-indicator": "var(--mui-palette-neutral-500)",
        "--Workspaces-background": "var(--mui-palette-neutral-100)",
        "--Workspaces-border-color": "var(--mui-palette-divider)",
        "--Workspaces-title-color": "var(--mui-palette-neutra-400)",
        "--Workspaces-name-color": "var(--mui-palette-neutral-900)",
        "--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
        bgcolor: "var(--SideNav-background)",
        borderRight: "var(--SideNav-border)",
        color: "var(--SideNav-color)",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        height: "100%",
        left: 0,
        position: "fixed",
        top: 0,
        width: "var(--SideNav-width)",
        zIndex: "var(--SideNav-zIndex)",
      }}
    >
      <Box
        component={RouterLink}
        href={paths.home.portfolio}
        sx={{ p: 1, display: "flex", justifyContent: "center" }}
      >
        <Logo height={80} width={160} />
      </Box>

      <Box
        component="nav"
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
          p: 1.5,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {renderNavGroups({ items, pathname })}
      </Box>
    </Box>
  );
};

function renderNavGroups({
  items,
  pathname,
}: {
  items: NavItemType[];
  pathname: string;
}) {
  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {items.map((group) => (
        <Stack component="li" key={group.k} spacing={1}>
          {group.title && (
            <Typography
              sx={{
                color: "var(--NavGroup-title-color)",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {group.title}
            </Typography>
          )}
          {group.items &&
            renderNavItems({ depth: 0, items: group.items, pathname })}
        </Stack>
      ))}
    </Stack>
  );
}

function renderNavItems({
  depth,
  items,
  pathname,
}: {
  depth: number;
  items: NavItemType[];
  pathname: string;
}) {
  return (
    <Stack
      component="ul"
      data-depth={depth}
      spacing={1}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {items.map((item: NavItemType) => (
        <NavItem
          key={item.k}
          depth={depth}
          forceOpen={
            item.items
              ? Boolean(
                  item.items.find(
                    (child) => child.href && pathname.startsWith(child.href)
                  )
                )
              : false
          }
          pathname={pathname}
          {...item}
        >
          {item.items &&
            renderNavItems({ depth: depth + 1, pathname, items: item.items })}
        </NavItem>
      ))}
    </Stack>
  );
}

type NavItemProps = NavItemType & {
  children?: React.ReactNode;
  depth: number;
  forceOpen?: boolean;
  pathname: string;
};

function NavItem({
  children,
  depth,
  disabled,
  external,
  forceOpen = false,
  href,
  icon,
  label,
  matcher,
  pathname,
  title,
}: NavItemProps) {
  const [open, setOpen] = React.useState(forceOpen);
  const active = isNavItemActive({
    disabled,
    external,
    href,
    matcher,
    pathname,
  });
  const Icon = icon ? icons[icon] : null;
  const ExpandIcon = open ? CaretDownIcon : CaretRightIcon;
  const isBranch = Boolean(children && !href);
  const showChildren = Boolean(children && open);

  return (
    <Box component="li" data-depth={depth} sx={{ userSelect: "none" }}>
      <Box
        {...(isBranch
          ? {
              onClick: () => setOpen(!open),
              onKeyUp: (event: React.KeyboardEvent) => {
                if (event.key === "Enter" || event.key === " ") setOpen(!open);
              },
              role: "button",
            }
          : href
          ? {
              component: external ? "a" : RouterLink,
              href,
              target: external ? "_blank" : undefined,
              rel: external ? "noreferrer" : undefined,
            }
          : { role: "button" })}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          color: "var(--NavItem-color)",
          cursor: "pointer",
          display: "flex",
          flex: "0 0 auto",
          gap: 1,
          p: "6px 6px",
          position: "relative",
          textDecoration: "none",
          whiteSpace: "nowrap",
          ...(disabled && {
            bgcolor: "var(--NavItem-disabled-background)",
            color: "var(--NavItem-disabled-color)",
            cursor: "not-allowed",
          }),
          ...(active && {
            bgcolor: "var(--NavItem-active-background)",
            color: "var(--NavItem-active-color)",
            ...(depth > 0 && {
              "&::before": {
                bgcolor: "var(--NavItem-children-indicator)",
                borderRadius: "2px",
                content: '" "',
                height: "20px",
                left: "-8px",
                position: "absolute",
                width: "3px",
              },
            }),
          }),
          ...(open && { color: "var(--NavItem-open-color)" }),
          "&:hover": {
            ...(!disabled &&
              !active && {
                bgcolor: "var(--NavItem-hover-background)",
                color: "var(--NavItem-hover-color)",
              }),
          },
        }}
        tabIndex={0}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
            ml: "6px",
          }}
        >
          {Icon && (
            <Icon
              fill={
                active
                  ? "var(--NavItem-icon-active-color)"
                  : "var(--NavItem-icon-color)"
              }
              fontSize="var(--icon-fontSize-md)"
              weight={forceOpen || active ? "fill" : undefined}
            />
          )}
        </Box>
        <Box sx={{ flex: "1 1 auto" }}>
          <Typography
            component="span"
            sx={{
              color: "inherit",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: "28px",
            }}
          >
            {title}
          </Typography>
        </Box>
        {label && <Chip color="primary" label={label} size="small" />}
        {external && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: "0 0 auto",
              ml: "6px",
            }}
          >
            <ArrowSquareOutIcon
              color="var(--NavItem-icon-color)"
              fontSize="var(--icon-fontSize-sm)"
            />
          </Box>
        )}
        {isBranch && (
          <Box sx={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
            <ExpandIcon
              color="var(--NavItem-expand-color)"
              fontSize="var(--icon-fontSize-sm)"
            />
          </Box>
        )}
      </Box>
      {showChildren && (
        <Box sx={{ pl: "14px" }}>
          <Box
            sx={{
              borderLeft: "1px solid var(--NavItem-children-border)",
              pl: "6px",
            }}
          >
            {children}
          </Box>
        </Box>
      )}
    </Box>
  );
}
