import React, {Component} from 'react'

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: '',
            searchURL: '',
        }
    }
    render(){
        return(
            <div>
                <p>Search input = {this.state.searchInput}</p>
                <p>Search URL = {this.state.searchURL}</p>
            </div>
        );
    }
}

export default Search;
