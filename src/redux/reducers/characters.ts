import { AnyAction } from "@reduxjs/toolkit";
import { CharacterState, createCharacter, deleteCharacter } from "./character";
import {
  handleSave,
  processSelectEvent,
  skillTreeDec,
  skillTreeInc,
} from "../actions/attribute-tree.actions";
import { decreaseMaterial, increaseMaterial } from "../actions/squad.actions";

export enum MaterialType {
  NORMAL_AMMO = "NORMAL_AMMO",
  AP_AMMO = "AP_AMMO",
  BTS_AMMO = "BTS_AMMO",
  K1_AMMO = "K1_AMMO",
  VIRAL_AMMO = "VIRAL_AMMO",
  T2_AMMO = "T2_AMMO",
  PLASMA_AMMO = "PLASMA_AMMO",
  MULTI_AMMO = "MULTI_AMMO",
  CONTINUOUS_AMMO = "CONTINUOUS_AMMO",
  EXP_AMMO = "EXP_AMMO",
  REPEATER = "REPEATER",
  TECH_PARTS = "TECH_PARTS",
  VOODO_TECH = "VOODO_TECH",
  OPTICS = "OPTICS",
  PHEROWARE = "PHEROWARE",
}

export type Material = {
  spentMaterials: number;
  materials: number;
  type: MaterialType;
  text: string;
}

export type Squad = {
  materials: Material[];
  characters: CharacterState[];
};

const initialState: Squad = {
  characters: [],
  materials: Object.keys(MaterialType).map((material) => {
    return {
      spentMaterials: 0,
      materials: 0,
      type: material as MaterialType,
      text: material.replace("_", " ").replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }),
    };
  }),
};

export const CREATE_CHARACTER = "CREATE_CHARACTER";
export const DELETE_CHARACTER = "DELETE_CHARACTER";
export const ATTRIBUTE_TREE_INC = "ATTRIBUTE_TREE_INC";
export const ATTRIBUTE_TREE_DEC = "ATTRIBUTE_TREE_DEC";
export const ATTRIBUTE_HANDLE_SAVE = "ATTRIBUTE_HANDLE_SAVE";
export const ATTRIBUTE_SELECT_EVENT = "ATTRIBUTE_SELECT_EVENT";
export const MATERIAL_INC = "MATERIAL_INC";
export const MATERIAL_DEC = "MATERIAL_DEC";


export default function charactersReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case CREATE_CHARACTER:
      return {
        ...state,
        characters: [...state.characters, createCharacter(action.payload)],
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: deleteCharacter(state.characters, action.payload),
      };
    case ATTRIBUTE_SELECT_EVENT:
      return {
        ...state,
        characters: processSelectEvent(
          state.characters,
          action.payload.characterId,
          action.payload.event
        ),
      };
    case ATTRIBUTE_TREE_INC:
      return {
        ...state,
        characters: skillTreeInc(
          state.characters,
          action.payload.characterId,
          action.payload.treeId
        ),
      };
    case ATTRIBUTE_TREE_DEC:
      return {
        ...state,
        characters: skillTreeDec(
          state.characters,
          action.payload.characterId,
          action.payload.treeId
        ),
      };
    case ATTRIBUTE_HANDLE_SAVE:
      return {
        ...state,
        characters: handleSave(
          state.characters,
          action.payload.storage,
          action.payload.characterId,
          action.payload.treeId,
          action.payload.skills
        ),
      };
      case MATERIAL_INC:
        return {
          ...state,
          materials: increaseMaterial(
            state.materials,
            action.payload,
          ),
        };
        case MATERIAL_DEC:
          return {
            ...state,
            materials: decreaseMaterial(
              state.materials,
              action.payload,
            ),
          };
    default:
      return state;
  }
}
