// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//initializeApp = esta funcion la utilizo para iniciar la conexion con firebase
//getFirestore = se utiliza para obtener una instancia de firestore. Con esto vamos a poder trabajar con las bases de datos dinamicas

// Your web app's Firebase configuration
// Estamos trabajando con un obj con toda nuestra info de la cuenta. Aca se incluyte la key personal de acceso a la db
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codermmerce.firebaseapp.com",
  projectId: "codermmerce",
  storageBucket: "codermmerce.appspot.com",
  messagingSenderId: "1052107638863",
  appId: "1:1052107638863:web:934e29708fa1cb9c01423a"
};

// Initialize Firebase y se pasa la configuracion como argumento
// Esto retorna una instancia de firebase
const app = initializeApp(firebaseConfig);

// creamos una referencia para nuestra db
// exportamos esta referencia para q este disponible en toda nuestra app
export const db = getFirestore(app);