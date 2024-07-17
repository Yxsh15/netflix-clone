import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDgcvckR0pUC1vg47lG3OmB-LMuiWnjOfo",
  authDomain: "netflix-clone-5301f.firebaseapp.com",
  projectId: "netflix-clone-5301f",
  storageBucket: "netflix-clone-5301f.appspot.com",
  messagingSenderId: "748735207523",
  appId: "1:748735207523:web:fe93cde5e1016059380056"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,'users'),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })  
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
const logout = () =>{
    signOut(auth);
}

export {auth,db,login,signUp,logout};