import { Dispatch, SetStateAction } from "react";
import { IPropsForMarkers, IQuery } from "../types/interfaces";
import Select from "./Select";
import Graph from "./Grafh";
interface Props {
  markers: IPropsForMarkers[];
  setMarkers: (n: IPropsForMarkers[]) => void;
  filter: number;
  setFilter: (num: number) => void;
  queries: IQuery[];
  setQueries: Dispatch<SetStateAction<IQuery[]>>
  first: IPropsForMarkers[];
  setfirst: (n: IPropsForMarkers[]) => void;
  third: IPropsForMarkers[];
  setThird: (n: IPropsForMarkers[]) => void;
}
export default function Nav({ filter, setFilter, queries, setQueries,markers,setMarkers,first,setfirst,setThird,third }: Props) {
  return (
    <div>
      Nav
      <Select
        markers={[]}
        setMarkers={setMarkers}
        filter={filter}
        setFilter={setFilter}
        queries={queries}
        setQueries={setQueries}
      />
      {filter == 1 ?
        <Graph bars={[{ key: "numCasualties", color: "#8894d8", name: "num of casualties" }]} data={first!} xKey={'attackType'} /> : ""}
      {filter == 3 ?
        <Graph bars={[{ key: "numEvent", color: "#7344d8", name: "num of events" }]} data={third!} xKey={'month'} /> : ""}
      {filter == 3.1 ?
        <Graph bars={[{ key: "numEvent", color: "#2344d8", name: "num of events" }]} data={third!} xKey={'year'} /> : ""}
         {filter == 3.2 ?
                <Graph bars={[{ key: "numEvent", color: "#2344d8", name: "num of events" }]} data={third!} xKey={'year'} /> : ""}
            {filter == 3.3 ?
                <Graph bars={[{ key: "numEvent", color: "#2344d8", name: "num of events" }]} data={third!} xKey={'year'} /> : ""}
    </div>
  );
}
