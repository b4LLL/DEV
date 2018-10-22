import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ListGroupItem, Checkbox, Label } from 'react-bootstrap'
export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            token: localStorage.getItem('token')                //needs to be moved to server session
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e){
        let checkedCount = 0
        let typeArray = []
        if(e.key === 'Enter'){
            for (let i = 0; i < SQ.length; i++){
                if(document.getElementById(SQ[i].id).checked === true){
                    console.log(SQ[i].value)
                    typeArray.push(SQ[i].value)
                    checkedCount++
                }
            }
            if(checkedCount !== 0){
                this.setState({query: encodeURIComponent(e.target.value.trim())}, () => {
                    console.log(this.state.query)
                    console.log(typeArray.toString())
                    fetch('https://api.spotify.com/v1/search?q=' + this.state.query +'&type=' + typeArray.toString(), 
                        {headers:{'Authorization': 'Bearer ' + this.state.token}})
                        .then(response => response.json())
                        .then(data => console.log(data))
                })
            }else alert("Please select which search option")
        }
    }

    render(){
        return(
            <div>
                <iframe src="https://open.spotify.com/embed/track/5sICkBXVmaCQk5aISGR3x1" width="300" height="380" frameBorder ="0" allowtransparency="true" allow="encrypted-media" title="Spotify Player">Spotify Player</iframe>
                <input name="search box" type="text" placeholder="Search Spotify" onKeyPress={this.handleSearch}/>                
            </div>
            
        );
    }
}

function ShowOptions(props){
    let checkVal = false;
    const ListOptions = (
        SQ.map((object) => (
            <ListGroupItem key={object.value} className="list-group">
                <Label>{object.id} <Checkbox key={object.value.toString()} id={object.id} defaultChecked={(object.id === "Track") ? true : checkVal}/></Label>
            </ListGroupItem>)
        )
    );
    return(
        <span>{ListOptions}</span>
    );
}

const SQ = [
    { id: "Track", value: "track"},
    { id: "Artist", value: "artist"},
    { id: "Album", value: "album"},
    { id: "Playlist", value: "playlist"}, 
];

ReactDOM.render(<SearchInput />, document.getElementById("search"))
ReactDOM.render(<ShowOptions SQ={SQ} />, document.getElementById("searchparams"))