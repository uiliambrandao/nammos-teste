export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  reference: string;
}

export interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  deliveryAddress: Address | null;
  setDeliveryAddress: (address: Address | null) => void;
}