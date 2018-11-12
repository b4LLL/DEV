import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ResultsDisplay from './ResultsDisplay'
import SearchInput from './SearchInput';

export default class TrackClass extends Component {
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
                    ReactDOM.render(<ResultsDisplay token={this.props.token} data={data}/>, document.getElementById("type-2"))
                })
            }
    
    loadEachItem(object){
        let tracks = []
        console.log(object)
        for (let itemIndex in object){
            tracks.push({
                nameTrack:   object[itemIndex].name,
                typeTrack:   object[itemIndex].type,
                idTrack:     object[itemIndex].id,
                height:     object[itemIndex].album.images[1].height,
                width:      object[itemIndex].album.images[1].width,
                url:        object[itemIndex].album.images[1].url,
                nameArtist:   object[itemIndex].artist[0].name,
                typeArtist:   object[itemIndex].artist[0].type,
                idArtist:     object[itemIndex].artist[0].id
            })
        }
        const trackResults = (
            tracks.map(object => (
                <div key={object.idTrack} className="media border m-2" >
                    <div className="media-left media-middle">
                        <img src={object.url} alt="albumImage" className="rounded media-object" height="100" width="100" onClick={()=>this.prepPlayer(object.typeTrack, object.idTrack)}/>
                    </div>
                    <div className="media-body">
                        <p className="small"><b>Album:</b> {object.nameTrack}</p><p className="small"><b>Artist: </b>{object.nameArtist}</p>
                    </div>
                </div>
            ))
        )
        return trackResults
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
            <h5>Track results found</h5>
                {this.loadEachItem(this.props.trackObject.items)}
                {this.loadAPIref(this.props.trackObject.APIrefs)}
            </div>
        )
    }
}