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
import Graph from "./componnets/Grafh";

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
  const [first, setfirst] = useState<IPropsForMarkers[]>()
  const [third, setThird] = useState<IPropsForMarkers[]>()

  socket.on('kind-attacks', (data) => {
    setfirst(data)
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
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const avarage = element.numCasualties as number / element.locationArr!.length as number
      const dataNaccessery = {region:element.region,numCasualties:avarage,country:element.country,city:element.city,locationArr:element.locationArr}
      list.push(dataNaccessery)
    }  
    setMarkers(list)
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
      const dataNaccessery = { year: element.year, month: element.month, numEvent: element.numEvent }
      list.push(dataNaccessery)
    }
    setThird(list)
  })

  socket.on('year-range-trend', (data) => {
    const list = []
    for (const element1 of data as IPropsForMarkers[][]) {
      const data = {year:element1[0].year,numEvent:0}
      for (const element of element1 as IPropsForMarkers[]) {
        data.numEvent += element.numEvent!
      }
      list.push(data)
    }  
    setThird(list)
  })

  socket.on('5year-trend', (data) => {
    const list = []
    for (const element1 of data as IPropsForMarkers[][]) {
      const data = {year:element1[0].year,numEvent:0}
      for (const element of element1 as IPropsForMarkers[]) {
        data.numEvent += element.numEvent!
      }
      list.push(data)
    }
    console.log(list)
    setThird(list)
  })

  socket.on('10year-trend', (data) => {
    const list = []
    for (const element1 of data as IPropsForMarkers[][]) {
      const data = {year:element1[0].year,numEvent:0}
      for (const element of element1 as IPropsForMarkers[]) {
        data.numEvent += element.numEvent!
      }
      list.push(data)
    } 
    setThird(list)
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
        first={first!}
        setfirst={setfirst}
        third={third!}
         setThird={setThird}
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
