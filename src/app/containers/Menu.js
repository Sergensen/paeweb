import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import API from '../Api';
import CategoryModal from '../components/menu/CategoryModal';
import Category from '../components/menu/Category';

export default class Menu extends Component {
    state = {
        categoryModal: false,
        categories: {},
        selectedCategory: false,
    }
    
    componentDidMount() {
        this.getMenu();
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
        return selectedCategory ? (
            <Category updateCategory={this.updateCategory.bind(this)} category={selectedCategory} resetCategory={this.resetCategory.bind(this)} />
        ) : (
            <Container>
                <Row>
                    <Link to="/">Zurück</Link>
                </Row>
                {Object.keys(categories).length === 0 && (<Row>
                    Deine Speisekarte ist noch Leer.
                </Row>)}
                <Row>
                    <Button onClick={() => this.toggleModal("categoryModal", true)}>Kategorie hinzufügen</Button>
                </Row>
                <Row>
                    {Object.keys(categories).map(key => (
                        <Button onClick={() => this.setCategory(key)} key={key}>{categories[key].name + " (" + categories[key].products + " Produkte)"}</Button>
                    ))}
                </Row>
                <CategoryModal addCategory={this.addCategory.bind(this)} modal={categoryModal} toggleModal={this.toggleModal.bind(this)} />
            </Container>
        );
    }   
}


const styles = {
    container: {
    },
}