import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import API from '../Api';
import CategoryModal from '../components/menu/CategoryModal';
import Categories from '../components/menu/Categories';

export default class Menu extends Component {
    state = {
        categoryModal: false,
        categories: false,
        selectedCategory: false,
    }
    
    componentDidMount() {
        this.getCategory();
    }

    async getMenu () {
        const shopId = API.getLocalShop();
        if(shopId) {
            const categories = await API.getMenu(shopId);
            this.setState({shopId, categories})
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
        if(categoryId && shopId) {
            const selectedCategory = await API.getCategory(shopId, categoryId);
            this.setState({selectedCategory})
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
        this.setState({selectedCategory: false});
        await this.getMenu(); 
    }

    async deleteCategory(categoryId) {
        const shopId = API.getLocalShop();
        const { categories } = this.state;
        delete categories[categoryId];

        if(categoryId && shopId && window.confirm("Möchten Sie die Kategorie wirklich löschen?"))
            await API.deleteCategory(shopId, categoryId);

        this.setState({categories})
    }

    async addCategory(name, description) {
        const shopId = API.getLocalShop();
        if(shopId) {
            const { categories } = this.state;
            await API.addCategory(shopId, name, description);
            this.toggleModal("categoryModal", false)
            window.location.reload();
        }
    }

    async updateCategory(name, description) {
        const shopId = API.getLocalShop();
        const categoryId = API.getLocalCategory();
        if(categoryId && shopId) {
            await API.updateCategory(shopId, categoryId, name, description);
        }
    }

    render() {
        const { categoryModal, categories, selectedCategory } = this.state;
        if(selectedCategory) {
            return <Categories updateCategory={this.updateCategory.bind(this)} category={selectedCategory} resetCategory={this.resetCategory.bind(this)} />
        } else if (categories) {
            return (<Container>
                <Row>
                    <Link to="/">Zurück</Link>
                </Row>
                {Object.keys(categories).length === 0 && (<Row>
                    Deine Speisekarte ist noch leer.
                </Row>)}
                <Row>
                    <Button onClick={() => this.toggleModal("categoryModal", true)}>Kategorie hinzufügen</Button>
                </Row>
                    {Object.keys(categories).map(key => (
                        <Row key={key}>
                            <Button onClick={() => this.setCategory(key)}>{categories[key].name}</Button>
                            <Button onClick={() => this.deleteCategory(key)}>Löschen</Button>
                        </Row>
                    ))}
                <CategoryModal addCategory={this.addCategory.bind(this)} modal={categoryModal} toggleModal={this.toggleModal.bind(this)} />
            </Container>)
        } else {
            return <div />
        }
    }   
}


const styles = {
    container: {
    },
}