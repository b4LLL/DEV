import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class AlbumClass extends Component {
    constructor(props){
        super(props);
        this.APIref = {
            previous: URL || null,
            next: URL || null,
            total: Number
        }
        this.loadEachItem = this.loadEachItem.bind(this)
        this.loadAPIref = this.loadAPIref.bind(this)
    }

    loadAPIref(object){
        this.APIref.previous = object.previous
        this.APIref.next = object.next
        this.APIref.total = object.total
        this.albumDisplayArray.push(this.APIref)
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
                
            ))
        )
        return albumResults
    }
    
    componentDidMount(){
        this.loadAPIref(this.props.albumObject.APIrefs)
        this.loadEachItem(this.props.albumObject.items)
    }
    
    render(){
        return(
            {albumResults}
        )
    }
}

