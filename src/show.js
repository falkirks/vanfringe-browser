

import {ipcRenderer} from 'electron';
import Handlebars from 'handlebars';
import * as moment from 'moment';

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

ipcRenderer.on('show-info', function (event, store) {
  console.log(store);
  const source   = document.getElementById("show-template").innerHTML;
  const template = Handlebars.compile(source);
  document.getElementById('showInfoHolder').innerHTML = template(store);

  setInterval(() => {
    const now = moment();
   if(now.isBefore(moment(store.EndSaleAt))){
      store.state = "OnlineSales";
    }
    else if(now.isBefore(moment(store.ActualEventDate).subtract('15', 'minutes'))){
      store.state = "AtDoorSales";
    }
    else if(now.isBefore(moment(store.ActualEventDate))){
     store.state = "TheatreOpen";
    }
    else if(now.isBefore(moment(store.ActualEventDate).add(store.Show.LongMinutes, "minutes"))){
      store.state = "Ongoing";
    }
    else{
      store.state = "Ended";
    }
    document.getElementById('showInfoHolder').innerHTML = template(store);
  }, 5000);
});
