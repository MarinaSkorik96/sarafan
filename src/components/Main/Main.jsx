import React from "react";
import AddComments from "../AddComments/AddComments";
import Filters from "../Filtres/Filters";
import Posts from "../Posts/Posts";
import './MainStyles.css'


export const Main = () => {
  return (
    <div className="main">
      <AddComments />
      <Filters />
      <Posts />
    </div>

  )
}
// export default Main;