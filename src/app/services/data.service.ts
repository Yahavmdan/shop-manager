import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  token = sessionStorage.getItem('token');

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  apiURL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {
  }

  getData() {
    return this.httpClient.get(`${this.apiURL}/products`);
  }

  createData(data: any) {
    return this.httpClient.post(`${this.apiURL}/products`, data, {
      headers: this.header,
    });
  }

  editData(id: any, data: any) {
    return this.httpClient.put(`${this.apiURL}/products/${id}`, data, {
      headers: this.header,
    });
  }

  getById(id: any) {
    return this.httpClient.get(`${this.apiURL}/products/${id}`, {
      headers: this.header,
    });
  }

  deleteData(id: any) {
    return this.httpClient.delete(`${this.apiURL}/products/${id}`, {
      headers: this.header,
    });
  }

  searchData(searchValue: string | number) {
    return this.httpClient.get(`${this.apiURL}/products/search/${searchValue}`);
  }

  /// User Data routes ///

  getUsersData() {
    return this.httpClient.get(`${this.apiURL}/users`, {
      headers: this.header,
    });
  }


  deleteUserData(id: any) {
    return this.httpClient.delete(`${this.apiURL}/users/${id}`, {
      headers: this.header,
    });
  }

  searchUserData(searchValue: string | number) {
    return this.httpClient.get(`${this.apiURL}/users/search/${searchValue}`, {
      headers: this.header,
    });
  }

  editUserData(id: any, data: any) {
    return this.httpClient.put(`${this.apiURL}/users/${id}`, data, {
      headers: this.header,
    });
  }

  getUserById(id: any) {
    return this.httpClient.get(`${this.apiURL}/users/${id}`, {
      headers: this.header,
    });
  }
}
