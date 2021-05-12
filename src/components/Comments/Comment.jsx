import React, {Component} from "react";
import './Comment.css';
import Button from "@material-ui/core/Button";

class Comment extends Component {
    constructor() {
        super();
    }
    onDeleteClick = (id) => {
        this.props.delete(id);
    };

    render() {
        let date = this.props.date;
        let cutDate = date.replace('T', " ").substring(0, date.length - 8);
        return (
            <div>
                <div className="comment">
                    <p>{this.props.comment} <span>{cutDate}</span></p>
                    <Button variant="outlined"  onClick={() => {
                        this.onDeleteClick(this.props.id)
                    }}>Delete
                    </Button>
                </div>
            </div>
        )
    }
}

export default Comment;