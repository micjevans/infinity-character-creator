import { Skill } from "beautiful-skill-tree/dist/models";
import { Mod } from "./mods";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type InfinitySkill = Overwrite<Skill, {
  points: number;
  reqs?: string[];
  children: InfinitySkill[];
}>;
