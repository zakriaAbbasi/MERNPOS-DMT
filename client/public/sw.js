self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    var dat=JSON.parse(event.data.text());
    console.log(dat);
    const title = dat.title;
    const options = {
      body: dat.message,
      icon: '/favicon.ico',
    };
    //event.waitUntil(
    self.registration.showNotification(title, options);
  });