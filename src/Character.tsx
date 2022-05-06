import { RootState } from "./app/store";
import * as reactRedux from "react-redux";
import AttributeTree from "./AttributeTree";
import { CharacterState, CharacterTree } from "./redux/reducers/character";
import {
  Box,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React from "react";

const mapState = (state: RootState) => ({});

const mapDispatch = {};

const connector = reactRedux.connect(mapState, mapDispatch);

type PropsFromRedux = reactRedux.ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  character: CharacterState;
}

const Character = (props: Props) => {
  const [value, setValue] = React.useState("grit");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">MOV</TableCell>
              <TableCell align="right">CC</TableCell>
              <TableCell align="right">BS</TableCell>
              <TableCell align="right">PH</TableCell>
              <TableCell align="right">WIP</TableCell>
              <TableCell align="right">ARM</TableCell>
              <TableCell align="right">BTS</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">S</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                {props.character.profile.move1 +
                  "-" +
                  props.character.profile.move2}
              </TableCell>
              <TableCell align="right">{props.character.profile.cc}</TableCell>
              <TableCell align="right">{props.character.profile.bs}</TableCell>
              <TableCell align="right">{props.character.profile.ph}</TableCell>
              <TableCell align="right">{props.character.profile.wip}</TableCell>
              <TableCell align="right">{props.character.profile.arm}</TableCell>
              <TableCell align="right">{props.character.profile.bts}</TableCell>
              <TableCell align="right">{props.character.profile.w}</TableCell>
              <TableCell align="right">{props.character.profile.s}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {"Skills:  " + props.character.profile.skills.join(" ∙ ")}
        </Grid>
        <Grid item xs={12}>
          {"Equipment:  " + props.character.profile.equipment.join(" ∙ ")}
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {props.character.skillTrees.map((attribute: CharacterTree) => {
                return (
                  <Tab
                    key={attribute.name}
                    label={attribute.title}
                    value={attribute.name}
                  />
                );
              })}
              <Tab key={"Equipment"} label={"Equipment"} value={"Equipment"} />
            </TabList>
          </Box>
          {props.character.skillTrees.map((attribute: CharacterTree) => {
            return (
              <TabPanel key={attribute.name} value={attribute.name}>
                <AttributeTree
                  characterId={props.character.id}
                  key={attribute.name}
                  data={attribute.data}
                  description={attribute.description}
                  title={attribute.title}
                  spentPoints={attribute.spentPoints}
                  points={attribute.points}
                  treeId={attribute.name}
                />
              </TabPanel>
            );
          })}
          <TabPanel key={"Equipment"} value={"Equipment"}>Hello</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default connector(Character);
