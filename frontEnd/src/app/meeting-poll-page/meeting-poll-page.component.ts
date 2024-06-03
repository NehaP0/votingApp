import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
// import { APIService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../api.service';

interface User {
  emailID: string;
  events: any[];
  meetingsWtOthers: any[];
  name: string;
  password: string;
  phoneNumber: string;
  profileImage: string;
  userAvailability: object;
  voting: any[];
}

interface UserResponse {
  user: User;
  shortId: string;
}

interface deets {
  start: string;
  end: string;
  whoVoted: number[];
  id?: string
}

interface reqDeets {
  evName: string;
  reserveTimes: boolean;
  link: string;
  location: string;
  uniqueId: string;
  details: deets[];
}

interface timeDetails {
  start: string;
  duration: number;
  date: string;
  selected?: boolean;
  id : string
}

@Component({
  selector: 'app-meeting-poll-page',
  templateUrl: './meeting-poll-page.component.html',
  styleUrl: './meeting-poll-page.component.css',
})
export class MeetingPollPageComponent implements OnInit {
  user?: User;
  name: string = '';
  shortId: string = '';
  reqDeetsObj?: reqDeets;
  dateAndTimeOfObjects: timeDetails[] = [];
  // avatar : string = ""

  backendUrl = 'http://localhost:3000';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private apiService: APIService
  ) {}

  ngOnInit(): void {
    this.apiService.getUser().subscribe({
      next: (response: UserResponse) => {
        console.log('response ', response);

        this.user = response.user;
        // this.avatar = this.user.profileImage
        this.shortId = response.shortId;
        console.log('user ', this.user);
        console.log('shortId ', this.shortId);

        this.name = this.user.name;

        let votingArr = this.user.voting;

        votingArr.find((obj) => {
          if (obj.uniqueId == this.shortId) {
            console.log('found obj ', obj);
            this.reqDeetsObj = obj;
            localStorage.setItem("evName", obj.evName)
          }
        });

        console.log('this.reqDeetsObj ', this.reqDeetsObj);

        if (this.reqDeetsObj) {
          let deetsArr = this.reqDeetsObj['details'];
          console.log('deetsArr ', deetsArr);
          for (let i = 0; i < deetsArr.length; i++) {
            let obj: any = deetsArr[i];
            let start = new Date(obj['start']);
            let end = new Date(obj['end']);

            const hours = String(start.getHours()).padStart(2, '0'); // getHours() returns 0-23
            const minutes = String(start.getMinutes()).padStart(2, '0'); // getMinutes() returns 0-59
            let startTime = `${hours}:${minutes}`;

            console.log(start, end);

            // Calculate the difference in milliseconds
            const durationInMillis = end.getTime() - start.getTime();

            // Convert milliseconds to other units if needed (e.g., seconds, minutes, hours)
            const durationInSeconds = durationInMillis / 1000;
            const durationInMinutes = durationInSeconds / 60;
            // const durationInHours = durationInMinutes / 60;
            console.log('durationInMinutes ', durationInMinutes);

            let dateVal = obj['start'].split('T')[0];
            console.log('date ', dateVal);

            let info = {
              start: startTime,
              duration: durationInMinutes,
              date: dateVal,
              selected: false, 
              id: obj['_id']
              
            };

            console.log("info ", info);
            

            this.dateAndTimeOfObjects.push(info);
          }
        }
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      },
    });
  }

  toggleSelection(index: number): void {
    this.dateAndTimeOfObjects[index].selected =
      !this.dateAndTimeOfObjects[index].selected;
  }

  onNext(): void {
    const selectedTimes = this.dateAndTimeOfObjects.filter(
      (obj) => obj.selected
    );
    console.log('Selected times:', selectedTimes);
    this.apiService.setSelectedTimes(selectedTimes);
    this.router.navigate(['mailForPoll']);

    // Here you can handle the selected times (e.g., send them to the backend)
  }
}
