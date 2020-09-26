import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ICalendarEvent } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  events: FormArray;
  allEvents: ICalendarEvent[];

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      events: this.fb.array([this.createEvent()])
    });
    this.events = this.eventForm.get('events') as FormArray;
  }

  createEvent(): FormGroup {
    return this.fb.group({
      treatmentDate: ['', Validators.required],
      testDate: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addEvent() {
    this.events.push(this.createEvent());
  }
  deleteEvent(index: number) {
    this.events.removeAt(index);
  }



  async submitForm() {
    this.allEvents = this.events.controls.map(event => event.value as ICalendarEvent);
    console.log(this.allEvents);
    await this.authService.insertEvents(this.allEvents);
    console.log("Events created successfully");
    
    
  }


}
