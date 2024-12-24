import { Dispatch, SetStateAction } from "react";
import { IPropsForMarkers, IQuery } from "../types/interfaces";
import Select from "./Select";
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
export default function Nav({ filter, setFilter, queries, setQueries,setMarkers }: Props) {
  return (
    <div  >
      <Select 
        markers={[]}
        setMarkers={setMarkers}
        filter={filter}
        setFilter={setFilter}
        queries={queries}
        setQueries={setQueries}
      /> 
    </div>
  );
}
