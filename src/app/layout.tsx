import NavigationBar from '@/components/ui/navigation/NavigationBar';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className="flex flex-col gap-2 dark:bg-[#09090b] h-screen">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            loading
          </div>
        }
      >
        <NavigationBar />
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RootLayout;
