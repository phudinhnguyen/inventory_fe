import React from "react"

const Login = React.memo(() => {
    return <body className="login bg-blue">
        <div id="main">
            <div className="logo-wrap d-flex justify-content-center">
                <a href="index.html" title="Medigo" className="logo">
                    <img src="./images/logo.png" title="Medigo" className="img-fluid" width={140} />
                </a>
            </div>
            <div className="form-wrap">
                <h1 className="text-center mb-5">MEDIGO ADMIN</h1>
                <form className="login-form" noValidate>
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Tên Đăng Nhập" required />
                        <div className="invalid-feedback">Vui lòng nhập địa chỉ email hợp lệ.</div>
                    </div>
                    <div className="form-group mb-5">
                        <input type="password" className="form-control" id="loginPassword" placeholder="Mật Khẩu" required />
                        <div className="invalid-feedback">Vui lòng nhập mật khẩu đúng.</div>
                    </div>
                    <button type="submit" className="btn btn-block">Đăng nhập</button>
                </form>
            </div>
        </div>
    </body>
})

export default Login