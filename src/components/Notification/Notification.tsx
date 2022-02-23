import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notification as NotificationUI } from '@alfalab/core-components/notification';
import { RootStateType } from 'redux/store';
import { removeToast, selectNotifications } from 'redux/slices/app-slice';
import { INotification } from 'models/INotification';

export const Notification: FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootStateType) =>
    selectNotifications(state)
  );

  const hideNotification = React.useCallback(
    (id: string) => () => {
      dispatch(removeToast(id));
    },
    [dispatch]
  );

  return (
    <>
      {notifications.map((notification: INotification, index: number) => {
        return (
          <NotificationUI
            key={notification.id}
            className="notification"
            badge={notification.badge}
            title={notification.title}
            visible={notification?.show || true}
            offset={30 + 100 * index}
            autoCloseDelay={
              notification?.autoCloseDelay && notification.autoCloseDelay
            }
            onClickOutside={
              notification?.isEnabledOutsideClick
                ? hideNotification(notification.id)
                : undefined
            }
            onClose={hideNotification(notification.id)}
            onCloseTimeout={hideNotification(notification.id)}
          >
            {notification.text}
          </NotificationUI>
        );
      })}
    </>
  );
};
