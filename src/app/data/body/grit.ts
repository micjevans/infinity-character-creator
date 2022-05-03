import { Dictionary } from "@reduxjs/toolkit";
import { InfinitySkill } from "../infinitySkills";
import { Mod, SkillMod } from "../mods";
import { DefaultMod } from "../subMods";

export const gritData: InfinitySkill[] = [
  {
    id: "shockImmunity",
    title: "Immunity(Shock)",
    tooltip: {
      content: "Provides immunity to shock ammunition.",
    },
    points: 1,
    children: [
      {
        id: "continuousImmunity",
        title: "Immunity(Continuous)",
        tooltip: {
          content: "Provides immunity to continuous ammunition.",
        },
        points: 2,
        children: [
          {
            id: "t2Immunity",
            title: "Immunity(T2)",
            tooltip: {
              content: "Provides immunity to T2 ammunition.",
            },
            points: 2,
            children: [
              {
                id: "apImmunity",
                title: "Immunity(AP)",
                tooltip: {
                  content: "Provides immunity to AP ammunition.",
                },
                points: 2,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "daImmunity",
        title: "Immunity(DA)",
        tooltip: {
          content: "Provides immunity to DA ammunition.",
        },
        points: 2,
        children: [
          {
            id: "expImmunity",
            title: "Immunity(EXP)",
            tooltip: {
              content: "Provides immunity to EXP ammunition.",
            },
            points: 2,
            children: [
              {
                id: "arm0Immunity",
                title: "Immunity(State: ARM=0)",
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

export const gritSkills: Dictionary<Mod[]> = {
  "shockImmunity": [new SkillMod("Immunity", new DefaultMod("Shock"))],
  "continuousImmunity": [new SkillMod("Immunity", new DefaultMod("Continuous"))],
  "t2Immunity": [new SkillMod("Immunity", new DefaultMod("T2"))],
  "apImmunity": [new SkillMod("Immunity", new DefaultMod("AP"))],
  "daImmunity": [new SkillMod("Immunity", new DefaultMod("DA"))],
  "expImmunity": [new SkillMod("Immunity", new DefaultMod("EXP"))],
  "arm0Immunity": [new SkillMod("Immunity", new DefaultMod("State: Arm=0"))],
};