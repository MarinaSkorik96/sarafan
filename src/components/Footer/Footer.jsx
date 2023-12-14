import React from "react";
import './FooterStyles.css'
import { useSelector } from "react-redux";
import { useGetAllPostsQuery } from "../../query/posts";

const Footer = ({ saveNumberOfPosts }) => {
  const { data: postsData } = useGetAllPostsQuery();
  const numbersOfPosts = localStorage.getItem('quantity')

  return (
    <div className="footer-buttons">Показывать по
      <button className={Number(numbersOfPosts) === 10 ? "footer-button footer-button-active" : "footer-button"} onClick={() => { saveNumberOfPosts(10) }}>10</button>
      <button className={Number(numbersOfPosts) === 20 ? "footer-button footer-button-active" : "footer-button"} onClick={() => { saveNumberOfPosts(20) }}>20</button>
      <button className={Number(numbersOfPosts) === 50 ? "footer-button footer-button-active" : "footer-button"} onClick={() => { saveNumberOfPosts(50) }}>50</button>
      <button className={Number(numbersOfPosts) === 100 ? "footer-button footer-button-active" : "footer-button"} onClick={() => { saveNumberOfPosts(100) }}>100</button>
      <button className={Number(numbersOfPosts) >= 100 ? "footer-button footer-button-active" : "footer-button"} onClick={() => { saveNumberOfPosts(postsData.length) }}>Все</button>
      постов
    </div>
  )
}

export default Footer;