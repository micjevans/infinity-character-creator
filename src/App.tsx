import "./App.css";
import { RootState } from "./app/store";
import * as reactRedux from "react-redux";
import Character from "./Character";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CREATE_CHARACTER,
  DELETE_CHARACTER,
  MATERIAL_DEC,
  MATERIAL_INC,
} from "./redux/reducers/characters";
import { Item } from "./Item";

const mapState = (state: RootState) => ({
  materials: state.charactersReducer.materials,
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
  increaseMaterial: (type: string) => ({
    type: MATERIAL_INC,
    payload: type,
  }),
  decreaseMaterial: (type: string) => ({
    type: MATERIAL_DEC,
    payload: type,
  }),
};
const connector = reactRedux.connect(mapState, mapDispatch);

type PropsFromRedux = reactRedux.ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const App = (props: Props) => (
  <div className="App">
    <TextField id="outlined-basic" label="Squad Name" variant="outlined" />
    <TextField
      id="outlined-textarea"
      label="Description"
      placeholder="Description"
      multiline
    />
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {props.materials
        ? props.materials.map((material) => {
            return (
              <ListItem key={`item-${material.type}`}>
                <ListItemText primary={material.text} />
                <Button
                  variant="contained"
                  onClick={() => props.increaseMaterial(material.type)}
                >
                  +
                </Button>
                <Item>
                  {material.spentMaterials + "/" + material.materials}
                </Item>
                <Button
                  variant="contained"
                  onClick={() => props.decreaseMaterial(material.type)}
                >
                  -
                </Button>
              </ListItem>
            );
          })
        : ""}
    </List>
    {props.characters.map((character) => {
      return (
        <Accordion>
          <AccordionSummary
            expandIcon={
              <DeleteIcon onClick={() => props.deleteCharacter(character.id)} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{character.id}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Character character={character} />
          </AccordionDetails>
        </Accordion>
      );
    })}
    <Accordion>
      <Button variant="contained" onClick={() => props.createCharacter("John")}>
        Create Character
      </Button>
    </Accordion>
  </div>
);

export default connector(App);
