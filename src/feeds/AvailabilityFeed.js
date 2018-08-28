import {Feed, FEED_BASE} from "./Feed";

export class AvailabilityFeed extends Feed{
  constructor() {
    super(FEED_BASE + 'eventsavailability');
  }

  get() {
    return super.get().then(function (data) {
      return data.data.Events.Event;
    });
  }
}
