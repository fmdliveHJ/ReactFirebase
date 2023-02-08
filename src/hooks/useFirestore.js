import { async } from "@firebase/util";
import { collection, addDoc } from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "isPeding":
      return { isPending: true, document: null, success: false, error: null };
    case "addDoc":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "error":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//  데이터 저장을 요청할대 transaction 저장할 컬렉션의 이름
export const useFirestore = (transaction) => {
  //파이어스토어를 통해서 전달 받은 결과값을 response에 담음
  const [response, dispatch] = useReducer(storeReducer, initState);
  //colRef : 컬렉션의 참조를 요구합니다.
  //컬렉션 함수를 이용해서 appFireStore초기화 객체를 인자로 설정
  //컬렉션의 이름을 설정해주면 파이어스토어에서 해당하는 이르므이 컬렉션을 생성

  const colRef = collection(appFireStore, transaction);
  //컬렉션 문서
  const addDocument = async (doc) => {
    dispatch({ type: "ispending" });

    //두번째 인자는 저장할 데이터 > 함수가 실행될때 전달 받는 인자
    try {
      const createTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createTime });
      console.log("test", docRef);
      //성공적으로 통신이 끝남
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: "error", payload: error.message });
    }
  };
  //컬렉션에서 문서 제거
  const deleteDocument = (id) => {};
  return { addDocument, deleteDocument, response };
};
