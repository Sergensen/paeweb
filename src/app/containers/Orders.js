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

    getOrders() {
        const shopId = API.getLocalShop();
        if (shopId) {
            firestore.collection("shops").doc(shopId).collection("orders").onSnapshot(async snap => {
                let promises = [];

                if (!snap.empty) 
                    snap.forEach(doc => 
                        promises.push(API.getOrder(shopId, doc))
                    )
                const orders = await Promise.all(promises);
                this.setState({ orders })
            });
        } else {
            document.location = "/";
        }
    }

    async finishOrder(orderId) {
        const shopId = API.getLocalShop();
        if(shopId && window.confirm("Möchten Sie diese Bestellung wirklich annehmen?")) {
            await API.finishOrder(shopId, orderId)
        } else {
            document.location = "/";
        }
    }

    async cancelOrder(orderId) {
        const shopId = API.getLocalShop();
        if(shopId && window.confirm("Möchten Sie diese Bestellung wirklich ablehnen?")) {
            await API.cancelOrder(shopId, orderId)
        } else {
            document.location = "/";
        }
    }

    render() {
        const { user, orders } = this.state;
        console.log(orders)
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
                    <div style={styles.welcomeTextContainer}>
                        <div style={styles.welcomeText}>Live-Bestellungen</div>
                    </div>
                </div>

                <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
                    <div style={{ width: "65%", minWidth: 600, padding: 25, }}>
                        {/* <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5, backgroundColor: "white", borderRadius: 10, padding: 10 }}>Live-Bestellungen</div> */}
                        {(orders.length > 0) && orders.map(({ customer, aborted, accepted, items, id, table }) => (

                            <div key={customer + items + Math.random()} className="shopContainerHover" style={{ width: "100%", padding: "10px 5px 10px 5px", backgroundColor: "white", margin: "0 0 15px 0", borderRadius: 10, boxShadow: "0px 0px 5px 0px " + (accepted ? green : aborted ? red : ""), border: (aborted || accepted) ? "2px solid " + (accepted ? green : red) : "" }}
                            // onClick={() => this.setShop(shopId)}
                            >

                                <div style={{ fontSize: 18, marginLeft: 5, display: "flex", alignItems: "center" }}><MdAccountCircle color="grey" size={20} />{customer + (table && table > 0 ? " - Tisch " + table : " - Zum mitnehmen")}</div>

                                {(items && items.length > 0) && items.map(({ count, name, price, extraList }) => (

                                    <div key={name + price} style={{ margin: 5, borderWidth: "0 0 1px 0", borderStyle: "solid", borderColor: "lightgrey", }}>
                                        <div style={{ display: "flex", flex: 1, flexDirection: "row", alignItems: "center" }}>
                                            <div style={styles.imageContainer}>
                                                <img src={foodBg} style={styles.image} />
                                            </div> 
                                            <div>
                                            {count}x {name}

                                            <br />
                                            {extraList && (<b>Extras: </b>)}
                                            {(extraList && extraList[extraList.length-2] === ",") ? 
                                                extraList.substring(0, extraList.length - 2)
                                            : extraList}</div>

                                            <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>{(parseInt(count) * parseFloat(price)).toFixed(2)}€</div>
                                        </div>
                                        {/* <p style={styles.titleText}>{name}</p> */}
                                        {/* <p style={styles.adressText}>Beispielstraße 2</p> */}
                                        {/* <p style={styles.adressText}> 26131 Oldenburg</p> */}
                                    </div>

                                ))}

                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    {!(aborted || accepted) && <Button variant="outline-danger" onClick={() => this.cancelOrder(id)} style={{ margin: 5 }}><MdClose size={25} /> Ablehnen</Button>}
                                    {!(aborted || accepted) && <Button variant="outline-success" onClick={() => this.finishOrder(id)} style={{ margin: 5 }}><MdDone size={25} /> Annehmen</Button>}
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
        // backgroundColor: "orange",
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