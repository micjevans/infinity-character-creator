import { Dictionary } from "@reduxjs/toolkit";
import { InfinitySkill } from "../infinitySkills";
import { AttributeMod, Mod, SkillMod } from "../mods";
import { Attribute } from "../profile";
import { NameMod } from "../subMods";

export const physiqueData: InfinitySkill[] = [
  {
    id: "physicalTraining",
    title: "Physical Training",
    tooltip: {
      content: "Increases PH by 1.",
    },
    points: 2,
    children: [
      {
        id: "cardio",
        title: "Cardio",
        tooltip: {
          content: "Increases second move value by 2.",
        },
        points: 2,
        children: [
          {
            id: "climbingPlus",
            title: "Climbing Plus",
            tooltip: {
              content: "Climbing Plus.",
            },
            points: 2,
            children: [
              {
                id: "dogged",
                title: "Dogged",
                tooltip: {
                  content: "Dogged.",
                },
                points: 2,
                children: [
                  {
                    id: "nwi",
                    title: "No Wound Incapacitation",
                    tooltip: {
                      content: "No Wound Incapacitation.",
                    },
                    points: 2,
                    mods: [
                      new SkillMod(
                        "Ferocity",
                        new NameMod(
                          "No Wound Incapacitation",
                          2
                        )
                      ),
                    ],
                    children: [
                      {
                        id: "regeneration",
                        title: "Regeneration",
                        tooltip: {
                          content: "Regeneration.",
                        },
                        points: 3,
                        children: [
                          {
                            id: "stalwart",
                            title: "Stalwart",
                            tooltip: {
                              content: "Increases wounds by 1.",
                            },
                            points: 3,
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "remotePresence",
        title: "Remote Presence",
        tooltip: {
          content: "Remote Presence.",
        },
        points: 3,
        children: [
          {
            id: "powerLegs",
            title: "Power Legs",
            tooltip: {
              content: "Increases first move value by 2.",
            },
            points: 3,
            children: [
              {
                id: "superJump",
                title: "Super Jump",
                tooltip: {
                  content: "Super Jump",
                },
                points: 2,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "impetuous",
        title: "Impetuous",
        tooltip: {
          content: "Makes the trooper impetuous.",
        },
        points: 3,
        children: [
          {
            id: "cukooVirus",
            title: "Cukoo Virus",
            tooltip: {
              content:
                "When a wound is taken, change into a Dog-Warrior(+1 PH, +1 ARM, S5). Gain Vulnerability(Viral).",
            },
            points: 3,
            children: [
              {
                id: "virusProgression",
                title: "Virus Progression",
                tooltip: {
                  content:
                    "When a wound is taken, change into a Dog-Warrior(+2 CC, +2 PH, +1 ARM, S6). Gain Vulnerability(Viral).",
                },
                points: 2,
                children: [
                  {
                    id: "dogWarrior",
                    title: "Dog-Warrior",
                    tooltip: {
                      content:
                        "Become a Dog-Warrior(+2 CC, +2 PH, +1 ARM, S6).",
                    },
                    points: 2,
                    children: [
                      {
                        id: "bearpodian",
                        title: "Bearpodian",
                        tooltip: {
                          content:
                            "Become a Bearpode(+1 CC, +1 PH, +1 ARM, S6).",
                        },
                        points: 3,
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "frenzy",
            title: "Frenzy",
            tooltip: {
              content: "Frenzy.",
            },
            points: 3,
            children: [],
          },
        ],
      },
    ],
  },
];

export const physiqueSkills: Dictionary<Mod[]> = {
  "physicalTraining": [new AttributeMod(Attribute.PH, 1)],
  "cardio": [new AttributeMod(Attribute.MOVE2, 2)],
  "climbingPlus": [new SkillMod("Climbing Plus")],
  "dogged": [
    new SkillMod(
      "Ferocity",
      new NameMod("Dogged", 1)
    ),
  ],
  "nwi": [
    new SkillMod(
      "Ferocity",
      new NameMod(
        "No Wound Incapacitation",
        2
      )
    ),
  ],
  "regeneration": [new SkillMod("Regeneration")],
  "stalwart": [new AttributeMod(Attribute.W, 1)],
  "remotePresence": [new SkillMod("Remote Presence")],
  "powerLegs": [new AttributeMod(Attribute.MOVE1, 2)],
  "superJump": [new SkillMod("Super Jump")],
  "impetuous": [
    new SkillMod(
      "Impetuous",
      new NameMod("Impetuous", 1)
    ),
  ],
  "cukooVirus": [
    new SkillMod(
      "Transmutation",
      new NameMod(
        "Transmutation(1W Lost, (+1 PH, +1 ARM, S5)",
        1
      )
    ),
    new SkillMod("Vulnerability(Viral)"),
  ],
  "virusProgression": [
    new SkillMod(
      "Transmutation",
      new NameMod(
        "Transmutation(1W Lost, (+2 CC, +2 PH, +1 ARM, S6)",
        2
      )
    ),
  ],
  "dogWarrior": [
    new SkillMod("Transmutation", new NameMod("", 3)),
    new AttributeMod(Attribute.PH, 2),
    new AttributeMod(Attribute.CC, 2),
    new AttributeMod(Attribute.ARM, 1),
    new AttributeMod(Attribute.S, 4),
  ],
  "bearpodian": [
    new AttributeMod(Attribute.CC, 1),
    new AttributeMod(Attribute.ARM, 1),
  ],
};
