

import { useEffect, useState } from "react";
import PostCard from "./PostCard";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function Exercise() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/postsData.json");
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = (await res.json()) as Post[];
  setPosts(data); 
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-grey-500 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-700">Posts Card</h1>

      {error ? (
        <div className="max-w-4xl mx-auto text-red-600">Gagal memuat data: {error}</div>
      ) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-screen-2xl mx-auto">
          {posts.map((p) => (
            <PostCard key={p.id} id={p.id} userId={p.userId} title={p.title} body={p.body} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Exercise;
