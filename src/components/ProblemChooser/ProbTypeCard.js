import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ProbTypeCard extends Component {
   


    render() {
        const { icon, title, description, index } = this.props;


        return (
          <Card 
            style={{margin: '10%'}} 
          >
          <CardActionArea
            //onClick={() => this.props.cardClickHandler(index)}
            onClick={() => this.props.handlerType(
                {   
                    index: index, 
                    hyp: description.Hyp, 
                    goal: description.Goal
                }
                )}
          >
            <CardMedia
              image="/static/images/cards/contemplative-reptile.jpg"
              title={"Contemplative Reptile"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography component="p">
                {"HYP: " + description.Hyp}
                <br />
                {"GOAL: " + description.Goal}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        )
      }
}

export default ProbTypeCard;