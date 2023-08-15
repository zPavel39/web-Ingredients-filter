import React, { useState, useEffect } from 'react'
import ModalFilter from './../../components/modal-filter/ModalFilter';
import ListProduct from '../../components/list-product/ListProduct';
import { getAllIngredients } from '../../api/ingredients';
import { getAllProducts } from '../../api/product';
import './MainPage.scss'


const MainPage = () => {
  const [activeModal, setActiveModal] = useState(false)
  const [filterList, setFilterList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)



  useEffect(() => {
    setCheckList(getAllIngredients());
    setProductsList(getAllProducts());
  }, []);

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
      console.log('mi', minPrice)
      console.log('max', maxPrice)
    },
  }

  return (
    <div className="mainPage">
      <div className='mainPage__container'>
        <button className='mainPage__button' onClick={callbacks.setActiveModal}>Фильтр</button>
        {activeModal ?
          <ModalFilter
            setActiveModal={setActiveModal}
            setFilterList={setFilterList}
            setCheckList={setCheckList}
            filterList={filterList}
            productsList={productsList}
            checkList={checkList}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            getPriceRange={callbacks.getPriceRange}
          /> : ''}
      </div>
      <div>
        <ListProduct filterList={filterList} />
      </div>
    </div>
  )
}

export default MainPage