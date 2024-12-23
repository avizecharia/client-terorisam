import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { IPropsForMarkers, IQuery } from '../types/interfaces';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  markers: IPropsForMarkers[];
  setMarkers: (n: IPropsForMarkers[]) => void;
  filter: number;
  setFilter: (num: number) => void;
  queries: IQuery[];
  setQueries: Dispatch<SetStateAction<IQuery[]>>
}
export default function Map({ filter, setFilter, queries, setQueries,markers,setMarkers }: Props) {
    const [querNum, setQuerNum] = useState(0)
 useEffect(()=>{console.log(filter,markers);
     markers != undefined && setQuerNum(filter)
 },[markers])
  const get =  () =>{
    console.log(markers ," ma" , filter)
    return true
  }
  return (
    <>
    { markers != undefined &&
    <div style={{height:'80vh', borderRightColor:'red'}}>
        {querNum == 2 && markers[0] != undefined ? <div> 
        <MapContainer center={[markers![0].locationArr![0].lat,markers![0].locationArr![0].lon,]}zoom={10}scrollWheelZoom={false}style={{ height: "80vh" }}>
         <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
           {markers.map(x => x.locationArr![0].lat != null  &&  x.locationArr![0].lon != null   && <>
           <Marker position={[ x.locationArr![0].lat, x.locationArr![0].lon, ]}><Popup> region:{x.region} <br></br> city:{x.city}  <br></br>country:{x.country}  <br></br> numCasualties:{x.numCasualties}</Popup></Marker></> )} 
         </MapContainer> 
        </div> :
      querNum == 2.1 && markers[0].locationArr != undefined? <div> 
      <MapContainer center={[markers![0].locationArr![0].lat,markers![0].locationArr![0].lon,]}zoom={10}scrollWheelZoom={false}style={{ height: "80vh" }}>
       <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
         {markers.map(x => x.locationArr![0].lat != null  &&  x.locationArr![0].lon != null   && <>
         <Marker position={[ x.locationArr![0].lat, x.locationArr![0].lon, ]}><Popup> region:{x.region} <br></br> city:{x.city}  <br></br>country:{x.country}  <br></br> numCasualties:{x.numCasualties}</Popup></Marker></> )} 
       </MapContainer> 
      </div>
         : <h1>waittt</h1>} 
    </div>
}
    </>
  )
}
