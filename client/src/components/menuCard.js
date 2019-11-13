import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from "@material-ui/core/DialogActions";
import config from "../config/config";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import IconButton from "@material-ui/core/IconButton";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import CardMedia from "@material-ui/core/CardMedia";
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
                    <div>
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
                            <GridList className={classes.gridList} cols={2.5}>
                                {menu.Products.map((product, i) =>(
                                    <GridListTile key={product.name}>
                                        <CardMedia
                                            component="img"
                                            alt="Plato"
                                            className={classes.media}
                                            height="140"
                                            src={product.images}
                                            title="Plato"
                                        />
                                        <GridListTileBar
                                            title={product.name}
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>

                        </CardContent>



                    </CardActionArea>
                    <div className="ribbon-wrapper">
                        <div className="glow">&nbsp;</div>
                        <div className="ribbon-front">
                            Super descuento: {menu.discount} % !!
                        </div>
                        <div className="ribbon-edge-topleft"></div>
                        <div className="ribbon-edge-topright"></div>
                        <div className="ribbon-edge-bottomleft"></div>
                        <div className="ribbon-edge-bottomright"></div>
                    </div>
                    </div>
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
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
       transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.dark,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

export default withStyles(styles)(MenuCard);