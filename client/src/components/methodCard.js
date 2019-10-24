import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Create from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';


class MethodCard extends React.Component {
  constructor(props){
    super(props);
    this.state = { show: false};
    this.state.mainImage = props.method.paymentImage
  }
  closeDialog(){
    this.setState({ show: false, showPrinciple: false });
  }

  openDialog = () => {
    this.setState({show: false})
  }
  openPrincipleDialog = () => {
    this.setState({showPrinciple: true})
  }


  render(){
    const { classes, method, editable } = this.props;
    return (
      <div>
        <Card className={classes.card} style={{position: 'relative'}} onClick={this.openDialog}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Metodo de Pago"
              className={classes.media}
              height="140"
              src={this.state.mainImage}
              title="Metodo de Pago"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {method.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
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

export default withStyles(styles)(MethodCard);