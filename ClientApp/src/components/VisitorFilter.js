import React, {Component} from "react";
import { Nivobar } from "./Nivobar";
import { ChartSelector } from "./ChartSelector";
import { ChartDatePicker } from "./ChartDatePicker";

export class VisitorFilter extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),    
            activeSensor: 1,
            data: [] 
        }
        this.handleChange = this.handleChange.bind(this);
        this.setActiveSensor = this.setActiveSensor.bind(this);
    }

    handleChange = date =>{
        this.setState({
            startDate: date
        })
    }

    setActiveSensor = index =>{
        this.setState({
            activeSensor: index
        })
    }

    fetchData = sensorId =>{
        this.setState({
            data: [
                {
                    "TimeOfDay": "00",
                    "Visitors": 1,
                },
                {
                    "TimeOfDay": "01",
                    "Visitors": 2,
                },
                {
                    "TimeOfDay": "02",
                    "Visitors": 1,
                },
                {
                    "TimeOfDay": "03",
                    "Visitors": 1,
                },
                {
                    "TimeOfDay": "04",
                    "Visitors": 1,
                },
                {
                    "TimeOfDay": "05",
                    "Visitors": 5,
                },
                {
                    "TimeOfDay": "06",
                    "Visitors": 6,
                },
                {
                    "TimeOfDay": "07",
                    "Visitors": 10,
                },
                {
                    "TimeOfDay": "08",
                    "Visitors": 11,
                },
                {
                    "TimeOfDay": "09",
                    "Visitors": 5,
                },
                {
                    "TimeOfDay": "10",
                    "Visitors": 6,
                },
                {
                    "TimeOfDay": "11",
                    "Visitors": 9,
                },
                {
                    "TimeOfDay": "12",
                    "Visitors": 4,
                },
                {
                    "TimeOfDay": "13",
                    "Visitors": 6,
                },
                {
                    "TimeOfDay": "14",
                    "Visitors": 8,
                },
                {
                    "TimeOfDay": "15",
                    "Visitors": 9,
                },
                {
                    "TimeOfDay": "16",
                    "Visitors": 12,
                },
                {
                    "TimeOfDay": "17",
                    "Visitors": 2,
                },
                {
                    "TimeOfDay": "18",
                    "Visitors": 12,
                },
                {
                    "TimeOfDay": "19",
                    "Visitors": 5,
                },
                {
                    "TimeOfDay": "20",
                    "Visitors": 6,
                },
                {
                    "TimeOfDay": "21",
                    "Visitors": 7,
                },
                {
                    "TimeOfDay": "22",
                    "Visitors": 8,
                },
                {
                    "TimeOfDay": "23",
                    "Visitors": 0,
                }
            ]
        })
    }

    render(){
        return(
            <>
            <ChartDatePicker startDate = {this.state.startDate} handleChange = {this.handleChange}/>
            <ChartSelector setActiveSensor = {this.setActiveSensor}/>
            <Nivobar data = {this.state.data}/>
            </>
        )
    }

    componentDidMount(){
        this.fetchData(this.state.activeSensor)
    }
}