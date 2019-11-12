import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadOutlineIcon from '@material-ui/icons/CloudUpload';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import config from '../config/config';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const server_url = config.server_url;

const styles = {
    card: {
        maxWidth: 350,
    },
    media: {
        objectFit: 'cover',
    },
    buttonDelete:{
        color: 'tomato'
    },
    formControl: {
        minWidth: 120,
    },
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


class AddMenuModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            info: '',
            discount: 0,
            products: [],
            selectedProducts: []
        }
    }

    setProducts(){
        fetch(server_url + '/product/', {
            method: 'get',
            headers: {
                'Content-Type':'application/json',
            }
        })
            .then(response => {
                return response.clone().json()
            })
            .then(data => {
                this.setState({
                    products: data.products
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    setProduct(id, product){
        const {selectedProducts} = this.state
        let auxselectedProducts = selectedProducts
        auxselectedProducts[id]=product
        this.setState({ selectedProducts: auxselectedProducts,productSuggestions: false})
    }

    renderSuggestions(idx){
        if(idx == this.state.selectedForm && this.state.productSuggestions)
            return(
                <Paper>
                    <List component="nav" aria-label="Secondary mailbox folders">
                        {
                            this.state.products.map((aProduct,i) => {
                                if(!this.state.selectedProducts.includes(aProduct)){
                                    return(
                                        <ListItem key={i} onClick={() => {
                                            this.setProduct(idx, aProduct)}
                                        } button>
                                            <ListItemText  primary={aProduct.name} />
                                        </ListItem>
                                    )
                                }else{
                                    return(//si ya lo selecciono no es clickeable
                                        <ListSubheader>{aProduct.name}</ListSubheader>
                                    )
                                }

                            })
                        }
                    </List>
                </Paper>
            )
        return <div/>
    }
    componentDidMount(){
        this.setProducts()
        if(this.props.menu){
            const { menu } = this.props
            let selectedProducts = []
            menu.Products.forEach(aProduct => {
                selectedProducts.push(aProduct)
            })
            this.setState({
                name: menu.name,
                info: menu.description,
                discount: menu.discount,
                selectedProducts: selectedProducts
            })
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleInputListChange = idx => (event) => {
        const { value, name } = event.target;
        const newInput = this.state[name].map((value, sidx) => {
            if (idx !== sidx) return value;
            return event.target.value;
        });
        this.setState({ [name]: newInput });
    };

    handleAddList = name => (event) => {
        let newList = this.state[name];
        newList.push('');
        this.setState({
            [name]: newList
        });
    };

    handleRemoveList = (idx, nameList) => (event) => {
        nameList.forEach(name => {
            this.setState({
                [name]: this.state[name].filter((s, sidx) => idx !== sidx)
            });
        })
    };

    createNew(){
        let menu = {
            name: this.state.name,
            info: this.state.info,
            discount: this.state.discount,
            products: this.state.selectedProducts.map((value) =>value.id),
        };
        this.setState({
            name: '',
            info: '',
            discount: 0,
            products: [],
            selectedProducts: []
        })
        fetch(server_url + '/menus', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menu),
        })
            .then(res => res.json())
            .then(res => {
                this.props.onAdd(res)
            })
            .catch(err => {
                console.error(err);
            });

    }
    onSubmit = (event) => {
        event.preventDefault();
        this.createNew()
        this.props.handleClose()
    }
    render(){
        const { classes } = this.props;
        return (
            <Dialog
                onClose={this.props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.props.open}
            >
                <DialogContent>
                    <Avatar className={classes.avatar}>
                        <CloudUploadOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Subir un nuevo Menu
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">Nombre</InputLabel>
                            <Input id="name"
                                   name="name"
                                   autoComplete='off'
                                   onChange={this.handleInputChange}
                                   value={this.state.name}
                                   autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="textarea">Descripción</InputLabel>
                            <Input name="info"
                                   type="info"
                                   autoComplete='off'
                                   value={this.state.info}
                                   multiline={true}
                                   id="info"
                                   onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">Descuento</InputLabel>
                            <Input name="price"
                                   type="number"
                                   autoComplete='off'
                                   id="price"
                                   onChange={this.handleInputChange}
                                   value={this.state.price}
                            />
                        </FormControl>
                        <div className={classes.list}>
                            {this.state.selectedProducts.map((selectedProduct, idx) => (
                                <FormControl margin="normal" >
                                    <div className="listInput" >
                                        <InputBase
                                            className={classes.inputInList}
                                            name="selectedProducts"
                                            autoComplete='off'
                                            placeholder={`plato ${idx + 1}`}
                                            onFocus={() => {this.setState({ selectedForm : idx, productSuggestions: true})}}
                                            value={selectedProduct.name}
                                        />
                                        <IconButton className={classes.iconButton}
                                                    type="button"
                                                    onClick={this.handleRemoveList(idx, ['selectedProducts'])}
                                                    className="small"
                                        >
                                            <RemoveCircleIcon />
                                        </IconButton>
                                        {this.renderSuggestions(idx)}
                                    </div>
                                </FormControl>
                            ))}
                            <Button
                                style={{margin: '10px'}}
                                type="button"
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={this.handleAddList('selectedProducts')}
                                className="small"
                            >
                                Agregar Plato
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{margin: '10px'}}
                        >
                            Subir
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        );

    }
}



AddMenuModal.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AddMenuModal);