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
        let nodeList = [];
        if(e.key === 'Enter'){
            this.setState({query: encodeURIComponent(e.target.value.trim())});
            fetch('https://api.spotify.com/v1/search?q=name:' + this.state.query, 
                {headers:{'Authorization': 'Bearer ' + this.state.token}})
                .then(response => response.json())
                .then(data => console.log(data))
            for (let i = 0; i < SQ.length; i++){
                if(document.getElementById(SQ[i].id).checked === true){
                    console.log(SQ[i].value)
                }
            }
        }
    }

    render(){
        return(
            <input name="search box" type="text" placeholder="Search Spotify" onKeyPress={this.handleSearch}/>
        );
    }
}

function ShowList(props){
    const ListOptions = (
        <div>
            {SQ.map((object) => 
                <li key={object.value}>
                    <input type="checkbox" key={object.value.toString()} id={object.id} />
                    {' '+ object.id}
                </li>
            )}
        </div>
    );
    return(
        <div>
            {ListOptions}
        </div>
    );
}

const SQ = [
    { id: "Track", value: "track"},
    { id: "Artist", value: "artist"},
    { id: "Album", value: "album"},
    { id: "Playlist", value: "playlist"}, 
];

ReactDOM.render(<SearchInput />, document.getElementById("search"))
ReactDOM.render(<ShowList SQ={SQ} />, document.getElementById("searchparams"))