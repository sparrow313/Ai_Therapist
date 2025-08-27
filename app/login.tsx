import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import GoogleSignInComponent from "../utils/supabaseAuth"
import { supabase } from "../lib/supabase";
import {  useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';




export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isFormValid = email.length > 0 && password.length > 0


  async function saveSecureItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getSecureItem(key: string) {
    const value = await SecureStore.getItemAsync(key);
    console.log("value", value)
    return value;
  }


  useEffect(() => {
    getSecureItem("user_email")
  }, [])

  async function signInWithEmail() {
    setLoading(true)
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log("session", data)

    await saveSecureItem("user_id", data.user?.id || "")
    await saveSecureItem("user_email", data.user?.email || "")
    await saveSecureItem("user_name", data.user?.user_metadata.full_name || "")
    await saveSecureItem("user_avatar", data.user?.user_metadata.avatar_url || "")
    await saveSecureItem("user_created_at", data.user?.created_at || "")
    await saveSecureItem("user_updated_at", data.user?.updated_at || "")
    await saveSecureItem("access_token", data.session?.access_token || "")
    await saveSecureItem("refresh_token", data.session?.refresh_token || "")
    if (error) Alert.alert(error.message)
    setLoading(false)
  }



  return (
    <ScrollView className="flex-1 bg-zinc-900" showsVerticalScrollIndicator={false}>
      <View className="p-6 pt-16">
        {/* Warm Welcome Header */}
        <View className="items-center mb-8">
          <View className="relative mb-6">
            <View className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-3xl items-center justify-center shadow-2xl shadow-green-500/30">
              <Ionicons name="heart" size={32} color="white" />
            </View>
            <View className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full items-center justify-center">
              <Ionicons name="star" size={12} color="white" />
            </View>
          </View>

          <Text className="text-2xl font-bold text-white mb-2">Welcome Home</Text>
          <Text className="text-zinc-300 text-center text-base leading-relaxed px-4">
            Your safe space for healing and growth.{"\n"}
            <Text className="text-green-400 font-medium">Every step forward matters.</Text>
          </Text>
        </View>

        {/* Motivational Card */}
        <View className="bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-blue-500/15 border border-blue-400/30 rounded-3xl p-5 mb-8">
          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 bg-blue-500/20 rounded-full items-center justify-center mr-3">
              <Ionicons name="trending-up" size={16} color="#60a5fa" />
            </View>
            <Text className="text-blue-300 font-semibold text-base">You&apos;re Stronger Today</Text>
          </View>
          <Text className="text-zinc-200 text-sm leading-relaxed">
            Recovery isn&apos;t about perfection it&apos;s about progress. You&apos;re here, and that&apos;s what counts.
          </Text>
        </View>

        {/* Enhanced Login Form */}
        <View className="mb-8">
          {/* Email Field */}
          <View className="mb-6">
            <Text className="text-white font-medium mb-3 text-base">Email Address</Text>
            <View
              className={`bg-zinc-800/80 rounded-2xl border-2 p-4 flex-row items-center ${
                focusedField === "email" ? "border-green-400/50" : "border-zinc-700/50"
              }`}
            >
              <View className="w-10 h-10 bg-zinc-700/50 rounded-xl items-center justify-center mr-3">
                <Ionicons name="mail-outline" size={20} color="#a1a1aa" />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="your.email@example.com"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-white flex-1 text-base"
              />
              {email.length > 0 && <Ionicons name="checkmark-circle" size={20} color="#22c55e" />}
            </View>
          </View>

          {/* Password Field */}
          <View className="mb-6">
            <Text className="text-white font-medium mb-3 text-base">Password</Text>
            <View
              className={`bg-zinc-800/80 rounded-2xl border-2 p-4 flex-row items-center ${
                focusedField === "password" ? "border-green-400/50" : "border-zinc-700/50"
              }`}
            >
              <View className="w-10 h-10 bg-zinc-700/50 rounded-xl items-center justify-center mr-3">
                <Ionicons name="lock-closed-outline" size={20} color="#a1a1aa" />
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your secure password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showPassword}
                className="text-white flex-1 text-base"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="w-10 h-10 items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#a1a1aa" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Remember Me & Forgot Password */}
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View
              className={`w-6 h-6 rounded-lg border-2 mr-3 items-center justify-center ${
                rememberMe ? "bg-green-500 border-green-500" : "border-zinc-600 bg-zinc-800/50"
              }`}
            >
              {rememberMe && <Ionicons name="checkmark" size={14} color="white" />}
            </View>
            <Text className="text-zinc-300 font-medium">Keep me signed in</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-2 px-1" activeOpacity={0.7}>
            <Text className="text-green-400 font-semibold">Need help?</Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Login Button */}
        <TouchableOpacity
          className={`rounded-2xl py-5 mb-8 ${isFormValid ? "bg-green-500" : "bg-zinc-700/50"}`}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-center">
            <Text className={`font-bold text-lg mr-2 ${isFormValid ? "text-white" : "text-zinc-400"}`} onPress={signInWithEmail}>
              Continue Your Journey
            </Text>
            <Ionicons name="arrow-forward" size={20} color={isFormValid ? "white" : "#6b7280"} />
          </View>
        </TouchableOpacity>

        {/* Gentle Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-zinc-600" />
          <Text className="text-zinc-400 mx-6 font-medium">or</Text>
          <View className="flex-1 h-px bg-zinc-600" />
        </View>

        {/* Social Login Options */}
        <View className="mb-8">
          {/* <TouchableOpacity
            className="bg-zinc-800/60 border border-zinc-700/50 rounded-2xl py-4 flex-row items-center justify-center mb-4"
            activeOpacity={0.8}
          >
            <View className="w-8 h-8 bg-white rounded-full items-center justify-center mr-3">
              <Ionicons name="logo-google" size={18} color="#ea4335" />
            </View>
            <Text className="text-white font-semibold">Continue with Google</Text>
          </TouchableOpacity> */}
          <GoogleSignInComponent />

          <TouchableOpacity
            className="bg-zinc-800/60 border border-zinc-700/50 rounded-2xl py-4 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <View className="w-8 h-8 bg-black rounded-full items-center justify-center mr-3">
              <Ionicons name="logo-apple" size={18} color="white" />
            </View>
            <Text className="text-white font-semibold">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-zinc-400">New here? </Text>
          <TouchableOpacity className="py-2 px-1" activeOpacity={0.7} onPress={() => router.push('/signup')}  >
            <Text className="text-green-400 font-semibold">Start your journey</Text>
          </TouchableOpacity>
        </View>

        {/* Support Cards */}
        <View className="mb-6">
          <TouchableOpacity
            className="bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-400/30 rounded-2xl p-5 mb-4"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-amber-500/20 rounded-2xl items-center justify-center mr-3">
                <Ionicons name="flash" size={20} color="#f59e0b" />
              </View>
              <Text className="text-amber-300 font-semibold text-base">Need Help Right Now?</Text>
            </View>
            <Text className="text-zinc-200 text-sm leading-relaxed mb-3">
              Access crisis support and emergency resources instantly—no account needed.
            </Text>
            <View className="flex-row items-center">
              <Text className="text-amber-400 font-semibold mr-2">Get immediate support</Text>
              <Ionicons name="arrow-forward" size={16} color="#f59e0b" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-400/30 rounded-2xl p-5"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-purple-500/20 rounded-2xl items-center justify-center mr-3">
                <Ionicons name="people" size={20} color="#a855f7" />
              </View>
              <Text className="text-purple-300 font-semibold text-base">Anonymous Community</Text>
            </View>
            <Text className="text-zinc-200 text-sm leading-relaxed mb-3">
              Connect with others who understand your journey in a safe, private space.
            </Text>
            <View className="flex-row items-center">
              <Text className="text-purple-400 font-semibold mr-2">Join the community</Text>
              <Ionicons name="arrow-forward" size={16} color="#a855f7" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Trust Footer */}
        <View className="bg-zinc-800/40 rounded-2xl p-5 border border-zinc-700/30 mb-8">
          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 bg-green-500/20 rounded-full items-center justify-center mr-3">
              <Ionicons name="shield-checkmark" size={16} color="#22c55e" />
            </View>
            <Text className="text-green-300 font-semibold">Your Privacy Matters</Text>
          </View>
          <Text className="text-zinc-300 text-sm leading-relaxed">
            End-to-end encryption protects your data. Your recovery journey stays private and secure.
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}


