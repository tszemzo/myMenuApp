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


class MenuCard extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
        const { classes, menu, editable } = this.props;
        return (
            <div>
                <Card className={classes.card} style={{position: 'relative'}} >
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                {menu.name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            {menu.Products.map((product, i) =>(
                                <Typography variant="h6" component="h2">
                                    {product.name}
                                </Typography>
                                ))
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: 20,
        width: 300,
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    media: {
        objectFit: 'cover',
    },
});

export default withStyles(styles)(MenuCard);