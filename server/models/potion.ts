export interface Potion {
  id: number;
  name: string;
  effect: string; // Renamed from 'description' to 'effect'
  numberOfCopies: number;
}
