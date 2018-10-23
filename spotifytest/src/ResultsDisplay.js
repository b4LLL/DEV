import React, {Component} from 'react';

export default class ResultsDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            typeArray: [],
            data:{}
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

        */
    console.log(this.props.data.tracks.items[0].name)
        return(
            <div>
                {this.props.typeArray + this.props.data.tracks.items}
            </div>
            );
    }
}




