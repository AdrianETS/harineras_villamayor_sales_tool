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
            salesList: []
            } 
    }

    componentDidMount() {
        //this.context.getClientInfo(this.props.history, this.state.id)
        //.then(()=>this.retrieveUserPosts())
        this.context.getSalesList(this.props.history)
        .then(()=> {
            this.createChartSalesVsNProdutcs();
            this.createChartSalesVsQuantity();
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

    render() {
        return (
        <>
            <Navbar/>
            <div className="container">
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