import React, { useState } from "react";
import "./Einkaufswagen.scss";
import Modal from "./Modal"

function Einkaufswagen({
  removeAllHandler,
  removeOneHandler,
  einkaufswagen,
  total,
  checkOutHandler,
}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <div className="Einkaufs">
      <h1>Einkaufswagen</h1>
      <div className="einkaufswagen">
        {einkaufswagen.map((element) => {
          return (
            <div className="wagen">
              <div className="produkt">
                <img src={element.src} />
                <h3>{element.title}</h3>
                <div className="cardBody">
                  <p>
                    {"Stock: " + element.inventory} <br></br>
                    {"Price: " + element.price + " $"}
                  </p>
                </div>
              </div>

              <div className="buttons">
                <button onClick={() => removeOneHandler(element)}>
                  Remove one
                </button>
                <button onClick={() => removeAllHandler(element)}>
                  Remove All
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="total">Total : $ {total.toFixed(2)}</div>
      <div className="checkOut">
        <button onClick={checkOutHandler}>Checkout</button>
      </div>

    </div>
  );
}

export default Einkaufswagen;
