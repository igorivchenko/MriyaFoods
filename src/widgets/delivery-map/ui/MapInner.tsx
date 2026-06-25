"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapInner.module.css";

// Toronto center coordinates (Mriya Foods store / dispatch center)
const CENTER_LAT = 43.6532;
const CENTER_LNG = -79.3832;

// Custom SVG marker pin matching Mriya Foods' style
const createCustomIcon = () => {
  if (typeof window === "undefined") return undefined;

  return L.divIcon({
    className: styles.customMarker,
    html: `
      <div class="${styles.markerWrapper}">
        <div class="${styles.pinPulse}"></div>
        <div class="${styles.pin}">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#4e2e1e" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="9" r="3.5" fill="#ffd42f"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
  });
};

export const MapInner = () => {
  const markerIcon = createCustomIcon();

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[CENTER_LAT, CENTER_LNG]}
        zoom={11}
        scrollWheelZoom={false}
        className={styles.mapContainer}
      >
        {/* CartoDB Positron - Light-themed clean aesthetic tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Primary Delivery Zone: 15 km Radius (Dark Brown tint) */}
        <Circle
          center={[CENTER_LAT, CENTER_LNG]}
          radius={15000}
          pathOptions={{
            color: "var(--color-primary)",
            fillColor: "var(--color-primary)",
            fillOpacity: 0.15,
            weight: 2,
          }}
        />

        {/* Secondary Delivery Zone: 30 km Radius (Bright Gold tint, dashed border) */}
        <Circle
          center={[CENTER_LAT, CENTER_LNG]}
          radius={30000}
          pathOptions={{
            color: "var(--color-secondary)",
            fillColor: "var(--color-secondary)",
            fillOpacity: 0.06,
            weight: 2,
            dashArray: "6, 6",
          }}
        />

        {/* Store Location Marker */}
        {markerIcon && (
          <Marker position={[CENTER_LAT, CENTER_LNG]} icon={markerIcon}>
            <Popup className={styles.customPopup}>
              <div className={styles.popupContent}>
                <h4 className={styles.popupTitle}>Mriya Foods Hub</h4>
                <p className={styles.popupText}>
                  Our main dispatch center. Fresh authentic products delivered
                  daily!
                </p>
                <div className={styles.popupZones}>
                  <span className={styles.zonePrimary}>
                    Free Delivery (&lt;15km)
                  </span>
                  <span className={styles.zoneSecondary}>
                    Standard Zone (&lt;30km)
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className={`${styles.legend} glass-panel`}>
        <h4 className={styles.legendTitle}>Delivery Zones</h4>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.colorPrimary}`} />
          <div className={styles.legendText}>
            <strong>Primary Zone (Within 15km)</strong>
            <span>Free Next-Day Delivery on orders over $50</span>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.colorSecondary}`} />
          <div className={styles.legendText}>
            <strong>Secondary Zone (Within 30km)</strong>
            <span>Standard Courier delivery within 2-3 business days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

MapInner.displayName = "MapInner";
