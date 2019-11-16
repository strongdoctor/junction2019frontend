import React, {
    Component
} from 'react';

export class Word extends Component {
    render() {
        return ( 
        <div>
            <p>{this.props.hello}</p>
        </div>
        );
    }
}