import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectionService } from 'src/app/services/election/election.service';
import { Alertes } from 'src/app/util/alerte';


@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.scss']
})

export class AddElectionComponent {
    form!:FormGroup
    @Output() submit: EventEmitter<boolean> = new EventEmitter();
    @Output() search: EventEmitter<boolean> = new EventEmitter();
    @Input() electionToUpdate:any;
    @Input() isSearch: any;
    @Input() services: any;
    status = [
      {name:"AVENIR", description:"A venir"},
      {name:"ENCOURS", description:"en cours"},
      {name:"TERMINER", description:"terminer"},
      {name:"SUSPENDU", description:"suspendu"},
    ]



    constructor(private electionService:ElectionService,
      private modalElection: NgbModal,
      private fb: FormBuilder
    ) { }
  
    ngOnInit(): void {
      this.initForm()
    }

    initForm(){
      if (!this.isSearch) {
        this.form = new FormGroup(
          {
            name: new FormControl("", Validators.required),
            description: new FormControl(""),
            status: new FormControl("", Validators.required),
            dateDebut: new FormControl("", Validators.required),
            dateFin: new FormControl("", Validators.required),
            serviceId: new FormControl("", Validators.required)
          }
        );
      }else{
        this.form = new FormGroup(
          {
            name: new FormControl(""),
            description: new FormControl(""),
            status: new FormControl(""),
            dateDebut: new FormControl(""),
            dateFin: new FormControl(""),
            serviceId: new FormControl("")
          }
        );
      }
    }

    create() {
      let election = this.form.value;
      // console.log('Election',election);
      this.electionService.createElection(election).subscribe({
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
