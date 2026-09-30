plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}
android {
    namespace = "com.saemi.goalswidget"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.saemi.goalswidget"
        minSdk = 26
        targetSdk = 35
        versionCode = 3
        versionName = "2.1"
    }
    signingConfigs {
        // Same key on every machine/CI run so updates install over the previous APK.
        getByName("debug") {
            val shared = System.getenv("SAEMI_KEYSTORE")?.let { file(it) }
            if (shared != null && shared.exists()) {
                storeFile = shared
                storePassword = "android"
                keyAlias = "androiddebugkey"
                keyPassword = "android"
            }
        }
    }
    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        buildConfig = true
    }
}
dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
}
