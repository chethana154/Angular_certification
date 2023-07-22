import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {QuizQandansService} from '../quiz-qandans.service'


@Component({
  selector: 'app-results-check',
  templateUrl: './results-check.component.html',
  styleUrls: ['./results-check.component.css']
})
export class ResultsCheckComponent implements OnInit {
  

  score: any;
  categorySelected: any;
  selectedAnsR: any=[];
  selectedLevel: any;
  questionListR:  any=[];
  finalAnswerListR: any=[];
  x:any;
  arrayRes: any;
  arrayRes1: any;
  arrayRes2: any;
  correctAns: any=[];
  incorrect:any=[];
  error:any=[];
  correctopt=false;
  incorrectopt=false;
  colorOPt:any;

  constructor(private router: Router, private quizservice:QuizQandansService) { }

  ngOnInit(): void {
    this.questionListR= this.quizservice.questionlist
    this.selectedAnsR=this.quizservice.selectedAnsList
    for(let key of Object.keys(this.questionListR))
    {
      this.arrayRes = this.questionListR[key]
      for(let key1 of Object.keys(this.arrayRes))
      {
        this.arrayRes1=this.arrayRes[key1]
      }
     
    }
   
  for (var i = 0; i < this.selectedAnsR.length; i++) {
    this.questionListR.results[i].selectedoption = this.selectedAnsR[i]
    if(this.selectedAnsR[i] === this.questionListR.results[i].correct_answer){
    this.finalAnswerListR.push(this.selectedAnsR[i]);
    this.questionListR.results[i].correctAns = true
    this.questionListR.score = this.finalAnswerListR.length   
  }
  else if(this.questionListR.results[i].incorrect_answers.includes(this.selectedAnsR[i]) && this.selectedAnsR[i] !== this.questionListR.results[i].correct_answer){
   this.questionListR.results[i].selectedoption = this.selectedAnsR[i]
   this.questionListR.results[i].incorrectAns = true
  }
  }

  }
redirectHome(){
  this.router.navigate(['/'])
  this.selectedAnsR.length=0;
  this.finalAnswerListR.length=0;
}
}


