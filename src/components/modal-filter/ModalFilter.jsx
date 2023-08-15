import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../search-Input/SearchInput";
import ListCheckbox from "../list-checkbox/ListCheckbox";

import "./ModalFilter.scss";
import PriceSlider from "../price-slider/PriceSlider";

const ModalFilter = ({ ...props }) => {
  const [selectedCheck, setSelectedCheck] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchCheckList, setSearchCheckList] = useState([])
  const [priceRangeValue, setPriceRangeValue] = useState([props.minPrice, props.maxPrice])


  useEffect(() => {
    if (searchInput.length > 1) {
      callback.searchFilter(searchInput)
    } else {
      setSearchCheckList([])
      /* callback.rangePriceFilter(props.minPrice, props.maxPrice) */
    }
  }, [searchInput]);


  const callback = {
    //Закрытие модалки
    setActiveModal: () => {
      props.setActiveModal(false);
    },

    //Поиск по названию ингредиента
    searchFilter: (searchInput) => {
      if (searchInput.length > 1) {
        setSearchCheckList([...props.checkList.filter((i => i.name.includes(searchInput)))]);
      }
      else return
    },
    //Фильтр Диапазона
    //Очистка селектов
    clearSelected: () => {
      setSelectedCheck([])
      setSearchInput('')
      setPriceRangeValue([props.minPrice, props.maxPrice])
      props.setFilterList([...props.productsList])
      console.log('sss', priceRangeValue)
    },

    //Применить фильтрацию
    actionFilterSelected: () => {
      props.getPriceRange()
      console.log('priceRangeValue', priceRangeValue)
      props.setFilterList([...props.filterList.filter(i => i.ingredientInfo.find(i => selectedCheck.every(item => i.name.includes(item))))])
      console.log(props.filterList);
      if (selectedCheck.length > 0) {
        console.log(props.filterList);
        props.setFilterList([...props.productsList.filter(i => i.price <= priceRangeValue[1] && priceRangeValue[0] <= i.price)])g
        console.log(props.filterList);
      } else {
        /* props.setFilterList([...props.productsList.filter(i => i.price <= priceRangeValue[1] && priceRangeValue[0] <= i.price)]) */
        props.setFilterList([])
      }
    },
  };

  return (
    <div className="modal" onClick={callback.setActiveModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__option">
          <div className="modal__header">
            <h2 className="modal__header_title">Ингредиенты</h2>
            <button className="modal__header_btn" onClick={callback.setActiveModal}>
              Закрыть
            </button>
          </div>
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <ListCheckbox
            checkList={props.checkList}
            setSelectedCheck={setSelectedCheck}
            selectedCheck={selectedCheck}
            searchCheckList={searchCheckList}
            filterList={props.filterList}
          />
          <PriceSlider
            minPrice={props.minPrice}
            maxPrice={props.maxPrice}
            setMinPrice={props.setMinPrice}
            setMaxPrice={props.setMaxPrice}
            setPriceRangeValue={setPriceRangeValue}
            priceRangeValue={priceRangeValue}
            clearSelected={callback.clearSelected}
          />
          <div className="modal__action">
            <button onClick={callback.actionFilterSelected} className="modal__action_btn">Принять</button>
            <button onClick={callback.clearSelected} className="modal__action_btn">Сбросить</button>
          </div>
        </div>
        <div className="modal__list">
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
