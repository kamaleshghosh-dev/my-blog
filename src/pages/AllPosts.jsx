import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading,setloading]=useState(true);

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response?.documents) {
        setPosts(response.documents);
      }
    }).finally(()=>setloading(false));
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
        ):posts.length>0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>):(
          <p className="text-gray-400 text-sm">You haven’t posted anything yet.</p>
        ) 
        }
      
        
      </Container>

    </div>
  );
}

export default AllPosts;