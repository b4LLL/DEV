import React, {Component} from 'react';

export default class AlbumClass extends Component {
    constructor(props){
        super(props);
        this.albumArray = []
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
    }

    loadEachItem(object){
        var Artists = []
        var Images = []
        for(let itemIndex in object){
            this.albumArray.push({
                name:object[itemIndex].name,
                id:object[itemIndex].id,
                type:object[itemIndex].type
            })
            for(let imageIndex in object[itemIndex].images){
                Images.push({
                    height: object[itemIndex].images[imageIndex].height,
                    width: object[itemIndex].images[imageIndex].width,
                    url: object[itemIndex].images[imageIndex].url
                })
            }
            for(let artistIndex in object[itemIndex].artists){
                Artists.push({
                    name: object[itemIndex].artists[artistIndex],
                    id: object[itemIndex].artists[artistIndex],
                    type: object[itemIndex].artists[artistIndex]
                })
            }
            this.albumArray.push(Artists)
            this.albumArray.push(Images)
        }
        console.log(this.albumArray)
    }
    
    componentDidMount(){
        this.loadEachItem(this.props.albumObject.items)
        this.loadAPIref(this.props.albumObject.APIrefs)
        console.log(this.props.albumObject.items)
    }
    
    render(){
   
    return(
        <div>
            
        </div>);
    }
}