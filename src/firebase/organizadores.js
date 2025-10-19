import { db } from "./config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Nombre de la colección en Firestore
const collectionName = "organizadores";

// Crear organizador
export const addOrganizador = async (organizador) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), organizador);
    return docRef.id;
  } catch (error) {
    console.error("Error guardando organizador:", error);
    throw error;
  }
};

// Leer todos los organizadores
export const getOrganizadores = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Actualizar organizador
export const updateOrganizador = async (id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

// Eliminar organizador
export const deleteOrganizador = async (id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};