import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import API from '../Api';
import CategoryModal from '../components/menu/CategoryModal';
import Categories from '../components/menu/Categories';
import { isMobile } from "react-device-detect";
import CategoryImage from '../res/pizza-background.jpg'
import PlusIcon from '../res/plus-128.png'
// import { ICON_NAME } from 'react-icons/md';
import { MdArrowBack, MdDelete } from 'react-icons/md'

export default class Menu extends Component {
    state = {
        categoryModal: false,
        categories: false,
        selectedCategory: false,
    }

    componentDidMount() {
        this.getCategory();
    }

    async getMenu() {
        const shopId = API.getLocalShop();
        if (shopId) {
            const categories = await API.getMenu(shopId);
            this.setState({ shopId, categories })
        }
    }

    toggleModal(type, value) {
        this.setState({
            [type]: value
        })
    }

    async getCategory() {
        const categoryId = API.getLocalCategory();
        const shopId = API.getLocalShop();
        if (categoryId && shopId) {
            const selectedCategory = await API.getCategory(shopId, categoryId);
            this.setState({ selectedCategory })
        } else if (shopId) {
            this.getMenu();
        } else {
            document.location = "/";
        }
    }


    async setCategory(selectedCategory) {
        API.setLocalCategory(selectedCategory);
        this.setState({
            createCategoryModal: false
        });

        await this.getCategory();
    }

    async resetCategory() {
        const { selectedCategory, categories } = this.state;
        API.resetCategory();
        this.setState({ selectedCategory: false });
        await this.getMenu();
    }

    async deleteCategory(categoryId) {
        const shopId = API.getLocalShop();
        const { categories } = this.state;
        delete categories[categoryId];

        if (categoryId && shopId && window.confirm("Möchten Sie die Kategorie wirklich löschen?"))
            await API.deleteCategory(shopId, categoryId);

        this.setState({ categories })
    }

    async addCategory(name, description) {
        const shopId = API.getLocalShop();
        if (shopId) {
            const { categories } = this.state;
            await API.addCategory(shopId, name, description);
            this.toggleModal("categoryModal", false)
            window.location.reload();
        }
    }

    async updateCategory(name, description) {
        const shopId = API.getLocalShop();
        const categoryId = API.getLocalCategory();
        if (categoryId && shopId) {
            await API.updateCategory(shopId, categoryId, name, description);
        }
    }

    render() {
        const { categoryModal, categories, selectedCategory } = this.state;
        if (selectedCategory) {
            return <Categories updateCategory={this.updateCategory.bind(this)} category={selectedCategory} resetCategory={this.resetCategory.bind(this)} />
        } else if (categories) {
            return (
                <Card>
                    <div style={styles.menuContainer}>
                        
                        <div style={styles.categoriesContainer}>
                            {Object.keys(categories).map(key => (
                                <div key={key} style={styles.aCategory} className="shopContainerHover" onClick={() => this.setCategory(key)}>
                                    <div style={styles.imageContainer}>
                                        <img src={CategoryImage} style={styles.image} />
                                    </div>
                                    <div style={styles.titleText}>{categories[key].name}</div>
                                    {/* onMouseDown needed because of nested click events */}
                                    {/* <div style={styles.deleteButtonContainer}> */}
                                    <Button style={styles.deleteButton} onMouseDown={() => this.deleteCategory(key)}><MdDelete size={20} /></Button>

                                    {/* </div> */}
                                </div>
                            ))}
                            <div className="shopContainerHover" style={styles.aCategory} onClick={() => this.toggleModal("categoryModal", true)}>
                                <div style={styles.imageContainer}>
                                    <img src={PlusIcon} style={styles.plusImage} />
                                </div>
                                {Object.keys(categories).length === 0 && (
                                    <p style={styles.addNewText}>
                                        Deine Speisekarte ist noch leer.
                                    </p>)
                                }
                                <p style={styles.addNewText}>Kategorie hinzufügen</p>
                            </div>
                        </div>


                    </div>


                    <CategoryModal addCategory={this.addCategory.bind(this)} modal={categoryModal} toggleModal={this.toggleModal.bind(this)} />
                </Card>)
        } else {
            return (
                <div />
            )
        }
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
        // height: 150,
        width: "100%",
        // boxShadow: "0 1px 5px 0px orange"
    },
    welcomeTextContainer: {
        display: "flex",
        flex: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    menuContainer: {
        margin: isMobile ? 15 : "20px 30px 20px 30px",
        // flexDirection: "column",
        display: "flex",
    },
    categoriesContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    aCategory: {
        minWidth: 250,
        width: 250,
        height: 250,
        border: "1px solid lightgrey",
        cursor: "pointer",
        padding: 5,
        margin: 5,
        position: "relative"
    },
    selectedContainer: {
        display: "flex",
        flex: 3,
        backgroundColor: "blue",
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
    addNewText: {
        textAlign: "center",
        textAlignVertical: "center",
    },
    titleText: {
        // fontWeight: "bold",
        fontSize: 17,
        margin: 5
    },
    deleteButtonContainer: {
        // width: "100%",
        // height: "100%",
        backgroundColor: "red"
    },
    deleteButton: {
        position: "absolute",
        // position: "relative",
        bottom: 5,
        right: 5,
        fontSize: 0,
    },
}