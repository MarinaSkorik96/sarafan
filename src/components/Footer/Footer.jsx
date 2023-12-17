import React from "react";
import './FooterStyles.css'
import { useGetAllPostsQuery } from "../../query/posts";

const Footer = ({ saveNumberOfPosts }) => {
  const { data: postsData } = useGetAllPostsQuery();
  const numbersOfPosts = localStorage.getItem('quantity')

  const Button = ({ n }) => {
    return (
      <button className={Number(numbersOfPosts) === n ? "footer-button footer-button-active" : "footer-button"} onClick={() => { saveNumberOfPosts(n) }}>{n}</button>
    )
  }

  return (
    <div className="footer-buttons">Показывать по
      <Button n={10} />
      <Button n={20} />
      <Button n={50} />
      <Button n={100} />
      <button className={Number(numbersOfPosts) >= 100 ? "footer-button footer-button-active" : "footer-button"} onClick={() => { saveNumberOfPosts(postsData.length) }}>Все</button>
      постов
    </div>
  )
}

export default Footer;