import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            token: localStorage.getItem('token')
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e){
        if(e.key === 'Enter'){
            this.setState({query: encodeURIComponent(e.target.value.trim())});
            fetch('https://api.spotify.com/v1/search?q=album:gold%20artist:abba&type=album', 
                {headers:{'Authorization': 'Bearer ' + this.state.token}})
                .then(response => response.json())
                .then(data => console.log(data))
        }
    } 
    render(){
        return(
            <div>
                <input type="text" placeholder="Search" onKeyPress={this.handleSearch}/>   
                <SearchFunction input={this.state.query} token={this.props.token} />
                {console.log(this.state.query + ' ' + this.state.token)}
            </div>
        );
    }
}
export class SearchFunction extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            token: '',
            results: []
        };
    }
    render(){
        return(
            <div><h5>Search Results</h5>{this.props.input}</div>
        );
    }
}
ReactDOM.render(<SearchInput />,document.getElementById("search"))