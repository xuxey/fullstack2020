import React from "react";
import {connect} from "react-redux";
import {updateFilter} from "../reducers/filterReducer";

const FilterForm = (props) => {
    function handleSearch(event) {
        props.updateFilter(event.target.value)
    }

    return (
        <div>
            <h3>Filter</h3>
            <form>
                <input value={props.filterContent} onChange={handleSearch}/>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filterContent: state.filter,
    }
}
const mapDispatchToProps = {updateFilter}
const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(FilterForm)
export default ConnectedFilter
