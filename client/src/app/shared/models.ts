export interface User {
  id?: string;
  username: string;
  password?: string;
  fullName?: string;
  role?: string[];
  accessToken?: string;
  user?: User;
}

export interface Product {
  _id?: string;
  title: string;
  titleUrl?: string;
  description: string;
  descriptionFull: string[];
  category: string[];
  regularPrice: number;
  salePrice: number;
  visibility: boolean;
  onSale: boolean;
  stock: string;
  shipping?: string;
  mainImage: { url: string; name: string };
  subImage: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _user?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedAt?: any;
}

export interface GetProducts {
  products: Product[];
  maxPrice: { salePrice: string };
  //TODO: fix type of max min Price
  minPrice: { salePrice: string };
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export interface Category {
  title?: string;
  titleUrl?: string;
  description?: string;
  visibility?: boolean;
  mainImage?: { url: string; name: string; type?: boolean };
  subCategory?: string;
  position?: number;
  menuHidden?: boolean;
}

export interface Cart {
  totalQty: number;
  totalPrice: number;
  items: {
    id?: string;
    item: Product;
    price: number;
    qty: number;
  }[];
}
