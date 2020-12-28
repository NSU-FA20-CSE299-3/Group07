import React, { Component } from 'react';
import OfferPost from '../components/OfferPost';
import Grid from '@material-ui/core/Grid';
import firebaseApp from '../firebase';

import NewOfferForm from '../components/NewOfferForm';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {offers: []}
    }


    //Fetch recent offers from Firestore
    async getRecentOffers() {
        const db = firebaseApp.firestore();
        await db.collection("offers").get()
            .then((querySnapshot) => {
                const offersSet = querySnapshot.docs.map(doc => doc.data());
                this.setState({offers: offersSet});
            })
            .catch((err) => {console.log(err)});
    }

    render() {
    
        this.getRecentOffers();
        let recentOffers = this.state.offers.map(offer => <OfferPost key={offer.offerID} offer={offer}/>);

        return (
            <Grid container>
                <Grid item sm={6} xs={12}>
                    <h1>Home Page</h1>
                    <div>{recentOffers}</div>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <NewOfferForm />
                </Grid>

            </Grid>
        )
    }
}

export default Home
