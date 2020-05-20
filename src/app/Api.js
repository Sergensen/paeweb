import { auth, firestore } from './Firebase';

async function getShopsOfUser (uid) {
    const snap = await firestore.collection("users").doc(uid).collection("shops").get();
    let promises = [];

    if (!snap.empty) {
        snap.forEach(async doc => {
            const { shopId } = doc.data();
            promises.push(getShop(shopId));
        })
    }

    const shops = await Promise.all(promises);
    return shops;
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

    if (!snap.empty) {
        snap.forEach(async doc => {
            const day = doc.data();
            openingHours[doc.id] = day;
        })
    }
    

    return openingHours;
}

async function getMenu(shopId) {
    const snap = await firestore.collection("shops").doc(shopId).collection("menu").get();
    let categories = {}

    if (!snap.empty) {
        snap.forEach(async doc => {
            const category = doc.data();
            categories[doc.id] = category;
        })
    }
    
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
    
    if (!snap.empty) {
        snap.forEach(async doc => {
            const product = doc.data();
            products[doc.id] = product;
        })
    }
    
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

async function getExtrasOfProduct(shopId, categoryId, productId) {
    const snap = await firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("products").doc(productId).collection("extras").get();
    let extras = []

    if (!snap.empty) {
        snap.forEach(doc => {
            const extra = doc.data();
            extras.push(extra)
        })
    }
    return extras;
}

async function addExtrasToProduct(shopId, categoryId, productId, extras) {
    let promises = [];
    
    extras.forEach(extra => promises.push(
        firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("products").doc(productId).collection("extras").doc(extra.name.toLowerCase()).set({
            name: extra.name, 
            price: extra.price, 
        })
    ))

    await Promise.all(promises);
}

async function deleteProduct(shopId, categoryId, productId) {
    await firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).collection("products").doc(productId).delete();
}


async function deleteCategory(shopId, categoryId) {
    await firestore.collection("shops").doc(shopId).collection("menu").doc(categoryId).delete();
}


async function deleteShop(shopId) {
    await firestore.collection("shops").doc(shopId).delete();
}

async function getOrders(shopId) {
    const snap = await firestore.collection("shops").doc(shopId).collection("orders").get();
    let promises = [];

    if (!snap.empty) {
        snap.forEach(doc => {
            promises.push(getOrder(shopId, doc));
        })
    }
    const orders = await Promise.all(promises);

    return orders;
}
 
async function getOrder(shopId, orderDoc) {
    let order = orderDoc.data();
    order.id = orderDoc.id;

    const snap = await firestore.collection('shops').doc(shopId).collection("orders").doc(orderDoc.id).collection("items").get();
    order.items = [];

    if (!snap.empty)
        snap.forEach(doc =>  order.items.push(doc.data()));
       
    return(order);
}

async function cancelOrder(shopId, orderId) {
    await firestore.collection("shops").doc(shopId).collection("orders").doc(orderId).update({
        aborted: true
    })
}

async function finishOrder(shopId, orderId) {
    await firestore.collection("shops").doc(shopId).collection("orders").doc(orderId).update({
        accepted: true
    })
}

export default {
    getExtrasOfProduct,
    cancelOrder,
    finishOrder,
    deleteProduct,
    deleteCategory,
    deleteShop,
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
          