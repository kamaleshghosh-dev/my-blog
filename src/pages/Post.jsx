import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
       <div className="min-h-screen bg-slate-950 text-gray-100 py-12 px-4">
  <Container>
    <div className="max-w-4xl mx-auto rounded-xl  overflow-auto bg-slate-800 aspect-video relative mb-10">
      <img
    src={appwriteService.getFileView(post.featuredImage)}
    alt={post.title}
    className="w-full max-h-[80vh] object-contain rounded-x1 mx-auto"
  />

      {isAuthor && (
        <div className="absolute right-6 top-6 flex space-x-4">
          <Link to={`/edit-post/${post.$id}`}>
            <Button bgColor="bg-green-500">Edit</Button>
          </Link>
          <Button bgColor="bg-red-500" onClick={deletePost}>
            Delete
          </Button>
        </div>
      )}
    </div>

    <h1 className="text-4xl font-bold text-indigo-400 text-center mb-8 tracking-tight">
      {post.title}
    </h1>

    <div className="max-w-4xl mx-auto text-gray-200 leading-relaxed space-y-4">
      {parse(post.content)}
    </div>
  </Container>
</div>
    ) : null;
}