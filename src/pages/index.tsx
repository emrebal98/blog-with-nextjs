import Head from 'next/head';
import axios, { AxiosResponse } from 'axios';
import { Layout, PostCard } from '../components';
import { env } from '../env/server.mjs';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import type { Post, PostResponse } from '../types';
import { useSearchStore } from '../stores';

interface HomePageProps {
  posts: Post[];
}

const Home: NextPageWithLayout<HomePageProps> = ({ posts }) => {
  const { search } = useSearchStore();

  return (
    <>
      <Head>
        <title>Blog - Home</title>
        <meta name="description" content="Blog website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts ? (
          posts
            .filter((f) => f.title.includes(search))
            .map((post, i) => (
              <PostCard
                key={post.id}
                isFeautured={i === 0 || search.length > 0}
                post={post}
                isCoverPriority={i < 4}
              />
            ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  //Fetch posts
  const postsResponse: AxiosResponse<PostResponse[]> = await axios.get(
    `${env.API_URL}?tag=nextjs&top=365`
  );

  //Remove unused properties to reduce threshold size
  const posts: Post[] = postsResponse.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      published_timestamp: item.published_timestamp,
      cover_image: item.cover_image,
      reading_time_minutes: item.reading_time_minutes,
      user: {
        name: item.user.name,
        username: item.user.username,
        profile_image_90: item.user.profile_image_90,
      },
      body_html: '',
    };
  });

  return {
    props: { posts },
  };
};
