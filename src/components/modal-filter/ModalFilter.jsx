import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../search-Input/SearchInput";
import ListCheckbox from "../list-checkbox/ListCheckbox";

import "./ModalFilter.scss";

const ModalFilter = ({ ...props }) => {
  const [selectedCheck, setSelectedCheck] = useState([]);
  const [searchInput, setSearchInput] = useState("");



  useEffect(() => {
    if (searchInput.length > 0) {
      callback.searchFilter(searchInput)
    } else {
      props.setFilterList([...props.productsList])
    }
  }, [searchInput]);


  const callback = {
    //закрытие модалки
    setActiveModal: useCallback(() => {
      props.setActiveModal(false);
    }, [props.activeModal]),

    //Поиск по названию
    searchFilter: useCallback((searchInput) => {
      if (searchInput.length == 0) {
        props.setCheckList(props.checkList);
      }
      else {
        props.setCheckList(props.checkList.filter(i => i == i.includes(searchInput)));
      }
      console.log('sd1', searchInput)
    }, [searchInput]),

    //Очистка селектов
    clearSelected: () => {
      setSelectedCheck([])
      return props.setFilterList([...props.productsList])
    },

    //Применить фильтрацию
    actionFilterSelected: () => {
      if (selectedCheck.length > 0) {
        props.setFilterList([...props.productsList.filter(i => i.ingredientInfo.find(i => selectedCheck.every(item => i.name.includes(item))))])
        console.log('1', 123)
      }
      if (selectedCheck.length == 0) {
        return
      }
    },
  };

  return (
    <div className="modal" onClick={callback.setActiveModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__option">
          <h2 className="modal__option_title">Ингредиенты</h2>
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <ListCheckbox
            checkList={props.checkList}
            setSelectedCheck={setSelectedCheck}
            selectedCheck={selectedCheck}
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
