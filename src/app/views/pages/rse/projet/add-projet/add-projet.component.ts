import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss']
})
export class AddProjetComponent {

  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() projetToUpdate:any;
  @Input() isSearch: any;
  isOldProjet=false

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

  constructor(private projetService:ProjetService,
    private modalService: NgbModal,
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
      );
    }else{
      this.form = new FormGroup(
        {
          name: new FormControl(""),
          chef_projet: new FormControl(""),
          statut_projet: new FormControl(),
          pilier_rse: new FormControl(),
          dateDebutPrevu: new FormControl(""),
          dateFinPrevu: new FormControl(""),
          dateDebutReel: new FormControl(""),
          dateFinReel: new FormControl("")
        }
      );
    }
  }

  create() {
    let projet = this.form.value;
    // console.log('Projet',projet);
    this.projetService.createProjet(projet).subscribe({
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
    this.modalService.dismissAll();
  }
  
  toggleOldCheckProjet(){
    this.isOldProjet = !this.isOldProjet
  }
  
  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}
