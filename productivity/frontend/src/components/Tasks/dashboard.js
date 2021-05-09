import React, {Component, Fragment} from 'react';
import Tasks from './tasks';
import {Button, Modal} from 'react-bootstrap'
import AddTasks from "./form";

export class Dashboard extends Component {

    state = {
        modalShow: false,
        startTimer: false,

    };

    setModalShow = () => {
        this.setState(prevState => ({
            modalShow: !prevState.modalShow,
        }));
    };


    render() {
        const {modalShow, setModalShow, startTimer} = this.state;
        return (
            <Fragment>
                <div className="container" style={{margin: "1%"}}>
                    <div className="row">
                <h2 className="col-sm-7">TASKS</h2>
                <Button variant="primary" className="col-sm-2" style={{marginRight: "2%"}} onClick={() => {
                    this.setState({startTimer: true });
                }}>
                   START TIMER
                </Button>
                <Button variant="primary" className="col-sm-2" onClick={() => {
                    this.setState(prevState => ({
                        modalShow: !prevState.modalShow,
                    }));
                }}>
                    ADD NEW TASK
                </Button>
                    </div>
                </div>

                <Tasks startTimer={startTimer}/>
                <Modal
                    show={modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                           ADD TASK
                        </Modal.Title>
                        <Button onClick={() => {
                            this.setState(prevState => ({
                                modalShow: !prevState.modalShow,
                            }));
                        }}>Close</Button>
                    </Modal.Header>
                    <Modal.Body>
                       <AddTasks  hideModel={() => {
                           this.setState(prevState => ({
                               modalShow: !prevState.modalShow,
                           }));
                       }}/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    };

}

export default Dashboard;