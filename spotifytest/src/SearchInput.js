import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ListGroupItem, Checkbox, Label } from 'react-bootstrap'
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
            this.setState({query: encodeURIComponent(e.target.value.trim())}, () => {
                console.log(this.state.query)
                fetch('https://api.spotify.com/v1/search?q=' + this.state.query +'&type=track', 
                    {headers:{'Authorization': 'Bearer ' + this.state.token}})
                    .then(response => response.json())
                    .then(data => console.log(data))
            })
            for (let i = 0; i < SQ.length; i++){
                if(document.getElementById(SQ[i].id).checked === true)
                    console.log(SQ[i].value)
            }
        }
    }

    render(){
        return(
            <div>
                <iframe src="https://open.spotify.com/embed/track/0nLiqZ6A27jJri2VCalIUs" width="300" height="380" frameBorder ="0" allowtransparency="true" allow="encrypted-media" title="Spotify Player">Spotify Player</iframe>
                <input name="search box" type="text" placeholder="Search Spotify" onKeyPress={this.handleSearch}/>                
            </div>
            
        );
    }
}

function ShowList(props){
    const ListOptions = (
            SQ.map((object) => (
                <ListGroupItem key={object.value} className="list-group">
                    <Label>{object.id} <Checkbox key={object.value.toString()} id={object.id}/></Label>
                </ListGroupItem>) //replace this with https://react-bootstrap.github.io/components/button-group/#btn-groups-toggle-group-props
            )
    );
    return(
        <b>
            {ListOptions}
        </b>
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