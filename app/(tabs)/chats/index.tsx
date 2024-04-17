import {View, ScrollView, FlatList} from 'react-native';
import chats from "@/assets/data/chats.json";
import {defaultStyles} from "@/constants/Styles";
import ChatRow from "@/components/ChatRow";

const Chats = () => {
  return (
   <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={{paddingBottom: 40, backgroundColor: '#fff'}}
   >
     <FlatList
      scrollEnabled={false}
      data={chats}
      ItemSeparatorComponent={() =>
       <View style={[defaultStyles.separator, {
         marginLeft: 90
       }]} />}
      renderItem={({item}) => {
        return (
         <ChatRow {...item}/>
        );
      }}
     />
   </ScrollView>
  );
};

export default Chats;
