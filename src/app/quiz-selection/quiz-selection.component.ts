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
  
difficultylevel = ['easy','medium','hard']
selectedLevelselect!: string;
selectedCategory!: string;
categorylist: any;
questionlist: any=[];
submitActive: boolean= false;
selectedAnsListQ: Array<string>=[];

  

  constructor(private http: HttpClient, private router: Router, private quizservice:QuizQandansService) { }
 
  
  ngOnInit(): void {
    this.quizservice.getQueriesandAns() /*getting for category */
      .subscribe((res) => {
        this.categorylist= res;
       
      });
      
      this.createQuiz()
  }
 
  /* get selected difficulty level*/ 
  selectdifficulty (event: Event) {
    const target= event.target as HTMLButtonElement;
    if (target){ 
      this.selectedLevelselect = target.value;
    }
    
  }
/* get selected Category of Quiz*/ 
  selectCategory (event: Event) {
    const target= event.target as HTMLButtonElement;
    if (target){ 
      this.selectedCategory = target.value;  
  }
    }
    

  /* Retrieve questions for selected category*/
  createQuiz(){
   this.http.get('https://opentdb.com/api.php?amount=5&category='+this.selectedCategory+'&difficulty='+this.selectedLevelselect+'&type=multiple')
      .subscribe(res => {
       this.quizservice.questionlist = res /*update response in service to access in results screen */
       this.questionlist= this.quizservice.questionlist
       this.questionlist.results.map((q:any)=>{
        q.incorrect_answers.push(q.correct_answer)
        q.incorrect_answers.sort(() => Math.random() - 0.5);
      });
    
  })
    
 }
  
 selectedAnswers(event:Event){
  const target= event.target as HTMLButtonElement;
  if (target){ 
    this.quizservice.selectedAnsList.push(target.value)
  }

this.selectedAnsListQ = this.quizservice.selectedAnsList
console.log('quetion len', this.questionlist.results.length)
  if(this.selectedAnsListQ.length === this.questionlist.results.length){
    this.submitActive = true;
  }

 }

 submitRes()
 {
       this.router.navigateByUrl('/results')
 }

 
}   



