import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContratService } from 'src/app/services/contrat/contrat.service';
import { AddContratComponent } from '../add-contrat/add-contrat.component';

@Component({
  selector: 'app-contrat-detail',
  templateUrl: './contrat-detail.component.html',
  styleUrls: ['./contrat-detail.component.scss']
})
export class ContratDetailComponent implements OnInit {
  agentId!: number;
  contrats: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.agentId = +params.get('id')!;
      this.loadContrats();
    });
  }

  loadContrats(): void {
    this.contratService.getContratsByAgent(this.agentId).subscribe({
      next: (data) => this.contrats = data,
      error: (err) => console.error(err)
    });
  }

  openAddContrat(): void {
    const dialogRef = this.dialog.open(AddContratComponent, {
      width: '600px',
      data: { agentId: this.agentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadContrats();
      }
    });
  }
}
