import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class User extends Component {

	render() {
		return (
			<Grid container>
				<Grid item sm={6} xs={12}>
					<Card className="card">
                        <CardContent>
                            <Typography variant="h5" component="h2" color="primary">
                                This is user: {this.props.match.params.userID}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Profile info will go here!
                            </Typography>
                        </CardContent>
                    </Card>
				</Grid>
				<Grid item sm={6} xs={12}>

				</Grid>
			</Grid>
		);
	}
}

export default User;