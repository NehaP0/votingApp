import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingPollPageComponent } from './meeting-poll-page/meeting-poll-page.component';
import { MailForPollComponent } from './mail-for-poll/mail-for-poll.component';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingPollPageComponent,
    MailForPollComponent,
    ThankyouPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
