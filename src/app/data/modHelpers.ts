import { Dictionary } from "@reduxjs/toolkit";
import { groupBy } from "lodash";
import { btsSkills } from "./body/bts";
import { gritSkills } from "./body/grit";
import { physiqueSkills } from "./body/physique";
import { DataType } from "./dataTypes";
import { AttributeMod, Mod, ModType, SkillMod } from "./mods";
import { Attribute, Profile } from "./profile";
import { DefaultMod, SubMod, SubModType } from "./subMods";

export function getModsBySkillId(skillId: string): Mod[] | undefined {
  return {...gritSkills, ...btsSkills, ...physiqueSkills}[skillId]
}

export function getModByTreeId(treeId: string, spentPoints: number) {
    switch (treeId) {
      case DataType.GRIT:
        return new AttributeMod(
          Attribute.ARM,
          Math.trunc(Math.sqrt(spentPoints))
        );
      case DataType.BTS:
        return new AttributeMod(
          Attribute.BTS,
          Math.trunc(Math.sqrt(spentPoints))
        );
      case DataType.PHYSIQUE:
        return new AttributeMod(Attribute.PH, Math.trunc(Math.sqrt(spentPoints)));
      default:
        return new AttributeMod(Attribute.ARM, 0);
    }
  }
  
  export function updateProfileByMods(profile: Profile, mods: Mod[]) {
    let groupedMods: Dictionary<Mod[]> = groupBy(mods, "modType");
    Object.entries(groupedMods).forEach((group) => {
      switch (group[0]) {
        case ModType.ATTRIBUTE_MOD:
          profile = updateProfileByAttributeMods(
            profile,
            group[1] as AttributeMod[]
          );
          return;
        case ModType.SKILL_MOD:
          profile = updateProfileBySkillMods(profile, group[1] as SkillMod[]);
          return;
        default:
          return profile;
      }
    });
    return profile;
  }
  
  export function updateProfileByAttributeMods(
    profile: Profile,
    mods: AttributeMod[]
  ) {
    mods.forEach((mod) => {
      switch (mod.attribute) {
        case Attribute.MOVE1:
          profile = { ...profile, move1: profile.move1 + mod.mod };
          return;
        case Attribute.MOVE2:
          profile = { ...profile, move2: profile.move2 + mod.mod };
          return;
        case Attribute.CC:
          profile = { ...profile, cc: profile.cc + mod.mod };
          return;
        case Attribute.BS:
          profile = { ...profile, bs: profile.bs + mod.mod };
          return;
        case Attribute.PH:
          profile = { ...profile, ph: profile.ph + mod.mod };
          return;
        case Attribute.WIP:
          profile = { ...profile, wip: profile.wip + mod.mod };
          return;
        case Attribute.ARM:
          profile = { ...profile, arm: profile.arm + mod.mod };
          return;
        case Attribute.BTS:
          profile = { ...profile, bts: profile.bts + mod.mod };
          return;
        case Attribute.W:
          profile = { ...profile, w: profile.w + mod.mod };
          return;
        case Attribute.S:
          profile = { ...profile, s: profile.s + mod.mod };
          return;
        default:
          return;
      }
    });
    return profile;
  }
  function updateProfileBySkillMods(profile: Profile, mods: SkillMod[]) {
    Object.entries(groupBy(mods, "name")).forEach((group) => {
      let skillName: string = group[0];
      let updateSubMods: Dictionary<SubMod> = {};
      let skillMods: SubMod[] = [];
      let skillModString: string = "";
      group[1].forEach((skill) => {
        if (skill.mod) skillMods.push(skill.mod);
      });
      Object.entries(groupBy(skillMods, "modType")).forEach((skillModGroup) => {
        updateSubMods[skillModGroup[0]] = skillModGroup[1][0].combineMods(
          skillModGroup[1]
        );
      });
      let name: SubMod | undefined = updateSubMods[SubModType.NAME_MOD];
      if (name) {
        skillName = name.toString();
        delete updateSubMods[SubModType.NAME_MOD];
      }
      
      skillModString = Object.values(updateSubMods).join(", ");
      if (skillModString.length) {
        skillModString = skillModString.substring(2);
        profile.skills.push(skillName + "(" + skillModString + ")");
      } else {
        profile.skills.push(skillName)
      }
    });
    return profile;
  }