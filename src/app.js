import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import { showLoadingScreen, hideLoadingScreen } from "./helpers/loading_screen";

import $ from 'jquery';
window.$ = window.jQuery = $;

import * as moment from 'moment';
window.moment = moment;

import DataTables from 'datatables.net-dt';
DataTables(window, $);
import DataTablesResponsive from 'datatables.net-responsive-dt';
DataTablesResponsive(window, $);

import DataTablesSelect from 'datatables.net-select-dt';
DataTablesSelect(window, $);

import {EventsFeed} from "./feeds/EventsFeed";
import {AvailabilityFeed} from "./feeds/AvailabilityFeed";
import {ShowsFeed} from "./feeds/ShowsFeed";

import {drawTable} from "./helpers/render";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());


// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};


showLoadingScreen(document);


new AvailabilityFeed().get().then((data) => {
  new EventsFeed().get().then((events) => {
    let result = [];
    hideLoadingScreen(document);

    data.forEach((a) => {
      events.forEach((event) => {
        if(event.EventId === a.EventId){
          const m = moment(event.FormattedDate, 'M/D/YYYY h:mm A');
          event.day = m.format('D');
          event.time = m.format('h:mm A');
          event.totalCapacity = parseInt(a.SoldTickets) + parseInt(a.AvailableCapacity);
          event.endTime = m.add(event.Show.LongMinutes, 'minutes').format('h:mm A');
          result.push({...event, ...a});
        }
      });
    });
    console.log(result);
    drawTable(result);
  });

}).catch((err) =>  {
  document.querySelector("#app").style.display = "none";
  document.querySelector("#connectError").style.display = "block";
  hideLoadingScreen(document);
});

document.querySelector("#app").style.display = "block";
