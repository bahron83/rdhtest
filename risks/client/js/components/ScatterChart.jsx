import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Cell, CartesianGrid, Tooltip } from 'recharts';
import moment from 'moment';
import SChartTooltip from './SchartTooltip';


const CustomizedYLable = (props) => {
    const {x, y, lab} = props;
    return (
        <g className="recharts-cartesian-axis-label">
        <text x={x} y={y} dy={-10} dx={56} textAnchor="middle" fill="#666" transform="rotate(0)" className="recharts-text">{lab}</text>
        </g>
        );
};

class SChart extends Component {           
    shouldComponentUpdate(nextProps, nextState) {
        const { selectedEventIds: ev, fullContext } = this.props;
        const { loc } = fullContext;
        const { selectedEventIds: nextEv, loc: nextLoc } = nextProps;
        
        if(JSON.stringify(ev) !== JSON.stringify(nextEv) || loc !== nextLoc)
            return true;

        return false;
    } 
    
    render () {        
        const { selectedEventIds, data, unitOfMeasure, total, values, formatDimString } = this.props;         
        if(data.length == 0)
            return null;           
        const dataKey = data[0]['data_key'];
        const dim1 = values && values[0] && values[0][0] || '';        
        const dim1Label = formatDimString(dim1);
        const totals = values && values[0] && values[0][2] || 0;
        const totalMsg = totals > 0 ? `Total ${dim1Label}: ${totals} ${unitOfMeasure} by ${total} events` : '';
        return (
            <span>
                <p>{totalMsg}</p>
                <ScatterChart width={500} height={400} margin={{top: 20, right: 0, bottom: 20, left: 0}}>
                    <XAxis 
                        dataKey='timestamp'
                        domain={['auto', 'auto']}
                        name='Begin Date'
                        tickFormatter={(unixTime) => moment(unixTime).format('YYYY-MM-DD')}
                        type="number"
                    />
                    <YAxis label={<CustomizedYLable lab={unitOfMeasure}/>} dataKey={dataKey} type="number" name={dataKey} unit={unitOfMeasure}/>
                    <CartesianGrid />
                    <Scatter onClick={this.handleClick.bind(this)} data={data} name='Events'>
                        {data.map((entry, index) => {
                            const active = selectedEventIds.includes(entry.event_id);
                            return (
                                <Cell cursor="pointer" stroke={active ? '#2c689c' : '#ffffff'} strokeWidth={active ? 2 : 1} fill={active ? '#ff8f31' : '#2c689c'} key={`cell-${index}`}/>);
                        })
                        }
                    </Scatter>
                    <Tooltip content={<SChartTooltip xAxisUnit={unitOfMeasure} />} />
                </ScatterChart>
            </span>
          
      );
    }
    
    handleClick(event) {
        const { selectEvent, selectedEventIds } = this.props;        
        const active = selectedEventIds.includes(event.event_id);        
        selectEvent([event.event_id], !active, event.iso2);
    }
}

export default SChart;