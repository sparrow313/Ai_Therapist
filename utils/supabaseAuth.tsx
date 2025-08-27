import React, { useState } from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin'
  import { supabase } from '../lib/supabase'

  // Configure Google Sign-In once when module loads
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    // webClientId: "469644420373-v1pnl7l26a27umk3ccuk9ajf4t5p7o7l.apps.googleusercontent.com",
    webClientId: "469644420373-mqmnk72nt4mtcpfaeov2rpacrs4tgqin.apps.googleusercontent.com",
  })
  
  
  export default function GoogleSignInComponent(): React.JSX.Element {
    const [isSigningIn, setIsSigningIn] = useState(false)
  
    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          // Prevent multiple simultaneous sign-in attempts
          if (isSigningIn) {
            console.warn('Sign in already in progress - please wait')
            return
          }

          setIsSigningIn(true)
          try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log("userInfo", JSON.stringify(userInfo, null, 2))
            const { idToken } = await GoogleSignin.getTokens();
            if (idToken) {
              const { error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: idToken,
              })
              
              if (error) {
                console.error('Supabase auth error:', error.message)
              } else {
                console.log('✅ Successfully signed in')
              }
            } else {
              throw new Error('No ID token received from Google')
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log('Sign in cancelled by user')
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.warn('Sign in already in progress - please wait')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.error('Google Play services not available')
            } else {
              console.error('Sign in error:', error.message)
              console.error('Error code:', error.code)
              console.error('Full error object:', error)
            }
          } finally {
            setIsSigningIn(false)
          }
        }}
        disabled={isSigningIn}
      />
    )
  } 