import Head from 'next/head';
import axios, { AxiosResponse } from 'axios';
import { Layout, PostCard } from '../components';
import { env } from '../env/server.mjs';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import type { Post } from '../types';

interface HomePageProps {
  posts: Post[];
}

const Home: NextPageWithLayout<HomePageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog - Home</title>
        <meta name="description" content="Blog website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts ? (
          posts.map((post, i) => (
            <PostCard key={post.id} isFeautured={i === 0} post={post} />
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
  const postsResponse: AxiosResponse<Post[]> = await axios.get(
    `${env.API_URL}?tag=nextjs&top=365`
  );

  return {
    props: { posts: postsResponse.data },
  };
};
