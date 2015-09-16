'use strict';

/**
 * @ngdoc service
 * @name musicBoxApp.api
 * @description
 * # api
 * Factory in the musicBoxApp.
 */

app.factory('api',['$http', '$q', function($http, $q){

    var postPromise = function(url, params){
        var d = $q.defer();
        $http.post(url,params).success(function(data){
            d.resolve(data);
        })
            .error(function(data){
                d.reject(data);
            });
        return d.promise;
    };

    var jsonpPromise = function(url){
        return $http.jsonp(url);
    };

    var getPromise = function(url){
        return $http.get(url);
    };

    return {

        postPromise : postPromise,
        jsonpPromise : jsonpPromise,
        getPromise : getPromise,

        MusicApi:function(json){

            var url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?',
                from = '&from=' + (json.from || 'webapp_music'),
                method ='&method=' + (json.method || ''),
                format = '&format=' + (json.format || 'json'),
                callback = '&callback=' + (json.callback || 'JSON_CALLBACK'),
                query = json.query ? '&query=' + json.query : '',
                songId = json.songId ? '&songid='+ json.songId : '',
                time = '&_=' + new Date().getTime();

            return url + from + method + callback + query + songId + time;
        },

        searchMusic:function(songName){
            return this.MusicApi({method:'baidu.ting.search.catalogSug', query: encodeURIComponent(songName)});
        },

        getSongSource:function(songId){
            return this.MusicApi({method:'baidu.ting.song.playAAC', songId: songId});
        },

        getSongLyric:function(songId){
            return this.MusicApi({method:'baidu.ting.song.lry', songId: songId});
        }
    }
}]);

