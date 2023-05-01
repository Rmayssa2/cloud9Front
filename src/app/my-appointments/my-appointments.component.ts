import { AppointmentService } from './../appointment/appointment.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventClickArg, EventDropArg } from '@fullcalendar/core';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, EventInput } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'; // Import the timeGridPlugin
import { Appointment } from '../appointment/appointment';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';

import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit{
  appointments: Appointment[] = [];

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  constructor(private appointmentService: AppointmentService,  private route: ActivatedRoute, private dialog: MatDialog){}

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    editable: true,
    selectable: true,
    droppable: true,
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'timeGridWeek,timeGridDay'
    },
    events: [],
    eventDrop: (arg: EventDropArg) => this.handleEventDrop(arg),
    eventClick: (arg: EventClickArg) => this.handleEventClick(arg)

  };

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAppointmentsByPatient(id);  }

  getAppointmentsByPatient(id: number): void {
    this.appointmentService.getAppointmentsByPatient(id).subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
        this.calendarOptions.events = this.appointments.map(appointment => ({
          id: appointment.idAppointment.toString(),
          type: appointment.type,
          title: appointment.doctor.username+ '   ==> ' +'    ' +'   ' + appointment.type,
          start: appointment.dateStart,
          end: appointment.dateEnd,
          patient: appointment.patient,
          doctor: appointment.doctor
        }));
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  handleEventDrop(arg: any) {
    const id = Number(arg.event.id);
  
    if (!isNaN(id)) {
      const appointment: Appointment = {
        idAppointment: id,
        type: arg.event.extendedProps['type'],
        dateStart: moment(arg.event.start).utcOffset(new Date().getTimezoneOffset()).add(1, 'hour').toDate(),
dateEnd: moment(arg.event.end).utcOffset(new Date().getTimezoneOffset()).add(1, 'hour').toDate(),

        patient: arg.event.extendedProps['patient'] || '',
        doctor: arg.event.extendedProps['doctor'] || ''
      };
  
      this.appointmentService.updateAppointment(id, appointment).subscribe(
        (response: Appointment) => {
          console.log(`Appointment ${response.idAppointment} updated successfully!`);
        }
      );
    } else {
      console.error('Invalid appointment ID');
    }
  }
  handleEventClick(arg: any) {
    const id = Number(arg.event.id);
    if (!isNaN(id)) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.appointmentService.deleteAppointmentById(id).subscribe(
          () => {
            console.log(`Appointment ${id} deleted successfully!`);
            arg.event.remove(); // Remove the event from the calendar
          }
        );
      }
    } else {
      console.error('Invalid appointment ID');
    }
  }
}

