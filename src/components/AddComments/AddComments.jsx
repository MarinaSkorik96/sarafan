import React, { useEffect, useState } from "react";
import './AddCommentsStyle.css'
import { TbSquareRoundedPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useGetAddNewPostMutation } from "../../query/posts";
import { addPost, getTodos } from "../../api";
import { getAllPosts } from "../../store/slices/posts";


const AddComments = () => {
  const allPosts = useSelector(store => store.posts.allPosts)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [author, setAuthore] = useState([])
  const [addPostDuttonOn, setAddPostButtonOn] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(author)
  }, [author])
  const [getAddNewPost, { isLoading }] = useGetAddNewPostMutation()
  useEffect(() => {
    // console.log(isLoading)
  }, [isLoading])

  async function add() {
    const post = await getAddNewPost({ title, text })
    console.log(post.data)
    console.log(allPosts)
    let de = [post.data, ...allPosts]
    console.log(de)
    dispatch(getAllPosts(de))
    if (isLoading === false) {
      setAddPostButtonOn(false)
    }
  }


  const allUsers = useSelector(state => state.posts.allUsers)
  console.log(allUsers)
  return (
    <div className="add__comments">
      <button className="add__comments-button" onClick={() => setAddPostButtonOn(true)}>
        <p>Добавить пост...</p>
        <div className="plus_box">
          <div className="add__comments-button_vertical"></div>
          <div className="add__comments-button_horizontal"></div>
        </div>

      </button>
      {/* <button className="add__comments-button">

      </button> */}
      {addPostDuttonOn &&
        <div className="background">
          <div className="add_comment-form">
            <select className="add_comment_form-author" onChange={(e)=>setAuthore(e.target.value)}>
              {allUsers ? allUsers.map((user) => {
                return (
                  <option key={user.id}>{user.name}</option>
                )
              }) : null}
            </select>
            <textarea
              className="add_comment_form-title"
              rows="2"
              placeholder="Заголовок"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="add_comment_form-text"
              rows="5"
              placeholder="Текст"
              onChange={(e) => setText(e.target.value)}
            />
            <button className="add_comment_form-button" onClick={() => {
              add()

            }}>Добавить пост</button>
          </div>

        </div>
      }
    </div>
  )
}
export default AddComments;