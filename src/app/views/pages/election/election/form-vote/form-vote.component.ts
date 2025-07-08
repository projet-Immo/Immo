import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectionService } from 'src/app/services/election/election.service';
import { Alertes } from 'src/app/util/alerte';
import { CandidatService } from '../../../../../services/candidat/candidat.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-vote',
  templateUrl: './form-vote.component.html',
  styleUrls: ['./form-vote.component.scss']
})
export class FormVoteComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  candidats: any;
  election: any;
  electionCode: number;
  isMatriculError : boolean = false;
  isEmployeIsService: boolean = true;
  isEmployeVoted: boolean = false;
  isVoted: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private voteService:VoteService,
    private electionService:ElectionService,
    private candidatService:CandidatService,
    private modalElection: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.electionCode = params['electionCode'];
    });
    
    this.getAllCandidatsElection()
    this.getElectionId()
    this.initForm()
  }

  initForm(){
    
      this.form = new FormGroup(
        {
          name: new FormControl("", Validators.required),
          candidatId: new FormControl("", Validators.required),
          electionId: new FormControl(this.electionCode/environment.electionNumberCode)
        }
      );
  }


  getElectionId() {
      this.electionService.getElectionId(this.electionCode/environment.electionNumberCode).subscribe(
      {
        next: response => {
          this.election = response?.payload;
        },
      }
    )
  }


  create() {
    let vote = this.form.value;
    console.log('vote',vote);
    
    this.voteService.getVoteEmployeElection(vote.name, vote.electionId).subscribe({
      next:(response) =>{
        console.log("employe vote", response?.payload)
        switch (response?.payload) {
          case -1:
            this.isMatriculError = true
            break;

          case 2:
            this.isEmployeIsService = false
            break;

          case 0:
            this.voteService.createVote(vote).subscribe({
              next:(data) =>{
                this.isVoted = true;
              }, 
              error:(error)=>{
                Alertes.alerteAddDanger(error.error.message)
              },
              complete:()=>{
                this.close()
              }
            })
            break;
          
          case 1:
            this.isEmployeVoted = true
            break;

          default:
            alert("error")
            break;
        }
      },
    })

    // this.voteService.createVote(vote).subscribe({
    //   next:(data) =>{
    //   },
    //   error:(error)=>{
    //     Alertes.alerteAddDanger(error.error.message)
    //   },
    //   complete:()=>{
    //     this.close()
    //   }
    // })
  }

  
  getAllCandidatsElection() {
    this.candidatService.getAllCandidatsElection(this.electionCode/environment.electionNumberCode).subscribe(
    {
      next: response => {
        console.log("candidats", response)
        this.candidats = response;
      },
    }
  )
}


  close(){
    this.modalElection.dismissAll();
  }
  
  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}
