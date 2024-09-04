"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Single = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id);
    if (id) {
      const fetchCoin = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}`
          );
          if (!response.ok) {
            throw new Error(
              `Error fetching the coin data: ${response.statusText}`
            );
          }
          const data = await response.json();
          setCoin(data);
        } catch (error) {
          console.error("Error fetching the coin:", error);
          setError(error.message);
        }
      };

      fetchCoin();
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>; // Display the specific error message
  }

  if (!coin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Single">
      <div className="container">
        <div className="single">
          <img src={coin.image.small} alt={coin.name} className="single-img" />
          <div className="single-info">
            <h1>{coin.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
            <div className="single-price">
              <span>
                ${coin.market_data.current_price.usd.toFixed(2)}
                <small> USD</small>
              </span>
              <span>
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                <small> (24h)</small>
              </span>
            </div>
            <div className="single-actions"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
