import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-rse-list-projet',
  templateUrl: './rse-list-projet.component.html',
  styleUrls: ['./rse-list-projet.component.scss']
})
export class RseListProjetComponent {
  displayedColumns: string[] = [
    'name',
    'chef_projet',
    'budget_previsionnel',
    'pilier_rse',
    'dateDebutPrevu',
    'dateFinPrevu',
    'suivi',
    'actions'
  ];
  
  projetToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  projets: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private projetServices : ProjetService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllProjets();
  }

  getAllProjets() {
      this.projetServices.getAllProjets(this.pageOptions).subscribe(
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
    this.getAllProjets();
  }

  openAddProjet(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditProjet(content: TemplateRef<any>, projet: any) {
    this.projetToUpdate = projet
    // console.log("this.projetToUpdate",this.projetToUpdate);
    
    this.openModal(content, 'lg');
  }

  DeleteProjet(projet: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Ce projet sera supprimé", () => {
      this.deleteProjet(projet);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteProjet(projet: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
    this.projetServices.deleteProjet(projet).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllProjets();
      },
    });
  })
  }

  openSuivi(projet:any){
    console.log("projet:", projet)
    this.router.navigateByUrl(`/admin/rse/projet/${projet?.name}`)
  }

  close(){
    this.modalService.dismissAll();
    this.getAllProjets();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllProjets();
    this.modalService.dismissAll();
  }

  voirSuivi(id: number): void {
  this.router.navigate(['/contrats', id]);
}

}
