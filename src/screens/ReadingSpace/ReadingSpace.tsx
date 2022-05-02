import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  Settings,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Config, DocumentView, RNPdftron } from 'react-native-pdftron';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import RNFetchBlob from 'rn-fetch-blob';
import { Text } from 'components/Text';
import BackButton from 'components/BackButton/BackButton';
import MagazineIcon from 'assets/svg/Magazine';
import Bookmark from 'assets/svg/Bookmark';
import ListIcon from 'assets/svg/ListIcon';
import SettingsIcon from 'assets/svg/Settings';
import { Slider } from '@miblanchard/react-native-slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// function useHookWithRefCallback() {
//   const ref = useRef<DocumentView>(null);

//   const setRef = useCallback(node => {
//     if (ref.current) {
//       // Make sure to cleanup any events/references added to the last instance
//     }

//     if (node) {
//       // Check if a node is actually passed. Otherwise node would be null.
//       // You can now do what you need to, addEventListeners, measure, etc.
//       ref.current?.toggleReflow();
//     }

//     // Save a reference to the node
//     ref.current = node;
//   }, []);

//   return [setRef];
// }

const ReadingSpace = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'ReadingSpace'>) => {
  const accessToken = useSelector(selectors.auth.selectAccessToken);

  const [pageValue, setPageValue] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageChange, setPageChange] =
    useState<{ previousPageNumber: number; pageNumber: number }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.books.setLastPage({
        id: route.params.bookId,
        page: pageChange?.pageNumber || 0,
      }),
    );
  }, [pageChange]);

  const insets = useSafeAreaInsets();
  const PDFRef = useRef<DocumentView>(null);

  // var RNFS = require('react-native-fs');

  const path =
    'https://www.readingsanctuary.com/wp-content/uploads/2018/10/fifty-shades-of-grey.pdf';

  // const getFile = () => {
  //   RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  //     .then((result: { path: any }[]) => {
  //       console.log('GOT RESULT', result);

  //       const resultId = route.params.bookId;

  //       const bookIndex = result.findIndex(book => {
  //         const splitedBook = book.path.split('/');
  //         return splitedBook.includes(resultId + '.pdf');
  //       });

  //       console.log('result[bookIndex].path', result[bookIndex].path);
  //       return result[bookIndex].path;

  //       // stat the first file
  //       return Promise.all([
  //         RNFS.stat(result[bookIndex].path),
  //         result[bookIndex].path,
  //       ]);
  //     })
  //     // .then((statResult: any[]) => {
  //     //   if (statResult[0].isFile()) {
  //     //     // if we have a file, read it
  //     //     return RNFS.readFile(statResult[1], 'utf8');
  //     //   }
  //     //   return 'no file';
  //     // })
  //     // .then((contents: any) => {
  //     //   // log the file contents
  //     //   console.log(contents);
  //     //   setFile(contents);
  //     // })
  //     .catch((err: { message: any; code: any }) => {
  //       console.log(err.message, err.code);
  //     });
  // };

  // const document = 'file:///storage/emulated/0/Download/test.pdf';
  // const document = '/storage/emulated/0/Download/test.pdf';
  const resultId = route.params.bookId;

  const { dirs } = RNFetchBlob.fs;
  // const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

  const document = `${dirs.DocumentDir}/${resultId}.pdf`;

  const elRef = useCallback(
    async node => {
      if (node !== null) {
        console.log('ref', node); // node = elRef.current
        // Config.ReflowOrientation.Vertical;

        // PDFRef.current?.props.fitMode(Config.FitMode.FitWidth);
        PDFRef.current?.isReflowMode();

        // PDFRef.current?.onChange(event => console.log('event', event));

        // node.props.reflowOrientation = 'vertical';

        // PDFRef.current
        //   ?.getPageCount()
        //   .then(value => console.log('value', value));

        // await PDFRef.current?.toggleReflow();

        // node.getPageCount()
        (await node.isReflowMode()) || (await node.toggleReflow());
        await node?.getPageCount().then((value: number) => {
          console.log('value', value);
          dispatch(
            actions.books.setPages({ id: route.params.bookId, page: value }),
          );
        });
        // node.forceUpdate();

        // node.autoResizeFreeTextEnabled(true);
      }
    },
    [isLoaded],
  );

  useEffect(() => {
    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);

    // PDFRef.current?._viewerRef.toggleReflow();
  }, []);

  // useEffect(() => {
  //   PDFRef.current?.toggleReflow();
  // }, [PDFRef]);

  return (
    <>
      <DocumentView
        ref={elRef}
        document={document}
        // bottomToolbarEnabled={false}
        // onMoveShouldSetResponder={() => setIsModalVisible(!isModalVisible)}
        reflowOrientation={Config.ReflowOrientation.Horizontal}
        // onResponderEnd={() => setIsModalVisible(!isModalVisible)}
        // onStartShouldSetResponder={() => setIsModalVisible(!isModalVisible)}
        onBehaviorActivated={event => console.log('event', event)}
        onDocumentLoaded={() => setIsLoaded(true)}
        onPageChanged={value => setPageChange(value)}
        pageChangeOnTap={true}
        // showQuickNavigationButton={true}
        showLeadingNavButton={true}
        onLeadingNavButtonPressed={() => navigation.goBack()}
        hideAnnotationToolbarSwitcher={true}
        pageIndicatorEnabled={false}
        // topToolbarEnabled={false}
        // hideTopToolbars={true}
        hideScrollbars={false}
        tabletLayoutEnabled
        // onBehaviorActivated={event => console.log(event)}
        multiTabEnabled={false}
        // padStatusBar={false}
        // hideTopToolbars={false}
        // hideTopAppNavBar={true}
        // showLeadingNavButton={false}
        // layoutMode={'Single'}
        bottomToolbarEnabled={false}
        leadingNavButtonIcon={
          Platform.OS === 'ios'
            ? 'ic_close_black_24px.png'
            : 'ic_arrow_back_white_24dp'
        }
      />

      {isModalVisible && (
        <View
          style={[
            styles.topBar,
            { height: insets.top + 60, paddingTop: insets.top },
          ]}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.row}>
            <TouchableOpacity>
              <SettingsIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <ListIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <Bookmark />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                resizeMode="cover"
                source={require('../../assets/images/note.png')}
                style={{ height: 28, width: 28 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isModalVisible && (
        <View style={styles.bottomBar}>
          <Slider
            value={[pageValue, 300]}
            // onValueChange={value => setPageValue(value[0])}
          />
        </View>
      )}
    </>
  );
};

export default ReadingSpace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    backgroundColor: '#F7F8F9',
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 94,
    backgroundColor: '#F7F8F9',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
