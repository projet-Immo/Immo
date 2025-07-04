import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from 'src/app/services/agent/agent.service';
import { PosteService } from 'src/app/services/poste/poste.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-poste-agent',
  templateUrl: './add-poste-agent.component.html',
  styleUrls: ['./add-poste-agent.component.scss']
})
export class AddPosteAgentComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() posteToUpdate:any;
  @Input() isSearch: any;
  @Input() agentId: number;
  ocp =[
    {name:'ENCOURS',description:'En cours'},
    {name:'TERMINER',description:'Terminer'},
  ]
  constructor(private posteService:PosteService,
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
        name: new FormControl("", Validators.required),
        service: new FormControl("", Validators.required),
        lieu: new FormControl(""),
        occupation: new FormControl("", Validators.required),
        dateDebut: new FormControl("",Validators.required),
        dateFin: new FormControl("",Validators.required),
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
    let poste = this.form.value;
    
    this.posteService.createPoste(poste).subscribe({
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
