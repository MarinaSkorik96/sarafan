import React, { useEffect, useState } from "react";
import './FiltersStyles.css'
import { useDispatch, useSelector } from "react-redux";
import { getFilter } from "../../store/slices/posts";

const Filters = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState("")
  const [filterTitle, setFilterTitle] = useState("")
  const [filterText, setFilterText] = useState("По названию")
  const [filterLikes, setFilterLikes] = useState("Все")
  const [filterSort, setFilterSort] = useState("Сначала первые")
  const [filterAuthorsArr, setFilterAuthorsArr] = useState([])
  const sortArray = ['Сначала первые', 'Сначала последние', 'По имени автора A-Z', 'По имени автора Z-A', 'По названию A-Z', 'По названию Z-A', 'Избранные сначала', 'Избранные в конце']

  const { allUsers } = useSelector(state => state.posts)

  // console.log(filter)
  useEffect(() => {
    dispatch(getFilter({ filterTitle, filterAuthorsArr, filterLikes, filterSort }))
  }, [filterTitle, filterAuthorsArr, filterLikes, filterSort])

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
    if (filterAuthorsArr.includes(name)) {
      setFilterAuthorsArr(filterAuthorsArr.filter((filter) => filter !== name))
    } else {
      setFilterAuthorsArr([...filterAuthorsArr, name])
    }
  }

  return (
    <div className="filters">

      <div className="filters_block">
        <p className="filters_title">Фильтры:</p>

        {/* Фильтр по названию */}
        <div className="filter_block">
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
          >{filterText}
          </button>
          {filter === 'По названию' &&
            <div className="name_filter">
              <input
                className="name_filter-input"
                type="text"
                placeholder="Найти по нозванию"
                value={filterTitle}
                onChange={(e) => {
                  setFilterTitle(e.target.value)
                  console.log(filterTitle)
                }}
              />
            </div>}
        </div>

        {/* Фильтр по автору */}
        <div className="filter_block">
          <button
            className={filterAuthorsArr.length !== 0 ? "filter-active" : "filter"}
            onClick={() => clickOnFilter('По автору')}
          >По автору
          </button>

          {filterAuthorsArr.length !== 0 ? <div className="authore_filter-lenght">{filterAuthorsArr.length}</div> : null}

          {filter === 'По автору' &&
            <div className="authore_filter">
              <ul className="authore_filter-list">
                {allUsers.map((user) => {
                  return (
                    <li
                      className={filterAuthorsArr.includes(user.id) ? "filter-li-a" : "filter-li"}
                      key={user.id}
                      onClick={() => { authorsFilterArr(user.id) }}
                    >{user.name}</li>
                  )
                })}
              </ul>
            </div>}
        </div>

        {/* Фильтр по лайкам */}
        <button
          className={filterLikes === "Все" ? "filter filter-small" : "filter-active filter-small"}
          onClick={() => { clickOnFilter('По избранному') }}
        >{filterLikes}

          {filter === 'По избранному' &&
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
            </ul>}
        </button>
      </div>

      {/* Сортировка */}
      <div className="sort_block">
        <p className="filters_title">Сортировка:</p>
        <button
          className={filterSort === "Сначала первые" ? "filter sort_filter_button" : "filter-active sort_filter_button"}
          onClick={() => clickOnFilter('Сортировка')}
        >{filterSort}

          {filter === 'Сортировка' &&
            <div className="sort_filter">

              <ul className="sort_filter-list">
                {sortArray.map((sort) => {
                  return (
                    <li
                      className={filterSort === sort ? "filter-li-a" : "filter-li"}
                      key={sort}
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
            </div>}
        </button>
      </div>



    </div>
  )
}
export default Filters;