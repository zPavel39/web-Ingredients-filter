import React, { useEffect, useState } from "react";
import SearchInput from "../search-Input/SearchInput";
import ListCheckbox from "../list-checkbox/ListCheckbox";
import PriceSlider from "../price-slider/PriceSlider";
import "./ModalFilter.scss";

const ModalFilter = ({ ...props }) => {
  const [selectedCheck, setSelectedCheck] = useState([]);
  const [selectedBlank, setSelectedBlank] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [searchCheckList, setSearchCheckList] = useState([])
  const [filterRangeProductsList, setFilterRangeProductsList] = useState([])
  const [activeIngredients, setActiveIngredients] = useState(false)
  const [activeBlank, setActiveBlank] = useState(false)
  const [filterIngredientsList, setFilterIngredientsList] = useState([])

  useEffect(() => {
    if (searchInput.length > 1) {
      callback.searchFilter(searchInput)
    } else {
      setSearchCheckList([])
    }
  }, [searchInput]);

  useEffect(() => {
    if (selectedBlank.length > 0) {
      props.setFilterList(callback.filterBlank(filterIngredientsList))
    }
  }, [filterIngredientsList])

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
      if (searchInput.length > 0) {
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
      setSelectedBlank([])
      setSelectedCheck([])
      setFilterRangeProductsList([])
      setSearchInput('')
      props.setPriceRangeValue([props.minPrice, props.maxPrice])
      props.setFilterList([...props.productsList])
    },

    // Фильтр по ингредиентам
    filterIngredient: () => {
      // Исходный массив данных
      const data = filterRangeProductsList
      // Искомые ингредиенты
      const desiredIngredients = selectedCheck;
      console.log('ingre', desiredIngredients)

      // Пустой массив для хранения индексов элементов, содержащих искомые ингредиенты
      let matchingIndices = [];
      if (matchingIndices.length > 0) {
        matchingIndices = []
      }
      /* console.log('desiredIngredients', selectedCheck) */
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
      /* props.setFilterList([...matchingIndices])
      console.log('filterlisst1', props.filterList) */
    },

    // Фильтр по загатовкам
    filterBlank: (list) => {
      // Исходный массив данных
      const data = list
      // Искомые ингредиенты
      const desiredIngredients = selectedBlank;
      console.log('blank', desiredIngredients)
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
      if (selectedCheck.length > 0 && selectedBlank.length == 0) {
        props.setFilterList(callback.filterIngredient())
      }
      if (selectedCheck.length == 0 && selectedBlank.length > 0) {
        props.setFilterList(callback.filterBlank(filterRangeProductsList))
      }
      if (selectedCheck.length > 0 && selectedBlank.length > 0) {
        setFilterIngredientsList(callback.filterIngredient())
        console.log('FilterIngredientsList', filterIngredientsList)
        /* function firstFunction() {
          return new Promise(function (resolve, reject) {
            props.setFilterList(callback.filterIngredient)
            console.log('1', props.filterList)
            resolve(); // Вызовите resolve() после завершения операций в первой функции
          });
        }

        function secondFunction() {
          props.setFilterList(callback.filterBlank(props.filterList))
          console.log('2', props.filterList)
        }

        firstFunction().then(function () {
          secondFunction();
        }); */
        /* const first = (callbacks) => {
          callback.filterIngredient()
          callbacks()
        }
        first(function () {
          callback.filterBlank(filterRangeProductsList)
        }) */
      }
      else {
        return
      }

      /* if (selectedCheck.length > 0 && selectedBlank.length > 0) {
        callback.actionAllFilter(callback.filterIngredient(), callback.filterBlank(props.filterList))
        callback.filterIngredient()
        callback.filterBlank(props.filterList)
      } */
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
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
                <ListCheckbox
                  ingredientsList={props.ingredientsList}
                  setSelectedCheck={setSelectedCheck}
                  selectedCheck={selectedCheck}
                  searchCheckList={searchCheckList}
                  searchInput={searchInput}
                />
              </div>
              :
              ''}
            {activeBlank ?
              <div className="modal__filter">
                <SearchInput
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
                <ListCheckbox
                  ingredientsList={props.blankList}
                  setSelectedCheck={setSelectedBlank}
                  selectedCheck={selectedBlank}
                  searchCheckList={searchCheckList}
                  searchInput={searchInput}
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
