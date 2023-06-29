import Head from "next/head";
import type { NextPage } from "next";
import { PageLayout } from "~/components/Layout";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
        <meta name="description" content="🥺" />
      </Head>
      <PageLayout>
        <div>Post View</div>
      </PageLayout>
    </>
  );
};

export default SinglePostPage;
