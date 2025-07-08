import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent {

  displayedColumns: string[] = [
    'matricul',
    'name',
    'phone',
    'poste',
    'salaire',
    // 'date_insertion',
    'serviceName',
    // 'dateFin',
    'actions'
  ];
  
  employeToUpdate:any
  pageOptions: any = { paze: 0, size: 10, sort: "DESC"};
  employes: any;
  dataSource: any;
  services: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private employeService : EmployeService,
    private serviceService : ServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllEmployes();
    this.getAllServices();
  }

  getAllEmployes() {
      this.employeService.getAllEmployes(this.pageOptions).subscribe(
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

  
  getAllServices() {
    this.serviceService.getAllServices(this.pageOptions).subscribe(
    {
      next: response => {
        this.services = response;
      },
      error: err => {
        console.log(err);
      },
    }
  )
}

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllEmployes();
  }

  openAddEmploye(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditEmploye(content: TemplateRef<any>, employe: any) {
    this.employeToUpdate = employe
    // console.log("this.employeToUpdate",this.employeToUpdate);
    
    this.openModal(content, 'lg');
  }

  DeleteEmploye(employe: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Ce employe sera supprimé", () => {
      this.deleteEmploye(employe);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteEmploye(employe: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
    this.employeService.deleteEmploye(employe).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllEmployes();
      },
    });
  })
  }


  close(){
    this.modalService.dismissAll();
    this.getAllEmployes();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    // console.log("filtres ", this.pageOptions)
    this.getAllEmployes();
    this.modalService.dismissAll();
  }
}
