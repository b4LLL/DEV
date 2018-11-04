import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ResultsDisplay from './ResultsDisplay'
import { ListGroupItem, Checkbox, Label, ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            token: localStorage.getItem('token'),
            result: '', //needs to be moved to server session
            SQ: [{ id: "Album", value: "album"},
                { id: "Artist", value: "artist"},
                { id: "Track", value: "track"} ,
                { id: "Playlist", value: "playlist"}]
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
                    fetch('https://api.spotify.com/v1/search?q=' + this.state.query +'&type=' + typeArray.toString() + '&limit=3', 
                        {headers:{'Authorization': 'Bearer ' + this.state.token}})
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            ReactDOM.render(<ResultsDisplay typeArray={typeArray} data={data}/>, document.getElementById("type-1"))
                        })
                    }
                )
            } else ((e.target.value === '') 
            ? alert("Please enter a Spotify search query") 
            : alert("Please select what type of search to perform"))
        }
    }
    render(){
        let checkVal = false;
        const ListOptions = (
            this.state.SQ.map((object) => (
                <ListGroupItem key={object.value} className="list-group">
                    <Checkbox key={object.value.toString()} id={object.id} defaultChecked={(object.id === "Track") ? true : checkVal}/> <span>{object.id} </span>
                </ListGroupItem>
            )
        ));
        const InputField = (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Search Spotify</span>
                </div>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onKeyPress={this.handleSearch}/>
            </div>
        );
        return(
            <div>
                {InputField}
                {ListOptions}                
                <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbj9Ksq4BAdj" width="300" height="380" frameBorder ="0" allowtransparency="true" allow="encrypted-media" title="Spotify Player">Spotify Player</iframe>
            </div>
        );
    }
}
ReactDOM.render(<SearchInput />, document.getElementById("search"))