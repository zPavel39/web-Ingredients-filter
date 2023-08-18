import React, { useState, useEffect } from 'react'
import ModalFilter from './../../components/modal-filter/ModalFilter';
import ListProduct from '../../components/list-product/ListProduct';
import { getAllIngredients } from '../../api/ingredients';
import { getAllProducts } from '../../api/product';
import './MainPage.scss'
import { getAllBlank } from '../../api/blank';


const MainPage = () => {
  const [activeModal, setActiveModal] = useState(false)
  const [filterList, setFilterList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [blankList, setBlankList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [priceRangeValue, setPriceRangeValue] = useState([0, 0])

  useEffect(() => {
    setIngredientsList(getAllIngredients());
    setProductsList(getAllProducts());
    setBlankList(getAllBlank());
  }, []);

  useEffect(() => {
    if (productsList.length > 0) {
      callbacks.getPriceRange()
      setFilterList([...productsList])
    } else return
  }, [productsList]);

  const callbacks = {
    //Открытие модального окна
    setActiveModal: () => {
      setActiveModal(true)
      setFilterList([...productsList])
      callbacks.getPriceRange()
    },

    //Получение Мин, Макс занчения цены товаров
    getPriceRange: () => {
      let productListSort = productsList
      setMinPrice(productListSort.sort((a, b) => a.price - b.price)[0].price)
      setMaxPrice(productListSort.sort((a, b) => b.price - a.price)[0].price)
      setPriceRangeValue([minPrice, maxPrice])
    },
  }
  return (
    <div className="mainPage">
      <div className='mainPage__container'>
        <button className='mainPage__button' onClick={callbacks.setActiveModal}>Фильтр</button>
        {activeModal ?
          <ModalFilter
            withPrice={true}
            setActiveModal={setActiveModal}
            setFilterList={setFilterList}
            setIngredientsList={setIngredientsList}
            filterList={filterList}
            productsList={productsList}
            ingredientsList={ingredientsList}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            getPriceRange={callbacks.getPriceRange}
            priceRangeValue={priceRangeValue}
            setPriceRangeValue={setPriceRangeValue}
            blankList={blankList}
          /> : ''}
        <div>
          <ListProduct filterList={filterList} />
        </div>
      </div>
    </div>
  )
}

export default MainPage