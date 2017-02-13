import * as React from "react";
import * as ReactDOM from "react-dom";
import { Greeter } from "./greeter";
class App extends React.Component<any, any> {
    render () {
    
        return <div>
            <Greeter /> 
        </div>;

    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
