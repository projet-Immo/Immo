import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPosteAgentComponent } from './add-poste-agent.component';

describe('AddPosteAgentComponent', () => {
  let component: AddPosteAgentComponent;
  let fixture: ComponentFixture<AddPosteAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPosteAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPosteAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
