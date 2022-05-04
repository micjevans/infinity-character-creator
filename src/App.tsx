import "./App.css";
import { RootState } from "./app/store";
import * as reactRedux from "react-redux";
import Character from "./Character";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CREATE_CHARACTER, DELETE_CHARACTER } from "./redux/reducers/characters";

const mapState = (state: RootState) => ({
  characters: state.charactersReducer.characters,
});

const mapDispatch = {
  createCharacter: (name: string) => ({
    type: CREATE_CHARACTER,
    payload: name,
  }),
  deleteCharacter: (id: string) => ({
    type: DELETE_CHARACTER,
    payload: id,
  }),
};
const connector = reactRedux.connect(mapState, mapDispatch);

type PropsFromRedux = reactRedux.ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const App = (props: Props) => (
  <div className="App">
    {props.characters.map((character) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Character character={character} />
            </AccordionDetails>
          </Accordion>
        );
    })}
    <Accordion>
    <Button
        variant="contained"
        onClick={() => props.createCharacter("John")}
      >
        Create Character
      </Button>
    </Accordion>
  </div>
);

export default connector(App);
