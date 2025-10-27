import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar } from "react-native-paper";

type NotificationContextValue = {
  notify: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const notify = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={3000}>
        {message}
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}
