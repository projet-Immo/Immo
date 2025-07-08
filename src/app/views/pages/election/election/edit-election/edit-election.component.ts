import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectionService } from 'src/app/services/election/election.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.scss']
})
export class EditElectionComponent {


  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() electionToUpdate: any;
  @Input() isSearch: any;
  @Input() services: any;

  status = [
    {name:"AVENIR", description:"A venir"},
    {name:"ENCOURS", description:"en cours"},
    {name:"TERMINER", description:"terminer"},
    {name:"SUSPENDU", description:"suspendu"},
  ]
  

  constructor(private electionService: ElectionService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        description: new FormControl(""),
        status: new FormControl("", Validators.required),
        dateDebut: new FormControl(""),
        dateFin: new FormControl(""),
        serviceId: new FormControl("", Validators.required)
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if (this.electionToUpdate !== undefined) {
      this.form?.get('name')?.setValue(this.electionToUpdate?.name);
      this.form?.get('description')?.setValue(this.electionToUpdate.description);
      this.form?.get('status')?.setValue(this.electionToUpdate?.status.name);
      this.form?.get('dateDebut')?.setValue(Helper.editDate(this.electionToUpdate?.dateDebut));
      this.form?.get('dateFin')?.setValue(Helper.editDate(this.electionToUpdate?.dateFin));
      this.form?.get('serviceId')?.setValue(this.electionToUpdate?.serviceId);
    }
  }

  update() {
    let election = this.form.value;
    // console.log('Election',election);
    this.electionService.updateElection(this.electionToUpdate?.id, election).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      },
      complete: () => {
        this.close()
      }
    })
  }

  close() {
    this.modalService.dismissAll();
  }

  doSearch() {
    this.search.emit(this.form.value)
  }

  emitSubmit() {
    this.submit.emit(true);
  }
}
