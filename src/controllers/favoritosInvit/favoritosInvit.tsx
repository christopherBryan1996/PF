import { useDeviceLanguage } from "@firebase/auth";
import { addFavoriteEvent,getFavorites } from "../../actions/actions"

export const combinarFavs = async (
    uid:string, 
    eventIds: string[],
    dispatch: any    
  ) => {
    eventIds.forEach((id: string) => {
        dispatch(addFavoriteEvent(uid, id));
    })
    dispatch(getFavorites(uid))
  };
  