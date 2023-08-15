import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../search-Input/SearchInput";
import ListCheckbox from "../list-checkbox/ListCheckbox";
import PriceSlider from "../price-slider/PriceSlider";
import "./ModalFilter.scss";

const ModalFilter = ({ ...props }) => {
  const [selectedCheck, setSelectedCheck] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchCheckList, setSearchCheckList] = useState([])


  useEffect(() => {
    if (searchInput.length > 1) {
      callback.searchFilter(searchInput)
    } else {
      setSearchCheckList([])
    }
  }, [searchInput]);

  const callback = {
    //Закрытие модального окна
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

    //Изменение Диапазона
    filterRange: (min, max) => {
      return props.setFilterList([...props.productsList.filter(i => i.price <= max && min <= i.price)])
    },

    //Сброс полей
    clearSelected: () => {
      setSelectedCheck([])
      setSearchInput('')
      props.setPriceRangeValue([props.minPrice, props.maxPrice])
      props.setFilterList([...props.productsList])
    },

    //Применить фильтрацию
    actionFilterSelected: () => {
      callback.filterRange(props.priceRangeValue[0], props.priceRangeValue[1])
      if (selectedCheck.length > 0) {
        props.setFilterList([...props.filterList.filter(i => i.ingredientInfo.find(i => selectedCheck.every(item => i.name.includes(item))))])
      } else {
        return 
        /* props.setFilterList([...props.productsList.filter(i => i.price <= priceRangeValue[1] && priceRangeValue[0] <= i.price)]) */
        /*  props.setFilterList([...props.productsList.filter(i => i.price <= props.priceRangeValue[1] && props.priceRangeValue[0] <= i.price)]) */
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
            setPriceRangeValue={props.setPriceRangeValue}
            priceRangeValue={props.priceRangeValue}
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
