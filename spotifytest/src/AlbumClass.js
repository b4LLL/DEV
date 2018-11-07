import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class AlbumClass extends Component {
    constructor(props){
        super(props);
        this.loadEachItem = this.loadEachItem.bind(this)
        this.loadAPIref = this.loadAPIref.bind(this)
        this.prepPlayer = this.prepPlayer.bind(this)
    }

    loadEachItem(object){
        let albums = []
        console.log(object)
        for (let itemIndex in object){
            albums.push({
                nameAlbum:   object[itemIndex].name,
                typeAlbum:   object[itemIndex].type,
                idAlbum:     object[itemIndex].id,
                height:     object[itemIndex].images[1].height,
                width:      object[itemIndex].images[1].width,
                url:        object[itemIndex].images[1].url,
                nameArtist:   object[itemIndex].artists[0].name,
                typeArtist:   object[itemIndex].artists[0].type,
                idArtist:     object[itemIndex].artists[0].id
            })
        }
        const albumResults = (
            albums.map(object => (
                <figure key={object.idAlbum} className="figure">
                    <img src={object.url} alt="albumImage" className="rounded" height="128" width="128" onClick={this.prepPlayer(object.type, object.id)}/>
                        <div className="align-top">{object.nameAlbum} by {object.nameArtist}</div>
                </figure>
            ))
        )
        return albumResults
    }
    
    prepPlayer(){

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
            <div key={object.total} className="btn-group p-4">
                <button type="button" className="btn" value={object.previous} disabled={(object.previous === null) ? true : false}>
                    Previous
                </button>
                <button type="button" className="btn" value={object.next} disabled={(object.next === null) ? true : false}>
                    Next
                </button>
                <div>
                    Total results: {object.total}
                </div>
            </div>
            ))
        )
        return apiRefs
    }    

    render(){
        return(
            <div className="list-group">
                {this.loadEachItem(this.props.albumObject.items)}
                {this.loadAPIref(this.props.albumObject.APIrefs)}
            </div>
        )
    }
}


