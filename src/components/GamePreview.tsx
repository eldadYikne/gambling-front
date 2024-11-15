import { Game } from "../types/game";
import { formatDate } from "../utils";

function GamePreview(props: Props) {
  const oddsCharts: string[] = ["1", "X", "2"];
  return (
    <div className="game-preview ">
      <div className="flex w-full justify-between ">
        <span>World Cup 2022</span>
        <span className="text-[#0056FE]">
          {formatDate(props.game.startDate)}
        </span>
      </div>
      <div className="flex w-full justify-between ">
        <span>{props.game.games[0].name}</span>
        <span>-</span>
        <span>{props.game.games[2].name}</span>
      </div>
      <div className="flex w-full justify-around gap-1">
        {props.game.games.map((game) => {
          return (
            <div key={game.name} className="game-odd ">
              <span className="odd-id">{oddsCharts[game.sortOrder]}</span>
              <span>{game.odd}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GamePreview;
interface Props {
  game: Game;
}
