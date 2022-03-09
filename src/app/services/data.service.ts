import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  header = { Accept: 'application/json' };
  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get('http://localhost:8000/api/products');
  }
  createData(data: any) {
    return this.httpClient.post('http://localhost:8000/api/products', data, {
      headers: this.header,
    });
  }
  editData(id: any, data: any) {
    return this.httpClient.put(
      `http://localhost:8000/api/products/${id}`,
      data,
      {
        headers: this.header,
      }
    );
  }
  getById(id: any) {
    return this.httpClient.get(`http://localhost:8000/api/products/${id}`, {
      headers: this.header,
    });
  }
  deleteData(id: any) {
    return this.httpClient.delete(`http://localhost:8000/api/products/${id}`);
  }
  searchData(name: any) {
    return this.httpClient.get(
      `http://localhost:8000/api/products/search/${name}`
    );
  }
}
