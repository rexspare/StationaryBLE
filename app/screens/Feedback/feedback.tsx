import React, { useEffect } from "react"
import { Presentation, DevelopmentToolsProps, DevOption } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Alert, ToastAndroid, View } from "react-native"
import axios from "axios"
import pkg from "../../../package.json"
import DeviceInfo from "react-native-device-info"
// import { useStores } from "../models/root-store"

export const Feedback: React.FunctionComponent = observer((props) => {
  // Pull in navigation via hook
  const navigation = props.navigation
  // return <View/>

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }

  const onContinuePress = async (data, setIsLoading) => {
    const model = DeviceInfo.getModel()
    const buildId = await DeviceInfo.getBuildId()
    const buildNumber = DeviceInfo.getBuildNumber()

    const datatosend = {
      Feedback_Type: data.category,
      Urgency: data.urgency,
      Details: data.feedback,
      Contact_Me: data.contactMe,
      Contact_Info: data.email,
      Date_Submitted: `${
        new Date().getMonth() + 1
      }/${new Date().getDate()}/${new Date().getFullYear()}`,
      From_Screen: props.route.params?.fromScreen,
      Phone_Model: model,
      OS_Build_Id: buildId,
      OS_Build_Number: buildNumber,

      App_Version: pkg.version,
    }
    if (data.category === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Category is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else if (data.urgency === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Urgency is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else if (data.feedback === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Feedback is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else if (data.contactMe) {
      if (data.email?.trim() === "") {
        ToastAndroid.showWithGravityAndOffset(
          "Email is required",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        )
      } else if (validateEmail(data.email)) {
        ToastAndroid.showWithGravityAndOffset(
          "Please enter valid email",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        )
      } else {
        setIsLoading(true)
        if (data.includeScreenshot) {
          // datatosend.Screenshot = props.route.params?.imageBase64
        }

        console.log(datatosend)

        axios
          .post("https://sheetdb.io/api/v1/3jwvb0eg75eia", {
            data: datatosend,
          })
          .then((response) => {
            setIsLoading(false)
            ToastAndroid.showWithGravityAndOffset(
              "Feedback recorded",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            )
          })
          .catch((e) => {
            setIsLoading(false)
            console.log(e)
            ToastAndroid.showWithGravityAndOffset(
              "Some Error Occured",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            )
          })
      }
    } else {
      setIsLoading(true)
      if (data.includeScreenshot) {
        // datatosend.Screenshot = props.route.params?.imageBase64
      }

      console.log(datatosend)

      axios
        .post("https://sheetdb.io/api/v1/3jwvb0eg75eia", {
          data: datatosend,
        })
        .then((response) => {
          setIsLoading(false)
          ToastAndroid.showWithGravityAndOffset(
            "Feedback recorded",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          )
        })
        .catch((e) => {
          setIsLoading(false)
          console.log(e)
          ToastAndroid.showWithGravityAndOffset(
            "Some Error Occured",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          )
        })
    }
  }

  return (
    <Presentation
      onContinuePress={onContinuePress}
      profile={props.route.params.data}
      goBack={() => navigation.goBack()}
    />
  )
})
