import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectionService } from 'src/app/services/election/election.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { Alertes } from 'src/app/util/alerte';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-election',
  templateUrl: './list-election.component.html',
  styleUrls: ['./list-election.component.scss']
})
export class ListElectionComponent {

  displayedColumns: string[] = [
    'name',
    'status',
    'serviceName',
    'nbrVotant',
    'nbrVote',
    'candidat',
    'dateDebut',
    'link',
    'actions'
  ];
  
  electionToUpdate:any
  pageOptions: any = { paze: 0, size: 10, sort: "DESC"};
  elections: any;
  dataSource: any;
  services: any;
  loadingIndicator = true;
  electionNumberCode = environment.electionNumberCode

  constructor(
    private modalService: NgbModal,
    private electionService : ElectionService,
    private serviceService : ServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllElections();
    this.getAllServices();
  }

  getAllElections() {
      this.electionService.getAllElections(this.pageOptions).subscribe(
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
    this.getAllElections();
  }

  openAddElection(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditElection(content: TemplateRef<any>, election: any) {
    this.electionToUpdate = election
    // console.log("this.electionToUpdate",this.electionToUpdate);
    
    this.openModal(content, 'lg');
  }

  DeleteElection(election: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Ce election sera supprimé", () => {
      this.deleteElection(election);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteElection(election: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
    this.electionService.deleteElection(election).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllElections();
      },
    });
  })
  }


  close(){
    this.modalService.dismissAll();
    this.getAllElections();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    // console.log("filtres ", this.pageOptions)
    this.getAllElections();
    this.modalService.dismissAll();
  }
}
