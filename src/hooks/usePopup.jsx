import { useContext } from "react"
import {PopupContext} from "../Providers/PopupProvider"
const usePopup = ()=>{
  try {
    const popupContext = useContext(PopupContext)
    return popupContext
  } catch (error) {
    console.log("usePopup must be inside for a popup provoder");
  }
  
}

export default usePopup