
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as moment from 'moment';
import { ICalendarEvent } from '../interfaces';
import { environment } from 'src/environments/environment';
import { env } from 'process';

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

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: environment.gapi.apiKey,
        clientId: environment.gapi.clientId,
        discoveryDocs: environment.gapi.discoveryDocs,
        scope: environment.gapi.scope
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });



  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance()
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser)

    const credential = auth.GoogleAuthProvider.credential(token);

    await this.afAuth.signInAndRetrieveDataWithCredential(credential);

  }
  logout() {
    this.afAuth.signOut();
  }

  async insertEvents(allEvents: ICalendarEvent[]) {
    for (const event of allEvents) {
      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        start: {
          dateTime: moment(event.treatmentDate).toISOString(),
        },
        end: {
          dateTime: moment(event.treatmentDate).toISOString(),
        },
        summary: event.summary,
        description: event.description
      })
      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        start: {
          dateTime: moment(event.testDate).toISOString()
        },
        end: {
          dateTime: moment(event.testDate).toISOString(),
        },
        summary: event.summary,
        description: event.description
      })
    }
  }


}