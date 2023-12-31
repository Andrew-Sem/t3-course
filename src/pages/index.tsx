import Image from "next/image";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import type { NextPage } from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader, LoadingPage } from "~/components/UI/loading";
import { type FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { PageLayout } from "~/components/Layout";

dayjs.extend(relativeTime);

const CreatePostForm = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input !== "") mutate({ content: input });
  };

  if (!user) return null;
  return (
    <form className="flex" onSubmit={formSubmit}>
      <input
        type="text"
        placeholder="type some emojis!"
        className="grow bg-transparent outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input !== "" && !isPosting && (
        <button type="submit" disabled={isPosting}>
          Post
        </button>
      )}
      {isPosting && <Loader />}
    </form>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className="flex items-center gap-2 rounded border border-gray-500/50 p-2"
    >
      <Image
        className="h-10 w-10 rounded-full"
        src={author.profileImageUrl}
        alt={`${author.username || "author"} profile picture`}
        height={56}
        width={56}
      />
      <div className="flex flex-col">
        <div className="text-gray-400">
          <Link href={`@${author.username || "not-found"}`}>
            <span className="">{`@${author.username || "not found"}`}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{` • ${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <div className="text-2xl">{post.content}</div>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();
  if (postsLoading) return <LoadingPage />;
  if (!data) return <div>There is no data 😭</div>;

  return (
    <div className="flex flex-col gap-2">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded } = useUser();

  // start fetching asap
  api.posts.getAll.useQuery();

  if (!userLoaded) return <LoadingPage />;

  return (
    <PageLayout>
      <CreatePostForm />
      <Feed />
    </PageLayout>
  );
};

export default Home;
