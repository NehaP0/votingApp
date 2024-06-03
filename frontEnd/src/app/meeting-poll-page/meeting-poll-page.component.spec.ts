import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPollPageComponent } from './meeting-poll-page.component';

describe('MeetingPollPageComponent', () => {
  let component: MeetingPollPageComponent;
  let fixture: ComponentFixture<MeetingPollPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingPollPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingPollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
