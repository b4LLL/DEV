import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class AlbumClass extends Component {
    constructor(props){
        super(props);
        this.albumDisplayArray=[]
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
                    <li className="list-group-item">
                        <img src={object.url} alt="albumImage" className="rounded"/>
                        <li className="list-group-item">
                            {object.nameAlbum} by {object.nameArtist}
                        </li>
                        
                    </li>
            ))
        )//                        <button type="button" className="list-group-item list-group-item-action">Album -> {object.name}</button>
        return albumResults
    }
    
    componentDidMount(){
        this.loadAPIref(this.props.albumObject.APIrefs)
        //this.loadEachItem()
    }
    
    render(){
        return(
            <div className="list-group">
                {this.loadEachItem(this.props.albumObject.items)}
            </div>
        )
    }
}


