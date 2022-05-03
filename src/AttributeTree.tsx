import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
} from "beautiful-skill-tree";
import { RootState } from "./app/store";
import * as action from "./redux/reducers/character";
import * as reactRedux from "react-redux";
import {
  ContextStorage,
  NodeSelectEvent,
  SavedDataType,
} from "beautiful-skill-tree/dist/models";
import { Button, Paper, Stack, styled } from "@mui/material";

const mapState = (state: RootState) => ({
  lastSelect: state.character.lastSelect,
});

const mapDispatch = {
  handleNodeSelect: (event: NodeSelectEvent) => ({
    type: action.ATTRIBUTE_SELECT_EVENT,
    payload: event,
  }),
  handleSave: (
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) => ({
    type: action.ATTRIBUTE_HANDLE_SAVE,
    payload: { storage: storage, treeId: treeId, skills: skills },
  }),
  increment: (treeId: string) => ({
    type: action.ATTRIBUTE_TREE_INC,
    payload: treeId,
  }),
  decrement: (treeId: string) => ({
    type: action.ATTRIBUTE_TREE_DEC,
    payload: treeId,
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
        onClick={() => props.increment(props.treeId)}
      >
        +
      </Button>
      <Item>{props.spentPoints + "/" + props.points}</Item>
      <Button
        variant="contained"
        onClick={() => props.decrement(props.treeId)}
      >
        -
      </Button>
    </Stack>
    <SkillProvider>
      <SkillTreeGroup>
        {({ selectedSkillCount }: SkillGroupDataType) => {
          return (
            <SkillTree
              treeId={props.treeId}
              title=""
              data={props.data}
              description={props.description}
              handleSave={props.handleSave}
              handleNodeSelect={props.handleNodeSelect}
            />
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  </Stack>
);

export default connector(AttributeTree);
