import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private apiUrl = 'http://192.168.106.4:8001/api/warehouses';

  constructor(private http: HttpClient) {}

  getWarehouses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getWarehouseByName(name: string): Observable<any> {
    const encoded = encodeURIComponent(name);
    return this.http.get<any>(`${this.apiUrl}/${encoded}`);
  }

  // 🆕 لجلب العناصر الخاصة بالمخزن
  getItemsByWarehouseName(name: string): Observable<any[]> {
    const encoded = encodeURIComponent(name);
    return this.http.get<any[]>(`${this.apiUrl}/${encoded}/items`);
  }
}

