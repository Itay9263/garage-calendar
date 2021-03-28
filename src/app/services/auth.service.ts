
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as moment from 'moment';
import { ICalendarEvent } from '../interfaces';
import { environment } from 'src/environments/environment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<firebase.User>;
  calendarItems: any[];

  constructor (public afAuth: AngularFireAuth) {
    this.initClient();
    this.user$ = afAuth.authState;
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')
      const gapiClientDetails = environment.gapi;
      gapi.client.init(gapiClientDetails);
      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    });



  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance()
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = auth.GoogleAuthProvider.credential(token);
    await this.afAuth.signInWithCredential(credential);

  }
  logout() {
    this.afAuth.signOut();
  }

  async insertEvents(allEvents: ICalendarEvent[]): Promise<void> {
    for (const event of allEvents) {

      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        start: {
          dateTime: moment(event.treatmentDate).add(11, "months").subtract(1, "day").toISOString(),
        },
        end: {
          dateTime: moment(event.treatmentDate).add(11, "months").subtract(1, "day").toISOString(),
        },
        attendees: [{ email: event.email }],
        summary: `Next treatment - ${event.vehicleNumber}`
      })

      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        start: {
          dateTime: moment(event.testDate).add(11, "months").subtract(1, "day").toISOString()
        },
        end: {
          dateTime: moment(event.testDate).add(11, "months").subtract(1, "day").toISOString(),
        },
        attendees: [{ email: event.email }],
        summary: `Next test - ${event.vehicleNumber}`
      })

      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        start: {
          dateTime: moment(event.insuranceStartDate).add(11, "months").subtract(1, "day").toISOString()
        },
        end: {
          dateTime: moment(event.insuranceStartDate).add(11, "months").subtract(1, "day").toISOString(),
        },
        attendees: [{ email: event.email }],
        summary: `Insurance end date - ${event.vehicleNumber}`
      })
    }
  }


  // async insertEvents(allEvents: ICalendarEvent[]): Promise<string> {
  //   await Promise.all(allEvents.map(event => {
  //     return [
  //       gapi.client.calendar.events.insert({
  //         calendarId: 'primary',
  //         start: {
  //           dateTime: moment(event.treatmentDate).toISOString(),
  //         },
  //         end: {
  //           dateTime: moment(event.treatmentDate).toISOString(),
  //         },
  //         summary: event.summary,
  //         description: event.description
  //       }),
  //       gapi.client.calendar.events.insert({
  //         calendarId: 'primary',
  //         start: {
  //           dateTime: moment(event.testDate).toISOString()
  //         },
  //         end: {
  //           dateTime: moment(event.testDate).toISOString(),
  //         },
  //         summary: event.summary,
  //         description: event.description
  //       })
  //     ]
  //   }))
  //   return "Events inserted successfully"
  // }

}