import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { ElectionService } from 'src/app/services/election/election.service';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent {
  form!:FormGroup
    @Output() submit: EventEmitter<boolean> = new EventEmitter();
    @Output() search: EventEmitter<boolean> = new EventEmitter();
    @Input() candidatToUpdate:any;
    @Input() isSearch: any;
    elections: any;
    candidats: any;
    pageOptions: any = { paze: 0, size: 10, sort: "DESC"};

    status = [
      {name:"AVENIR", description:"A venir"},
      {name:"ENCOURS", description:"en cours"},
      {name:"TERMINER", description:"terminer"},
      {name:"SUSPENDU", description:"suspendu"},
    ]



    constructor(
      private candidatService:CandidatService,
      private electionService: ElectionService,
      private employeService: EmployeService,
      private modalCandidat: NgbModal,
      private fb: FormBuilder
    ) { }
  
    ngOnInit(): void {
      this.initForm()
      this.getAllElections()
      this.getAllEmployes()
    }

    initForm(){
      if (!this.isSearch) {
        this.form = new FormGroup(
          {
            candidatId: new FormControl("", Validators.required),
            description: new FormControl(""),
            electionId: new FormControl("", Validators.required),
            date_postule: new FormControl("", Validators.required),
          }
        );
      }else{
        this.form = new FormGroup(
          {
            candidatId: new FormControl(""),
            description: new FormControl(""),
            electionId: new FormControl(""),
            date_postule: new FormControl(""),
          }
        );
      }
    }

    create() {
      let candidat = this.form.value;
      // console.log('Candidat',candidat);
      this.candidatService.createCandidat(candidat).subscribe({
        next:(data) =>{
          Alertes.alerteAddSuccess('Enregistrement reussi');
          this.emitSubmit()
        },
        error:(error)=>{
          Alertes.alerteAddDanger(error.error.message)
        },
        complete:()=>{
          this.close()
        }
      })
    }
  

    getAllElections() {
      this.electionService.getAllElections().subscribe(
      {
        next: response => {
          // console.log('response',response);
          
          this.elections = response;
        },
      }
    )
  }

  getAllEmployes() {
    this.employeService.getAllEmployes().subscribe(
    {
      next: response => {
        // console.log('response',response);
        
        this.candidats = response;
      },
    }
  )
}





    close(){
      this.modalCandidat.dismissAll();
    }
    
    doSearch(){
      this.search.emit(this.form.value)
    }
  
    emitSubmit(){
      this.submit.emit(true);
    }
}
