import React from "react"
import { View, Text } from "react-native"
import { Provider } from "react-redux"
import { firestore } from "@react-native-firebase/firestore"
import Root from './Src/navigations/Root'
import { StoreProvider } from "./Src/store"

const App=()=> {
    return(
        <StoreProvider>
            <Root/>
        </StoreProvider>
    )
}

export default App;
