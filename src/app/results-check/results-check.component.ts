import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {QuizQandansService} from '../quiz-qandans.service'

interface Results {
  incorrectAns: boolean;
  correctAns: boolean;
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
  selectedoption?: string;
}
@Component({
  selector: 'app-results-check',
  templateUrl: './results-check.component.html',
  styleUrls: ['./results-check.component.css']
})
export class ResultsCheckComponent implements OnInit {
  

  selectedAnsR: Array<string> = [];
  questionlistRRes!: Object;
questionlistR!: Results[];
  finalAnswerListR: Array<string> = [];
  constructor(private router: Router, private quizservice:QuizQandansService) { }

  ngOnInit(): void {
    this.questionlistRRes= this.quizservice.questionlist
    this.questionlistR= Object.values(this.questionlistRRes)[1]   ;
    this.selectedAnsR=this.quizservice.selectedAnsList
  for (var i = 0; i < this.selectedAnsR.length; i++) {
    this.questionlistR[i].selectedoption = this.selectedAnsR[i]
    if(this.selectedAnsR[i] === this.questionlistR[i].correct_answer){
    this.finalAnswerListR.push(this.selectedAnsR[i]);
    this.questionlistR[i].correctAns = true
      
  }
  else if(this.questionlistR[i].incorrect_answers.includes(this.selectedAnsR[i]) && this.selectedAnsR[i] !== this.questionlistR[i].correct_answer){
   this.questionlistR[i].selectedoption = this.selectedAnsR[i]
   this.questionlistR[i].incorrectAns = true
  }
  }

  }
redirectHome(){
  this.router.navigate(['/'])
  this.selectedAnsR.length=0;
  this.finalAnswerListR.length=0;
}
}


