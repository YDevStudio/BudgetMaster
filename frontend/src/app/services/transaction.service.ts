import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/api/transactions';
  private transactionUpdated = new Subject<void>();  // ✅ Notify changes

  constructor(private http: HttpClient) {}

  addTransaction(transaction: any, headers?: any): Observable<any> {
    return this.http.post(this.baseUrl, transaction, { headers }).pipe(
      // ✅ Notify all subscribers (Dashboard, etc.)
      tap(() => this.transactionUpdated.next())
    );
  }

  updateTransaction(id: number, transaction: any, headers?: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, transaction, { headers }); // ✅ Accept headers
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      // ✅ Notify all subscribers (Dashboard, etc.)
      tap(() => this.transactionUpdated.next())
    );
  }

  getTransactionUpdateListener() {
    return this.transactionUpdated.asObservable();
  }

  getTransactions(headers?: any): Observable<any> {
    return this.http.get(this.baseUrl, { headers });
  }
}
