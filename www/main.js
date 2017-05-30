/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

"use strict"

var errorElement = document.querySelector("#errorMsg")
var video = document.querySelector("video")

// Put variables in global scope to make them available to the browser console.
var constraints = (window.constraints = {
  audio: false,
  video: true
})

function handleSuccess(stream) {
  //var videoTracks = stream.getVideoTracks()
  stream.oninactive = function() {
    console.log("Stream inactive")
  }
  video.src = URL.createObjectURL(stream);
}

function handleError(error) {
  console.error("getUserMedia error: " + error.name, error)
}

var toggleCount = 0;

function toggle() {
  var targetDevice = "com.apple.avfoundation.avcapturedevice.built-in_video:" + (toggleCount % 2 ? 1 : 0);
  navigator.mediaDevices.getUserMedia(Object.assign({}, constraints, { video: { deviceId: targetDevice } })).then(handleSuccess).catch(handleError);
  toggleCount++;
}
