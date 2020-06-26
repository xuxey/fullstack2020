import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateFilter} from "../reducers/filterReducer";

const FilterForm = () => {
    const filterContent = useSelector(state => state.filter)
    const dispatch = useDispatch()

    function handleSearch(event) {
        dispatch(updateFilter(event.target.value))
    }

    return (
        <div>
            <h3>Filter</h3>
            <form>
                <input value={filterContent} onChange={handleSearch}/>
            </form>
        </div>
    )
}

export default FilterForm
