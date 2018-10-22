import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ListGroupItem, Checkbox, Label } from 'react-bootstrap'
export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            token: localStorage.getItem('token'),
            result: '',                //needs to be moved to server session
            SQ: [
                { id: "Track", value: "track"},
                { id: "Artist", value: "artist"},
                { id: "Album", value: "album"},
                { id: "Playlist", value: "playlist"}, 
            ]
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e){
        let checkedCount = 0
        let typeArray = []
        if(e.key === 'Enter'){
            for (let i = 0; i < this.state.SQ.length; i++){
                if(document.getElementById(this.state.SQ[i].id).checked === true){
                    typeArray.push(this.state.SQ[i].value)
                    checkedCount++
                }
            }
            if((checkedCount !== 0) && (e.target.value !== '')){
                this.setState({query: encodeURIComponent(e.target.value.trim())}, () => {
                    fetch('https://api.spotify.com/v1/search?q=' + this.state.query +'&type=' + typeArray.toString(), 
                        {headers:{'Authorization': 'Bearer ' + this.state.token}})
                        .then(response => response.json())
                        .then(data => {
                            console.log(data + data.tracks.items[0].id)
                            /*  process the data response here:
                                https://developer.mozilla.org/en-US/docs/Web/API/Body/json
                                send the json object to another class to display
                                can probably render it at the bottom <ShowResults data={processedObject} />
                                example if track search:    data.tracks.items[{}].type
                                                            data.tracks.items[{}].id
                            */
                        })
                    }
                )
            } else ((e.target.value === '') ? alert("Please enter a Spotify search query") : alert("Please select what type of search to perform"))
        }
    }
    render(){
        let checkVal = false;
        const ListOptions = (
            this.state.SQ.map((object) => (
                <ListGroupItem key={object.value} className="list-group">
                    <Label>{object.id} <Checkbox key={object.value.toString()} id={object.id} defaultChecked={(object.id === "Track") ? true : checkVal}/></Label>
                </ListGroupItem>)
            )
        );
        return(
            <div>
                <input name="search box" type="text" placeholder="Search Spotify" onKeyPress={this.handleSearch}/>
                {ListOptions}                
                <iframe src="https://open.spotify.com/embed/album/6lrm01OVZZVmarH2XLSAXZ" width="300" height="380" frameBorder ="0" allowtransparency="true" allow="encrypted-media" title="Spotify Player">Spotify Player</iframe>
            </div>
        );
    }
}
ReactDOM.render(<SearchInput />, document.getElementById("search"))
