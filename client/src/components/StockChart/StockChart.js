import React from "react";
import Chart from "react-apexcharts";
import "./StockChart.css";

const MyStockChart = (props) => (
    <div className="chart-div">
        <Chart
            options={props.options}
            series={props.series}
            type="line"
            height="100%"
            width="100%"
        />
    </div>
);

export default MyStockChart;