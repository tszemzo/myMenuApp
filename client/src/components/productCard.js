import React from 'react';
import PropTypes from 'prop-types';
import ProductModal from './productModal'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Create from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';


class ProductCard extends React.Component {
  constructor(props){
    super(props);
    this.state = { show: false};
    this.state.mainImage = (props.product.images.length)? props.product.images[0] : "https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-855098134.jpg"
  }
  closeDialog(){
    this.setState({ show: false, showPrinciple: false });
  }

  openDialog = () => {
    this.setState({show: true})
  }
  openPrincipleDialog = () => {
    this.setState({showPrinciple: true})
  }


  render(){
    const { classes, product, editable } = this.props;
    return (
      <div>
        <Card className={classes.card} style={{position: 'relative'}} onClick={this.openDialog}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Plato"
              className={classes.media}
              height="140"
              src={this.state.mainImage}
              title="Plato"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                ${product.price}
              </Typography>
              <Typography component="p">
                {product.description}
              </Typography>
              <Typography component="p">
                Vegetarianos/celiacos: {product.vegetarian}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <ProductModal open={this.state.show} editable={editable} onDelete={this.props.onDelete} product={product} handleClose={this.closeDialog.bind(this)}/>
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

export default withStyles(styles)(ProductCard);