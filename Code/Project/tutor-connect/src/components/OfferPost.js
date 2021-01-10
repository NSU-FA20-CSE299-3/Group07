import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../firebase';

//Material UI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class OfferPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisable: false
        }
    }

    //Add answers to database
    async applyAnswer(offerID, userID, displayName) {
        const newAnswer = {
            offerID: this.props.offer.offerID,
            userID: this.props.offer.userID,
            answerUserID: this.props.currentUser.uid
        };

        const db = firebaseApp.firestore();

        await db.collection("answers").add(newAnswer)
            .then((snapshot) => console.log("Answer made with ID: " + snapshot.id));

        this.setState({buttonDisable: true});

        const newAnswerCount = this.props.offer.answerCount + 1;

        await db.collection("offers").doc(this.props.offer.offerID)
            .update({answerCount: newAnswerCount})
            .catch((err) => {console.log(err)});
    }


    render() {
        const {offer : {offerID, userID, displayName, schoolMedium, schoolClass, description, location, salary, duration, answerCount}} = this.props;
        return (
            <Card className="card">
                <CardContent>
                    <Typography variant="h5" component={Link} to={`/user/${userID}`} color="primary">
                        {displayName}
                    </Typography>
                    <br />
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
                    <br />

                    {(this.props.currentUser && (this.props.currentUser.uid !== userID)) ?
                        (<Button
                            onClick={() => this.applyAnswer(offerID, userID, displayName)}
                            variant="contained"
                            color="primary"
                            disabled={this.state.buttonDisable}
                        > Apply </Button>) :
                        (<Typography variant="body2" component="p"> </Typography>)}
                    
                </CardContent>
            </Card>
        )
    }
}

export default OfferPost
