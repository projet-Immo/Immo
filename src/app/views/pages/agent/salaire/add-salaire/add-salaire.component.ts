import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-salaire',
  templateUrl: './add-salaire.component.html',
  styleUrls: ['./add-salaire.component.scss']
})
export class AddSalaireComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() salaireToUpdate:any;
  @Input() isSearch: any;
  @Input() agentId: number;
  StatutPaiement =[
    {name:'EN_ATTENTE',description:'En attente'},
    {name:'PAYE',description:'Payé'},
    {name:'RETARD',description:'En retard'},
    {name:'ANNULE',description:'Annulé'},
  ]
  constructor(private salaireService:SalaireService,
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
        montant: new FormControl("", Validators.required),
        datePaiement: new FormControl("", Validators.required),
        description: new FormControl(""),
        statutPaiement: new FormControl("", Validators.required),
        
      }
    );
    // this.form = this.fb.group({
    //   name: ["", Validators.required],
    //   lastName:["", Validators.required],
    //   address:[""],
    //   email:[""],
    //   sexe:["", Validators.required],
    //   phone:[""],
    //   dni:["" , Validators.required],
    // })
  }


  create() {
    let salaire = this.form.value;
    // console.log('Salaire',salaire);
    this.salaireService.createSalaire(salaire).subscribe({
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
  
  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}



