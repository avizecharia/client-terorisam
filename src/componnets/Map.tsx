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
    const [a, seta] = useState(false)
 useEffect(()=>{console.log(filter,markers);
    filter == 2 && seta(true)
 },[markers])
  const get =   () =>{
    console.log(markers ," ma" , filter)
    return true
  }

  return (
    <div style={{height:'80vh', borderRightColor:'red'}}>
        {!a && <h1>vvvv</h1>}
        {a  ? 
        <div> 
        <MapContainer
         center={[markers![0].locationArr![0].lat,
           markers![0].locationArr![0].lon,]}
           zoom={10}
           scrollWheelZoom={false}
           style={{ height: "80vh" }}
           >
         <TileLayer
           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />

        {markers.map(x => <>
           <Marker
           position={[
             x.locationArr![0].lat,
             x.locationArr![0].lon,
             
           ]}
           >
           <Popup>
             region:{x.region}
             <br></br>
             city:{x.city}
             country:{x.country}
             numCasualties:{x.numCasualties}
           </Popup>
         </Marker>
        </>)} 
       </MapContainer> 
        </div> :
         <h1>waittt</h1>}
        {/* { a && markers[0] != undefined && filter === 2  &&
         <> 
         <MapContainer
          center={[markers![0].locationArr![0].lat,
            markers![0].locationArr![0].lon,]}
            zoom={10}
            scrollWheelZoom={false}
            style={{ height: "80vh" }}
            >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

         {markers.map(x => <>
            <Marker
            position={[
              x.locationArr![0].lat,
              x.locationArr![0].lon,
              
            ]}
            >
            <Popup>
              region:{x.region}
              <br></br>
              city:{x.city}
              country:{x.country}
              numCasualties:{x.numCasualties}
            </Popup>
          </Marker>
         </>)} 
        </MapContainer> 
         </>
         }  */}
    </div>
  )
}
