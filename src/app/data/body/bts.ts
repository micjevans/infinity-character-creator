import { Dictionary } from "@reduxjs/toolkit";
import { InfinitySkill } from "../infinitySkills";
import { Mod, SkillMod } from "../mods";
import { DefaultMod } from "../subMods";

export const btsData: InfinitySkill[] = [
  {
    id: "critImmunity",
    title: "Immunity(Crit)",
    tooltip: {
      content: "Provides immunity to the extra save caused by crits.",
    },
    points: 2,
    children: [
      {
        id: "viralImmunity",
        title: "Immunity(Viral)",
        tooltip: {
          content: "Provides immunity to viral ammunition.",
        },
        points: 2,
        children: [
          {
            id: "bioimmunity",
            title: "Bioimmunity(Max +3)",
            tooltip: {
              content: "Bioimmunity.",
            },
            points: 3,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "paraImmunity",
    title: "Immunity(PARA)",
    tooltip: {
      content: "Provides immunity to PARA ammunition.",
    },
    points: 1,
    children: [
      {
        id: "stunImmunity",
        title: "Immunity(STUN)",
        tooltip: {
          content: "Provides immunity to STUN ammunition.",
        },
        points: 2,
        children: [
          {
            id: "emImmunity",
            title: "Immunity(E/M)",
            tooltip: {
              content: "Provides immunity to E/M ammunition.",
            },
            points: 2,
            children: [
              {
                id: "stateDeadImmunity",
                title: "Immunity(State: Dead)",
                tooltip: {
                  content: "Provides immunity to State: ARM=0 ammunition.",
                },
                points: 2,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const btsSkills: Dictionary<Mod[]> = {
  "critImmunity": [new SkillMod("Immunity", new DefaultMod("Crit"))],
  "viralImmunity": [new SkillMod("Immunity", new DefaultMod("Viral"))],
  "bioimmunity": [new SkillMod("Bioimmunity(Max +3)")],
  "paraImmunity": [new SkillMod("Immunity", new DefaultMod("PARA"))],
  "stunImmunity": [new SkillMod("Immunity", new DefaultMod("STUN"))],
  "emImmunity": [new SkillMod("Immunity", new DefaultMod("E/M"))],
  "stateDeadImmunity": [new SkillMod("Immunity", new DefaultMod("State: Dead"))],
};
