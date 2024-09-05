// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// const Carusel = () => {
//   const [coinsData, setCoinsData] = useState([]);

//   useEffect(() => {
//     const fetchCoinData = async () => {
//       try {
//         const response = await fetch(
//           "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
//         );
//         if (!response.ok) {
//           throw new Error(
//             `Error fetching the coin data: ${response.statusText}`
//           );
//         }
//         const data = await response.json();
//         setCoinsData(data);
//       } catch (error) {
//         console.error("Error fetching the coin:", error);
//       }
//     };

//     fetchCoinData();
//   }, []);

//   return (
//     <div className="h-64 w-full overflow-hidden">
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="mySwiper h-full"
//       >
//         {coinsData.map((coin) => (
//           <SwiperSlide
//             key={coin.id}
//             className="flex justify-center items-center p-4"
//           >
//             <div className="rounded-lg shadow-md p-4 flex flex-col items-center">
//               <img
//                 src={coin.image}
//                 alt={coin.name}
//                 width={50}
//                 height={50}
//                 className="rounded-full mb-4"
//               />
//               <div className="flex justify-center items-center gap-2 mb-2">
//                 <h3 className="text-xl font-semibold text-center text-black">
//                   {coin.symbol.toUpperCase()}
//                 </h3>
//                 <p
//                   className={`text-center ${
//                     coin.price_change_percentage_24h >= 0
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {coin.price_change_percentage_24h.toFixed(2)}%
//                 </p>
//               </div>
//               <p className="text-center text-gray-600">
//                 ${coin.current_price.toFixed(2)}
//               </p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Carusel;
