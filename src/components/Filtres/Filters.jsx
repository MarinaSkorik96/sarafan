import React, { useState } from "react";
import './FiltersStyles.css'
import { useSelector } from "react-redux";

const Filters = () => {

  const [filter, setFilter] = useState("")
  const [filterTitle, setFilterTitle] = useState("")
  const [filterText, setFilterText] = useState("По названию")
  const [filterLikes, setFilterLikes] = useState("Все")
  const [filterSort, setFilterSort] = useState("Сначала первые")
  const [filterAuthors, setFilterAuthors] = useState([])
  const sortArray = ['Сначала первые', 'Сначала последние', 'По имени A-Z', 'По имени Z-A', 'По названию A-Z', 'По названию Z-A', 'Избранные сначала', 'Избранные в конце']

  console.log(filterTitle)
  const { allUsers } = useSelector(state => state.posts)

  // console.log(filter)
  const clickOnFilter = (f) => {
    setFilter(f)
    if (filter === f) {
      setFilter('')
    }
  }

  const selecеLikeFilter = (f) => {
    setFilterLikes(f)
    setFilter('')
  }

  const authorsFilterArr = (name) => {
    if (filterAuthors.includes(name)) {
      setFilterAuthors(filterAuthors.filter((filter) => filter !== name))
    } else {
      setFilterAuthors([...filterAuthors, name])
    }
  }

  return (
    <div className="filters">
      <div className="filters_block">


        {/* Фильтр по названию */}
        <button
          className={filterTitle === '' ? "filter" : "filter-active"}
          onClick={() => {
            clickOnFilter('По названию')
            if (filterTitle !== "") {
              setFilterText(filterTitle)
            } else {
              setFilterText('По названию')
            }
          }}
        >{filterText}</button>
        {
          filter === 'По названию' &&
          <div className="name_filter">
            <input
              className="name_filter-input"
              type="text"
              placeholder="Найти по нозванию"
              value={filterTitle}
              onChange={(e) => { setFilterTitle(e.target.value) }}
            />
          </div>
        }

        {/* Фильтр по автору */}
        <button
          className={filterAuthors.length !== 0 ? "filter-active" : "filter"}
          onClick={() => clickOnFilter('По автору')}
        >По автору</button>

        {filterAuthors.length !== 0 ? <div className="authore_filter-lenght">{filterAuthors.length}</div> : null}

        {
          filter === 'По автору' &&
          <div className="authore_filter">
            <ul className="authore_filter-list">
              {allUsers.map((user) => {
                return (
                  <li
                    className={filterAuthors.includes(user.name) ? "filter-li-a" : "filter-li"}
                    key={user.id}
                    onClick={() => { authorsFilterArr(user.name) }}
                  >{user.name}</li>
                )
              })}
            </ul>
          </div>
        }

        {/* Фильтр по лайкам */}
        <button
          className={filterLikes === "Все" ? "filter" : "filter-active"}
          onClick={() => { clickOnFilter('По избранному') }}
        >{filterLikes}</button>

        {
          filter === 'По избранному' &&
          <ul className="likes_filter">
            <li
              className={filterLikes === 'Все' ? "filter-li-a" : "filter-li"}
              onClick={() => selecеLikeFilter('Все')}
            >Все</li>
            <li
              className={filterLikes === 'С лайком' ? "filter-li-a" : "filter-li"}
              onClick={() => selecеLikeFilter('С лайком')}
            >С лайком</li>
            <li
              className={filterLikes === 'Без лайка' ? "filter-li-a" : "filter-li"}
              onClick={() => selecеLikeFilter('Без лайка')}
            >Без лайка</li>
          </ul>
        }
      </div>
      <div>

        {/* Сортировка */}
        <button
          className={filterSort === "Сначала первые" ? "filter sort_filter_button" : "filter-active sort_filter_button"}
          onClick={() => clickOnFilter('Сортировка')}
        >{filterSort}</button>
      </div>

      {
        filter === 'Сортировка' &&
        <div className="sort_filter">

          <ul className="sort_filter-list">
            {sortArray.map((sort) => {
              return (
                <li
                  className={filterSort === sort ? "filter-li-a" : "filter-li"}
                  key={sort.id}
                  onClick={() => {
                    {
                      setFilterSort(sort)
                      setFilter('')
                    }
                  }}
                >{sort}</li>
              )
            })}
          </ul>
        </div>
      }


    </div>
  )
}
export default Filters;