import React, { useEffect, useState } from "react";
import SearchInput from "../search-Input/SearchInput";
import ListCheckbox from "../list-checkbox/ListCheckbox";
import PriceSlider from "../price-slider/PriceSlider";
import "./ModalFilter.scss";

const ModalFilter = ({ ...props }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBlank, setSelectedBlank] = useState([])

  const [searchInputIngredient, setSearchInputIngredient] = useState("");
  const [searchInputBlank, setSearchInputBlank] = useState("");

  const [searchSelectedIngredients, setSearchSelectedIngredients] = useState([])
  const [searchSelectedBlank, setSearchSelectedBlank] = useState([])

  const [activeIngredients, setActiveIngredients] = useState(false)
  const [activeBlank, setActiveBlank] = useState(false)

  const [filterRangeProductsList, setFilterRangeProductsList] = useState([])
  const [filterIngredientsList, setFilterIngredientsList] = useState([])

  //Вызываем при изменении полей инпутов
  useEffect(() => {
    if (searchInputIngredient.length > 0) {
      callback.searchFilterIngredients(searchInputIngredient)
    }
  }, [searchInputIngredient]);

  useEffect(() => {
    if (searchInputBlank.length > 0) {
      callback.searchFilterBlank(searchInputBlank)
    }
  }, [searchInputBlank])

  //При выборе игредиентов и заготовок сначала фильтруем по ингредиентам 
  useEffect(() => {
    if (selectedBlank.length > 0) {
      props.setFilterList(callback.filterBlank(filterIngredientsList))
    }
  }, [filterIngredientsList])

  //при изменении диапазона цены фильтруем исходный массив продуктов
  useEffect(() => {
    callback.filterRange(props.priceRangeValue[0], props.priceRangeValue[1])
  }, [props.priceRangeValue])

  const callback = {
    //Закрытие модального окна
    setActiveModal: () => {
      props.setActiveModal(false);
    },

    //Поиск по названию ингредиента
    searchFilterIngredients: (searchInput) => {
      if (searchInputIngredient.length > 0) {
        setSearchSelectedIngredients([...props.ingredientsList.filter((i => i.name.toLowerCase().includes(searchInput)))]);
      }
      else return
    },
    //Поиск по названию заготовки
    searchFilterBlank: (searchInput) => {
      if (searchInputBlank.length > 0) {
        setSearchSelectedBlank([...props.blankList.filter((i => i.name.toLowerCase().includes(searchInput)))]);
      }
      else return
    },

    //Изменение Диапазона
    filterRange: (min, max) => {
      setFilterRangeProductsList([...props.productsList.filter(i => i.price <= max && min <= i.price)])
    },

    //Сброс полей
    clearSelected: () => {
      setSelectedBlank([])
      setSelectedIngredients([])
      setFilterRangeProductsList([])
      setSearchInputIngredient('')
      setSearchInputBlank('')
      props.setPriceRangeValue([props.minPrice, props.maxPrice])
      props.setFilterList([...props.productsList])
    },

    // Фильтр по ингредиентам
    filterIngredient: () => {
      // Исходный массив данных
      const data = filterRangeProductsList
      // Искомые ингредиенты
      const desiredIngredients = selectedIngredients;
      // Пустой массив для хранения индексов элементов, содержащих искомые ингредиенты
      let matchingIndices = [];
      if (matchingIndices.length > 0) {
        matchingIndices = []
      }
      // Проходимся по каждому элементу в исходном массиве
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const ingredientInfo = item.ingredientInfo || [];
        // Создаем массив ингредиентов для текущего ingredientInfo
        const ingredients = ingredientInfo.map(ingredient => ingredient.name);
        // Проверяем, содержатся ли все искомые ингредиенты в текущем ingredientInfo
        if (desiredIngredients.every(ingredient => ingredients.includes(ingredient))) {
          matchingIndices.push(data[i]);
        }
      }
      return matchingIndices
    },

    // Фильтр по загатовкам
    filterBlank: (list) => {
      // Исходный массив данных
      const data = list
      // Искомые ингредиенты
      const desiredIngredients = selectedBlank;
      // Пустой массив для хранения индексов элементов, содержащих искомые ингредиенты
      const selectBlankIndex = [];
      if (selectBlankIndex.length > 0) {
        selectBlankIndex = []
      }
      // Выводим индексы элементов, удовлетворяющих условию
      /* console.log("Индексы элементов, содержащих все искомые ингредиенты:", selectBlankIndex);
      console.log('desiredIngredients', selectedBlank) */
      // Проходимся по каждому элементу в исходном массиве
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const blankInfo = item.blankInfo || [];
        // Создаем массив ингредиентов для текущего ingredientInfo
        const blanks = blankInfo.map(blank => blank.name);
        // Проверяем, содержатся ли все искомые ингредиенты в текущем ingredientInfo
        if (desiredIngredients.every(blank => blanks.includes(blank))) {
          selectBlankIndex.push(data[i]);
        }
      }
      return selectBlankIndex
    },

    //Применить фильтрацию
    actionFilterSelected: () => {
      if (selectedIngredients.length > 0 && selectedBlank.length === 0) {
        props.setFilterList(callback.filterIngredient())
      }
      if (selectedIngredients.length === 0 && selectedBlank.length > 0) {
        props.setFilterList(callback.filterBlank(filterRangeProductsList))
      }
      if (selectedIngredients.length > 0 && selectedBlank.length > 0) {
        setFilterIngredientsList(callback.filterIngredient())
      }
      if (selectedIngredients.length === 0 && selectedBlank.length === 0) {
        props.setFilterList([...filterRangeProductsList])
      }
    },

    //Открытие/закрытие списка
    actionToggle: (setCategory, category) => {
      setCategory(!category)
    },
  };
  /* console.log('Check', selectedCheck) */
  return (
    <div className="modal">
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__option">
          <div className="modal__header">
            <h2 className="modal__header_title">Фильтр</h2>
            <button className="modal__header_btn" onClick={callback.setActiveModal}>
              Закрыть
            </button>
          </div>
          <div className="modal__header">
            <button className="modal__header_btn" onClick={() => setActiveIngredients(!activeIngredients)}>
              Ингредиенты
            </button>
            <button className="modal__header_btn" onClick={() => setActiveBlank(!activeBlank)}>
              Заготовки
            </button>
          </div>
          <div className="modal__checkBlock">
            {activeIngredients ?
              <div className="modal__filter">
                <SearchInput
                  searchInput={searchInputIngredient}
                  setSearchInput={setSearchInputIngredient}
                />
                <ListCheckbox
                  selectedList={props.ingredientsList}
                  setSelectedCheck={setSelectedIngredients}
                  selectedCheck={selectedIngredients}
                  searchSelectedList={searchSelectedIngredients}
                  searchInput={searchInputIngredient}
                />
              </div>
              :
              ''}
            {activeBlank ?
              <div className="modal__filter">
                <SearchInput
                  searchInput={searchInputBlank}
                  setSearchInput={setSearchInputBlank}
                />
                <ListCheckbox
                  selectedList={props.blankList}
                  setSelectedCheck={setSelectedBlank}
                  selectedCheck={selectedBlank}
                  searchSelectedList={searchSelectedBlank}
                  searchInput={searchInputBlank}
                />
              </div>
              :
              ''}
          </div>
          {props.withPrice &&
            <PriceSlider
              minPrice={props.minPrice}
              maxPrice={props.maxPrice}
              setMinPrice={props.setMinPrice}
              setMaxPrice={props.setMaxPrice}
              setPriceRangeValue={props.setPriceRangeValue}
              priceRangeValue={props.priceRangeValue}
              clearSelected={callback.clearSelected}
            />
          }
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
