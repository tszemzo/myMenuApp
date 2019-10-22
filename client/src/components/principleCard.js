import React from 'react';
import PropTypes from 'prop-types';
import ProductModal from './productModal'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddPrincipleModal from '../components/addPrincipleModal';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Create from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import config from '../config/config';
const server_url = config.server_url;

class PrincipleCard extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    const { principle } = props
    this.state = { 
      show: false,
      name: principle.name,
      info : principle.information
    };
  }
  closeDialog(){
    this.setState({ show: false });
  }

  openDialog = () => {
    this.setState({show: true})
  }


  deleteProduct(){
    console.log(this.props)
    fetch(server_url + '/principles/' + this.props.principle.id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.props.onDelete(this.props.principle);
    })
    .catch(err => {
      console.error(err);
    });
  }


  render(){
    const { classes, principle, editable } = this.props;
    return (
      <div>
        <Card className={classes.card} style={{position: 'relative'}} onClick={this.openDialog}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {principle.name}
              </Typography>
              <Typography component="p">
                {principle.information}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button onClick={() => this.setState({ show: true})} color="primary">
            Editar
          </Button>
          <Button onClick={this.deleteProduct.bind(this)} color="inherit">
              Borrar
          </Button>
        </Card>
        <AddPrincipleModal open={this.state.show} principle={this.props.principle} handleClose={this.closeDialog.bind(this)}/>
      </div>
  );
  }  
}

const styles = theme => ({
  card: {
    maxWidth: 345,
    margin: 20,
    width: 300,
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  editButton : {
    position: 'absolute',
    top: 0,
    right: 0
  },
  media: {
    objectFit: 'cover',
  },
});

export default withStyles(styles)(PrincipleCard);