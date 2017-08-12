import React from 'react';
import {getSettings, saveSettings, clearHistory} from '../utils/storage';
import { getDefaultSettings } from '../utils/app';

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            settings: getDefaultSettings(),
            success: false
        };
    }

    async componentDidMount(){
        const settings = await getSettings();
        this.setState({settings});
    }

    save(){
        const { settings } = this.state;
        //if turn off the history then delete all of his history from the storage
        if(!settings.history.enabled){
            clearHistory();
        }
        saveSettings(settings);
        this.showSuccess();
    }

    reset(){
        const settings = getDefaultSettings();
        saveSettings(settings);
        this.setState({settings});
        this.showSuccess();
    }

    showSuccess(){
        this.setState({success: true});
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.setState({success: false});
        },3000);
    }

    render() {
        let { settings, success } = this.state,
            { history, balloon } = settings;

        return (
            <div>
                <div className="container">
                    <div className="logo-box">
                        <img src="icons/icon128.png" alt=""/>
                    </div>
                    <div className="top">
                        <div className="title">Settings</div>
                    </div>
                    <div>
                        <form>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={history.enabled} onChange={e => {
                                        history.enabled = e.target.checked;
                                        this.setState({settings});
                                    }} /> Save History
                                </label>
                            </div>
                            <div className="chk-box indent">
                                <label htmlFor="selectHistoryItems">Items in History:</label>
                                <div className="select-history-items">
                                    <select id="selectHistoryItems" onChange={e => {
                                        history.itemsCount = Number(e.target.value);
                                        this.setState({settings});
                                    }} disabled={!history.enabled} className="form-control" value={history.itemsCount.toString()}>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
                            <div className="checkbox" >
                                <label>
                                    <input type="checkbox" checked={balloon.enabled} onChange={e => {
                                        balloon.enabled = e.target.checked;
                                        this.setState({settings});
                                    }} /> Show translation on a balloon popup over the web-page edges
                                </label>
                            </div>
                            <div className="indent" >
                                <div className="chk-box">
                                    <label htmlFor="selectBalloonPosition">Balloon Position:</label>
                                    <div className="select-balloon">
                                        <select id="selectBalloonPosition" onChange={e => {
                                            balloon.position = e.target.value;
                                            this.setState({settings});
                                        }} disabled={!balloon.enabled} className="form-control" value={balloon.position}>
                                            <option value="topRight">Top-Right</option>
                                            <option value="topLeft">Top-Left</option>
                                            <option value="bottomLeft">Bottom-Left</option>
                                            <option value="bottomRight">Bottom-Right</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="chk-box">
                                    <label htmlFor="selectBalloonTimeOpen">Balloon will stay open for:</label>
                                    <div className="select-balloon">
                                        <select id="selectBalloonTimeOpen" onChange={e => {
                                            balloon.timeOpen = Number(e.target.value);
                                            this.setState({settings});
                                        }} disabled={!balloon.enabled} className="form-control" value={balloon.timeOpen.toString()}>
                                            <option value="3">3 Seconds</option>
                                            <option value="5">5 seconds</option>
                                            <option value="10">10 seconds</option>
                                            <option value="-1">Until I close it</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                <input className="btn btn-primary" type="button" value="Save" onClick={this.save.bind(this)}/>
                                <input className="btn btn-default" type="button" value="Reset" onClick={this.reset.bind(this)}/>
                                <div className={`success-box ${success ? 'show' : ''}`}>Settings saved.</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <div className="copy">&copy;{new Date().getFullYear()} Adidi</div>
                        <iframe
                            src="https://ghbtns.com/github-btn.html?user=adidi&repo=morfix&type=star&count=true&size=large"
                            scrolling="0" width="160px" height="30px" style={{border:0}} />
                    </div>
                    <div>
                        <a href="https://www.paypal.me/adieloz" target="_blank">
                            <img src="https://www.paypalobjects.com/en_US/IL/i/btn/btn_donateCC_LG.gif" style={{border:0}}
                                 alt="PayPal - The safer, easier way to pay online!"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;