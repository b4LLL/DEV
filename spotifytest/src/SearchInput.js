import React, {Component} from 'react'

export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: 'Empty'
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e){
        if(e.key === 'Enter'){
            this.setState({searchInput: e.target.value});

        }
    }    
    render(){
        return(
            <div>
                <input type="text" placeholder="Search" onKeyPress={this.handleSearch}/>   
                <SearchResult list={this.state.searchInput} />
                {console.log(this.state.searchInput)}
            </div>
        );
    }

}

export class SearchResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: ''
        }
    }
    render(){
        return(
            <div>{this.props.list}</div>
        );
    }
}

