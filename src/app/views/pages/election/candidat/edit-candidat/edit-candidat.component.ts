import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { ElectionService } from '../../../../../services/election/election.service';
import { EmployeService } from 'src/app/services/employe/employe.service';

@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.scss']
})
export class EditCandidatComponent {


  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() candidatToUpdate: any;
  @Input() isSearch: any;
  @Input() elections: any;
  @Input() candidats: any;
  pageOptions: any = { paze: 0, size: 10, sort: "DESC"};

  status = [
    {name:"AVENIR", description:"A venir"},
    {name:"ENCOURS", description:"en cours"},
    {name:"TERMINER", description:"terminer"},
    {name:"SUSPENDU", description:"suspendu"},
  ]
  dataSource: any;
  loadingIndicator: boolean;
  

  constructor(
    private candidatService: CandidatService,
    private electionService: ElectionService,
    private employeService: EmployeService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup(
      {
        candidatId: new FormControl("", Validators.required),
        description: new FormControl(""),
        electionId: new FormControl("", Validators.required),
        date_postule: new FormControl("", Validators.required),
      }
    );
    this.loadFileds()
    this.getAllElections()
    this.getAllEmployes()
  }

  loadFileds() {
    if (this.candidatToUpdate !== undefined) {
      this.form?.get('candidatId')?.setValue(this.candidatToUpdate?.candidatId);
      this.form?.get('description')?.setValue(this.candidatToUpdate.description);
      this.form?.get('electionId')?.setValue(this.candidatToUpdate?.electionId);
      this.form?.get('date_postule')?.setValue(Helper.editDate(this.candidatToUpdate?.date_postule));
    }
  }

  update() {
    let candidat = this.form.value;
    // console.log('Candidat',candidat);
    this.candidatService.updateCandidat(this.candidatToUpdate?.id, candidat).subscribe({
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
