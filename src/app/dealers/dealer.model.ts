export interface Owner {
  firstName: string;
  lastName: string;
}

export interface Location {
  latitude: string;
  longitude: string;
}

export interface Car {
  id: string;
  name: string;
  model: string;
  brand: string;
  color: string;
  price: string;
}

export interface Dealer {
  id: string;
  name: string;
  totalBudget: string;
  remainingBudget: string;
  owner: Owner;
  location: Location;
  cars: Car[];
}
