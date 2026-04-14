import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../ui/AppSidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-10 pt-10">
        <header className="bg-background/10 border-border sticky top-2 z-10 flex w-[99%] items-center gap-3 rounded-full border p-4 shadow-sm backdrop-blur-md backdrop-saturate-200">
          <AppSidebar />
          <Header />
        </header>
        <main className="w-full flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
