import React, { Component } from 'react';
import axios from 'axios';
import ButtonAppBar from '../components/ButtonAppBar';
import ItemCard from './ItemCard';
import { Route } from 'react-router-dom';
// import CardWrapper from '../components/CardWrapper';

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  } 
}

class ShopHome extends Component {

  state = {
    cards: []
  }

  componentDidMount () {
    axios.get('https://velo-velo.firebaseio.com/merchs.json')
      .then(response => {
        this.setState({cards: response.data});
        console.log(response);
      });
  }
  
  render() {

    const cards = Object.values(this.state.cards).map(cards => {
      return <ItemCard 
      key={cards.id} 
      title={cards.title}
      price={cards.price}
      image={cards.img} 
      description={cards.description}/>
    });

    return (
      <div>
        <ButtonAppBar />
        <Route 
          // Maybe I need to add "/" to the route path???
          path="" 
          exact 
          render={ () => 
            <div style={styles.wrapper}>
              {cards}
            </div>
          }
        />
      </div>
    )
  }
}

//     return (
//       <div>
//         <ButtonAppBar />
//         <Route 
//           // Maybe I need to add "/" to the route path???
//           path="" 
//           exact 
//           render={ () => 
//             <CardWrapper>
//               {cards}
//             </CardWrapper> 
//           }
//         />
//       </div>
//     )
//   }
// }

export default ShopHome;
