import React from "react";
import "./ListProduct.scss";

const ListProduct = ({ ...props }) => {

  return (
    <ul className="listProduct">
      {props.filterList.length === 0 ? 
      <div>
        <h2>Ничего не найдено</h2>
      </div>
      :
      props.filterList.map((i) => {
        return (
          <li className="listProduct__item" key={i.id}>
            <span className="listProduct__item_name">{i.productIsName}</span>
            <p className="listProduct__item_descr">{i.longDescription}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ListProduct;
