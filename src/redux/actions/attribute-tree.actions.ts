import { Dictionary } from "@reduxjs/toolkit";
import {
  ContextStorage,
  NodeSelectEvent,
  SavedDataType,
  SkillData,
} from "beautiful-skill-tree/dist/models";
import _ from "lodash";
import { InfinitySkill } from "../../app/data/infinitySkills";
import {
  getModByTreeId,
  getModsBySkillId,
  updateProfileByMods,
} from "../../app/data/modHelpers";
import { Mod } from "../../app/data/mods";
import { Profile } from "../../app/data/profile";
import { CharacterState, CharacterTree } from "../reducers/character";

export function processSelectEvent(
  characters: CharacterState[],
  characterId: string,
  event: NodeSelectEvent
) {
  const index: number = characters.findIndex(
    (character) => character.id === characterId
  );
  let returnCharacters: CharacterState[] = [...characters];
  returnCharacters[index] = { ...returnCharacters[index], lastSelect: event };
  return returnCharacters;
}

export function skillTreeInc(
  characters: CharacterState[],
  characterId: string,
  treeId: string
) {
  const index: number = characters.findIndex(
    (character) => character.id === characterId
  );
  let returnCharacters: CharacterState[] = [...characters];
  let updateCharacter: CharacterState = {
    ...returnCharacters[index],
    skillTrees: [...returnCharacters[index].skillTrees],
  };
  const indexTree: number = updateCharacter.skillTrees.findIndex(
    (skillTree) => skillTree.name === treeId
  );
  let updateTree: CharacterTree = { ...updateCharacter.skillTrees[indexTree] };
  updateTree.points += 1;
  updateCharacter.skillTrees[indexTree] = updateTree;
  returnCharacters[index] = updateCharacter;
  return returnCharacters;
}

export function skillTreeDec(
  characters: CharacterState[],
  characterId: string,
  treeId: string
) {
  const index: number = characters.findIndex(
    (character) => character.id === characterId
  );
  let returnCharacters: CharacterState[] = [...characters];
  let updateCharacter: CharacterState = {
    ...returnCharacters[index],
    skillTrees: [...returnCharacters[index].skillTrees],
  };
  const indexTree: number = updateCharacter.skillTrees.findIndex(
    (skillTree) => skillTree.name === treeId
  );
  let updateTree: CharacterTree = { ...updateCharacter.skillTrees[indexTree] };
  updateTree.points -= 1;
  updateCharacter.skillTrees[indexTree] = updateTree;
  returnCharacters[index] = updateCharacter;
  return returnCharacters;
}

function traverse(
  node: InfinitySkill,
  result: InfinitySkill[] = []
): InfinitySkill[] {
  for (const child of node.children) {
    traverse(child, result);
  }
  let nodeCopy = JSON.parse(JSON.stringify(node));
  nodeCopy.children = [];
  result.push(nodeCopy);
  return result;
}

function flattenTree(
  tree: InfinitySkill[],
  result: InfinitySkill[] = []
): InfinitySkill[] {
  tree.forEach((node) => (result = result.concat(traverse(node))));
  return result;
}

function searchNode(
  node: InfinitySkill,
  predicate: Function
): InfinitySkill | null {
  if (predicate(node)) {
    return node;
  } else if (node.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < node.children.length; i++) {
      result = searchNode(node.children[i], predicate);
    }
    return result;
  }
  return null;
}

function searchTree(
  tree: InfinitySkill[],
  predicate: Function
): InfinitySkill | null {
  let skills: InfinitySkill[] = [];
  tree.forEach((node) => {
    let skill: InfinitySkill | null = searchNode(node, predicate);
    if (skill) skills.push(skill);
  });
  if (skills.length) return skills[0];
  return null;
}

export function handleSave(
  characters: CharacterState[],
  storage: ContextStorage,
  characterId: string,
  treeId: string,
  skills: SavedDataType
) {
  // initialize
  const index: number = characters.findIndex(
    (character) => character.id === characterId
  );
  let returnCharacters: CharacterState[] = [...characters];
  if (!returnCharacters[index]) return returnCharacters;
  let updateCharacter: CharacterState = {
    ...returnCharacters[index],
    skillTrees: [...returnCharacters[index].skillTrees],
  };
  const indexTree: number = updateCharacter.skillTrees.findIndex(
    (skillTree) => skillTree.name === treeId.replace(characterId, "")
  );
  let updateTree: CharacterTree = { ...updateCharacter.skillTrees[indexTree] };

  // check select
  let spentPoints = 0;
  // update spent points
  // get selected skills from storage
  let selectedSkills: Map<string, SkillData> = new Map(
    Object.entries(skills).filter(
      (keyValue) => keyValue[1].nodeState === "selected"
    )
  );
  flattenTree(updateTree.data).forEach((skill) => {
    if (selectedSkills.get(skill.id)) {
      spentPoints += skill.points;
    }
  });
  let lastSelect: NodeSelectEvent = updateCharacter.lastSelect;
  let lastSkill: InfinitySkill | null = searchTree(
    updateTree.data,
    (node: InfinitySkill) => node.id === lastSelect.key
  );
  if (lastSkill) {
    if (updateTree.points - spentPoints < 0) {
      skills[lastSelect.key].nodeState = "unlocked";
      spentPoints -= lastSkill.points;
    }
  }

  // update characters
  updateCharacter.skillTrees[indexTree] = {
    ...updateTree,
    spentPoints: spentPoints,
  };
  // update storage
  storage.setItem(`skills-${treeId}`, JSON.stringify(skills));

  // collect character modifiers
  let modsToUpdate: Mod[] = [];
  updateCharacter.skillTrees.forEach((skillTree) => {
    let storeString: string | null = storage.getItem(
      `skills-${characterId + skillTree.name}`
    );
    if (storeString) {
      // get selected skills from storage
      let selectedSkills: Map<string, SkillData> = new Map(
        Object.entries(JSON.parse(storeString) as SavedDataType).filter(
          (keyValue) => keyValue[1].nodeState === "selected"
        )
      );
      // add all selected mods
      flattenTree(skillTree.data).forEach((skill) => {
        if (selectedSkills.get(skill.id)) {
          let skillMods: Mod[] | undefined = getModsBySkillId(skill.id);
          if (skillMods) modsToUpdate = modsToUpdate.concat(skillMods);
        }
      });
      modsToUpdate.push(getModByTreeId(skillTree.name, skillTree.spentPoints));
    }
  });

  let returnProfile: Profile = {
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
    weapons: [],
    equipment: [],
    skills: [],
  };
  returnProfile = updateProfileByMods(returnProfile, modsToUpdate);
  returnCharacters[index] = { ...updateCharacter, profile: returnProfile };
  return returnCharacters;
}

