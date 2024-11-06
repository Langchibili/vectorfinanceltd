"use client";

import { Slide } from "@material-ui/core";
import React from "react";

export default class HelpPageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {

  }
  render() {
    return <Slide in={true} direction="left">
          <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                <div className="card rounded-0 bg-success-subtle mx-n4 mt-n4 border-top">
                    <div className="px-4">
                    <div className="row">
                        <div className="col-xxl-5 align-self-center">
                        <div className="py-4">
                            <h4 className="display-6 coming-soon-text">
                            Frequently asked questions
                            </h4>
                            <p className="text-success fs-15 mt-3">
                            If you can not find answer to your question in our FAQ, you
                            can always contact us or email us. We will answer you shortly!
                            </p>
                            <div className="hstack flex-wrap gap-2">
                            <button
                                type="button"
                                className="btn btn-primary btn-label rounded-pill"
                            >
                                <i className="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2" />{" "}
                                Email Us
                            </button>
                            <button
                                type="button"
                                className="btn btn-info btn-label rounded-pill"
                            >
                                <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2" />{" "}
                                Send Us Tweet
                            </button>
                            </div>
                        </div>
                        </div>
                        <div className="col-xxl-3 ms-auto">
                        <div className="mb-n5 pb-1 faq-img d-none d-xxl-block">
                            <img
                            src="assets/images/faq-img.png"
                            alt=""
                            className="img-fluid"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* end card body */}
                </div>
                {/* end card */}
                <div className="row justify-content-evenly mb-4">
                    <div className="col-lg-4">
                    <div className="mt-3">
                        <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0 me-1">
                            <i className="ri-question-line fs-24 align-middle text-success me-1" />
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="fs-16 mb-0 fw-semibold">General Questions</h5>
                        </div>
                        </div>
                        <div
                        className="accordion accordion-border-box"
                        id="genques-accordion"
                        >
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="genques-headingOne">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#genques-collapseOne"
                                aria-expanded="false"
                                aria-controls="genques-collapseOne"
                            >
                                What is Lorem Ipsum ?
                            </button>
                            </h2>
                            <div
                            id="genques-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="genques-headingOne"
                            data-bs-parent="#genques-accordion"
                            style={{}}
                            >
                            <div className="accordion-body">
                                If several languages coalesce, the grammar of the resulting
                                language is more simple and regular than that of the
                                individual languages. The new common language will be more
                                simple and regular than the existing European languages. It
                                will be as simple their most common words.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="genques-headingTwo">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#genques-collapseTwo"
                                aria-expanded="false"
                                aria-controls="genques-collapseTwo"
                            >
                                Why do we use it ?
                            </button>
                            </h2>
                            <div
                            id="genques-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="genques-headingTwo"
                            data-bs-parent="#genques-accordion"
                            style={{}}
                            >
                            <div className="accordion-body">
                                The new common language will be more simple and regular than
                                the existing European languages. It will be as simple as
                                Occidental; in fact, it will be Occidental. To an English
                                person, it will seem like simplified English, as a skeptical
                                Cambridge friend of mine told me what Occidental is.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="genques-headingThree">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#genques-collapseThree"
                                aria-expanded="false"
                                aria-controls="genques-collapseThree"
                            >
                                Where does it come from ?
                            </button>
                            </h2>
                            <div
                            id="genques-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="genques-headingThree"
                            data-bs-parent="#genques-accordion"
                            style={{}}
                            >
                            <div className="accordion-body">
                                he wise man therefore always holds in these matters to this
                                principle of selection: he rejects pleasures to secure other
                                greater pleasures, or else he endures pains to avoid worse
                                pains.But I must explain to you how all this mistaken idea
                                of denouncing pleasure and praising pain was born and I will
                                give you a complete.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="genques-headingFour">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#genques-collapseFour"
                                aria-expanded="false"
                                aria-controls="genques-collapseFour"
                            >
                                Where can I get some ?
                            </button>
                            </h2>
                            <div
                            id="genques-collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="genques-headingFour"
                            data-bs-parent="#genques-accordion"
                            style={{}}
                            >
                            <div className="accordion-body">
                                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum
                                ante ipsum primis in faucibus orci luctus et ultrices
                                posuere cubilia Curae; In ac dui quis mi consectetuer
                                lacinia. Nam pretium turpis et arcu arcu tortor, suscipit
                                eget, imperdiet nec, imperdiet iaculis aliquam ultrices
                                mauris.
                            </div>
                            </div>
                        </div>
                        </div>
                        {/*end accordion*/}
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="mt-3">
                        <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0 me-1">
                            <i className="ri-user-settings-line fs-24 align-middle text-success me-1" />
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="fs-16 mb-0 fw-semibold">Manage Account</h5>
                        </div>
                        </div>
                        <div
                        className="accordion accordion-border-box"
                        id="manageaccount-accordion"
                        >
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="manageaccount-headingOne">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#manageaccount-collapseOne"
                                aria-expanded="false"
                                aria-controls="manageaccount-collapseOne"
                            >
                                Where can I get some ?
                            </button>
                            </h2>
                            <div
                            id="manageaccount-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="manageaccount-headingOne"
                            data-bs-parent="#manageaccount-accordion"
                            >
                            <div className="accordion-body">
                                If several languages coalesce, the grammar of the resulting
                                language is more simple and regular than that of the
                                individual languages. The new common language will be more
                                simple and regular than the existing European languages. It
                                will be as simple their most common words.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="manageaccount-headingTwo">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#manageaccount-collapseTwo"
                                aria-expanded="true"
                                aria-controls="manageaccount-collapseTwo"
                            >
                                Where does it come from ?
                            </button>
                            </h2>
                            <div
                            id="manageaccount-collapseTwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="manageaccount-headingTwo"
                            data-bs-parent="#manageaccount-accordion"
                            >
                            <div className="accordion-body">
                                The new common language will be more simple and regular than
                                the existing European languages. It will be as simple as
                                Occidental; in fact, it will be Occidental. To an English
                                person, it will seem like simplified English, as a skeptical
                                Cambridge friend of mine told me what Occidental is.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2
                            className="accordion-header"
                            id="manageaccount-headingThree"
                            >
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#manageaccount-collapseThree"
                                aria-expanded="false"
                                aria-controls="manageaccount-collapseThree"
                            >
                                Why do we use it ?
                            </button>
                            </h2>
                            <div
                            id="manageaccount-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="manageaccount-headingThree"
                            data-bs-parent="#manageaccount-accordion"
                            >
                            <div className="accordion-body">
                                he wise man therefore always holds in these matters to this
                                principle of selection: he rejects pleasures to secure other
                                greater pleasures, or else he endures pains to avoid worse
                                pains.But I must explain to you how all this mistaken idea
                                of denouncing pleasure and praising pain was born and I will
                                give you a complete.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="manageaccount-headingFour">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#manageaccount-collapseFour"
                                aria-expanded="false"
                                aria-controls="manageaccount-collapseFour"
                            >
                                What is Lorem Ipsum ?
                            </button>
                            </h2>
                            <div
                            id="manageaccount-collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="manageaccount-headingFour"
                            data-bs-parent="#manageaccount-accordion"
                            >
                            <div className="accordion-body">
                                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum
                                ante ipsum primis in faucibus orci luctus et ultrices
                                posuere cubilia Curae; In ac dui quis mi consectetuer
                                lacinia. Nam pretium turpis et arcu arcu tortor, suscipit
                                eget, imperdiet nec, imperdiet iaculis aliquam ultrices
                                mauris.
                            </div>
                            </div>
                        </div>
                        </div>
                        {/*end accordion*/}
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="mt-3">
                        <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0 me-1">
                            <i className="ri-shield-keyhole-line fs-24 align-middle text-success me-1" />
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="fs-16 mb-0 fw-semibold">
                            Privacy &amp; Security
                            </h5>
                        </div>
                        </div>
                        <div
                        className="accordion accordion-border-box"
                        id="privacy-accordion"
                        >
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="privacy-headingOne">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#privacy-collapseOne"
                                aria-expanded="true"
                                aria-controls="privacy-collapseOne"
                            >
                                Why do we use it ?
                            </button>
                            </h2>
                            <div
                            id="privacy-collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="privacy-headingOne"
                            data-bs-parent="#privacy-accordion"
                            >
                            <div className="accordion-body">
                                If several languages coalesce, the grammar of the resulting
                                language is more simple and regular than that of the
                                individual languages. The new common language will be more
                                simple and regular than the existing European languages. It
                                will be as simple their most common words.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="privacy-headingTwo">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#privacy-collapseTwo"
                                aria-expanded="false"
                                aria-controls="privacy-collapseTwo"
                            >
                                Where can I get some ?
                            </button>
                            </h2>
                            <div
                            id="privacy-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="privacy-headingTwo"
                            data-bs-parent="#privacy-accordion"
                            >
                            <div className="accordion-body">
                                The new common language will be more simple and regular than
                                the existing European languages. It will be as simple as
                                Occidental; in fact, it will be Occidental. To an English
                                person, it will seem like simplified English, as a skeptical
                                Cambridge friend of mine told me what Occidental is.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="privacy-headingThree">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#privacy-collapseThree"
                                aria-expanded="false"
                                aria-controls="privacy-collapseThree"
                            >
                                What is Lorem Ipsum ?
                            </button>
                            </h2>
                            <div
                            id="privacy-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="privacy-headingThree"
                            data-bs-parent="#privacy-accordion"
                            >
                            <div className="accordion-body">
                                he wise man therefore always holds in these matters to this
                                principle of selection: he rejects pleasures to secure other
                                greater pleasures, or else he endures pains to avoid worse
                                pains.But I must explain to you how all this mistaken idea
                                of denouncing pleasure and praising pain was born and I will
                                give you a complete.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item shadow">
                            <h2 className="accordion-header" id="privacy-headingFour">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#privacy-collapseFour"
                                aria-expanded="false"
                                aria-controls="privacy-collapseFour"
                            >
                                Where does it come from ?
                            </button>
                            </h2>
                            <div
                            id="privacy-collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="privacy-headingFour"
                            data-bs-parent="#privacy-accordion"
                            >
                            <div className="accordion-body">
                                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum
                                ante ipsum primis in faucibus orci luctus et ultrices
                                posuere cubilia Curae; In ac dui quis mi consectetuer
                                lacinia. Nam pretium turpis et arcu arcu tortor, suscipit
                                eget, imperdiet nec, imperdiet iaculis aliquam ultrices
                                mauris.
                            </div>
                            </div>
                        </div>
                        </div>
                        {/*end accordion*/}
                    </div>
                    </div>
                </div>
                </div>
                {/*end col*/}
            </div>
            {/*end row*/}
          </div>
    </Slide>;
  }
}
//  id
//  sign a letter of sale