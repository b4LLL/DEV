import React, {Component} from 'react';
//import ReactDOM from 'react-dom';

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
        this.itemImageCheck = this.itemImageCheck.bind(this);
        this.itemArtistsCheck = this.itemArtistsCheck.bind(this);
        this.itemFollowersCheck = this.itemFollowersCheck.bind(this);
        this.itemGenresCheck = this.itemGenresCheck.bind(this);
    }

    itemArrayCheck(object){     // iterate through the first set items
        for(let itemIndex in object){
            console.log('Item index ' + itemIndex + ' -> name -> ' + object[itemIndex].name)
            console.log('Item index ' + itemIndex + ' -> type -> ' + object[itemIndex].type)
            console.log('Item index ' + itemIndex + ' -> id -> ' + object[itemIndex].id)
        }
    }

    itemAlbumCheck(object, trackFlag){
        if(trackFlag){
            for(let itemIndex in object){
                console.log(object[itemIndex].album.name)
                console.log(object[itemIndex].album.type)
                console.log(object[itemIndex].album.id)
            }
        }else{
            for(let itemIndex in object){
                for(let albumIndex in object[itemIndex].albums){
                    console.log(object[itemIndex].albums[albumIndex].name)
                    console.log(object[itemIndex].albums[albumIndex].type)
                    console.log(object[itemIndex].albums[albumIndex].id)
                }
            }
        }
    }

    itemImageCheck(object, trackFlag){ // 0 -> n is largest to smallest resolution
        if(trackFlag){
            for(let itemIndex in object){
                for(let imageIndex in object[itemIndex].album.images){
                    console.log(object[itemIndex].album.images[imageIndex].height)
                    console.log(object[itemIndex].album.images[imageIndex].width)
                    console.log(object[itemIndex].album.images[imageIndex].url)
                }
            }
        }else{
            for(let itemIndex in object){
                for(let imageIndex in object[itemIndex].images){
                    console.log(object[itemIndex].images[imageIndex].height)
                    console.log(object[itemIndex].images[imageIndex].width)
                    console.log(object[itemIndex].images[imageIndex].url)
                }
            }
        }
            
    }

    itemArtistsCheck(object){
        for(let itemIndex in object){
            for(let artistIndex in object[itemIndex].artists){
                console.log(object[itemIndex].artists[artistIndex].name)
                console.log(object[itemIndex].artists[artistIndex].type)
                console.log(object[itemIndex].artists[artistIndex].id)
            }
        }
    }

    itemFollowersCheck(object){
        for(let itemIndex in object){
            console.log(object[itemIndex].followers.total)
        }
    }

    itemGenresCheck(object){
        for(let itemIndex in object){
            object[itemIndex].genres.forEach(element => {
                console.log(element)    
            });
        }
    }

    paginationAPIcall(object){
        for (var searchType in object){                 //first loop to scan through each searchType presented
            for(let apiIndex in object[searchType]){    //then check what each searchType array API calls now are
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
            switch(searchType){
                case (searchType = 'albums'):
                    this.itemArrayCheck(object[searchType].items)
                    this.itemArtistsCheck(object[searchType].items)
                    this.itemImageCheck(object[searchType].items)
                break;
                case (searchType = 'artists'):
                    this.itemArrayCheck(object[searchType].items)
                    this.itemImageCheck(object[searchType].items)
                    this.itemFollowersCheck(object[searchType].items)
                    this.itemGenresCheck(object[searchType].items)
                break;
                case (searchType = 'tracks'):
                    this.itemArrayCheck(object[searchType].items)
                    this.itemAlbumCheck(object[searchType].items, true) //give true to check different naming scheme in object
                    this.itemImageCheck(object[searchType].items, true)

                break;
                case (searchType = 'playlists'):
                    this.itemArrayCheck(object[searchType].items)
                    this.itemImageCheck(object[searchType].items)
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




