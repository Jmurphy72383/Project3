import React from "react";
import Chart from "react-apexcharts";
import "./BarChart.css";

const BarChart = (props) => (
    <div className="barchart-div">
        <Chart
            options={props.options}
            series={props.series}
            labels={props.labels}
            type="pie"
            height="100%"
            width="100%"
        />
    </div>
);

export default BarChart;