import L from 'leaflet';
import Market from '../assets/svg/032-shopping.svg'
import CCTV from '../assets/svg/039-cctv.svg'
import CctvNotActive from '../assets/svg/039-cctv-nonactive.svg'
import Police from '../assets/svg/026-police station.svg'
import Wifi from '../assets/svg/038-wifi.svg'

const marketIcon = L.icon({
  iconUrl: Market,
  iconRetinaUrl: Market,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [50, 50],
  className: 'leaflet-marker-icon'
});
const cctvIcon= L.icon({
  iconUrl: CCTV,
  iconRetinaUrl: CCTV,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [50, 50],
  className: 'leaflet-marker-icon'
});
const cctvIconNotActive= L.icon({
  iconUrl:  CctvNotActive,
  iconRetinaUrl:  CctvNotActive,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [50, 50],
  className: 'leaflet-marker-icon'
});
const policeIcon= L.icon({
  iconUrl: Police,
  iconRetinaUrl: Police,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [50, 50],
  className: 'leaflet-marker-icon'
});
const wifiIcon= L.icon({
  iconUrl: Wifi,
  iconRetinaUrl: Wifi,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [50, 50],
  className: 'leaflet-marker-icon'
});
export {marketIcon,cctvIcon,policeIcon,wifiIcon,cctvIconNotActive}
