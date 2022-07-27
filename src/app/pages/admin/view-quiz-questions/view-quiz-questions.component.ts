import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions=[
    {
      quesId:null,
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',


    },
  ];

  constructor(private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
        (data:any)=>{
          this.questions=data;
          console.log(this.questions);
        },
        (error)=>{
          console.log(error);
        }
      );
  }

  //delete question
  deleteQuestion(qid:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure , want to delete this question',
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            Swal.fire('Success','quiz updated !!', "success");
            this.questions=this.questions.filter((q)=>q.quesId != qid);
          },
          (error)=>{
            Swal.fire('Error','error in updating uiz!!', 'error');
            console.log(error);
          }
        )
      }
    });
  }
}
