import { useEffect, useState } from "react";
import { Game } from "../types/game";
import GamePreview from "./GamePreview";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/free-mode";
import GameForm from "./GameForm";
import CustomDropdown from "./CustomDropdown";
import { DropdownOption } from "../types/dropdown";
import { sortGamesByAZ } from "../utils";
import { useDispatch } from "react-redux";
import { insertGames } from "../gameReducer";

function GamesSection() {
  const dispatch = useDispatch();
  const [games, setGames] = useState<Game[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [gamesSortBy, setGamesSortBy] = useState<Game[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          "https://inicio-banner-server-51647ce90258.herokuapp.com/games"
        ).then((res) => res.json());
        console.log("data", data[0].db);
        let dbGames = data[0].db.map((game: Game) => ({
          ...game,
          name: game.name ?? game.games.map((game) => game.name).join(""),
        }));

        dbGames.sort(
          (a: Game, b: Game) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        setGames(dbGames);
        dispatch(insertGames(dbGames));
      } catch (error) {}
    }

    if (games.length === 0) {
      fetchData();
    }
  }, []);

  const setGamesSortByChange = (sortBy: DropdownOption) => {
    if (games.length) {
      let newGames = JSON.parse(JSON.stringify(games));
      console.log(sortBy.key);
      let ames = sortGamesByAZ(newGames, sortBy.key);
      setGamesSortBy(ames);
      console.log("dbGames", ames);
    }
  };
  return (
    <div className="w-full flex flex-col p-5 gap-3 justify-center">
      <CustomDropdown
        setOption={(e: DropdownOption) => {
          setGamesSortByChange(e);
        }}
        title="sort by"
        options={[
          { key: "AZ", text: "A-Z" },
          { key: "ZA", text: "Z-A" },
        ]}
      />
      <div className="games-container">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {games.length > 0 &&
            [...games, ...gamesSortBy].map((game, i) => {
              return (
                <SwiperSlide key={`${game?.nodeId + i}` ?? game.name}>
                  <GamePreview game={game} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className={`fade ${isFormOpen ? "show" : ""}`}>
          {isFormOpen && (
            <GameForm
              setIsFormOpen={setIsFormOpen}
              addNewGame={(game: Game) => setGames((prev) => [...prev, game])}
            />
          )}
        </div>

        <button
          className="button my-3"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Cancel" : "+ New Game"}
        </button>
      </div>
    </div>
  );
}

export default GamesSection;
