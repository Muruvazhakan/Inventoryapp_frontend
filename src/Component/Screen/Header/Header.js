import React from "react";


import './Header.css';
const Header = (props) =>{

    const print = ()=>{
        window.print();
    }
    return <div className="header">
        <main>
        <header className="header-title">
            <h2 >
            {props.name}
            </h2>
       
            </header>
       
        </main>
    </div>
}

export default Header;