
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
// import { toastEnter } from '../animation/toast/toast.module';
// import { customAlertEnter } from '../animation/alert/alert.module';
import { Validator } from '../validator';

const errorMessages = {
  // Alert Provider
  // This is the provider class for most of the success and error messages in the app.
  // i control the all alert in this content 
  // Firebase Error Messages
  // for the error connection failed
  connectionFailed: {
    header: "Connection failed",
    message: "A network error such as timeout, interrupted connection or unreachable."
  },
  googlepop: {
    header: "failed",
    message: "The popup has been closed by the user before finalizing the"
  },

  accountExistsWithDifferentCredential: {
    header: "Account Exists!",
    message: "An account with the same credential already exists."
  },
  invalidCredential: {
    header: "Invalid Credential!",
    message: "An error occured logging in with this credential."
  },
  operationNotAllowed: {
    header: "Login Failed!",
    message:
      "Logging in with this provider is not allowed! Please contact support."
  },

  invalidCharsName: Validator.profileNameValidator.patternError,
  nameTooShort: Validator.profileNameValidator.lengthError,
  changeEmail: {
    header: "Change Email Failed!",
    message:
      "Sorry, but we've encountered an error changing your email address."
  },
  passwordTooShort: Validator.profilePasswordValidator.lengthError,
  invalidCharsPassword: Validator.profilePasswordValidator.patternError,
  passwordsDoNotMatch: {
    header: "Change Password Failed!",
    message: "Sorry, but the passwords you entered do not match."
  },
  userNotFound: {
    header: "Account Not Found",
    message: "Sorry, but an account with this credential could not be found."
  },
  userDisable: {
    header: "Account Disabled!",
    message: "Logging in with this provider is not allowed! Please contact support."
  },
  wrongPassword: {
    header: "Incorrect Password!",
    message: "Sorry, but the password you have entered is incorrect."
  },
  invalidEmail: {
    header: "Invalid Email!",
    message: "Sorry, but you have entered an invalid email address."
  },
  emailAlreadyInUse: {
    header: "Email Not Available!",
    message: "Sorry, but this email is already in use."
  },
  weakPassword: {
    header: "Weak Password!",
    message: "Sorry, but you have entered a weak password."
  },
  requiresRecentLogin: {
    header: "Credential Expired!",
    message: "Sorry, but this credential has expired! Please login again."
  },
  userMismatch: {
    header: "User Mismatch!",
    message: "Sorry, but this credential is for another user!"
  },
  providerAlreadyLinked: {
    header: "Already Linked!",
    message: "Sorry, but your account is already linked to this credential."
  },
  credentialAlreadyInUse: {
    header: "Credential Not Available!",
    message: "Sorry, but this credential is already used by another user."
  },
  usernameExists: {
    header: "Username Already Exists",
    message: "Sorry, but this username is already taken by another user. "
  },
  // Group Error Messages
  groupUpdate: {
    header: "Update Group Failed!",
    message: "Sorry, but we've encountered an error updating this group."
  },
  groupLeave: {
    header: "Leave Group Failed!",
    message: "Sorry, but you've encountered an error leaving this group."
  },
  groupDelete: {
    header: "Delete Group Failed!",
    message: "Sorry, but we've encountered an error deleting this group."
  },
  updateProfile: {
    header: "Update Profile Failed",
    message: "Sorry, but we'va encountered an error updating your profile. "
  },



};

const successMessages = {

  passwordResetSent: {
    header: "Password Reset Sent!",
    message: "A password reset email has been sent to: "
  },
  emailVerified: {
    header: "Email Confirmed!",
    message: "Congratulations! Your email has been confirmed!"
  },
  emailVerificationSent: {
    header: "Email Confirmation Sent!",
    message: "An email confirmation has been sent to: "
  },
  accountDeleted: {
    header: "Account Deleted!",
    message: "Your account has been successfully deleted."
  },
  passwordChanged: {
    header: "Password Changed!",
    message: "Your password has been successfully changed."
  },
  friendRequestSent: {
    header: "Friend Request Sent!",
    message: "Your friend request has been successfully sent!"
  },
  friendRequestRemoved: {
    header: "Friend Request Deleted!",
    message: "Your friend request has been successfully deleted."
  },
  groupUpdated: {
    header: "Group Updated!",
    message: "This group has been successfully updated!"
  },
  groupLeft: {
    header: "Leave Group",
    message: "You have successfully left this group."
  }

};


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert;
  private toast;


  constructor(public alertCtrl: AlertController,
    public toastCtrl: ToastController) { }

  // Show password reset sent
  async showPasswordResetMessage(email) {
    const alert = await this.alertCtrl.create({
      header: successMessages.passwordResetSent["header"],
      message: successMessages.passwordResetSent["message"] + email,
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    })
    await alert.present();
  }

  /// show email verifies and redirect to home
  async showEmailVerifiedMessageAndRedirect() {
    const alert = await this.alertCtrl.create({
      header: successMessages.emailVerified["header"],
      message: successMessages.emailVerified["message"],
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    })
    await alert.present();
  }
  // show email verifield sent 
  async showEmailVerificationSentMessage() {
    const alert = await this.alertCtrl.create({
      header: successMessages.emailVerificationSent["header"],
      message: successMessages.emailVerificationSent["message"],
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    })
    await alert.present();
  }

  // show account deleted
  async showAccountDeletedMessage() {
    const alert = await this.alertCtrl.create({
      header: successMessages.accountDeleted["header"],
      message: successMessages.accountDeleted["message"],
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    })
    await alert.present();
  }

  //show password change message
  async showPasswordChangedMessage() {
    const alert = await this.alertCtrl.create({
      header: successMessages.passwordChanged["header"],
      message: successMessages.passwordChanged["message"],
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    });
    await alert.present();
  }


  //show alert 
  async showAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    })
    await alert.present();
  }

  async showJSON(header, json) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: JSON.stringify(json, null, 2),
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    })
    await alert.present();
  }

  //show friend request sent
  async showFriendRequestSent() {
    const alert = await this.alertCtrl.create({
      header: successMessages.friendRequestSent["header"],
      message: successMessages.friendRequestSent["message"],
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    });
    await alert.present();
  }

  // show friend request remove
  async showFriendRequestRemoved() {
    const alert = await this.alertCtrl.create({
      header: successMessages.friendRequestRemoved["header"],
      message: successMessages.friendRequestRemoved["message"],
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    });
    await alert.present();
  }

  // show group updated
  async showGroupUpdatedMessage() {
    const alert = await this.alertCtrl.create({
      header: successMessages.groupUpdated["header"],
      message: successMessages.groupUpdated["message"],
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    });
    await alert.present();
  }

  // Show error messages depending on the code
  // If you added custom error codes on top, make sure to add a case block for it.
  async showErrorMessage(code) {
    // const alertController = document.querySelector('ion-alert-controller');
    // await alertController.componentOnReady();
    switch (code) {
      //firebase error messages
      case "auth/account-exists-with-different-credential":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.accountExistsWithDifferentCredential["header"],
          message: errorMessages.accountExistsWithDifferentCredential["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;
      case "profile/error-update-profile":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.updateProfile["header"],
          message: errorMessages.updateProfile["message"],
          buttons: ["OK"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;
      case "profile/invalid-chars-password":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.invalidCharsName["header"],
          message: errorMessages.invalidCharsName["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;
      case "profile/name-too-short":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.nameTooShort["header"],
          message: errorMessages.nameTooShort["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;
      case "profile/passwords-do-not-match":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.passwordsDoNotMatch["header"],
          message: errorMessages.passwordsDoNotMatch["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "profile/error-change-email":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.changeEmail["header"],
          message: errorMessages.changeEmail["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/invalid-credential":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.invalidCredential["header"],
          message: errorMessages.invalidCredential["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/operation-not-allowed":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.operationNotAllowed["header"],
          message: errorMessages.operationNotAllowed["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/user-disabled":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.userDisable["header"],
          message: errorMessages.userDisable["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/user-not-found":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.userNotFound["header"],
          message: errorMessages.userNotFound["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/wrong-password":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.wrongPassword["header"],
          message: errorMessages.wrongPassword["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/invalid-email":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.invalidEmail["header"],
          message: errorMessages.invalidEmail["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/email-already-in-use":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.emailAlreadyInUse["header"],
          message: errorMessages.emailAlreadyInUse["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/weak-password":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.weakPassword["header"],
          message: errorMessages.weakPassword["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/requires-recent-login":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.requiresRecentLogin["header"],
          message: errorMessages.requiresRecentLogin["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/user-mismatch":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.userMismatch["header"],
          message: errorMessages.userMismatch["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/provider-already-linked":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.providerAlreadyLinked["header"],
          message: errorMessages.providerAlreadyLinked["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "auth/credential-already-in-use":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.credentialAlreadyInUse["header"],
          message: errorMessages.credentialAlreadyInUse["message"],
          buttons: ['Ok'],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;
      case "profile/error-same-username":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.usernameExists["header"],
          message: errorMessages.usernameExists["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;
      case "group/error-update-group":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.groupUpdate["header"],
          message: errorMessages.groupUpdate["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "group/error-leave-group":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.groupLeave["header"],
          message: errorMessages.groupLeave["message"],
          buttons: ["Ok"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;

      case "group/error-delete-group":
        this.alert = await this.alertCtrl.create({
          header: errorMessages.groupDelete["header"],
          message: errorMessages.groupDelete["message"],
          buttons: ["OK"],
          // enterAnimation: customAlertEnter
        });
        this.alert.present();
        break;
      case "auth/network-request-failed":
        this.toast = await this.toastCtrl.create({
          message: errorMessages.connectionFailed["message"],
          duration: 3000,
          // enterAnimation: toastEnter,
          // showCloseButton: true,
          position: 'top'
        })
        this.toast.present();
        break;
      case "auth/popup-closed-by-user":
        this.toast = await this.toastCtrl.create({
          message: errorMessages.googlepop["message"],
          duration: 3000,
          // enterAnimation: toastEnter,
          // showCloseButton: true,
          position: 'top'
        })
        this.toast.present();
        break;
    }
  }
}
