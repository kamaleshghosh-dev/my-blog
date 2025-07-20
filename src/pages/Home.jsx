import React, { useEffect, useMemo, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/postslice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts()
      .then((response) => {
        if (response?.documents) {
          dispatch(setPosts(response.documents));
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const sortedPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
      .slice(0, 8);
  }, [posts]);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 py-12">
      <Container className="max-w-7xl mx-auto px-4">
        
        {/* Banner for Guests */}
        {!authStatus && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-6 text-center text-sm">
            You’re exploring as a guest !! 
          </div>
        )}

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
        ) : sortedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {sortedPosts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>

            {/* Explore more button for guests */}
            {!authStatus && (
              <div className="text-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full"
                >
                  Sign up to explore more and start posting!
                </button>
              </div>
            )}
          </>
        ) : (
          <h2 className="text-center text-gray-400 text-lg">
            No posts found.
          </h2>
        )}
      </Container>
    </div>
  );
}

export default Home;
