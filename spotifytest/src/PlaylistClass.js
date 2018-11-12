import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ResultsDisplay from './ResultsDisplay'
import SearchInput from './SearchInput';

export default class PlaylistClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            token:this.props.token
        }
        this.loadEachItem = this.loadEachItem.bind(this)
        this.loadAPIref = this.loadAPIref.bind(this)
        this.fetchMore = this.fetchMore.bind(this)
        this.prepPlayer = this.prepPlayer.bind(this)
    }

    prepPlayer(type, id){
        let targetSrc = "https://open.spotify.com/embed/" + type + "/" + id
        console.log(targetSrc)
                ReactDOM.render(<SearchInput target={targetSrc}/>, document.getElementById("search"))
        }

    fetchMore(url){
        fetch(url, 
                {headers:{'Authorization': 'Bearer ' + this.props.token}})
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    ReactDOM.render(<ResultsDisplay token={this.props.token} data={data}/>, document.getElementById("type-4"))
                })
            }
    
    loadEachItem(object){
        let playlists = []
        for (let itemIndex in object){
            playlists.push({
                namePlaylist:   object[itemIndex].name,
                typePlaylist:   object[itemIndex].type,
                idPlaylist:     object[itemIndex].id,
                url:        object[itemIndex].image,
                tracks:  object[itemIndex].tracks
            })
        }
        const playlistResults = (
            playlists.map(object => (
                <div key={object.idPlaylist} className="media border p-1" >
                    <div className="media-left media-middle">
                        <img src={object.url} alt={object.url} className="rounded media-object" height="100" width="100" 
                        onClick={()=>this.prepPlayer(object.typePlaylist, object.idPlaylist)}/>
                    </div>
                    <div className="media-body">
                        <p className="small ml-1"><b>Playlist:</b> {object.namePlaylist}</p>
                        <p className="small ml-1"><b>Tracks: </b>{object.tracks}</p>
                    </div>
                </div>
            ))
        )
        return playlistResults
    }
    
    loadAPIref(object){
        let APIarray = []
        APIarray.push({
            previous: object.previous,
            next: object.next,
            total: object.total
        })      
        const apiRefs = (
            APIarray.map(object => (
                <div className="small" key={object.total}>
                    <div className="btn-group p-4">
                        <button type="button" className="btn" value={object.previous} 
                            disabled={(object.previous === null) ? true : false}
                            onClick={() => this.fetchMore(object.previous)}>
                            Previous
                        </button>
                        <button type="button" className="btn" value={object.next} 
                            disabled={(object.next === null) ? true : false} 
                            onClick={() => this.fetchMore(object.next)}>
                            Next
                        </button>
                    </div>
                    Total results: {object.total}
                </div>
            ))
        )
        return apiRefs
    }
   
    render(){
        return(
            <div className="list-group">
                <h5>Playlist results found</h5>
                {this.loadEachItem(this.props.playlistObject.items)}
                {this.loadAPIref(this.props.playlistObject.APIrefs)}
            </div>
        )
    }
}


