export interface IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  propertyTypeId: string;
  furnishingTypeId: string;
  price: number;
  bhk: number;
  builtArea: number;
  city: string;
  readyToMove: boolean;
  image?: string;
  estPossessionOn?: string;
}
