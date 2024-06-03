import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-mail-for-poll',
  templateUrl: './mail-for-poll.component.html',
  styleUrl: './mail-for-poll.component.css',
})
export class MailForPollComponent {
  userVal: object = {};
  shortIdVal: string = '';
  selectedTimes: object[] = [];
  nameWhoseCalendar = localStorage.getItem('userName');
  evName = localStorage.getItem('evName');
  nameBlank = false;
  emailBlank = false;

  backendUrl = 'http://localhost:3000';  


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private apiService: APIService
  ) {}

  ngOnInit() {
    

    this.apiService.user$.subscribe((user: object) => {
      this.userVal = user;
      console.log('user data:', this.userVal);
    });

    this.apiService.shortId$.subscribe((shortId: string) => {
      this.shortIdVal = shortId;
      console.log('shortId:', this.shortIdVal);
    });

    // this.eventsArraySubject.next(selectedTimes);
    this.apiService.eventsArray$.subscribe((eventsArray: object[]) => {
      this.selectedTimes = eventsArray;
      console.log('selectedTimes', this.selectedTimes);
    });
  }


  async formSubmit(formDetails:NgForm){
    if (formDetails.value.Name == '') {
      this.nameBlank = true;
    }
    if (formDetails.value.Email == '') {
      this.emailBlank = true;
    } else {
      console.log(formDetails.value.Name);
      console.log(formDetails.value.Email);
      let detailsToBePosted = {
        userVal : this.userVal,
        shortIdVal : this.shortIdVal,
        selectedTimes : this.selectedTimes,
        whoVotedEmail : formDetails.value.Email,
        whoVotedName : formDetails.value.Name
      }

      
      
      const response = await this.httpClient.post(`${this.backendUrl}/user/getUserVoteSelection`, detailsToBePosted).toPromise();
      const responseObject = response as { msg: string };
      
      console.log("response ", response);
      // {msg: 'received request'
        if(responseObject['msg'] == 'received request'){
          this.router.navigate(['thankyou'])
        }
        else{
          alert(responseObject['msg'])
        }
      
      
    }    
  }


  backButton(){
    this.router.navigate(["/"])

  }
}
