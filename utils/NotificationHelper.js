import * as Notifications from 'expo-notifications';

const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const initializeNotifications = async () => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) {
    return false;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return true;
};

export const sendOrderNotification = async (status) => {
  const notifications = {
    preparing: {
      title: 'Pedido em Preparo! 👨‍🍳',
      body: 'Seu pedido está sendo preparado com muito carinho.',
    },
    ready: {
      title: 'Pedido Pronto! 🎉',
      body: 'Seu pedido está pronto e saindo para entrega.',
    },
    delivering: {
      title: 'Saiu para Entrega! 🛵',
      body: 'Seu pedido está a caminho.',
    },
    delivered: {
      title: 'Chegou! 😋🍽️',
      body: 'Seu pedido chegou! Bom apetite!',
    },
  };

  const notification = notifications[status];
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notification.title,
      body: notification.body,
    },
    trigger: null,
  });
};