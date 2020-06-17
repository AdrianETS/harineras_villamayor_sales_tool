import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import boxIcon from './../images/boxIcon.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AppContext } from "./../context/ContextProvider";
import ClientSelector from "./ClientSelector";
import Grid from '@material-ui/core/Grid';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Badge } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1 //right panning
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#992327",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    clientSelector: {
        marginRight: theme.spacing(1),
        marginLeft: 10,
        width: "100%",
        display: "none",
        [theme.breakpoints.up("sm")]: { //make the items in navbar hiden when screen size is small
            width: "auto",
            display: "flex"
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


export default function Navbar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [clientList, setclientList] = React.useState([]);
    const context = React.useContext(AppContext);
    const [selectedClient, setSelectedClient] = React.useState("");


    //small navbar logic-----------------------------------------------------------------------------------------------

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit">
                    <ShoppingCartIcon />
                </IconButton>
                <p>Shopping Cart</p>
            </MenuItem>
            <MenuItem>
                <ClientSelector clients={clientList} />
            </MenuItem>
        </Menu>
    );

    //end of small navbar logic -----------------------------------------------------------------------------------------------

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {
        context.getClientsList()
            .then(clientList => setclientList(clientList))
    }, [])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Welcome {context.userName}
                    </Typography>


                    <div className={classes.grow} />
                    <div className={classes.clientSelector}>
                        {!context.isClientSelected && <ClientSelector clients={clientList} />}
                    </div>


                    <Typography type="title" color="inherit">
                    {context.isClientSelected && <ClientSelector clients={clientList} />}
                    </Typography>


                    <div className={classes.clientSelector}>
                      
                            <IconButton color="secondary">
                            <Link to={{ pathname: '/shoppingcart'}} history ={props.history} className="link">
                            <Badge color="secondary" badgeContent={context.productsAddedToCart.length}>
                                <ShoppingCartIcon />
                                </Badge>
                                </Link>
                            </IconButton>
                     
                        <div>
                        </div>
                    </div>


                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    {renderMobileMenu}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon> <HomeIcon /></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/clients/list">
                        <ListItemIcon> <PeopleAltIcon /></ListItemIcon>
                        <ListItemText>Clients</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/products/list">
                        <ListItemIcon><img src={boxIcon}></img></ListItemIcon>
                        <ListItemText>Products</ListItemText>
                    </ListItem>
                    <ListItem button component={Link}>
                        <ListItemIcon> <SettingsIcon /> </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/clients/statistics">
                        <ListItemIcon> <BarChartIcon /> </ListItemIcon>
                        <ListItemText>Statistics</ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div >
    );
}
