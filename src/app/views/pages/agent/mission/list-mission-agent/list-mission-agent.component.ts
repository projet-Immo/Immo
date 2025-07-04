import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissionService } from 'src/app/services/mission/mission.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-list-mission-agent',
  templateUrl: './list-mission-agent.component.html',
  styleUrls: ['./list-mission-agent.component.scss']
})
export class ListMissionAgentComponent {
  @Input() agentId:number;

  displayedColumns: string[] = [
    'titre',
    'description',
    'lieu',
    'dateDebut',
    'dateFin',
    'status',
    'actions'
  ];
  missionToUpdate:any
  pageOptions: any = { page: 0, size: 10 };
  missions: any;
  dataSource: any;
  loadingIndicator = true;
  dateFormater = (date:any) => Helper.showDate(date)


  
  constructor(
    private modalService: NgbModal,
    private missionService : MissionService
  ) { }

  ngOnInit(): void {
    this.getAllMissionsAgent();
  }

  getAllMissionsAgent() {
    this.missionService.getAllMissionsAgent(this.agentId,this.pageOptions).subscribe(
      {
        next: response => {
          console.log('response',response);
          this.dataSource = response;
          this.loadingIndicator = false;
        },
        error: err => {
          console.log(err);
          this.loadingIndicator = false;
        },
        complete: () => {
          this.loadingIndicator = false;
        }
      }
    )
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllMissionsAgent();
  }

  
  openAddMission(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditMission(content: TemplateRef<any>, mission: any) {
    this.missionToUpdate = mission
    this.openModal(content, 'lg');
  }

  DeleteMission(mission: any) {
    Alertes.confirmAction("Voulez-vous vraiment supprimer cette mission ?", "Cette mission sera supprimé", () => {
      this.deleteMission(mission);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteMission(mission: any) {
    Alertes.confirmAction(
      `Voulez-vous vraiment supprimé cette mission ?`,
      'Cet element sera definitivement supprimé',
      () => {
    this.missionService.deleteMission(mission).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllMissionsAgent();
      },
    });
  })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllMissionsAgent();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllMissionsAgent();
    this.modalService.dismissAll();
  }
}
