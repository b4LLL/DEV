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
    }
    render(){
        return(
            <div>
                <input type="text" placeholder="" onChange={this.handleSearch}></input>
                <SearchResult list={this.state.searchInput} />
            </div>
        );
    }
}

export class SearchResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.list
        };
        console.log(`state : ${this.state.list}`);
    }
    render(){
        return(
            <b>Text : {this.state.list}</b>
        );
    }
}

