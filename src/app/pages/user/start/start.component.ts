import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;


  constructor(private locationst:LocationStrategy,
     private _question:QuestionService,
     private route:ActivatedRoute
     ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid= this.route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>{
      console.log(data);
      
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error","Error in loading questions of quiz",'error');
    });
  }

  preventBackButton()
  {
    history.pushState(null, location.href);
    this.locationst.onPopState(()=>{
      history.pushState(null,location.href);
    });
  }

}
