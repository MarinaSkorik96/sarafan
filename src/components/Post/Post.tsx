import React, { useEffect, useState } from "react";
import "./PostStyles.css";
import { useGetAllPostsQuery, useGetAllUsersQuery } from "../../query/posts";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hook";
import { getAllUsers, getOpenPost } from "../../store/slices/posts";

const Post: React.FC = () => {
  const [currentPostStart,setCurrentPostStart]=useState(10)
  const [isMyFetching, setIsFetchingDown] = useState(false);
  const [isMyFetchingUp, setIsMyFetchingUp] = useState(false);
  const dispatch = useAppDispatch();

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
  } = useGetAllPostsQuery(currentPostStart);
  const { data: users, isError: usersError } = useGetAllUsersQuery(null);

  useEffect(() => {
    if (users) {
      dispatch(getAllUsers(users));
    }
  }, [users]);

  const goToPostPage = (post: any) => {
    dispatch(getOpenPost(post));
    console.log(post);
  };
  const scrollHandler = (e: any): void => {
    if (e.target.documentElement.scrollTop < 50) {
      setIsMyFetchingUp(true);
    }
    if (
      e.target.documentElement.scrollHeight -
        e.target.documentElement.scrollTop -
        window.innerHeight <
      50
    ) {
      setIsFetchingDown(true);
      window.scrollTo(
        0,
        e.target.documentElement.scrollHeight +
          e.target.documentElement.scrollTop
      );
    }
  };

  useEffect(() => {
    if (isMyFetching) {
      setCurrentPostStart((prev) => {
        return prev < 93 ? prev + 10 : prev;
      });
      setIsFetchingDown(false);
    }
  }, [isMyFetching]);

  useEffect(() => {
    if (isMyFetchingUp) {
      setCurrentPostStart((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
      setIsMyFetchingUp(false);
    }
  }, [isMyFetchingUp]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <>
        {postsError || usersError ? (
          <p className="no-posts">
            Ошибка загрузки постов, попробуйте позже *_*
          </p>
        ) : postsLoading ? (
          <p>Подождите, посты загружаются...</p>
        ) : (
          postsData?.map((post) => {
            return (
              <div key={post.id} className="post">
                <div className="post_main">
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
                  <Link
                    to="/post"
                    className="post_button"
                    onClick={() => {
                      goToPostPage(post);
                    }}
                  >
                    Просмотр
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </>
    </>
  );
};
export default Post;
