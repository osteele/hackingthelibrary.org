import BigCalendar from 'react-big-calendar'
import React from 'react'
import events from '../../data/days.json'
import localizer from 'react-big-calendar/lib/localizers/globalize'
import moment from 'moment'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

function parseDate(str) {
  let components = str.match(/\d+/g).map(Number);
  return new Date(...components);
}

events.forEach(event => {
  event.start = parseDate(event.start);
  event.end = parseDate(event.end);
});

const CalendarPage = (props) => (
  <div>
    <h1>A calendar</h1>
    <div style={{ height: '500px' }}>
      <BigCalendar
        {...props}
        events={events}
        views={allViews}
        step={60}
        defaultDate={new Date(2018, 1, 1)}
      />
    </div>
  </div>
)

export default CalendarPage
