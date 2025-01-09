import { useContext } from "react"
import {PopupContext} from "../Providers/PopupProvider"
const usePopup = ()=>{
  try {
    const popupContext = useContext(PopupContext)
    return popupContext
  } catch (error) {
    console.log(error);
  }
  
}

export default usePopup