import React, {Component} from 'react';
import firebaseApp from '../firebase';

//Material UI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = {
    displayName: {
        marginLeft: "10px",
        marginTop: "5px"
    }
}

class OfferPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUserDisplayName: "",
            buttonDisable: false,
            answers: [],
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
                        displayName: data.displayName,
                        answerID: doc.id
                    };

                    return answerInfo;
                });

                this.setState({answers: answerset});
            })
            .catch((err) => console.log(err));
    }
    


    render() {
        const { classes } = this.props;
        const {offer : { userID, displayName, schoolMedium, schoolClass, description, location, salary, duration, answerCount}} = this.props;

        const answersList = this.state.answers.map((answer) => {
            if (answer) {
                return (
                    <ListItem key={answer.answerID}>
                        <ListItemAvatar>
                            <Avatar>{answer.displayName ? (answer.displayName.charAt(0)) : "..."}</Avatar>
                        </ListItemAvatar>
                        <Link href={`/user/${answer.userID}`} underline="none">{answer.displayName}</Link>
                    </ListItem>
                )
            } else {return null}
        });


        return (
            <Card className="card">
                <CardContent>
                    <Grid container direction="row">
                        <Grid item>
                            <Avatar>{displayName.charAt(0)}</Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" color="primary" display="block" className={classes.displayName}>
                                <Link href={`/user/${userID}`} underline="none">{displayName}</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                    
                    <br />
                    <Typography variant="body2" component="p">
                        Medium/Version: {schoolMedium}
                        <br />
                        Class: {schoolClass}
                        <br />
                        Subjects: {description}
                        <br />
                        Duration: {duration} days a week
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



                    {(this.props.currentUser && (this.props.currentUser.uid === userID) && answerCount) ?
                        (<Accordion elevation={0}>
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

export default withStyles(styles)(OfferPost)
