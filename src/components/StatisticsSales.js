import React from "react";
import { Link } from 'react-router-dom';
import { AppContext } from "../context/ContextProvider";
import Navbar from "./Navbar";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Box, Typography } from "@material-ui/core";

class StatisticsSales extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
           groupedSales: props.groupedSales,
           clientSelected: props.clientSelected,
            salesList: [],
            id: props.clientId

            } 
    }

    componentDidMount() {
        //this.context.getClientInfo(this.props.history, this.state.id)
        //.then(()=>this.retrieveUserPosts())
        //console.log("selectedlClient", selectedClient)
        //let clientSelected = this.context.clientSelected;
      //  this.state.groupedSales && this.createchartSalesTotalvsClients();

        let clientUP = this.context.clientUpdated;
        //console.log("clientSelected", clientSelected)
        console.log("clientUP", clientUP)
        
        this.context.getSalesList(this.props.history)
        .then(()=> {
            this.createChartSalesVsNProdutcs();
            this.createChartSalesVsQuantity();
            this.createchartSalesTotalvsClients();
        });
    }

    componentDidUpdate(previousProps, previousState) {
        this.context.checkToken(this);
        console.log("previousProps", previousProps)
        console.log("previousState", previousState)
       // console.log(JSON.stringify(this.props));
        if (this.context.clientSelected != null && this.context.clientSelected.id != null && (!this.context.clientSelected || this.context.clientSelected.id == null)) {
            console.log("cliente cambiado")
            this.setState({
                clientSelected: this.props.clientSelected,
                groupedSales: this.props.groupedSales,
                id: this.props.clientId
            });

        }
        console.log("didupdate")
           
            
        this.state.groupedSales && this.context.getSalesList(this.props.history)
        .then(()=> {
            this.createChartSalesVsNProdutcs();
            this.createChartSalesVsQuantity();
            this.createchartSalesTotalvsClients();
        });
    }


    createChartSalesVsNProdutcs() {

        let chart = am4core.create("salesVsNProdutcs", am4charts.XYChart);

        // Add data
        chart.data = this.getXaxisDataSalesVsNProdutcs();
        //chart.data = this.context.getSalesList(this.props.history)
        console.log("CHART DATA", chart.data);
        // Create axes

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "sale";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.title.text="ID of the Sale"


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Number of Products";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "numProducts";
        series.dataFields.categoryX = "sale";
        series.name = "sale";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        series.title = "NProducts";

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    createChartSalesVsQuantity() {

        let chart = am4core.create("salesVsQuantity", am4charts.XYChart);

        // Add data
        chart.data = this.getXaxisDataDalesVsQuantity();
        console.log("CHART DATA", chart.data);
        // Create axes

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "sale";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.title.text="ID of the Sale"


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Quantity";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "quantity";
        series.dataFields.categoryX = "sale";
        series.name = "sale";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    createchartSalesTotalvsClients() {

        let chart = am4core.create("salesTotalvsClients", am4charts.XYChart);

        // Add data
        chart.data = this.getXaxisDataSalesTotalvsClients();
        //chart.data = this.context.getSalesList(this.props.history)
        console.log("CHART DATA", chart.data);
        // Create axes

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.title.text="Year"


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Sales";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "totalQuantity";
        series.dataFields.categoryX = "year";
        series.name = "year";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        series.title = "totalQuantity";

        

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    getXaxisDataSalesVsNProdutcs() {
        const numSale = []
        let productInSales = [];
        this.context.salesList.forEach(sale => {
            if(!(sale.venta in numSale)) {
                numSale.push(sale.venta);
            }
        });

        [...new Set(numSale)].forEach(saleProduct => {
            productInSales.sale = saleProduct;
            productInSales.products = this.context.salesList.filter(sale => sale.venta==saleProduct).length;
            productInSales.push({sale:productInSales.sale , numProducts: productInSales.products});
        });

        return productInSales;
    }

    getXaxisDataDalesVsQuantity() {
        const numSale = []
        let quantProductsInSales = [];
        this.context.salesList.forEach(sale => {
            if(!(sale.venta in numSale)) {
                numSale.push(sale.venta);
            }
        });


        [...new Set(numSale)].forEach(saleProduct => {
            quantProductsInSales.sale = saleProduct;
            let quantity = 0;
            this.context.salesList.filter(sale => sale.venta==saleProduct).forEach(sale => {
                quantity+= sale.cantidad;

            });
            quantProductsInSales.quantity = quantity;
            quantProductsInSales.push({sale:quantProductsInSales.sale , quantity: quantProductsInSales.quantity});
        });

        return quantProductsInSales;
    }

    getXaxisDataSalesTotalvsClients() {
        let salesInYear = [];
        let sales = this.context.salesList;
        console.log("sales",sales )
        let salesYearQuantity = [];
        sales.forEach(sale => {
            salesYearQuantity.year = sale.fecha.substr(sale.fecha.length - 4, sale.fecha.length);
            salesYearQuantity.quantity = sale.cantidad;
            salesInYear.push({ year: salesYearQuantity.year, quantity: salesYearQuantity.quantity });
            
        })

        console.log("SALESINYEAR",salesInYear )

        let years = []

        salesInYear.forEach(sale => {
            if (!(sale.year in years)) {
                years.push(sale.year);
            }
        });

        let dataChart = [];
        [...new Set(years)].forEach(year => {
            if (!(year == dataChart.year)) {
                dataChart.year = year;
                let total = 0;
                salesInYear.filter(sale => sale.year == year).forEach(sale => {
                    total += sale.quantity;
                })
                dataChart.total = total;
                dataChart.push({ year: dataChart.year, totalQuantity: dataChart.total });
            }
        });

  
        let year = new Date().getFullYear();
        let chartYears = [];
        for(let past = year - 4 ; past<=year ; past++) {
            chartYears.year = past;
            chartYears.totalQuantity = 0;
            let totalInYear = dataChart.filter(el => el.year == chartYears.year)
            if (totalInYear.length != 0) {
                chartYears.totalQuantity = totalInYear[0].totalQuantity;
            }
            chartYears.push({ year: chartYears.year.toString(), totalQuantity: chartYears.totalQuantity });

        }

        console.log("chartYears",chartYears )

        let clientSelected = this.context.clientSelected;
        console.log("HAY UNO ELEGIDO", clientSelected)
        if ( clientSelected!= null) {
            let grouped = this.context.groupedSales;
            console.log("grouped", grouped)
            let quant = this.getClientQuantityVsYear();
        }
            


        return chartYears;

    }

    getClientQuantityVsYear() {
        let salesInYear = [];
        let clientSales = this.state.groupedSales;
        console.log( "clientSales",clientSales)

        for (let sale in clientSales) {
            let totalSales = 0;
            clientSales[sale].forEach(sale => {
                totalSales += sale.cantidad * sale.precio_unitario;
            });
            salesInYear.year = clientSales[sale][0].fecha.substr(clientSales[sale][0].fecha.length - 4, clientSales[sale][0].fecha.length);
            salesInYear.sale = totalSales

            salesInYear.push({ year: salesInYear.year, totalSales: salesInYear.sale });
        }

        let years = []

        salesInYear.forEach(sale => {
            if (!(sale.year in years)) {
                years.push(sale.year);
            }
        });

        let dataChart = [];
        [...new Set(years)].forEach(year => {
            if (!(year == dataChart.year)) {
                dataChart.year = year;
                let total = 0;
                salesInYear.filter(sale => sale.year == year).forEach(sale => {
                    total += sale.totalSales;
                })
                dataChart.total = total;
                dataChart.push({ year: dataChart.year, totalSales: dataChart.total });
            }
        });
  
        let year = new Date().getFullYear();
        let chartYears = [];
        for(let past = year - 4 ; past<=year ; past++) {
            chartYears.year = past;
            chartYears.totalSales = 0;
            let totalInYear = dataChart.filter(el => el.year == chartYears.year)
            if (totalInYear.length != 0) {
                chartYears.totalSales = totalInYear[0].totalSales;
            }
            chartYears.push({ year: chartYears.year.toString(), totalSales: chartYears.totalSales });

        }
        console.log("CHARTYEARS",chartYears )
        return chartYears;
    }

    render() {
        return (
        <>
            <Navbar/>
            <div className="container">
                <Box>
                    <Typography variant="h5">
                        salesTotalvsClients
                    </Typography>
                    <div id="salesTotalvsClients"></div>
                </Box>
                <Box>
                    <Typography variant="h5">
                    Number of products per sale
                    </Typography>
                    <div id="salesVsNProdutcs"></div>
                </Box>
                <Box>
                    <Typography variant="h5">
                    Quantity of products per sale
                    </Typography>
                    <div id="salesVsQuantity"></div>
                </Box>
            </div>
        </>
        )
    }
}

export default StatisticsSales;