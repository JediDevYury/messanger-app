import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';

import {Stack} from "expo-router";
import {useCallback, useEffect, useRef, useState} from "react";
import {Bubble, GiftedChat, IMessage, InputToolbar, Send, SystemMessage, Time} from "react-native-gifted-chat";

import data from "@/assets/data/messages.json";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import ChatMessageBox from "@/components/ChatMessageBox";
import ReplyMessageBar from "@/components/ReplyMessageBar";

const ChatById = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const [text, setText] = useState('');
  const swipeableRowRef = useRef<Swipeable | null>(null);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages =>
     GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const updateRowRef = useCallback((ref: any) => {
    if(ref && replyMessage && ref.props.children.props.currentMessage?._id === replyMessage._id) {
      swipeableRowRef.current = ref;
    }
  }, [replyMessage])

  useEffect(() => {
    setMessages([
      ...data.map((message) => ({
        _id: message.id,
        text: message.msg,
        createdAt: new Date(message.date),
        user: {
          _id: message.from,
          name: message.from ? 'You' : 'Bob',
        }
      })),
      {
        _id: 0,
        system: true,
        text: 'All messages are encrypted and secure.',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot",
        }
      }
    ])
  }, [])

  useEffect(() => {
    if(replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close()
      swipeableRowRef.current = null
    }
  }, [replyMessage]);

  return (
   <>
     <Stack.Screen options={
      {
        headerTitle: () => (
         <View style={{
           flexDirection: 'row',
           gap: 10,
           paddingBottom: 4,
           alignItems: 'center',
           width: 220
         }}>
           <Image
            source={require('@/assets/images/welcome.png')}
            style={{width: 40, height: 40, borderRadius: 40}}
           />
           <Text style={{fontSize: 18, fontWeight: 'bold'}}>Saundra Lott</Text>
         </View>
        ),
      }
     }/>
     <ImageBackground
      style={{
        flex: 1,
        marginBottom: insets.bottom,
        backgroundColor: Colors.background
      }}
      source={require('@/assets/images/pattern.png')}>
       <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        onInputTextChanged={setText}
        renderSystemMessage={(props) => {
          return <SystemMessage
           {...props}
           textStyle={{
              color: Colors.gray,
           }}
          />
        }}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        renderBubble={(props) => {
          return (
           <Bubble
            {...props}
            textStyle={{
              right: {
                color: '#000',
              }
            }}
            renderTime={(timeProps) => {
              return (<Time {...timeProps} timeTextStyle={{
                right: {
                  color: Colors.gray,
                }
              }}/>);
            }}
            wrapperStyle={{
              left: {
                backgroundColor: '#fff',
              },
              right: {
                backgroundColor: Colors.lightGreen,
              }
            }}
           />
          );
        }}
        renderSend={(props) => {
          return (
           <View style={{
             flexDirection: 'row',
             height: 44,
             alignItems: 'center',
             justifyContent: 'center',
             gap: 14,
             paddingHorizontal: 14,
           }}>
             {text.length > 0 && (<Send {...props} containerStyle={{
               justifyContent: 'center',
             }}>
               <Ionicons
                name="send"
                size={28}
                color={Colors.primary}
               />
             </Send>)}
             {text.length === 0 && (<>
               <Ionicons
                name="camera-outline"
                size={28}
                color={Colors.primary}
               />
               <Ionicons
                name="mic-outline"
                size={28}
                color={Colors.primary}
               />
             </>)}
           </View>
          );
        }}
        textInputProps={styles.composer}
        renderInputToolbar={(props) => {
          return (<InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: Colors.background,
            }}
            renderActions={() => {
              return (
               <View style={{
                 height: 44,
                 justifyContent: 'center',
                 alignItems: 'center',
                 marginLeft: 14,
               }}>
                 <Ionicons
                  name="add"
                  size={28}
                  color={Colors.primary}
                 />
               </View>
              );
            }}
           />
          );
        }}
        renderMessage={(props) => {
          return (
           <ChatMessageBox
            {...props}
            updateRowRef={updateRowRef}
            setReplyOnSwipeOpen={setReplyMessage}
           />
          );
        }}
        renderChatFooter={() =>
         <ReplyMessageBar
          clearReply={() => setReplyMessage(null)}
          message={replyMessage}/>
        }
       />
     </ImageBackground>
   </>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 15,
    fontSize: 16,
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingTop: 8,
  }
});

export default ChatById;
