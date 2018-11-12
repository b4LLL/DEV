import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AlbumClass from './AlbumClass';
import TrackClass from './TrackClass';
import ArtistClass from './ArtistClass';
import PlaylistClass from './PlaylistClass';
export default class ResultsDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            token:this.props.token,
            data:this.props.data   //this should already be an object
        };
        this.albumObject = {
            items:{},
            APIrefs:{}
        }
        this.artistObject = {
            items:{},
            APIrefs:{},
        };
        this.trackObject = {
            items:{},
            APIrefs:{}
        };
        this.playlistObject = {
            items:{},
            APIrefs:{}
        }
        this.paginationAPIcall = this.paginationAPIcall.bind(this);
        this.itemAlbumCheck = this.itemAlbumCheck.bind(this);
        this.itemArtistCheck = this.itemArtistCheck.bind(this);
        this.itemTrackCheck = this.itemTrackCheck.bind(this);
        this.itemPlaylistCheck = this.itemPlaylistCheck.bind(this);
        this.APIrefsCheck = this.APIrefsCheck.bind(this);
    }
    APIrefsCheck(object){
        var APIobj = {
            previous: object.previous,
            next:object.next,
            total:object.total
        }
        return(APIobj)
    }
    itemAlbumCheck(object){     // iterate through the first set items
        var itemObj = {}
        for(var itemIndex in object){
            itemObj[itemIndex] = {
                name:object[itemIndex].name,
                type:object[itemIndex].type,
                id:object[itemIndex].id,
                images:Object.values(object[itemIndex].images),
                artists:Object.values(object[itemIndex].artists)
            }
        }
        return(itemObj)
    }
    itemArtistCheck(object){
        var artistObj = {}
        for(var itemIndex in object){
            artistObj[itemIndex] = {
                name:object[itemIndex].name,
                type:object[itemIndex].type,
                id:object[itemIndex].id,
                image: ((object[itemIndex].images.length === 0) ? "Image Missing" : (console.log("Found"),object[itemIndex].images[1].url)),
                genres:object[itemIndex].genres,
                followers:object[itemIndex].followers
            }
        }
        console.log(artistObj)
        return(artistObj)
    }
    itemTrackCheck(object){
        var trackObj = {}
        for(var itemIndex in object){
            trackObj[itemIndex] = {
                name:object[itemIndex].name,
                type:object[itemIndex].type,
                id:object[itemIndex].id,
                album:object[itemIndex].album,
                artist:Object.values(object[itemIndex].artists),
                images:Object.values(object[itemIndex].album.images),
            }
        }
        
        return(trackObj)
    }
    itemPlaylistCheck(object){
        var playlistObj = {}
        for(var itemIndex in object){
            playlistObj[itemIndex] = {
                name:object[itemIndex].name,
                type:object[itemIndex].type,
                id:object[itemIndex].id,
                image: ((object[itemIndex].images.length === 0) ? "Image Missing" : (console.log("Found"),object[itemIndex].images[0].url)),
                total:object[itemIndex].tracks.total
            }
        }
        return(playlistObj)        
    }
    paginationAPIcall(object){
        for (var searchType in object){                 //first loop to scan through each searchType presented
            switch(searchType){
                case (searchType = 'albums'):
                    this.albumObject.items = this.itemAlbumCheck(object[searchType].items)
                    this.albumObject.APIrefs = this.APIrefsCheck(object[searchType])
                    ReactDOM.render(<AlbumClass token={this.state.token} albumObject={this.albumObject}/>, document.getElementById("type-1"))
                break;
                case (searchType = 'artists'):
                    this.artistObject.APIrefs = this.APIrefsCheck(object[searchType])    
                    this.artistObject.items = this.itemArtistCheck(object[searchType].items)
                    ReactDOM.render(<ArtistClass token={this.state.token} artistObject={this.artistObject}/>, document.getElementById("type-2"))
                break;
                case (searchType = 'tracks'):
                    this.trackObject.APIrefs = this.APIrefsCheck(object[searchType])
                    this.trackObject.items = this.itemTrackCheck(object[searchType].items)
                    ReactDOM.render(<TrackClass token={this.state.token} trackObject={this.trackObject}/>, document.getElementById("type-3"))
                break;
                case (searchType = 'playlists'):
                    this.playlistObject.APIrefs = this.APIrefsCheck(object[searchType])
                    this.playlistObject.items = this.itemPlaylistCheck(object[searchType].items)
                    ReactDOM.render(<PlaylistClass token={this.state.token} playlistObject={this.playlistObject}/>, document.getElementById("type-4"))
                break;
                default:
            }
        }
    }
    componentDidMount(){
        this.paginationAPIcall(this.props.data)
    }
    componentDidUpdate(){
        console.log("we're updating!!")
        this.paginationAPIcall(this.props.data)
    }
    render(){
        return(null);
    }
}




