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


  useEffect(() => {
    setCheckList(getAllIngredients());
    setProductsList(getAllProducts());
  }, []);

  const callbacks = {
    setActiveModal: () => {
      setActiveModal(true)
    }
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
          /> : ''}
      </div>
      <div>
        <ListProduct filterList={filterList} />
      </div>
    </div>
  )
}

export default MainPage