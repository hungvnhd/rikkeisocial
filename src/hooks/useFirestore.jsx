import React, { useState } from "react";
import { db } from "../components/firebase/config";
import { onSnapshot } from "firebase/firestore";

const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};

export default useFirestore;
