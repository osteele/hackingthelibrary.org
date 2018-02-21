import BigCalendar from 'react-big-calendar';
import React from 'react';
import moment from 'moment';
import events from '../../data/days.json';
// Import localizer from 'react-big-calendar/lib/localizers/globalize';

// Let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

events.forEach((event, id) => {
  // eslint-disable-next-line no-param-reassign
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
  </div>
);

export default CalendarPage;
