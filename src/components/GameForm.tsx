import { useState } from "react";
import { Form, Button, DatePicker, Schema, ButtonToolbar } from "rsuite";
import { v4 as uuidv4 } from "uuid";
import { Game, Odd } from "../types/game";
import FormGroup from "rsuite/esm/FormGroup";
import { useDispatch } from "react-redux";
import { addGame } from "../gameReducer";

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name0: StringType().isRequired("Home Team Name is required."),
  odd0: NumberType().isRequired("Home Team Odd is required."),
  odd1: NumberType().isRequired("Draw Odd is required."),
  name2: StringType().isRequired("Away Team Name is required."),
  odd2: NumberType().isRequired("Away Team Odd is required."),
});

interface Props {
  addNewGame: (game: Game) => void;
  setIsFormOpen: Function;
}

function GameForm({ addNewGame, setIsFormOpen }: Props) {
  const dispatch = useDispatch();

  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [newGame, setNewGame] = useState<Game>({
    games: [
      { name: "", odd: 0, sortOrder: 0 },
      { name: "X", odd: 0, sortOrder: 1 },
      { name: "", odd: 0, sortOrder: 2 },
    ],
    name: "",
    nodeId: uuidv4(),
    startDate: new Date().toISOString(),
  });

  const fields = [
    { label: "Home Team Name", key: "name", gameIndex: 0, type: "text" },
    { label: "Home Team Odd (1)", key: "odd", gameIndex: 0, type: "number" },
    { label: "Draw Odd (X)", key: "odd", gameIndex: 1, type: "number" },
    { label: "Away Team Name", key: "name", gameIndex: 2, type: "text" },
    { label: "Away Team Odd (2)", key: "odd", gameIndex: 2, type: "number" },
  ];

  const handleGameChange = (index: number, key: keyof Odd, value: any) => {
    const updatedGames = [...newGame.games];
    updatedGames[index] = { ...updatedGames[index], [key]: value };
    setNewGame((prev) => ({ ...prev, games: updatedGames }));
  };

  const handleChange = (field: keyof Game, value: any) => {
    setNewGame((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = () => {
    const gameName = `${newGame.games[0].name} - ${newGame.games[2].name}`;
    const gameWithNewId = { ...newGame, name: gameName, nodeId: uuidv4() };
    const validation = model.check({
      name0: gameWithNewId.games[0].name,
      name2: gameWithNewId.games[2].name,
      odd0: gameWithNewId.games[0].odd,
      odd1: gameWithNewId.games[1].odd,
      odd2: gameWithNewId.games[2].odd,
    });
    const errorField = Object.keys(validation).filter((key) => {
      const error = validation[key as keyof typeof validation];
      return error?.hasError === true;
    });
    console.log("errorFields", errorField);
    if (errorField.length > 0) {
      console.log("Validation errors:", validation);
      setErrorFields(errorField);
    } else {
      const gameName = `${newGame.games[0].name} - ${newGame.games[2].name}`;
      const gameWithNewId = { ...newGame, name: gameName, nodeId: uuidv4() };
      addNewGame(gameWithNewId);
      console.log("gameWithNewId", gameWithNewId);
      setNewGame({ ...gameWithNewId, nodeId: uuidv4() });
      dispatch(addGame(newGame));
      setIsFormOpen(false);
    }
  };

  return (
    <Form className="flex flex-col justify-center items-center" model={model}>
      {fields.map(({ label, key, gameIndex, type }) => (
        <FormGroup key={`${key}-${gameIndex}`}>
          <Form.ControlLabel
            className={`${
              errorFields.includes(`${key + gameIndex}`)
                ? "text-red-500"
                : "text-white"
            }`}
          >
            {label}
          </Form.ControlLabel>
          <Form.Control
            type={type}
            name={`${key}-${gameIndex}`}
            value={newGame.games[gameIndex][key as keyof Odd]}
            onChange={(value) =>
              handleGameChange(gameIndex, key as keyof Odd, value)
            }
          />
        </FormGroup>
      ))}
      <FormGroup>
        <Form.ControlLabel>Date of Game</Form.ControlLabel>
        <DatePicker
          format="MM/dd/yyyy HH:mm"
          value={new Date(newGame.startDate)}
          onChange={(date) => handleChange("startDate", date?.toISOString())}
        />
      </FormGroup>
      <ButtonToolbar>
        <Button type="submit" appearance="primary" onClick={onSubmit}>
          Submit
        </Button>
      </ButtonToolbar>
    </Form>
  );
}

export default GameForm;
