import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';

const data = [
   {
      id: '123',
      thumbnail: require('./assets/images/ponyo001.jpg'),
      title: '리액트네이티브 타이틀1',
      author: 'Admin'
   },
   {
    id: '1223',
    thumbnail: require('./assets/images/ponyo002.jpg'),
    title: '리액트네이티브 타이틀2',
    author: 'Admin'
   },
   {
     id: '1234',
     thumbnail: require('./assets/images/ponyo003.jpg'),
     title: '리액트네이티브 타이틀3',
     author: 'Admin'
  }
]

const width = Dimensions.get('window').width - 20;
let currentSlideIndex = 0;
let intervalId;

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
    flatList.current.scrollToIndex({animated: false, index})
  }

  const startSlider = () => {
    if(currentSlideIndex <= dataToRender.length -2){ //끝 번호까지 갔을 때
      intervalId = setInterval(()=>{
        flatList.current.scrollToIndex({
          animated: true, 
          index: currentSlideIndex + 1
        })
      }, 4000);
    }else{
      pauseSlider();
    }
  }

  const pauseSlider = () => {
    clearInterval(intervalId);
  }

  useEffect(()=>{
    if(dataToRender.length && flatList.current) {
      startSlider();
    }
  }, [dataToRender.length])

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
     else setActiveSlideIndex(currentSlideIndex - 1)

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
      <FlatList ref={flatList}
                data={ dataToRender }
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




// import { StatusBar } from 'expo-status-bar';
// import { useMemo, useState, useRef, useEffect } from 'react';
// import { StyleSheet, Text, View, Dimensions, 
//          FlatList, TouchableOpacity, Image } from 'react-native';

// import Interval from './Interval'         

// //flatList 를 이용한 슬라이드 구성 예제

// //Dimensions를 이용하여 디바이스의 넓이를 구합니다.
// const windowW = Dimensions.get('window').width;

// //디바이스의 넓이에 양쪽으로 24픽셀의 margin을 주기 위해 24*2 했습니다.
// //높이는 황금비율(1.6...)대로 자르기 위해 넓이에 0.4를 곱한 후 정수로 만들기 위해 floor 했습니다.
// const cardSize = { width: windowW - (24 * 2), height: Math.floor(windowW * 0.4) }

// /*
// 임의로 데이터를 만듭니다. * (db나 스토리지에서 가져올 내용일 것이고 db에서가져 온다면 
// useState, useEffect 를 이용해야 합니다.)
// */

// const data = [
//   {
//     title: '제목입니다.1',
//     content: '내용입니다.1 내용입니다. 내용입니다.',
//     img: require('./assets/images/ponyo001.jpg'),
//     date: '2022-09-21'
//   },
//   {
//     title: '제목입니다2.',
//     content: '내용입니다2. 내용입니다. 내용입니다.',
//     img: require('./assets/images/ponyo002.jpg'),
//     date: '2022-09-21'
//   },
//   {
//     title: '제목입니다3.',
//     content: '내용입니다3. 내용입니다. 내용입니다.',
//     img: require('./assets/images/ponyo003.jpg'),
//     date: '2022-09-21'
//   },
//   {
//     title: '제목입니다4.',
//     content: '내용입니다4. 내용입니다. 내용입니다.',
//     img: require('./assets/images/ponyo004.jpg'),
//     date: '2022-09-21'
//   },
//   {
//     title: '제목입니다5.',
//     content: '내용입니다5. 내용입니다. 내용입니다.',
//     img: require('./assets/images/ponyo005.jpg'),
//     date: '2022-09-21'
//   },
//   {
//     title: '제목입니다6.',
//     content: '내용입니다6. 내용입니다. 내용입니다.',
//     img: require('./assets/images/ponyo006.jpg'),
//     date: '2022-09-21'
//   },            
// ]
// export default function App() {
 
//   const [currentIndex, setCurrentIndex ] = useState(0);
//   const flatListRef = useRef(null);

//   /*
//     카드를 슬라이드했을때 정확한 위치에서 정지하도록 위치값을 조정하는 함수를 만듭니다.
//     만든 함수는 매번 계산되지 않도록(한번 계산한 것을 계속 사용하도록) useMemo에 담아 
//     놓습니다.
//   */
//   const offset = cardSize.width + 12;
//   const snapDefaultOffset = useMemo(() => Array.from(Array(data.length)).map((_, index) => index * offset), [data]);
  
//   useEffect(()=>{
//     if(currentIndex !== snapDefaultOffset.length) {
//        flatListRef.current?.scrollToOffset({
//           animated: true,
//           offset: snapDefaultOffset[currentIndex]
//        });
//     }
//   }, [currentIndex, snapDefaultOffset]);

//   Interval(()=>{
//     setCurrentIndex(prev => (prev === snapDefaultOffset.length -1 ? 0 : prev + 1)); //마지막 페이지에 도달하면 첫 페이지로 되돌아 오도록
//   }, 3000);

//   return (
//     <View style={styles.container}>
//       <View style={{marginVertical:50}}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
//          Slide Box
//       </Text>
//       </View>
//       <View style={styles.fcontainer}>
//       <FlatList
//          ref={flatListRef}
//          data={ data } //배열 데이터를 가져옵니다.
//          horizontal  // 가로 슬라이드 세로 슬라이드를 결정합니다.
//          snapToOffsets={snapDefaultOffset}
//          contentContainerStyle={{ paddingHorizontal: 24}} //위에서 셋팅한 24만큼 패딩으로 설정합니다.
//          renderItem={({item})=>(  //data 배열을 item 변수에 담아 하나씩 뿌리면서 콤포넌트를 생성합니다.
//             <View style={[cardSize.width, {marginRight:12}]}>
//                <Image source={item.img} style={cardSize} />
//                <View>
//                   <Text style={{fontSize:18, fontWeight:'bold'}}>
//                      {item.title}
//                   </Text>
//                   <Text style={{fontSize: 16, fontWeight:'normal'}}>
//                       {item.content}
//                   </Text>
//                </View>
//             </View> 
//          )}
//          keyExtractor={(_, index)=>String(index)} //배열이기 때문에 키값을 만들어 주어야 합니다.
//       />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   fcontainer: {
//     width: windowW,
//     backgroundColor: '#fff'
//   }
// });