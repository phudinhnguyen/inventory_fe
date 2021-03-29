import React from 'react'
import Loading from './Loading'

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean
    text?: string
}

const Button = React.memo((props: IButton) => {
    return <button
        className="btn btn-block d-flex justify-content-center align-items-center"
        {...props}
    >
        <>{props.text || 'Button'}</>
        <div className="mr-2"></div>
        {props.loading && <Loading />}
    </button>
})

export default Button