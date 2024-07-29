import NavigationBar from '@/components/ui/navigation/NavigationBar';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className="flex flex-col gap-2 min-h-screen dark:bg-[#09090b]">
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
