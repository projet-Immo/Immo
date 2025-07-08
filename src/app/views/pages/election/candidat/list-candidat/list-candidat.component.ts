import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { ElectionService } from 'src/app/services/election/election.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-candidat',
  templateUrl: './list-candidat.component.html',
  styleUrls: ['./list-candidat.component.scss']
})
export class ListCandidatComponent {

  displayedColumns: string[] = [
    'name',
    'electionName',
    'nbrVote',
    'date_postule',
    // 'dateFin',
    'actions'
  ];
  
  candidatToUpdate:any
  pageOptions: any = { paze: 0, size: 10, sort: "DESC"};
  candidats: any;
  dataSource: any;
  elections: any;
  loadingIndicator = true;

  constructor(
    private modalElection: NgbModal,
    private candidatService : CandidatService,
    private electionService : ElectionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllCandidats();
    this.getAllElections();
  }

  getAllCandidats() {
      this.candidatService.getAllCandidats(this.pageOptions).subscribe(
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

  
  getAllElections() {
    this.electionService.getAllElections(this.pageOptions).subscribe(
    {
      next: response => {
        this.elections = response;
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
    this.getAllCandidats();
  }

  openAddCandidat(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditCandidat(content: TemplateRef<any>, candidat: any) {
    this.candidatToUpdate = candidat
    // console.log("this.candidatToUpdate",this.candidatToUpdate);
    
    this.openModal(content, 'lg');
  }

  DeleteCandidat(candidat: any) {
    Alertes.confirmAction("Voulez-vous supprimer ?", "Ce candidat sera supprimé", () => {
      this.deleteCandidat(candidat);
    })
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalElection.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteCandidat(candidat: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
    this.candidatService.deleteCandidat(candidat).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllCandidats();
      },
    });
  })
  }


  close(){
    this.modalElection.dismissAll();
    this.getAllCandidats();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    // console.log("filtres ", this.pageOptions)
    this.getAllCandidats();
    this.modalElection.dismissAll();
  }
}
