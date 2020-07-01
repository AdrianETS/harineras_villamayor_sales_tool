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
        series.columns.template.fill = am4core.color("#AB2002");
        series.columns.template.stroke = am4core.color("#722110");
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
        series.columns.template.fill = am4core.color("#AB2002");
        series.columns.template.stroke = am4core.color("#722110");
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    createchartSalesTotalvsClients() {

        am4core.useTheme(am4themes_animated);

        am4core.options.autoSetClassName = true;

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
        series.dataFields.valueY = "totalAmount";
        series.dataFields.categoryX = "year";
        series.name = "year";
        series.columns.template.fill = am4core.color("#AB2002");
        series.columns.template.stroke = am4core.color("#722110");
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        series.title = "totalQuantity";

        // Create series
        let seriesLine = chart.series.push(new am4charts.LineSeries());
        seriesLine.dataFields.valueY = "totalAmountClient";
        seriesLine.dataFields.categoryX = "year";
        seriesLine.name = "Sales by Client";
        seriesLine.title = "totalAmountClient";

        seriesLine.stroke = am4core.color("#fdd400");
        seriesLine.strokeWidth = 3;
        seriesLine.propertyFields.strokeDasharray = "lineDash";
        seriesLine.tooltip.label.textAlign = "middle";

        var bullet = seriesLine.bullets.push(new am4charts.Bullet());
        bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
        bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
        var circle = bullet.createChild(am4core.Circle);
        circle.radius = 4;
        circle.fill = am4core.color("#fff");
        circle.strokeWidth = 3;
        let durationState = bullet.states.create("hover");
        durationState.properties.scale = 1.2;

        

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fill = am4core.color("#000");
        chart.cursor.lineX.fillOpacity = 0.1;
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
        let salesYearAmount = [];
        sales.forEach(sale => {
            salesYearAmount.year = sale.fecha.substr(sale.fecha.length - 4, sale.fecha.length);
            salesYearAmount.amount = sale.cantidad * sale.precio_unitario;
            salesInYear.push({ year: salesYearAmount.year, amount: salesYearAmount.amount });
            
        })

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
                    total += sale.amount;
                })
                dataChart.total = total;
                dataChart.push({ year: dataChart.year, totalAmount: dataChart.total });
            }
        });

        let year = new Date().getFullYear();
        let chartYears = [];
        for(let past = year - 4 ; past<=year ; past++) {
            chartYears.year = past;
            chartYears.totalAmount = 0;
            let totalInYear = dataChart.filter(el => el.year == chartYears.year)
            if (totalInYear.length != 0) {
                chartYears.totalAmount = totalInYear[0].totalAmount;
            }
            chartYears.push({ year: chartYears.year.toString(), totalAmount: chartYears.totalAmount });
        }

        console.log("chartYears",chartYears )

        let clientSelected = this.context.clientSelected;
        let groupedSales = this.context.groupedSales;
        console.log("HAY UNO ELEGIDO", clientSelected)
        console.log("groupedSales", groupedSales)
        if ( clientSelected != null) {
            let amountSaleClient = []
            for ( let groupSale in groupedSales)  {
                console.log("groupSale" , groupedSales[groupSale])
                amountSaleClient.year = groupedSales[groupSale][0].fecha.substr(groupedSales[groupSale][0].fecha.length - 4, groupedSales[groupSale][0].fecha.length);
                amountSaleClient.amount = 0;

                groupedSales[groupSale].forEach(saleDetail => {
                    amountSaleClient.amount += saleDetail.cantidad*saleDetail.precio_unitario;
                })
                amountSaleClient.push({ year: amountSaleClient.year, totalAmount: amountSaleClient.amount });
            }
            console.log("amountSaleClient", amountSaleClient);


            let years = []

            amountSaleClient.forEach(sale => {
                if (!(sale.year in years)) {
                    years.push(sale.year);
                }
            });
    
            let dataChart = [];
            [...new Set(years)].forEach(year => {
                if (!(year == dataChart.year)) {
                    dataChart.year = year;
                    let total = 0;
                    amountSaleClient.filter(sale => sale.year == year).forEach(sale => {
                        total += sale.totalAmount;
                    })
                    dataChart.total = total;
                    dataChart.push({ year: dataChart.year, totalAmountClient: dataChart.total });
                }
            });

            console.log("dataChartCLient", dataChart);
            console.log("chartYears2", chartYears);

            let dataChartEnd = [];
            chartYears.forEach(chartYear => {
                dataChartEnd.year = chartYear.year;
                dataChartEnd.totalAmount = chartYear.totalAmount;
                dataChartEnd.totalAmountClient = 0;
                let data = dataChart.filter(data => data.year == chartYear.year);
                if ( data.length != 0 ) dataChartEnd.totalAmountClient = data[0].totalAmountClient;
                dataChartEnd.push({year : dataChartEnd.year, totalAmount : dataChartEnd.totalAmount, totalAmountClient : dataChartEnd.totalAmountClient})
            })

            console.log("dataChartEnd", dataChartEnd);


            return dataChartEnd;

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
                       Total Sales
                    </Typography>
                    <Box id="salesTotalvsClients" height="350px"></Box>
                </Box>
                <Box>
                    <Typography variant="h5">
                    Number of products per sale
                    </Typography>
                    <Box id="salesVsNProdutcs" height="350px"></Box>
                </Box>
                <Box>
                    <Typography variant="h5">
                    Quantity of products per sale
                    </Typography>
                    <Box id="salesVsQuantity" height="350px"></Box>
                </Box>
            </div>
        </>
        )
    }
}

export default StatisticsSales;