import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }


  public addQuestion(questions:any){
    return this._http.post(`${baseUrl}/question/`,questions);
  }

  //delete question
  public deleteQuestion(questionId:any)
  {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
}
