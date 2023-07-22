import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsCheckComponent } from './results-check/results-check.component';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component'

const routes: Routes = [{ path: 'quiz', component:QuizSelectionComponent  },{ path: 'results', component: ResultsCheckComponent },{path: '', redirectTo: '/quiz', pathMatch: 'full'},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
