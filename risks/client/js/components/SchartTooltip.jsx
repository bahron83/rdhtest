const React = require('react');

const SChartTooltip = React.createClass({
    propTypes: {
        type: React.PropTypes.string,
        payload: React.PropTypes.array,
        label: React.PropTypes.string,
        active: React.PropTypes.bool,
        xAxisLabel: React.PropTypes.string,
        xAxisUnit: React.PropTypes.string,
        uOm: React.PropTypes.string
    },
    render() {
        const {active, payload, xAxisUnit} = this.props;        
        if(active) {
            const adjustedValue = new Date(payload[0].value).toISOString().split('T')[0];
            return (
                <div className="disaster-chart-tooltip">
                    <p className="disaster-chart-tooltip-label">{`${payload[1].name}: ${payload[1].value.toLocaleString()} ${xAxisUnit}`}</p>
                    <p className="disaster-chart-tooltip-values">{`${payload[0].name}: ${adjustedValue}`}</p>
                </div>)
        }
        return null;
    }
});

module.exports = SChartTooltip;