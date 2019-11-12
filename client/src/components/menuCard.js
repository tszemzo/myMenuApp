import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from "@material-ui/core/DialogActions";
import config from "../config/config";
const server_url = config.server_url;

class MenuCard extends React.Component {
    constructor(props){
        super(props);
    }

    deleteMenu(){
        fetch(server_url + '/menus/' + this.props.menu.id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                this.props.onDelete(this.props.menu)
                this.props.handleClose();
            })
            .catch(err => {
                console.error(err);
            });
    }

    renderEdit(classes, editable){
        if(editable)
            return(
                <div>
                    <Button onClick={this.deleteMenu.bind(this)} className={classes.buttonDelete}>
                        Borrar
                    </Button>
                </div>
            )
    }


    render(){
        const { classes, menu, editable } = this.props;
        return (
            <div>
                <Card className={classes.card} style={{position: 'relative'}} >
                    <CardActionArea>
                        <DialogActions>
                            {this.renderEdit(classes,  editable)}
                        </DialogActions>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                {menu.name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {menu.description}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            {menu.Products.map((product, i) =>(
                                <Typography key={i} variant="h6" component="h2">
                                    {product.name}
                                </Typography>
                                ))
                            }
                        </CardContent>
                        <CardContent>
                                <Typography variant="h6" component="h2">
                                    descuento: {menu.discount} % !!
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
        maxWidth: 600,
        margin: 20,
        width: 500,
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