export const useNotifications = () => {
  return {
    notifications: [],
    unreadCount: 0,
    markAsRead: async (id: string) => {},
  };
};
