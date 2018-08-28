import $ from "jquery";

export const drawTable = (data) => {

  $.fn.dataTable.moment( 'M/D/YYYY h:mm A' );
  $('#eventsTable').DataTable({
    paging: false,
    "scrollY": "400px",
    "scrollCollapse": true,
    data: data,
    columns: [
      { data: 'Show.Name', title: 'Event name' },
      { data: 'HallName', title: 'Venue'},
      { data: 'FormattedDate', title: 'Time', visible: false },
      { data: 'day', title: 'Day'},
      {data: 'time', title: 'Start time', className: 'timeSlot'},
      {data: 'endTime', title: 'End time', className: 'timeSlot'},
      { data: 'SoldTickets', title: 'Tickets Sold' },
      { data: 'AvailableCapacity', title: 'Tickets left' }
    ],
    order: [[2, 'asc']]
  });

};
