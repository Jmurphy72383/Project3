import React, { Component } from "react";
import "./Nasdaq.css";
import Axios from "axios";
import MyStockChart from "../../components/StockChart";
import Banner from "../../components/Banner";
import Stocklist from "../../components/Stocklist";
import Wrapper from "../../components/Wrapper";
import StockInfo from "../../components/StockInfo";
import StockTable from "../../components/Table";
import Headlines from "../../components/Headlines";
import Modal from "../../components/Modal";
import BuyModal from "../../components/BuyModal";



class Nasdaq extends Component {
    state = {
        options: {},
        series: [],
        stocks: [],
        news: [],
        companyName: "",
        symbol: "",
        market: "",
        latestPrice: "",
        latestTime: "",
        open: "",
        high: "",
        low: "",
        search: "",
        shares: "",
        total: "",
        showTable: false,
        showHeadlines: false,
        showStockInfo: true,
        showModal: false,
        showBuyModal: false,
        currentUserEmail: "",
        currentUserName: ""
    }

    componentDidMount() {
        this.iexNasdaqGet();
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name
        });
        
    }

    allNasdaq = event => {
        event.preventDefault();
        Axios.get("/api/allNasdaq")
            .then(response => {
                this.setState({
                    stocks: response.data,
                    showTable: true
                })
            });
    }

    inputChangeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    sharesInputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    stockSearchHandler = event => {
        event.preventDefault();
        Axios.get("/api/nasdaq/" + this.state.search)
            .then(response => {
                this.setState({
                    stocks: response.data,
                    showTable: true
                })
            });
    }

    newsHeadlinesHandler = event => {
        event.preventDefault();
        this.setState({
            showStockInfo: false,
            showHeadlines: true
        });
    }

    showQuoteHandler = event => {
        event.preventDefault();
        this.setState({
            showHeadlines: false,
            showStockInfo: true
        });
    }

    sharesPurchaseHandler = () => {
        const mult = this.state.latestPrice;
        const mult1 = this.state.shares;
        const answer = mult * mult1;
        this.setState({
            total: answer.toFixed(2),
            showModal: true
        });
    }

    cancelOrderHandler = () => {
        this.setState({
            showModal: false,
            showBuyModal: false
        });
    }

    buyStockHandler = () => {
        this.setState({
            showModal: false,
            showBuyModal: true
        });
        let todayDate = new Date().toISOString().slice(0,10);
        Axios.post("api/stocks", {
            symbol: this.state.symbol,
            company_name: this.state.companyName,
            market: this.state.market,
            shares: this.state.shares,
            buy_date: todayDate,
            buy_price: this.state.latestPrice,
            current_price: this.state.latestPrice,
            UserId: 1
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    stockQueryHandler = event => {
    const query = event.target.value;
    Axios.get("https://api.iextrading.com/1.0//stock/" + query + "/batch?types=quote,news,chart&range=1m&last=7")
        .then(response => {
            const dates = Object.values(response.data.chart);
            const dateArray = [];
            const dataArray = [];
            const highArray = [];
            const lowArray = [];
            dates.map(day => {
                dateArray.push(day.label);
                dataArray.push(day.close);
                highArray.push(day.high);
                lowArray.push(day.low);
                return dateArray && dataArray && highArray && lowArray
            })
            this.setState({
                    options: {
                        chart: {
                            background: '#e6ecff',
                            markers: {
                                colors:['#FF0000', '#00cc00', '#0000ff']
                            },
                            stacked: false,
                            fontFamily: 'Patua One, cursive, serif',
                            dropShadow: {
                                enabled: true,
                                top: 0,
                                left: 0,
                                blur: 3,
                                opacity: 0.5
                            },
                            animations: {
                                enabled: true,
                                easing: 'easeout',
                                speed: 350,
                                animateGradually: {
                                    enabled: true,
                                    delay: 350
                                },
                                dynamicAnimation: {
                                    enabled: true,
                                    speed: 1100
                                }
                            }
                        },
                        xaxis: {
                            categories: dateArray,
                        },
                        title: {
                            text: response.data.quote.companyName,
                            align: 'center',
                            margin: 10,
                            offsetX: 0,
                            offsetY: 0,
                            floating: false,
                            style: {
                                fontSize:  '30px',
                                color:  '#263238'
                            },
                        },
                    },
                    series: [
                        
                        {
                            name: 'High',
                            type: 'column',
                            data: highArray
                        },
                        {

                            name: 'Low',
                            type: 'column',
                            data: lowArray
                        },
                        {
                            name: 'Close',
                            type: 'line',
                            data: dataArray
                        }
                    ],
                    companyName: response.data.quote.companyName,
                    symbol: response.data.quote.symbol,
                    market: response.data.quote.primaryExchange,
                    latestPrice: response.data.quote.latestPrice,
                    latestTime: response.data.quote.latestTime,
                    open: response.data.quote.open,
                    high: response.data.quote.week52High,
                    low: response.data.quote.week52Low,
                    news: response.data.news
                    
            })
        
        })

    }

    iexNasdaqGet = () => {
        Axios.get("https://api.iextrading.com/1.0//stock/NFLX/batch?types=quote,news,chart&range=1m&last=7")
            .then(response => {
                console.log(response.data);
                const dates = Object.values(response.data.chart);
                const dateArray = [];
                const dataArray = [];
                const highArray = [];
                const lowArray = [];
                dates.map(day => {
                    dateArray.push(day.label);
                    dataArray.push(day.close);
                    highArray.push(day.high);
                    lowArray.push(day.low);
                    return dateArray && dataArray && highArray && lowArray
                })
                this.setState({
                        options: {
                            chart: {
                                background: '#e6ecff',
                                markers: {
                                    colors:['#FF0000', '#00cc00', '#0000ff']
                                },
                                stacked: false,
                                fontFamily: 'Patua One, cursive, serif',
                                dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 3,
                                    opacity: 0.5
                                },
                                animations: {
                                    enabled: true,
                                    easing: 'easeout',
                                    speed: 350,
                                    animateGradually: {
                                        enabled: true,
                                        delay: 350
                                    },
                                    dynamicAnimation: {
                                        enabled: true,
                                        speed: 1100
                                    }
                                }
                            },
                            xaxis: {
                                categories: dateArray,
                            },
                            title: {
                                text: response.data.quote.companyName,
                                align: 'center',
                                margin: 10,
                                offsetX: 0,
                                offsetY: 0,
                                floating: false,
                                style: {
                                  fontSize:  '30px',
                                  color:  '#263238'
                                },
                            },
                        },
                        series: [
                            
                            {
                                name: 'High',
                                type: 'column',
                                data: highArray
                            },
                            {

                                name: 'Low',
                                type: 'column',
                                data: lowArray
                            },
                            {
                                name: 'Close',
                                type: 'line',
                                data: dataArray
                            }
                        ],
                        companyName: response.data.quote.companyName,
                        symbol: response.data.quote.symbol,
                        market: response.data.quote.primaryExchange,
                        latestPrice: response.data.quote.latestPrice,
                        latestTime: response.data.quote.latestTime,
                        open: response.data.quote.open,
                        high: response.data.quote.week52High,
                        low: response.data.quote.week52Low,
                        news: response.data.news
                        
                })
            
            })
    }

    render() {



        return (
            <div>
                {this.state.showModal === true ?
                    <Modal shares={this.state.shares}
                    company={this.state.companyName}
                    total={this.state.total}
                    cancelOrderHandler={this.cancelOrderHandler}
                    buyStockHandler={this.buyStockHandler}
                    /> : null
                }
                {this.state.showBuyModal === true ?
                    <BuyModal cancelOrderHandler={this.cancelOrderHandler}/> : null
                }
                
                <Wrapper>
                    <Banner 
                        exchange={"The Nasdaq Stock Market"}
                        info={"The NASDAQ (National Association of Securities Dealers Automated Quotations) Stock Market is an American stock exchange.  It is the second largest stock exchange in the world by market capitalization, behind only the NYSE located in the same city.  It is an electronic exchange where stocks are traded through an automated network of computers instead of a trading floor.  As a general rule of thumb, it is where most technology stocks are traded.  Major stocks that trade on the NASDAQ include Apple, Amazon, Microsoft, Facebook, Intel, and Oracle."}
                    />
                </Wrapper>
                
            
                <Wrapper>
                    <div className="list-wrapper">
                        {this.state.showStockInfo === true ?
                            <StockInfo company={this.state.companyName}
                            latestPrice={this.state.latestPrice}
                            latestTime={this.state.latestTime}
                            open={this.state.open}
                            high={this.state.high}
                            low={this.state.low}
                            sharesNum={this.state.sharesNum}
                            newsHeadlinesHandler={this.newsHeadlinesHandler}
                            sharesPurchaseHandler={this.sharesPurchaseHandler}
                            sharesInputHandler={this.sharesInputHandler}
                            /> : null
                        }
                        {this.state.showHeadlines === true ?
                            <Headlines news={this.state.news}
                                       showQuoteHandler={this.showQuoteHandler}
                            /> : null
                    
                        }
                    </div>
                    
                    <MyStockChart options={this.state.options} 
                                  series={this.state.series}/>
                    <div className="list-wrapper">
                        <Stocklist search={this.state.search}
                                inputChangeHandler={this.inputChangeHandler}
                                stockSearchHandler={this.stockSearchHandler}
                                allStocks={this.allNasdaq}
                                exchange={"NASDAQ"}
                        />
                        {this.state.showTable === true ?
                            <StockTable 
                                stocks={this.state.stocks}
                                stockQueryHandler={this.stockQueryHandler}
                            /> : null}
                    </div>
                    
                </Wrapper>
            </div>
        );
    }
}

export default Nasdaq;