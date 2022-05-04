import { AnyAction } from "@reduxjs/toolkit";
import { CharacterState, createCharacter } from "./character";
import { handleSave, processSelectEvent, skillTreeDec, skillTreeInc } from "../actions/attribute-tree.actions"

export type Characters = {
  characters: CharacterState[];
};

const initialState: Characters = {
  characters: [],
};

export const CREATE_CHARACTER = "CREATE_CHARACTER";
export const DELETE_CHARACTER = "DELETE_CHARACTER";
export const ATTRIBUTE_TREE_INC = "ATTRIBUTE_TREE_INC";
export const ATTRIBUTE_TREE_DEC = "ATTRIBUTE_TREE_DEC";
export const ATTRIBUTE_HANDLE_SAVE = "ATTRIBUTE_HANDLE_SAVE";
export const ATTRIBUTE_SELECT_EVENT = "ATTRIBUTE_SELECT_EVENT";

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
        characters: state.characters.filter(character => character.id !== action.payload) 
      };
    case ATTRIBUTE_SELECT_EVENT:
      return {
        ...state,
        characters: processSelectEvent(state.characters, action.payload.characterId, action.payload.event),
      };
    case ATTRIBUTE_TREE_INC:
      return {
        ...state,
        characters: skillTreeInc(state.characters, action.payload.characterId, action.payload.treeId),
      };
    case ATTRIBUTE_TREE_DEC:
      return {
        ...state,
        characters: skillTreeDec(state.characters, action.payload.characterId, action.payload.treeId),
      };
    case ATTRIBUTE_HANDLE_SAVE:
      return {
        ...state,
        characters: handleSave(
          state.characters,
          action.payload.storage,
          action.payload.characterId,
          action.payload.treeId,
          action.payload.skills,
        )
      };
    default:
      return state;
  }
}


