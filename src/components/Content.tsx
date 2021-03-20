import '../styles/content.scss';
import { Header } from "./Header";
import { Main } from "./Main";

export function Content() {

  return (      
    <main>
        <div className="container">  
          <Header />
          <Main />
        </div>
    </main>
  )
}