import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { api } from "~/utils/api";
import { Loader } from "~/components/UI/loading";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
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
      <PageLayout>
        <div>
          <div className="relative h-56 bg-slate-200 dark:bg-slate-800 rounded-lg">
            <Image
              src={data.profileImageUrl}
              alt={`${data.username || ""}'s profile pic`}
              width={192}
              height={192}
              className="absolute -bottom-[96px] left-4 rounded-full border border-slate-700"
            />
          </div>
          <div className="h-[96px]"></div>
          <div className="p-4 text-2xl font-bold">{`@${data.username || "not-found"}`}</div>
          <div className="border-b border-slate-400 w-full"></div>
        </div>
      </PageLayout>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { appRouter } from "~/server/api/root";
import { PageLayout } from "~/components/Layout";
import Image from "next/image";

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
