import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCVfEh2-cMPT9djp-vwM0Y5ijuieN3IIj0",
  authDomain: "bookmate-45cd9.firebaseapp.com",
  projectId: "bookmate-45cd9",
  storageBucket: "bookmate-45cd9.appspot.com",
  messagingSenderId: "423298842053",
  appId: "1:423298842053:web:375ed055251f86684fdfac",
};

//hook
export const useFirebase = () => useContext(FirebaseContext);

// instances
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []); //to see if user is logged in or not or record the state change

  const signupUserwithEmailandPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const loginUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const logoutFunction = () => signOut(firebaseAuth);
  

    console.log("User:",user);

  const handleCreateNewListing = async (name, author, rdate, coverPic, desc, bookPdf, trope) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const pdfRef = ref(
      storage,
      `uploads/pdfs/${Date.now()}-${bookPdf.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    const uploadResult2 = await uploadBytes(pdfRef, bookPdf);
    await addDoc(collection(firestore, "books"), {
      name,
      author,
      rdate,
      trope,
      desc,
      imgURL: uploadResult.ref.fullPath,
      pdfURL: uploadResult2.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getPdfURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      qty: Number(qty),
    });
    return result;
  };


//   const fetchMyOrders = async() => {
//     const collectionRef = (firestore,'books');
//     const q = query(collectionRef, where("userID", "==", user.uid));
//     const result = await getDocs(q);
//     console.log(result);
//   }

 const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));

    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };


  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserwithEmailandPassword,
        loginUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getPdfURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        logoutFunction
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
