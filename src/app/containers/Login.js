import React, { Component } from 'react';
import FormElement from "../components/login/FormElement";
import LoginContainer from '../components/login/LoginContainer';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { googleProvider, auth } from '../Firebase';
import placeBg from '../res/pizza-background.jpg'
import CONST from '../Constants'


const data = {
    signin: {
        inputs: {
            mail: {
                name: "E-Mail",
                controlId: "formBasicEmail",
                placeholder: "Email",
                type: "email",
            },
            password: {
                name: "Passwort",
                controlId: "formBasicPassword",
                placeholder: "Passwort",
                type: "password",
            }
        },
        google: "Login mit Google",
        method: "Login",
    },
    signup: {
        inputs: {
            mail: {
                name: "E-Mail",
                controlId: "formBasicEmail",
                type: "email",
                placeholder: "Email"
            },
            password: {
                name: "Passwort",
                controlId: "formBasicPassword",
                type: "password",
                placeholder: "Passwort"
            }
        },
        google: "Registrieren mit Google",
        method: "Registrieren",
    }
}

export default class Login extends Component {
    state = {
        key: Object.keys(data)[0]
    }

    async loginWithGoogle() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            const token = result.credential.accessToken;
            const user = result.user;

            if (!user) alert("Bitte erneut versuchen!");
        } catch (error) {
            alert("Bitte erneut versuchen!");
        }
    }

    signInUpWithEmail(email, password) {
        const { key } = this.state;
        if (key === "signup") {
            auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                alert("Ungültige Daten. Bitte erneut versuchen.");
            });
        } else {
            auth.signInWithEmailAndPassword(email, password).catch(function (error) {
                alert("User existiert nicht oder Login Daten sind falsch.");
            });
        }
    }

    setKey(key) {
        this.setState({ key });
    }

    render() {
        const { key } = this.state;
        return (
            <div style={styles.container}>
                <div style={styles.headerContainer}>
                    <img style={styles.image} src={require("../res/images/pae1.png")} />
                </div>
                <LoginContainer          
                    tabKey={key}
                    setKey={this.setKey.bind(this)}
                    data={data}
                    signInUpWithEmail={this.signInUpWithEmail.bind(this)}
                    loginWithGoogle={this.loginWithGoogle.bind(this)}
                />
            </div>

        );
    }
}

const styles = {
    container: {
        // width: "100%",
        display: "flex",
        // flexDirection: "column",
        // backgroundColor: "red",
        // width: "100%",
        // height: "100%"
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundImage: `url(${placeBg})`,
        width: "100vw",
        height: "100vh",
        // borderRadius: 20,
        //justifyContent: "center",
        // width: 500,
        // height: 500
    },
    headerContainer:{
        position: "fixed",
        // backgroundColor: "rgba(255, 255, 255, 0.25)",        
        // top: 0,
        // left: 0,
        // width: "100%",
        // height: 100,
        // borderRadius: "0 0 20px 20px",        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // boxShadow: "0 25px 25px -2px rgba(255, 255, 255, 0.2)"
    },
    image: {
        // height: "90%"
        height: 80,
        marginTop: 25
    }

}
