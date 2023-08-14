import React, { useEffect, useState } from 'react'
import SearchInput from '../search-Input/SearchInput'
import ListCheckbox from '../list-checkbox/ListCheckbox'
import ListProduct from '../list-product/ListProduct'
import { getAllIngredients } from '../../api/ingredients'
import { getAllProducts } from '../../api/product'
import './ModalFilter.scss'



const ModalFilter = ({ ...props }) => {
    const [selectedCheck, setSelectedCheck] = useState([])
    const [checkList, setCheckList] = useState([])
    const [productsList, setProductsList] = useState([])
    const [filterList, setFilterList] = useState([])

    useEffect(() => {
        setCheckList(getAllIngredients())
        callback.filterListProducts()
        console.log('filterList', filterList)
    }, [])

    const callback = {
        setActiveModal: () => {
            props.setActiveModal(false)
        },
        filterListProducts: () => {
            setProductsList(getAllProducts())
            console.log('productsList', productsList)
            if (productsList.length > 0) {
                setFilterList(productsList)
            }
        }
    }
    console.log('selectedCheck', selectedCheck)
    return (
        <div className='modal' onClick={callback.setActiveModal}>
            <div className='modal__content' onClick={(e) => e.stopPropagation()}>
                <div className='modal__option'>
                    <h2 className='modal__option_title'>Ингредиенты</h2>
                    <SearchInput />
                    <ListCheckbox checkList={checkList} setSelectedCheck={setSelectedCheck} selectedCheck={selectedCheck} />
                </div>
                <div className='modal__list'>
                    <ListProduct filterList={productsList}/>
                </div>
                <button>Сбросить</button>
            </div>
        </div>
    )
}

export default ModalFilter