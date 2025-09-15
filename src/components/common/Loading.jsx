import style from "../../styles/Loading.module.css";



const Loading = () => {

    return (
        <div className={style.loaderwrper}>
            <div className={style.loader}></div>
        </div>
    )
}


export default Loading;