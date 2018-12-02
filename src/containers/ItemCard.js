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

import { withRouter } from 'react-router';

const styles = () => ({
  card: {
    // maxWidth: "calc(33% - 40px)",
    marginTop: 100,
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

  render() {
    
    const { classes } = this.props;

    return (
      <Card 
        className={classes.card}
        onClick={this.props.clicked}
        >
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
        </CardContent>
      </Card>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapStateToProps = () => {
//   return {
   
//   }
// }

export default (withRouter(withStyles(styles)(ItemCard)));

