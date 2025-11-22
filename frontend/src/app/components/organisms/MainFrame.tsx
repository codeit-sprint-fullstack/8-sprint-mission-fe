import { ReactNode } from 'react';
import GNB from '../mocules/GNB';
import HomeFooter from '../mocules/HomeFooter';
interface MainFrameProps {
  isHome?: boolean;
  children: ReactNode;
}
export default function MainFrame({ isHome = false, children }: MainFrameProps) {
  return (
    <>
      <GNB isHome />
      <main className="p-0 pt-[70px]">{children}</main>
      <HomeFooter />
    </>
  );
}
