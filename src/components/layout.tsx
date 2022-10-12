import { useEffect, useState } from 'react';
import { Navbar } from '.';
import { useScrollDirection } from '../hooks';
import type { FunctionComponent } from 'react';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const [show, setShow] = useState(false);

  // Get scroll direction
  const scrollDirection = useScrollDirection();

  // Show scroll to top button when user scrolls down and hide it when user scrolls up
  useEffect(() => {
    const onScroll = () => {
      if (scrollDirection === 'down' && window.pageYOffset > 300) {
        setShow(true);
      } else setShow(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return (
    <div className="h-full min-h-screen bg-slate-100 px-[30px] dark:bg-slate-900 lg:px-[180px] xl:px-[calc(100vw_-_80%)] 2xl:xl:px-[calc(100vw_-_75%)]">
      <Navbar />
      <main>{children}</main>
      {/* Scroll to top button */}
      <button
        className={`fixed bottom-0 right-0 rounded-tl-full bg-slate-300 pr-1 pb-1 pt-3 pl-3 transition-opacity duration-300 ease-in md:pt-4 md:pl-4 dark:bg-slate-700${
          show ? ' visible opacity-100' : ' invisible opacity-0'
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-slate-700 dark:text-slate-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export { Layout };
