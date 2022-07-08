import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  token = sessionStorage.getItem('token');

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  apiURL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {
  }

  storePic(data: any) {
    return this.httpClient.post(`${this.apiURL}/post-profile-image`, data, {
      headers: this.header,
    });
  }
}
