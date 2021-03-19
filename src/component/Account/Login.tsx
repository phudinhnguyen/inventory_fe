import React from "react"
import { Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { emailRegExp } from "../../utils";
import { useAccount } from "../../hooks/account";

const validationSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .required('Vui lòng nhập địa chỉ email hợp lệ.')
            .matches(emailRegExp, 'Vui lòng nhập địa chỉ email hợp lệ.'),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu đúng.')
            .min(6, 'Mật khẩu phải tối thiểu 6 ký tự.')
    });

const Login = React.memo(() => {
    const { login } = useAccount()
    const history = useHistory()

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
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async values => {
                        console.log(values)
                        login(values).then(res => {
                            console.log('res: ', res);
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
                    }) =>
                        <Form
                            className="login-form"
                            noValidate={true}
                            validated={submitCount > 0}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group>
                                <Form.Control
                                    name="email"
                                    placeholder="Email"
                                    required={true}
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="password"
                                    placeholder="Mật khẩu"
                                    required={true}
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <p className="text-right">
                            </p>
                            <button
                                className="btn btn-block"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                <>Đăng nhập</>
                            </button>
                        </Form>
                    }
                </Formik>
            </div>
        </div>
    </body>
})

export default Login