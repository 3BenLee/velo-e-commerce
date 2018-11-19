import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCartIcon from '../components/ShoppingCartAddIcon';
import { withRouter } from 'react-router';

const styles = theme => ({
  card: {
    maxWidth: "calc(33% - 40px)",
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

class ItemCard extends Component {

  ShowItemDetailHandler = (id) => {
    this.props.history.push(`detail/${this.props.id}`)
  }

  render() {
    
    const { classes } = this.props;

    return (
      <Card 
        className={classes.card}
        onClick={this.ShowItemDetailHandler}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.title}
        />
        <CardMedia
          className={classes.media}
          image={this.props.image}
          title="Paella dish"
        />
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

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ItemCard));