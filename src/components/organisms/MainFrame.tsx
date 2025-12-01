import { ReactNode } from 'react';
import GNB from '../features/mainframe/GNB';
import HomeFooter from '../features/mainframe/HomeFooter';

interface MainFrameProps {
  HasNav?: boolean;
  children: ReactNode;
}

export default function MainFrame({ HasNav = false, children }: MainFrameProps) {
  return (
    <div className="flex flex-col min-h-[100vh] w-full items-center">
      <GNB HasNav />
      <main className="w-full mt-[70px] mb-auto flex flex-col items-center">{children}</main>
      <HomeFooter />
    </div>
  );
}
