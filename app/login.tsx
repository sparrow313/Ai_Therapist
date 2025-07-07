"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const isFormValid = email.length > 0 && password.length > 0

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
            <Text className={`font-bold text-lg mr-2 ${isFormValid ? "text-white" : "text-zinc-400"}`}>
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
          <TouchableOpacity
            className="bg-zinc-800/60 border border-zinc-700/50 rounded-2xl py-4 flex-row items-center justify-center mb-4"
            activeOpacity={0.8}
          >
            <View className="w-8 h-8 bg-white rounded-full items-center justify-center mr-3">
              <Ionicons name="logo-google" size={18} color="#ea4335" />
            </View>
            <Text className="text-white font-semibold">Continue with Google</Text>
          </TouchableOpacity>

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
          <TouchableOpacity className="py-2 px-1" activeOpacity={0.7}>
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



// import { Ionicons } from '@expo/vector-icons';
// import { useState } from 'react';
// import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   return (
//     <ScrollView className="flex-1 bg-zinc-900">
//       <View className="p-6 pt-20">
//         {/* Header */}
//         <View className="items-center mb-10">
//           <View className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl items-center justify-center mb-6 shadow-lg shadow-black/50">
//             <Ionicons name="home" size={36} color="white" />
//           </View>
//           <Text className="text-3xl font-bold text-white mb-3">Welcome Back</Text>
//           <Text className="text-zinc-400 text-center text-lg leading-6">
//             Continue your recovery journey.{'\n'}Your progress is waiting for you.
//           </Text>
//         </View>

//         {/* Encouraging Message */}
//         <View className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8">
//           <View className="flex-row items-center mb-2">
//             <Ionicons name="trending-up" size={20} color="#3b82f6" />
//             <Text className="text-blue-400 font-semibold ml-2">Your Streak Continues</Text>
//           </View>
//           <Text className="text-zinc-300 text-sm">
//             Every day you log in is another step forward. Your commitment to recovery makes a difference.
//           </Text>
//         </View>

//         {/* Login Form */}
//         <View className="space-y-5 mb-6">
//           {/* Email */}
//           <View>
//             <Text className="text-white font-semibold mb-2">Email Address</Text>
//             <View className="bg-zinc-800 rounded-xl border border-zinc-700 p-4 flex-row items-center">
//               <Ionicons name="mail-outline" size={22} color="#a1a1aa" />
//               <TextInput
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#6b7280"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 className="text-white ml-3 flex-1 text-base"
//               />
//             </View>
//           </View>

//           {/* Password */}
//           <View>
//             <Text className="text-white font-semibold mb-2">Password</Text>
//             <View className="bg-zinc-800 rounded-xl border border-zinc-700 p-4 flex-row items-center">
//               <Ionicons name="lock-closed-outline" size={22} color="#a1a1aa" />
//               <TextInput
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#6b7280"
//                 secureTextEntry={!showPassword}
//                 className="text-white ml-3 flex-1 text-base"
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons 
//                   name={showPassword ? "eye-off-outline" : "eye-outline"} 
//                   size={22} 
//                   color="#a1a1aa" 
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         {/* Remember Me & Forgot Password */}
//         <View className="flex-row justify-between items-center mb-8">
//           <TouchableOpacity 
//             className="flex-row items-center"
//             onPress={() => setRememberMe(!rememberMe)}
//           >
//             <View className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
//               rememberMe ? 'bg-green-500 border-green-500' : 'border-zinc-600'
//             }`}>
//               {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
//             </View>
//             <Text className="text-zinc-400">Remember me</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity>
//             <Text className="text-green-400 font-semibold">Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity 
//           className={`rounded-2xl py-4 mb-6 ${
//             email && password
//               ? 'bg-green-500 shadow-lg shadow-green-500/25' 
//               : 'bg-zinc-700'
//           }`}
//           disabled={!email || !password}
//         >
//           <Text className="text-white font-bold text-center text-lg">Continue Your Journey</Text>
//         </TouchableOpacity>

//         {/* Divider */}
//         <View className="flex-row items-center my-6">
//           <View className="flex-1 h-px bg-zinc-700" />
//           <Text className="text-zinc-500 mx-4">or continue with</Text>
//           <View className="flex-1 h-px bg-zinc-700" />
//         </View>

//         {/* Social Login Options */}
//         <View className="space-y-3 mb-8">
//           <TouchableOpacity className="bg-zinc-800 border border-zinc-700 rounded-2xl py-4 flex-row items-center justify-center">
//             <Ionicons name="logo-google" size={22} color="#ea4335" />
//             <Text className="text-white font-semibold ml-3">Google</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="bg-zinc-800 border border-zinc-700 rounded-2xl py-4 flex-row items-center justify-center">
//             <Ionicons name="logo-apple" size={22} color="white" />
//             <Text className="text-white font-semibold ml-3">Apple</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Sign Up Link */}
//         <View className="flex-row justify-center items-center mb-8">
//           <Text className="text-zinc-400">New to recovery support? </Text>
//           <TouchableOpacity>
//             <Text className="text-green-400 font-semibold">Create Account</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Quick Access Cards */}
//         <View className="space-y-3 mb-6">
//           <View className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-2xl p-4">
//             <View className="flex-row items-center mb-2">
//               <Ionicons name="flash" size={20} color="#f59e0b" />
//               <Text className="text-amber-400 font-semibold ml-2">Quick Access</Text>
//             </View>
//             <Text className="text-zinc-300 text-sm">
//               Access emergency support, crisis hotlines, and immediate help resources without logging in.
//             </Text>
//             <TouchableOpacity className="mt-3">
//               <Text className="text-amber-400 font-semibold">Get Help Now →</Text>
//             </TouchableOpacity>
//           </View>

//           <View className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-4">
//             <View className="flex-row items-center mb-2">
//               <Ionicons name="people" size={20} color="#a855f7" />
//               <Text className="text-purple-400 font-semibold ml-2">Anonymous Support</Text>
//             </View>
//             <Text className="text-zinc-300 text-sm">
//               Join community discussions and find peer support while maintaining your privacy.
//             </Text>
//             <TouchableOpacity className="mt-3">
//               <Text className="text-purple-400 font-semibold">Browse Community →</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Footer Message */}
//         <View className="bg-zinc-800/30 rounded-2xl p-4 border border-zinc-700/50">
//           <View className="flex-row items-center mb-2">
//             <Ionicons name="shield-checkmark" size={18} color="#22c55e" />
//             <Text className="text-green-400 font-semibold ml-2">Secure & Private</Text>
//           </View>
//           <Text className="text-zinc-400 text-xs leading-4">
//             Your data is encrypted end-to-end. We never share your personal information or recovery details with third parties.
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// } 