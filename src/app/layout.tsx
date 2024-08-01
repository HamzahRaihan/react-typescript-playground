import NavigationBar from '@/components/ui/navigation/NavigationBar';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className="flex flex-col gap-2 min-h-screen dark:bg-[#09090b] mb-10">
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
