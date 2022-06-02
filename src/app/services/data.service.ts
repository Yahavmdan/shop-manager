import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Regex} from "../models/regex";

@Injectable({
  providedIn: 'root',
})
export class DataService {

  token = localStorage.getItem('token');

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  URL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {
  }

  getData() {
    return this.httpClient.get(`${this.URL}/products`);
  }

  createData(data: any) {
    return this.httpClient.post(`${this.URL}/products`, data, {
      headers: this.header,
    });
  }

  editData(id: any, data: any) {
    return this.httpClient.put(`${this.URL}/products/${id}`, data, {
      headers: this.header,
    });
  }

  getById(id: any) {
    return this.httpClient.get(`${this.URL}/products/${id}`, {
      headers: this.header,
    });
  }

  deleteData(id: any) {
    return this.httpClient.delete(`${this.URL}/products/${id}`, {
      headers: this.header,
    });
  }

  searchData(name: any) {
    return this.httpClient.get(`${this.URL}/products/search/${name}`);
  }

  createUser(data: any) {
    return this.httpClient.post(`${this.URL}/register`, data, {
      headers: this.header,
    });
  }

  logInUser(data: any) {
    return this.httpClient.post(`${this.URL}/login`, data, {
      headers: this.header,
    });
  }

  sendResetPasswordEmail(email) {
    return this.httpClient.post(`${this.URL}/send-forgot-password-email`, email);
  }

  resetPasswordForm(data) {
    return this.httpClient.post(`${this.URL}/reset-password-form`,data,{
      headers: this.header,
    });
  }
}
