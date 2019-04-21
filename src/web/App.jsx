import React, { Component } from "react";
import routes from "./routes";
import { Link } from "react-router-dom";
class App extends Component{
    render(){
        return (
            <div>
                <div>{routes}</div>
                <Link to="/componentdemo">普通组件</Link>
                <Link to="/storeDemo">store</Link>
            </div>
        );
    }
}

export default App;