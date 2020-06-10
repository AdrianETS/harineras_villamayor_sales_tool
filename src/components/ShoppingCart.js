import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import NavBar from "./Navbar";
import DeleteIcon from '@material-ui/icons/Delete';

const TAX_RATE = 0.21;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

//

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

let productosNuestros = [
    { desc: "producto1", quantity: 23, price: 2 },
    { desc: "producto2", quantity: 100, price: 2 },
    { desc: "producto3", quantity: 150, price: 2 }
];

let rows = createRows(productosNuestros);

function createRows(object) {
    let obj = [];
    object.forEach(element => {
        obj.push(createRow(element.desc, element.quantity, element.price));
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

export default function ShoppingCart() {

    return (productosNuestros.length === 0 ? <React.Fragment><NavBar/><h5 style={{ marginLeft: 100}} >Your cart is empty</h5> </React.Fragment>:
        <React.Fragment>
       <NavBar/>
        <TableContainer>
            <Table style={{ width: 1200, marginLeft:"100px"}} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            Details
            </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" />
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Quantity.</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.desc}>
                            <TableCell style={{ width: 100}}>
                            <DeleteIcon size="small"
                                    color="disabled"
                                    onClick={() => handleClick(row.desc)} />
                            </TableCell>
                            <TableCell style={{ width: 100}}>{row.desc}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={3}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3}>VAT (21%)</TableCell>
                        <TableCell align="right" colSpan={1}>{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </React.Fragment>
    );
}
