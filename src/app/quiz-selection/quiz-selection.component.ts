import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {QuizQandansService} from '../quiz-qandans.service'


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.css']
})
export class QuizSelectionComponent implements OnInit {
  [x: string]: any;

difficultylevel = ['easy','medium','hard']
selectedLevelselect: any;
selectedCategory: any;
categorylist: any= []; 
questionlist: any=[];
submitActive= false;
selectedAnsListQ: any=[];

  

  constructor(private http: HttpClient, private router: Router, private quizservice:QuizQandansService) { }
 
  
  ngOnInit(): void {
    this.quizservice.getQueriesandAns() /*getting for category */
      .subscribe(res => {
        this.categorylist= res
      });
      
      this.createQuiz()
  }
 
  /* get selected difficulty level*/ 
  selectdifficulty (event: any) {
    this.selectedLevelselect = event.target.value;
  }
/* get selected Category of Quiz*/ 
  selectCategory (event: any) {
    this.selectedCategory = event.target.value;  
  }

  /* Retrieve questions for selected category*/
  createQuiz(){
   this.http.get('https://opentdb.com/api.php?amount=5&category='+this.selectedCategory+'&difficulty='+this.selectedLevelselect+'&type=multiple')
      .subscribe(res => {
       this.quizservice.questionlist = res /*update response in service to access in results screen */
       this.questionlist= this.quizservice.questionlist
       this.questionlist.results.map((q: any)=>{
        q.incorrect_answers.push(q.correct_answer)
        q.incorrect_answers.sort(() => Math.random() - 0.5);
      });
  })
    
 }
  
 selectedAnswers(event:any){
  console.log('chec', event.checked)
this.quizservice.selectedAnsList.push(event.target.value)
this.selectedAnsListQ = this.quizservice.selectedAnsList
console.log('length', this.selectedAnsListQ.length)
  if(this.selectedAnsListQ.length === 5){
    this.submitActive = true;
  }

 }

 submitRes()
 {
       this.router.navigateByUrl('/results')
 }

 
}   



