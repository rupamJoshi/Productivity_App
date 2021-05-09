import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTasks, editTask ,deleteTask} from "../../actions/tasks_actions";
import {Button, Modal} from "react-bootstrap";
import AddTasks from "./form";

export class Tasks extends Component {

    constructor() {
        super();
        this.state = {
            time: {},
            seconds: 0,
            min: 0,
            topId: 0,
            showModal: false,
            task: null,
            searchText: '',
        }
        this.timer = 0;
    }


    static propTypes = {
        tasks: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.props.getTasks();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.updateRemainingTime();
    }

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    startTimer = () => {
        if (this.timer ==0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let min=this.state.min;
        let sec=this.state.seconds;
        if(this.state.seconds === 0) {
            min = this.state.min - 1;
            sec = 60;
        }

        this.setState({
            seconds: sec-1,
            min:min
        });

        // Check if we're at zero.
        if (this.state.min == 0 && this.state.seconds==0) {
            clearInterval(this.timer);
        }
    }


    updateRemainingTime = ()  =>{
        if(Array.isArray(this.props.tasks) && this.props.tasks.length > 0) {
            //console.log('task : ', this.props.tasks[0])
            const firstTaskDuration = this.props.tasks[0].duration * 60;
            let timeLeftVar = this.secondsToTime(firstTaskDuration);
            this.setState({ seconds : timeLeftVar.s , min: timeLeftVar.m, topId:this.props.tasks[0].id});
            this.startTimer();
        }
    }

    onChange = e => this.setState({ searchText: e.target.value});

    render() {
        const { modalShow } =this.state;
        return (
            <Fragment>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={this.onChange} />
                </form>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Time Remaining</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.searchText!='' ?
                        this.props.tasks.map((task) => (
                            this.state.searchText===(task.title) &&
                         <tr key={task.id} onClick={() => {
                            this.setState(prevState => ({
                            modalShow: !prevState.modalShow,
                            task: task,
                        }));
                        }}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.duration}</td>
                            <td>{task.id === this.state.topId && task.completedAt==null ? `${this.state.min} : ${this.state.seconds}` : task.duration}</td>
                            <td>
                                <button
                                    onClick={(e) => {
                                        this.props.editTask({...task, completedAt: new Date()});
                                        e.stopPropagation();
                                    }
                                    }
                                    className="btn btn-danger btn-sm"
                                >
                                    {' '}
                                    End Task
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={(e) => {
                                        this.props.deleteTask(task.id);
                                        e.stopPropagation();
                                    }
                                    }
                                    className="btn btn-danger btn-sm"
                                >
                                    {' '}
                                    Remove Task
                                </button>
                            </td>
                            {
                                task.completedAt &&
                                <td>Completed Task</td>

                            }
                        </tr>
                    ))
                            :
                            this.props.tasks.map((task) => (
                                <tr key={task.id} onClick={() => {
                                    this.setState(prevState => ({
                                        modalShow: !prevState.modalShow,
                                        task: task,
                                    }));
                                }}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.duration}</td>
                                    <td>{task.id === this.state.topId && task.completedAt==null ? `${this.state.min} : ${this.state.seconds}` : task.duration}</td>
                                    <td>
                                        <button
                                            onClick={(e) => {
                                                this.props.editTask({...task, completedAt: new Date()});
                                                e.stopPropagation();
                                            }
                                            }
                                            className="btn btn-danger btn-sm"
                                        >
                                            {' '}
                                            End Task
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={(e) => {
                                                this.props.deleteTask(task.id);
                                                e.stopPropagation();
                                            }
                                            }
                                            className="btn btn-danger btn-sm"
                                        >
                                            {' '}
                                            Remove Task
                                        </button>
                                    </td>
                                    {
                                        task.completedAt &&
                                        <td>Completed Task</td>

                                    }
                                </tr>
                            ))

                    }
                    </tbody>
                    <Modal
                        show={modalShow}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header >
                            <Modal.Title id="contained-modal-title-vcenter">
                                EDIT TASK
                            </Modal.Title>
                            <Button onClick={() => {
                                this.setState(prevState => ({
                                    modalShow: !prevState.modalShow,
                                }));
                            }}>Close</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <AddTasks task={this.state.task} hideModel={() => {
                                this.setState(prevState => ({
                                    modalShow: !prevState.modalShow,
                                }));
                            }}/>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </table>
            </Fragment>
        );
    }

}
const mapStateToProps = state => ({
    tasks: state.tasks_reducer.tasks
});


export default connect(mapStateToProps,{ getTasks, editTask, deleteTask })(Tasks);