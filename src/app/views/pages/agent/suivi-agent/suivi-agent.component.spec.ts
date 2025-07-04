import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviAgentComponent } from './suivi-agent.component';

describe('SuiviAgentComponent', () => {
  let component: SuiviAgentComponent;
  let fixture: ComponentFixture<SuiviAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
