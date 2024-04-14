import {View, StyleSheet, ScrollView, FlatList, Text, TouchableOpacity} from 'react-native';
import {useAuth} from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import {defaultStyles} from "@/constants/Styles";
import {devices, items, support} from "@/constants/DummyData";
import BoxedIcon from "@/components/BoxedIcon";
import {Ionicons} from "@expo/vector-icons";

const Settings = () => {
  const {signOut} = useAuth();

  return (
   <View style={styles.container}>
     <ScrollView contentInsetAdjustmentBehavior="automatic">
       <View style={defaultStyles.block}>
         <FlatList
          data={devices}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
          renderItem={({item}) => {
            return (
             <View style={defaultStyles.item}>
               <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
               <Text style={styles.text}>{item.name}</Text>
               <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
             </View>
            );
          }}/>
       </View>
       <View style={defaultStyles.block}>
         <FlatList
          data={items}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
          renderItem={({item}) => {
            return (
             <View style={defaultStyles.item}>
               <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
               <Text style={styles.text}>{item.name}</Text>
               <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
             </View>
            );
          }}/>
       </View>
       <View style={defaultStyles.block}>
         <FlatList
          data={support}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
          renderItem={({item}) => {
            return (
             <View style={defaultStyles.item}>
               <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
               <Text style={styles.text}>{item.name}</Text>
               <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
             </View>
            );
          }}/>
       </View>
       <TouchableOpacity onPress={() => {
         signOut();
       }}>
         <Text style={styles.logOut}>Log Out</Text>
       </TouchableOpacity>
     </ScrollView>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  logOut: {
    color: Colors.primary,
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 14
  },
  text: {
    fontSize: 18,
    flex: 1,
  }
});

export default Settings;
