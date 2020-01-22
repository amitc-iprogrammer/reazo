import * as React from 'react';
// import { Button, Form, List, Popup } from 'semantic-ui-react';
import { Form, List, Button } from 'semantic-ui-react';
import { WelcomePasswordViewProps } from './types/WelcomePasswordViewProps';
// import { WelcomeLayoutViewProps } from './types/WelcomeLayoutViewProps';
import "./WelcomePasswordView.css";

export const WelcomePasswordView: React.StatelessComponent<WelcomePasswordViewProps> =
	(props: WelcomePasswordViewProps, ) =>
		(
			<>
				{console.log('props.form.', props)}
				{/* {console.log('showResetPasswordViewshowResetPasswordView', props.showResetPasswordView)} */}
				{props.showResetPasswordView.verifyUserId.showResetPasswordView ?
					<div className="login-wrapper">
						<div className="login-cnt">
							<div className="left">
								<a className="logo-login">
									<img src={require('../../../images/login-logo.png')} />
								</a>
								<div className="text-instructions">Instructions to set new password.</div>
								<div className={props.onStateChange.showWelcomeContent ? "ullogin-points text-note show" : "ullogin-points"}>
									<List items={[
										'Between 8 to 32 characters in length.',
										'At least 1 uppercase alphabetic character.',
										'At least 1 lowercase alphabetic character.',
										'At least 1 number OR 1 special character (!#$%_-).',
										'Space(s) may be used but cannot be at the beginning or end of the password or phrase.',
										'Cannot be 1 of the previous 5 passwords.'
									]} />
								</div>
								<div className="text-note">Note: Passwords are case-sensitive.</div>
								<a onClick={props.showWelcomeContent} href="#." className="downarrow-mobile">
									{props.onStateChange.showWelcomeContent ? <img src={require('../../../images/up-arrow-mobile.png')} /> : <img src={require('../../../images/down-arrow-mobile.png')} />}
								</a>
							</div>

							<div className="right">
								<div className="title-signin title-reset">Reset your password</div>
								<div className="signin-before">Let's update your security settings for <br /><b>{props.showResetPasswordView.verifyUserId.accountLogin}</b></div>

								<div className="login-formCnt sign-form">
									<Form error={props.form.error}>
										<Form.Field>
											<label className="iconInp">
												<img src={require('../../../images/icon-email.png')} />
											</label>
											<label className="iconEye iconEyeLogin">
												{props.onStateChange.passwordVisibilityToggle ?
													<img onClick={props.handlePasswordVisibility} src={require('../../../images/icon-eye.png')} /> :
													<img onClick={props.handlePasswordVisibility} src={require('../../../images/icon-eye-close.png')} />}
											</label>
											<input
												error={props.form.fields.newPassword.error}
												name={props.form.fields.newPassword.id}
												id={props.form.fields.newPassword.id}
												onChange={(e: any) => props.onFormChange(props.form.id, e, null)}
												value={props.form.fields.newPassword.value !== null ? props.form.fields.newPassword.value : undefined}
												disabled={props.form.loading}
												type={!props.onStateChange.passwordVisibilityToggle ? "password" :
													"text"} className={props.showResetPasswordView.verifyUserId.newPasswordClassAdd ? "inp focus" : props.showResetPasswordView.verifyUserId.setNewPasswordEmptyError ? "inp empError" : 'inp'} placeholder='New password' />
										</Form.Field>
										<Form.Field>
											<label className="iconInp">
												<img src={require('../../../images/icon-password.png')} />
											</label>
											<label className="iconEye iconEyeLogin">
												{/* {props.onStateChange.passwordVisibilityToggle ?
													<img onClick={props.handlePasswordVisibility} src={require('../../../images/icon-eye.png')} /> :
													<img onClick={props.handlePasswordVisibility} src={require('../../../images/icon-eye-close.png')} />} */}
											</label>
											<input type={!props.onStateChange.passwordVisibilityToggle ? "password" :
												"text"}
												name={props.form.fields.confirmNewPassword.id}
												id={props.form.fields.confirmNewPassword.id}
												onChange={(e) => props.onFormChange(props.form.id, e, null)}
												value={props.form.fields.confirmNewPassword.value !== null ? props.form.fields.confirmNewPassword.value : undefined}
												error={props.form.fields.confirmNewPassword.error}
												disabled={props.form.loading}
												className={props.showResetPasswordView.verifyUserId.confirmNewPasswordClassAdd ? "inp focus" : 'inp'} placeholder='Confirm new password' />
										</Form.Field>
										<label className="text-security">Security Question</label>
										<Form.Select
											id={props.form.fields.securityQuestion.id}
											name={props.form.fields.securityQuestion.id}
											options={props.showResetPasswordView.setPasswordForm.fields.securityQuestion.options}
											onChange={(e, data) => props.onFormChange(props.form.id, e, data)}
											value={props.form.fields.securityQuestion.value !== null ? props.form.fields.securityQuestion.value : undefined}
											// error={props.form.fields.securityQuestion.error}
											disabled={props.form.loading}
											className="iconSelect"
											placeholder='Select security question'
										/>
										<Form.TextArea
											// error={props.form.fields.securityAnswer.error}
											name={props.form.fields.securityAnswer.id}
											id={props.form.fields.securityAnswer.id}
											// onChange={(e) => props.onFormChange(props.form.id, e, null)}
											// value={props.form.fields.securityAnswer.value !== null? props.form.fields.securityAnswer.value : undefined}
											// disabled={props.form.loading}
											placeholder='Answer' className="anstextarea" />
										<Button
											loading={props.form.loading}
											disabled={props.form.loading}
											onClick={(e) => props.onFormSubmit(props.form.id)}
											type='submit'>Submit</Button>
									</Form>
								</div>
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="clearfix"></div>
					</div>
					:



					< div className="loginWrapper">
						<div className="logincnt">
							<div className="left">
								<a href="javascript:void()" className="logo">
									<img src={require('../../../images/reazo-logo.png')} />
								</a>
								<h1 className="hd-title">Hello <b><span>{props.showResetPasswordView.verifyUserId.accountLogin}</span></b></h1>
								<h1 className="hd-title">Welcome to <b><span>Reazo!</span></b></h1>
								<p className={props.onStateChange.showWelcomeContent ? "login-p show" : "login-p"}>
									At Reazo.com you will find useful discussion topics about buying and selling real estate, using real estate as investments, buying foreclosures and flipping houses, financing real estate purchases and additional tools to help buyers and sellers as they prepare to make real estate decisions.
						</p>
								<a onClick={props.showWelcomeContent} href="#." className="downarrow-mobile">
									{props.onStateChange.showWelcomeContent ? <img src={require('../../../images/up-arrow-mobile.png')} /> : <img src={require('../../../images/down-arrow-mobile.png')} />}
								</a>
							</div>
							<div className="right">

								<div className={props.form.fields.email.error || props.form.fields.oldPassword.error ? "login-error show-error" :
								 "login-error"} id="login-error">
									<div className="close-circle">
										<img src={require('../../../images/icon-close-circle.png')} />
									</div>
									{props.form.fields.email.error || props.form.fields.oldPassword.error ?
										<div className="cnt">
											<p className="one"> Please fill all the fields.</p>
										</div>
										:
										<div className="cnt">
											<p className="one"> Incorrect email address and/or password.</p>
											<p className="two">Please try again.</p>
										</div>}
									<a onClick={props.handleCloseError} className="closeAnch" href="javascript:void()">
										<img src={require('../../../images/icon-close.png')} />
									</a>
									<div className="clearfix"></div>
								</div>
								<div className="title-signin">Sign in</div>
								<div className="login-formCnt">
									<>
										<Form >
											<Form.Field>
												<label className="iconInp">
													<img src={require('../../../images/icon-email.png')} />
												</label>
												<input type="text"
													onChange={(e) => props.onFormChange(props.form.id, e, null)}
													name={props.form.fields.email.id}
													className={props.showResetPasswordView.verifyUserId.emailClassAdd ? "inp focus" : props.form.fields.email.error ? "inp empError" : 'inp'} placeholder='Email address'

													value={props.form.fields.email.value !== null ? props.form.fields.email.value : undefined}
													error={props.form.fields.email.error}
													disabled={props.form.loading} />
												<span className="spanError">{props.showResetPasswordView.setPasswordForm.emailValidationErrorMessage}</span>
											</Form.Field>
											<Form.Field>
												<label className="iconInp">
													<img src={require('../../../images/icon-password.png')} />
												</label>
												<label className="iconEye iconEyeLogin">
													{props.onStateChange.passwordVisibilityToggle ?
														<img onClick={props.handlePasswordVisibility} src={require('../../../images/icon-eye.png')} /> :
														<img onClick={props.handlePasswordVisibility} src={require('../../../images/icon-eye-close.png')} />}
												</label>
												<input type={!props.onStateChange.passwordVisibilityToggle ? "password" :
													"text"}
													name={props.form.fields.oldPassword.id}
													id={props.form.fields.oldPassword.id}
													onChange={(e) => props.onFormChange(props.form.id, e, null)}
													value={props.form.fields.oldPassword.value !== null ? props.form.fields.oldPassword.value : undefined}
													error={props.form.fields.oldPassword.error}
													disabled={props.form.loading}
													className={props.showResetPasswordView.verifyUserId.passwordClassAdd ? "inp focus" : props.form.fields.oldPassword.error ? "inp empError" : 'inp'} placeholder='Temporary password' />
											</Form.Field>
											<Button
												onClick={(e) => props.onFormSubmit(props.form.id)}
												type='submit'>Login</Button>
										</Form>
									</>
									<div className="text-dont">In case you do not know the temporary password,<br />please contact Reazo <a href="javascript:void()">support team.</a></div>
								</div>
							</div>
						</div>
					</div>}
			</>

		)