import Link from "next/link";

const Header = () => {
  return (
    <div className="Header bg-slate-900 p-3 fixed  top-0 left-0 ring-0 w-full  z-10">
      <div className="container mx-auto">
        <div className="header flex items-center justify-around">
          <div className="header-one">
            <h2 className="text-cyan-600 font-sans font-semibold">
              CRYPTOFOLIO
            </h2>
          </div>
          <div className="header-two flex items-center gap-3">
            <select
              name=""
              id=""
              className="outline-none  bg-slate-900  text-white font-sans "
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <Link href="/watchlist">
              <button className="border bg-cyan-700 text-slate-900 p-2 border-none text-sm rounded-md font-sans font-semibold">
                WATCH LIST
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
