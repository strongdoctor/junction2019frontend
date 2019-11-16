import React, {Component} from "react";
import { Nivobar } from "./Nivobar";
import { ChartSelector } from "./ChartSelector";
import { ChartDatePicker } from "./ChartDatePicker";
import axios from 'axios';

export class VisitorFilter extends Component{
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            activeSensor: null,
            data: [],
            availableSensorIds: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.setActiveSensor = this.setActiveSensor.bind(this);
    }

    handleChange = date =>{
        this.setState({
            startDate: date
        });

        this.fetchData(null, date);
    }

    setActiveSensor = index =>{
        this.setState({
            activeSensor: index
        });
        this.fetchData(index, null);
    }

    fetchData = (activeSensor, startDate) => {
        
        if(!activeSensor) { activeSensor = this.state.activeSensor }
        if(!startDate) { startDate = this.state.startDate }

        console.log("activeSensor:", activeSensor, " startDate:", startDate);

        const self = this;
        const formattedDate = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`
        axios.get(`/api/sensor/${activeSensor}/date/${formattedDate}`)
        .then(function (response) {
            let reMappedResponse = response.data.map(resp => ({
                TimeOfDay: resp.startTime.split("T")[1].split(":")[0],
                Visitors: resp.visits
            }));

            reMappedResponse.sort((a,b,) => a.TimeOfDay > b.TimeOfDay);

            self.setState({
                data: reMappedResponse
            });
        });
    }

    render(){
        var chartSelectorJsx = null;
        if(this.state.availableSensorIds) {
            chartSelectorJsx= (
                <ChartSelector
                    setActiveSensor={this.setActiveSensor}
                    activeSensor={this.state.activeSensor}
                    sensorIds={this.state.availableSensorIds}
                />
            );
        }

        return(
            <>
                <ChartDatePicker startDate = {this.state.startDate} handleChange = {this.handleChange}/>
                {chartSelectorJsx}
                <Nivobar data = {this.state.data}/>
            </>
        )
    }

    componentDidMount(){
        const self = this;
        axios.get('/api/sensor/')
        .then(function (response) {

            response.data = response.data.sort((a,b,) => a > b.TimeOfDay);

            self.setState({
                availableSensorIds: response.data,
                activeSensor: response.data[0],
            });

            self.fetchData(response.data[0], null)
        });
    }
}