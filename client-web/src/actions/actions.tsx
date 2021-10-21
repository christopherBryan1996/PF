import axios from "axios";
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config'
import actions from '../actions_type/actions_types';

/********PASOS PARA CREAR UNA ACTION NUEVA***********
 1-> carpeta Interfaces: añadir a la interface IActions el nombre de la action y el tipo String
 2-> carpeta actions_type: añadir al objeto actions una la nueva action 
 3-> carpeta actions: crear la nueva action y en type colocar action.NOMBRE_DE_LA_ACTION
 4-> reducer correspndiente: en case colocar actions.NOMBRE_DE_LA_ACTION
**********************/


export function llenarCoordenadas(data: string[]) {
    console.log("llego action llenarCoordenadas");
    return async function (dispatch: any) {
        return dispatch({ type: actions.LLENAR_COORDENADAS, payload: data });
    };
}

export function getEvents() {
    return async function (dispatch: any) {
        const res = await axios.get("http://localhost:3008/events");
        dispatch({
            type: actions.GET_EVENTS,
            payload: res.data,
        });
    };
}

export const filtroPrecio = (state: any) => {
    //este action es para filtrar por continente

    return {
        type: actions.FILTRO_PRECIO,
        payload: state,
    };
};

export const getAsistentes = (id: string) => {
    //este action es para filtrar por continente

    return async function (dispatch: any) {
        const res = await axios.get(`https://api-fest.herokuapp.com/events/assistans/${id}`);
        dispatch({
            type: actions.GET_ASISTENTES,
            payload: res.data,
        });
    };
};

export const startGoogleLogin = () => {
    return (dispatch: any) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName, user.photoURL))            
            });
    }
}

export const login = (uid: any, displayName: any, photoURL: any) => (
    {
        type: actions.LOGIN,
        payload: {
            uid,
            displayName,
            photoURL
        }
    })


export const getFavorites = (id: any) => {
    return async function (dispatch: any) {
        console.log("llego al action")
        const res = await axios.get(`https://api-fest.herokuapp.com/api/users/favouritesevents/${id}`);
        dispatch({
            type: actions.GET_FAVORITES,
            payload: res.data,
        });
    };
}

export const filtroFavoritos = (state: any) => {
    return {
        type: actions.FILTRO_FAVORITOS,
        payload: state,
    };
};

export const loginNormal = (data: any) => {
    return {
        type: actions.LOGIN_NORMAL,
        payload: data,
    }
};

export const startLogout = () => {

    return async (dispatch: any) => {

        const auth = getAuth();
        await signOut(auth);

        dispatch(logout());
    }

}

export const logout = () => ({

    type: actions.LOGOUT
})

