import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetingPollPageComponent} from './meeting-poll-page/meeting-poll-page.component'
import { MailForPollComponent } from './mail-for-poll/mail-for-poll.component';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';

const routes: Routes = [
  { path: '', component: MeetingPollPageComponent },
  { path: 'mailForPoll', component: MailForPollComponent },
  {path : 'thankyou', component : ThankyouPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
