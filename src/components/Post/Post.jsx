import React from "react";
import './PostStyles.css'
import { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery } from "../../query/posts";
import { getTodos } from "../../api";
import { useEffect } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Comments from "../Comments/Comments";

const Post = () => {

  const { data, isLoading } = useGetAllPostsQuery();
  const { currentData } = useGetAllUsersQuery();

  // let cities = [{ id: 121, name: 'г. Урюпинск' }, { id: 122, name: 'г. Париж' }, { id: 123, name: 'г. Москва' }, { id: 124, name: 'г. Штормград' }];
  // let searchTerm = 'г. Москва';
  // let cityId = cities.find(city => city.name === searchTerm).id
  // console.log(cityId);

  return (
    <>
      {isLoading ? null : data.map((post) => {
        return (
          <div>
            <div className="post">
              <div className="post_side-bar">
                <div className="post_side-like">
                  <IoMdHeartEmpty />
                </div>
                <div className="post_side-like">
                  <MdDeleteOutline />
                </div>
                <div className="post_side-like">
                  <MdOutlineEdit />
                </div>

              </div>
              <div key={post.id} className="post_main">
                <div className="post_header">
                  {currentData && <p className="post_author">
                    {currentData.find(user => user.id === post.userId).name}
                  </p>}
                  <h3 className="post_title">{post.title}</h3>
                  <p className="post_text">{post.body}</p>
                </div>
                <button className="post_button-comments">Комментарии</button>
              </div>
              <Comments post={post} />
            </div>
          </div>
        )

      })}

    </>
  )
}
export default Post;