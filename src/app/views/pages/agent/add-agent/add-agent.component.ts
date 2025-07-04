import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() agentToUpdate:any;
  @Input() isSearch: any;
  sexeAgent =[
    {name:'MASCULIN',description:'Masculin'},
    {name:'FEMININ',description:'Feminin'},
  ]
  constructor(private agentService:AgentService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
ngOnInit(): void {
   this.initForm()
  }
  initForm(){
    this.form = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required),
        address: new FormControl(""),
        sexe: new FormControl("", Validators.required),
        email: new FormControl(""),
        phone: new FormControl("",),
        dni: new FormControl("",Validators.required),

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
    let agent = this.form.value;
    // console.log('Agent',agent);
    this.agentService.createAgent(agent).subscribe({
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



