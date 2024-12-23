import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { IPropsForMarkers, IQuery, ISecDAta } from "./types/interfaces";
import { useState } from "react";
import Nav from "./componnets/Nav";
import React from "react";
import {
  query1,
  query10,
  query11,
  query12,
  query13,
  query14,
  query2,
  query3,
  query4,
  query5,
  query6,
  query7,
  query8,
  query9,
} from "./IQuery";
import Map from "./componnets/Map";
import { socket } from "./main";

export default function App() {
  const [filter, setFilter] = React.useState<number>(0);
  const [queries, setQueries] = useState<IQuery[]>([
    query1,
    query2,
    query3,
    query4,
    query5,
    query6,
    query7,
    query8,
    query9,
    query10,
    query11,
    query12,
    query13,
    query14,
  ]);
  const [markers, setMarkers] = useState<IPropsForMarkers[]>();
 const [topFive,setTopFive] = useState<IPropsForMarkers[]>()
  const [sixth, setSixth] = useState<IPropsForMarkers[]>()

  socket.on('kind-attacks', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery:IPropsForMarkers|null = {attackType:element.attackType,numCasualties:element.numCasualties}
      list.push(dataNaccessery)
    }
    setMarkers(list)
  })

  socket.on('all-most-hurts', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const avarage = element.numCasualties as number / element.locationArr!.length as number
      const dataNaccessery = {region:element.region,numCasualties:avarage,country:element.country,city:element.city,locationArr:element.locationArr}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('region-most-hurts', (data) => {
    // const list = []
    // for (const element of data as IPropsForMarkers[]) {
    //   const avarage = element.numCasualties as number / element.locationArr!.length as number
    //   const dataNaccessery = {region:element.region,numCasualties:avarage,country:element.country,city:element.city,locationArr:element.locationArr}
    //   list.push(dataNaccessery)
    // }  
    setMarkers(data)
  })

  socket.on('country-most-hurts', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const avarage = element.numCasualties as number / element.locationArr!.length as number
      const dataNaccessery = {region:element.region,numCasualties:avarage,country:element.country,city:element.city,locationArr:element.locationArr}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('city-most-hurts', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const avarage = element.numCasualties as number / element.locationArr!.length as number
      const dataNaccessery = {region:element.region,numCasualties:avarage,country:element.country,city:element.city,locationArr:element.locationArr}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('year-trend', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = {year:element.year,month:element.month,numEvent:element.numEvent}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('year-range-trend', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = {year:element.year,month:element.month,numEvent:element.numEvent}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('5year-trend', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = {year:element.year,month:element.month,numEvent:element.numEvent}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('10year-trend', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = {year:element.year,month:element.month,numEvent:element.numEvent}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('region-topFive', (data) => {
    setTopFive(data)
    setMarkers(data)
  })

  socket.on('all-region-topFive', (data) => { 
    setTopFive(data) 
    setMarkers(data)

  })

  socket.on('events-year', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = {organizationName:element.organizationName,numEvent:element.numEvent,year:element.year}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('org-event', (data) => {
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = {organizationName:element.organizationName,numEvent:element.numEvent,year:element.year}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
  })

  socket.on('org-most-events-area', (data) => {
     setSixth(data)
     setMarkers(data)
  })
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Nav
        markers={markers!}
        setMarkers={setMarkers}
        filter={filter}
        setFilter={setFilter}
        queries={queries}
        setQueries={setQueries}
      />
      <div>
        {markers != undefined && (
          <Map
            markers={markers!}
            setMarkers={setMarkers}
            filter={filter}
            setFilter={setFilter}
            queries={queries}
            setQueries={setQueries}
            topFive={topFive!}
            setTopFive={setTopFive}
            sixth={sixth!}
             setSixth={setSixth}
          />
        )}
      </div>
    </div>
  );
}

// const googleStreetViewURL = (lat: number, lng: number) =>
//   `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyB0rL70fxeRtawDwZeUEp9aiNKSYvMsc_A&location=${lat},${lng}&heading=210&pitch=10&fov=90`;

// function LocationMarker() {
//   const [position, setPosition] = useState(null)
//   const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }
