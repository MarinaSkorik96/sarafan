import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllPosts, getChangePost, getDeletePost, getLikedPosts } from "../../store/slices/posts";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useGetAllUsersQuery } from "../../query/posts";

export const SideButtons = ({ post, setPostEditing, setPostToBeDeleted, setActionWithPosts, favoritesPosts, setFavoritesPosts, setChangedUser, checkPosts, setCheckPots, setTitle, setText }) => {
  const dispatch = useDispatch();

  const {
    allPosts,
    allUsers,
    status,
    filteredPosts,
    filtersActive
  } = useSelector(state => state.posts)
  const { data: users, isError: usersError } = useGetAllUsersQuery();

  useEffect(() => {
    // dispatch(getAllUsers(users))
    dispatch(getLikedPosts(favoritesPosts))
    // if (postsData) {
    //   // dispatch(getAllPosts(postsData))
    // }
  }, [favoritesPosts])
  // // Удаление поста
  // const deletePost = async (postToBeDeleted) => {
  //   dispatch(getDeletePost(postToBeDeleted)).then((result) => {
  //     if (result.meta.requestStatus === "rejected") {
  //       alert('Ошибка удаления поста, попробуйте позже')
  //     }
  //   })
  // }\
  // // Изменение поста
  // const changePost = async (postToBeDeleted) => {
  //   const index = allPosts.indexOf(postToBeDeleted)
  //   const userId = allUsers.find((user) => user.name === changedUser).id
  //   console.log(userId)
  //   dispatch(getChangePost({ postToBeDeleted, index, title, text, userId })).then((result) => {
  //     if (result.meta.requestStatus === "fulfilled") {
  //       setPostEditing(false)
  //     } else if (result.meta.requestStatus === "rejected") {
  //       alert('Ошибка отправки изменения, попробуйте позже')
  //     }
  //   })
  // }
  return (
    <div className="post_side-bar">

      {/* Избранное */}
      {favoritesPosts.includes(post.id) ?
        <div className="post_side-block post_side-block-active" onClick={() => {
          setFavoritesPosts(favoritesPosts.filter((checkPost) => checkPost !== post.id))
        }}>
          <IoHeart />
        </div>
        :
        <div className="post_side-block " onClick={() => { setFavoritesPosts([...favoritesPosts, post.id]) }}>
          <IoMdHeartEmpty />
        </div>
      }

      {/* Удаление */}
      <div
        className="post_side-block"
        onClick={(() => {
          setActionWithPosts('Удалить пост')
          setPostToBeDeleted(post)
        })}>
        <MdDeleteOutline />
      </div>

      {/* Редактирование */}
      <div className="post_side-block" onClick={() => {
        setPostEditing(true)
        setPostToBeDeleted(post)
        setTitle(post.title)
        setText(post.body)
        setChangedUser(users.find(user => user.id === post.userId).name)

      }}>
        <MdOutlineEdit />
      </div>

      {/* Чекбокс */}
      {checkPosts.includes(post) ?
        <div className="post_side-block post_side-block-active" onClick={() => { setCheckPots(checkPosts.filter((checkPost) => checkPost !== post)) }}>
          <IoCheckboxOutline />
        </div>
        :
        <div className="post_side-block " onClick={() => { setCheckPots([...checkPosts, post]) }}>
          <MdOutlineCheckBoxOutlineBlank />
        </div>
      }
    </div>

  )
}