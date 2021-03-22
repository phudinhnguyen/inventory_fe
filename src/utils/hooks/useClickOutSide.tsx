import { useEffect } from "react"

const useClickOutside = (onClickOutside: Function, listRef: Array<any>) => {
    useEffect(() => {
        document.addEventListener('mousedown', clickOutside)
        document.addEventListener('touchstart', clickOutside)

        return () => {
            document.removeEventListener('mousedown', clickOutside)
            document.removeEventListener('touchstart', clickOutside)
        }
    }, [ listRef ])

    const clickOutside = (event: any) => {
        const idOutSide = listRef.every(ref => !ref.current.contains(event.target))
        if (idOutSide) {
            onClickOutside(event)
        }
    }

}

export default useClickOutside