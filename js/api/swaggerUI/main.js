import {getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import {getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';


////////////////////////// ArticleService //////////////////////////
export function testGetArticleList(page, pageSize, keyword) {
  getArticleList({ page, pageSize, keyword })
    .then((data) => { console.log(data); })
    .catch((e) => { 
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testGetArticle(id) {
  getArticle(id)
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testPatchArticle(id, title, content, image) {
  patchArticle(id, {
    title: title,
    content: content,
    image: image,
  })
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testCreateArticle(title, content, image) {
  createArticle({
    title: title,
    content: content,
    image: image,
  })
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testDeleteArticle(id) {
  deleteArticle(id)
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

window.testGetArticleList = testGetArticleList;
window.testGetArticle = testGetArticle;
window.testCreateArticle = testCreateArticle;
window.testPatchArticle = testPatchArticle;
window.testDeleteArticle = testDeleteArticle;

////////////////////////// ProductService //////////////////////////
export function testGetProductList(page, pageSize, keyword) {
  getProductList({ page, pageSize, keyword })
    .then((data) => { console.log(data); })
    .catch((e) => { 
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testGetProduct(id) {
  getProduct(id)
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testPatchProduct(id, name, description, tags, price, images) {
  patchProduct(id, {
    name: name,
    description: description,
    tags: tags,
    price: price,
    images: images,
  })
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testCreateProduct(name, description, tags, price, images) {
  createProduct({
    name: name,
    description: description,
    tags: tags,
    price: price,
    images: images,
  })
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

export function testDeleteProduct(id) {
  deleteProduct(id)
    .then((data) => { console.log(data); })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      }
    });
}

window.testGetProductList = testGetProductList;
window.testGetProduct = testGetProduct;
window.testCreateProduct = testCreateProduct;
window.testPatchProduct = testPatchProduct;
window.testDeleteProduct = testDeleteProduct;