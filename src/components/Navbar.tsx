import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";

function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const navlinks = [
    { text: "JACKPOTS", id: "1", href: "" },
    { text: "JACKPOTS", id: "2", href: "" },
    { text: "JACKPOTS", id: "3", href: "" },
    { text: "JACKPOTS", id: "4", href: "" },
    { text: "JACKPOTS", id: "5", href: "" },
  ];
  const games = useSelector((state: RootState) => state.game.games);
  console.log(
    "games length from navbar, just check redux work well!",
    games.length
  );
  return (
    <div className="navbar">
      <div className="flex justify-center gap-2 items-center">
        <span
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className="text-5xl sm:hidden cursor-pointer "
        >
          ≡
        </span>
        <img
          className="h-8 sm:h-9"
          src="https://www.codere.es/_catalogs/masterpage/codere/img/logo-gris.png"
          alt=""
        />
      </div>
      <span className="sm:hidden">
        <button className="border-2 rounded-full p-1 border-[#333f48] px-2 text-sm">
          Acceder
        </button>
      </span>
      <div className="navlinks-container hidden sm:flex">
        {navlinks.map((link) => (
          <span className="navlink" key={link.id}>
            {link.text}{" "}
          </span>
        ))}
      </div>
      <div
        className={`mobile-menu flex p-3 flex-col bg-[#333f48] h-full w-[220px] absolute top-0 left-0 z-20  transition-all ${
          menuIsOpen ? "!translate-x-[0px]" : "translate-x-[-220px]"
        }`}
      >
        <div className="flex flex-col justify-center">
          <div className="flex justify-end ">
            <button
              className="button"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              close
            </button>
          </div>
          <div className="flex flex-col justify-center  items-center gap-7 py-10">
            {navlinks.map((link) => (
              <span className=" text-white   cursor-pointer" key={link.id}>
                {link.text}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
