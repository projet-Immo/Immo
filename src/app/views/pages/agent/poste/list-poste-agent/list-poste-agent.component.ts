import { Component, Input, TemplateRef } from '@angular/core';
import { PosteService } from 'src/app/services/poste/poste.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-poste-agent',
  templateUrl: './list-poste-agent.component.html',
  styleUrls: ['./list-poste-agent.component.scss']
})
export class ListPosteAgentComponent {
  @Input() agentId:number;

  displayedColumns: string[] = [
    'name',
    'service',
    'lieu',
    'occupation',
    'actions'
  ];
  posteToUpdate:any
  pageOptions: any = { page: 0, size: 10 };
  postes: any;
  dataSource: any;
  loadingIndicator = true;

  
  constructor(
    private modalService: NgbModal,
    private posteService : PosteService
  ) { }

  ngOnInit(): void {
    this.getAllPostesAgent();
  }

  getAllPostesAgent() {
    this.posteService.getAllPostesAgent(this.agentId,this.pageOptions).subscribe(
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
    this.getAllPostesAgent();
  }

  
  openAddPoste(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditPoste(content: TemplateRef<any>, poste: any) {
    this.posteToUpdate = poste
    this.openModal(content, 'lg');
  }

  DeletePoste(poste: any) {
    Alertes.confirmAction("Voulez-vous vraiment supprimer ce poste ?", "Ce poste sera supprimé", () => {
      this.deletePoste(poste);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deletePoste(poste: any) {
    Alertes.confirmAction(
      `Voulez-vous vraiment supprimé ce poste ?`,
      'Cet element sera definitivement supprimé',
      () => {
    this.posteService.deletePoste(poste).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllPostesAgent();
      },
    });
  })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllPostesAgent();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllPostesAgent();
    this.modalService.dismissAll();
  }

}
