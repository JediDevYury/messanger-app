import {Text, View, TouchableOpacity, ScrollView, FlatList, Image, StyleSheet} from 'react-native';
import {Stack} from "expo-router";
import Colors from "@/constants/Colors";
import {useState} from "react";
import calls from "@/assets/data/calls.json";
import {defaultStyles} from "@/constants/Styles";
import {Ionicons} from "@expo/vector-icons";
import {format} from "date-fns";

const Calls = () => {
  const [items, setItems] = useState(calls);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    let editingNew = !isEditing;

    setIsEditing(editingNew);
  };

  return (
   <View style={{
     flex: 1,
     backgroundColor: Colors.background,
   }}>
     <Stack.Screen options={{
       headerLeft: () => {
         return (
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.headerRightButton}>{
              isEditing ? 'Done' : 'Edit'
            }</Text>
          </TouchableOpacity>
         );
       },
     }}/>
     <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{paddingBottom: 40}}
     >
       <View style={defaultStyles.block}>
         <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
          renderItem={({item}) => {
            return (
             <View style={defaultStyles.item}>
               <Image
                source={{
                  uri: item.img,
                }}
                style={styles.avatar}
               />
               <View style={{flex: 1, gap: 2}}>
                 <Text style={{fontSize: 18, color: item.missed ? Colors.red : '#000'}}>
                   {item.name}
                 </Text>

                 <View style={styles.callDescriptionContainer}>
                   <Ionicons
                    name={item.video ? 'videocam' : 'call'}
                    size={16}
                    color={Colors.gray}
                   />
                   <Text style={{color: Colors.gray, flex: 1}}>
                     {item.incoming ? 'Incoming' : 'Outgoing'}
                   </Text>
                 </View>
               </View>
               <View
                style={{
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                }}>
                 <Text style={{color: Colors.gray}}>{format(item.date, 'MM.dd.yy')}</Text>
                 <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color={Colors.primary}
                 />
               </View>
             </View>
            )
          }}
         />
       </View>
     </ScrollView>
   </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerRightButton: {
    color: Colors.primary,
    fontSize: 18,
  },
  callDescriptionContainer: {
    flexDirection: 'row',
    gap: 4
  },
});

export default Calls;
