import { AnyAction } from "@reduxjs/toolkit";
import { gritData } from "../../app/data/body/grit";
import { physiqueData } from "../../app/data/body/physique";
import {
  skillTreeDec,
  skillTreeInc,
  handleSave,
  HandleSaveType,
} from "../actions/attribute-tree.actions";
import { btsData } from "../../app/data/body/bts";
import { Profile, Stat } from "../../app/data/profile";
import { NodeSelectEvent } from "beautiful-skill-tree";
import { InfinitySkill } from "../../app/data/infinitySkills";
import { DataType } from "../../app/data/dataTypes";

export type CharacterTree = {
  points: number;
  stat: Stat;
  name: DataType;
  spentPoints: number;
  data: InfinitySkill[];
  title: string;
  description: string;
};

export type CharacterState = {
  skillTrees: CharacterTree[];
  lastSelect: NodeSelectEvent;
  profile: Profile;
};

const initialState: CharacterState = {
  skillTrees: [
    {
      points: 0,
      name: DataType.GRIT,
      stat: Stat.BODY,
      spentPoints: 0,
      data: gritData,
      title: "Grit",
      description:
        "Ability to withstand physical punishment. Primary attribute affecting ARM.",
    },
    {
      points: 0,
      name: DataType.PHYSIQUE,
      stat: Stat.BODY,
      spentPoints: 0,
      data: physiqueData,
      title: "Physique",
      description: "Physical strength. Primary attribute affecting PH.",
    },
    {
      points: 0,
      stat: Stat.BODY,
      name: DataType.BTS,
      spentPoints: 0,
      data: btsData,
      title: "Bio-Technological Shield",
      description: "Bio-Technological Shield. Primary attribute affecting BTS.",
    },
  ],
  lastSelect: { key: "", state: "locked" },
  profile: {
    move1: 4,
    move2: 2,
    cc: 10,
    bs: 8,
    ph: 8,
    wip: 8,
    arm: 0,
    bts: 0,
    w: 1,
    s: 2,
    equipment: [],
    skills: []
  }
};

export const ATTRIBUTE_TREE_INC = "ATTRIBUTE_TREE_INC";
export const ATTRIBUTE_TREE_DEC = "ATTRIBUTE_TREE_DEC";
export const ATTRIBUTE_HANDLE_SAVE = "ATTRIBUTE_HANDLE_SAVE";
export const ATTRIBUTE_SELECT_EVENT = "ATTRIBUTE_SELECT_EVENT";

export default function characterReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case ATTRIBUTE_SELECT_EVENT:
      return {
        ...state,
        lastSelect: action.payload,
      };
    case ATTRIBUTE_TREE_INC:
      return {
        ...state,
        skillTrees: skillTreeInc(
          [...state.skillTrees],
          action.payload
        ),
      };
    case ATTRIBUTE_TREE_DEC:
      return {
        ...state,
        skillTrees: skillTreeDec(
          [...state.skillTrees],
          action.payload
        ),
      };
    case ATTRIBUTE_HANDLE_SAVE:
      let saveReturn: HandleSaveType = handleSave(
        [...state.skillTrees],
        action.payload.storage,
        action.payload.treeId,
        action.payload.skills,
        state.lastSelect
      );
      return {
        ...state,
        skillTrees: saveReturn.skillTrees,
        profile: saveReturn.profile,
      };
    default:
      return state;
  }
}
