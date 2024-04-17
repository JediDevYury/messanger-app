import {Tabs, useSegments} from "expo-router";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const TabsLayout = () => {
  const segments = useSegments();

  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
     <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.background },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerShadowVisible: false,
      }}>
       <Tabs.Screen
        name="calls"
        options={{
          title: 'Calls',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
           <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
          ),
        }}
       />
       <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ size, color }) => (
           <Ionicons name="chatbubbles" size={size} color={color} />
          ),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.background,
            display: segments[2] === '[id]' ? 'none' : 'flex',
          },
        }}
       />

       <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Ionicons name="cog" size={size} color={color} />,
        }}
       />
     </Tabs>
   </GestureHandlerRootView>
  );
};

export default TabsLayout;
