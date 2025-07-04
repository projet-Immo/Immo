// import { Router } from '@angular/router';
// import { Component, Inject, Input } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ContratService } from 'src/app/services/contrat/contrat.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-add-contrat',
//   templateUrl: './add-contrat.component.html',
//   styleUrls: ['./add-contrat.component.scss']
// })
// export class AddContratComponent {
//   contratForm: FormGroup;
// @Input() contratToUpdate:any;
//   constructor(
//     private fb: FormBuilder,
//     private contratService: ContratService,
//     private snackBar: MatSnackBar,
//   ) {
//     this.contratForm = this.fb.group({
//       type: ['', Validators.required],
//       dateDebut: ['', Validators.required],
//       dateFin: ['', Validators.required]
//     });
//   }
//   agenId:any;

//    typeContrat = [
//   { name: 'CDI', description: 'Contrat à Durée Indéterminée' },
//   { name: 'CDD', description: 'Contrat à Durée Déterminée' },
//   { name: 'Stage', description: 'Contrat de stage' },
//   { name: 'PRESTATAIRE', description: 'Contrat Prestataire' },
//   { name: 'BENEVOLAT', description: 'Contrat Benevolat' }
  
// ];
// ngOnInit() {
//  // console.log("Agent ID reçu dans le formulaire : ", this.data.agentId);
// }
// @Input() isSearch: boolean = false;  // dans add-contrat.component.ts


//   onSubmit() {
//     if (this.contratForm.valid) {
//       this.contratService.create(this.contratForm.value).subscribe(() => {
//         this.snackBar.open('Contrat ajouté avec succès', 'Fermer', { duration: 3000 });
//         this.contratForm.reset();
//       });
//     }
//   }
// }
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratService } from 'src/app/services/contrat/contrat.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.scss']
})
export class AddContratComponent {
  contratForm: FormGroup;
  //@Input() contratToUpdate:any;
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() contratToUpdate:any;
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
  constructor(private contratService:ContratService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.form = new FormGroup(
      {
        agentId: new FormControl(this.agentId),
        typeContrat: new FormControl("", Validators.required),
        dateDebut: new FormControl("", Validators.required),
        dateFin: new FormControl(""),
        statusContrat: new FormControl("", Validators.required),
      }
    );
    
  }

  create() {
    let contrat = this.form.value;
    this.contratService.createContrat(contrat).subscribe({
      next:(data) =>{
        if(data.status== 'BAD_REQUEST'){
          Alertes.alerteAddDanger(data.message)
        }
        else{
          Alertes.alerteAddSuccess('Enregistrement echec');
          this.emitSubmit()
        }
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      },
      complete:()=>{
        // this.close()
      }
    })
  }

  close(){
    this.modalService.dismissAll();
  }
  
  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}



