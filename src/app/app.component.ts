import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from "@schedule-x/angular";
import { createCalendar, createViewWeek } from "@schedule-x/calendar";
import {createInteractiveEventModal} from "@sx-premium/interactive-event-modal";
import {createEventsServicePlugin} from "@schedule-x/events-service"; // can alternatively be added in your angular.json
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/interactive-event-modal/index.css'

const eventsService = createEventsServicePlugin();

const eventModal = createInteractiveEventModal({
  // dependency needed to add events
  eventsService,

  // (Optional): callback for when an event is added
  onAddEvent: (event) => {
    console.log(event)
  },

  // (Optional): callback for when an event is updated
  onDeleteEvent: (eventId) => {
    console.log(eventId)
  },

  // (Optional): configuration to only show title and description fields
  fields: {
    title: {},
    description: {},
  },
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-premium-modal';
  calendarApp = createCalendar({
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-11-08 03:00',
        end: '2024-11-08 05:00',
      },
    ],

    views: [createViewWeek()],

    plugins: [
      eventsService,
      eventModal,
    ],

    callbacks: {
      onDoubleClickDateTime: (dateTime) => {
        eventModal.clickToCreate(dateTime);
      }
    },
  });
}
