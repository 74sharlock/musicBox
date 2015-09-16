'use strict';

/**
 * @ngdoc directive
 * @name musicBoxApp.directive:musicBox
 * @description
 * # musicBox
 */
app.directive('musicBox', ['music', '$compile', function (music, $compile) {

    return {
        templateUrl: '/resource/views/musicBox.html',
        replace:true,
        restrict: 'E',
        link: function postLink(scope, element, attrs) {

            var audioNode = element.find('audio')[0];

            scope.musicModel = {};

            scope.searchSongs = function(){
                music.getMusicList(scope.musicModel.keywords).success(function(data){
                    scope.songs = data.song;
                });
            };

            scope.enterSearch = function($event){
                if($event.keyCode === 13){
                    scope.searchSongs();
                }
            };

            scope.play = function(id){

                if(scope.currentPlayId !== id){
                    scope.currentPlayId = id;
                    music.getSong(id).success(function(data){
                        audioNode.oncanplay = function(){
                            audioNode.play();
                        };
                        audioNode.onerror = function(e){
                            console.log(e);
                        };
                        audioNode.src = '/song/' + encodeURIComponent(data.bitrate.file_link); //'/resource/a.mp3';
                    });
                } else {
                    audioNode.play();
                }
            };

            scope.pause = function(){
                audioNode.pause();
            };

            scope.showLyric = function(songId){
                if(scope.currentPlayId !== songId){
                    music.getLyric(songId).success(function(data){
                        if(data.error_code){
                            alert('该音乐资源暂时没有歌词...');
                        } else {
                            scope.musicModel.wannerSeeLyric = true;
                            scope.currentLyric = data;
                        }
                    });
                }
            };

            scope.closeLyricWindow = function(){
                scope.musicModel.wannerSeeLyric = false;
            };


        }
    };
}]);

