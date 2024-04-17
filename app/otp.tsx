import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Linking,
  View,
  TouchableOpacity,
  ActivityIndicator, Alert
} from 'react-native';
import {useState} from "react";
import {useRouter} from "expo-router";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import MaskInput from 'react-native-mask-input';
import {GER_PHONE} from "@/constants/Masks";
import {isClerkAPIResponseError, useSignIn, useSignUp} from "@clerk/clerk-expo";
import {PhoneCodeFactor, SignInFirstFactor} from "@clerk/types";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const withEnabled = phoneNumber !== '' ? styles.enabled : null
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { bottom } = useSafeAreaInsets();

  const openLink = () => {
    Linking.openURL('https://google.com');
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      await signUp?.create({
        phoneNumber
      });

      signUp!.preparePhoneNumberVerification();

      setLoading(false);
      router.push(`/verify/${phoneNumber}`);
    }
    catch (e) {
      if(isClerkAPIResponseError(e)) {
        if(e.errors[0].code === 'form_identifier_exists') {
          await trySignIn()
        }
        else {
          setLoading(false);
          Alert.alert('Error', e.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    try {
      const {supportedFirstFactors} = await signIn!.create({
        identifier: phoneNumber,
      });

      const isPhoneCodeFactor = (
       factor: SignInFirstFactor
      ): factor is PhoneCodeFactor => {
        return factor.strategy === "phone_code";
      };

      const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor)!;

      const { phoneNumberId } = phoneCodeFactor


      await signIn!.prepareFirstFactor({
        strategy: 'phone_code',
        phoneNumberId
      })

      router.push(`/verify/${phoneNumber}?signin=true`);

      setLoading(false);
    }
    catch (e) {
      setLoading(false);
      if(isClerkAPIResponseError(e)) {
        Alert.alert('Error', e.errors[0].message);
      }
    }
  }

  return (
   <KeyboardAvoidingView style={{
     flex: 1,
   }} behavior="padding">
     <View style={styles.container}>
       {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{
            fontSize: 18,
            padding: 10,
          }}>Sending verification code...</Text>
        </View>
       )}
        <Text style={styles.description}>
          Need to verify your account. Carrier SMS charges may apply.
        </Text>
       <View style={styles.list}>
         <View style={styles.listItem}>
           <Text style={styles.listItemText}>Georgia</Text>
           <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
         </View>
         <View style={styles.separator}/>
         <MaskInput
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="+155 your phone number"
          onChangeText={(masked) => {
            setPhoneNumber(masked);
          }}
          mask={GER_PHONE}
          style={styles.input}
          autoFocus
         />
       </View>
       <Text style={styles.legal}>
         You must be{' '}
         <Text style={styles.link} onPress={openLink}>
           at least 16 years old
         </Text>{' '}
         to register. Learn how Messenger works with the{' '}
         <Text style={styles.link} onPress={openLink}>
           Jedi Dev Companies
         </Text>
         .
       </Text>
       <View style={{
         flex: 1,
       }}/>

       <TouchableOpacity
        onPress={sendOTP}
        style={[styles.button, withEnabled, {
          marginBottom: bottom
        }]}
       >
         <Text style={[
            styles.buttonText,
            withEnabled
         ]}>Next</Text>
       </TouchableOpacity>
     </View>
   </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  list: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.3,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.gray,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendingCode: {
    fontSize: 18,
    padding: 10,
  },
});

export default Page;
