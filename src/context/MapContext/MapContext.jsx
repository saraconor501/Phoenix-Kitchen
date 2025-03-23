import React, { createContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const openMapWithMarker = (markerText) => {
    setSelectedMarker(markerText); // Устанавливаем выбранный маркер
    setShowMap(true); // Открываем модалку
  };

  const closeMap = () => {
    setShowMap(false);
    setSelectedMarker(null);
  };

  return (
    <MapContext.Provider value={{ showMap, selectedMarker, openMapWithMarker, closeMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => React.useContext(MapContext);