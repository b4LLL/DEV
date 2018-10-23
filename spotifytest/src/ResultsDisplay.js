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
        return(
            <div>
                {this.props.typeArray + this.props.data.tracks.items}
            </div>
            );
    }
}




