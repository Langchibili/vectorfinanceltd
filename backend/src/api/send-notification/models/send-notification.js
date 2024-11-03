module.exports = {
    lifecycles: {
      async afterCreate(result) {
        await sendNotification(result);
      },
      async afterUpdate(result) {
        await sendNotification(result);
      }
    }
  };
  
  async function sendNotification(notification) {
    const { clientsToNotify, notificationTemplate, customNotificationBody, sendVia } = notification;
  
    // Determine the notification body based on the template selection
    let notificationBody;
    if (notificationTemplate === 'other') {
      notificationBody = customNotificationBody;
    } else {
      // Fetch the template content from the notificationTemplate collection
      const template = await strapi.query('notification-template').findOne({ name: notificationTemplate });
      notificationBody = template ? template.body : 'Default template message';
    }
  
    // Send notifications to each client in the `clientsToNotify` list
    clientsToNotify.forEach(client => {
      if (sendVia === 'email' || sendVia === 'both') {
        console.log(`Sending notification via email to ${client.email}: ${notificationBody}`);
        // Logic to send email would go here
      }
      if (sendVia === 'sms' || sendVia === 'both') {
        console.log(`Sending notification via SMS to ${client.phone}: ${notificationBody}`);
        // Logic to send SMS would go here
      }
    });
  }
  