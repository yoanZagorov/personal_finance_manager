import cn from "classnames";
import { useRouteLoaderData } from "react-router";

import Logo from "@/assets/logos/logo-gray.svg?react";

import { useBreakpoint, useLayout } from "@/hooks";

import { SvgIcon } from "@/components/SvgIcon";
import { NavItem } from "../NavItem";
import { primaryNavPages, secondaryNavPages } from "../data";

export default function Sidebar() {
  const { userData: { profilePic, email, fullName } } = useRouteLoaderData("app");
  const { isSidebarExpanded, toggleSidebar, sidebarRef } = useLayout();
  const { isDesktop } = useBreakpoint();

  function renderNavItems(navPages, layout, type, handleClose) {
    return navPages.map((page, index) => (
      <NavItem
        key={index}
        variants={{ layout, type }}
        to={page.name}
        iconName={page.iconName}
        handleClose={handleClose}
      />
    ));
  }

  const primaryNavItems = renderNavItems(primaryNavPages, "iconWithText", "primary", !isDesktop ? toggleSidebar : null);
  const secondaryNavItems = renderNavItems(secondaryNavPages, "iconWithText", "secondary", !isDesktop ? toggleSidebar : null);

  const classes = {
    sidebar: cn(
      "fixed h-screen w-64 ml:w-72 tab:w-80 ll:w-96 pt-8 pb-4 tab:pt-10 ll:pt-12 flex flex-col items-center text-gray-light bg-navy z-10 transition-[left] tab:duration-500",
      isSidebarExpanded ? "left-0" : "-left-full"
    )
  }

  return (
    <div className={classes.sidebar} ref={sidebarRef}>
      <Logo className="px-4" />
      <p className="text-sm ml:text-base ll:text-lg tracking-wider font-light">Take control of your finances</p>

      <div className="mt-8 ll:mt-10 size-20 tab:size-24 lm:size-28 ll:size-32 rounded-full">
        {profilePic?.url ?
          <img src={profilePic.url} className="rounded-full size-full object-cover" alt="Profile Picture" /> // To do: test with an actual image
          :
          <SvgIcon iconName="user-circle" className="size-full fill-current" />
        }
      </div>

      <p className="mt-4 text-xs ll:text-sm font-light">{email}</p>
      <p className="mt-2 text-2xl">{fullName}</p>

      <nav className="w-full mt-8">
        <ul>
          {primaryNavItems}
        </ul>
      </nav>

      <nav className="mt-auto w-full">
        <ul>
          {secondaryNavItems}

          <NavItem
            variants={{ layout: "iconWithText", type: "secondary", purpose: "logout" }}
            action="/app"
            handleClose={!isDesktop ? toggleSidebar : null}
          />
        </ul>
      </nav>
    </div>
  )
}