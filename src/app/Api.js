import { auth, firestore } from './Firebase';

export default async function getShopsOfUser (uid) {
    const shops = await firestore.collection("users").doc(uid).collection("shops").get();
    return shops;
}

export default async function getOrders(shopId) {
    const orders = await firestore.collection("shops").doc(shopId).collection("orders").get();
    return orders;
}

export default async function getMenu (shopId) {
    const menu = await firestore.collection("shops").doc(shopId).collection("menu").get();
    return menu;
}

export default async function updateShop(shopId, name, description, backgroundColor) {
    await firestore.collection("shops").doc(shopId).update({
        name, 
        description, 
        backgroundColor
    })
}

export default async function addShop(name, description, backgroundColor) {
    await firestore.collection("shops").doc(shopId).set({
        name, 
        description, 
        backgroundColor
    })
}

export default async function getShop (shopId) {
    const shop = await firestore.collection("shops").doc(shopId).get();
    return shop;
}

export default async function addShopToUser (shopId, uid, shopName) {
    await firestore.collection("users").doc(uid).collection("shops").doc(shopId).set({shopName, shopId});
}

export default function createUniqueId() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export default function setLocalShop(shopId) {
    localStorage.setItem("shopId", shopId);
}

export default function getLocalShop() {
    const shopId = localStorage.getItem("shopId");
    return shopId;
}

          