import "./App.css";
import { RootState } from "./app/store";
import * as reactRedux from "react-redux";
import Character from "./Character";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const mapState = (state: RootState) => ({
  character: state.character,
});

const mapDispatch = {};

const connector = reactRedux.connect(mapState, mapDispatch);

type PropsFromRedux = reactRedux.ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const App = (props: Props) => (
  <div className="App">
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Character character={props.character} />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Accordion 2</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion disabled>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography>Disabled Accordion</Typography>
      </AccordionSummary>
    </Accordion>
  </div>
);

export default connector(App);
