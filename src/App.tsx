import "leaflet/dist/leaflet.css";
import "./App.css";
import { IPropsForMarkers, IQuery } from "./types/interfaces";
import { useState } from "react";
import Nav from "./componnets/Nav";
import React from "react";
import {query1,query10,query11,query12,query13,query14,query2,query3,query4,query5,query6,query7,query8,query9,
} from "./IQuery";
import Map from "./componnets/Map";
import { socket } from "./main";
import Graph from "./componnets/Grafh";
 
// import CreateAttack from "./componnets/CreateAttack";

export default function App() {
  const [filter, setFilter] = React.useState<number>(0);
  const [queries, setQueries] = useState<IQuery[]>([
    query1,query2,query3,query4,query5,query6,query7,query8,query9,query10,query11,query12,query13,query14,
  ]);
  const [markers, setMarkers] = useState<IPropsForMarkers[]>();
 const [topFive,setTopFive] = useState<IPropsForMarkers[]>()
  const [sixth, setSixth] = useState<IPropsForMarkers[]>()
  const [first, setfirst] = useState<IPropsForMarkers[]>()
  const [third, setThird] = useState<IPropsForMarkers[]>()
  const [fourth, setfourth] = useState<IPropsForMarkers[]>()
  const [fifth, setfifth] = useState<IPropsForMarkers[]>()
  const [searchBool, setsearchBool] = useState<boolean>(false)
  const [searchData, setsearchData] = useState<IPropsForMarkers[]>()
  const [thirdRange, setthirdRange] = useState<IPropsForMarkers[]>()
  const [add, setAdd] = useState(false)

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
  socket.on('search', (data) => {   
    setsearchBool(true)
    setsearchData(data)
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
      const data = { year: element1[0].year, numEvent: 0 }
      for (const element of element1 as IPropsForMarkers[]) {
        data.numEvent += element.numEvent!
      }
      list.push(data)
    }
    setthirdRange(list)
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
  socket.on('region-topFive', (data) => {
    setfourth(data[0].organizeTopFive)
    console.log(fourth)
  })

  socket.on('all-region-topFive', (data) => { 
    setTopFive(data) 
    setMarkers(data)
  })

  socket.on('all-region-topFive', (data) => {
    console.log(data)
    const list = []
     for (const element1 of data as any[]) {
      for (const element of element1.organizeTopFive) {
        list.push(element)
      }
      }
     setfourth(list)
   
  })
  socket.on('events-year', (data) => {
    console.log(data)
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = { organizationName: element.organizationName, numEvent: element.numEvent, year: element.year }
      list.push(dataNaccessery)
    }
    setfifth(list)
  })

  socket.on('org-event', (data) => {
    console.log(data)
    const list = []
    for (const element of data as IPropsForMarkers[]) {
      const dataNaccessery = { organizationName: element.organizationName, numEvent: element.numEvent, year: element.year }
      list.push(dataNaccessery)
    }
    setfifth(list)
  })

  socket.on('org-most-events-area', (data) => {
     setSixth(data)
     setMarkers(data)
  })
  
   
  return (
    <div className="app" >
      <Nav
        markers={markers!}setMarkers={setMarkers}
        filter={filter}setFilter={setFilter}
        queries={queries} setQueries={setQueries}
        first={first!}setfirst={setfirst}
        third={third!}setThird={setThird}
      />
      <button onClick={() => setAdd(!add) }>{add ? "x" : "+"}</button>
      <main>
        
        {filter == 2 || filter == 2.1 || filter == 2.2 || filter == 2.3 || filter == 4 || filter == 4.1 || filter == 6  || add || searchBool? (
          <Map markers={markers!}setMarkers={setMarkers}
            filter={filter} setFilter={setFilter}
            queries={queries}setQueries={setQueries}
            topFive={topFive!}setTopFive={setTopFive}
            sixth={sixth!}setSixth={setSixth}
            add={add}
            setAdd={setAdd}
            setsearchBool={setsearchBool}
            searchBool={searchBool}
            searchData={searchData!}
          />
        ) : ""}
         {filter == 1 ?
                <Graph bars={[{ key: "numCasualties", color: "#8894d8", name: "num of casualties" }]} data={first!} xKey={'attackType'} /> : ""}
            {filter == 3 ?
                <Graph bars={[{ key: "numEvent", color: "#f28919", name: "num of events" }]} data={third!} xKey={'month'} /> : ""}
            {filter == 3.1 ?
                <Graph bars={[{ key: "numEvent", color: "#f52630", name: "num of events" }]} data={thirdRange!} xKey={'year'} /> : ""}
            {filter == 3.2 ?
                <Graph bars={[{ key: "numEvent", color: "#26d3f5", name: "num of events" }]} data={third!} xKey={'year'} /> : ""}
            {filter == 3.3 ?
                <Graph bars={[{ key: "numEvent", color: "#eaf604", name: "num of events" }]} data={third!} xKey={'year'} /> : ""}
            {filter == 4 ?
                <Graph bars={[{ key: "numEvent", color: "#21f256", name: "num of events" }]} data={fourth!} xKey={'organName'} /> : ""}
            {filter == 4.1 ?
                <Graph bars={[{ key: "numEvent", color: "#5e51c0", name: "num of events" }]} data={fourth!} xKey={'organName'} /> : ""}
            {filter == 5 ?
                <Graph bars={[{ key: "numEvent", color: "#1322d8", name: "num of events by year" }]} data={fifth!} xKey={'organizationName'} /> : ""}
            {filter == 5.1 ?
                <Graph bars={[{ key: "numEvent", color: "#f245e3", name: "num of events by organization name" }]} data={fifth!} xKey={'year'} /> : ""}
 
      </main>
    </div>
  );
}
