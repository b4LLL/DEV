import React, {Component} from 'react';

export default class ResultsDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            typeArray: this.props.typeArray,
            data:this.props.data    //this should already be an object
        };
    }

    render(){
        //if (typeof variable.property.thing === 'undefined')..
        /*
            while !undefined
            travese size of data up to data.length
            switch() for each data[] such as tracks/artists etc.
            take first 5 elements of each
                - refer to notes for how to present them possibly.
                - try rendering html in a blank file or software
                - see how it goes
        for (let type = 0; type < 4; type++){ 
            console.log('here')  //change to for loop
            console.log(type + " -> " + this.props.data[type]);
        }
        */
        
        for (let searchType in this.props.data){        //searchType = album/artist etc
            switch(searchType){
                case (searchType = 'tracks'):   // render the track container with list of track items in it
                    // local variables needed here
                    // next API call
                    // previous API call
                    // total number of results 
                    for(let keyIndex in this.props.data[searchType]){           //first level use for next and previous pagination
                        switch(keyIndex){                                       
                            case (keyIndex = 'next'):
                                console.log(searchType + ' -> ' + keyIndex + ' -> ' + this.props.data[searchType][keyIndex])
                            break;
                            case (keyIndex = 'previous'):
                                console.log(searchType + ' -> ' + keyIndex + ' -> ' + this.props.data[searchType][keyIndex])
                            break;
                            case (keyIndex = 'total'):
                                console.log(searchType + ' -> ' + keyIndex + ' -> ' + this.props.data[searchType][keyIndex])
                            break;
                            default:
                        }
                    }
                    for(let index in this.props.data[searchType].items){        // index is the index used to iterate items
                        console.log(searchType + ' -> ' + index + ' -> ')       // scope limited here since let index doesnt allow reset var
                        switch(index){
                            case (index = 'type'):
                                console.log(searchType + ' -> ' + index + ' -> ' + this.props.data[searchType].items[index])
                            break;
                            case (index = 'id'):
                                console.log(searchType + ' -> ' + index + ' -> ' + this.props.data[searchType].items[index])
                            break;
                            case (index = 'name'):
                                console.log(searchType + ' -> ' + index + ' -> ' + this.props.data[searchType].items[index])
                            break;
                            default:
                        }
                        
                        for(let albumIndex in this.props.data[searchType].items[0].album){
                            switch(albumIndex){
                                case (albumIndex = 'type'):
                                    console.log(searchType + ' -> '+ albumIndex + ' -> ' + this.props.data[searchType].items[0].album[albumIndex])
                                break;
                                case (albumIndex = 'id'):
                                    console.log(searchType + ' -> ' + albumIndex + ' -> ' + this.props.data[searchType].items[0].album[albumIndex])
                                break;
                                case (albumIndex = 'name'):
                                    console.log(searchType + ' -> ' + albumIndex + ' -> ' + this.props.data[searchType].items[0].album[albumIndex])
                                break;
                                default:
                            }
                        }
                    }
                    break;
                default:
                    console.log("Other")
            }
        }

    return(
        <div>
            this.props.typeArray + this.props.data.tracks.items
        </div>
        );
    }
}




