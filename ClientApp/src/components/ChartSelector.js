import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';

export class ChartSelector extends Component{

    onClick = index =>{
        this.props.setActiveSensor(index)
    } 
    render(){
        const { sensorIds } = this.props;

        const buttonJsx = sensorIds.map(id => (
            <Button
                className={`flex-grow-1 w-100 mx-1${this.props.activeSensor === id ? ' btn btn-success' : ''}`}
                onClick={()=> this.onClick(id)}
                key={`charselector-button-${id}`}
            >
                Sensor {id}
            </Button>
        ));


        return(
            <div
                className="d-flex justify-content-between mt-3"
            >
                {buttonJsx}
            </div>
        )
    }
}
