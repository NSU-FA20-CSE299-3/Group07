import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class OfferPost extends Component {
    render() {
        const {offer : {offerID, displayName, schoolMedium, schoolClass, description, location, salary, duration, answerCount}} = this.props;
        return (
            <Card className="card">
                <CardContent>
                    <Typography variant="h5" component="h2" color="primary">
                    {displayName}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Medium/Version: {schoolMedium}
                    <br />
                    Class: {schoolClass}
                    <br />
                    Subjects: {description}      Duration: {duration} days a week
                    <br />
                    Location: {location}
                    <br />
                    Salary: {salary} per month
                    <br />
                    Answers: {answerCount}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default OfferPost
