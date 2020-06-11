import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { render } from '@testing-library/react';
import { AppContext } from "./../context/ContextProvider";

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '300px',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 150,
  },
}));

export default function ClientSelector(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedClient, setselectedClient] = React.useState({});
  const context = React.useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setselectedClient(""); 
    setOpen(false);
  };

  const handleSave = () => {
    window.localStorage.setItem('selectedClient', JSON.stringify(selectedClient));
    context.setClientSelected(selectedClient);
    console.log(JSON.stringify(context))
    console.log("SELECTED", JSON.parse(localStorage.selectedClient))
    setOpen(false);
  }

  const handleClientSelection = (event) => {
    setselectedClient(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Select client
      </Button>
      <Dialog
      fullWidth = {true}
        maxWidth={'xs'}
        open={open}
        onClose={handleCancel}
        aria-labelledby="client-selector-dialog-title"
      >
        <DialogTitle id="client-selector-dialog-title">Client selection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please, select your client
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <Select
                autoFocus
                //value={maxWidth}
                onChange={handleClientSelection}
                /*inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}*/
              >
                {props.clients.map(client=><MenuItem value = {client}>{client.razon_social}</MenuItem>)}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
