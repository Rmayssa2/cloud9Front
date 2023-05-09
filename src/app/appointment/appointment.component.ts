import { AppointmentService } from './appointment.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventClickArg, EventDropArg } from '@fullcalendar/core';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, EventInput } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'; // Import the timeGridPlugin
import { Appointment } from './appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { User } from '../home/user';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
  appointments: Appointment[] = [];

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  constructor(private appointmentService: AppointmentService,  private route: ActivatedRoute){}

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    selectable: true,

    droppable: true,
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'timeGridWeek,timeGridDay'
    },
    events: [],
    eventDrop: (arg: EventDropArg) => this.handleEventDrop(arg),
    
  };
  user!: User ;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.getAppointmentsByDoctor(id);  }

  getAppointmentsByDoctor(id: number): void {
    this.appointmentService.getAppointmentsByDoctor(id).subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
        this.calendarOptions.events = this.appointments.map(appointment => ({
          id: appointment.idAppointment.toString(),
          type: appointment.type,
       title: appointment.patient.username+ '   ==> ' +'    ' +'   ' + appointment.type,

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

  handleEventClick(arg: any)  {
    console.log(arg.event.title);
  }

  handleEventDrop(arg: any) {
    const id = Number(arg.event.id);
  
    if (!isNaN(id)) {
      const appointment: Appointment = {
        idAppointment: id,
        type: arg.event.extendedProps['type'],
        dateStart: arg.event.start.toISOString(),
        dateEnd: arg.event.end.toISOString(),
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

}