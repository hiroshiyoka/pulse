"use client";

import Image from "next/image";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from "@liveblocks/react-ui";

const Notifications = () => {
  const { count } = useUnreadInboxNotificationsCount();
  const { inboxNotifications } = useInboxNotifications();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Image
          width={24}
          height={24}
          alt="Bell Icon"
          src="/assets/icons/bell.svg"
        />
        {count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">
        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: React.ReactNode) => (
              <>{user} mentioned you.</>
            ),
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-dark-500">
                No new notifications
              </p>
            )}

            {unreadNotifications.length > 0 &&
              unreadNotifications.map((notification) => (
                <InboxNotification
                  showActions={false}
                  key={notification.id}
                  inboxNotification={notification}
                  className="bg-dark-200 text-white"
                  href={`/documents/${notification.roomId}`}
                  kinds={{
                    thread: (props) => (
                      <InboxNotification.Thread
                        {...props}
                        showActions={false}
                        showRoomName={false}
                      />
                    ),
                    textMention: (props) => (
                      <InboxNotification.TextMention
                        {...props}
                        showRoomName={false}
                      />
                    ),
                    $documentAccess: (props) => {
                      const { title, avatar } =
                        props.inboxNotification.activities[0].data;

                      return (
                        <InboxNotification.Custom
                          {...props}
                          title={title}
                          aside={
                            <InboxNotification.Icon className="bg-transparent">
                              <Image
                                width={36}
                                height={36}
                                alt="avatar"
                                src={(avatar as string) || ""}
                                className="rounded-full"
                              />
                            </InboxNotification.Icon>
                          }
                        >
                          {props.children}
                        </InboxNotification.Custom>
                      );
                    },
                  }}
                />
              ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
