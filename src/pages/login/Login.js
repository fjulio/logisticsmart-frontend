import React from "react";
import '../../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from "universal-cookie/es6";

const baseUrl = "http://localhost:8080/api/auth";
const cookies = new Cookies();
class Login extends React.Component{

    state = {
        form:{
            username: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    login = async() =>{
        await axios.post(baseUrl+ "/signin", this.state.form)
        .then(response => {
          return response.data
        })
        .then(response =>{
            if(response != null){
                cookies.set('id', response.id, {path: "/"});
                cookies.set('username', response.username, {path: "/"});
                cookies.set('email', response.email, {path: "/"});
                cookies.set('roles', response.roles, {path: "/"});
                cookies.set('token', response.jwt, {path: "/"});
                window.location.href = "./equipment";
            }else{
                alert('El usuario o la contraseña no son cocrrectos');
            }
        })
        .catch(error=>{
            alert('El usuario o la contraseña no son cocrrectos');
            console.log(error);
        });
    }

    componentDidMount(){
        if(cookies.get('token')){
            window.location.href = "./menu";
        }
    }

    render(){
        return(
            <div className= "containerPrincipal">
                <div className= "containerSecundario">
                    <div className = "form-group">
                        <label>User:</label>
                        <br/>
                        <input type="text" 
                               className= "form-control"
                               name="username"
                               onChange={this.handleChange}
                        />
                        <br/>
                        <label>Password:</label>
                        <input 
                            type= "password"
                            className = "form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <button className="btn btn-primary" onClick={() => this.login()}>Login</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;