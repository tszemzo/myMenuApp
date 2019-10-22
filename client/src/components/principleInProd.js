import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import config from '../config/config';
const server_url = config.server_url;

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
  buttonDelete:{
    color: 'tomato'
  },
  productImage:{
    height: '10em'
  },
  imageContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  arrowIcon:{
    height: '100%'
  }
};

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);


class PrincipleModal extends React.Component {
  constructor(props){
    super(props);
    const { product } = props
    console.log(product)
    this.state = {
      selectedImage: (product.images.length)? product.images[0] : "https://5.imimg.com/data5/RE/SD/MY-3773531/pharmaceutical-product-500x500.jpg",
      selectedIndex: 0
    }

  }

  deleteProduct(){
    fetch(server_url + '/product/' + this.props.product.id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.props.onDelete(this.props.product)
      this.props.handleClose();
    })
    .catch(err => {
      console.error(err);
    });
  } 

  handleNextPicture(){

    if(this.state.selectedIndex < this.props.product.images.length-1){
      let newIndex = this.state.selectedIndex+1
      console.log(newIndex)
      this.setState({
        selectedIndex: newIndex,
        selectedImage: this.props.product.images[this.state.selectedIndex+1]
      })
    }

  }

  renderImage(){
    return <img style={styles.productImage} src={this.state.selectedImage}/>
  }

  handleBackPicture(){
    if(this.state.selectedIndex > 0){
      this.setState({
        selectedIndex: (this.state.selectedIndex-1),
        selectedImage: this.props.product.images[this.state.selectedIndex-1]
      })
    }
  }
  renderEdit(classes){
    if(this.props.editable)
      return(
        <div>
          <Button href={'/editar/' + this.props.product.id } color="secondary">
            Editar
          </Button>
          <Button onClick={this.deleteProduct.bind(this)} className={classes.buttonDelete}>
              Borrar
          </Button>
        </div>
      )
    return(
      <Button onClick={this.props.handleClose} color="primary">
              Ok
      </Button>
    )
  }
  render(){
    const { classes } = this.props;
    console.log(this.props.product)
    return (
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
            Principio: {this.props.product.name}
          </DialogTitle>
          <DialogContent>
            
            <Typography variant="h4" gutterBottom>
             Descripcion: {this.props.product.information}
           </Typography>
          </DialogContent>
          <DialogActions>
          {this.renderEdit(classes)}

          </DialogActions>
        </Dialog>
  );

  }  
}
        

PrincipleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(PrincipleModal);