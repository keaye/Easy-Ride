// Import Firebase
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;

// In getPackages method, if auto-linking isn't working:
@Override
protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // Manual linking if necessary
    // packages.add(new ReactNativeFirebaseAppPackage());
    return packages;
}