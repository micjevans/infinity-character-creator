import {
  ContextStorage,
  NodeSelectEvent,
  SavedDataType,
  SkillData,
} from "beautiful-skill-tree/dist/models";
import { Nullable } from "beautiful-skill-tree/dist/models/utils";
import _ from "lodash";
import { InfinitySkill } from "../../app/data/infinitySkills";
import {
  getModByTreeId,
  getModsBySkillId,
  updateProfileByMods,
} from "../../app/data/modHelpers";
import { Mod } from "../../app/data/mods";
import { Profile } from "../../app/data/profile";
import { CharacterTree } from "../reducers/character";

export type HandleSaveType = {
  skillTrees: CharacterTree[];
  profile: Profile;
};

export function skillTreeInc(skillTrees: CharacterTree[], treeId: string) {
  return skillTrees.map((skillTree) => {
    let points: number = skillTree.points;
    if (skillTree.name === treeId) {
      points = skillTree.points + 1;
    }
    return { ...skillTree, points: points };
  });
}

export function skillTreeDec(skillTrees: CharacterTree[], treeId: string) {
  return skillTrees.map((skillTree) => {
    let points: number = skillTree.points;
    if (skillTree.name === treeId) {
      points = skillTree.points - 1;
    }
    return { ...skillTree, points: points };
  });
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
  skillTrees: CharacterTree[],
  storage: ContextStorage,
  treeId: string,
  skills: SavedDataType,
  lastSelect: NodeSelectEvent
) {
  let modsToUpdate: Mod[] = [];
  let returnSkillTrees: CharacterTree[] = skillTrees.map((skillTree) => {
    let storeString: string | null = storage.getItem(
      `skills-${skillTree.name}`
    );
    let spentPoints: number = 0;
    if (storeString) {
      // get selected skills from storage
      let selectedSkills: Map<string, SkillData> = new Map(
        Object.entries(JSON.parse(storeString) as SavedDataType).filter(
          (keyValue) => keyValue[1].nodeState === "selected"
        )
      );

      // update spent points
      flattenTree(skillTree.data).forEach((skill) => {
        if (selectedSkills.get(skill.id)) {
          spentPoints += skill.points;
        }
      });

      // check previous save and remove if needed
      if (skillTree.name === treeId) {
        let lastSkill: InfinitySkill | null = searchTree(
          skillTree.data,
          (node: InfinitySkill) => node.id === lastSelect.key
        );
        if (lastSkill) {
          if (skillTree.points - spentPoints < 0) {
            skills[lastSelect.key].nodeState = "unlocked";
            selectedSkills.delete(lastSelect.key);
            spentPoints -= lastSkill.points;
          }
        }
      }

      // add all selected mods
      flattenTree(skillTree.data).forEach((skill) => {
        if (selectedSkills.get(skill.id)) {
          let skillMods: Mod[] | undefined = getModsBySkillId(skill.id);
          if (skillMods) modsToUpdate = modsToUpdate.concat(skillMods);
        }
      });
      modsToUpdate.push(getModByTreeId(treeId, spentPoints));
    }

    // update storage
    storage.setItem(`skills-${treeId}`, JSON.stringify(skills));
    return {
      ...skillTree,
      spentPoints: spentPoints,
    };
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
    equipment: [],
    skills: [],
  };
  returnProfile = updateProfileByMods(returnProfile, modsToUpdate);
  let returnValue: HandleSaveType = {
    skillTrees: returnSkillTrees,
    profile: returnProfile,
  };
  return returnValue;
}
