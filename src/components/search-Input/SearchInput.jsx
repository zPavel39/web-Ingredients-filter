import React, {useState} from 'react'
import SearchImg from './../../assets/svg/search.svg';
import './SearchInput.scss'

const SearchInput = () => {

    const [searchInput, setSearchInput] = useState('')

    return (
        <form className='searchInput'>
            <input
                className='searchInput__input'
                value={searchInput}
                placeholder='Поиск по названию...'
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
            />
            <img className='searchInput__btn_img' src={SearchImg} />
        </form>
    )
}

export default SearchInput