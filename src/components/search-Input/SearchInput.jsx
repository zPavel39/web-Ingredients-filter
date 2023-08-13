import React from 'react'
import SearchImg from './../../assets/svg/search.svg';
import './SearchInput.scss'

const SearchInput = () => {
    return (
        <form className='searchInput'>
            <input
                className='searchInput__input'
                placeholder='Поиск по названию...'
                type='text'
            />
            <img className='searchInput__btn_img' src={SearchImg} />
        </form>
    )
}

export default SearchInput