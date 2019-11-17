import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react';

export class Nivobar extends Component{
    render(){
        const pixelHeight = 350;

        if(!this.props.data) {
            return null;
        } else if(this.props.data.length === 0) {
            return (
                <div
                    style={{
                        height: `${pixelHeight}px`
                    }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <span>No data available</span>
                </div>
            )
        }

        return (<div style={{height: pixelHeight}}>
            <ResponsiveBar
                data={this.props.data}
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
                    legend: 'Time of day',
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
