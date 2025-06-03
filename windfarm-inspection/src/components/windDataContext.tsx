// src/contexts/WindDataContext.tsx
import React, { createContext, useContext, useState } from 'react';

const WindDataContext = createContext<any>(null);

export const WindDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [windData, setWindData] = useState<any>(null);

  return (
    <WindDataContext.Provider value={{ windData, setWindData }}>
      {children}
    </WindDataContext.Provider>
  );
};

export const useWindData = () => useContext(WindDataContext);
