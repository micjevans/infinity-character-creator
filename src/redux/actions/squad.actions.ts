import { Material } from "../reducers/characters";

export function increaseMaterial(
    materials: Material[],
    materialType: string,
  ) {
    const index: number = materials.findIndex(
      (material) => material.type === materialType
    );
    let returnMaterials: Material[] = [...materials];
    returnMaterials[index] = { ...returnMaterials[index], materials: returnMaterials[index].materials + 1 };
    return returnMaterials;
  }

  export function decreaseMaterial(
    materials: Material[],
    materialType: string,
  ) {
    const index: number = materials.findIndex(
      (material) => material.type === materialType
    );
    let returnMaterials: Material[] = [...materials];
    returnMaterials[index] = { ...returnMaterials[index], materials: returnMaterials[index].materials - 1 };
    return returnMaterials;
  }