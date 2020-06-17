import React from "react";
import { Link } from 'react-router-dom';
import { AppContext } from "../context/ContextProvider";
import Navbar from "./Navbar";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class StatisticsSales extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            listofUserPosts: []
        }
    }

    componentDidMount() {
        this.context.getClientInfo()
        //.then(()=>this.retrieveUserPosts())
        .then(()=>this.createChart());
    }

    createChart() {

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = this.getXaxisData();
        console.log(chart.data);
        // Create axes

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "user";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "venta_fecha";
        series.dataFields.categoryX = "cantidad_pedida";
        series.name = "sales";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    /*retrieveUsers(id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/sales/' + id + '?token=' + this.context.getTokenFromLocalStorage())
            .then(res => res.json())
            .then((json) => {
                this.context.setListOfUsers([...json]);
                this.context.setOriginalUsers([...json]);
                resolve();
            })
        });
    }*/

    /*retrieveUserPosts(id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/clients/list/' + id + '?token=' + this.context.getTokenFromLocalStorage())
            .then(res => res.json())
            .then((json) => {
                this.context.setListOfUserPosts(json)
                resolve();
            })
        });
    }*/

    getXaxisData() {
        let salesAndProducts = [];
        console.log("salesList", this.context.salesList);
        this.context.salesList.forEach(sale => {
            salesAndProducts.product = sale.id_producto;
            salesAndProducts.push({sale:sale.id_venta, product: sale.id_producto});
            console.log("salesAndProductsAfter", salesAndProducts);
            console.log("sale", sale);
        });
        return salesAndProducts;
    }

    render() {
        return <div><Navbar />
            <div id="chartdiv"></div>
        </div>
    }
}

export default StatisticsSales;