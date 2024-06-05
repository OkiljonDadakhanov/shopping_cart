import productImage1 from './assets/italy_pizza.png'
import productImage2 from './assets/combo.png'
import productImage3 from './assets/spanish_rice.png'

const dbName = 'ShoppingCart';
const dbVersion = 1;
const storeName = 'cartItems';

const sampleData = [
  {
    id: 1,
    name: 'Italy Pizza',
    description: 'Extra cheese and topping',
    price: 681,
    image: productImage1,
  },
  {
    id: 2,
    name: 'Combo Plate',
    description: 'Extra cheese and topping',
    price: 681,
    image: productImage2,
  },
  {
    id: 3,
    name: 'Spanish Rice',
    description: 'Extra garlic',
    price: 681,
    image: productImage3,
  },
];

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        sampleData.forEach(item => objectStore.add(item));
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getCartItems = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const addOrder = async (order) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['orders'], 'readwrite');
    const store = transaction.objectStore('orders');
    const request = store.add(order);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const calculateTotal = (items) => {
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shipping = 4;
  const total = subtotal + shipping;
  return { subtotal, total };
};
