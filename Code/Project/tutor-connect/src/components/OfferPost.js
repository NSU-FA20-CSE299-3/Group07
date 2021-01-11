import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../firebase';

//Material UI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class OfferPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUserDisplayName: "",
            buttonDisable: false,
            answers: []
        }
    }

    componentDidMount() {
        this.showAnswers(this.props.offer.offerID);
        this.getCurrentUserInfo();
    }

    async getCurrentUserInfo() {
        const db = firebaseApp.firestore();

        if(this.props.currentUser){
            await db.collection("users").doc(this.props.currentUser.uid).get()
            .then((user) => {
                const userData = user.data();
                const firstName = userData.firstName;
                const lastName = userData.lastName;
                const displayName = firstName.concat(" ", lastName)
                this.setState({currentUserDisplayName: displayName});
            })
            .catch((err) => {
                console.log(err);
            });

        }
    }

    //Add answers to database
    async applyAnswer() {
        const newAnswer = {
            offerID: this.props.offer.offerID,
            userID: this.props.offer.userID,
            answerUserID: this.props.currentUser.uid,
            displayName: this.state.currentUserDisplayName
        };

        const db = firebaseApp.firestore();

        await db.collection("offers").doc(newAnswer.offerID).collection("answers").add(newAnswer)
            .then((snapshot) => console.log("Answer made with ID: " + snapshot.id));

        this.setState({buttonDisable: true});

        const newAnswerCount = this.props.offer.answerCount + 1;

        await db.collection("offers").doc(this.props.offer.offerID)
            .update({answerCount: newAnswerCount})
            .catch((err) => {console.log(err)});
    }


    async showAnswers(offerID) {
        const db = firebaseApp.firestore();

        await db.collection("offers").doc(offerID).collection("answers").get()
            .then((querySnapshot) => {
                const answerset = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    const answerInfo = {
                        userID: data.answerUserID,
                        displayName: data.displayName
                    };

                    return answerInfo;
                });

                this.setState({answers: answerset});
                console.log(answerset);
            })
            .catch((err) => console.log(err));
    }
    


    render() {
        const {offer : {offerID, userID, displayName, schoolMedium, schoolClass, description, location, salary, duration, answerCount}} = this.props;

        const answersList = this.state.answers.map((answer) => {
            if (answer) {
                return (
                    <ListItem>
                        <Link to={`/user/${answer.userID}`}>{answer.displayName}</Link>
                    </ListItem>
                )
            } else {return null}
        });


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
                            onClick={() => this.applyAnswer()}
                            variant="contained"
                            color="primary"
                            disabled={this.state.buttonDisable}
                        > Apply </Button>) : 
                        null
                        
                    }



                    {(this.props.currentUser && (this.props.currentUser.uid === userID)) ?
                        (<Accordion>
                            <AccordionSummary>Answers</AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {answersList}
                                </List>
                            </AccordionDetails>
                        </Accordion>) :
                        null
                    }
                    
                </CardContent>
            </Card>
        )
    }
}

export default OfferPost
