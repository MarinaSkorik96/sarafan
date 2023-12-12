import React, { useEffect, useState } from "react";
import './AddCommentsStyle.css'
import { useDispatch, useSelector } from "react-redux";
import { useGetAddNewPostMutation } from "../../query/posts";
import { addPost, getTodos } from "../../api";
import { getAddNewPost, getAllPosts } from "../../store/slices/posts";


const AddComments = () => {
  const { allPosts, allUsers, status } = useSelector(state => state.posts)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [author, setAuthore] = useState([])
  const [addPostButtonOn, setAddPostButtonOn] = useState(false)
  const [closingClarificationWindow, setClosingClarificationWindow] = useState(false)
  const [emptyInputTitle, setEmptyInputTitle] = useState(false)
  const [emptyInputText, setEmptyInputText] = useState(false)
  const dispatch = useDispatch()

  const addPost = async () => {
    if (title === "" && text === "") {
      setEmptyInputTitle(true)
      setEmptyInputText(true)
    } else if (title === "") {
      setEmptyInputTitle(true)
    } else if (text === "") {
      setEmptyInputText(true)
    } else {
      dispatch(getAddNewPost({ title, text })).then((result) => {
        if (result.meta.requestStatus === "rejected") {
          alert('Ошибка добавления поста, попробуйте позже')
        } else if (result.meta.requestStatus === "fulfilled") {
          setAddPostButtonOn(false)
        }
      })
    }
  }

  const closingClarification = () => {
    if (title !== '' || text !== "") {
      setClosingClarificationWindow(true)
    } else {
      setAddPostButtonOn(false)
    }
  }


  // console.log(allUsers)
  return (
    <div className="add__comments">
      <button className="add__comments-button" onClick={() => {
        setAddPostButtonOn(true)
        setClosingClarificationWindow(false)
      }}>
        <p>Добавить пост...</p>
        <div className="plus_box">
          <div className="add__comments-button_vertical"></div>
          <div className="add__comments-button_horizontal"></div>
        </div>

      </button>
      {/* <button className="add__comments-button">

      </button> */}
      {addPostButtonOn &&
        <div className="background">
          <div className="add_comment-form">
            <button
              className="close_button"
              onClick={() => closingClarification()}>
              <svg stroke="#05386B" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z" fill="#05386B"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z" fill="#05386B"></path></svg>
            </button>
            <select className="add_comment_form-author" onChange={(e) => setAuthore(e.target.value)}>
              {allUsers ? allUsers.map((user) => {
                return (
                  <option key={user.id}>{user.name}</option>
                )
              }) : null}
            </select>
            <textarea
              className={emptyInputTitle ? "add_comment_form-title-empty" : "add_comment_form-title"}
              rows="2"
              placeholder="Заголовок"
              onChange={(e) => {
                setTitle(e.target.value)
                setEmptyInputTitle(false)
              }}
            />
            <textarea
              className={emptyInputText ? "add_comment_form-text-empty": "add_comment_form-text"}
              rows="5"
              placeholder="Текст"
              onChange={(e) =>{
                setText(e.target.value)
                setEmptyInputText(false)
              }}
            />
            {closingClarificationWindow ?
              <div>
                <p>Уверевы, что хотите закрыть? Введенные данные будут потеряны.</p>
                <div className="buttons_box">
                  <button
                    className="add_comment_form-button"
                    onClick={() => {
                      setAddPostButtonOn(false)
                      setTitle("")
                      setText("")
                    }}
                  >Закрыть</button>
                  <button
                    className="add_comment_form-button"
                    onClick={() => { setClosingClarificationWindow(false) }}
                  >Отмена</button>
                </div>
              </div> :
              <button
                className="add_comment_form-button"
                onClick={() => {
                  // add()
                  addPost()
                }}
              disabled={status === "loading" ? true : false}
              >Добавить пост</button>}
          </div>
        </div>
      }
    </div>
  )
}
export default AddComments;