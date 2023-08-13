import React, { useState } from 'react'
import ModalFilter from './../../components/modal-filter/ModalFilter';
import './MainPage.scss'

const MainPage = () => {

  const [activeModal, setActiveModal] = useState(false)

  const callbacks = {
    setActiveModal: () => {
      setActiveModal(true)
    }
  }

  return (
    <div className="mainPage">
      <div className='mainPage__container'>
        <button className='mainPage__button' onClick={callbacks.setActiveModal}>Фильтр</button>
        {activeModal ? <ModalFilter setActiveModal={setActiveModal}/> : ''}
      </div>
    </div>
  )
}

export default MainPage