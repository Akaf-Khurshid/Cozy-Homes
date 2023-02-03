import { IPropertyBase } from "./Ipropertybase";

export class Property implements IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  propertyTypeId: string;
  bhk: number;
  furnishingTypeId: string;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  city: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?: string;
  image?: string;
  description?: string;
}
