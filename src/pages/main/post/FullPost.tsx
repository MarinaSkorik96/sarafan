import React from "react";
import { useAppSelector } from "../../../hook";
import { Link } from "react-router-dom";

const FullPost: React.FC = () => {
  const post = useAppSelector((state) => state.posts.openPost);
  const users = useAppSelector((state) => state.posts.allUsers);
  return (
    <div key={post?.id} className="post">
      <div className="post_main">
        {post && (
          <div className="post_header">
            <>
              <p>{post.id}</p>
              {users && (
                <p className="post_author">
                  {users?.find((user) => user.id === post.userId)?.name}
                </p>
              )}
              <h3 className="post_title">{post.title}</h3>
              <p className="post_text">{post.body}</p>
            </>
          </div>
        )}
        <Link to="/" className="post_button">
          Вернуться к списку постов
        </Link>
      </div>
    </div>
  );
};

export default FullPost;
