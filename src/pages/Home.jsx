import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';


function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);


  useEffect(() => {
  if (authStatus) {
    setLoading(true);
    appwriteService.getPosts().then((response) => {
      if (response?.documents) {
        const sortedPosts = response.documents.sort((a, b) =>
        new Date(b.$createdAt) - new Date(a.$createdAt)
      );
      setPosts(sortedPosts.slice(0,8));
      }
    }).finally(() => setLoading(false));
  } else {
    setPosts([]);
    setLoading(false);
  }
}, [authStatus]);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 py-12">
      <Container className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-400 mb-10 text-center tracking-tight">
          Latest Posts
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <h2 className="text-center text-gray-400 text-lg">
            Login to read posts
          </h2>
        )}
      </Container>
    </div>
  );
}

export default Home;