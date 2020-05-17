import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { firestore } from '../Firebase';
import API from '../Api';
import { MdArrowBack, MdAccountCircle, MdDone, MdClose } from 'react-icons/md'
import foodBg from '../res/pizza-background.jpg'

export default class Info extends Component {
    state = {
        orders: [],
    }

    componentDidMount() {
        this.getOrders();
    }

    async getOrders() {
        const shopId = API.getLocalShop();
        if (shopId) {
            const orders = await API.getOrders(shopId);
            this.setState({ orders })
        } else {
            document.location = "/";
        }
    }

    orderFinished(customer) {
        const { orders } = this.state;
        // orders[]
    }

    render() {
        const { user, orders } = this.state;
        console.log(orders);
        const red = "rgba(255,0,0,0.4)";
        const orange = "rgba(255, 165, 0,0.4)";
        const green = "rgba(0,255,0,0.3)";
        // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 
        return (
            <div>
                <div style={styles.headerContainer}>
                    {/* <div style={{ left: 0, top: 0, color: "white", fontWeight: "bold", fontSize: 25, margin: 5, position: "absolute" }}>
                            PaeLogo
                        </div> */}
                    <div style={{ margin: 5, position: "absolute", left: 0, top: 0, }}>
                        <Button><Link to="/" style={{ color: "white", flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}><MdArrowBack size={30} /> Zurück</Link></Button>
                    </div>
                    <div style={styles.welcomeTextContainer}>
                        <div style={styles.welcomeText}>Live-Bestellungen</div>
                    </div>
                </div>

                <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
                    <div style={{ width: "65%", minWidth: 600, padding: 25, }}>
                        {/* <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5, backgroundColor: "white", borderRadius: 10, padding: 10 }}>Live-Bestellungen</div> */}
                        {(orders.length > 0) && orders.map(({ customer, aborted, accepted, items }) => (

                            <div key={customer + items} className="shopContainerHover" style={{ width: "100%", padding: "10px 5px 10px 5px", backgroundColor: "white", margin: "0 0 15px 0", borderRadius: 10, boxShadow: "0px 0px 5px 0px " + (accepted ? green : aborted ? red : orange), border: "1px solid" + (accepted ? green : aborted ? red : orange) }}
                            // onClick={() => this.setShop(shopId)}
                            >

                                <div style={{ fontSize: 18, marginLeft: 5, display: "flex", alignItems: "center" }}><MdAccountCircle color="grey" size={20} />{customer}</div>

                                {(items.length > 0) && items.map(({ count, name, price }) => (

                                    <div key={name + price} style={{ margin: 5, borderWidth: "0 0 1px 0", borderStyle: "solid", borderColor: "lightgrey", }}>
                                        <div style={{ display: "flex", flex: 1, flexDirection: "row", alignItems: "center" }}>
                                            <div style={styles.imageContainer}>
                                                <img src={foodBg} style={styles.image} />
                                            </div>
                                            <div>{count}x {name}</div>
                                            <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>{price.toFixed(2)}€</div>
                                        </div>
                                        {/* <p style={styles.titleText}>{name}</p> */}
                                        {/* <p style={styles.adressText}>Beispielstraße 2</p> */}
                                        {/* <p style={styles.adressText}> 26131 Oldenburg</p> */}
                                    </div>

                                ))}

                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Button variant="danger" style={{ margin: 5 }}><MdClose size={25} /> Abbrechen</Button>
                                    <Button variant="success" onClick={() => this.orderFinished(customer)} style={{ margin: 5 }}><MdDone size={25} /> Fertig</Button>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        );
    }
}

const styles = {
    container: {
    },
    headerContainer: {
        backgroundColor: "orange",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // height: 50,
        position: "relative"
    },
    welcomeTextContainer: {
        display: "flex",
        flex: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    imageContainer: {
        width: 60,
        height: 60,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        // borderRadius: 20,
        // backgroundColor: "red"
    },
    image: {
        width: "100%",
        height: "undefined",
    },
}