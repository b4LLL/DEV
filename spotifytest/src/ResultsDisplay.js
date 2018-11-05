import React, {Component} from 'react';
//import ReactDOM from 'react-dom';

export default class ResultsDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            typeArray:this.props.typeArray,
            data:this.props.data,    //this should already be an object
        };
        this.albumObject = {
            items:{},
            artists:{},
            images:{},
            APIrefs:{}
        };
        this.artistObject = {
            items:{},
            images:{},
            APIrefs:{},
            genres:[],
            followers:Number
        };
        this.trackObject = {
            items:{},
            albums:{},
            images:{},
            APIrefs:{}
        };
        this.playlistObject = {
            items:{},
            images:{},
            APIrefs:{}
        }
        this.paginationAPIcall = this.paginationAPIcall.bind(this);
        this.itemArrayCheck = this.itemArrayCheck.bind(this);
        this.itemAlbumCheck = this.itemAlbumCheck.bind(this);
        this.itemImageCheck = this.itemImageCheck.bind(this);
        this.itemArtistsCheck = this.itemArtistsCheck.bind(this);
        this.itemFollowersCheck = this.itemFollowersCheck.bind(this);
        this.itemGenresCheck = this.itemGenresCheck.bind(this);
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

    itemArrayCheck(object){     // iterate through the first set items
        var itemObj = {}
        for(let itemIndex in object){
            itemObj[itemIndex] = {
                name:object[itemIndex].name,
                type:object[itemIndex].type,
                id:object[itemIndex].id
            }
        }
        return(itemObj)
    }

    itemAlbumCheck(object){
        var albumObj = {}
            for(let itemIndex in object){
                albumObj[itemIndex] = {
                    name:object[itemIndex].album.name,
                    type:object[itemIndex].album.type,
                    id:object[itemIndex].album.id
                }
            }
        return(albumObj)
    }

    itemImageCheck(object, trackFlag){ // 0 -> n is largest to smallest resolution
        var imageObj = {}
        if(trackFlag){
            for(let itemIndex in object){
                for(let imageIndex in object[itemIndex].album.images){
                    imageObj[imageIndex] = {
                        height:object[itemIndex].album.images[imageIndex].height,
                        width:object[itemIndex].album.images[imageIndex].width,
                        url:object[itemIndex].album.images[imageIndex].url
                    }
                }
            }
        }else{
            for(let itemIndex in object){
                for(let imageIndex in object[itemIndex].images){
                    imageObj[imageIndex] = {
                        height:object[itemIndex].images[imageIndex].height,
                        width:object[itemIndex].images[imageIndex].width,
                        url:object[itemIndex].images[imageIndex].url
                    }
                }
            }
        }
        return(imageObj)
    }

    itemArtistsCheck(object){
        var artistObj = {}
        for(let itemIndex in object){
            for(let artistIndex in object[itemIndex].artists){
                artistObj[artistIndex] = {
                    name:object[itemIndex].artists[artistIndex].name,
                    type:object[itemIndex].artists[artistIndex].type,
                    id:object[itemIndex].artists[artistIndex].id
                }
            }
        }
        return(artistObj)
    }

    itemFollowersCheck(object){
        for(let itemIndex in object){
            return(object[itemIndex].followers.total)
        }
    }

    itemGenresCheck(object){
        var genreArray = []
        for(let itemIndex in object){
            object[itemIndex].genres.forEach(element => {
                genreArray.push(element)
            });
        }
        return(genreArray)
    }

    paginationAPIcall(object){
        for (var searchType in object){                 //first loop to scan through each searchType presented
            switch(searchType){
                case (searchType = 'albums'):
                    this.albumObject.items = this.itemArrayCheck(object[searchType].items)
                    this.albumObject.artists = this.itemArtistsCheck(object[searchType].items)
                    this.albumObject.images = this.itemImageCheck(object[searchType].items,false)
                    this.albumObject.APIrefs = this.APIrefsCheck(object[searchType])
                break;
                case (searchType = 'artists'):
                    this.artistObject.items = this.itemArrayCheck(object[searchType].items)
                    this.artistObject.images = this.itemImageCheck(object[searchType].items)
                    this.artistObject.followers = this.itemFollowersCheck(object[searchType].items)
                    this.artistObject.genres.push(this.itemGenresCheck(object[searchType].items))
                    this.artistObject.APIrefs = this.APIrefsCheck(object[searchType])
                break;
                case (searchType = 'tracks'):
                    this.trackObject.items = this.itemArrayCheck(object[searchType].items)
                    this.trackObject.albums = this.itemAlbumCheck(object[searchType].items)
                    this.trackObject.images = this.itemImageCheck(object[searchType].items, true)
                    this.trackObject.APIrefs = this.APIrefsCheck(object[searchType])
                break;
                case (searchType = 'playlists'):
                    this.playlistObject.items = this.itemArrayCheck(object[searchType].items)
                    this.playlistObject.images = this.itemImageCheck(object[searchType].items, false)
                    this.playlistObject.APIrefs = this.APIrefsCheck(object[searchType])
                break;
                default:
            }
        }
    }

    render(){
        this.paginationAPIcall(this.props.data)
    return(
        <div>
        
        </div>
        );
    }
}




