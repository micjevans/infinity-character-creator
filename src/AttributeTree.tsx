import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
} from "beautiful-skill-tree";
import { RootState } from "./app/store";
import * as reactRedux from "react-redux";
import {
  ContextStorage,
  NodeSelectEvent,
  SavedDataType,
} from "beautiful-skill-tree/dist/models";
import { Button, Paper, Stack, styled } from "@mui/material";
import { ATTRIBUTE_HANDLE_SAVE, ATTRIBUTE_SELECT_EVENT, ATTRIBUTE_TREE_DEC, ATTRIBUTE_TREE_INC } from "./redux/reducers/characters";

const mapState = (state: RootState) => ({});

const mapDispatch = {
  handleNodeSelect: (characterId: string, event: NodeSelectEvent) => ({
    type: ATTRIBUTE_SELECT_EVENT,
    payload: {characterId: characterId, event: event},
  }),
  handleSave: (
    characterId: string,
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) => ({
    type: ATTRIBUTE_HANDLE_SAVE,
    payload: { characterId: characterId, storage: storage, treeId: treeId, skills: skills },
  }),
  increment: (characterId: string, treeId: string) => ({
    type: ATTRIBUTE_TREE_INC,
    payload: {characterId: characterId, treeId: treeId},
  }),
  decrement: (characterId: string, treeId: string) => ({
    type: ATTRIBUTE_TREE_DEC,
    payload: {characterId: characterId, treeId: treeId},
  }),
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const connector = reactRedux.connect(mapState, mapDispatch);

type PropsFromRedux = reactRedux.ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  characterId: string;
  key: string;
  points: number;
  spentPoints: number;
  treeId: string;
  title: string;
  data: SkillType[];
  description: string;
}

const AttributeTree = (props: Props) => (
  <Stack direction="column">
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        onClick={() => props.increment(props.characterId, props.treeId)}
      >
        +
      </Button>
      <Item>{props.spentPoints + "/" + props.points}</Item>
      <Button
        variant="contained"
        onClick={() => props.decrement(props.characterId, props.treeId)}
      >
        -
      </Button>
    </Stack>
    <SkillProvider>
      <SkillTreeGroup>
        {({ selectedSkillCount }: SkillGroupDataType) => {
          return (
            <SkillTree
              treeId={props.characterId + props.treeId}
              title=""
              data={props.data}
              description={props.description}
              handleSave={(
                storage: ContextStorage,
                treeId: string,
                skills: SavedDataType
              ) => props.handleSave(props.characterId, storage, treeId, skills)}
              handleNodeSelect={(event) => props.handleNodeSelect(props.characterId, event)}
            />
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  </Stack>
);

export default connector(AttributeTree);
