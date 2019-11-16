import React, { Component} from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export class ChartDatePicker extends Component{
    render() {
        return (
          <DatePicker
            selected={this.props.startDate}
            onChange={this.props.handleChange}
            inline
          />
        );
      }
}
