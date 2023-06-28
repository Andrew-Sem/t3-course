import Head from "next/head";
import type { NextPage } from "next";


const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
        <meta name="description" content="🥺" />
      </Head>
      <main className="flex flex-col items-center bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
        <div>
          Post View
        </div>
      </main>
    </>
  );
};

export default SinglePostPage;
