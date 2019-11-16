import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';

export class ChartSelector extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <ButtonGroup>
                <Button>Sensor 1</Button>
                <Button>Sensor 2</Button>
                <Button>Sensor 3</Button>
            </ButtonGroup>
        )
    }
}
