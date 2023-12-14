import React, { useState } from "react";
import './PostStyles.css'
import { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery, useGetDeletePostMutation } from "../../query/posts";
import { getTodos } from "../../api";
import { useEffect } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import Comments from "../Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, getAllUsers, deletePost, getAllPosts, getChangePost, getDeletePost, getLikedPosts } from "../../store/slices/posts";
import { TbCoinRupee, TbColumnInsertLeft } from "react-icons/tb";

const Post = () => {
  const dispatch = useDispatch();
  const numbersOfPostsDef = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : 10;

  const [postCommentsOn, setPostCommentsOn] = useState([])
  const [checkPosts, setCheckPots] = useState([])
  const [favoritesPosts, setFavoritesPosts] = useState([])
  const [actionWithPosts, setActionWithPosts] = useState("")
  const [postToBeDeleted, setPostToBeDeleted] = useState()
  const [postEditing, setPostEditing] = useState(false)
  const [numbersOfPosts, setNumbersOfPosts] = useState(numbersOfPostsDef)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [changedUser, setChangedUser] = useState("")
  const [selected, setSelected] = useState('');
  const {
    allPosts,
    allUsers,
    status,
    filteredPosts,
    filtersActive
  } = useSelector(state => state.posts)

  const posts = filtersActive ? filteredPosts : allPosts

  const { data: postsData, isLoading: postsLoading } = useGetAllPostsQuery(numbersOfPosts);
  const { data: users } = useGetAllUsersQuery();

  // Сохранение выбора колличества постов
  const saveNumberOfPosts = (n) => {
    setNumbersOfPosts(n)
    localStorage.setItem('quantity', n);
  }

  useEffect(() => {
    dispatch(getAllUsers(users))
    dispatch(getLikedPosts(favoritesPosts))
    if (postsData) {
      dispatch(getAllPosts(postsData))
    }
  }, [postsData, favoritesPosts, users])

  // Удаление поста
  const deletePost = async (postToBeDeleted) => {
    dispatch(getDeletePost(postToBeDeleted)).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        alert('Ошибка удаления поста, попробуйте позже')
      }
    })
  }

  // Изменение поста
  const changePost = async (postToBeDeleted) => {
    const index = allPosts.indexOf(postToBeDeleted)
    const userId = allUsers.find((user) => user.name === changedUser).id
    console.log(userId)
    dispatch(getChangePost({ postToBeDeleted, index, title, text, userId })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setPostEditing(false)
      } else if (result.meta.requestStatus === "rejected") {
        alert('Ошибка отправки изменения, попробуйте позже')
      }
    })
  }

  const handleChange = event => {
    // console.log('Label 👉️', event.target.selectedOptions[0].label);
    // console.log(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <>
      <>
        {postsLoading ? <p>Подождите, посты загружаются...</p> : posts.map((post) => {
          return (
            <div key={post.id} className={postCommentsOn.includes(post.id) ? "postD" : "post"}>

              {/* Левые кнопки поста */}
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

                <div className="post_main">
                  <div className="post_header">

                    {postEditing === true && postToBeDeleted === post ?
                      <>
                        <select className="change_post-authore"
                          defaultValue={allUsers.find(user => user.id === post.userId).name}
                        >
                          {allUsers ? allUsers.map((user) => {
                            return (
                              <option
                                key={user.id}
                              >{user.name}</option>
                            )
                          }) : null}
                        </select>
                        <textarea
                          rows='3'
                          className="change_post-title"
                          onChange={(e) => setTitle(e.target.value)}
                          defaultValue={postToBeDeleted.title}
                        />
                        <textarea
                          rows='7'
                          className="change_post-body"
                          onChange={(e) => setText(e.target.value)
                          }
                          defaultValue={postToBeDeleted.body}
                        />
                      </>
                      :
                      <>
                        {users && <p className="post_author">
                          {users.find(user => user.id === post.userId).name}
                        </p>}
                        <h3 className="post_title">{post.title}</h3>
                        <p className="post_text">{post.body}</p>
                      </>
                    }
                  </div>

                  {/* Нижние кнопки поста */}
                  {postEditing === true && postToBeDeleted === post ?
                    <div className="edditing-buttons">
                      <button
                        className="post_button-comments"
                        disabled={status === "loading" ? true : false}
                        onClick={() => {
                          changePost(postToBeDeleted)
                          // }
                        }}>Сохранить</button>
                      <button
                        className="post_button-comments"
                        onClick={() => {
                          setPostEditing(false)
                        }}
                      >Отменить</button>
                    </div>
                    :
                    <button className="post_button-comments" onClick={() => {
                      if (postCommentsOn.includes(post.id)) {
                        let postId = post.id
                        setPostCommentsOn(postCommentsOn.filter((post) => post !== postId))
                      } else {
                        setPostCommentsOn([...postCommentsOn, post.id])
                      }
                    }}>
                      {postCommentsOn.includes(post.id) ? <span>Скрыть комментарии</span> : <span>Комментарии</span>}
                    </button>
                  }

                  {postCommentsOn.includes(post.id) ? <Comments post={post.id} /> : null}

                </div>
            </div>
          )
        })}

      </>

      {checkPosts.length !== 0 &&
        <div className="buttons__box">
          <button className="buttons__box_button" onClick={() => {
            setActionWithPosts("Добавить в избранное")
          }}>В избранное</button>
          <button className="buttons__box_button" onClick={() => {
            setActionWithPosts("Удалить")
          }}>Удалить</button>
        </div>}

      {actionWithPosts !== "" &&
        <div className="background">
          <div className="confirm_action">
            <p>Подтвердите действие</p>
            <button className="confirm_action-button" onClick={() => {
              if (actionWithPosts === "Добавить в избранное") {
                setFavoritesPosts([...favoritesPosts, ...checkPosts]);
              } else if (actionWithPosts === "Удалить") {
                checkPosts.forEach((post) => {
                  dispatch(getDeletePost(post))
                })
              } else if (actionWithPosts === "Удалить пост") {
                deletePost(postToBeDeleted)
                // console.log(postToBeDeleted)
                // dispatch(getDeletePost(postToBeDeleted))
              }
              if (actionWithPosts !== "Удалить пост") {
                setCheckPots([])
              }
              setActionWithPosts("")
            }}>
              {actionWithPosts}
              {actionWithPosts === "Удалить пост" ? null : checkPosts.length === 1 ? ` ${checkPosts.length} пост` : checkPosts.length < 5 ? ` ${checkPosts.length} поста` : ` ${checkPosts.length} постов`}
            </button>
            <button className="confirm_action-button" onClick={() => {
              setActionWithPosts("")
            }}>Отменить</button>
          </div>

        </div>
      }

      <p>Показывать по
        <button onClick={() => { saveNumberOfPosts(10) }}>10</button>
        <button onClick={() => { saveNumberOfPosts(20) }}>20</button>
        <button onClick={() => { saveNumberOfPosts(50) }}>50</button>
        <button onClick={() => { saveNumberOfPosts(100) }}>100</button>
        <button onClick={() => { saveNumberOfPosts(100) }}>Все</button>
      </p>

    </>
  )
}
export default Post;