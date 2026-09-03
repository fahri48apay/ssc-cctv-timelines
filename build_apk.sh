#!/bin/bash
cd /data/data/com.termux/files/home/Timelines
npm run build
rm -rf /data/data/com.termux/files/home/Timelines/android-wrapper/app/src/main/assets/www/*
cp -r dist/* /data/data/com.termux/files/home/Timelines/android-wrapper/app/src/main/assets/www/

proot-distro login ubuntu -- bash -c "
  export JAVA_HOME=/data/data/com.termux/files/usr/lib/jvm/java-17-openjdk
  export PATH=\$JAVA_HOME/bin:\$PATH
  cd /data/data/com.termux/files/home/Timelines/android-wrapper
  gradle assembleDebug --no-daemon
"

if [ -f /data/data/com.termux/files/home/Timelines/android-wrapper/app/build/outputs/apk/debug/app-debug.apk ]; then
  mv /data/data/com.termux/files/home/Timelines/android-wrapper/app/build/outputs/apk/debug/app-debug.apk /data/data/com.termux/files/home/Downloads/SSC_CCTV_Timelines.apk
  echo "✅ APK Berhasil dibuat! Lokasi: ~/Downloads/SSC_CCTV_Timelines.apk"
  am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///storage/emulated/0/Download/SSC_CCTV_Timelines.apk
else
  echo "❌ Build Gagal"
fi
