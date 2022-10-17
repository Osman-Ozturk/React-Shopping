import React, { useReducer, useEffect } from "react";
import itemsArray from "./meinDatei.json";
import Einkaufswagen from "./Einkaufswagen";
import "./ProdukList.scss";
import Produkt from "./Produkt";
const initialState = {
  shop: itemsArray,
  einkaufswagen: [],
  total: 0,
};
const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "addHandler": {
      const newShop = state.shop.map((element) => {
        if (element.id === action.item.id) {
          return { ...element, inventory: element.inventory - 1 };
        }
        return element;
      });

      const newTotal = state.total + action.item.price;
      let newEinkauf;
      if (state.einkaufswagen.find((obj) => obj.id === action.item.id)) {
        newEinkauf = state.einkaufswagen.map((element) => {
          if (element.id === action.item.id) {
            return { ...element, inventory: element.inventory + 1 };
          }
          return element;
        });
      } else {
        newEinkauf = [...state.einkaufswagen, { ...action.item, inventory: 1 }];
      }
      return { shop: newShop, einkaufswagen: newEinkauf, total: newTotal };
    }
    case "removeOneHandler": {
      let newEinkauf;
      console.log(action.item);
      if (action.item.inventory > 1) {
        newEinkauf = state.einkaufswagen.map((element) => {
          if (element.id === action.item.id) {
            return { ...element, inventory: element.inventory - 1 };
          }
          return element;
        });
      } else {
        const index = state.einkaufswagen.indexOf(action.item);
        const newWagen = state.einkaufswagen
          .slice(0, index)
          .concat(state.einkaufswagen.slice(index + 1));
        newEinkauf = newWagen;
      }
      const newShop = state.shop.map((element) => {
        if (element.id === action.item.id) {
          return { ...element, inventory: element.inventory + 1 };
        }
        return element;
      });
      const newTotal = +state.total - action.item.price;

      return { shop: newShop, einkaufswagen: newEinkauf, total: newTotal };
    }
    case "removeAllHandler": {
      const index = state.einkaufswagen.indexOf(action.item);
      const newWagen = state.einkaufswagen
        .slice(0, index)
        .concat(state.einkaufswagen.slice(index + 1));
      const newShop = state.shop.map((element) => {
        if (element.id === action.item.id) {
          return {
            ...element,
            inventory: element.inventory + action.item.inventory,
          };
        }
        return element;
      });
      const newTotal = +state.total - action.item.price * action.item.inventory;
      return { shop: newShop, einkaufswagen: newWagen, total: newTotal };
    }
    case "checkOutHandler": {
      localStorage.setItem("shop", JSON.stringify(state.shop));
      const newEinkauf = [];
      const newTotal = 0;
      return { ...state, einkaufswagen: newEinkauf, total: newTotal };
    }
  }
  throw new Error(`Unbekannte action type: ${action.type}`);
};
function ProdukList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addHandler = (item) => {
    dispatch({ type: "addHandler", item });
  };
  const removeOneHandler = (item) => {
    dispatch({ type: "removeOneHandler", item });
  };
  const checkOutHandler = () => {
    dispatch({ type: "checkOutHandler" });
  };
  const removeAllHandler = (item) => {
    dispatch({ type: "removeAllHandler", item });
  };
  return (
    <div>
      <ul>
        {state.shop.map((item, i) => {
          return <Produkt item={item} addHandler={addHandler} />;
        })}
      </ul>
      <Einkaufswagen
        removeOneHandler={removeOneHandler}
        removeAllHandler={removeAllHandler}
        einkaufswagen={state.einkaufswagen}
        checkOutHandler={checkOutHandler}
        total={state.total}
        shop={state.shop}
      />
    </div>
  );
}

export default ProdukList;
