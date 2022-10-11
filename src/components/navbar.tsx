import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSearchStore } from '../stores';
import type { FunctionComponent } from 'react';

const Navbar: FunctionComponent = () => {
  const router = useRouter();

  const { search, setSearch, clearSearch } = useSearchStore();

  // Handle search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle search submit
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push('/');
    }
  };

  // Handle title click
  const handleClick = () => {
    clearSearch();
    router.push('/');
  };

  return (
    <nav className="flex items-center justify-between py-4">
      {/* Logo */}
      <figure
        className="flex cursor-pointer items-center gap-4"
        onClick={handleClick}
      >
        <Image
          className="rounded"
          src="https://placekitten.com/40"
          alt="logo"
          width={40}
          height={40}
        />
        <figcaption className="text-xl text-gray-800 dark:text-gray-200">
          Blog
        </figcaption>
      </figure>
      {/* Search Input */}
      <input
        className="background-search-icon dark:dark-search-icon w-10 rounded-full bg-gray-200 py-2 pl-10 pr-0 text-gray-800 transition-[width]
      duration-[400ms] ease-in-out focus-visible:w-40 focus-visible:pr-4 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-gray-800 
      dark:bg-gray-800 dark:text-gray-200 dark:focus-visible:outline-gray-200 md:w-60 md:focus-visible:w-60"
        placeholder="Search"
        onChange={handleChange}
        value={search}
        onKeyUp={handleKeyEnter}
      />
    </nav>
  );
};

export { Navbar };
