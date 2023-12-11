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
import { allPosts, allUsers, deletePost, getAllPosts, getDeletePost } from "../../store/slices/posts";
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



  let allPosts = useSelector(store => store.posts.allPosts)
  const allUserss = useSelector(state => state.posts.allUsers)


  // useEffect(() => {
  //   console.log(title)
  //   console.log(text)
  // }, [title, text])


  useEffect(() => {
    console.log(favoritesPosts)
  }, [favoritesPosts])
  const { data: postsData, isLoading: postsLoading } = useGetAllPostsQuery(numbersOfPosts);
  const { data: users } = useGetAllUsersQuery();
  // const [getDeletePost, result] = useGetDeletePostMutation();
  // console.log(result)

  // useEffect(()=>{
  //   if (result.isSuccess === true) {
  //     dispatch(deletePost( {postToBeDeleted }))
  //   }
  // },[result])
  // console.log(isLoading)
  // console.log(isError)
  // console.log(isSuccess)

   async function deletePostS(postToBeDeleted) {
    const r = await dispatch(getDeletePost(postToBeDeleted))
    // console.log(postToBeDeleted)
    console.log(r.meta.requestStatus)
    if(r.meta.requestStatus === 'rejected'){
      alert (r.meta.requestStatus )
      return <div>Ошибка</div>
    }
    console.log(r)
    console.log(allPosts)
    // const postId = postToBeDeleted.id
    // console.log(getDeletePost({ postId }))
    // // console.log(isSuccess)


    // getDeletePost({ postId })

    //   // console.log(ddd),
    //   // console.log(isLoading)
    //   // console.log(isError)
    //   // console.log(isSuccess)
    //   if (result.status === 'fulfilled') {
    //     console.log(4)

    //   }

    
    // console.log(isSuccess)

  }

  const saveNumberOfPosts = (n) => {
    setNumbersOfPosts(n)
    localStorage.setItem('quantity', n);
  }
  useEffect(() => {
    dispatch(allUsers(users))
  }, [users])
  useEffect(() => {
    if (postsData) {
      dispatch(getAllPosts(postsData))
    }
  }, [postsData])


  console.log(allPosts)

  return (

    <>
      <>
        {postsLoading ? <p>Подождите, посты загружаются...</p> : allPosts.map((post) => {
          return (
            <>
              <div className={postCommentsOn.includes(post.id) ? "postD" : "post"}>

                {/* Левые кнопки поста */}
                <div className="post_side-bar">

                  {/* Избранное */}
                  {favoritesPosts.includes(post) ?
                    <div className="post_side-block post_side-block-active" onClick={() => { setFavoritesPosts(favoritesPosts.filter((checkPost) => checkPost !== post)) }}>
                      <IoHeart />
                    </div>
                    :
                    <div className="post_side-block " onClick={() => { setFavoritesPosts([...favoritesPosts, post]) }}>
                      <IoMdHeartEmpty />
                    </div>
                  }

                  {/* Удаление */}
                  <div className={"post_side-block"} onClick={(() => {
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

                <div className="post_block">
                  <div key={post.id} className="post_main">
                    <div className="post_header">

                      {postEditing === true && postToBeDeleted === post ?
                        <>
                          <select className="change_post-authore" >
                            {allUserss ? allUserss.map((user) => {
                              return (
                                <option
                                  key={user.id}
                                  selected={post.userId === user.id ? user.name : false}
                                >{user.name}</option>
                              )
                            }) : null}
                          </select>
                          <textarea
                            rows='3'
                            className="change_post-title"
                            onChange={(e) => setTitle(e.target.value)}
                          >
                            {postToBeDeleted.title}
                          </textarea>
                          <textarea
                            rows='7'
                            className="change_post-body"
                            onChange={(e) => setText(e.target.value)
                            }
                          >
                            {postToBeDeleted.body}
                          </textarea>
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
                    {postEditing === true && postToBeDeleted === post ?
                      <div className="edditing-buttons">
                        <button className="post_button-comments">Сохранить</button>
                        <button className="post_button-comments">Отменить</button>
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

                  </div>
                  {postCommentsOn.includes(post.id) ? <Comments post={post.id} /> : null}
                </div>
              </div>
            </>
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
          <div className="add_comment-form">
            <p>Подтвердите действие</p>
            <button className="add_comment_form-button" onClick={() => {
              if (actionWithPosts === "Добавить в избранное") {
                setFavoritesPosts([...favoritesPosts, ...checkPosts]);
              } else if (actionWithPosts === "Удалить") {
                checkPosts.forEach((post) => {
                  deletePostS(post)
                })
              } else if (actionWithPosts === "Удалить пост") {
                deletePostS(postToBeDeleted)
              }
              if (actionWithPosts !== "Удалить пост") {
                setCheckPots([])
              }
              setActionWithPosts("")
            }}>
              {actionWithPosts}
              {actionWithPosts === "Удалить пост" ? null : checkPosts.length === 1 ? ` ${checkPosts.length} пост` : checkPosts.length < 5 ? ` ${checkPosts.length} поста` : ` ${checkPosts.length} постов`}
            </button>
            <button className="add_comment_form-button" onClick={() => {
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