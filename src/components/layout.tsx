import { Navbar } from '.';
import type { FunctionComponent } from 'react';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full min-h-screen bg-slate-100 px-[30px] dark:bg-slate-900 lg:px-[180px]">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export { Layout };
