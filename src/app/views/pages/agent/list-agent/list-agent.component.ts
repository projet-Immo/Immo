import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService} from 'src/app/services/agent/agent.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss']
})
export class ListAgentComponent implements OnInit {
  displayedColumns: string[] = [
    'prenom',
    'nom',
    'address',
    'dni',
    'sexe',
    'suivi',
    'actions'
  ];
  agentToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  agents: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private agentServices : AgentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllAgents();
  }
  getAllAgents() {
      this.agentServices.getAllAgents(this.pageOptions).subscribe(
      {
        next: response => {
          // console.log('response',response);
          
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
    this.getAllAgents();
  }

  openAddAgent(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditAgent(content: TemplateRef<any>, agent: any) {
    this.agentToUpdate = agent
    // console.log("this.agentToUpdate",this.agentToUpdate);
    
    this.openModal(content, 'lg');
  }

  DeleteAgent(agent: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Cet agent sera supprimé", () => {
      this.deleteAgent(agent);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteAgent(agent: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
    this.agentServices.deleteAgent(agent).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllAgents();
      },
    });
  })
  }
  openSuivi(agentId:any){
    this.router.navigateByUrl(`/admin/agent/suivi/${agentId}`)
    localStorage.setItem('agentId',agentId);

  }
  close(){
    this.modalService.dismissAll();
    this.getAllAgents();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllAgents();
    this.modalService.dismissAll();
  }

  voirSuivi(id: number): void {
  this.router.navigate(['/contrats', id]);
}


}
