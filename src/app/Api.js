import { auth, firestore } from './Firebase';

async function getShopsOfUser (uid) {
    const snap = await firestore.collection("users").doc(uid).collection("shops").get();
    let promises = [];

    snap.forEach(async doc => {
        const { shopId } = doc.data();
        promises.push(getShop(shopId));
    })
    
    const shops = await Promise.all(promises);
    return shops;
}

async function getOrders(shopId) {
    const document = await firestore.collection("shops").doc(shopId).collection("orders").get();
    if(document.exists) {
        const orders = document.data();
        return orders;
    } else {
        return null;
    }
}

async function getMenu (shopId) {
    const document = await firestore.collection("shops").doc(shopId).collection("menu").get();
    if(document.exists) {
        const menu = document.data();
        return menu;
    } else {
        return null;
    }
}

async function updateShop(shopId, name, description, backgroundColor) {
    await firestore.collection("shops").doc(shopId).update({
        name, 
        description, 
        backgroundColor
    })
}

async function addShop(shopId, name, description, backgroundColor) {
    await firestore.collection("shops").doc(shopId).set({
        name, 
        description, 
        shopId,
        backgroundColor
    })
}

async function getShop (shopId) {
    const document = await firestore.collection("shops").doc(shopId).get();
    if(document.exists) {
        const shop = document.data();
        return shop;
    } else {
        return null;
    }
}

async function addShopToUser (shopId, uid) {
    await firestore.collection("users").doc(uid).collection("shops").doc(shopId).set({shopId});
}

function createUniqueId() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function setLocalShop(shopId) {
    localStorage.setItem("shopId", shopId);
}

function resetShop() {
    localStorage.setItem("shopId", "");
}

function getLocalShop() {
    const shopId = localStorage.getItem("shopId");
    return shopId;
}

async function getOpeningHours(shopId) {
    const snap = await firestore.collection("shops").doc(shopId).collection("openingHours").get();
    let openingHours = {}

    snap.forEach(async doc => {
        const day = doc.data();
        openingHours[doc.id] = day;
    })

    return openingHours;
}

async function saveOpeningHours(shopId, openingHours) {
    let promises = [];

    for (let key in openingHours) {
        promises.push(
            firestore
                .collection("shops")
                .doc(shopId)
                .collection("openingHours")
                .doc(key)
                .set(openingHours[key])
        )
    }

    await Promise.all(promises);
}

export default {
    getShopsOfUser,
    getOpeningHours,
    getOrders,
    getMenu, 
    updateShop,
    saveOpeningHours,
    addShop,
    addShopToUser, 
    getShop, 
    createUniqueId, 
    setLocalShop, 
    resetShop, 
    getLocalShop
}
          