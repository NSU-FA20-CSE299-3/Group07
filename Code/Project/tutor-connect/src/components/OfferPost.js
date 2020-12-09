import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class OfferPost extends Component {
    render() {
        const {offer : {offerId, userName, schoolMedium, schoolClass, details, offerLocation}} = this.props;
        return (
            <Card className="card">
                <CardContent>
                    <Typography variant="h5" component="h2">
                    {userName}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Medium/Version: {schoolMedium}
                    <br />
                    Class: {schoolClass}
                    <br />
                    Subjects: {details}
                    <br />
                    Location: {offerLocation}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default OfferPost
