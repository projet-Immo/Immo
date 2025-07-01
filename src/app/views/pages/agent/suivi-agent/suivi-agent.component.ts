import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from 'src/app/services/agent/agent.service';

@Component({
  selector: 'app-suivi-agent',
  templateUrl: './suivi-agent.component.html',
  styleUrls: ['./suivi-agent.component.scss'],
 
})

export class SuiviAgentComponent {
  agenId!: number;
  option: number = 2;
  agent : any;

  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private agentServices : AgentService){}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.agenId = params['agentId'];
    });

    this.getAgent()
  }

  
  getAgent() {
      this.agentServices.getAgentId(this.agenId).subscribe(
      {
        next: response => {
          this.agent = response.payload;
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

}


