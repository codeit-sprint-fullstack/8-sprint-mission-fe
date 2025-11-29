import { ReactNode } from 'react';
import GNB from '../features/mainframe/GNB';
import HomeFooter from '../features/mainframe/HomeFooter';
interface MainFrameProps {
  HasNav?: boolean;
  children: ReactNode;
}
export default function MainFrame({ HasNav: isHome = false, children }: MainFrameProps) {
  return (
    <>
      <GNB isHome />
      <main className="p-0 pt-[70px]">{children}</main>
      <HomeFooter />
    </>
  );
}
