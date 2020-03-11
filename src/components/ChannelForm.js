import React, {Component} from 'react';
 
class ChannelForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'https://www.youtube.com/user/TechGuyWeb'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.getChannelId(this.state.value);
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }
    
    render() { 
        return ( 
            <div className="container">
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row valign-wrapper">
                            <div className="input-field col s10">
                                <i className="material-icons prefix">video_library</i>
                                <input  id="url-input" type="text" className="validate" value={this.state.value} onChange={this.handleChange}/>
                                <label htmlFor="url-input">Enter Channel url</label>
                            </div>
                            <div className="col s2">
                                <input id="channel-form-submit" type="submit" href="#" className="btn waves-effect waves-light" value="Get Videos"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default ChannelForm;