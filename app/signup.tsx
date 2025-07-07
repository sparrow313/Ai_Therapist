import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <ScrollView className="flex-1 bg-zinc-900">
      <View className="p-6 pt-16">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-black/50">
            <Ionicons name="heart" size={32} color="white" />
          </View>
          <Text className="text-3xl font-bold text-white mb-2">Start Your Journey</Text>
          <Text className="text-zinc-400 text-center text-lg leading-6">
            Take the first step towards recovery.{'\n'}You&apos;re not alone in this.
          </Text>
        </View>

        {/* Motivational Message */}
        <View className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="leaf" size={20} color="#22c55e" />
            <Text className="text-green-400 font-semibold ml-2">Recovery Starts Today</Text>
          </View>
          <Text className="text-zinc-300 text-sm">
            Every journey begins with a single step. Join thousands who have found strength, community, and hope through our support platform.
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4 mb-6">
          {/* Full Name */}
          <View>
            <Text className="text-white font-semibold mb-2">Full Name</Text>
            <View className="bg-zinc-800 rounded-xl border border-zinc-700 p-4 flex-row items-center">
              <Ionicons name="person-outline" size={20} color="#a1a1aa" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#6b7280"
                className="text-white ml-3 flex-1"
              />
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="text-white font-semibold mb-2">Email Address</Text>
            <View className="bg-zinc-800 rounded-xl border border-zinc-700 p-4 flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="#a1a1aa" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-white ml-3 flex-1"
              />
            </View>
          </View>

          {/* Password */}
          <View>
            <Text className="text-white font-semibold mb-2">Password</Text>
            <View className="bg-zinc-800 rounded-xl border border-zinc-700 p-4 flex-row items-center">
              <Ionicons name="lock-closed-outline" size={20} color="#a1a1aa" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a secure password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showPassword}
                className="text-white ml-3 flex-1"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#a1a1aa" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View>
            <Text className="text-white font-semibold mb-2">Confirm Password</Text>
            <View className="bg-zinc-800 rounded-xl border border-zinc-700 p-4 flex-row items-center">
              <Ionicons name="shield-checkmark-outline" size={20} color="#a1a1aa" />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showPassword}
                className="text-white ml-3 flex-1"
              />
            </View>
          </View>
        </View>

        {/* Privacy & Terms */}
        <View className="bg-zinc-800/50 rounded-2xl p-4 mb-6">
          <TouchableOpacity 
            className="flex-row items-start mb-3"
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 items-center justify-center ${
              agreeToTerms ? 'bg-green-500 border-green-500' : 'border-zinc-600'
            }`}>
              {agreeToTerms && <Ionicons name="checkmark" size={12} color="white" />}
            </View>
            <View className="flex-1">
              <Text className="text-zinc-300 text-sm leading-5">
                I agree to the <Text className="text-green-400">Terms of Service</Text> and <Text className="text-green-400">Privacy Policy</Text>
              </Text>
            </View>
          </TouchableOpacity>
          
          <View className="flex-row items-start">
            <Ionicons name="shield-outline" size={16} color="#22c55e" className="mt-0.5 mr-2" />
            <Text className="text-zinc-400 text-xs leading-4 flex-1">
              Your privacy is our priority. All data is encrypted and your recovery journey remains confidential.
            </Text>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          className={`rounded-2xl py-4 mb-4 ${
            agreeToTerms && name && email && password && confirmPassword
              ? 'bg-green-500 shadow-lg shadow-green-500/25' 
              : 'bg-zinc-700'
          }`}
          disabled={!agreeToTerms || !name || !email || !password || !confirmPassword}
        >
          <Text className="text-white font-bold text-center text-lg">Begin Your Recovery Journey</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-zinc-700" />
          <Text className="text-zinc-500 mx-4">or</Text>
          <View className="flex-1 h-px bg-zinc-700" />
        </View>

        {/* Social Sign Up Options */}
        <View className="space-y-3 mb-6">
          <TouchableOpacity className="bg-zinc-800 border border-zinc-700 rounded-2xl py-4 flex-row items-center justify-center">
            <Ionicons name="logo-google" size={20} color="#ea4335" />
            <Text className="text-white font-semibold ml-3">Continue with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-zinc-800 border border-zinc-700 rounded-2xl py-4 flex-row items-center justify-center">
            <Ionicons name="logo-apple" size={20} color="white" />
            <Text className="text-white font-semibold ml-3">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-zinc-400">Already have an account? </Text>
          <TouchableOpacity>
            <Text className="text-green-400 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Support Message */}
        <View className="mt-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-2xl">
          <View className="flex-row items-center mb-2">
            <Ionicons name="people" size={20} color="#a855f7" />
            <Text className="text-purple-400 font-semibold ml-2">24/7 Support Available</Text>
          </View>
          <Text className="text-zinc-300 text-sm">
            Need help getting started? Our support team and community are here for you every step of the way.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
} 