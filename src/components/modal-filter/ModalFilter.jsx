import React, { useEffect, useState } from "react";
import SearchInput from "../search-Input/SearchInput";
import ListCheckbox from "../list-checkbox/ListCheckbox";
import PriceSlider from "../price-slider/PriceSlider";
import "./ModalFilter.scss";

const ModalFilter = ({ ...props }) => {
  const [selectedCheck, setSelectedCheck] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchCheckList, setSearchCheckList] = useState([])
  const [filterRangeProductsList, setFilterRangeProductsList] = useState([])

  useEffect(() => {
    if (searchInput.length > 1) {
      callback.searchFilter(searchInput)
    } else {
      setSearchCheckList([])
    }
  }, [searchInput]);

  useEffect(() => {
    callback.filterRange(props.priceRangeValue[0], props.priceRangeValue[1])
  }, [props.priceRangeValue])


  const callback = {
    //Закрытие модального окна
    setActiveModal: () => {
      props.setActiveModal(false);
    },

    //Поиск по названию ингредиента
    searchFilter: (searchInput) => {
      if (searchInput.length > 1) {
        setSearchCheckList([...props.ingredientsList.filter((i => i.name.includes(searchInput)))]);
      }
      else return
    },

    //Изменение Диапазона
    filterRange: (min, max) => {
      setFilterRangeProductsList([...props.productsList.filter(i => i.price <= max && min <= i.price)])
    },

    //Сброс полей
    clearSelected: () => {
      setSelectedCheck([])
      setFilterRangeProductsList([])
      setSearchInput('')
      props.setPriceRangeValue([props.minPrice, props.maxPrice])
      props.setFilterList([...props.productsList])
    },

    //Применить фильтрацию
    actionFilterSelected: () => {
      props.setFilterList([...filterRangeProductsList.filter(i => i.ingredientInfo.find(i => selectedCheck.every(item => i.name.includes(item))))])
      if (selectedCheck.length > 0) {
        props.setFilterList([...filterRangeProductsList.filter(i => i.ingredientInfo.find(i => selectedCheck.every(item => i.name.includes(item))))])
      } else {
        return callback.filterRange(props.priceRangeValue[0], props.priceRangeValue[1])
      }
    },
  };

  return (
    <div className="modal">
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
            ingredientsList={props.ingredientsList}
            setSelectedCheck={setSelectedCheck}
            selectedCheck={selectedCheck}
            searchCheckList={searchCheckList}
            filterList={props.filterList}
            searchInput={searchInput}
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
