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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      events: this.fb.array([this.createEvent()])
    });
  }

  get events() {
    return this.eventForm.get('events') as FormArray;
  }

  get emails() {
    return this.events.get('emails') as FormArray;
  }

  createEvent(): FormGroup {
    return this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', Validators.required],
      treatmentDate: ['', Validators.required],
      testDate: ['', Validators.required],
      insuranceStartDate: ['', Validators.required],
    })
  }

  createEmail(): FormGroup {
    return this.fb.group({
      email: ['', Validators.required]
    })
  }

  addEmail(): void {
    this.emails.push(this.createEmail())
  }

  addEvent(): void {
    this.events.push(this.createEvent());
  }

  deleteEvent(index: number): void {
    this.events.removeAt(index);
  }

  deleteEmail(index: number): void {
    this.emails.removeAt(index);
  }



  async submitForm(): Promise<void> {
    const allEvents = this.events.controls.map(event => event.value as ICalendarEvent);
    console.log(allEvents);
    await this.authService.insertEvents(allEvents);
    alert("Events created successfully!")
      
    
  }


}
