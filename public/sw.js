self.addEventListener("push", (e) => {
  const { title, text, href } = e.data.json();
  const config = {
    body: text,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "3",
      href,
    },
  };
  e.waitUntil(self.registration.showNotification(title, config));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.href));
});
