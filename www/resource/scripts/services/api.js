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

        searchMusic:function(songName){
            //return 'http://apis.baidu.com/geekery/music/query?apikey=4c575eceb45122c79beeed48908cb5fa&s=' + songName + '&limit=' + pageSize + '&p=' + pageIndex;
            return 'http://tingapi.ting.baidu.com/v1/restserver/ting?' +
                'from=webapp_music' +
                '&method=baidu.ting.search.catalogSug' +
                '&format=json' +
                '&callback=JSON_CALLBACK' +
                '&query=' + encodeURIComponent(songName) +
                '&_=1413017198449';
        },

        getSongSource:function(songId){
            return 'http://tingapi.ting.baidu.com/v1/restserver/ting?' +
                'from=webapp_music' +
                '&method=baidu.ting.song.playAAC' +
                '&songid='+ songId +
                '&format=json' +
                '&callback=JSON_CALLBACK' +
                '&_=' + new Date().getTime();   //baidu.ting.song.play
        }
    }
}]);

