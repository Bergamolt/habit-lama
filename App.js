import React from 'react'

import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'

import { StatusBar } from 'expo-status-bar'
import { HomeScreen } from './src/screen/home-screen';

const App = () => (
  <>
    <IconRegistry icons={ EvaIconsPack }/>
    <ApplicationProvider { ...eva } theme={ eva.light }>
      <StatusBar style="inverted"/>
      <HomeScreen/>
    </ApplicationProvider>
  </>
)

export default App
