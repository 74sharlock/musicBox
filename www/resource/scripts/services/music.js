'use strict';

/**
 * @ngdoc service
 * @name musicBoxApp.music
 * @description
 * # music
 * Factory in the musicBoxApp.
 */
app.factory('music', ['api', function (api) {
    return {
        getMusicList:function(song){
            return api.jsonpPromise(api.searchMusic(song));
        },
        getSong:function(songId){
            return api.jsonpPromise(api.getSongSource(songId));
        },
        getLyric:function(songId){
            return api.jsonpPromise(api.getSongLyric(songId));
        }
    };
}]);


