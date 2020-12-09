import React, { Component } from 'react';
import OfferPost from '../components/OfferPost';
import Grid from '@material-ui/core/Grid';

class Home extends Component {

    offers = [{
        offerId: 1,
        userId: 1,
        userName: "user1",
        schoolMedium: "English",
        schoolClass: "8",
        details: "Maths, F.P. Maths, Physics, Chemistry, Biology",
        offerLocation: "Gulshan" 
    },
    {
        offerId: 2,
        userId: 2,
        userName: "samiya",
        schoolMedium: "Bangla",
        schoolClass: "5",
        details: "Maths",
        offerLocation: "Moghbazar" 
    }]

    render() {
    let recentOffers = this.offers.map(offer => <OfferPost key={offer.offerId} offer={offer}/>);


        return (
            <Grid container>
                <Grid item sm={6} xs={12}>
                    <h1>Home Page</h1>
                    <div>{recentOffers}</div>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>

            </Grid>
        )
    }
}

export default Home
