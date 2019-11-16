import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';

export class ChartSelector extends Component{

    onClick = index =>{
        this.props.setActiveSensor(index)
    } 
    render(){
        return(
            <ButtonGroup>
                <Button onClick={()=> this.onClick(1)}>Sensor 1</Button>
                <Button onClick={()=> this.onClick(2)}>Sensor 2</Button>
                <Button onClick={()=> this.onClick(3)}>Sensor 3</Button>
            </ButtonGroup>
        )
    }
}
