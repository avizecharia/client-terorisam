import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { IPropsForMarkers, IQuery } from '../types/interfaces';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';



interface Props {
  markers: IPropsForMarkers[];
  setMarkers: (n: IPropsForMarkers[]) => void;
  filter: number;
  setFilter: (num: number) => void;
  queries: IQuery[];
  setQueries: Dispatch<SetStateAction<IQuery[]>>
}
export default function Map({ filter, setFilter, queries, setQueries,markers,setMarkers }: Props) {
  function SetMapCenter({ center }: { center: [number, number] }) {
    const map = useMap();
    
    useEffect(() => {
      if (center) {
        map.setView(center); // שינוי מרכז המפה
      }
    }, [center, map]);
  
    return null;
  }
 
  const myCenter = ():[number, number] => {
    return markers.length > 0  && markers != undefined
    ? [markers[0].locationArr![0].lat, markers[0].locationArr![0].lon] 
    : [0, 0];
  } 
   
    
  const getLAtLonbyArea = (regoin:string):[number ,number] => {
      switch(regoin) {
        case "Central America & Caribbean": 
       return  [-30.2928485,153.1256159]
      case "North America":
        return [ 40.87589,-81.40234];
      case "Southeast Asia":
        return [ -8.7287308,115.2365646];
      case "Western Europe":
        return [ 53.8598291,27.5535313];
      case "East Asia":
        return [ 32.0959836,118.9115843];
      case "South America":
        return [ -21.0002179,-61.0006565];
      case "Eastern Europe":
        return [ 50.2659033,18.6975762];
      case "Sub-Saharan Africa":
        return [7.1881,21.09375];
      case "Middle East & North Africa":
        return [ 39.3014159,-76.5888477];
      case "Australasia & Oceania":
        return [ -30.0000769,139.9998196];
      case "South Asia":
        return [ 1.3019038,103.7775058];
      case "Central Asia":
        return  [-6.2360561,106.8571285];
      }
      return [0,0]
  }
  return (
    <>
    { markers != undefined &&
    <div style={{height:'80vh', borderRightColor:'red'}}>
        {filter == 2 ? <div> 
        <MapContainer center={myCenter() as LatLngExpression | undefined}zoom={10}scrollWheelZoom={false}style={{ height: "80vh" }}>
         <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
           {markers.map(x => x.locationArr![0].lat != null  &&  x.locationArr![0].lon != null   && <>
           <Marker position={[ x.locationArr![0].lat, x.locationArr![0].lon, ]}><Popup> region:{x.region} <br></br> city:{x.city}  <br></br>country:{x.country}  <br></br> numCasualties:{x.numCasualties}</Popup></Marker></> )} 
         </MapContainer> 
        </div> :
      filter == 2.1 ? <div> 
      <MapContainer center={myCenter() as LatLngExpression | undefined}zoom={10}scrollWheelZoom={false}style={{ height: "80vh" }}>
      <SetMapCenter center={myCenter() as [number,number]} />
       <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
         {markers.map(x => x.locationArr![0].lat != null  &&  x.locationArr![0].lon != null   && <>
         <Marker position={[ x.locationArr![0].lat, x.locationArr![0].lon, ]}><Popup> region:{x.region} <br></br> city:{x.city}  <br></br>country:{x.country}  <br></br> numCasualties:{x.numCasualties}</Popup></Marker></> )} 
       </MapContainer> 
      </div>
         :
          
      filter == 2.2 ? <div> 
      <MapContainer center={myCenter() as LatLngExpression | undefined}zoom={10}scrollWheelZoom={false}style={{ height: "80vh" }}>
      <SetMapCenter center={myCenter() as [number,number]} />
       <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
         {markers.map(x => x.locationArr![0].lat != null  &&  x.locationArr![0].lon != null   && <>
         <Marker position={[ x.locationArr![0].lat, x.locationArr![0].lon, ]}><Popup> region:{x.region} <br></br> city:{x.city}  <br></br>country:{x.country}  <br></br> numCasualties:{x.numCasualties}</Popup></Marker></> )} 
       </MapContainer> 
      </div>
         :
          
          filter == 2.3 && markers ? <div> 
          <MapContainer center={myCenter() as LatLngExpression | undefined}zoom={10}scrollWheelZoom={false}style={{ height: "80vh" }}>
          <SetMapCenter center={myCenter() as [number,number]} />
           <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
             {markers.map(x => x.locationArr![0].lat != null  &&  x.locationArr![0].lon != null   && <>
             <Marker position={[ x.locationArr![0].lat, x.locationArr![0].lon, ]}><Popup> region:{x.region} <br></br> city:{x.city}  <br></br>country:{x.country}  <br></br> numCasualties:{x.numCasualties}</Popup></Marker></> )} 
           </MapContainer> 
          </div>
             :
          
          filter == 4 ? <div> 
          <MapContainer center={getLAtLonbyArea(markers[0].region!) as LatLngExpression | undefined}zoom={10}scrollWheelZoom={false}style={{ height: "80vh" }}>
          <SetMapCenter center={ getLAtLonbyArea(markers[0].region!)} />
           <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
             {filter == 4 && <>
             <Marker 
             position={getLAtLonbyArea(markers[0].region!)}>
              <Popup> region:{markers[0].region}<br></br>
              top1:{markers![0].organizeTopFive![0].organName}<br></br>
              top1:{markers![0].organizeTopFive![0].numEvent}<br></br>
              top2:{markers![0].organizeTopFive![1].organName}<br></br>
              top2:{markers![0].organizeTopFive![1].numEvent}<br></br>
              top3:{markers![0].organizeTopFive![2].organName}<br></br>
              top3:{markers![0].organizeTopFive![2].numEvent}<br></br>
              top4:{markers![0].organizeTopFive![3].organName}<br></br>
              top4:{markers![0].organizeTopFive![3].numEvent}<br></br>
              top5:{markers![0].organizeTopFive![4].organName}<br></br>
              top5:{markers![0].organizeTopFive![4].numEvent}
              </Popup>

               </Marker>
               </>
               } 
           </MapContainer> 
          </div>:<>asdasd</>
             }
    </div>
}
    </>
  )
}
