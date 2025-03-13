plugins {
  id("com.android.application")

  // Add the Google services Gradle plugin
  id("com.google.gms.google-services")

  ...
}

dependencies {
  // Import the Firebase BoM
  implementation(platform("com.google.firebase:firebase-bom:33.10.0"))


  // TODO: Add the dependencies for Firebase products you want to use
  // When using the BoM, don't specify versions in Firebase dependencies
  implementation("com.google.firebase:firebase-analytics")
  implementation project(':@react-native-google-signin_google-signin')
  implementation 'com.google.android.gms:play-services-auth:19.0.0' 

  // Add the dependencies for any other desired Firebase products
  // https://firebase.google.com/docs/android/setup#available-libraries
}



buildscript {
    // ...
    dependencies {
        // ...
        classpath 'com.google.gms:google-services:4.3.15'  // Use the latest version
    }
}


apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'  // Add this line if missing