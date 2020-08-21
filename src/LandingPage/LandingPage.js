import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './LandingPage.css'
function LandingPage(props){
    // const { note, history }=props;
        return(
            <div className="LandingPage">
                <div className="LandingPage_image_group">
                    <div className="LandingPage_image">
                        
                    </div>
                </div>
                <div className="LandingPage_text_group">
                    
                    <h1>
                        <span className="LandingPage_welcome Lustria">
                            <span className="red">
                                We
                            </span>
                            <span className="brown">
                                lco
                            </span>
                            <span className="orange">
                                me
                            </span>
                        </span>
                    </h1>
                    
                    <p className="LandingPage_feature">
                        <span className="italic">
                            Search{' '}
                        </span>
                            the recipe you want
                    </p>
                    <p className="LandingPage_feature">
                        <span className="italic">
                            Collect{' '}
                        </span>
                            the recipe you like
                    </p>
                    <p className="LandingPage_feature_last">
                        <span className="italic">
                            Share{' '}
                        </span>
                            the experience you have
                    </p>
                    <p className="LandingPage_findMore">
                        <Link to='/login'>
                            Find More
                        </Link>
                    </p>
                </div>
            </div>
        )
}
LandingPage.defaultProps = {
    note: {},
    history: {},
};

export default withRouter(LandingPage);
