import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class AlbumClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            albumObject:this.props.albumObject
        }
    }
}