import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent {
  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() agentToUpdate: any;
  @Input() isSearch: any;
  sexeAgent = [
    { name: 'MASCULIN', description: 'Masculin' },
    { name: 'FEMININ', description: 'Feminin' },
  ]
  constructor(private agentService: AgentService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required),
        address: new FormControl(""),
        sexe: new FormControl("", Validators.required),
        email: new FormControl(""),
        phone: new FormControl("",),
        dni: new FormControl("", Validators.required),
      }
    )
    this.loadFileds()
  }
  loadFileds() {
    if (this.agentToUpdate !== undefined) {
      this.form?.get('name')?.setValue(this.agentToUpdate?.name);
      this.form?.get('lastName')?.setValue(this.agentToUpdate.lastName);
      this.form?.get('address')?.setValue(this.agentToUpdate.address);
      this.form?.get('email')?.setValue(this.agentToUpdate?.email);
      this.form?.get('phone')?.setValue(this.agentToUpdate?.phone);
      this.form?.get('dni')?.setValue(Helper.editDate(this.agentToUpdate?.dni));
      this.form?.get('sexe')?.setValue(this.agentToUpdate?.sexe?.name);
    }
  }


  update() {
    let agent = this.form.value;
    // console.log('Agent',agent);
    this.agentService.updateAgent(this.agentToUpdate?.id, agent).subscribe({
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



