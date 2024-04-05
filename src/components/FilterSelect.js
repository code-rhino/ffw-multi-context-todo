import React from "react";
import { useFilter } from "../contexts/FilterContext";

const FilterSelect = () => {
    const {filter, setFilter} = useFilter();

    return(
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="active">Active</option>
        </select>
    );
}

export default FilterSelect;