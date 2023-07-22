import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultsCheckComponent } from './results-check/results-check.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizSelectionComponent,
    ResultsCheckComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
