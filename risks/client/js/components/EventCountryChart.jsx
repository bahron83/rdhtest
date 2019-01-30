import React, { Component } from 'react';
import { BarChart, Bar, XAxis, Cell, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import ChartTooltip from './ChartTooltip';


const CustomizedYLable = (props) => {
    const {x, y, lab} = props;
    return (
        <g className="recharts-cartesian-axis-label">
        <text x={x} y={y} dy={-10} dx={56} textAnchor="middle" fill="#666" transform="rotate(0)" className="recharts-text">{lab}</text>
        </g>
        );
};

class EventCountryChart extends Component {    
    getChartData() {         
        const { data } = this.props; 
        if(data) {
            return (
                data.map(v => {
                    return {'name': v[0], 'value': parseFloat(v[3], 10)}
                })
            )
        }               
        return [];
    }

    getTotals() {
        const { data } = this.props; 
        let total = 0;
        if(data) {            
            for(let i=0;i<data.length;i++) {
                total += parseFloat(data[i][3], 10)
            }
        }               
        return total.toLocaleString();
    }

    shouldComponentUpdate(nextProps, nextState) {        
        if(this.props.fullContext.loc !== nextProps.fullContext.loc)
            return true;

        return false;
    }    

    render() {          
        const { uOm, skipLabel, data, total, formatDimString } = this.props;
        const chartData = this.getChartData(); 
        if(chartData.length > 0) {
            const dimensionX = 'Country'; 
            const totals = this.getTotals(); 
            const dim1 = data && data[0][1] || '';
            const dim1Label = formatDimString(dim1);
            return (          
                <span>
                    <p>{`Total ${dim1Label}: ${totals} ${uOm} by ${total} events`}</p>
                    <ResponsiveContainer width="100%" height={200}>                                        
                        <BarChart width={500} height={200} data={chartData} margin={{top: 20, right: 0, left: 0, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name"/>
                            <YAxis label={<CustomizedYLable lab={uOm}/>}/> 
                            <Tooltip content={<ChartTooltip xAxisLabel={dimensionX} xAxisUnit='' uOm={uOm} skipLabel={skipLabel}/>}/>
                            <Bar dataKey="value" onClick={this.handleClick.bind(this)}>                    
                                {chartData.map((entry,index) => {                            
                                    const active = entry.name === this.props.fullContext.loc;
                                    return(
                                        <Cell cursor="pointer" stroke={"#ff8f31"} strokeWidth={active ? 2 : 0} fill={active ? '#ff8f31' : '#2c689c'} key={`cell-${index}`}/>);                            
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </span>
                )
        }
        return null;
    }

    handleClick(item, index) {        
        const { zoomInOut, contextUrl, fullContext } = this.props;        
        const dataHref = `${contextUrl}/risks/data_extraction/reg/${fullContext.reg}/loc/${item.name}/`;
        const geomHref = `${contextUrl}/risks/data_extraction/reg/${fullContext.reg}/geom/${item.name}/`;
        zoomInOut(dataHref, geomHref);
    }

    formatYTiks(v) {
        return v.toLocaleString();
    }

    formatXTiks(v) {
        return !isNaN(v) && parseFloat(v).toLocaleString() || v;
    }
}

export default EventCountryChart;
