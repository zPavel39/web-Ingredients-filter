import React from "react";
import "./ListProduct.scss";

const ListProduct = ({ ...props }) => {

  return (
    <ul className="listProduct">
      {props.filterList.map((i) => {
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
