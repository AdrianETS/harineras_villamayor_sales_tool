import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { Box, Typography } from "@material-ui/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class ClientStatistics extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
        this.state = {
            selectedClient: {},
            salesDetails: [],
            groupedSales: {},
            id: this.props.location?.state?.id
        }
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.getClientInfo(this.props.history, this.state.id)
            .then(client => this.setState({ selectedClient: client }))
            .then(() => this.context.getSalesInfoByClientId(this.props.history, this.state.id))
            .then(salesInfo => this.setState({ salesDetails: salesInfo }))
            .then(() => {
                let groupedSalesList = this.state.salesDetails.reduce((groupedSales, sale) => {
                    if (groupedSales[sale.venta] == null) {
                        groupedSales[sale.venta] = [];
                    }
                    groupedSales[sale.venta].push(sale)
                    return groupedSales;
                }, {})
                this.setState({ groupedSales: groupedSalesList })
            }).then(()=> {
            this.createChartSalesVsYear();
        });
    }

    createChartSalesVsYear() {

        am4core.useTheme(am4themes_animated);

        am4core.options.autoSetClassName = true;

        let chart = am4core.create("salesVsYear", am4charts.XYChart);

        // Add data
        chart.data = this.getXaxisDataSalesVsYear();
        console.log("CHART DATA", chart.data);
        // Create axes

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.title.text="Año"


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Importe de Venta";
        valueAxis.renderer.minGridDistance = 20;

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "totalSales";
        series.dataFields.categoryX = "year";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        series.columns.template.fill = am4core.color("#AB2002");
        series.columns.template.stroke = am4core.color("#722110");
        let disatnceState = series.columns.template.states.create("hover");
        disatnceState.properties.fillOpacity = 0.9;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fill = am4core.color("#000");
        chart.cursor.lineX.fillOpacity = 0.1;

    }

    getXaxisDataSalesVsYear() {
        let salesInYear = [];
        let clientSales = this.state.groupedSales;

        for ( let sale in clientSales) {
            let totalSales = 0;
            clientSales[sale].forEach(sale => {
                totalSales+= sale.cantidad * sale.precio_unitario;
            });
            console.log("clientSales[sale][0]", clientSales[sale][0]);
            salesInYear.year = clientSales[sale][0].fecha.substr(clientSales[sale][0].fecha.length - 4, clientSales[sale][0].fecha.length);
            console.log("salesInYear", salesInYear.year);
            salesInYear.sale = totalSales

            salesInYear.push({year:salesInYear.year , totalSales: salesInYear.sale});
        }

        let years = []
      
        salesInYear.forEach(sale => {
            if(!(sale.year in years)) {
                years.push(sale.year);
            }
        });

        let dataChart = [];
        [...new Set(years)].forEach(year => {
            if(!(year == dataChart.year)) {
                dataChart.year = year;
                let total = 0;
                salesInYear.filter(sale => sale.year == year).forEach(sale => {
                    total+=sale.totalSales;
                })
                dataChart.total = total;
                dataChart.push({year:dataChart.year , totalSales: dataChart.total});
            }
        });

        return dataChart.sort(function (a, b){
            return (a.year - b.year)
        })
    }

    render() {
        {
            return (
                <>
                <Navbar/>
                <div className="container">
                <h4 className=""> Cliente {this.state.selectedClient.razon_social}</h4>
                    <Box>
                        <Typography variant="h5">
                            Venta por año
                        </Typography>
                        <Box id="salesVsYear" height="350px"></Box>
                    </Box>
                </div>
                
                </>
            );
        }
    }
}

export default ClientStatistics;