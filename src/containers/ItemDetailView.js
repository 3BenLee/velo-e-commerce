import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCartIcon from '../components/ShoppingCartAddIcon';

const styles = theme => ({
  card: {
    maxWidth: "90%",
    marginTop: 120,
    marginLeft: 20,
    marginRight: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  }
});

class ItemDetailView extends Component {

  state = {
    pathId: null,
    cards: null 
  }

  componentDidMount () {
    axios.get('https://velo-velo.firebaseio.com/.json')
      .then(response => {
        let data = Object.values(response.data)
        console.log('##', data)
        data.map((match) => {
          if (String(data.id) === this.props.match.params.id) {
            this.setState({cards: match});
          }
          console.log("^",this.props)
          return null;
        })
      });
  }
  // Object.values
  // this.props.match.params.id

  render() {
    console.log('***', this.state.cards)
    const { classes } = this.props;

    return (
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={this.state.cards}
          />
          <CardMedia
            className={classes.media}
            image={this.props.image}
            title="Paella dish"
          />
          {/* <img src={this.props.image} /> */}
          <CardContent>
            <Typography component="p">
              {this.props.description}
            </Typography>
            <Typography component="p">
              ${this.props.price}
            </Typography>
            <AddCartIcon />
          </CardContent>
        </Card>
    );
  }
}

ItemDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemDetailView);
