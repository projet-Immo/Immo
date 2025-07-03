import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../../../services/activity/activity.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {

  displayedColumns: string[] = [
    'intitule',
    'type',
    'date',
    'status'
  ];
  
  pageOptions: any = { paze: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private activityService : ActivityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllActivities();
  }

  getAllActivities() {
      this.activityService.getAllActivities(this.pageOptions).subscribe(
      {
        next: (response: any) => {
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
    this.getAllActivities();
  }

}
