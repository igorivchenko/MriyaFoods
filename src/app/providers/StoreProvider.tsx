"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => makeStore());
  const [persistor] = useState(() => persistStore(store));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

StoreProvider.displayName = "StoreProvider";
export default StoreProvider;
