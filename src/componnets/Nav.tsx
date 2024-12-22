import { Dispatch, SetStateAction } from "react";
import { IPropsForMarkers, IQuery } from "../types/interfaces";
import Select from "./select";
interface Props {
  markers: IPropsForMarkers[];
  setMarkers: (n: IPropsForMarkers[]) => void;
  filter: number;
  setFilter: (num: number) => void;
  queries: IQuery[];
  setQueries: Dispatch<SetStateAction<IQuery[]>>
}
export default function Nav({ filter, setFilter, queries, setQueries,markers,setMarkers }: Props) {
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
    </div>
  );
}
