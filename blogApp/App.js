import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';

const data = [
   {
      id: '123',
      thumbnail: require('./assets/images/ic01.png'),
      title: '리액트네이티브 타이틀1',
      author: 'Admin'
   },
   {
    id: '1223',
    thumbnail: require('./assets/images/ic02.png'),
    title: '리액트네이티브 타이틀2',
    author: 'Admin'
   },
   {
     id: '1234',
     thumbnail: require('./assets/images/ic03.png'),
     title: '리액트네이티브 타이틀3',
     author: 'Admin'
  }
]

const width = Dimensions.get('window').width - 20;
let currentSlideIndex = 0;

export default function App() {
  const [ dataToRender, setDataToRender ] = useState([]);
  const [ visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [ activeSlideIndex, setActiveSlideIndex] = useState(0);
  
  const onViewableItemsChanged = useRef(({viewableItems}) => {
      currentSlideIndex = viewableItems[0]?.index || 0
      console.log(currentSlideIndex);
      setVisibleSlideIndex( currentSlideIndex );
  })

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold : 50
  })

  const flatList = useRef();

  const handleScrollTo = (index) => {

  }

  useEffect(()=> {
     const newData = [[...data].pop(), ...data, [...data].shift()];
     setDataToRender([...newData]);
  }, [data.length]);

  useEffect(()=>{
    const length = dataToRender.length;
     //첫번째 페이지 리셋
     if(visibleSlideIndex === length -1 && length){
        handleScrollTo(1)
     }

     //마지막 페이지 리셋
     if(visibleSlideIndex === 0 && length ){
        handleScrollTo(length - 2);
     }
 
     const lastSlide = currentSlideIndex === length -1;
     const firstSlide = currentSlideIndex === 0;

     if( lastSlide && length ) setActiveSlideIndex(0)
     else if(firstSlide && length ) setActiveSlideIndex(length -2)
     else setActiveSlideIndex(currentSlideIndex)

  }, [visibleSlideIndex]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{ fontWeight: '700', 
                         color: '#333', 
                         fontSize:22, 
                         paddingVertical: 5 
                      }}>Featured Posts</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>            
          {
            data.map((item, index) => {
              return <View key={item.id}
                           style={{
                            width: 12, 
                            height: 12, 
                            borderRadius: 6, 
                            borderWidth: 2,
                            marginLeft: 5,
                            backgroundColor: activeSlideIndex === index ? '#000000' : 'transparent'
                          }}
                     />      
            })
          }         
          </View>   
      </View>
      <FlatList data={ dataToRender }
                keyExtractor={ (item, index) => item.id + index }
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={1}
                getItemLayout={(_, index)=>({
                  length: width,
                  offset: width * index,
                  index
                })}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
                renderItem={({ item }) => {
                  return (
                   <View>
                      <Image source={ item.thumbnail } 
                             style={{width, height: width / 1.6 , borderRadius: 7, resizeMode: 'cover'}}        
                      />
                   </View> 
                  ); 
                }}
      />          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width,
    paddingTop: 50
  },
});