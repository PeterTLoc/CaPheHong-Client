import * as L from 'leaflet'

declare module 'leaflet-routing-machine'

declare global {
  namespace L {
    namespace Routing {
      function control(options: RoutingControlOptions): Control

      interface RoutingControlOptions {
        waypoints?: L.LatLng[]
        routeWhileDragging?: boolean
        show?: boolean
        addWaypoints?: boolean
        createMarker?: (i: number, wp: Waypoint, n: number) => L.Marker
      }

      interface Control extends L.Control {
        getPlan(): any
        setWaypoints(waypoints: L.LatLng[]): void
      }

      interface Waypoint {
        latLng: L.LatLng
      }
    }
  }
}
