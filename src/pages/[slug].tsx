import Head from "next/head";
import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { api } from "~/utils/api";
import { Loader } from "~/components/UI/loading";


const ProfilePage: NextPage<{username: string}> = ({username}) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (isLoading) return <Loader />;

  if (!data) return <div>404</div>;
  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <main className="flex flex-col items-center bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
        <div>{data.username}</div>
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { appRouter } from "~/server/api/root";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = ctx.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await helpers.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
