import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from "./../context/ContextProvider";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PopupMessage() {
  const classes = useStyles();
  const context = React.useContext(AppContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    context.setPopup(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={context.openPopup} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sale successfully complete
        </Alert>
      </Snackbar>
    </div>
  );
}
