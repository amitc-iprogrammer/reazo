
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { LoginViewProps } from './types/LoginView';
// import { push } from 'connected-react-router';

import './Login.css';

//@param elementId

type Props = LoginViewProps;
type State = {};
class InitialLogin extends React.Component<Props, State> {
    temporaryPassword: {
        "statusCode": 200,
        "data": {
            "email": "adamcovert@gmail.com"
            "userId": 123,
            "firstName": "Mark",
            "lastName": "Zuckerberg"
        },
        "message": "Password Matched",
        "emailErrorMessage" :"Wrong Email Address, Please type correct"
    };

    onSubmit = (e: any) => {
        const value = (e.target as HTMLInputElement).value;
        if (value !== this.temporaryPassword.data.email) {
            console.log(this.temporaryPassword.data.email,"sdsdsds")
        }

        console.log("aaaaaaaaa", value);
    }
    render() {
        return (
            <div className="loginWrapper">
                <div className="logincnt">
                    <div className="left">
                        <a href="javascript:void()" className="logo">
                            <img src={require('../../images/reazo-logo.png')} />
                        </a>
                        <h1 className="hd-title">Welcome to <span>Reazo!</span></h1>
                        <p className="login-p">
                            At Reazo.com you will find useful discussion topics about buying and selling real estate, using real estate as investments, buying foreclosures and flipping houses, financing real estate purchases and additional tools to help buyers and sellers as they prepare to make real estate decisions.
                </p>
                        <div className="button-group">
                            <a href="javascript:void()" className="btn-knowmore">Know more...</a>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="login-error">
                            <div className="close-circle">
                                <img src={require('../../images/icon-close-circle.png')} />
                            </div>
                            <div className="cnt">
                                <p className="one">Incorrect email address and/or password.</p>
                                <p className="two">Please try again.</p>
                            </div>
                            <a className="closeAnch" href="javascript:void()">
                                <img src={require('../../images/icon-close.png')} />
                            </a>
                            <div className="clearfix"></div>
                        </div>
                        <div className="title-signin">Sign in</div>
                        <div className="signin-before">Before we begin, please login to your account</div>
                        <div className="login-formCnt">
                            <Form onSubmit={this.props.onFormSubmit}>
                                <Form.Field>
                                    <label className="iconInp">
                                        <img src={require('../../images/icon-email.png')} />
                                    </label>
                                    <input type="text" onChange={this.onSubmit} id="last" className="inp" placeholder='Email Address' />
                                    {/* <Form.Input
                                        placeholder={'Email address'}
                                        // label={'Email address'}
                                        className="inp"
                                        type="text"
                                        // name='username'
                                        // icon='mail'
                                        // iconPosition='left'
                                        onChange={this.props.onFormChange}
                                        value={this.props.authentication.form.username.value}
                                        error={!this.props.authentication.form.username.isValid}
                                    /> */}
                                </Form.Field>
                                <Form.Field>
                                    <label className="iconInp">
                                        <img src={require('../../images/icon-password.png')} />
                                    </label>
                                    <input type="password" onChange={this.onSubmit} className="inp" placeholder='Password' />
                                </Form.Field>
                                <Form.Field>
                                    <a href="javascript:void()" className="anch-forgot">Forgot your password?</a>
                                </Form.Field>
                                <Button onClick={this.onSubmit} type='submit'>Sign In</Button>
                            </Form>
                            <div className="text-dont">In case you do not know the temporary password.<br />Please contact Reazo <a href="javascript:void()">support team</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InitialLogin;