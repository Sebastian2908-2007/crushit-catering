// import create context from react this will allow us to create and use our global store
import React, { createContext, useContext } from "react";
// our reducer funtion from reducers.js
import { useProductReducer } from "./reducers";
//instantiate the global state object:
const StoreContext = createContext();
// destructure provider out of createContext
const { Provider } = StoreContext;

// custom provider function that will be used to manage and update our state using the reducer we created
// The value prop is good to have included, as it opens us up to pass in more data for state if we need to.
// prop, or rather ...props, is in place to handle any other props the user may need. Namely, we'll need to use props.children, as this <StoreProvider> component will wrap all of our other components, making them children of it.
// If we didn't include {...props} in our returning <Provider> component, nothing on the page would be rendered!
const StoreProvider = ({ value=[], ...props }) => {
    const [state, dispatch] = useProductReducer({
        meals: [
            {
          _id: 1,
          main:"super Burrito",
          side:"beans rice",
          drink:"",
          price:5.77,
          image:'/super-burrito.png'
            },
            {
          _id: 2,
          main:"Tacos al Pastor",
          side:"beans rice",
          drink:"",
          price:7.99,
          image:'/Tacos-al-Pastor.png'
            },
            {
          _id: 3,
          main:"4 Tamales",
          side:"beans rice",
          drink:"",
          price:6.33,
          image:'/4-Tamales.png'
            },
            {
          _id: 4,
          main:"2 Tortas",
          side:"beans rice",
          drink:"",
          price:4.99,
          image:'/2-Tortas.png'
            },
            {
          _id: 5,
          main:"Chilaquiles",
          side:"beans rice",
          drink:"",
          price:6.99,
          image:'/Chilaquiles.png'
            },
            {
          _id: 6,
          main:"Huevos Rancheros",
          side:"beans rice",
          drink:"",
          price:11.99,
          image:'/Huevos-Rancheros.png'
            },
            {
          _id: 7,
          main:"2 Quesadillas",
          side:"beans rice",
          drink:"",
          price:8.99,
          image:'/2-Quesadillas.png'
            },
            {
          _id: 8,
          main:"Pozole",
          side:"beans rice",
          drink:"",
          price:5.99,
          image:'/Pozole.png'
            },
            {
          _id: 9,
          main:"Sopa de Lima",
          side:"beans rice",
          drink:"",
          price:8.99,
          image:'/Sopa-de-Lima.png'
            },
            {
          _id: 10,
          main:"Cochinita Pibil",
          side:"beans rice",
          drink:"",
          price:5.99,
          image:'/Cochinita-Pibil.png'
            },
            {
          _id: 11,
          main:"Cajeta",
          side:"beans rice",
          drink:"",
          price:4.99,
          image:'/Cajeta.png'
            },
            {
          _id: 12,
          main:"Carnitas",
          side:"beans rice",
          drink:"",
          price:12.88,
          image:'/Carnitas.png'
            },
            {
          _id: 13,
          main:"Mole",
          side:"beans rice",
          drink:"",
          price:11.50,
          image:'/Mole.png'
            },
            {
          _id: 14,
          main:"Tlayudas",
          side:"beans rice",
          drink:"",
          price:9.00,
          image:'/Tlayudas.png'
            },
            {
          _id: 15,
          main:"Chapulines",
          side:"beans rice",
          drink:"",
          price:4.99,
          image:'/Chapulines.png'
            },
        ],
        drinks:[
          "Mountain Dew",
          "Pepsi",
          "Mug Root Beer",
          "Sierra Mist",
          "Pepsi Max",
          "Diet Pepsi",
          "Mountain Dew Code Red",
          "Pepsi Wild Cherry",
          "Mountain Dew Voltage",
          "7 Up",
          "Orange Crush",
          "Mountain Dew Baja Blast",
          "horchata",
          "Jarritos Strawberry",
          "Jarritos Grapefruit",
          "Jarritos Lime Soda",
          "Jarritos Mandarina Soft",
          "Jarritos Pineapple",
          "Jarritos Fruit Punch",
          "Jarritos Guava Soda",
          "Jarritos Mexican Cola",
          "Mineragua - Jarritos Mineral Water"
        ],
        cart: [],
        cartOpen: false,
        currentCategory: '',
    });
    return <Provider value={[state, dispatch]} {...props} />
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };