import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {decodeWolfram} from "../../libs/wolfram/text-replace";

class ProbTypeCard extends Component {
  static propTypes = {
    icon: PropTypes.string,
    handlerType: PropTypes.func,
    index: PropTypes.number.isRequired,
    description: PropTypes.shape().isRequired,
    title: PropTypes.string,
  }

  static defaultProps = {
    title: "",
    icon: "",
    handlerType: () => {}
  }

  getContent = () => {
    const { description } = this.props;
    var content = [];
    for (var key in description) {
      content.push({
        key,
        problem: decodeWolfram(description[key]).text
      });
    }
    return content;
  }

  render() {
    // TODO:: icon needs to assigned a value of an image
    const {
      icon, title, description, index, handlerType,
    } = this.props;

    return (
      <Card
        style={{ margin: "10%" }}
      >
        <CardActionArea
          // onClick={() => this.props.cardClickHandler(index)}
          onClick={() => handlerType(
            {
              index,
              title,
              icon,
              description
            },
          )}
        >
          <CardMedia
            image={icon}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography style={{textAlign:"left", paddingLeft: "10px"}} component="p">
              {
                this.getContent().map((item, index) => 
                  <div key={index}>
                    <b>{`${item.key}:`}</b> {`${item.problem}`}
                    <br/>
                  </div>
                )
              }
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
    );
  }
}

export default ProbTypeCard;
