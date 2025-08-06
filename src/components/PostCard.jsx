import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block w-full">
      <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500">
        <div className="aspect-square overflow-hidden rounded-lg bg-slate-800 mb-4">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-indigo-400 mt-2 truncate tracking-tight">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
