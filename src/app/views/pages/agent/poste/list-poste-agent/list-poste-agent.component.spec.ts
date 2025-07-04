import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPosteAgentComponent } from './list-poste-agent.component';

describe('ListPosteAgentComponent', () => {
  let component: ListPosteAgentComponent;
  let fixture: ComponentFixture<ListPosteAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPosteAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPosteAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
