import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuizQService {

  constructor(private http: HttpClient) { }

  getQueriesandAns() {
    return this.http.get('/api/users');
  }
}





