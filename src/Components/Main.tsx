import Footer from "./Layout/Footer";
import Header from "./Layout/Header";

type Main = {
    children: React.ReactNode;
}

export default function Main (props : Main) {
    const userIsLogged = true;
    return (
        <div>
            <Header/>
            
                { userIsLogged === true ? 
                    props.children
                 : (
                    <p>Faça login para acessar o conteúdo</p>
                )}
            <Footer/>
        </div>
    )
}