import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  Settings,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { IBookmark } from 'store/ducks/books';

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
  route,
}: NativeStackScreenProps<RootStackParamList, 'ReadingSpace'>) => {
  const accessToken = useSelector(selectors.auth.selectAccessToken);

  const navigation = useNavigation();

  const [pageValue, setPageValue] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageChange, setPageChange] = useState<number>(0);
  const resultId = route.params.bookId;
  const allBooks = useSelector(selectors.books.selectAllBooks);
  const bookmarks = useSelector(selectors.books.selectAllBookmarks);
  const allPages = useSelector(selectors.books.selectAllPages);
  const bookId = allBooks.findIndex(book => book?.bookId === resultId);
  const bookName = allBooks[bookId]?.title;
  const bookmarksId = bookmarks.findIndex(
    (bookmark: IBookmark) => bookmark?.document === bookName,
  );
  const bookmarkJson = bookmarks[bookmarksId]?.bookmarkJSON;

  const dispatch = useDispatch();

  const currentPage = allPages.filter(
    page => page.bookId === route.params.bookId,
  );

  useEffect(() => {
    dispatch(
      actions.books.setLastPage({
        id: route.params.bookId,
        page: pageChange,
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

  const { dirs } = RNFetchBlob.fs;
  // const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

  const document = `${dirs.DocumentDir}/${resultId}.pdf`;

  useEffect(() => {
    if (PDFRef.current !== null) {
      console.log('ref', PDFRef.current);

      (async () => {
        (await PDFRef.current?.isReflowMode()) ||
          (await PDFRef.current?.toggleReflow());

        await PDFRef.current?.getPageCount().then((value: number) => {
          setPageValue(value);
          console.log('value page', value);
          PDFRef.current?.importBookmarkJson(bookmarkJson);
          dispatch(
            actions.books.setPages({
              id: route.params.bookId,
              page: value,
            }),
          );
        });

        if (route.params?.saveNote) {
          PDFRef.current?.importAnnotations(`${route.params?.saveNote}`);
        }

        if (route.params?.saveBookmark) {
          PDFRef.current?.importBookmarkJson(`${route.params?.saveBookmark}`);
        }
      })();
    }
  }, [isLoaded]);

  useEffect(() => {
    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);

    // PDFRef.current?._viewerRef.toggleReflow();
  }, []);

  // useEffect(() => {
  //   PDFRef.current?.toggleReflow();
  // }, [PDFRef]);

  const saveNote = () => {
    PDFRef.current?.exportAnnotations().then(xfdf => {
      dispatch(
        actions.books.setNotes({
          id: route.params.bookId,
          saveNote: `${xfdf}`,
          saveBookmark: '',
        }),
      );
    });
  };

  const saveBookmark = (bookmark: string) => {
    dispatch(
      actions.books.setNotes({
        id: route.params.bookId,
        saveNote: '',
        saveBookmark: `${bookmark}`,
      }),
    );
  };

  const goBookmark = async () => {
    const xfdf = await PDFRef.current?.exportAnnotations().then(xfdf => {
      return xfdf;
    });
    // navigation.setParams({ params: '{selectedStyleIds}' });
    navigation.navigate('TabsNote', {
      notes: xfdf,
      id: route.params.bookId,
      bookName,
    });
  };

  return (
    <>
      <DocumentView
        ref={PDFRef}
        document={document}
        initialPageNumber={route.params?.pageNum || null}
        bottomToolbarEnabled={true}
        onBookmarkChanged={({ bookmarkJson }) => {
          dispatch(
            actions.books.addBookmark({
              bookmark: JSON.parse(bookmarkJson),
              document: bookName,
              bookmarkJSON: bookmarkJson,
              bookId: route.params.bookId,
            }),
          );
        }}
        // onMoveShouldSetResponder={() => setIsModalVisible(!isModalVisible)}
        reflowOrientation={Config.ReflowOrientation.Horizontal}
        // onResponderEnd={() => setIsModalVisible(!isModalVisible)}
        onStartShouldSetResponder={() => setIsModalVisible(!isModalVisible)}
        // onBehaviorActivated={event => console.log('event', event)}
        // onExportAnnotationCommand={({ action, xfdfCommand, annotations }) => {
        //   // console.log('Annotation edit action is', action);
        //   console.log('The exported xfdfCommand is', xfdfCommand);
        //   console.log('annot', annotations)
        //   annotations.forEach(annotation => {
        //     console.log('Annotation id is', annotation.id);
        //     console.log('Annotation pageNumber is', annotation.pageNumber);
        //     console.log('Annotation type is', annotation.type);
        //   });
        // }}
        onDocumentLoaded={() => setIsLoaded(true)}
        // onPageChanged={value => setPageChange(value.pageNumber)}
        // onPageMoved={({ pageNumber }) =>
        //   pageNumber && setPageChange(pageNumber)
        // }
        onPageChanged={({ pageNumber }) =>
          pageNumber && setPageChange(pageNumber)
        }
        pageChangeOnTap={true}
        showQuickNavigationButton={true}
        showLeadingNavButton={true}
        onLeadingNavButtonPressed={() => navigation.goBack()}
        hideAnnotationToolbarSwitcher={true}
        pageIndicatorEnabled={false}
        // topToolbarEnabled={false}
        // hideTopToolbars={false}
        hideScrollbars={false}
        tabletLayoutEnabled
        multiTabEnabled={false}
        padStatusBar={false}
        // hideTopAppNavBar={false}
        // layoutMode={'Single'}
        leadingNavButtonIcon={
          Platform.OS === 'ios'
            ? 'ic_close_black_24px.png'
            : 'ic_arrow_back_white_24dp'
        }
        annotationPermissionCheckEnabled={true}
        // disabledTools={[Config.Tools.annotationCreateLink]}
        // onToolChanged={({ previousTool, tool }) => {
        //   console.log('Tool has been changed from', previousTool, 'to', tool);
        // }}
        // hideViewModeItems={[
        //   Config.ViewModePickerItem.Crop,
        //   Config.ViewModePickerItem.Rotation,
        //   Config.ViewModePickerItem.ColorMode,
        // ]}
        // annotationToolbars={[Config.DefaultToolbars.Annotate, myToolbar]}
        onAnnotationToolbarItemPress={({ id }) => {
          console.log('toolbar item press: ' + id);
          // верхняя панель
        }}
        // hideDefaultAnnotationToolbars={[
        //   Config.DefaultToolbars.Annotate,
        //   Config.DefaultToolbars.Favorite,
        // ]}
        // onAnnotationMenuPress={({ annotationMenu, annotations }) => {
        //   console.log(
        //     'Annotation menu item',
        //     annotationMenu,
        //     'has been pressed',
        //   );
        //   annotations.forEach(annotation => {
        //     console.log('The id of selected annotation is', annotation.id);
        //     console.log(
        //       'The page number of selected annotation is',
        //       annotation.pageNumber,
        //     );
        //     console.log('The type of selected annotation is', annotation.type);
        //     console.log(
        //       'The screenRect of selected annotation is',
        //       annotation.screenRect,
        //     );
        //     console.log(
        //       'The pageRect of selected annotation is',
        //       annotation.pageRect,
        //     );
        //   });
        // }}
        // longPressMenuItems={[
        //   Config.LongPressMenu.copy,
        //   Config.LongPressMenu.read,
        // ]}
        // onLongPressMenuPress={({ longPressMenu, longPressText }) => {
        //   console.log(
        //     'Long press menu item',
        //     longPressMenu,
        //     'has been pressed',
        //   );
        //   if (longPressText !== '') {
        //     console.log('The selected text is', longPressText);
        //   }
        // }}
        // onExportAnnotationCommand={({ action, xfdfCommand, annotations }) => {
        //   console.log('Annotation edit action is', action);
        //   console.log('The exported xfdfCommand is', xfdfCommand);
        //   console.log('Annotation', annotations);
        //   annotations.forEach(annotation => {
        //     console.log('Annotation id is', annotation.id);
        //     // if (!this.state.collabEnabled) {
        //     console.log('Annotation pageNumber is', annotation.pageNumber);
        //     console.log('Annotation type is', annotation.type);
        //     // }
        //   });
        // }}
        // // collabEnabled={this.state.collabEnabled}
        // currentUser={'Pdftron'}
        // onTextSearchResult={({ found, textSelection }) => {
        //   if (found) {
        //     console.log('Found selection on page', textSelection.pageNumber);
        //     for (let i = 0; i < textSelection.quads.length; i++) {
        //       const quad = textSelection.quads[i];
        //       console.log('selection boundary quad', i);
        //       for (const quadPoint of quad) {
        //         console.log(
        //           'A quad point has coordinates',
        //           quadPoint.x,
        //           quadPoint.y,
        //         );
        //       }
        //     }
        //   }
        // }}
        // onBookmarkChanged={({ bookmarkJson }) => {
        //   saveBookmark(bookmarkJson);
        // }}
        onAnnotationMenuPress={() => {
          saveNote();
        }}
        onAnnotationChanged={({ action, annotations }) => {
          saveNote();
          console.log('156156156156', annotations);
          // console.log('156156156156', annotations.content)
          // console.log('Annotation edit action is', action);
          // annotations.forEach(annotation => {
          //   console.log('The id of changed annotation is', annotation.id);
          //   console.log('It is in page', annotation.pageNumber);
          //   console.log('Its type is', annotation.type);
          // });
        }}
      />

      {isModalVisible && (
        <View
          style={[
            styles.topBar,
            { height: insets.top + 44, paddingTop: insets.top },
          ]}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.row}>
            {/*<TouchableOpacity>*/}
            {/*  <SettingsIcon />*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity>*/}
            {/*  <ListIcon />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity onPress={goBookmark}>
              <Bookmark />
            </TouchableOpacity>
            {/*<TouchableOpacity>*/}
            {/*  <Image*/}
            {/*    resizeMode="cover"*/}
            {/*    source={require('../../assets/images/note.png')}*/}
            {/*    style={{ height: 28, width: 28 }}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>
      )}

      {/*{isModalVisible && (*/}
      {/*  <View style={styles.bottomBar}>*/}
      {/*    <Slider*/}
      {/*      value={[pageValue, 300]}*/}
      {/*      // onValueChange={value => setPageValue(value[0])}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*)}*/}
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
    justifyContent: 'flex-end',
  },
});
