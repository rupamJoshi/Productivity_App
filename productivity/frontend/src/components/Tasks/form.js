import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTask, editTask} from "../../actions/tasks_actions";

export class AddTasks extends Component {
    state = {
        title: '',
        description: '',
        duration: '',
        note: '',
        createdAt: '',
    };

    componentDidMount() {
        console.log(this.props.task);
        if (this.props.task != null) {
            this.setState({
                ...this.props.task,
            })
        }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = e => {
        console.log("sdfdf ");
        e.preventDefault();
        const {title, description, duration, note} = this.state;
        if (this.props.task != null) {
            const task = {title, description, duration, note, owner: this.props.auth.user.id, id:this.props.task.id };
            this.props.editTask(task);
        } else {
            const task = {title, description, duration, note, owner: this.props.auth.user.id};
            this.props.addTask(task);
        }
        this.props.hideModel();
    };

    render() {
        const {title, description, duration, createdAt, note} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        {
                            createdAt &&
                            <div className="form-group">
                                <label>Created At  </label>
                                <label
                                >
                                    { `:   ${new Date(createdAt).toLocaleDateString()} :  ${new Date(createdAt).toLocaleTimeString()}`}
                                </label>
                            </div>
                        }
                        <label>Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            type="text-area"
                            name="description"
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration</label>
                        <input
                            className="form-control"
                            type="text"
                            name="duration"
                            onChange={this.onChange}
                            value={duration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Note</label>
                        <textarea
                            className="form-control"
                            type="text-area"
                            name="note"
                            onChange={this.onChange}
                            value={note}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, {addTask, editTask})(AddTasks);