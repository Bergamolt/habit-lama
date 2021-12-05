import React, { useCallback, useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'

import { StatusBar } from 'expo-status-bar'
import { HomeScreen } from './src/screen/home-screen'

const App = () => {
  const [ appIsReady, setAppIsReady ] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [ appIsReady ])

  if (!appIsReady) {
    return (
      <View
        style={ {flex: 1, alignItems: 'center', justifyContent: 'center'} }
        onLayout={ onLayoutRootView }>
        <ActivityIndicator size="large" color="#2B324C"/>
      </View>
    )
  }

  return (
    <>
      <IconRegistry icons={ EvaIconsPack }/>
      <ApplicationProvider { ...eva } theme={ eva.light }>
        <StatusBar style="inverted"/>
        <HomeScreen/>
      </ApplicationProvider>
    </>
  )
}

export default App



