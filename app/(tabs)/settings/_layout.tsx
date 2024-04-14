import { StyleSheet } from 'react-native';
import {Stack} from "expo-router";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
   <Stack>
     <Stack.Screen name="index" options={{
       title: 'Settings',
       headerLargeTitle: true,
       headerShadowVisible: false,
       headerStyle: {
         backgroundColor: Colors.background,
       },
       headerSearchBarOptions: {
          placeholder: 'Search',
       },
     }} />
   </Stack>
  );
};

const styles = StyleSheet.create({});

export default Layout;
