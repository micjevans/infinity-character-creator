import { Attribute } from "./profile";
import { SubMod } from "./subMods";

export enum ModType {
  ATTRIBUTE_MOD = "ATTRIBUTE_MOD",
  SKILL_MOD = "SKILL_MOD",
}

export interface Mod {
  modType: ModType;
}

export class AttributeMod implements Mod {
  attribute: Attribute;
  mod: number;
  constructor(attribute: Attribute, mod: number) {
    this.attribute = attribute;
    this.mod = mod;
  }

  modType = ModType.ATTRIBUTE_MOD;
}

export class SkillMod implements Mod {
  name: string;
  mod?: SubMod;
  constructor(name: string, mod?: SubMod) {
    this.name = name;
    this.mod = mod;
  }

  modType = ModType.SKILL_MOD;
}
