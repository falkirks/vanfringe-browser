import rp from "request-promise-native";
import * as moment from 'moment';

export const FEED_BASE = "https://tickets.vancouverfringe.com/feed/";
const FRINGE_END_DATE = '2018-09-17';

export class Feed{
  url;
  getFields;
  constructor(url) {
    this.url = url;
  }
  get() {
    console.log(this);
    console.log('hi1');
    return rp({
      uri: this.url + '?json&todate=' + FRINGE_END_DATE + '&fromdate=' + moment().format('YYYY-mm-dd'),
      headers: {
        'User-Agent': 'Fringe-browser'
      },
      json: true // Automatically parses the JSON string in the response
    }).then(function (data) {
      return data.feed;
    });
  }
}
