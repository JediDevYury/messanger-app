import {StyleSheet, TouchableHighlight, Text, Image, View} from 'react-native';
import {Link} from "expo-router";
import Colors from "@/constants/Colors";
import {format} from "date-fns";
import ChatsSwippeableRow from "@/components/ChatsSwippeableRow";

export type ChatRowProps = {
  id: string;
  date: string;
  from: string;
  msg: string;
  img: string;
  read: boolean;
  unreadCount: number;
}

const ChatRow = ({ id, from, date, img, msg }: ChatRowProps) => {
  return (
   <ChatsSwippeableRow>
     <Link
      href={`/(tabs)/chats/${id}`}
      asChild
     >
       <TouchableHighlight activeOpacity={0.6} underlayColor={Colors.lightGray}>
         <View style={styles.container}>
           <Image source={{uri: img}} style={styles.profileImage} />
           <View style={{
             flex: 1,
           }}>
             <Text style={styles.fromMessage}>{from}</Text>
             <Text style={styles.message}>{msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}</Text>
           </View>
           <Text style={styles.date}>
             {format(new Date(date), 'MM.dd.yy')}
           </Text>
         </View>
       </TouchableHighlight>
     </Link>
   </ChatsSwippeableRow>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  fromMessage: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileImage: {width: 50, height: 50, borderRadius: 50 },
  message: {
    fontSize: 16,
    color: Colors.gray,
  },
  date: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: Colors.gray,
    paddingRight: 20,
  }
});

export default ChatRow;
