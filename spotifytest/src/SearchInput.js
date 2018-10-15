import React, {Component} from 'react'

class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: 'searchInput',
            searchURL: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.listResults = this.listResults.bind(this);
    }

    handleSearch(){
        console.log('now in handleSearch');
    }

    listResults(){

    }

    render(){
        return(
            <div>
                <SearchInput />
                <SearchResult />
            </div>
        );
    }
}

class SearchResult extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        return(
            <div>Something</div>
        );
    }
}

export default SearchInput;
