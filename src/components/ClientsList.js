import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { List, ListItem, makeStyles, Divider, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    item: {
        padding: theme.spacing(1.2)
    },
    avatar: { marginRight: theme.spacing(5) },
    paginator: {
        justifyContent: "center",
        padding: "10px"
    }
}));

export default function ClienList(props) {
    const history = useHistory();
    const context = React.useContext(AppContext);
    const classes = useStyles();
    const [clientList, setClientList] = React.useState([]);
    const [membersFound, setmembersFound] = React.useState([]);
    const itemsPerPage = 15;
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState(null);
    const [pageIsLoaded, setPageIsLoaded] = React.useState(false);

    React.useEffect(() => {
        context.checkToken(this);
        context.getClientsList(props.history)
            .then(clients => {
                setClientList(clients);
                setmembersFound(clients);
                modifyPagination(clients);
                setPageIsLoaded(true);
            })
    }, [])

    const handleChange = (event, value) => {
        setPage(value);
    };

    const searchClients = (event) => {
        let clientsFound = [];
        console.log(event.target.value);
        event.target.value == "" ? clientsFound = clientList : clientsFound = clientList.filter(clientes => clientes.razon_social.toUpperCase().includes(event.target.value.toUpperCase()));
        setmembersFound(clientsFound);
        modifyPagination(clientsFound);
        //get to page 1 everytime something is typed in the search bar
        setPage(1);
    }

    const sendToDetails = (event, id) =>{
        history.push({
        pathname: '/clients/details',
        state: { id: id }}
        )
    }

    const modifyPagination = (array) =>{
        let totalPages = Math.ceil(array.length / itemsPerPage);
        setNoOfPages(totalPages);
    }

                       
    return (<div>
        <Navbar history={props.history} />
        <div className="container">
            <h4 className=""> List of clients </h4>
            <div className="container_within_navbar" >
                <div >
                    <form className="form-inline mt-2 mb-2">
                        <i className="fas fa-search" aria-hidden="true"></i>
                        <input className="form-control form-control-sm ml-3 w-45 " type="text" onChange={event=>searchClients(event)} placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                    {!pageIsLoaded? <div className="circularProgress"><CircularProgress color = "secondary"/></div>:<React.Fragment>
                    {(membersFound.length == 0 ? <h5 className="container_within_navbar">No clients found</h5>
                        : membersFound.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(clientes =>
                            
                            
                            <ListItem key={clientes.id} button onClick = {event => sendToDetails(event, clientes.id)}>  
                           <ListItemText
                                 primary={clientes.razon_social}
                                 secondary={"Contact: " + clientes.contacto}
                                 className={classes.item}
                                />
                                <ListItemAvatar>
                                <Avatar
                                        className={classes.avatar}
                                    />    
                                </ListItemAvatar> 
                            </ListItem>
                          
                        ))}
                        
                <Divider />
                <Box component="span">
                    <Pagination
                        count={noOfPages}
                        page={page}
                        onChange={handleChange}
                        defaultPage={1}
                        color="secondary"
                        size="large"
                        showFirstButton
                        showLastButton
                        classes={{ ul: classes.paginator }}
                    />
                </Box>
                </React.Fragment>}
            </div>
        </div>
    </div>)
}




