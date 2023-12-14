import React, { useEffect, useState } from "react";
import AddComments from "../AddComments/AddComments";
import Filters from "../Filtres/Filters";
import Posts from "../Posts/Posts";
import Footer from "../Footer/Footer"
import './MainStyles.css'

export const Main = () => {
  const numbersOfPostsDef = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : 10;

  const [numbersOfPosts, setNumbersOfPosts] = useState(numbersOfPostsDef)

  const saveNumberOfPosts = (n) => {
    setNumbersOfPosts(n)
    localStorage.setItem('quantity', n);
  }
  return (
    <div className="main">
      <AddComments />
      <Filters />
      <Posts numbersOfPosts={numbersOfPosts} />
      <Footer saveNumberOfPosts={saveNumberOfPosts} />
    </div>

  )
}
