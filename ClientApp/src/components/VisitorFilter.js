import React, { Component } from "react";
import { Nivobar } from "./Nivobar";
import { ChartSelector } from "./ChartSelector";
import { ChartDatePicker } from "./ChartDatePicker";
import axios from 'axios';
import SensorLocationMap from "./SensorLocationMap";
import { Collapse, Button } from 'reactstrap';

export class VisitorFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            activeSensor: null,
            data: [],
            availableSensors: null,
            demoCollapseOpen: false,
            snowDepth: 0,
            windSpeed: 1,
            temperature: 21,
            rainIntensity: 2,
            cloudiness: 'PartlyCloudy',
        }
        this.handleChange = this.handleChange.bind(this);
        this.setActiveSensor = this.setActiveSensor.bind(this);
        this.toggleDemoCollapse = this.toggleDemoCollapse.bind(this);
        this.snowDepthChange = this.snowDepthChange.bind(this);
        this.temperatureChange = this.temperatureChange.bind(this);
        this.windSpeedChange = this.windSpeedChange.bind(this);
        this.rainIntensityChange = this.rainIntensityChange.bind(this);
        this.cloudinessChange = this.cloudinessChange.bind(this);
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });

        this.fetchData(null, date);
    }

    setActiveSensor = index => {
        this.setState({
            activeSensor: index
        });

        this.fetchData(index, null);
    }

    fetchData = (activeSensor, startDate) => {

        if (!activeSensor) { activeSensor = this.state.activeSensor }
        if (!startDate) { startDate = this.state.startDate }

        const self = this;
        const formattedDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
        const {
            snowDepth,
            windSpeed,
            temperature,
            rainIntensity,
            cloudiness
        } = this.state;

        axios.get(
            `/api/sensor/${activeSensor}/date/${formattedDate}/weather?snowDepth=${snowDepth}&windSpeed=${windSpeed}&temperature=${temperature}&rainIntensity=${rainIntensity}&cloudiness=${cloudiness}`
        )
            .then(function (response) {
                const arr1 = [];

                Object.keys(response.data).forEach((key) => {
                    arr1.push({
                        TimeOfDay: key,
                        Visitors: Math.floor(response.data[key]),
                    });
                });

                const sortedArr = [
                    arr1.find(a => a.TimeOfDay === "Night"),
                    arr1.find(a => a.TimeOfDay === "Morning"),
                    arr1.find(a => a.TimeOfDay === "Afternoon"),
                    arr1.find(a => a.TimeOfDay === "Evening"),
                ];

                sortedArr[0].TimeOfDay = "Night (00:00 - 06:00";
                sortedArr[1].TimeOfDay = "Morning (06:00 - 12:00)";
                sortedArr[2].TimeOfDay = "Afternoon (12:00 - 18:00)";
                sortedArr[3].TimeOfDay = "Evening (18:00 - 24:00)";

                self.setState({
                    data: sortedArr
                });
            });
    }

    toggleDemoCollapse() {
        this.setState({
            demoCollapseOpen: !this.state.demoCollapseOpen,
        });
    }

    snowDepthChange(e) { this.setState({ snowDepth: e.target.value }) }

    windSpeedChange(e) { this.setState({ windSpeed: e.target.value }) }

    temperatureChange(e) { this.setState({ temperature: e.target.value }) }

    rainIntensityChange(e) { this.setState({ rainIntensity: e.target.value }) }

    cloudinessChange(e) { this.setState({ cloudiness: e.target.value }) }

    render() {
        var chartSelectorJsx = null;
        if (this.state.availableSensors) {
            const sensorIds = this.state.availableSensors.map(as => as.CounterID_ASTA);

            chartSelectorJsx = (
                <ChartSelector
                    setActiveSensor={this.setActiveSensor}
                    activeSensor={this.state.activeSensor}
                    sensorIds={sensorIds}
                />
            );
        }

        return (
            <>
                <SensorLocationMap
                    setActiveSensor={this.setActiveSensor}
                    activeSensor={this.state.activeSensor}
                />

                <ChartDatePicker startDate={this.state.startDate} handleChange={this.handleChange} />
                <Button color="primary" onClick={this.toggleDemoCollapse} style={{ marginTop: '1rem' }}>Toggle demo inputs</Button>
                <Collapse isOpen={this.state.demoCollapseOpen}>
                    <div className="d-flex justify-content-between">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Snow depth</span>
                            </div>
                            <input
                                type="number" step="0.01"
                                value={this.state.snowDepth}
                                className="form-control"
                                onChange={this.snowDepthChange}
                            />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Wind speed</span>
                            </div>
                            <input
                                type="number" step="0.01"
                                value={this.state.windSpeed}
                                className="form-control"
                                onChange={this.windSpeedChange}
                            />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Temperature</span>
                            </div>
                            <input
                                type="number" step="0.01"
                                value={this.state.temperature}
                                className="form-control"
                                onChange={this.temperatureChange}
                            />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Rain intensity</span>
                            </div>
                            <input
                                type="number" step="0.01"
                                value={this.state.rainIntensity}
                                className="form-control"
                                onChange={this.rainIntensityChange}
                            />
                        </div>
                    </div>
                    <select value={this.state.cloudiness} onChange={this.cloudinessChange}>
                        <option value="Clear">Clear</option>
                        <option value="PartlyCloudy">Partly Cloudy</option>
                        <option value="Cloudy">Cloudy</option>
                    </select>
                </Collapse>
                {chartSelectorJsx}
                <Nivobar data={this.state.data} />
            </>
        )
    }

    componentDidMount() {
        const self = this;
        axios.get('/api/sensor/')
            .then(function (response) {

                response.data = response.data.sort((a, b, ) => a > b.TimeOfDay);

                self.setState({
                    availableSensors: response.data,
                    activeSensor: response.data[0].CounterID_ASTA,
                });

                self.fetchData(response.data[0].CounterID_ASTA, null)
            });
    }
}