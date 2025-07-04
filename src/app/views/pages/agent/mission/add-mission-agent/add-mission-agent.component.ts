import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissionService } from 'src/app/services/mission/mission.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-mission-agent',
  templateUrl: './add-mission-agent.component.html',
  styleUrls: ['./add-mission-agent.component.scss']
})
export class AddMissionAgentComponent {
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
   this.initForm()
  }
  initForm(){
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
    let mission = this.form.value;
    
    this.missionService.createMission(mission).subscribe({
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
