import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';


interface User {
    emailID: string;
    events: any[];
    meetingsWtOthers: any[];
    name: string;
    password : string;
    phoneNumber : string;
    profileImage : string;
    userAvailability : object;
    voting : any[]
  }

interface UserResponse {
    user: User;
    shortId : string
  }

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private eventsArraySubject = new BehaviorSubject<object[]>([]);
  private userSubject = new BehaviorSubject<object>({});
  private shortIdSubject = new BehaviorSubject("");


  public eventsArray$ = this.eventsArraySubject.asObservable();
  public user$ = this.userSubject.asObservable();
  public shortId$ = this.shortIdSubject.asObservable();


  backendUrl = 'http://localhost:3000';  

  private headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient, private router: Router) {}


//   getUser(): Observable<UserResponse> {
//     const apiUrl = `${this.backendUrl}/user/getUserDeetsForVoting`
//     return this.httpClient.get<UserResponse>(apiUrl);
//   }

getUser(): Observable<UserResponse> {
    const apiUrl = `${this.backendUrl}/user/getUserDeetsForVoting`;
    return this.httpClient.get<UserResponse>(apiUrl).pipe(
      tap(response => {
        this.userSubject.next(response.user);
        this.shortIdSubject.next(response.shortId)

        console.log("this.UserSubject in api ", this.userSubject.value);        
        console.log("this.shortIdSubject in api ", this.userSubject.value);
            
        localStorage.setItem("userName",response.user['name'])

      })
    );
  }

  setSelectedTimes(selectedTimes:object[]){
    console.log("selectedTimes in api ",selectedTimes);
    this.eventsArraySubject.next(selectedTimes);
    // console.log("this.eventsArraySubject ", this.eventsArraySubject.value);    
  }

  
}



