import styles from "./Container.module.css"

type Main = {
    children: React.ReactNode;
}

export default function Container (props : Main) {
    return(
        <div className="main">
            {props.children}
        </div>
    )
}