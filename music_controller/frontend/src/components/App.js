import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./homepage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="center">
            <HomePage />
        </div>
            )
    }
}

