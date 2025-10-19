import { db } from "./config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Nombre de la colección en Firestore
const collectionName = "eventos";

// Crear evento
export const addEvento = async (evento) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), evento);
    return docRef.id;
  } catch (error) {
    console.error("Error guardando evento:", error);
    throw error;
  }
};

// Leer todos los eventos
export const getEventos = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Actualizar evento
export const updateEvento = async (id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

// Eliminar evento
export const deleteEvento = async (id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};