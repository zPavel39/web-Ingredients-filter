import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../search-Input/SearchInput";
import ListCheckbox from "../list-checkbox/ListCheckbox";

import "./ModalFilter.scss";

const ModalFilter = ({ ...props }) => {
  const [selectedCheck, setSelectedCheck] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchCheckList, setSearchCheckList] = useState([])


  useEffect(() => {
    if (searchInput.length > 1) {
      callback.searchFilter(searchInput)
    } else {
      props.setFilterList([...props.productsList])
      setSearchCheckList([])
    }
  }, [searchInput]);


  const callback = {
    //закрытие модалки
    setActiveModal: useCallback(() => {
      props.setActiveModal(false);
    }, [props.activeModal]),

    //Поиск по названию ингредиента
    searchFilter: useCallback((searchInput) => {
      if (searchInput.length > 1) {
        setSearchCheckList([...props.checkList.filter((i => i.name.includes(searchInput)))]);
      }
      else return
    }, [searchInput]),

    //Очистка селектов
    clearSelected: () => {
      setSelectedCheck([])
      setSearchInput('')
      return props.setFilterList([...props.productsList])
    },

    //Применить фильтрацию
    actionFilterSelected: () => {
      if (selectedCheck.length > 0) {
        props.setFilterList([...props.productsList.filter(i => i.ingredientInfo.find(i => selectedCheck.every(item => i.name.includes(item))))])
        console.log('1', 123)
      }
      if (selectedCheck.length === 0) {
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
            searchCheckList={searchCheckList}
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
