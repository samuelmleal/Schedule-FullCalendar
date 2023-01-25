import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg, EventApi, EventClickArg } from 'fullcalendar'
import { createEventId } from './utils'
import './calender.css'
import listPlugin from '@fullcalendar/list';



function App() {

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Digite um título para o evento')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Gostaria de deletar o evento : '${clickInfo.event.title}' ?`)) {
      clickInfo.event.remove()
    }
  }

 
  return (
    <FullCalendar
      plugins = {[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
      headerToolbar={{
        left: 'prev,next today', 
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      buttonText={
        {
        today:    'Hoje',
        month:    'Mês',
        week:     'Semana',
        day:      'Dia',
        list:     'Agenda'
        }
      }
      locale= 'pt-br'
      initialView='dayGridMonth'
      editable={true}
      allDaySlot={false}
      selectable={true}
      selectMirror={true}
      select={handleDateSelect}
      eventClick={handleEventClick}/>
  )
}

export default App
