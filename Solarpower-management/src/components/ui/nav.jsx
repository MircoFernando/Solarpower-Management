"use client";

import * as React from "react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";



const NavBarDesk = ({scrolled}) =>{
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger><span className={`font-bold ${scrolled ? "text-black" : "text-white font-medium"}`}>
        HOME
      </span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <a href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </a>
              <a href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </a>
              <a href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </a>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger><span className={`font-bold ${scrolled ? "text-black" : "text-white font-medium"}`}>
        SERVICES
      </span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <a href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </a>
              <a href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </a>
              <a href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </a>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger><span className={`font-bold ${scrolled ? "text-black" : "text-white font-medium"}`}>
        PRODUCTS
      </span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <a href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </a>
              <a href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </a>
              <a href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </a>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger><span className={`font-bold ${scrolled ? "text-black" : "text-white font-medium"}`}>
        ABOUT
      </span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <a href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </a>
              <a href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </a>
              <a href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </a>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default NavBarDesk;