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
  GitHubLogoIcon,
  InstagramLogoIcon,
  Share1Icon,
} from '@radix-ui/react-icons';
import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { Button } from '../button';

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

const NavigationComponent = () => {
  return (
    <NavigationMenu className="justify-between">
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
    <div className="p-2 border-b border-zinc-200 dark:border-zinc-800 px-4">
      <NavigationComponent />
    </div>
  );
};

export default NavigationBar;
