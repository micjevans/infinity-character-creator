export enum Stat {
    BODY = "BODY",
    COOL = "COOL",
    EMPATHY = "EMPATHY",
    INTELLIGENCE = "INTELLIGENCE",
    REFLEX = "REFLEX",
    TECHNOLOGY = "TECHNOLOGY",
  }
  
  export enum Attribute {
    MOVE1 = "MOVE1",
    MOVE2 = "MOVE2",
    CC = "CC",
    BS = "BS",
    PH = "PH",
    WIP = "WIP",
    ARM = "ARM",
    BTS = "BTS",
    W = "W",
    S = "S",
  }
  
  export type Equipment = {
    name: string
  }
  
  export type Profile = {
    move1: number,
    move2: number,
    cc: number,
    bs: number,
    ph: number,
    wip: number,
    arm: number,
    bts: number,
    w: number,
    s: number,
    equipment: Equipment[];
    skills: string[];
  }