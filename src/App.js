import { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import "./App.css";

function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    const inputHandler = (event) => {
        setSearch(event.target.value);
    };

    const filterCoins = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(search.toLowerCase());
    });

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
            )
            .then((response) => {
                setCoins(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="coinApp">
            <div className="coinSearch">
                <h1 className="coinTitle">Search a Crypto Currency</h1>
                <form>
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search"
                        onChange={inputHandler}
                    />
                </form>
            </div>
            <div className="coinTable">
                <div className="tableTitle">
                    <p className="titleName">NAME</p>
                    <p className="titleSymbol">SYMBOL</p>
                    <p className="titlePrice">PRICE</p>
                    <p className="titleVolume">TOTAL VOLUME</p>
                    <p className="titleChange">CHANGE/24H</p>
                    <p className="titleMarket">MARKET CAP</p>
                </div>
                {filterCoins.map((coin) => {
                    return (
                        <Coin
                            key={coin.id}
                            name={coin.name}
                            image={coin.image}
                            symbol={coin.symbol}
                            volume={coin.total_volume}
                            price={coin.current_price}
                            priceChange={coin.price_change_percentage_24h}
                            marketCap={coin.market_cap}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
