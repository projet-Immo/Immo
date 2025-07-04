import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissionService } from 'src/app/services/mission/mission.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-mission-agent',
  templateUrl: './edit-mission-agent.component.html',
  styleUrls: ['./edit-mission-agent.component.scss']
})
export class EditMissionAgentComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() missionToUpdate:any;
  @Input() isSearch: any;
  @Input() agentId: number;
  status =[
    {name:'EN_ATTENTE',description:'En Attente'},
    {name:'TERMINEE',description:'Terminée'},
    {name:'EN_COURS',description:'En Cours'},
  ]
  constructor(private missionService:MissionService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup(
      {
        agentId: new FormControl(this.agentId),
        titre: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        lieu: new FormControl(""),
        dateDebut: new FormControl("",Validators.required),
        dateFin: new FormControl("",Validators.required),
        status: new FormControl("", Validators.required),
      }
    );
    
    this.loadFileds()
  }

  loadFileds() {
    if (this.missionToUpdate !== undefined) {
      this.form?.get('titre')?.setValue(this.missionToUpdate?.titre);
      this.form?.get('description')?.setValue(this.missionToUpdate.description);
      this.form?.get('lieu')?.setValue(this.missionToUpdate.lieu);
      this.form?.get('dateDebut')?.setValue(Helper.editDate(this.missionToUpdate?.dateDebut));
      this.form?.get('dateFin')?.setValue(Helper.editDate(this.missionToUpdate?.dateFin));
      this.form?.get('status')?.setValue(this.missionToUpdate?.status?.name);
    }
  }


  update() {
    let mission = this.form.value;
    // console.log('Agent',agent);
    if (mission.status != "TERMINEE") {
      mission.dateFin = new Date()
    }
    this.missionService.updateMission(this.missionToUpdate?.id, mission).subscribe({
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
