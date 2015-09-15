'use strict';

/**
 * @ngdoc directive
 * @name musicBoxApp.directive:musicBox
 * @description
 * # musicBox
 */
app.directive('musicBox', ['music', function (music) {

    return {
        template: '<div class="music box">' +
        '<div class="ui icon input"><input type="text" placeholder="Search..." ng-model="musicModel.keywords" ng-keyup="enterSearch($event)"><i class="inverted circular search link icon red" ng-click="searchSongs()"></i>' +
        '</div>' +
        '<div class="ui icon buttons right floated">' +
        '<a class="ui button blue" title="顺序播放" ng-click="musicModel.loop=\'list\'" ng-class="{\'active\':musicModel.loop==\'list\'}"><i class="icon recycle"></i></a>'+
        '<a class="ui button green" title="单曲循环" ng-click="musicModel.loop=\'single\'" ng-class="{\'active\':musicModel.loop==\'single\'}"><i class="icon repeat"></i></a>'+
        '<a class="ui button red" title="随机播放" ng-click="musicModel.loop=\'random\'" ng-class="{\'active\':musicModel.loop==\'random\'}"><i class="icon random"></i></a>'+
        '</div>' +
        '<div class="ui middle aligned selection list">' +
        '    <div class="item" ng-repeat="song in songs">' +
        '        <div class="content">' +
        '            <div class="header" title="{{song.songname}}-{{song.artistname || \'未知歌手\'}}">' +
        '<span>{{song.songname}}-{{song.artistname || \'未知歌手\'}}</span>' +
        '<div class="ui icon buttons mini right floated">' +
        '<button class="ui button" title="播放" ng-click="play(song.songid)"><i class="sound icon"></i></button>' +
        '<button class="ui button" title="暂停" ng-click="pause()"><i class="pause icon"></i></button>' +
        '<button class="ui button" title="歌词"><i class="send icon"></i></button>' +
        '</div>' +
        '</div>' +
        '<div class="sub title"></div>'+
        '<div class="actions"></div>'+
        '    </div>' +
        '</div>'+
        '<audio controls></audio>' +
        '</div>',
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
            }


        }
    };
}]);

