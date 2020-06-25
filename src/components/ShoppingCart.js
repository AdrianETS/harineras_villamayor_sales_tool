import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import NavBar from "./Navbar";
import DeleteIcon from '@material-ui/icons/Delete';
import { AppContext } from "./../context/ContextProvider";



export default function ShoppingCart(props) {
    const context = React.useContext(AppContext);

    const TAX_RATE = 0.04;

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function priceRow(qty, unit) {
        return qty * unit;
    }

    function createRow(desc, qty, unit, id) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price, id };
    }


    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    let productosNuestros = [
        { desc: "producto1", quantity: 23, price: 2 },
        { desc: "producto2", quantity: 100, price: 2 },
        { desc: "producto3", quantity: 150, price: 2 }
    ];

    let rows = createRows(context.productsAddedToCart);

    function createRows(object) {
        let obj = [];
        object.forEach(element => {
            obj.push(createRow(element.nombre_comercial, element.cantidad, element.precio, element.id));
        });
        return obj;
    }

    const handleClick = value => {
        let newProductos = productosNuestros.filter(
            element => element.desc !== value
        );
        productosNuestros = newProductos;
        rows = createRows(newProductos);
        console.log(JSON.stringify(newProductos));
    };

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    return (context.productsAddedToCart.length === 0 ? <React.Fragment><NavBar /><h5 style={{ marginLeft: 100 }} >Your cart is empty</h5> </React.Fragment> :
        <React.Fragment>
            <NavBar />
            <div className="container">
            <TableContainer align="center">
                <Table style={{ width: 900}} aria-label="spanning table">
                    <TableHead>
                        
                        <TableRow>
                            
                            <TableCell style={{ width: 100 }}>Product</TableCell>
                            <TableCell align="right"style={{ width: 100 }}>Quantity.</TableCell>
                            <TableCell align="right"style={{ width: 100 }}>Price</TableCell>
                            <TableCell align="right"style={{ width: 100 }} >Total</TableCell>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.desc}>
                                
                                <TableCell style={{ width: 100 }}>{row.desc}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                <TableCell style={{ width: 10 }}>
                                    <DeleteIcon size="small"
                                        color="disabled"
                                        onClick={() => context.deleteProductFromCart(row.id)} />
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>VAT (4%)</TableCell>
                            <TableCell align="right" colSpan={1}>{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button class="btnSubmitSale" variant="contained" color="secondary" onClick ={()=>context.submitSale(props.history, context.clientSelected, context.productsAddedToCart)}>
                Submit
            </Button>
            </div>
        </React.Fragment>
    );
}