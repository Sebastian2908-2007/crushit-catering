/**import dexie to easily use indexedDb*/
import Dexie from 'dexie';

const clientDatabase =  new Dexie('crushitCatering');
clientDatabase.version(1).stores({
    meals: '_id,main,drink,price,image,purchaseQuantity',
    cart: '_id,main,side,drink,price,image,purchaseQuantity,total'
});

export default clientDatabase;