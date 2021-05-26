import React from "react";

class Search extends React.Component {

    render() {
        const { searchName, searchWhich } = this.props;
        return (
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" onChange={searchName} type="text" placeholder="Search" />
                <select className="form=control my-2 my-sm-0" type="text" onChange={searchWhich}>
                    <option value="Name">Name</option>
                    <option value="Email">Mail</option>
                    <option value="Status">Status</option>
                    <option value="Phone">Phone</option>
                </select>
            </form>
        )
    }

}
export default Search;