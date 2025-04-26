import Footer from "./Layout/Footer";
import Header from "./Layout/Header";

type Main = {
    children: React.ReactNode;
    userPic: string;
}

export default function Main (props : Main) {
    return (
        <div>
            <Header userPic={props.userPic}/>
                {props.children}
            <Footer/>
        </div>
    )
}