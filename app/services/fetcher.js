import Service, { inject as service } from '@ember/service';

import ajax from '../utils/ajax';

export default class FetcherService extends Service {
  @service fastboot;

  ajax(url) {
    let fastboot = this.fastboot;
    let shoebox = this.fastboot.shoebox;
    let cache = shoebox.retrieve('ajax-cache');
    if (!cache) {
      cache = {};
    }

    if (cache[url]) {
      return cache[url];
    }

    return ajax(url).then(function (resp) {
      if (shoebox && fastboot.isFastBoot) {
        cache[url] = deepCopy(resp);
        shoebox.put('ajax-cache', cache);
      }
      return resp;
    });
  }
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
