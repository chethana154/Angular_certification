import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {QuizQandansService} from '../quiz-qandans.service'

interface Category {
  id: string;
  name: string;
}
interface Results {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.css']
})

export class QuizSelectionComponent implements OnInit {
  
difficultylevel = ['easy','medium','hard']
selectedLevelselect!: string;
selectedCategory!: string;
categorylistRes!: Object;
categorylist!: Category[];
questionlistRes!: Object;
questionlist!: Results[];
submitActive: boolean= false;
selectedAnsListQ: Array<string>=[];

  

  constructor(private http: HttpClient, private router: Router, private quizservice:QuizQandansService) { }
 
  
  ngOnInit(): void {
    this.quizservice.getQueriesandAns() /*getting for category */
      .subscribe((res) => {
        this.categorylistRes= res;
        this.categorylist= Object.values(this.categorylistRes)[0]   ;
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
       this.questionlistRes= this.quizservice.questionlist;
       this.questionlist= Object.values(this.questionlistRes)[1]   ;
       this.questionlist.map((q)=>{
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
  if(this.selectedAnsListQ.length === this.questionlist.length){
    this.submitActive = true;
  }

 }

 submitRes()
 {
       this.router.navigateByUrl('/results')
 }

 
}   



