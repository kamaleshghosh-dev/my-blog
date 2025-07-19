import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';
import { setPosts } from '../store/postslice'; 

function MyPost() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.posts);
  const userPosts = allPosts.filter((post) => post.userId === userData?.$id);

  useEffect(() => {
    if (userData?.$id) {
      appwriteService
        .getPosts([])
        .then((response) => {
          if (response?.documents) {
            dispatch(setPosts(response.documents)); 
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userData, dispatch]);

  return (
    <div className="w-full py-8">
      <Container>
        <h2 className="text-2xl font-semibold text-indigo-400 mb-6">My Posts</h2>

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
        ) : userPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">You haven’t posted anything yet.</p>
        )}
      </Container>
    </div>
  );
}

export default MyPost;
