import BigCalendar from 'react-big-calendar'
import React from 'react'
import localizer from 'react-big-calendar/lib/localizers/globalize'
import moment from 'moment'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

const CalendarPage = props => (
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

const events = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2018, 1, 0),
    end: new Date(2018, 1, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2018, 1, 7),
    end: new Date(2018, 1, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2018, 1, 9, 0, 0, 0),
    end: new Date(2018, 1, 9, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2018, 1, 11),
    end: new Date(2018, 1, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2018, 1, 12, 10, 30, 0, 0),
    end: new Date(2018, 1, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2018, 1, 12, 12, 0, 0, 0),
    end: new Date(2018, 1, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2018, 1, 12, 14, 0, 0, 0),
    end: new Date(2018, 1, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2018, 1, 12, 17, 0, 0, 0),
    end: new Date(2018, 1, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2018, 1, 12, 20, 0, 0, 0),
    end: new Date(2018, 1, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 1, 13, 7, 0, 0),
    end: new Date(2018, 1, 13, 10, 30, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2018, 1, 17, 19, 30, 0),
    end: new Date(2018, 1, 18, 2, 0, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2018, 1, 20, 19, 30, 0),
    end: new Date(2018, 1, 22, 2, 0, 0),
  },
];

export default CalendarPage
