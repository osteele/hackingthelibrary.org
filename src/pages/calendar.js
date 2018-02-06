import BigCalendar from 'react-big-calendar';
import React from 'react';
import events from '../../data/days.json';
import localizer from 'react-big-calendar/lib/localizers/globalize';
import moment from 'moment';

// Let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

events.forEach((event, id) => {
  event.id = id;
});

const CalendarPage = props => (
  <div className="ph2 ph3-ns mw8 center">
    <h1>Calendar</h1>
    <div style={{ height: '500px' }}>
      <BigCalendar
        {...props}
        events={events}
        views={['month']}
        step={60}
      />
    </div>
  </div >
);

export default CalendarPage;
