const ingredientsDB = [
  {
    id: 3,
    proteins: "5",
    idPoS: 0,
    fats: "4",
    carbohydrates: "7",
    calories: "84",
    weight: "0",
    name: "ингредиент в кг",
    archive: false,
    idBlank: 0,
    idProduct: 0,
    idWarehouses: 0,
    unit: {
      id: 1,
      name: "кг",
    },
    cli: 1,
  },
  {
    id: 4,
    proteins: "1",
    idPoS: 0,
    fats: "1",
    carbohydrates: "1",
    calories: "",
    weight: "0",
    name: "ингредиент в литрах",
    archive: false,
    idBlank: 0,
    idProduct: 0,
    idWarehouses: 0,
    unit: {
      id: 3,
      name: "л",
    },
    cli: 1,
  },
  {
    id: 5,
    proteins: "1",
    idPoS: 0,
    fats: "1",
    carbohydrates: "1",
    calories: "",
    weight: "0",
    name: "ингредиент в в шт",
    archive: false,
    idBlank: 0,
    idProduct: 0,
    idWarehouses: 0,
    unit: {
      id: 2,
      name: "шт",
    },
    cli: 1,
  },
  {
    id: 55,
    proteins: "3",
    idPoS: 0,
    fats: "3",
    carbohydrates: "5",
    calories: "",
    weight: "0",
    name: "кунжут mn",
    archive: false,
    idBlank: 0,
    idProduct: 0,
    idWarehouses: 0,
    unit: {
      id: 1,
      name: "кг",
    },
    cli: 1,
  },
  {
    id: 56,
    proteins: "1",
    idPoS: 0,
    fats: "1",
    carbohydrates: "1",
    calories: "17",
    weight: "0",
    name: "теству",
    archive: false,
    idBlank: 0,
    idProduct: 0,
    idWarehouses: 0,
    unit: {
      id: 1,
      name: "кг",
    },
    cli: 1,
  },
];

export const getAllIngredients = () => ingredientsDB;
