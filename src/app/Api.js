import { auth, firestore } from './Firebase';

async function getShopsOfUser (uid) {
    const snap = await firestore.collection("users").doc(uid).collection("shops").get();
    let shops = [];
    snap.forEach(doc => shops.push(doc.data()));
    return shops;
}

async function getOrders(shopId) {
    const orders = await firestore.collection("shops").doc(shopId).collection("orders").get();
    return orders;
}

async function getMenu (shopId) {
    const menu = await firestore.collection("shops").doc(shopId).collection("menu").get();
    return menu;
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
        backgroundColor
    })
}

async function getShop (shopId) {
    const shop = await firestore.collection("shops").doc(shopId).get();
    return shop;
}

async function addShopToUser (shopId, uid, shopName) {
    await firestore.collection("users").doc(uid).collection("shops").doc(shopId).set({shopName, shopId});
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

export default {
    getShopsOfUser,
    getOrders,
    getMenu, 
    updateShop,
    addShop,
    addShopToUser, 
    getShop, 
    createUniqueId, 
    setLocalShop, 
    resetShop, 
    getLocalShop
}
          