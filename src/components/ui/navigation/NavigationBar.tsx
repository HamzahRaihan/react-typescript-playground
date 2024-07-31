import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import {
  Cross1Icon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  InstagramLogoIcon,
  Share1Icon,
} from '@radix-ui/react-icons';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { Button } from '../button';
import { Sheet, SheetContent, SheetTrigger } from '../sheet';

type Components = {
  title: string;
  href: string;
  desciption: string;
  icon: React.ReactElement;
};

const links: Components[] = [
  {
    title: 'Github',
    href: 'https://github.com/HamzahRaihan/',
    desciption: 'Check out my Github Repositories!',
    icon: <GitHubLogoIcon />,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/hamzah_raihan/',
    desciption: 'Follow my Instagram',
    icon: <InstagramLogoIcon />,
  },
];

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const SheetSide = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="group">
          <HamburgerMenuIcon className="h-5 w-5 group-data-[state=closed]:scale-100 scale-0 transition-all" />
          <Cross1Icon className="absolute h-5 w-5 group-data-[state=open]:scale-100 scale-0 group-data-[state=open]:rotate-180 transition-all" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-4">
          <Link to="/">
            <NavigationMenuLink>
              <div className="flex gap-2 items-center">
                <Share1Icon width="20" height="20" />
                <div>
                  tod<span className="text-red-500 font-bold">O</span>o
                </div>
              </div>
            </NavigationMenuLink>
          </Link>

          <div className="flex flex-col gap-4 mt-10">
            <NavLink
              to="/"
              className={(isActive) => isActive && 'text-zinc-600'}
            >
              <NavigationMenuLink>Documentation</NavigationMenuLink>
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-2 items-center group">
                  Social Media
                  <ChevronDown className="h-4 w-4 transition-all group-data-[state=open]:rotate-180" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {links.map((link) => (
                  <DropdownMenuItem key={link.title}>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium leading-none flex gap-2">
                        {link.icon} {link.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {link.desciption}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const NavigationMobileComponent = () => {
  return (
    <NavigationMenu className="lg:hidden justify-between">
      <NavigationMenuList>
        <NavigationMenuItem>
          <SheetSide />
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const NavigationComponent = () => {
  return (
    <NavigationMenu className="justify-between lg:flex hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <div className="flex gap-2 items-center">
                <Share1Icon width="20" height="20" />
                <div>
                  tod<span className="text-red-500 font-bold">O</span>o
                </div>
              </div>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
            Social Media
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {links.map((link) => (
                <ListItem key={link.title} title={link.title} href={link.href}>
                  <div className="text-sm font-medium leading-none flex gap-2">
                    {link.icon} {link.title}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {link.desciption}
                  </p>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ children, href }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
          )}
          to={href ?? ''}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

const NavigationBar = () => {
  return (
    <div className="fixed top-0 w-full p-2 border-b border-zinc-200 dark:border-zinc-800 px-4 lg z-50 bg-white dark:bg-[#09090b]">
      <NavigationComponent />

      {/* Apply mobile navbar if  min width is 1024px */}
      <NavigationMobileComponent />
    </div>
  );
};

export default NavigationBar;
