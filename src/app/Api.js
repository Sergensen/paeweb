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


function setLocalCategory(categoryId) {
    localStorage.setItem("categoryId", categoryId);
}

function resetCategory() {
    localStorage.setItem("categoryId", "");
}

function getLocalCategory() {
    const categoryId = localStorage.getItem("categoryId");
    return categoryId;
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

async function getMenu(shopId) {
    const snap = await firestore.collection("shops").doc(shopId).collection("menu").get();
    let categories = {}

    snap.forEach(async doc => {
        const category = doc.data();
        categories[doc.id] = category;
    })

    return categories;
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
 
async function addCategory(shopId, name, description) {
    const key = name.toLowerCase();
    await firestore.collection("shops").doc(shopId).collection("menu").doc(key).set({
        name, 
        description, 
        products: 0
    })
}

async function getCategory(shopId, categoryId) {
    const doc = await firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).get();
    let category = {
        data: doc.data()
    }

    const snap = await firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("products").get();
    let products = {}
    snap.forEach(async doc => {
        const product = doc.data();
        products[doc.id] = product;
    })
    category.products = products;

    return category;
}

async function updateCategory(shopId, categoryId, name, description) {
    await firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).update({
        name, 
        description, 
    })
}

async function addProduct(shopId, categoryId, name, description, price, extras) {
    let promises = [];
    promises.push(firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("products").doc(name.toLowerCase()).set({
        name, 
        description,
        price, 
    }))

    promises.push(addExtrasToProduct(shopId, categoryId, name.toLowerCase(), extras));

    await Promise.all(promises)
}

async function getExtrasOfCategory(shopId, categoryId) {
    const snap = firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("extras").get();
    let extras = {}

    snap.forEach(async doc => {
        const extra = doc.data();
        extras.push(extra)
    })

    return extras;
}

async function getExtrasOfProduct(shopId, categoryId, productId) {
    const snap = firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("products").doc(productId).collection("extras").get();
    let extras = []

    snap.forEach(async doc => {
        const extra = doc.data();
        extras.push(extra)
    })

    return extras;
}

async function addExtrasToProduct(shopId, categoryId, productId, extras) {
    let promises = [mapExtrasToCategory(shopId, categoryId, extras)];
    
    extras.forEach(extra => promises.push(
        firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("products").doc(productId).collection("extras").doc(extra.name.toLowerCase()).set({
            name: extra.name, 
            price: extra.price, 
        })
    ))

    await Promise.all(promises);
}

async function mapExtrasToCategory(shopId, categoryId, extras) {
    let promises = [];
    extras.forEach(extra => promises.push(
        firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("extras").doc(extra.name.toLowerCase()).set({
            name: extra.name, 
            price: extra.price, 
        })
    ))

    await Promise.all(promises);
}

function deleteProduct(shopId, categoryId, productId) {
    //Todo
    return new Promise((resolve, reject) => {
        resolve();
    })
}


export default {
    getExtrasOfCategory,
    getExtrasOfProduct,
    deleteProduct,
    updateCategory,
    getShopsOfUser,
    addProduct,
    getCategory,
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
    getLocalShop,
    setLocalCategory,
    resetCategory,
    getLocalCategory,
    addCategory
}
          