"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import L from "leaflet"
import "leaflet-routing-machine"

type MapProps = {
  destination: { lat: number; lng: number }
}

const Routing = ({
  destination,
}: {
  destination: { lat: number; lng: number }
}) => {
  const map = useMap()
  const controlRef = useRef<L.Routing.Control | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!map) return

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLatLng = L.latLng(pos.coords.latitude, pos.coords.longitude)

        controlRef.current = L.Routing.control({
          waypoints: [userLatLng, L.latLng(destination.lat, destination.lng)],
          routeWhileDragging: false,
          show: false,
          addWaypoints: false,
          createMarker: (i, wp, n) => {
            return L.marker(wp.latLng, {
              icon: L.divIcon({
                className: 'custom-marker',
                html: i === 0 ? 
                  // Current position: Circle icon
                  `<svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="#000000" stroke-width="2" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>` :
                  // Destination: MapPin icon
                  `<svg width="20" height="20" viewBox="0 0 24 24" fill="#EA4335" stroke="none" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3" fill="white"/>
                  </svg>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              }),
            })
          },
        }).addTo(map)

        map.setView(userLatLng, 14)
      },
      (err) => {
        console.warn("User location not found, showing only destination")
        map.setView([destination.lat, destination.lng], 14)
        const marker = L.marker([destination.lat, destination.lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4335" stroke="none" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3" fill="white"/>
            </svg>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
        }).addTo(map)
        markerRef.current = marker
      }
    )

    return () => {
      // Defensive: remove routing control if it exists and map is still valid
      if (controlRef.current && map) {
        try {
          map.removeControl(controlRef.current)
        } catch (e) {}
      }
      // Remove marker if it exists
      if (markerRef.current && map) {
        try {
          map.removeLayer(markerRef.current)
        } catch (e) {}
      }
    }
  }, [map, destination])

  return null
}

export default function ShopMap({ destination }: MapProps) {
  return (
    <MapContainer
        center={[destination.lat, destination.lng]}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-[400px] rounded-md shadow-md z-0"
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing destination={destination} />
    </MapContainer>
  )
}
