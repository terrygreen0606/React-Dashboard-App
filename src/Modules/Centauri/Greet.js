import React, { Component } from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';

function Greet() {
    function clickHandler() {
        console.log('clicked')
    }
    return (
        <NavLink onClick={clickHandler}>
                  Application
                </NavLink>
        // <div>
        //     <button onClick={clickHandler}>Click</button>
        // </div>

    )
}
 
{/*

    /////// set state
class Greet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }
    }

    increement() {
        // this.setState(
        //     {
        //         count: this.state.count + 1
        //     },
        //     () => {
        //         console.log('callback value', this.state.count)
        //     }
        // )
        // console.log(this.state.count)
        
        this.setState((prevState, props) => ({
            count: prevState.count + 1
        })) 
        console.log(this.state.count)
    }

    increementFive() {
        this.increement()
        this.increement()
        this.increement()
        this.increement()
        this.increement()
    }

    render() {
        return (
            <div>
                <div>count - {this.state.count}</div>
                <button onClick={() => this.increementFive()}>increement</button>
            </div>

        )
    }
}

//////////////////////////////////////

// below set state method to change onClick
class Greet extends Component {
    constructor(){
        super()
        this.state = {
            message: 'Please Add First Name'
        }
    }


    changeMassage() {
        this.setState({
            message: 'Thanks for Click'
        })
    }

    render() {
        return(
            <div>
                <h5>{this.state.message}</h5>
                <button onClick={() => this.changeMassage()}>click to change</button>
            </div>
        ) 
    }
}
///////////////////////////////////////////

const Greet = props => {
    return <div>
        <h3>From {props.name} and {props.heroName}</h3>
        <h4>{props.children}</h4>
    </div>

}


class Greet extends Component {
    render(){
        return <h1> Welcome {this.props.name} a.k.a. {this.props.heroName}</h1>
    }
}




    return (
        <div><h5>Got It?</h5></div>
    )
}

class Greet extends Component {
    render() {
        return <h1>First Name</h1>
    }
}


//export const Greet = () => <h1>Arrow One</h1>*/}

export default Greet;
