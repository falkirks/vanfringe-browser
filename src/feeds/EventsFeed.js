import {Feed, FEED_BASE} from "./Feed";

export class EventsFeed extends Feed{
  constructor() {
    super(FEED_BASE + 'events');
  }


  get() {
    return super.get().then(function (data) {
      return data.Events.Event;
    });
  }
}
