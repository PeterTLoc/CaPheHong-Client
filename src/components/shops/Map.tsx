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
              icon: L.icon({
                iconUrl:
                  i === 0
                    ? "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png"
                    : "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-red.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              }),
            })
          },
        }).addTo(map)

        map.setView(userLatLng, 14)
      },
      (err) => {
        console.warn("User location not found, showing only destination")
        map.setView([destination.lat, destination.lng], 14)
        L.marker([destination.lat, destination.lng]).addTo(map)
      }
    )

    return () => {
      controlRef.current?.remove()
    }
  }, [map, destination])

  return null
}

export default function Map({ destination }: MapProps) {
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
