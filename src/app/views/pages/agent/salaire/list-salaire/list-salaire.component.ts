import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-salaire',
  templateUrl: './list-salaire.component.html',
  styleUrls: ['./list-salaire.component.scss']
})
export class ListSalaireComponent implements OnInit {
  displayedColumns: string[] = [
    'montant',
    'datePaiement',
    'description',
    'statutPaiement', 
    'actions'
  ];
  salaireToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  salaire: any;
  dataSource: any;
  loadingIndicator = true;
  @Input() agentId:number;


  constructor(
    private modalService: NgbModal,
    private salaireServices : SalaireService
  ) { }

  ngOnInit(): void {
    this.getAllSalaireAgent();
  }
  getAllSalaireAgent() {
      this.salaireServices.getAllSalairesAgent(this.agentId, this.pageOptions).subscribe(
      {
        next: (response: any) => {
          console.log('response',response);
          
          this.dataSource = response;
          this.loadingIndicator = false;
        },
        error: (err: any) => {
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
    this.getAllSalaireAgent();
  }

  openAddSalaire(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditSalaire(content: TemplateRef<any>, salaire: any) {
    this.salaireToUpdate = salaire
    // console.log("this.salaireToUpdate",this.salaireToUpdate);
    
    this.openModal(content, 'lg');
  }

  DeleteSalaire(salaire: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Cet salaire sera supprimé", () => {
      this.deleteSalaire(salaire);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteSalaire(salaire: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
    this.salaireServices.deleteSalaire(salaire).subscribe({
      next: (value: any) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value: { error: { message: string | undefined; }; }) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllSalaireAgent();
      },
    });
  })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllSalaireAgent();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllSalaireAgent();
    this.modalService.dismissAll();
  }
}
