/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { emailRegExp } from "../../utils";
import { useAccount } from "../../hooks/account";
import { LoginInfoModel } from "../../models";
import { Button } from "../shared";
import { useAsync } from "../../utils";

const validationSchema = yup
    .object()
    .shape({
        mEmail: yup
            .string()
            .required('Vui lòng nhập địa chỉ email hợp lệ.')
            .matches(emailRegExp, 'Vui lòng nhập địa chỉ email hợp lệ.'),
        mPassword: yup
            .number()
            .required('Vui lòng nhập mật khẩu đúng.')
            .min(3, 'Mật khẩu phải tối thiểu 6 ký tự.')
    });

const Login = React.memo(() => {
    const history = useHistory()

    const account = useAccount()
    const loginAsync = useAsync<LoginInfoModel>(account.loginAsync)

    return <body className="login bg-blue">
        <div id="main">
            <div className="logo-wrap d-flex justify-content-center">
                <Link
                    className="logo"
                    to="/"
                >
                    <img src="./images/logo.png" title="Medigo" className="img-fluid" width={140} />
                </Link>
            </div>
            <div className="form-wrap">
                <h1 className="text-center mb-5">MEDIGO ADMIN</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        mEmail: '',
                        mPassword: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        loginAsync.execute(values).then(res => {
                            history.push("/search-pharmacys")
                        })
                    }}
                >
                    {({
                        errors,
                        isSubmitting,
                        submitCount,
                        values,
                        handleChange,
                        handleSubmit
                    }) => <Form
                        className="login-form"
                        noValidate={true}
                        validated={submitCount > 0}
                        onSubmit={handleSubmit}
                    >
                            <Form.Group>
                                <Form.Control
                                    name="mEmail"
                                    placeholder="Email"
                                    required={true}
                                    type="email"
                                    value={values.mEmail}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mEmail}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="mPassword"
                                    placeholder="Mật khẩu"
                                    required={true}
                                    type="password"
                                    value={values.mPassword}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <p className="text-right">
                            </p>
                            <Button
                                type="submit"
                                text='Đăng nhập'
                                loading={loginAsync.status === 'loading'}
                            />
                        </Form>
                    }
                </Formik>
            </div>
        </div>
    </body>
})

export default Login