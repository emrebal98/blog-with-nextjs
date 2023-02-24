import Image from 'next/image';
import Head from 'next/head';
import moment from 'moment';
import axios, { AxiosResponse } from 'axios';
import { ContentRenderer, Layout } from '../components';
import { env } from '../env/server.mjs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { NextPageWithLayout } from './_app';
import type { Post, PostResponse } from '../types';

interface PostPageProps {
  post: Post;
}

interface Query extends ParsedUrlQuery {
  id: string;
}

const PostPage: NextPageWithLayout<PostPageProps> = ({ post }) => {
  const {
    user,
    reading_time_minutes,
    published_timestamp,
    title,
    cover_image,
    body_html,
  } = post;

  return (
    <>
      <Head>
        <title>{`Blog - ${title}`}</title>
        <meta name="description" content="Blog website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="overflow-hidden">
        <header className="my-10">
          <div className="mt-2 flex items-center gap-4">
            {user.profile_image_90 ? (
              <figure className="relative h-10 w-10 overflow-hidden rounded-full sm:h-[50px] sm:w-[50px]">
                <Image
                  src={user.profile_image_90}
                  alt={`${user.name} avatar`}
                  layout="fill"
                />
              </figure>
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
              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="hidden sm:block">{user.username}</span>
                <span className="hidden sm:block">•</span>
                <span>{`${reading_time_minutes} minutes read`}</span>
                <span>•</span>
                <span>
                  {moment(published_timestamp).format('MMM DD, YYYY')}
                </span>
              </p>
            </p>
          </div>
        </header>

        <section className="pb-10">
          <h1 className="mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h1>
          {/* Cover Image */}
          <figure className="relative mb-4 h-full min-h-[300px] md:min-h-[350px] w-full overflow-hidden rounded">
            <Image
              src={
                cover_image
                  ? cover_image
                  : 'https://dummyimage.com/10:9x1080/000/ffffff&text=Cover+Image'
              }
              alt="cover image"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </figure>
          {body_html ? (
            <ContentRenderer content={body_html} />
          ) : (
            <p>There is no body of the article.</p>
          )}
        </section>
      </article>
    </>
  );
};

PostPage.getLayout = (page) => <Layout>{page}</Layout>;

export default PostPage;

export const getStaticProps: GetStaticProps<PostPageProps, Query> = async (
  context
) => {
  if (!context.params) return { notFound: true };
  const { id } = context.params;

  //Fetch post data
  const postResponse: AxiosResponse<PostResponse> = await axios.get(
    `${env.API_URL}/${id}`
  );

  if (!postResponse.data) return { notFound: true };

  //Remove unused properties to reduce threshold size
  const post: Post = {
    id: postResponse.data.id,
    title: postResponse.data.title,
    description: '',
    published_timestamp: postResponse.data.published_timestamp,
    cover_image: postResponse.data.cover_image,
    reading_time_minutes: postResponse.data.reading_time_minutes,
    user: {
      name: postResponse.data.user.name,
      username: postResponse.data.user.username,
      profile_image_90: postResponse.data.user.profile_image_90,
    },
    body_html: postResponse.data.body_html,
  };

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  //Fetch posts
  const postsResponse: AxiosResponse<PostResponse[]> = await axios.get(
    `${env.API_URL}?tag=nextjs&top=365`
  );

  const paths = postsResponse.data.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
