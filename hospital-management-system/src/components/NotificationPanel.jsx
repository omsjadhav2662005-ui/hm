const NotificationPanel = ({ isOpen, onClose, notifications, onMarkAllAsRead, onMarkAsRead, onClearAll }) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'appointment':
        return 'fa-calendar-alt';
      case 'results':
        return 'fa-file-medical-alt';
      case 'prescription':
        return 'fa-prescription';
      case 'billing':
        return 'fa-file-invoice-dollar';
      default:
        return 'fa-bell';
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'appointment':
        return 'text-primary';
      case 'results':
        return 'text-purple-600';
      case 'prescription':
        return 'text-accent';
      case 'billing':
        return 'text-warning';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="fixed right-4 top-20 bg-white rounded-xl shadow-xl z-40 w-80">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-bold font-poppins">Notifications</h3>
          <button 
            onClick={onMarkAllAsRead}
            className="text-sm text-primary hover:underline"
          >
            Mark all as read
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="p-2">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No notifications</p>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification._id} 
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? '' : 'bg-blue-50'}`}
                onClick={() => onMarkAsRead(notification._id)}
              >
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <i className={`fas ${getNotificationIcon(notification.type)} ${getNotificationColor(notification.type)}`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="p-3 border-t border-gray-200 text-center">
        <button 
          onClick={onClearAll}
          className="text-sm text-danger hover:underline"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;