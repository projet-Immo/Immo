import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-salaire',
  templateUrl: './edit-salaire.component.html',
  styleUrls: ['./edit-salaire.component.scss']
})
export class EditSalaireComponent {
  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() agentId: number;
  @Input() salaireToUpdate: any;
  @Input() isSearch: any;
  statutPaiement =[
    {name:'EN_ATTENTE',description:'En attente'},
    {name:'PAYE',description:'Payé'},
    {name:'RETARD',description:'En retard'},
    {name:'ANNULE',description:'Annulé'},
  ]
  constructor(private salaireService: SalaireService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        agentId: new FormControl(this.agentId),
        montant: new FormControl("", Validators.required),
        datePaiement: new FormControl("", Validators.required),
        description: new FormControl(""),
        statutPaiement: new FormControl("", Validators.required),
      }
    )
    this.loadFileds()
  }
  loadFileds() {
    if (this.salaireToUpdate !== undefined) {
      this.form?.get('montant')?.setValue(this.salaireToUpdate?.montant);
      this.form?.get('datePaiement')?.setValue(this.salaireToUpdate.datePaiement);
      this.form?.get('description')?.setValue(this.salaireToUpdate.description);
      this.form?.get('statutPaiement')?.setValue(this.salaireToUpdate?.statutPaiement);
    }
  }


  update() {
    let salaire = this.form.value;
    // console.log('Salaire',agent);
    this.salaireService.updateSalaire(this.salaireToUpdate?.id, salaire).subscribe({
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



