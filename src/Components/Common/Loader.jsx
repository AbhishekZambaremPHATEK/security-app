import { CircularProgress, Modal } from '@mui/material';
import React from 'react';
import "./Loder.css"


export class Loader extends React.Component {
    constructor(props) {
        super(props)

    }
    hanleClickModal = (event) => {
        event.stopPropagation();
    }
    renderModalShow() {
        if (this.props.show === true) {
            return "modal modal-show";
        }
        else {
            return "modal modal-hide";
        }
    }
    renderLoader() {
        return <CircularProgress />
    }
    render() {
        return (
            // <div className={this.renderModalShow()} data-backdrop="static" tabindex="-1" role="dialog">
            //     <div className="modal-dialog" role="document">
            //         <div className="modal-content">
            //             <div className="modal-body">
            //                 {this.renderLoader()}
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div class={this.renderModalShow()} data-backdrop="static" id="myModal">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content modalcontent">
                        <div class="modal-body modalBody">
                            {this.renderLoader()}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Loader
