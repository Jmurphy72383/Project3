import React, { Component } from "react";
import Axios from 'axios';
import "./Portfolio.css";
import PortfolioTable from "../../components/PortfolioTable";
import BarChart from "../../components/BarChart";
import Wrapper from "../../components/Wrapper";

const userId = 1;

class Portfolio extends Component {
    state = {
        options: {},
        series: [],
        labels: [],
        currentUserName: '',
        currentUserEmail: '',
        stocksOwned: []
    }

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name
        });
        this.showPortfolioHandler();
    }

    showPortfolioHandler = () => {
        Axios.get('/api/stocksAll/' + userId)
        .then(response => {
            console.log(response.data);
            const donutData = Object.values(response.data);
            const companyArray = [];
            const totalArray = [];
            donutData.map(item => {
                companyArray.push(item.company_name);
                totalArray.push(item.shares * item.buy_price);
                return companyArray && totalArray
            })
            console.log(totalArray);
            this.setState({
                stocksOwned: response.data,
                options: {
                    chart: {
                        width: 500
                    }
                },
                series: totalArray,
                labels: companyArray
            });
        });
    }

    sellStockHandler = (event) => {
        const soldStock = event.target.value;
        Axios.delete('/api/stocks/' + soldStock)
        .then(response => {
            console.log(response);
            this.showPortfolioHandler();
        });
    }

    updatePriceHandler = (event) => {
        const updateQuery = event.target.name;
        //const updatedStock = event.target.value;
        Axios.get("https://api.iextrading.com/1.0//stock/" + updateQuery + "/batch?types=quote,news,chart&range=1m&last=7")
            .then(response => { 
                console.log(response.data.quote.latestPrice);
                const updatedData = {
                    company_name: response.data.quote.companyName,
                    current_price: response.data.quote.latestPrice
                }
                
                Axios.put('/api/stocks', updatedData)
                .then(response => {
                    console.log("updated" + response);
                });
            });
    }


    render() {
    
        return (
            <div>
                <div className="port-header-div">
                    <h1>{ this.state.currentUserName }'s Portfolio</h1>
                </div>
                <BarChart options={this.state.options}
                        series={this.state.series}
                        labels={this.state.labels}
                        type={"pie"}
                
                />
                <Wrapper>
                    <PortfolioTable owns={this.state.stocksOwned}
                                    updatePriceHandler={this.updatePriceHandler}
                                    sellStockHandler={this.sellStockHandler}
                    />
                </Wrapper>
                
            </div>
            
        )
    }
}

export default Portfolio;