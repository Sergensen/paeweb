import React, { Component } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { auth, firestore } from '../Firebase';
import { Link } from "react-router-dom";
import ShopModal from '../components/dashboard/ShopModal';
import ShopNavigator from '../components/dashboard/ShopNavigator';
import API from '../Api';
import RestaurantLogo from '../res/restaurant-logo-example.jpg'
import PlusIcon from '../res/plus-128.png'
import CONST from '../Constants'
import { isMobile } from "react-device-detect";
import placeBg from '../res/pizza-background.jpg'
import { MdArrowBack } from 'react-icons/md'


export default class Dashboard extends Component {
    state = {
        shops: false,
        createShopModal: false,
        shopId: false
    }

    async signOut() {
        API.resetShop();
        API.resetCategory();
        await auth.signOut()
        document.location.href = "/login";
    }

    componentDidMount() {
        const shopId = API.getLocalShop();
        if (shopId) {
            this.setState({ shopId })
        }
    }

    async componentDidUpdate() {
        const { shops, shopId } = this.state;
        const { user } = this.props;

        if (user && user.uid && !shopId && !shops) {
            await this.loadShops();
        }
    }

    async loadShops() {
        const { user } = this.props;
        const shops = await API.getShopsOfUser(user.uid)
        this.setState({ shops });
    }

    setShop(shopId) {
        API.setLocalShop(shopId);
        this.setState({
            shopId,
            createShopModal: false
        });
    }

    async resetShop() {
        const { shops } = this.state;
        API.resetShop();
        API.resetCategory();
        this.setState({ shopId: false });
        await this.loadShops();
    }

    async deleteShop(shopId) {
        const { shops } = this.state;
        delete shops[shopId];

        if (shopId && window.confirm("Möchten Sie den Shop wirklich löschen?"))
            await API.deleteShop(shopId);

        this.setState({ shops })
    }


    toggleModal(type, value) {
        this.setState({ [type]: value })
    }

    async createShop(shop) {
        const { user } = this.props;
        if (user && shop) {
            const { name, description, backgroundColor } = shop;
            const shopId = API.createUniqueId();
            await API.addShopToUser(shopId, user.uid)
            await API.addShop(shopId, name, description, backgroundColor)
            this.setShop(shopId)
        }
    }

    render() {
        const { user } = this.props;
        const { shops, shopId, createShopModal } = this.state;
        return user ? (
            <div style={styles.main}>
                {/* <div style={styles.headerContainer}>
                    <div style={{ margin: 5 }}>
                        <Button disabled={!shopId} onClick={() => this.resetShop()} style={{ color: "white", flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}><MdArrowBack size={30} />Zurück</Button>
                    </div>
                    <div style={styles.welcomeTextContainer}>
                        <div style={styles.welcomeText}>Guten Tag {user.displayName + "!" || "!"}</div>
                    </div>
                    <div style={styles.signOutContainer}>
                        <Button onClick={() => this.signOut()}>
                            Ausloggen
                        </Button>
                    </div>
                </div> */}
                {/* <div style={{backgroundColor: "red", height: 100, width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
                    <img src={placeBg}></img>
                </div> */}

                {shopId ? (
                    <ShopNavigator shopId={shopId} resetShop={this.resetShop.bind(this)} />
                ) : (
                        <Card style={styles.container}>
                            {/* <div>
                                {shops ? "Wählen Sie den Store, den Sie bearbeiten möchten." : "Sie besitzen noch keinen Shop"}
                            </div> */}
                            <div style={styles.shopsContainer}>
                                {(shops.length > 0) && shops.map(({ name, shopId }) => (

                                    <div className="shopContainerHover" style={styles.aShopContainer} onClick={() => this.setShop(shopId)}>
                                        {/* <Row key={shopId}> */}
                                        <div style={styles.imageContainer}>
                                            <img src={RestaurantLogo} style={styles.image} />
                                        </div>

                                        <div style={styles.textContainer}>
                                            <p style={styles.titleText}>{name}</p>
                                            <p style={styles.adressText}>Beispielstraße 2</p>
                                            <p style={styles.adressText}> 26131 Oldenburg</p>
                                        </div>
                                        {/* Löschen Button nicht da wo man Shop auswählt, weil das etwas ist, was man nur sehr selten macht. */}
                                        {/* <Button onClick={() => this.deleteShop(shopId)}>Löschen</Button> */}
                                        {/* </Row> */}
                                    </div>


                                ))}

                                <div className="shopContainerHover" style={gridElement} onClick={() => this.toggleModal("createShopModal", true)}>
                                    <div style={styles.imageContainer}>
                                        <img src={PlusIcon} style={styles.plusImage} />
                                    </div>
                                    <p style={styles.addNewText}>Neuen Shop erstellen</p>
                                    <ShopModal createShop={this.createShop.bind(this)} modal={createShopModal} toggleModal={this.toggleModal.bind(this)} />
                                </div>
                            </div>
                        </Card>
                    )}
            </div>
        ) : <div />;
    }
}

const gridElement = {
    minWidth: 250,
    width: 250,
    height: 250,
    border: "1px solid lightgrey",
    cursor: "pointer",
    padding: 5,
    margin: 5,

}

const styles = {
    main: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundColor: "green"
    },
    container: {
        margin: isMobile ? 15 : "20px 50px 20px 50px",
        maxWidth: 1080,
    },
    headerContainer: {
        // backgroundColor: "orange",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // height: 150,
        width: "100%",
        boxShadow: "0 1px 5px 0px orange"
    },
    signOutContainer: {
        // display: "flex",
        // flex: 1,
        margin: 5,
    },
    welcomeTextContainer: {
        display: "flex",
        flex: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    shopsContainer: {
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
        flexShrink: 1,
        margin: "10px 0 10px 0",
    },
    aShopContainer: {
        ...gridElement,
    },
    imageContainer: {
        width: "100%",
        height: 150,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "undefined",
    },
    plusImage: {
        width: "30%",
        height: "undefined",
    },
    textContainer: {
        width: "100%",
        height: "100%",
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 17,
        margin: 5
    },
    adressText: {
        fontSize: 15,
        margin: "1px 5px 1px 5px",
        color: CONST.COLORS.subtext
    },
    addNewText: {
        textAlign: "center",
        textAlignVertical: "center",
    }
}

