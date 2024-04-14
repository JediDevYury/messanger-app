import {StyleSheet, TouchableOpacity} from 'react-native';
import {Stack} from "expo-router";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";

const Layout = () => {
  return (
   <Stack>
     <Stack.Screen
      name="index"
      options={{
        title: 'Calls',
        headerLargeTitle: true,
        headerTransparent: true,
        headerBlurEffect: 'regular',
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerSearchBarOptions: {
          placeholder: 'Search',
        },
        headerRight: () => {
          return (
           <TouchableOpacity>
             <Ionicons name="call" size={24} color={Colors.primary} />
           </TouchableOpacity>
          );
        },
      }} />
   </Stack>
  );
};

const styles = StyleSheet.create({
  headerRightIcon: {
    marginRight: 16,
  },
});

export default Layout;
