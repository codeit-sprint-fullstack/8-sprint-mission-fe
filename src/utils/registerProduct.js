import axios from 'axios';

async function registerProduct(productData) {
  try {
    const response = await axios.post(
      'https://pandamarket-db.onrender.com/products',
      productData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = registerProduct;