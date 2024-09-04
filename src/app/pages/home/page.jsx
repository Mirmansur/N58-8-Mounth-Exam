"use client";
import { useState, useEffect } from "react";
import Carusel from "../carusel/page";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=${itemsPerPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
        setTotalPages(Math.ceil(result.length / itemsPerPage));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="All bg-slate-900 h-full w-full">
      <div
        className="Home bg-[url('https://s3-alpha-sig.figma.com/img/caf5/016f/97f154adfd88d0e48d9a7fc87e5ab035?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kg4PMGrJSCVdN5EBvKIHjtCPRoi-0nXmqBnTlNqtEiFlDIAW16Fwp7n8V1S8svJ0RTd9x49QpfVKpkqSmtYvv~GjIubdF9niiT3HARsyFoZkoTQ08G-m9uLcxrCv5yB7JBaSIelBTSag0nygPKP9g6zIEN4Vm3hljsww5cVWw0lap592eTt10GeEB~f1tz2AuF8GM2~9lbuf4~9dSFnfncs8-cSuVYlqD9m841fVUetMCNiRMu~RCIIFl-dulJUzzeU401ROQPkZFTWFbc4T9EO0AAGbtTuTma3c7DAGymsVexGhU9rRtXbzGQOpKDlPN7TEKnwwUk3iLAGvueY8EQ__')]
        w-[100%] object-cover bg-cover bg-no-repeat bg-center flex items-center justify-center relative pt-20"
      >
        <div className="container mx-auto">
          <div className="home">
            <div className="home-one p-10 flex flex-col items-center justify-center font-sans">
              <h1 className="text-cyan-600 text-4xl font-semibold">
                CRYPTOFOLIO WATCH LIST
              </h1>
              <p className="font-sans font-medium text-gray-600 text-sm">
                Get all the Info regarding your favorite Crypto Currency
              </p>
            </div>
            <div className="home-two">
              <Carusel />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center p-3 gap-10">
          <h1 className="text-white font-sans font-normal text-2xl pb-6">
            Cryptocurrency Prices by Market Cap
          </h1>
          <input
            type="text"
            placeholder="Search..."
            className="p-3 outline-none w-[800px] rounded-md bg-slate-900 border border-white text-white"
            onChange={(e) => setSearch(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          {!error && data.length > 0 && (
            <>
              <table className="w-[800px] text-left text-white border-collapse">
                <thead>
                  <tr className="bg-cyan-600 text-black">
                    <th className="py-2 px-4">Coin</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">24h Change</th>
                    <th className="py-2 px-4">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((coin) => {
                      return search.toLowerCase() === ""
                        ? coin
                        : coin.name.toLowerCase().includes(search);
                    })
                    .map((coin) => (
                      <tr
                        key={coin.id}
                        className="border-b border-gray-700 last:border-0 "
                      >
                        <div className="flex items-center">
                          <Link href={`/single/${coin.id}`}>
                            <td className="py-4 px-4 flex items-center">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                width="24"
                                height="24"
                                className="mr-2"
                              />
                              <div>
                                <p className="font-bold">
                                  {coin.symbol.toUpperCase()}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {coin.name}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              ₹{coin.current_price.toLocaleString()}
                            </td>
                            <td
                              className={`py-4 px-4 flex items-center cursor-pointer${
                                coin.price_change_percentage_24h >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <FaEye />
                              {coin.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td className="py-4 px-4">
                              ₹{coin.market_cap.toLocaleString()}
                            </td>
                          </Link>
                        </div>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-between w-[800px] mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-cyan-600 text-black rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-cyan-600 text-black rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
