import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Agent } from 'http';
import { AgentService } from 'src/app/services/agent/agent.service';
import { ContratService, Contrat } from 'src/app/services/contrat/contrat.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss']
})
export class ListContratComponent implements OnInit {
  displayedColumns: string[] = [
    'typeContrat',
    'dateDebut',
    'dateFin',
    'statusContrat',
    'agent',
    'actions'
  ];

  @Input() agentId:any;

  contratToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  contrats: any;
  dataSource: any;
  loadingIndicator = true;
  agentNomComplet: any;


  constructor(
    private modalService: NgbModal,
    private contratService: ContratService,
    private agentService: AgentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.getAllContrats();
      this.getAgentById();
  }
  
   getAgentById(): void {
    if (this.agentId) {
      this.agentService.getAgentId(this.agentId).subscribe({
        next: (response: any) => {
          console.log("Réponse brute getById :", response);
                  const agent = response.payload;


          this.agentNomComplet = `${agent.name} ${agent.lastName}`;
          console.log("Agent connecté :", this.agentNomComplet);
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de l'agent :", err);
        }
      });
    }
  }

  

  cleanFilters(filters: any): any {
  const clean: any = {};
  for (const key in filters) {
    if (filters[key] !== null && filters[key] !== '' && filters[key] !== undefined) {
      clean[key] = filters[key];
    }
  }
  return clean;
}

  getAllContrats() {
    this.contratService.getAllContratsAgent(this.agentId, this.pageOptions).subscribe({
      next: response => {
        console.log('response', response);
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
    });
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllContrats();
  }

  openAddContrat(content: TemplateRef<any>,contrat?:any) {
    this.contratToUpdate=contrat
    this.openModal(content, 'lg');
  }

  openEditContrat(content: TemplateRef<any>, contrat: any) {
    this.contratToUpdate = contrat;
    this.openModal(content, 'lg');
  }

  deleteContrat(contrat: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Ce contrat sera supprimé", () => {
      this.contratService.delete(contrat.id).subscribe({
        next: (value) => {
          Alertes.alerteAddSuccess('Suppression réussie');
        },
        error: (value) => {
          Alertes.alerteAddDanger(value.error.message);
        },
        complete: () => {
          this.getAllContrats();
        },
      });
    });
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, { size: size, backdrop: 'static' }).result.then((result) => {
    }).catch((res) => { });
  }

  close() {
    this.modalService.dismissAll();
    this.getAllContrats();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions);
    this.getAllContrats();
    this.modalService.dismissAll();
  }
}
