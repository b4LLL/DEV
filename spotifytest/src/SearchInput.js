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
        this.ResultDisplay = this.ResultDisplay.bind(this);
    }
    handleSearch(e){
        if(e.key === 'Enter'){
            this.setState({query: encodeURIComponent(e.target.value.trim())});
            fetch('https://api.spotify.com/v1/search?q=name:' + this.state.query, 
                {headers:{'Authorization': 'Bearer ' + this.state.token}})
                .then(response => response.json())
                .then(data => console.log(data))
                this.ResultDisplay()
        }
    } 
    render(){
        let spotifyQueryReq = [
            { name: "checkTrack", id: "checkTrack", value: "Track"},
            { name: "checkArtist", id: "Artist", value: "Artist"},
            { name: "checkAlbum", id: "Album", value: "Album"},
            { name: "checkPlaylist", id: "Playlist", value: "Playlist"}, 
        ];
        return(
            <div id="searchParams">
                <input name="search box" type="text" placeholder="Search Spotify" onKeyPress={this.handleSearch}/>
                {spotifyQueryReq.map((e) => 
                    <label>{e.value}<input key={parseInt(e.name)} type="checkbox" name={e.name} id={e.id} value={e.value}/></label>)}
            </div>    
        );
    }
    ResultDisplay() {
    // <SearchFunction input={this.state.query} token={this.props.token} />
    }
}
ReactDOM.render(<SearchInput />,document.getElementById("search"))