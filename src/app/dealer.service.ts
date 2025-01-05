import { Injectable } from '@angular/core';
import { Dealer } from './dealers/dealer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  private apiUrl = 'http://localhost:3000/dealers';

  constructor(private http: HttpClient) { }

  // Get all dealers
  getDealers() {
    return this.http.get<Dealer[]>(this.apiUrl);
  }

  // Add a new dealer
  addDealer(dealer: Dealer) {
    return this.http.post<Dealer>(this.apiUrl, dealer);
  }

  // get a dealer by id
  getDealerById(id: any) {
    return this.http.get<Dealer>(`${this.apiUrl}/${id
      }`);
  }

  // Update a dealer
  updateDealer(id: any, updatedDealer: Dealer) {
    return this.http.put<Dealer>(`${this.apiUrl}/${id}`, updatedDealer);
  }

  // Delete a dealer
  deleteDealer(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
