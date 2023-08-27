import * as React from "react"
import {Presentation} from '../../screens/Calibration/presentation'
import { observer } from "mobx-react-lite"
// import { useStores } from "../models/root-store"
import { NavigationScreenProps } from "react-navigation"


export const CalibrationScreen = observer(function CalibrationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Presentation/>
  )
})
