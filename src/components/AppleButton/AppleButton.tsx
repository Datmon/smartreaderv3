import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useDispatch } from 'react-redux';
import { actions } from 'store';

// async function onAppleButtonPress() {
//   console.warn('Beginning Apple Authentication');

//   // start a login request
//   try {
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });

//     console.log('appleAuthRequestResponse', appleAuthRequestResponse);

//     const {
//       user: newUser,
//       email,
//       nonce,
//       identityToken,
//       realUserStatus /* etc */,
//     } = appleAuthRequestResponse;

//     let user = newUser;

//     if (identityToken) {
//       // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
//       console.log(nonce, identityToken);
//     } else {
//       // no token - failed sign-in?
//     }

//     if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
//       console.log("I'm a real person!");
//     }

//     console.warn(`Apple Authentication Completed, ${user}, ${email}`);
//   } catch (error: any) {
//     if (error.code === appleAuth.Error.CANCELED) {
//       console.warn('User canceled Apple Sign in.');
//     } else {
//       console.error(error);
//     }
//   }
// }

const AppleButton = ({ style, setIsLoading }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);

  async function onAppleButtonPress() {
    setIsLoading(true);
    // performs login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log('appleAuthRequestResponse: ', appleAuthRequestResponse);
        if (appleAuthRequestResponse.email) {
          const res = await dispatch(
            actions.auth.serviceSignUp({
              email: appleAuthRequestResponse.email,
              username: appleAuthRequestResponse.email.split('@')[0],
            }),
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const { AppleButtonLabel } = useTranslation();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => onAppleButtonPress()}>
      <Image
        source={require('../../assets/images/apple.png')}
        style={styles.image}
      />
      <Text text={AppleButtonLabel} />
    </TouchableOpacity>
  );
};

export default AppleButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    height: 56,
    flexDirection: 'row',
  },
  image: {
    height: 20,
    resizeMode: 'contain',
    marginBottom: 5,
    marginHorizontal: 6,
  },
});
