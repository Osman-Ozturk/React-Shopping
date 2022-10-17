import "./Produkt.scss";

function Produkt({ item, addHandler }) {
        
  return (
    <div className="Produkt">
      <img  src={item.src} />
      <h3>{item.title}</h3>
      <div className="cardBody">
        <p>
          {"Stock: " + item.inventory} <br></br>
          {"Price: " + item.price + " $"}
        </p>
      </div>
      <div className="button">
      {item.inventory === 0 ? (
        <button disabled={true}>Sold Out</button>
      ) : (
        <button onClick={() => addHandler(item)}>Add to cart</button>
      )}

      </div>

    </div>
  );
}

export default Produkt;
