import React, {Component} from 'react';

export default class ResultsDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            typeArray: this.props.typeArray,
            data:this.props.data    //this should already be an object
        };
        this.paginationAPIcall = this.paginationAPIcall.bind(this);
        this.itemArrayCheck = this.itemArrayCheck.bind(this);
        this.itemAlbumCheck = this.itemAlbumCheck.bind(this);
        this.itemAlbumImageCheck = this.itemAlbumImageCheck.bind(this);
        this.itemArtistsCheck = this.itemArtistsCheck.bind(this);
    }

    itemArrayCheck(object){     // iterate through the items
        for(let itemIndex in object){
            console.log('Item index ' + itemIndex + ' -> name -> ' + object[itemIndex].name)
            console.log('Item index ' + itemIndex + ' -> type -> ' + object[itemIndex].type)
            console.log('Item index ' + itemIndex + ' -> id -> ' + object[itemIndex].id)
            this.itemArtistsCheck(object[itemIndex].artists)
            this.itemAlbumCheck(object[itemIndex].album)
            this.itemAlbumImageCheck(object[itemIndex].album.images)
        }
    }

    itemAlbumCheck(object){
        console.log('album name -> ' + object.name)
        console.log('album type -> ' + object.type)
        console.log('album id -> ' + object.id)
        console.log('album type (single etc)-> ' + object.album_type)
    }

    itemAlbumImageCheck(object){ // 0 -> n is largest to smallest resolution
        for(let imageIndex in object){
            console.log('Image ' + imageIndex + ' -> height -> ' + object[imageIndex].height)
            console.log('Image ' + imageIndex + ' -> width -> ' + object[imageIndex].width)
            console.log('Image ' + imageIndex + ' -> url -> ' + object[imageIndex].url)
        }
    }

    itemArtistsCheck(object){
        for (let artistIndex in object){
            console.log('artists index -> ' + artistIndex + ' -> name -> '+ object[artistIndex].name)
            console.log('artists index -> ' + artistIndex + ' -> type -> '+ object[artistIndex].type)
            console.log('artists index -> ' + artistIndex + ' -> id -> '+ object[artistIndex].id)
        }
    }

    paginationAPIcall(object){
        for (var searchType in object){ //first loop to scan through each searchType presented
            for(let apiIndex in object[searchType]){ //then check what each searchType array API calls now are
                switch(apiIndex){                                       
                    case (apiIndex = 'next'):
                        console.log(searchType + ' -> ' + apiIndex + ' -> ' + object[searchType][apiIndex])
                    break;
                    case (apiIndex = 'previous'):
                        console.log(searchType + ' -> ' + apiIndex + ' -> ' + object[searchType][apiIndex])
                    break;
                    case (apiIndex = 'total'):
                        console.log(searchType + ' -> ' + apiIndex + ' -> ' + object[searchType][apiIndex])
                    break;
                    default:
                    //add the API values for each search type to an array that can be processed (like the checkboxes) EZ Clep
                }
            }
            this.itemArrayCheck(object[searchType].items)
        }        
    }

    render(){
        this.paginationAPIcall(this.props.data)
    return(
        <div>
            this.props.typeArray + this.props.data.tracks.items
        </div>
        );
    }
}




