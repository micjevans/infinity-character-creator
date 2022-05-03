export enum SubModType {
  PLUS_MOD = "PLUS_MOD",
  MINUS_MOD = "MINUS_MOD",
  BURST_MOD = "BURST_MOD",
  NAME_MOD = "NAME_MOD",
  DEFAULT = "DEFAULT",
}

export interface SubMod {
  modType: SubModType;
  mod: number | string;

  combineMods(mods: SubMod[]): SubMod;
  toString(): string;
}

export class PlusMod implements SubMod {
  modType = SubModType.PLUS_MOD;
  mod: number;

  public constructor(mod: number) {
    this.mod = mod;
  }

  combineMods(mods: PlusMod[]): PlusMod {
    let returnMod: PlusMod = new PlusMod(0);
    mods.forEach((mod) => (returnMod.mod += mod.mod));
    return returnMod;
  }

  toString(): string {
    return "+" + this.mod;
  }
}

export class BurstMod implements SubMod {
  modType = SubModType.BURST_MOD;
  mod: number;

  public constructor(mod: number) {
    this.mod = mod;
  }

  combineMods(mods: BurstMod[]): BurstMod {
    let returnMod: BurstMod = new BurstMod(0);
    mods.forEach((mod) => (returnMod.mod += mod.mod));
    return returnMod;
  }

  toString(): string {
    return "+" + this.mod + "B";
  }
}

export class MinusMod implements SubMod {
  modType = SubModType.MINUS_MOD;
  mod: number;

  public constructor(mod: number) {
    this.mod = mod;
  }

  combineMods(mods: MinusMod[]): MinusMod {
    let returnMod: PlusMod = new PlusMod(0);
    mods.forEach((mod) => (returnMod.mod += mod.mod));
    return returnMod;
  }

  toString(): string {
    return "-" + this.mod;
  }
}

export class NameMod implements SubMod {
  modType = SubModType.NAME_MOD;
  mod: string;
  level: number;

  public constructor(mod: string, level: number) {
    this.mod = mod;
    this.level = level;
  }

  combineMods(mods: NameMod[]): NameMod {
    console.log("here");
    return mods.reduce(
      (greatest, mod) =>
        (greatest = greatest.level > mod.level ? greatest : mod),
      mods[0]
    );
  }

  toString(): string {
    return this.mod;
  }
}

export class DefaultMod implements SubMod {
  modType = SubModType.DEFAULT;
  mod: string;

  public constructor(mod: string) {
    this.mod = mod;
  }

  combineMods(mods: SubMod[]): SubMod {
    let returnMod: DefaultMod = new DefaultMod("");
    mods.forEach((mod) => (returnMod.mod += ", " + mod.mod));
    return returnMod;
  }

  toString(): string {
    return this.mod;
  }
}
