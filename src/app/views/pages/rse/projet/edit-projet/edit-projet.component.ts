import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.scss']
})
export class EditProjetComponent {

  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() projetToUpdate: any;
  @Input() isSearch: any;
  
  pilierRse =[
    {name:'ENVIRONNEMENTAL',description:'Environnement'},
    {name:'SOCIAL',description:'Social'},
    {name:'ECONOMIQUE',description:'Economie'},
    {name:'GOUVERNANCE',description:'Gouvernance'},
  ]
  statutProjet =[
    {name:'PLANIFIER',description:'Planifier'},
    {name:'ENCOURS',description:'En cours'},
    {name:'TERMINER',description:'Terminer'},
    {name:'SUSPENDU',description:'Suspendu'},
  ]


  constructor(private projetService: ProjetService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        chef_projet: new FormControl("", Validators.required),
        description: new FormControl(""),
        budget_previsionnel: new FormControl("", Validators.required),
        statut_projet: new FormControl("",),
        pilier_rse: new FormControl("",Validators.required),
        dateDebutPrevu: new FormControl("",Validators.required),
        dateFinPrevu: new FormControl("",Validators.required),
        dateDebutReel: new FormControl(""),
        dateFinReel: new FormControl(""),
      }
    )
    this.loadFileds()
  }

  loadFileds() {
    if (this.projetToUpdate !== undefined) {
      this.form?.get('name')?.setValue(this.projetToUpdate?.name);
      this.form?.get('chef_projet')?.setValue(this.projetToUpdate.chef_projet);
      this.form?.get('description')?.setValue(this.projetToUpdate.description);
      this.form?.get('budget_previsionnel')?.setValue(this.projetToUpdate?.budget_previsionnel);
      this.form?.get('statut_projet')?.setValue(this.projetToUpdate?.statut_projet?.name);
      this.form?.get('pilier_rse')?.setValue(this.projetToUpdate?.pilier_rse?.name);
      this.form?.get('dateDebutPrevu')?.setValue(Helper.editDate(this.projetToUpdate?.dateDebutPrevu));
      this.form?.get('dateFinPrevu')?.setValue(Helper.editDate(this.projetToUpdate?.dateFinPrevu));
      this.form?.get('dateDebutReel')?.setValue(Helper.editDate(this.projetToUpdate?.dateDebutReel));
      this.form?.get('dateFinReel')?.setValue(Helper.editDate(this.projetToUpdate?.dateFinReel));
    }
  }

  update() {
    let projet = this.form.value;
    // console.log('Projet',projet);
    this.projetService.updateProjet(this.projetToUpdate?.id, projet).subscribe({
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
