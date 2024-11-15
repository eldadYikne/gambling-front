import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Game } from "./types/game";

interface GameState {
  games: Game[];
}

const initialState: GameState = {
  games: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<Omit<Game, "nodeId">>) => {
      const newGame: Game = { ...action.payload, nodeId: uuidv4() };
      state.games.push(newGame);
    },
    insertGames: (state, action: PayloadAction<Omit<Game[], "nodeId">>) => {
      const newGames: Game[] = action.payload.map((game) => ({
        ...game,
        nodeId: uuidv4(),
      }));
      state.games = newGames;
    },
  },
});

export const { addGame, insertGames } = gameSlice.actions;
export default gameSlice.reducer;
