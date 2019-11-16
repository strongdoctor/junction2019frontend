import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';

export class ChartSelector extends Component{

    onClick = index =>{
        this.props.setActiveSensor(index)
    } 
    render(){
        const { sensorIds } = this.props;

        const buttonJsx = sensorIds.map(id => (
            <Button className={this.props.activeSensor === id ? 'btn btn-success' : ''} onClick={()=> this.onClick(id)}>Sensor {id}</Button>
        ));


        return(
            <ButtonGroup>
                {buttonJsx}
            </ButtonGroup>
        )
    }
}
