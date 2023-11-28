import React from "react";
import './AddCommentsStyle.css'
import { TbSquareRoundedPlus } from "react-icons/tb";


const AddComments = () => {
  return (
    <div className="add__comments">
      Добавить пост
      <button className="add__comments-button">
        <TbSquareRoundedPlus />
      </button>
    </div>
  )
}
export default AddComments;