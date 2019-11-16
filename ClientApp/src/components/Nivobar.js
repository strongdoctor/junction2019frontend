import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react';

export class Nivobar extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
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
        }
    }
    render(){
        
        return (<div style={{height: 600}}>
            <ResponsiveBar
                data={this.state.data}
                keys={['Visitors']}
                indexBy="TimeOfDay"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'category10' }}

                
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Hour',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Number of Visitors',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
            </div>);
    }
        
    
}
