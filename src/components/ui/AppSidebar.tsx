// src/components/layout/AppSidebar.tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/shadcn/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/shadcn/sidebar';
import { NAV_ITEMS } from '@/core/constants/sidebar.constant';
import { cn } from '@/lib/utils/cn.utils';
import { ChevronDownIcon } from 'lucide-react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClear } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { flavorConfig } from '../config/flavor';
import { Button } from './shadcn/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from './shadcn/drawer';

export function AppSidebar() {
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((c) => location.pathname === c.href);

  const locationSplitted = location.pathname.split('/');
  const locationName = locationSplitted[locationSplitted.length - 1];

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          variant="outline"
          className={cn('size-9 rounded-full p-0')}
        >
          <HiMenuAlt3 className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="bg-background/10 border-border my-8 border p-4 px-5 py-8 shadow-sm backdrop-blur-md backdrop-saturate-200"
        overlayClassName="supports-backdrop-filter:backdrop-blur-none"
      >
        {/* Header */}
        <DrawerHeader className="border-border/50 border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm leading-none font-semibold">{flavorConfig.appName}</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                {locationName.capitalizeFirst()}
              </p>
            </div>
            <DrawerClose asChild>
              <Button
                data-sidebar="trigger"
                data-slot="sidebar-trigger"
                variant="outline"
                className={cn('size-9 rounded-full p-0')}
              >
                <MdClear className="size-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        {/* Content */}
        <SidebarGroup className="py-5">
          {NAV_ITEMS.map((group) => {
            const anyChildrenEnabled = group.items.some((item) =>
              item.children?.some((child) => child.isEnabled)
            );
            const anyItemEnabled = group.items.some((item) => item.isEnabled);
            const isEnabled = anyChildrenEnabled || anyItemEnabled;

            return (
              <SidebarMenu
                key={group.section}
                className={cn(
                  'bg-secondary-card/20 hover:bg-secondary-card/50 my-2 rounded-md',
                  !isEnabled && 'pointer-events-none cursor-not-allowed opacity-50'
                )}
              >
                {group.items.map((item) => {
                  const disabled =
                    item.isEnabled === false ||
                    item.children?.every((child) => child.isEnabled === false);

                  return (
                    /* Item yang punya children/menu yang bisa di expand cnth. Messaging*/
                    item.children ? (
                      <Collapsible
                        key={item.label}
                        defaultOpen={!disabled && isParentActive(item.children)}
                        className={cn(
                          disabled && 'pointer-events-none cursor-not-allowed opacity-50'
                        )}
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              className={cn('group w-full justify-between font-medium')}
                            >
                              <item.icon className="h-4 w-4" />
                              <span className="flex items-center gap-2.5">{item.label}</span>
                              <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub className="gap-2 py-3">
                              {/* ini list sub menu nya */}
                              {item.children.map((child) => {
                                const disabled = child.isEnabled === false;

                                return (
                                  <SidebarMenuSubItem key={child.label}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={!disabled && isActive(child.href)}
                                      className={cn(
                                        'py-5',
                                        disabled &&
                                          'pointer-events-none cursor-not-allowed opacity-50'
                                      )}
                                    >
                                      <Link
                                        to={disabled ? '#' : child.href}
                                        onClick={(e) => {
                                          if (disabled) e.preventDefault();
                                        }}
                                        className="flex items-center justify-between"
                                      >
                                        {child.label}
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      // Regular item tanpa children
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          asChild
                          isActive={!disabled && isActive(item.href)}
                          className={cn(
                            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
                            isActive(item.href) && 'bg-primary text-primary-foreground'
                          )}
                        >
                          <Link to={item.href} className="flex items-center justify-between">
                            <span className="flex items-center gap-2.5">
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  );
                })}
              </SidebarMenu>
            );
          })}
        </SidebarGroup>
      </DrawerContent>
    </Drawer>
  );
}
