import {Feed, FEED_BASE} from "./Feed";

export class ShowsFeed extends Feed{
  constructor() {
    super(FEED_BASE + 'shows');
  }

  get() {
    return super.get().then(function (data) {
      return data.Show;
    });
  }
}
