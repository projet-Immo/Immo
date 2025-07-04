import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from 'src/app/services/agent/agent.service';
import { PosteService } from 'src/app/services/poste/poste.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-poste-agent',
  templateUrl: './edit-poste-agent.component.html',
  styleUrls: ['./edit-poste-agent.component.scss']
})
export class EditPosteAgentComponent {
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
    
    this.loadFileds()
  }

  loadFileds() {
    if (this.posteToUpdate !== undefined) {
      this.form?.get('name')?.setValue(this.posteToUpdate?.name);
      this.form?.get('service')?.setValue(this.posteToUpdate.service);
      this.form?.get('lieu')?.setValue(this.posteToUpdate.lieu);
      this.form?.get('dateDebut')?.setValue(Helper.editDate(this.posteToUpdate?.dateDebut));
      this.form?.get('dateFin')?.setValue(Helper.editDate(this.posteToUpdate?.dateFin));
      this.form?.get('occupation')?.setValue(this.posteToUpdate?.occupation?.name);
    }
  }


  update() {
    let poste = this.form.value;
    // console.log('Agent',agent);
    this.posteService.updatePoste(this.posteToUpdate?.id, poste).subscribe({
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
