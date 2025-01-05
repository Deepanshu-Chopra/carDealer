import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Car } from './dealers/dealer.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/dealers'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Get all cars for a specific dealer 
  getCars(dealerId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${dealerId}/cars`);
  }

  // Add a new car to a specific dealer 
  addCar(dealerId: string, car: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${dealerId}`).pipe(map(dealer => {
      dealer.cars = dealer.cars || []; dealer.cars.push(car); return dealer;

    }), switchMap(dealer => this.http.put<any>(`${this.apiUrl}/${dealerId}`, dealer)));
  }
  // Update an existing car for a specific dealer 
  updateCar(dealerId: string, car: any): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/${dealerId}`).pipe(
      map(dealer => {
        dealer.cars = dealer.cars || []; const index = dealer.cars.findIndex((c: any) => c.id === car.id);
        if (index > -1) { dealer.cars[index] = car; } return dealer;
      }), switchMap(dealer => this.http.put<any>(`${this.apiUrl}/${dealerId}`, dealer)));
  }

  // Delete a car from a specific dealer 
  deleteCar(dealerId: string, carId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${dealerId}`).pipe(map(dealer => {
      dealer.cars = dealer.cars || []; dealer.cars = dealer.cars.filter((c: any) => c.id !== carId); return dealer;
    }),
      switchMap(dealer => this.http.put<any>
        (`${this.apiUrl}/${dealerId}`, dealer))
    );
  }
}
