import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuizQandansService {
  questionlist!: Object;
  selectedAnsList: Array<string> = [];
  constructor(private http: HttpClient) { }

  getQueriesandAns() {
    return this.http.get('https://opentdb.com/api_category.php');
  }
}

