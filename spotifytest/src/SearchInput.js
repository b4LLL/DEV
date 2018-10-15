import React, {Component} from 'react'

export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: '',
            searchURL: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e){
        this.setState({searchInput: e.target.value});
        if(e.key === 'Enter'){
            console.log('submitted');
        }
    }
    render(){
        return(
            <div>
                <input type="search" placeholder="Search" onKeyPress={this.handleSearch}/>   
                <SearchResult list={this.state.searchInput} />
            </div>
        );
    }
}

export class SearchResult extends Component {
    /*constructor(props){
        super(props);
        this.state = {
            list: this.props.list
        }
    }*/
    render(){
        return(
            <div>{this.props.list}</div>
        );
    }
}

