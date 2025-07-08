import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/services/service/service.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.scss']
})
export class ListServiceComponent {

  displayedColumns: string[] = [
    'name',
    'description',
    'nbrEmploe',
    'date_creation',
    'actions'
  ];
  
  serviceToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  services: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private serviceServices : ServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
      this.serviceServices.getAllServices(this.pageOptions).subscribe(
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
    this.getAllServices();
  }

  openAddService(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditService(content: TemplateRef<any>, service: any) {
    this.serviceToUpdate = service
    // console.log("this.serviceToUpdate",this.serviceToUpdate);
    
    this.openModal(content, 'lg');
  }

  DeleteService(service: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Ce service sera supprimé", () => {
      this.deleteService(service);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteService(service: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
    this.serviceServices.deleteService(service).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllServices();
      },
    });
  })
  }


  close(){
    this.modalService.dismissAll();
    this.getAllServices();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllServices();
    this.modalService.dismissAll();
  }

  voirSuivi(id: number): void {
    this.router.navigate(['/contrats', id]);
  }

}
