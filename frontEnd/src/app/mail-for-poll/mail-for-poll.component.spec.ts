import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailForPollComponent } from './mail-for-poll.component';

describe('MailForPollComponent', () => {
  let component: MailForPollComponent;
  let fixture: ComponentFixture<MailForPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailForPollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailForPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
