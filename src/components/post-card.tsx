import Image from 'next/image';
import { useRouter } from 'next/router';
import moment from 'moment';
import type { FunctionComponent } from 'react';
import type { Post } from '../types';

export interface PostCardProps {
  post: Post;
  isFeautured?: boolean;
}

const PostCard: FunctionComponent<PostCardProps> = ({ post, isFeautured }) => {
  const {
    id,
    cover_image,
    published_timestamp,
    title,
    description,
    user,
    reading_time_minutes,
  } = post;

  const router = useRouter();

  return (
    <article
      className={`flex cursor-pointer flex-col items-start gap-2 rounded bg-slate-200 p-4 dark:bg-slate-800${
        isFeautured ? ' md:col-span-3 md:flex-row md:gap-4' : ''
      }`}
      onClick={() => router.push(id.toString())}
    >
      {/* Cover Image */}
      <figure className="relative h-full min-h-[25vh] w-full self-center overflow-hidden rounded">
        <Image
          src={
            cover_image
              ? cover_image
              : 'https://dummyimage.com/10:9x1080/000/ffffff&text=Cover+Image'
          }
          alt="cover image"
          layout="fill"
          objectFit="cover"
        />
      </figure>

      <div
        className={`flex h-full w-[80%] flex-col gap-2${
          isFeautured ? ' md:justify-center' : ''
        }`}
      >
        {/* Category and Date */}
        <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{`${reading_time_minutes} minutes read`}</span>
          <span>•</span>
          <span>{moment(published_timestamp).format('MMM DD, YYYY')}</span>
        </p>
        {/* Title */}
        <h2 className=" max-h-[96px] overflow-hidden text-ellipsis text-2xl font-semibold text-gray-800 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] dark:text-gray-200">
          {title}
        </h2>
        {/* calc(line-height * number of lines you desire) => {24 * 3 = 72} */}
        <p
          className={`max-h-[72px] w-full overflow-hidden text-ellipsis text-gray-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] dark:text-gray-400${
            isFeautured ? ' md:max-h-[120px] md:[-webkit-line-clamp:5]' : ''
          }`}
        >
          {description}
        </p>
        <div className="flex-1" />
        <div className="mt-2 flex items-center gap-4">
          {user.profile_image_90 ? (
            <Image
              className="rounded-full"
              src={user.profile_image_90}
              alt={`${user.name} avatar`}
              width={50}
              height={50}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-[50px] w-[50px] rounded-full border border-slate-900 stroke-slate-900 p-2 dark:border-slate-100 dark:stroke-slate-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          )}
          <p className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user.name}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {user.username}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};

export { PostCard };
