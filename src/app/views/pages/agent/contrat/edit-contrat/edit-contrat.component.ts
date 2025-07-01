import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratService } from 'src/app/services/contrat/contrat.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.scss']
})
export class EditContratComponent {
form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() contratToUpdate: any;
  @Input() isSearch: any;
  @Input() agentId: any;
  typeContrat = [
    { name: 'CDI', description: 'Contrat à Durée Indéterminée' },
    { name: 'CDD', description: 'Contrat à Durée Déterminée' },
    { name: 'STAGE', description: 'Contrat de stage' },
    { name: 'PRESTATAIRE', description: 'Contrat Prestataire' },
    { name: 'BENEVOLAT', description: 'Contrat Benevolat' }
  ]
  statusContrat = [
  { name: 'EN_COURS', description: 'Contrat en cours' },
  { name: 'Resilier', description: 'Contrat resilier' },
  { name: 'TERMINEE', description: 'Contrat TERMINEE' }
  ]
  
  constructor(private contratService: ContratService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        agentId: new FormControl(this.agentId),
        typeContrat: new FormControl(""),
        statusContrat: new FormControl("", Validators.required),
        dateFin: new FormControl(""),
        dateDebut: new FormControl("", Validators.required),
      }
      
    )
    this.loadFileds()
  }

  loadFileds() {
    if (this.contratToUpdate !== undefined) {
      this.form?.get('typeContrat')?.setValue(this.contratToUpdate?.typeContrat.name);
      this.form?.get('statusContrat')?.setValue(this.contratToUpdate.statusContrat.name);
      this.form?.get('dateDebut')?.setValue(Helper.editDate(this.contratToUpdate?.dateDebut));
      this.form?.get('dateFin')?.setValue(Helper.editDate(this.contratToUpdate?.dateFin));
    }
  }


  update() {
    let contrat = this.form.value;
    this.contratService.updateContrat(this.contratToUpdate?.id, contrat).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Modification reussi');
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
