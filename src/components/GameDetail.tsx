import { useEffect, useState } from "react";
import { GameDetailObj } from "../types/home";
import Dots from "./Dots";

function GameDetail(props: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 584);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {props.gameDetails.map((gameDetail) => {
        return (
          <div className="flex flex-col-reverse sm:flex-row w-full rounded-lg p-1 bg-[#0000004d]  ">
            <div className="flex flex-col sm:items-start items-center gap-5 sm:w-1/2 p-4">
              <span className="title flex sm:flex-row flex-col items-center gap-2">
                {/* <span className="hidden sm:flex">|</span> */}
                <span className="sm:border-l-4 sm:border-[#79c000] sm:pl-2">
                  {gameDetail.title}
                </span>
                <span className="sm:hidden">
                  <Dots number={6} />
                </span>
              </span>

              {gameDetail.icons && isMobile ? (
                <div className="flex gap-4">
                  {gameDetail.icons.map((icon) => (
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <img
                        key={icon.image}
                        className=""
                        src={`src/assets/images/${icon.image}.png`}
                        alt={`Banner image ${icon.image}`}
                      />
                      <span className="text-white text-[10px]">
                        {icon.text}
                      </span>
                    </div>
                  ))}{" "}
                </div>
              ) : (
                <span className="text-white">{gameDetail.content}</span>
              )}
              <button className="active:bg-white   rounded-full flex gap-1 items-center justify-center text-sm w-44 text-white p-2 border-[#79c000] border-2 ">
                {gameDetail.buttonText}{" "}
                <span className="hidden sm:flex">{">"}</span>
              </button>
            </div>
            <div className="sm:w-1/2">
              <img
                key={gameDetail.image}
                className="w-full h-full"
                src={`src/assets/images/${gameDetail.image}.png`}
                alt={`Banner image ${gameDetail.image}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GameDetail;
interface Props {
  gameDetails: GameDetailObj[];
}
