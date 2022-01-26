import React, { FC, useEffect } from 'react';
import NotificationUI from 'arui-feather/notification';
import { getNotificationInitValues } from '../../utils/notificationState';

type PropTypes = {
  notification: any;
  setNotification: any;
};

export const Notification: FC<PropTypes> = ({
  notification,
  setNotification
}) => {
  useEffect(() => {
    setNotification(notification);
  }, [notification]);

  const mapText = () => {
    return notification.text.map((text: any) => {
      return <div>{text.message}</div>;
    });
  };

  return (
    <React.Fragment>
      <NotificationUI
        visible={notification.show}
        offset={20}
        stickTo="right"
        title={notification.title}
        status={notification.type}
        onCloserClick={() => {
          setNotification(getNotificationInitValues());
        }}
      >
        {Array.isArray(notification.text) ? mapText() : notification.text}
      </NotificationUI>
    </React.Fragment>
  );
};
