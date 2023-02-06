import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

//컨텍스트 객체를 담아줌
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      //기존의 유저 정보에 새로운 액션의 페이로드로 받아오는 유저정보를 가져옴
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

//context를 구독할 컴포넌트의 묶음 범위를 설정함
const AuthContextProvider = ({ children }) => {
  //유저 정보 관리 > 리듀서 훅
  //리듀서 훅으로 관리할 유저정보를 state에 넣음
  //state를 업데이트 할 수 있는 함수 dispatch
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    // onAuthStateChanged : 유저의 인증정보 변화를 관찰하는 함수입니다.
    //onAuthStateChanged 함수는 Unsubscribe 함수를 반환합니다. 더 이상 유저의 변화를 관찰하지 않도록 하는 함수입니다.
    //우리는 새로고침 후 초기에 딱 한번 실행하면 되기 때문에 이후에는 구독을 중지합니다.
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      dispatch({ type: "isAuthReady", payload: user });
      unsubscribe();
    });
  }, []);
  console.log("state", state);
  //dispatch > authReducer호출 > state 업데이트
  //dispatch 함수를 context에 담에서 전역에서 공유
  //회원정보가 바뀔때마다 dispatch함수를 실행 유저정보 업데이트
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
