import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/postslice";

function AllPosts() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((response) => {
        if (response?.documents) {
          const sortedPosts = [...response.documents].sort(
            (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt) // latest first
          );
          dispatch(setPosts(sortedPosts));
        }
      })
      .finally(() => setloading(false));
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-52 rounded-lg bg-slate-800 animate-pulse"
              >
                <div className="h-36 bg-slate-700 rounded-t-lg" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-600 rounded w-3/4" />
                  <div className="h-3 bg-slate-600 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            You haven’t posted anything yet.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
