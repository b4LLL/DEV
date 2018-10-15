import React, {Component} from 'react'

class SearchInput extends Component {
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
                {console.log(this.state.searchInput)}
            </div>
        );
    }
}

class SearchResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.searchInput
        };
    }
    render(){
        return(
            <div>
                Text : {this.props.list}
                {console.log(`now in SearchResult ${this.props.list}`)}
            </div>
        );
    }
}

export default SearchInput;
