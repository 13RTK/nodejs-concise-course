import { Outlet } from 'react-router';
import Navbar from './Navbar';
import { Toaster } from 'sonner';

function RootLayout() {
  return (
    <section className="h-screen dark:bg-black">
      <Navbar />
      <main className="grid grid-cols-1 place-items-center text-center">
        <Outlet />
        <Toaster />
      </main>
    </section>
  );
}

export default RootLayout;
