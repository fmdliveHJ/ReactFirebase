import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";

export const useCollection = (transation, myQuery) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  //가장 최신의 컬렉션을 가져옴
  useEffect(() => {
    let q;
    if (myQuery) {
      q = query(
        collection(appFireStore, transation),
        where(...myQuery),
        orderBy("createTime", "desc")
      );
    }

    const unsubscribe = onSnapshot(
      myQuery ? q : collection(appFireStore, transation),
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          //데이터 함수의 반환값을 객체에 나열
          result.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(result);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );
    return unsubscribe;
  }, [collection]);
  return { documents, error };
};
