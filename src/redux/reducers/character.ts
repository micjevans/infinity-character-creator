import { gritData } from "../../app/data/body/grit";
import { physiqueData } from "../../app/data/body/physique";
import { btsData } from "../../app/data/body/bts";
import { Profile, Stat } from "../../app/data/profile";
import { NodeSelectEvent } from "beautiful-skill-tree";
import { InfinitySkill } from "../../app/data/infinitySkills";
import { DataType } from "../../app/data/dataTypes";
import { v4 } from "uuid";

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
  id: string;
  skillTrees: CharacterTree[];
  lastSelect: NodeSelectEvent;
  profile: Profile;
};


const initialState: CharacterState = {
  id: v4(),
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

export function createCharacter(name: string): CharacterState {
  let character: CharacterState = {...initialState, id: v4()};
  return character;
}
