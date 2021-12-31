// Bring in base CSS's
// import '../styles/index.less';

import 'datatables.net'
import 'datatables.net-buttons-dt'
import 'datatables.net-select-dt'


// eslint-disable-next-line no-undef
$(() => {

  const demoItems = [
    {'email': 'hello@example.com'}
  ];
  // eslint-disable-next-line no-undef
  let table = $('#table').DataTable({ // eslint-disable-line new-cap
    data: demoItems,
    // serverSide: true,
    searchDelay: 600,
    columns: [
      {data: 'email'},
    ],
    dom: 'Bfrtip',
    select: true,
    buttons: [
      'hello',
      {
        extend: 'selectedSingle',
        text: 'Log selected data',
        action: function ( e, dt, button, config ) {
          console.log( dt.row( { selected: true } ).data() );
        }
      }
    ]
  });

  table.buttons().container()
    .appendTo( $('.col-sm-6:eq(0)', table.table().container() ) ); // eslint-disable-line no-undef
});
