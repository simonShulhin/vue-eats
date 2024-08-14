export interface ICafe {
  name: string;
  rating: string | number;
  location: string;
  price: number;
  favorite: boolean;
  description?: string;
  id?: string;
  author?: string;
}
