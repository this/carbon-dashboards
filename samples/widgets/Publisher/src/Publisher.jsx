/*
 *  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React, {Component} from 'react';
//import Widget from '@wso2-dashboards/widget';
import Widget from './Widget'
import {MuiThemeProvider} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Publisher extends Widget {
    constructor(props) {
        super(props);
        this.publishMsg = this.publishMsg.bind(this);
        this.publishedMsgSet = [];
        this.state = {publishedMsg: ''};
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.getPublishedMsgsOutput = this.getPublishedMsgsOutput.bind(this);
        this.clearMsgs = this.clearMsgs.bind(this);
        this.input={};
        console.log("THIS")
        console.log(this)
        console.log("THIS")
    }

    publishMsg() {
        if (this.input.value) {
            this.state.inputVal = '';
            this.publishedMsgSet.push({time: new Date(), value: this.input.value});
            super.publish(this.input.value);
            this.setState({publishedMsg: this.input.value});
        }
    }

    componentDidMount() {
        super.publish("Initial Message");
    }

    getPublishedMsgsOutput() {
        const output = [];
        this.publishedMsgSet.forEach((d, i) => {
            output.push(<div>[Sent] {d.time.toTimeString()} [Message] - {d.value}</div>)
        });
        return output;
    }

    clearMsgs() {
        this.setState({publishedMsg: ''});
        this.publishedMsgSet = [];
    }

    onChangeHandle(event, value) {
        this.setState({inputVal: value});
        this.input = {};
        this.input.value = value;
    }

    render() {
        return (
            <MuiThemeProvider
                muiTheme={getMuiTheme(darkBaseTheme)}
            >
                <section style={{marginTop: 25, padding: 10}}>
                    <div style={{overflow: 'hidden'}}>
                        <div style={{width: '100%', paddingRight: 10, paddingLeft: 10 }}>
                            <TextField
                                hintText="Hint Text"
                                fullWidth
                                value={this.state.inputVal}
                                onChange={(event, newValue) => {
                                    this.setState({inputVal: newValue});
                                    this.input = {};
                                    this.input.value = newValue;
                                }}
                            />
                        </div>
                        <div style={{paddingLeft:10}}>
                            <FlatButton
                                backgroundColor={'#1d85d3'}
                                hoverColor={'#1a619d'}
                                label={"Publish"}
                                onClick={this.publishMsg}
                            />
                            <FlatButton
                                backgroundColor={'#d3240b'}
                                hoverColor={'#86170b'}
                                label={"Clear"}
                                onClick={this.clearMsgs}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        </div>
                    </div>
                    <div style={{paddingLeft: 15, marginTop: 10}}>
                        {this.getPublishedMsgsOutput()}
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

global.dashboard.registerWidget("Publisher", Publisher);
