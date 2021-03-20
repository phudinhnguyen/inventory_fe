import React from 'react'

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean
}

const Button = React.memo((props: IButton) => {
    return <button
        className="btn btn-block"
        {...props}
    >
        <>Đăng nhập</>
        {props.loading && "loading..."}
    </button>
})

export default Button