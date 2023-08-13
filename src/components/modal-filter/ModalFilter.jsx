import React, { useEffect, useState } from 'react'
import SearchInput from '../search-Input/SearchInput'
import ListCheckbox from '../list-checkbox/ListCheckbox'
import ListProduct from '../list-product/ListProduct'
import { getAllIngredients } from '../../api/ingredients'
import './ModalFilter.scss'


const ModalFilter = ({ ...props }) => {
    const [selectedCheck, setSelectedCheck] = useState([])
    const [checkList, setCheckList] = useState([])

    useEffect(() => {
        setCheckList(getAllIngredients())
    }, [])

    const callback = {
        setActiveModal: () => {
            props.setActiveModal(false)
        }
    }
    return (
        <div className='modal' onClick={callback.setActiveModal}>
            <div className='modal__content' onClick={(e) => e.stopPropagation()}>
                <div className='modal__option'>
                    <h2 className='modal__option_title'>Ингредиенты</h2>
                    <SearchInput />
                    <ListCheckbox checkList={checkList} setSelectedCheck={setSelectedCheck} selectedCheck={selectedCheck} />
                </div>
                <div className='modal__list'>
                    <ListProduct />
                </div>
                <button>Сбросить</button>
            </div>
        </div>
    )
}

export default ModalFilter