/*! For license information please see hls_video.js.LICENSE.txt */
(()=>{
  var t = {
    355: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        default: ()=>n
      });
      var i = r(1);
      null == i.default.engines && (i.default.engines = {});
      const n = function(t, e) {
        i.default.engines[t] = e
      }
    }
    ,
    324: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        setup: ()=>h,
        teardown: ()=>g
      });
      var i = r(325)
        , n = r.n(i)
        , a = r(1)
        , s = a.default.lib("utilities/cacheable")
        , o = s.makeCacheable
        , l = s.uncacheNamespace
        , u = s.makeNamespace
        , d = a.default.lib("utilities/legacyLocalstorage").setOrGet
        , c = o("bandwidth_tracking")
        , f = u("bandwidth_tracking")
        , h = function(t) {
        var e = t.hls
          , r = c(t, "persistBandwidthEstimate", (function() {
          return function() {
            var t = e.abrController.getEstimate ? e.abrController.getEstimate() : e.abrController.bwEstimator.getEstimate();
            d("hls.bandwidth_estimate", t)
          }
        }
        ));
        e.off(n().Events.FRAG_LOADED, r),
        e.on(n().Events.FRAG_LOADED, r)
      }
        , g = function(t) {
        f(t).persistBandwidthEstimate && t.hls && t.hls.off(n().Events.FRAG_LOADED, f(t).persistBandwidthEstimate),
        l("bandwidth_tracking", t)
      }
    }
    ,
    336: (t,e,r)=>{
      "use strict";
      function i(t, e) {
        for (var r, i = 0; i < e.length; i++)
          (r = e[i]).enumerable = r.enumerable || !1,
          r.configurable = !0,
          "value"in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
      }
      r.r(e),
      r.d(e, {
        default: ()=>n
      });
      const n = function() {
        function t() {
          !function(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function")
          }(this, t)
        }
        return e = t,
        n = [{
          key: "isBuffered",
          value: function(e, r) {
            try {
              if (e)
                for (var i = t.getBuffered(e), n = 0; n < i.length; n++)
                  if (r >= i.start(n) && r <= i.end(n))
                    return !0
            } catch (t) {}
            return !1
          }
        }, {
          key: "bufferInfo",
          value: function(e, r, i) {
            try {
              if (e) {
                var n, a = t.getBuffered(e), s = [];
                for (n = 0; n < a.length; n++)
                  s.push({
                    start: a.start(n),
                    end: a.end(n)
                  });
                return this.bufferedInfo(s, r, i)
              }
            } catch (t) {}
            return {
              len: 0,
              start: r,
              end: r,
              nextStart: void 0
            }
          }
        }, {
          key: "bufferedInfo",
          value: function(t, e, r) {
            t.sort((function(t, e) {
              var r = t.start - e.start;
              return r || e.end - t.end
            }
            ));
            var i = [];
            if (r)
              for (var n, a = 0; a < t.length; a++)
                if (n = i.length) {
                  var s = i[n - 1].end;
                  t[a].start - s < r ? t[a].end > s && (i[n - 1].end = t[a].end) : i.push(t[a])
                } else
                  i.push(t[a]);
            else
              i = t;
            for (var o, l = 0, u = e, d = e, c = 0; c < i.length; c++) {
              var f = i[c].start
                , h = i[c].end;
              if (e + r >= f && e < h)
                u = f,
                l = (d = h) - e;
              else if (e + r < f) {
                o = f;
                break
              }
            }
            return {
              len: l,
              start: u || 0,
              end: d || 0,
              nextStart: o
            }
          }
        }, {
          key: "getBuffered",
          value: function(t) {
            try {
              return t.buffered
            } catch (t) {
              return {
                length: 0,
                start: function() {
                  return 0
                },
                end: function() {
                  return 0
                }
              }
            }
          }
        }, {
          key: "lastBufferedTime",
          value: function(t, e) {
            return t ? this.bufferInfo(t, t.currentTime || 0, e).end : 0
          }
        }, {
          key: "timeBeforeEndOfBuffer",
          value: function(t, e) {
            var r = t && t.currentTime || 0;
            return this.lastBufferedTime(t, e) - r
          }
        }],
        (r = null) && i(e.prototype, r),
        n && i(e, n),
        t;
        var e, r, n
      }()
    }
    ,
    335: (t,e,r)=>{
      "use strict";
      function i(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      function n(t, e) {
        for (var r, i = 0; i < e.length; i++)
          (r = e[i]).enumerable = r.enumerable || !1,
          r.configurable = !0,
          "value"in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
      }
      r.r(e),
      r.d(e, {
        default: ()=>a
      });
      const a = function() {
        function t(e) {
          var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0
            , n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
          i(this, t),
          this.halfLife = e,
          this.alpha_ = e ? Math.exp(Math.log(.5) / e) : 0,
          this.estimate_ = r,
          this.totalWeight_ = n
        }
        return e = t,
        (r = [{
          key: "sample",
          value: function(t, e) {
            var r = Math.pow(this.alpha_, t);
            this.estimate_ = e * (1 - r) + r * this.estimate_,
            this.totalWeight_ += t
          }
        }, {
          key: "getTotalWeight",
          value: function() {
            return this.totalWeight_
          }
        }, {
          key: "getEstimate",
          value: function() {
            if (this.alpha_) {
              var t = 1 - Math.pow(this.alpha_, this.totalWeight_);
              if (t)
                return this.estimate_ / t
            }
            return this.estimate_
          }
        }]) && n(e.prototype, r),
        a && n(e, a),
        t;
        var e, r, a
      }()
    }
    ,
    332: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        default: ()=>g
      });
      var i = r(325)
        , n = r.n(i);
      function a(t, e) {
        for (var r, i = 0; i < e.length; i++)
          (r = e[i]).enumerable = r.enumerable || !1,
          r.configurable = !0,
          "value"in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
      }
      function s(t, e, r) {
        return (s = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, r) {
          var i = function(t, e) {
            for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = d(t)); )
              ;
            return t
          }(t, e);
          if (i) {
            var n = Object.getOwnPropertyDescriptor(i, e);
            return n.get ? n.get.call(r) : n.value
          }
        }
        )(t, e, r || t)
      }
      function o(t, e) {
        return (o = Object.setPrototypeOf || function(t, e) {
          return t.__proto__ = e,
          t
        }
        )(t, e)
      }
      function l(t) {
        var e = function() {
          if ("undefined" == typeof Reflect || !Reflect.construct)
            return !1;
          if (Reflect.construct.sham)
            return !1;
          if ("function" == typeof Proxy)
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
            ))),
            !0
          } catch (t) {
            return !1
          }
        }();
        return function() {
          var r, i = d(t);
          if (e) {
            var n = d(this).constructor;
            r = Reflect.construct(i, arguments, n)
          } else
            r = i.apply(this, arguments);
          return u(this, r)
        }
      }
      function u(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? function(t) {
          if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t
        }(t) : e
      }
      function d(t) {
        return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
      }
      var c = r(1).default.lib("utilities/core")
        , f = (c.base64Encode,
      c.base64Decode)
        , h = "data:application/x-mpegURL;base64,";
      const g = function(t) {
        function e(t) {
          var r;
          return function(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function")
          }(this, e),
          (r = u.call(this, t)).log = t.debug,
          t && t.getFragFromCache && (r.getFragFromCache = t.getFragFromCache),
          t && t.getM3u8FromCache && (r.getM3u8FromCache = t.getM3u8FromCache),
          t && t.callbackOnFragmentProgress && (r.callbackOnFragmentProgress = t.callbackOnFragmentProgress),
          r
        }
        !function(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }),
          e && o(t, e)
        }(e, t);
        var r, i, n, u = l(e);
        return r = e,
        (i = [{
          key: "load",
          value: function(t, r, i) {
            if ("manifest" === t.type && t.url && 0 === t.url.indexOf(h)) {
              var n = t.url.replace(h, "")
                , a = f(n);
              setTimeout((function() {
                var e = {
                  url: t.url,
                  data: a
                };
                i.onSuccess(e, {
                  aborted: !1,
                  loaded: 0,
                  total: 0,
                  chunkCount: 0,
                  bwEstimate: 0,
                  loading: {
                    start: 0,
                    end: 0,
                    first: 0
                  },
                  parsing: {
                    start: 0,
                    end: 0
                  },
                  buffering: {
                    start: 0,
                    end: 0,
                    first: 0
                  },
                  retry: 0
                }, t)
              }
              ), 0)
            } else {
              if ("level" === t.type) {
                if (this.getM3u8FromCache) {
                  var o = this.getM3u8FromCache(t.url);
                  if (o) {
                    var l = o.event
                      , u = o.stats;
                    return void setTimeout((function() {
                      i.onSuccess(l, u, t)
                    }
                    ), 0)
                  }
                }
                var c = i.onSuccess;
                return i.onSuccess = function(t, e, r) {
                  c && c(t, e, r)
                }
                ,
                void s(d(e.prototype), "load", this).call(this, t, r, i)
              }
              if (null == t.type) {
                var g = this.getFragFromCache(t.url, t.rangeStart, t.rangeEnd);
                if (g) {
                  var v = g.event
                    , m = g.stats;
                  return void setTimeout((function() {
                    i.onProgress(m, t, v.data),
                    i.onSuccess(v, m, t)
                  }
                  ), 0)
                }
              }
              s(d(e.prototype), "load", this).call(this, t, r, i)
            }
          }
        }]) && a(r.prototype, i),
        n && a(r, n),
        e
      }(n().DefaultConfig.loader)
    }
    ,
    326: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        setup: ()=>g,
        teardown: ()=>m
      });
      var i = r(325)
        , n = r.n(i)
        , a = r(1)
        , s = r(327)
        , o = (a.default,
      a.default.lib("utilities/wlog").wlog.getPrefixedFunctions("hls_video"))
        , l = a.default.lib("utilities/cacheable")
        , u = l.makeCacheable
        , d = l.uncacheNamespace
        , c = l.makeNamespace
        , f = u("dynamic_max_max_buffer")
        , h = c("dynamic_max_max_buffer")
        , g = function(t) {
        var e = t.hls
          , r = f(t, "onFragLoaded", (function() {
          return function() {
            v(t)
          }
        }
        ));
        e.off(n().Events.FRAG_LOADED, r),
        e.on(n().Events.FRAG_LOADED, r)
      }
        , v = function(t) {
        var e = t.hls;
        t.attributes.maxMaxBufferLength && (e.config.maxMaxBufferLength = t.attributes.maxMaxBufferLength);
        var r = (0,
        s.levelToAsset)(t, e.currentLevel);
        r && r.metadata && e.abrController.getEstimate() * e.config.abrBandWidthFactor < 8 * r.metadata.max_bitrate && (0 <= e.manualLevel || 0 === e.currentLevel ? (o.info("set maxMaxBufferLength", t.getDuration()),
        e.config.maxMaxBufferLength = t.getDuration()) : (o.info("set maxMaxBufferLength", 60),
        e.config.maxMaxBufferLength = 60))
      }
        , m = function(t) {
        h(t).onFragLoaded && t.hls && t.hls.off(n().Events.FRAG_LOADED, h(t).onFragLoaded),
        d("dynamic_max_max_buffer", t)
      }
    }
    ,
    329: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        setup: ()=>p,
        teardown: ()=>C
      });
      var i = r(325)
        , n = r.n(i)
        , a = r(1).default
        , s = a.lib("player/lib/timeout-utils").doTimeout
        , o = a.lib("utilities/obj")
        , l = a.lib("utilities/wlog").wlog
        , u = a.lib("utilities/metrics")
        , d = a.lib("utilities/cacheable")
        , c = d.makeCacheable
        , f = d.uncacheNamespace
        , h = d.makeNamespace
        , g = c("error_handling")
        , v = h("error_handling")
        , m = l.getPrefixedFunctions("hls error_handling")
        , p = ((0,
      a.lib("utilities/detect").cachedDetect)(),
      function(t) {
        var e = g(t, "onError", (function() {
          return function(e, r) {
            y(t, e, r)
          }
        }
        ));
        t.hls.on(n().Events.ERROR, e);
        var r = g(t, "onEmergencyAbortLoad", (function() {
          return function() {
            A(t)
          }
        }
        ));
        t.hls.on(n().Events.FRAG_LOAD_EMERGENCY_ABORTED, r)
      }
      )
        , y = function(t, e, r) {
        r.fatal ? E(t, e, r) : b(t, e, r)
      }
        , E = function(t, e, r) {
        var i = t.hls
          , a = t.attributes;
        switch (r.type) {
        case n().ErrorTypes.NETWORK_ERROR:
          l.info("hlsjsplugin - Fatal network error encountered, try to recover"),
          i.startLoad(),
          A(t);
          break;
        case n().ErrorTypes.MEDIA_ERROR:
          l.info("hlsjsplugin - Fatal media error encountered, try to recover"),
          v(t).countedRecoverMediaError || (v(t).countedRecoverMediaError = !0,
          S(t, "player/hls/recover_media_error")),
          t.isChangingVideo() || "bufferStalledError" !== r.details || i.startLoad(),
          m.error("trying to recover from media error...");
          var o = t.getCurrentTime();
          i.recoverMediaError();
          var u = null == a.bufferStallRecoveryTimeout ? 1e3 : a.bufferStallRecoveryTimeout;
          s("".concat(t.uuid, ".nudge_if_not_playing"), (function() {
            "playing" === t.getPlaybackMode() ? t.getCurrentTime() !== o && m.error("video is playing; recoverMediaError() succeeded") : (m.error("trying to nudge 0.5 seconds..."),
            t.seek(t.getCurrentTime() + .5).then((function() {
              t.play()
            }
            )))
          }
          ), u);
          break;
        default:
          S(t, "player/hls/fatal", 1, {
            at: t.getCurrentTime(),
            data: r
          }),
          l.info("hlsjsplugin - Fatal error - cannot recover", e, r),
          i.destroy()
        }
      }
        , b = function(t, e, r) {
        t.hls,
        t.attributes;
        l.info("hlsjsplugin - Non fatal error encountered", r),
        "bufferSeekOverHole" === r.details ? L(t, "player/hls/buffer_seek_over_hole", {
          hole: r.hole
        }) : "bufferStalledError" === r.details ? 0 < t.getCurrentTime() && L(t, "player/hls/buffer_stalled") : "internalException" === r.details ? L(t, "player/hls/non-fatal/".concat(r.details), {
          errorDetails: r
        }) : L(t, "player/hls/non-fatal/".concat(r.details))
      }
        , T = [100, 500, 1500, 3e3, 6e3]
        , A = function(t) {
        for (var e, r = function() {
          var e = t.hls;
          e && e.startLoad()
        }, i = 0; i < T.length; i++)
          e = T[i],
          s("".concat(t.uuid, ".hls.start_load_on_stall_").concat(e), r, e)
      }
        , S = function(t, e, r) {
        r = R(t, o.merge({
          at: t.getCurrentTime()
        }, r)),
        u.count(e, 1, r),
        D(t, e)
      }
        , L = function(t, e, r) {
        k(t, e) || S(t, e, r)
      }
        , k = function(t, e) {
        return _(t),
        !0 === v(t).metricsCounted[e]
      }
        , D = function(t, e) {
        _(t),
        v(t).metricsCounted[e] = !0
      }
        , _ = function(t) {
        null == v(t).metricsCounted && (v(t).metricsCounted = {})
      }
        , R = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
          , r = {
          hlsVideo: t.diagnosticData()
        };
        return r.locationHref = location.href,
        top !== self && (r.referrer = document.referrer,
        r.inIframe = !0),
        o.merge(r, e)
      }
        , C = function(t) {
        v(t).onError && t.hls && t.hls.off(n().Events.ERROR, v(t).onError),
        v(t).onEmergencyAbortLoad && t.hls && t.hls.off(n().Events.ERROR, v(t).onEmergencyAbortLoad),
        f("error_handling", t)
      }
    }
    ,
    328: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        adaptiveAssetUrl: ()=>c,
        adaptiveAsset: ()=>f,
        allHlsAssets: ()=>h,
        allHlsAudioAssets: ()=>g,
        allMp4VideoAssets: ()=>v,
        audioTracksForVideo: ()=>m,
        anyViableAsset: ()=>p,
        bestAssetForCurrentSize: ()=>y,
        buildMasterM3u8Asset: ()=>E,
        filterByQualityAndMaxWidth: ()=>b,
        masterM3u8ContentFromAssets: ()=>A,
        masterM3u8DataUri: ()=>S,
        masterM3u8Url: ()=>L,
        maxAssetWidthBasedOnVideoWidth: ()=>k,
        filterAssetsForScreencast: ()=>D,
        mediumQualityStartingAsset: ()=>_,
        rejectAudioAsset: ()=>R
      });
      var i = r(1)
        , n = r(327)
        , a = i.default.lib("player/lib/assets")
        , s = i.default.lib("utilities/obj")
        , o = i.default.lib("utilities/core").base64Encode
        , l = i.default.lib("player/lib/hosts")
        , u = l.eV1Protocol
        , d = l.eV1Host
        , c = function(t) {
        if (t.attributes.liveMedia)
          return t.mediaData.liveStreamEventDetails.manifestUrl;
        var e = v(t.mediaData.assets)
          , r = (0,
        n.filteredHlsAssets)(t, e)
          , i = g(t.allAssets);
        return S({
          video: r,
          audio: i
        }, t.attributes)
      }
        , f = function(t) {
        var e = c(t)
          , r = E(e);
        return r.display_name = "Auto",
        r.slug = "Auto",
        r
      }
        , h = function(t) {
        return a.filter(t, {
          container: "m3u8",
          segment_duration: 3,
          type: "hls_video",
          status: a.READY,
          metadata: function(t) {
            return Object(t).max_bitrate
          }
        }).sort((function(t, e) {
          return (t.metadata.max_bitrate || 0) - (e.metadata.max_bitrate || 0)
        }
        ))
      }
        , g = function(t) {
        return a.filter(t, {
          type: "mp4_alternate_audio",
          status: a.READY
        })
      }
        , v = function(t) {
        return a.filter(t, {
          container: "mp4",
          status: a.READY,
          public: !0,
          metadata: function(t) {
            return Object(t).max_bitrate
          },
          type: /\b(?!captioned_video)\S+/
        }).sort((function(t, e) {
          return (t.metadata.max_bitrate || 0) - (e.metadata.max_bitrate || 0)
        }
        ))
      }
        , m = function(t) {
        var e = [{
          audioCodec: void 0,
          autoselect: !0,
          default: !0,
          forced: !1,
          groupId: "audio",
          id: 0,
          lang: void 0,
          name: "Off",
          label: "Off",
          type: "AUDIO",
          isSelected: !0
        }];
        return t.forEach((function(t, r) {
          var i, n;
          e.push({
            audioCodec: void 0,
            autoselect: !1,
            default: !1,
            forced: !1,
            groupId: "audio",
            id: r + 1,
            lang: void 0,
            name: (null === (i = t.details) || void 0 === i ? void 0 : i.languageMetadata.name) || "Alt Audio",
            label: (null === (n = t.details) || void 0 === n ? void 0 : n.languageMetadata.name) || "Alt Audio",
            type: "AUDIO",
            isSelected: !1
          })
        }
        )),
        e
      }
        , p = function(t, e) {
        return a.one(e, {
          sortBy: "width asc"
        })
      }
        , y = function(t, e) {
        var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
          , i = b(t, e, r);
        return i[i.length - 1]
      }
        , E = function(t) {
        return {
          bitrate: "variable",
          ext: "m3u8",
          height: "variable",
          public: !0,
          size: "variable",
          type: "hls_video",
          url: t,
          width: "variable",
          slug: "hls_master_m3u8_seg3s"
        }
      }
        , b = function(t, e) {
        var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
          , i = t.attributes
          , n = i.qualityMin
          , s = i.qualityMax
          , o = a.withinQualityRange(e, n, s);
        0 === o.length && (o = a.nearestOutsideRange(e, n, s));
        var l = Math.min(r.maxWidth || 8192, k(i.width, i.devicePixelRatio))
          , u = a.filter(o, {
          width: [0, l]
        });
        return 0 === u.length ? [o[0]] : u
      }
        , T = function(t) {
        return t.map((function(t) {
          return '#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="'.concat(t.details.languageMetadata.name, '",AUTOSELECT=NO, DEFAULT=NO, CHARACTERISTICS="public.accessibility.describes-video", URI="').concat(t.url, '"')
        }
        ))
      }
        , A = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
          , r = t.video
          , i = t.audio
          , n = [];
        e.startPosition && n.push("#EXT-X-START:TIME-OFFSET=".concat(e.startPosition, ",PRECISE=YES")),
        n.push('#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="Original",AUTOSELECT=YES, DEFAULT=YES'),
        n = n.concat(T(g(i)));
        for (var a = 0; a < r.length; a++) {
          var s = r[a]
            , o = 8 * s.metadata.max_bitrate;
          n.push('#EXT-X-STREAM-INF:PROGRAM-ID=1,CLOSED-CAPTIONS=NONE,AUDIO="audio",BANDWIDTH='.concat(o, ",NAME=").concat(s.display_name, "\n") + s.url)
        }
        return "#EXTM3U\n" + n.join("\n")
      }
        , S = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
          , r = A(t, e);
        return "data:application/x-mpegURL;base64,".concat(o(r))
      }
        , L = function(t) {
        var e = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1];
        return "".concat(u(), "//").concat(d(), "/embed/medias/").concat(t, ".m3u8?segment_duration=3&exclude_audio=").concat(!e)
      }
        , k = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : window.devicePixelRatio || 1
          , r = 1.2 * Math.max(1.25, e)
          , i = t * r;
        return i
      }
        , D = function(t, e) {
        var r = s.filter(e, (function(t) {
          return 640 < t.width
        }
        ));
        return 0 < r.length ? r : e
      }
        , _ = function(t, e) {
        return y(t, e, {
          maxWidth: 1279
        })
      }
        , R = function(t, e) {
        return s.filter(e, (function(t) {
          return "Audio" != t.display_name
        }
        ))
      }
    }
    ,
    327: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        UNOBTAINABLE_BITRATE: ()=>p,
        arrayBufferToString: ()=>y,
        assetsSortedByWidth: ()=>E,
        assetToLevel: ()=>b,
        averageOrMaxBitrate: ()=>T,
        bestStartingAsset: ()=>A,
        bitrateForLevel: ()=>S,
        bitrateForMetadata: ()=>L,
        canSupportAsset: ()=>k,
        cautiousThreshold: ()=>D,
        determineBitrate: ()=>_,
        earlyOrMaxBitrate: ()=>R,
        filteredHlsAssets: ()=>C,
        hasAnyVeryLargeAssets: ()=>I,
        highestSupportedHlsAssetLevel: ()=>x,
        highestSupportedAsset: ()=>w,
        levelToAsset: ()=>O,
        isVeryLargeAsset: ()=>P,
        optimisticThreshold: ()=>F,
        safeAverageBitrate: ()=>M,
        startLoadOnce: ()=>B,
        startingAssetBasedOnBandwidthEstimate: ()=>N,
        stopLoad: ()=>U,
        teardown: ()=>G,
        weightedBwUpEstimate: ()=>j
      });
      var i = r(328)
        , n = r(1)
        , a = n.default.lib("player/lib/assets")
        , s = a.one
        , o = a.isScreencast
        , l = n.default.lib("utilities/obj")
        , u = n.default.lib("player/lib/assets")
        , d = u.nearestOutsideRange
        , c = u.withinQualityRange
        , f = n.default.lib("utilities/cacheable")
        , h = f.uncacheNamespace
        , g = f.makeNamespace
        , v = g("asset_to_level")
        , m = g("level_to_asset")
        , p = 99999999999
        , y = function(t) {
        for (var e = new Uint8Array(t), r = e.length, i = "", n = Math.pow(2, 16) - 1, a = 0; a < r; a += n)
          a + n > r && (n = r - a),
          i += String.fromCharCode.apply(null, e.subarray(a, a + n));
        return i
      }
        , E = function(t, e) {
        return e.sort((function(t, e) {
          return t.width - e.width
        }
        ))
      }
        , b = function(t, e) {
        var r;
        if (null != (r = v(t)[e.url]))
          return r;
        if (!t.hls || !t.hls.levels)
          return -1;
        var i = l.filter(t.hls.levels, (function(t) {
          return t.url[0] === e.url
        }
        ))[0]
          , n = t.hls.levels.indexOf(i);
        return i && (v(t)[i.url[0]] = n),
        n
      }
        , T = function(t) {
        return null == t.average_bitrate ? t.max_bitrate : t.average_bitrate
      }
        , A = function(t, e) {
        return N(t, e) || i.bestAssetForCurrentSize(t, e, {
          maxWidth: 1280
        }) || i.mediumQualityStartingAsset(t, e) || i.anyViableAsset(t, e)
      }
        , S = function(t, e) {
        var r = O(t, e);
        return r ? L(t, r.metadata) : p
      }
        , L = function(t, e) {
        if (!e || !e.max_bitrate)
          return p;
        var r = 8 * e.max_bitrate
          , i = 8 * T(e)
          , n = 8 * R(e)
          , a = t.getPreload()
          , s = t.getCurrentTime()
          , o = t.timeBeforeEndOfBuffer()
          , l = t.getMediaElement() && t.getMediaElement().paused;
        if (s <= D(t) && n < i)
          return i;
        if (s <= D(t) && "none" !== a)
          return "auto" === a ? i : .5 * i + .5 * r;
        if (o <= D(t))
          return r;
        if (!l && o <= F(t)) {
          var u = F(t) - D(t)
            , d = (o - D(t)) / u;
          return d * i + (1 - d) * r
        }
        return i
      }
        , k = function(t, e) {
        return e && e.metadata && j(t) > 8 * e.metadata.max_bitrate
      }
        , D = function() {
        return 6
      }
        , _ = function(t, e, r) {
        if (t.hls) {
          var i = null
            , n = l.getDeep(t.hls.levels, [r, "details", "fragments"]);
          if (n)
            i = 8 * n[n.length - 1].byteRangeEndOffset / t.getDuration() / 1024;
          return i
        }
      }
        , R = function(t) {
        return null == t.early_max_bitrate ? t.max_bitrate : t.early_max_bitrate
      }
        , C = function(t, e) {
        var r = e;
        o(t.allAssets) && (r = i.filterAssetsForScreencast(t, r)),
        0 < t.attributes.qualityMin && (r = i.rejectAudioAsset(t, r));
        var n = t.attributes
          , a = n.qualityMin
          , s = n.qualityMax
          , l = c(r, a, s);
        return r = 0 < l.length ? l : d(r, a, s)
      }
        , I = function(t) {
        return 0 < t.allAssets.filter((function(e) {
          return P(t, e)
        }
        )).lenth
      }
        , x = function(t) {
        return b(t, w(t, t.filteredVideoAssets()))
      }
        , w = function(t, e) {
        return E(t, e).filter((function(e) {
          return k(t, e)
        }
        )).pop() || e[0]
      }
        , O = function(t, e) {
        var r;
        if (null != (r = m(t)[e]))
          return r;
        var i = l.getDeep(t.hls.levels, [e, "url", 0])
          , n = s(t.allAssets, {
          url: i
        });
        return n && (n.bitrate = _(n, e)),
        m(t)[e] = n,
        n
      }
        , P = function(t, e) {
        var r = M(e);
        if (r && r < p && 1610612736 < r * t.getDuration())
          return !0;
        return !1
      }
        , F = function() {
        return 16
      }
        , M = function(t) {
        return t && t.metadata ? t.metadata.real_average_bitrate || t.metadata.average_bitrate : null
      }
        , B = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : -1;
        t.attributes.calledStartLoad || (t.onReady().then((function() {
          t.hls.startLoad(e)
        }
        )),
        t.setAttributes({
          calledStartLoad: !0
        }))
      }
        , N = function(t, e) {
        var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : t.attributes.bwEstimateOnInit;
        if (!r)
          return null;
        var n = i.filterByQualityAndMaxWidth(t, e);
        return s(n, {
          metadata: function(e) {
            if (!e)
              return !1;
            var i = L(t, e);
            return i < p && i < r * t.abrBandWidthUpFactor()
          },
          sortFn: function(t, e) {
            return e.metadata.max_bitrate - t.metadata.max_bitrate
          }
        })
      }
        , U = function(t) {
        t.hls.stopLoad(),
        t.setAttributes({
          calledStartLoad: !1
        })
      }
        , G = function(t) {
        h("level_to_asset", t),
        h("asset_to_level", t)
      }
        , j = function(t) {
        return t.hls.abrController.getEstimate() * t.abrBandWidthUpFactor()
      }
    }
    ,
    323: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        default: ()=>O
      });
      var i = r(324)
        , n = r(326)
        , a = r(329)
        , s = r(328)
        , o = r(330)
        , l = r(331)
        , u = r(333)
        , d = r(334)
        , c = r.n(d)
        , f = r(332)
        , h = r(325)
        , g = r.n(h)
        , v = r(337)
        , m = r(1)
        , p = r(355)
        , y = r(346)
        , E = r(327);
      function b(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      function T(t, e) {
        for (var r, i = 0; i < e.length; i++)
          (r = e[i]).enumerable = r.enumerable || !1,
          r.configurable = !0,
          "value"in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
      }
      var A = m.default.lib("player/lib/assets")
        , S = m.default.lib("utilities/obj")
        , L = m.default.lib("promiscuous")
        , k = m.default.lib("utilities/stopgo")
        , D = v.default.delegatePublicMethods
        , _ = m.default.lib("utilities/wlog").wlog
        , R = _.getPrefixedFunctions("hls_video")
        , C = m.default.lib("utilities/seqid").seqId
        , I = m.default.lib("player/lib/media-data-transforms").convertMp4sToM3u8s
        , x = m.default.lib("utilities/legacyLocalstorage").setOrGet
        , w = function() {
        function t(e, r) {
          var i = this
            , n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
            , a = 3 < arguments.length ? arguments[3] : void 0;
          b(this, t),
          this.uuid = C("wistia_hls_video_"),
          this.root = e,
          this.mediaData = this.prepareMp4sForHlsRepackaging(r),
          this.allAssets = this.mediaData.assets,
          this.attributes = S.assign(this.defaultAttributes(), n),
          this._startPosition = this.attributes.startPosition || -1,
          this.state = {},
          this.setupProperties(),
          this.simpleVideo = new v.default(this.root,this.mediaData,this.attributes,a),
          this.setAttributes({
            bwEstimateOnInit: x("hls.bandwidth_estimate") || this.attributes.bwEstimateOnInit
          }),
          this.bitrateForLevel = function(t) {
            return (0,
            E.bitrateForLevel)(i, t)
          }
          ,
          this.getM3u8FromCache = function(t) {
            if (i.preloading && i.preloading.m3u8Cache[t]) {
              var e = i.preloading.m3u8Cache[t];
              return {
                event: e.event,
                stats: e.stats
              }
            }
            return null
          }
          ,
          this.popFragFromCache = function(t) {
            var e = t;
            if (i.preloading && i.preloading.fragCache[e]) {
              var r = i.preloading.fragCache[e]
                , n = {
                event: r.event,
                stats: S.assign(r.stats, {
                  alreadySampled: !0
                })
              };
              return delete i.preloading.fragCache[e],
              n
            }
            return null
          }
          ,
          this.setupHls()
        }
        return e = t,
        (r = [{
          key: "abrBandWidthFactor",
          value: function() {
            return 1
          }
        }, {
          key: "abrBandWidthUpFactor",
          value: function() {
            return .9
          }
        }, {
          key: "adaptiveAsset",
          value: function() {
            var t = s.adaptiveAssetUrl(this)
              , e = s.buildMasterM3u8Asset(t);
            return e.display_name = "Auto",
            e.slug = "Auto",
            e
          }
        }, {
          key: "assetFromQuality",
          value: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t
              , r = A.withinQualityRange(this.allAssets, t, e);
            return 0 === r.length && (r = A.nearestOutsideRange(this.allAssets, t, e)),
            r[0]
          }
        }, {
          key: "changeAudioTrack",
          value: function(t) {
            var e = this;
            return new L((function(r) {
              var i = "beforeplay" === e.getPlaybackMode()
                , n = e.getCurrentAudioTrack().id;
              i || n === t || e.hls.once(g().Events.AUDIO_TRACK_SWITCHED, (function() {
                r()
              }
              )),
              e.hls.audioTracks[t] && n !== t ? (e.hls.audioTrack = t,
              "beforeplay" === e.getPlaybackMode() && r()) : r()
            }
            ))
          }
        }, {
          key: "changeLevel",
          value: function(t) {
            var e = this;
            this.hls.currentLevel !== t && this.hls.startLevel !== t && (this.hls.startLevel = t),
            "playing" === this.getPlaybackMode() && -1 !== t && (this.hls.once(g().Events.LEVEL_SWITCHED, (function() {
              e.play()
            }
            )),
            this.pause()),
            this.hls.currentLevel = t
          }
        }, {
          key: "changeQuality",
          value: function(t, e, r) {
            if ("auto" === t.toString().toLowerCase())
              return this.changeStream("auto", e, r);
            var i = this.selectableAssets()
              , n = A.findClosestAssetByQuality(i, t);
            return "beforeplay" === this.getPlaybackMode() ? (this.changeStreamWithoutLoad(n),
            L.resolve()) : this.changeStream(n, e, r)
          }
        }, {
          key: "changeStream",
          value: function(t) {
            var e = this
              , r = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            return t = this.getAsset(t),
            new L((function(i) {
              e.changeStreamWithoutLoad(t),
              e.startHlsLoadOnce(),
              r ? e.play().then(i) : i()
            }
            ))
          }
        }, {
          key: "changeStreamWithoutLoad",
          value: function(t) {
            var e;
            !(t = this.getAsset(t)) || this.currentAsset() && this.currentAsset().url === t.url || (e = "variable" === t.bitrate ? -1 : (0,
            E.assetToLevel)(this, t),
            (0,
            E.stopLoad)(this),
            this.changeLevel(e))
          }
        }, {
          key: "changeVideo",
          value: function(t, e) {
            var r = this;
            return new L((function(i) {
              r.mediaData = null,
              r.allAssets = [],
              r.attributes = {},
              r.state = {},
              r.state.isChangingVideo = !0,
              r._bindings = {},
              r.destroyHls(),
              r.setupProperties(),
              (0,
              y.teardownBeforeChangeVideo)(r.simpleVideo),
              r.mediaData = r.prepareMp4sForHlsRepackaging(t),
              r.allAssets = t.assets,
              r.attributes = e,
              (0,
              y.initAfterChangeVideo)(r.simpleVideo, t, e),
              r.setAttributes({
                bwEstimateOnInit: x("hls.bandwidth_estimate")
              }),
              r.setupHls(),
              r.state.isChangingVideo = !1,
              i()
            }
            ))
          }
        }, {
          key: "currentLevel",
          value: function() {
            return this.hls.currentLevel
          }
        }, {
          key: "currentAsset",
          value: function() {
            return 0 <= this.hls.currentLevel ? (0,
            E.levelToAsset)(this, this.hls.currentLevel) || this.adaptiveAsset() : null != this.hls.startLevel && 0 <= this.hls.startLevel && (0,
            E.levelToAsset)(this, this.hls.startLevel) || this.adaptiveAsset()
          }
        }, {
          key: "defaultAttributes",
          value: function() {
            return {
              contentType: "video/m3u8",
              qualityMin: 360,
              qualityMax: 2160,
              preload: "metadata"
            }
          }
        }, {
          key: "destroy",
          value: function() {
            return this._bindings = {},
            this.destroyHls(),
            this.simpleVideo.destroy()
          }
        }, {
          key: "destroyHls",
          value: function() {
            var t = this
              , e = function(t) {
              try {
                return t()
              } catch (t) {
                R.error(t)
              }
            };
            e((function() {
              a.teardown(t)
            }
            )),
            e((function() {
              i.teardown(t)
            }
            )),
            e((function() {
              n.teardown(t)
            }
            )),
            e((function() {
              u.teardown(t)
            }
            )),
            e((function() {
              l.teardown(t)
            }
            )),
            e((function() {
              o.teardown(t)
            }
            )),
            e((function() {
              (0,
              E.teardown)(t)
            }
            )),
            this.hls && (this.hls.destroy(),
            this.hls = null)
          }
        }, {
          key: "determineMinAutoBitrate",
          value: function() {
            var t = this.hlsAssetFromQuality(360, 1080);
            return t && t.metadata && t.metadata.max_bitrate ? 8 * (t.metadata.max_bitrate - 1) : 6e5
          }
        }, {
          key: "diagnosticData",
          value: function() {
            var t = this
              , e = function(t) {
              try {
                return t()
              } catch (t) {
                return "ERROR: ".concat(t.message)
              }
            }
              , r = {
              simpleVideo: this.simpleVideo.diagnosticData(),
              attributes: this.attributes,
              currentLevel: e((function() {
                return t.currentLevel()
              }
              )),
              startLevel: e((function() {
                return t.hls.startLevel
              }
              )),
              nextLevel: e((function() {
                return t.hls.nextLevel
              }
              )),
              loadLevel: e((function() {
                return t.hls.loadLevel
              }
              )),
              autoLevel: e((function() {
                return t.hls.autoLevel
              }
              )),
              autoLevelCapping: e((function() {
                return t.hls.autoLevelCapping
              }
              )),
              nextAutoLevel: e((function() {
                return t.hls.nextAutoLevel
              }
              )),
              manualLevel: e((function() {
                return t.hls.manualLevel
              }
              )),
              bandwidthEstimate: e((function() {
                return t.hls.abrController.getEstimate()
              }
              ))
            };
            return r.currentAsset = this.currentAsset(),
            r.currentAsset && r.currentAsset.url && 100 < r.currentAsset.url.length && (r.currentAsset.url = "".concat(r.currentAsset.url.substring(0, 97), "...")),
            r.selectedAsset = this.selectedAsset(),
            r.selectedAsset && r.selectedAsset.url && 100 < r.selectedAsset.url.length && (r.selectedAsset.url = "".concat(r.selectedAsset.url.substring(0, 97), "...")),
            r
          }
        }, {
          key: "filteredVideoAssets",
          value: function() {
            var t = s.allMp4VideoAssets(this.allAssets);
            return (0,
            E.filteredHlsAssets)(this, t)
          }
        }, {
          key: "getAsset",
          value: function(t) {
            if ("number" == typeof t)
              return this.assetFromQuality(t);
            if ("string" == typeof t && "auto" === t.toLowerCase()) {
              if ("auto" === t.toLowerCase())
                return this.adaptiveAsset();
              if ("4k" === t.toLowerCase())
                return this.assetFromQuality(2160);
              if (/^\d+/.test(t))
                return this.assetFromQuality(parseInt(t))
            }
            return t
          }
        }, {
          key: "getAudioTracks",
          value: function() {
            var t = this
              , e = this.m3u8AudioAssets();
            return 0 < this.hls.audioTracks.length ? this.hls.audioTracks.map((function(r, i) {
              var n = e[i - 1];
              return r.isSelected = i === t.getHlsAudioTrackId(),
              r.label = null == n ? void 0 : n.details.languageMetadata.nativeName,
              0 === i && (r.label = "Original"),
              r
            }
            )) : s.audioTracksForVideo(e)
          }
        }, {
          key: "getCurrentAudioTrack",
          value: function() {
            this.loadForAudioTracks();
            var t = this.getHlsAudioTrackId()
              , e = this.hls.audioTracks[t];
            return e.isSelected = !0,
            e
          }
        }, {
          key: "getCurrentAudioTrackId",
          value: function() {
            return this.getCurrentAudioTrack().id
          }
        }, {
          key: "getCurrentQuality",
          value: function() {
            var t = this.currentAsset();
            return t ? "Auto" === t.slug ? "auto" : A.numericSizeSnapped(t.width, t.height) : "?"
          }
        }, {
          key: "getHlsAudioTrackId",
          value: function() {
            return -1 === this.hls.audioTrack ? 0 : this.hls.audioTrack
          }
        }, {
          key: "getIndexOfStartingAsset",
          value: function() {
            for (var t = this.filteredVideoAssets(), e = (0,
            E.bestStartingAsset)(this, t), r = 0; r < t.length; r++)
              if (t[r].url === e.url)
                return r
          }
        }, {
          key: "getStartPosition",
          value: function() {
            return this._startPosition
          }
        }, {
          key: "hlsAssetFromQuality",
          value: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t
              , r = A.withinQualityRange(this.filteredVideoAssets(), t, e);
            return 0 === r.length && (r = A.nearestOutsideRange(this.filteredVideoAssets(), t, e)),
            r[0]
          }
        }, {
          key: "isChangingVideo",
          value: function() {
            return !!this.state.isChangingVideo
          }
        }, {
          key: "loadForAudioTracks",
          value: function() {
            0 === this.hls.audioTracks.length && this.startHlsLoadOnce()
          }
        }, {
          key: "liveConfig",
          value: function() {
            return {
              abrBandWidthFactor: 1,
              abrBandWidthUpFactor: .9,
              abrEwmaDefaultEstimate: this.attributes.bwEstimateOnInit,
              testBandwidth: !1,
              autoStartLoad: !1,
              debug: {
                log: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.info.apply(_, ["hlsjs log >"].concat(e))
                },
                error: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.notice.apply(_, ["hlsjs error >"].concat(e))
                },
                warn: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.notice.apply(_, ["hlsjs warn >"].concat(e))
                },
                info: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.info.apply(_, ["hlsjs info >"].concat(e))
                },
                debug: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.debug.apply(_, ["hlsjs debug >"].concat(e))
                }
              },
              maxBufferSize: 6e7,
              maxFragLookUpTolerance: .2,
              maxMaxBufferLength: this.attributes.maxMaxBufferLength || 60,
              seekHoleNudgeDuration: .1
            }
          }
        }, {
          key: "loadSource",
          value: function() {
            var t = this.adaptiveAsset();
            this.hls.loadSource(t.url)
          }
        }, {
          key: "m3u8AudioAssets",
          value: function() {
            return s.allHlsAudioAssets(this.allAssets)
          }
        }, {
          key: "masterM3u8Content",
          value: function() {
            var t = this.filteredVideoAssets();
            return s.masterM3u8ContentFromAssets({
              video: t,
              audio: this.m3u8AudioAssets()
            })
          }
        }, {
          key: "maybeResetCurrentLevel",
          value: function(t) {
            if (this.simpleVideo.attributes.width) {
              var e = this.simpleVideo.attributes.width;
              if ("auto" === this.selectedQuality() && e !== t) {
                var r = t - e
                  , i = (0,
                E.levelToAsset)(this, this.hls.currentLevel)
                  , n = i ? i.width : 0
                  , a = i ? i.height : 0
                  , s = A.numericSizeSnapped(n, a);
                500 <= r && 360 >= s && this.changeLevel(-1)
              }
            }
          }
        }, {
          key: "onEnterFullscreen",
          value: function() {
            return this.simpleVideo.onEnterFullscreen(),
            "beforeplay" === this.getPlaybackMode() ? void (this.hls.startLevel = (0,
            E.highestSupportedHlsAssetLevel)(this)) : void this.changeLevel(-1)
          }
        }, {
          key: "onHeightChange",
          value: function(t) {
            this.simpleVideo.onHeightChange(t),
            this.setAttributes({
              height: t
            })
          }
        }, {
          key: "onHlsError",
          value: function(t) {
            var e = this;
            this.attributes.liveMedia && t.details === g().ErrorDetails.MANIFEST_LOAD_ERROR && 404 === t.response.code && setTimeout((function() {
              e.loadSource()
            }
            ), 1e3)
          }
        }, {
          key: "onMediaDataChanged",
          value: function(t) {
            this.mediaData = this.prepareMp4sForHlsRepackaging(t)
          }
        }, {
          key: "onReady",
          value: function() {
            var t = this;
            return this.readyStopGo || (this.readyStopGo = new k,
            this.simpleVideo.onReady().then((function() {
              return L.all([t.mediaAttachedPromise, t.manifestParsedPromise]).then((function() {
                t.readyStopGo.go()
              }
              ))
            }
            ))),
            this.readyStopGo
          }
        }, {
          key: "onWidthChange",
          value: function(t) {
            var e = this;
            this.maybeResetCurrentLevel(t),
            this.simpleVideo.onWidthChange(t),
            this.setAttributes({
              width: t
            }),
            this.onReady().then((function() {
              e.attributes.liveMedia || o.capLevelBasedOnVideoWidth(e)
            }
            ))
          }
        }, {
          key: "play",
          value: function(t) {
            var e = this;
            return this.startHlsLoadOnce(),
            this.simpleVideo.play(t).then((function(t) {
              return e.attributes.liveMedia && e.setCurrentTimeToLiveEdge(),
              t
            }
            ))
          }
        }, {
          key: "prepareMp4sForHlsRepackaging",
          value: function(t) {
            var e = S.clone(t);
            return I(e)
          }
        }, {
          key: "qualityForAsset",
          value: function(t) {
            return "Auto" === t.slug ? "auto" : A.numericSizeSnapped(t.width, t.height)
          }
        }, {
          key: "removeSourceElem",
          value: function() {
            var t = this.getMediaElement()
              , e = Array.prototype.slice.call(t.childNodes);
            0 < e.length && e.map((function(e) {
              t.removeChild(e)
            }
            ))
          }
        }, {
          key: "reset",
          value: function() {
            this.simpleVideo.reset()
          }
        }, {
          key: "seek",
          value: function(t, e) {
            return this.startHlsLoadOnce(t),
            this.simpleVideo.seek(t, e)
          }
        }, {
          key: "selectableAssets",
          value: function() {
            var t = this.filteredVideoAssets().sort((function(t, e) {
              return t.width - e.width
            }
            ));
            return [this.adaptiveAsset()].concat(t)
          }
        }, {
          key: "selectableQualities",
          value: function() {
            var t = this;
            return this.selectableAssets().map((function(e) {
              return t.qualityForAsset(e)
            }
            ))
          }
        }, {
          key: "selectedAsset",
          value: function() {
            return 0 <= this.hls.manualLevel ? this.currentAsset() : this.adaptiveAsset()
          }
        }, {
          key: "selectedQuality",
          value: function() {
            return this.qualityForAsset(this.selectedAsset())
          }
        }, {
          key: "setAttributes",
          value: function(t) {
            return S.assign(this.attributes, t),
            this.simpleVideo.setAttributes(t)
          }
        }, {
          key: "setCurrentTimeToLiveEdge",
          value: function() {
            this.setCurrentTime(this.hls.liveSyncPosition)
          }
        }, {
          key: "setupEventListeners",
          value: function() {
            var t = this;
            this.manifestParsedPromise = new L((function(e) {
              t.hls.on(g().Events.MANIFEST_PARSED, e)
            }
            )),
            this.mediaAttachedPromise = new L((function(e) {
              t.hls.on(g().Events.MEDIA_ATTACHED, e)
            }
            )),
            this.hls.on(g().Events.AUDIO_TRACKS_UPDATED, (function() {
              t.trigger("audiotracksupdated")
            }
            )),
            this.hls.on(g().Events.ERROR, (function(e, r) {
              t.onHlsError(r)
            }
            ))
          }
        }, {
          key: "setupHls",
          value: function() {
            this.attributes.liveMedia ? this.setupLiveHls() : this.setupVodHls(),
            this.trigger("stream-changed", this.currentAsset())
          }
        }, {
          key: "setupLiveHls",
          value: function() {
            var t = this.liveConfig();
            this.hls = new (g())(t),
            u.setup(this),
            this.loadSource(),
            this.setupEventListeners(),
            this.hls.attachMedia(this.simpleVideo.getMediaElement()),
            this.removeSourceElem(),
            i.setup(this),
            a.setup(this)
          }
        }, {
          key: "setupVodHls",
          value: function() {
            var t = this.vodConfig();
            this.hls = new (g())(t),
            o.setup(this),
            u.setup(this),
            this.loadSource(),
            this.setupEventListeners(),
            this.hls.attachMedia(this.simpleVideo.getMediaElement()),
            this.removeSourceElem(),
            n.setup(this),
            a.setup(this),
            i.setup(this),
            l.setup(this)
          }
        }, {
          key: "setupProperties",
          value: function() {
            null == this.preloading && (this.preloading = {}),
            null == this.preloading.m3u8Cache && (this.preloading.m3u8Cache = {}),
            null == this.preloading.fragCache && (this.preloading.fragCache = {})
          }
        }, {
          key: "showFirstFrame",
          value: function() {
            return this.seek(.01)
          }
        }, {
          key: "startHlsLoadOnce",
          value: function() {
            var t = this._startPosition;
            (0,
            E.startLoadOnce)(this, t)
          }
        }, {
          key: "updateStartPosition",
          value: function(t) {
            this._startPosition = t
          }
        }, {
          key: "vodConfig",
          value: function() {
            return {
              abrBandWidthFactor: 1,
              abrBandWidthUpFactor: .9,
              abrController: c(),
              abrEwmaDefaultEstimate: this.attributes.bwEstimateOnInit,
              abrEwmaFastVoD: 4,
              abrEwmaSlowVoD: 15,
              autoStartLoad: !1,
              bitrateForLevel: this.bitrateForLevel,
              debug: {
                log: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.info.apply(_, ["hlsjs log >"].concat(e))
                },
                error: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.notice.apply(_, ["hlsjs error >"].concat(e))
                },
                warn: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.notice.apply(_, ["hlsjs warn >"].concat(e))
                },
                info: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.info.apply(_, ["hlsjs info >"].concat(e))
                },
                debug: function() {
                  for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                  _.debug.apply(_, ["hlsjs debug >"].concat(e))
                }
              },
              getFragFromCache: this.popFragFromCache,
              getM3u8FromCache: this.getM3u8FromCache,
              loader: f.default,
              maxBufferSize: 6e7,
              maxFragLookUpTolerance: .2,
              maxMaxBufferLength: this.attributes.maxMaxBufferLength || 60,
              minAutoBitrate: this.determineMinAutoBitrate(),
              seekHoleNudgeDuration: .1,
              startLevel: this.getIndexOfStartingAsset()
            }
          }
        }]) && T(e.prototype, r),
        d && T(e, d),
        t;
        var e, r, d
      }();
      D(w.prototype, (function() {
        return this.simpleVideo
      }
      )),
      (0,
      p.default)("HlsVideo", w);
      const O = w
    }
    ,
    330: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        capLevelBasedOnExactWidth: ()=>v,
        capLevelBasedOnVideoWidth: ()=>m,
        cappedLevelFromWidth: ()=>p,
        cappedLevelFromVideoWidth: ()=>y,
        capToLevel: ()=>E,
        setup: ()=>b,
        teardown: ()=>T
      });
      var i = r(328)
        , n = r(325)
        , a = r.n(n)
        , s = r(1)
        , o = r(327)
        , l = s.default.lib("player/lib/assets")
        , u = s.default.lib("utilities/wlog").wlog.getPrefixedFunctions("hls_video level_capping")
        , d = s.default.lib("utilities/cacheable")
        , c = d.makeCacheable
        , f = d.uncacheNamespace
        , h = (0,
      d.makeNamespace)("level_capping")
        , g = c("level_capping")
        , v = function(t, e) {
        var r = p(t, e);
        0 <= r ? (u.info("Capping to level", r),
        E(t.hls, r)) : u.info("Cannot cap level for width ".concat(e, "; no matching assets found"))
      }
        , m = function(t) {
        if (!1 !== t.attributes.capBasedOnVideoWidth) {
          var e = t.hls
            , r = y(t);
          if (u.info("capLevelBasedOnVideoWidth", r),
          0 <= r) {
            var i = e.currentLevel
              , n = e.autoLevelCapping;
            E(t, r);
            var a = t.getPlaybackMode();
            if (0 === t.filteredVideoAssets().length)
              return;
            if ("beforeplay" === a && r === e.startLevel)
              u.info("Not reevaluating next fragment because starting level is the same as the capped level");
            else {
              var s = (0,
              o.highestSupportedHlsAssetLevel)(t)
                , l = e.levels.length - 1
                , d = (0,
              o.levelToAsset)(t, Math.min(i + 1, l));
              0 <= n && r > n && (0,
              o.canSupportAsset)(t, d) && (e.nextLoadLevel = s)
            }
          }
        }
      }
        , p = function(t, e) {
        var r = t.filteredVideoAssets()
          , n = i.filterByQualityAndMaxWidth(t, r, {
          maxWidth: e
        })
          , a = l.one(n, {
          width: [0, e],
          sortBy: "width desc, bitrate desc",
          metadata: function(t) {
            return t.max_bitrate < o.UNOBTAINABLE_BITRATE
          }
        });
        return a ? (0,
        o.assetToLevel)(t, a) : -1
      }
        , y = function(t) {
        return p(t, i.maxAssetWidthBasedOnVideoWidth(t.attributes.width, t.attributes.devicePixelRatio))
      }
        , E = function(t, e) {
        t.onReady().then((function() {
          t.hls.autoLevelCapping = e
        }
        ))
      }
        , b = function(t) {
        var e = g(t, "onManifestParsed", (function() {
          return function(e, r) {
            t.onReady((function() {
              m(t)
            }
            ))
          }
        }
        ));
        t.hls.off(a().Events.MANIFEST_PARSED, e),
        t.hls.on(a().Events.MANIFEST_PARSED, e)
      }
        , T = function(t) {
        h(t).onManifestParsed && t.hls && t.hls.off(a().Events.MANIFEST_PARSED, h(t).onManifestParsed),
        f("level_capping", t)
      }
    }
    ,
    331: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        parseManifestPlaylist: ()=>A,
        preloadM3u8Level: ()=>k,
        preloadSegment: ()=>D,
        preloadStream: ()=>R,
        setup: ()=>C,
        teardown: ()=>I
      });
      var i = r(1)
        , n = r(325)
        , a = r.n(n)
        , s = r(332)
        , o = r(327)
        , l = i.default.lib("utilities/detect").cachedDetect
        , u = i.default.lib("player/lib/timeout-utils").doTimeout
        , d = i.default.lib("player/lib/elem").pageLoaded
        , c = i.default.lib("utilities/legacyLocalstorage").setOrGet
        , f = i.default.lib("utilities/wlog").wlog
        , h = i.default.lib("utilities/cacheable")
        , g = h.makeCacheable
        , v = h.uncacheNamespace
        , m = h.makeNamespace
        , p = g("preloading")
        , y = m("preloading")
        , E = f.getPrefixedFunctions("hls preloading")
        , b = l()
        , T = function(t, e) {
        if (-1 === e) {
          var r = t.getIndexOfStartingAsset();
          return t.hls.levels[r].url[0]
        }
        return t.hls.levels[e].url[0]
      }
        , A = function(t, e) {
        var r = [];
        return e.replace(/(\/deliveries\/)([a-zA-Z0-9.\-/]+\.ts)/g, (function(t, e, i) {
          var n = /seg-(\d+)-/g.exec(i)[1];
          return r.push({
            sn: n,
            url: i
          }),
          ""
        }
        )),
        r
      }
        , S = function(t, e, r) {
        var i = t.hls;
        i && L(t, i.startLevel, 1, (function() {
          var n = (0,
          o.levelToAsset)(t, i.startLevel)
            , a = (0,
          o.startingAssetBasedOnBandwidthEstimate)(t, t.filteredVideoAssets(), (0,
          o.weightedBwUpEstimate)(t))
            , s = i.abrController.getEstimate();
          E.info("bandwidth estimate after 1 fragment", s),
          E.info("determined best starting asset", a);
          var l = a && a.url
            , u = n && n.url;
          if (a && u !== l) {
            var d = (0,
            o.assetToLevel)(t, a);
            if (0 > d)
              return E.warn("no matching level found, got", d),
              void ("function" == typeof r && r());
            E.info("set startLevel", d),
            null != d && isNaN(d) && E.error("error: setting startLevel to NaN", d, l),
            i.startLevel = d,
            L(t, d, e, (function() {
              "function" == typeof r && r()
            }
            ))
          } else
            L(t, i.startLevel, e - 1, r)
        }
        ))
      }
        , L = function(t, e) {
        var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1
          , i = 3 < arguments.length ? arguments[3] : void 0
          , n = t.getStartPosition()
          , a = 0 < n ? Math.round(n / 3) - 1 : 0
          , s = a + r;
        return _(t, e, a, s, i)
      }
        , k = function(t, e, r) {
        if (t.hls && t.hls.levels) {
          var i = T(t, e)
            , n = y(t).m3u8Cache;
          if (n && n[i]) {
            var a = n[i];
            return void u("".concat(t.uuid, ".preload_m3u8_level"), (function() {
              r(a)
            }
            ), 0)
          }
          var o = new s.default(t.hls.config)
            , l = {
            type: "level",
            level: e,
            id: 0,
            responseType: "text",
            loader: s.default,
            url: i
          }
            , d = {
            onSuccess: function(e, n) {
              var a = {
                event: e,
                stats: n,
                url: i,
                segments: A(t, e.data)
              };
              try {
                y(t).m3u8Cache[i] = a,
                r(a)
              } catch (t) {
                E.warn(t)
              }
            },
            onError: function() {
              for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                e[r] = arguments[r];
              E.error.apply(E, ["Failed to fetch data for m3u8 ".concat(i)].concat(e))
            },
            onTimeout: function() {
              for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
                e[r] = arguments[r];
              E.error.apply(E, ["Timeout fetching data for m3u8 ".concat(i)].concat(e))
            }
          };
          o.load(l, {
            timeout: 6e3,
            maxRetry: 3,
            retryDelay: 500,
            maxRetryDelay: 3e3
          }, d)
        }
      }
        , D = function(t, e, r, i) {
        if (t.hls && t.hls.levels) {
          var n = T(t, e);
          k(t, e, (function() {
            var o, l = y(t).m3u8Cache[n].segments[r];
            if (l) {
              var u, d = l.url, f = y(t).m3u8Cache[n].url;
              u = /^https?:\/\//.test(d) ? d : f.substring(0, f.lastIndexOf("deliveries/") + 11) + d;
              var h = new s.default(t.hls.config)
                , g = {
                onSuccess: function(e, r) {
                  var n = u
                    , a = {
                    event: e,
                    stats: r
                  }
                    , s = Math.max(50, performance.now() - r.loading.start)
                    , o = r.loaded;
                  c("hls.bandwidth_estimate", 8e3 * o / s),
                  t.hls && (t.hls.abrController.sample(s, o),
                  y(t).fragCache[n] = a,
                  "function" == typeof i && i(a))
                },
                onError: function() {
                  for (var t = arguments.length, e = Array(t), i = 0; i < t; i++)
                    e[i] = arguments[i];
                  E.warn.apply(E, ["failed to preload segment", u, r].concat(e))
                },
                onTimeout: function() {
                  for (var t = arguments.length, e = Array(t), i = 0; i < t; i++)
                    e[i] = arguments[i];
                  E.warn.apply(E, ["timed out preloading segment", u, r].concat(e))
                },
                onProgress: function(e) {
                  t.hls.trigger(a().Events.FRAG_LOAD_PROGRESS, {
                    stats: e
                  })
                }
              }
                , v = {
                id: 0,
                level: (o = {
                  level: e,
                  url: u,
                  segment: l
                }).level,
                loader: s.default,
                responseType: "arraybuffer",
                type: "level",
                url: o.url,
                sn: o.segment.sn
              };
              h.load(v, {
                timeout: 6e3,
                maxRetry: 3,
                retryDelay: 500,
                maxRetryDelay: 3e3
              }, g)
            }
          }
          ))
        }
      }
        , _ = function t(e, r, i, n, a) {
        i >= n ? "function" == typeof a && a() : D(e, r, i, (function() {
          "beforeplay" !== e.getPlaybackMode() || t(e, r, i + 1, n, a)
        }
        ))
      }
        , R = function(t, e) {
        var r = b.edge && 17 > parseInt(b.browser.version);
        b.trident || r || d((function() {
          "beforeplay" === t.getPlaybackMode() && ("auto" === t.getPreload() ? S(t, 9, e) : "metadata" === t.getPreload() && S(t, 1, e))
        }
        ))
      }
        , C = function(t) {
        var e = t.hls
          , r = p(t, "onMediaAttached", (function() {
          return function() {
            R(t, (function() {
              t.trigger("stream-changed", (0,
              o.levelToAsset)(t, e.startLevel))
            }
            ))
          }
        }
        ));
        e.off(a().Events.MEDIA_ATTACHED, r),
        e.on(a().Events.MEDIA_ATTACHED, r)
      }
        , I = function(t) {
        y(t).onMediaAttached && t.hls && t.hls.off(a().Events.MEDIA_ATTACHED, y(t).onMediaAttached),
        v("preloading", t)
      }
    }
    ,
    333: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        setup: ()=>g,
        teardown: ()=>v
      });
      var i = r(325)
        , n = r.n(i)
        , a = r(327)
        , s = r(1)
        , o = s.default.lib("utilities/wlog").wlog.getPrefixedFunctions("hls_video")
        , l = s.default.lib("utilities/cacheable")
        , u = l.makeCacheable
        , d = l.uncacheNamespace
        , c = l.makeNamespace
        , f = u("track_stream_changes")
        , h = c("track_stream_changes")
        , g = function(t) {
        var e = t.hls;
        h(t).lastLevel = null,
        h(t).lastAutoLevel = null,
        h(t).substreamIndex = 0;
        var r = f(t, "onFragChanged", (function() {
          return function(e, r) {
            if (r.frag.level !== t._lastLevel || r.frag.autoLevel != t._lastAutoLevel) {
              var i = (0,
              a.levelToAsset)(t, r.frag.level);
              t.trigger("stream-changed", i || r.frag),
              h(t).lastLevel = r.frag.level,
              h(t).lastAutoLevel = r.frag.autoLevel,
              h(t).substreamIndex += 1,
              0 <= r.frag.level ? o.notice("frag switch to", i || r.frag.level, "at", t.getCurrentTime()) : o.notice("frag switch to Auto at", t.getCurrentTime())
            }
          }
        }
        ));
        e.off(n().Events.FRAG_CHANGED, r),
        e.on(n().Events.FRAG_CHANGED, r);
        var i = f(t, "onAudioSwitching", (function() {
          return function(e, r) {
            t.trigger("audiostreamchange"),
            0 < r.id ? o.notice("audio asset switch to track: ", r.id, "at", t.lastBufferedTime()) : o.notice("level switch to original encoded audio at", t.lastBufferedTime())
          }
        }
        ));
        e.off(n().Events.AUDIO_TRACK_SWITCHING, i),
        e.on(n().Events.AUDIO_TRACK_SWITCHING, i);
        var s = f(t, "onLevelSwitching", (function() {
          return function(e, r) {
            if (0 <= r.level) {
              var i = (0,
              a.levelToAsset)(t, r.level);
              o.notice("level switch to", i || r.level, "at", t.lastBufferedTime())
            } else
              o.notice("level switch to Auto at", t.lastBufferedTime())
          }
        }
        ));
        e.off(n().Events.LEVEL_SWITCHING, s),
        e.on(n().Events.LEVEL_SWITCHING, s)
      }
        , v = function(t) {
        h(t).onFragChanged && t.hls && t.hls.off(n().Events.FRAG_CHANGED, h(t).onFragChanged),
        h(t).onLevelSwitch && t.hls && t.hls.off(n().Events.LEVEL_SWITCHING, h(t).onLevelSwitching),
        d("track_stream_changes", t)
      }
    }
    ,
    354: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        PUBLIC_METHODS: ()=>i,
        delegateMethods: ()=>n,
        delegatePublicMethods: ()=>a
      });
      var i = ["activeBufferRange", "anyBuffered", "bind", "bindNamed", "bufferInfo", "canDownloadMedia", "cancelFullscreen", "captureCurrentFrame", "changeQuality", "changeStream", "changeStreamWithoutLoad", "changeVideo", "currentAsset", "defaultAsset", "destroy", "diagnosticData", "eventContext", "fit", "getAudioTracks", "getCurrentQuality", "getCurrentTime", "getCuts", "getDuration", "getDurationBeforeCuts", "getMediaElement", "getMediaType", "getPlaybackMode", "getPlaybackRate", "getPreload", "getState", "getTimeAfterCuts", "getTimeBeforeCuts", "getTrim", "getVolume", "hasIssuedPlay", "isChangingVideo", "isInitializingFromUnmuted", "isInFullscreen", "isMuted", "isSeeking", "isSourceOfBrowserEvent", "lastBufferedTime", "mute", "onEnterFullscreen", "onHeightChange", "onLeaveFullscreen", "onMediaDataChanged", "onPlayed", "onReady", "onWidthChange", "pause", "play", "playType", "requestFullscreen", "reset", "seek", "seekOnPlay", "selectedAsset", "selectableAssets", "selectableQualities", "selectedQuality", "sequentialBufferedRange", "setAttributes", "setCurrentTime", "setPlaybackRate", "setCuts", "setTrim", "setVolume", "showFirstFrame", "stopStreaming", "timeBeforeEndOfBuffer", "totalBuffered", "totalPlayed", "trigger", "unbind", "unbindNamed", "unbindAllInNamespace", "unmute", "updateStartPosition"]
        , n = function(t, e, r) {
        for (var i, n = 0; n < t.length; n++)
          i = t[n],
          e[i] || function(t) {
            e[t] = function() {
              var e = r.call(this);
              return e ? e[t].apply(e, arguments) : null
            }
          }(i)
      }
        , a = function(t, e) {
        n(i, t, e)
      }
    }
    ,
    339: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        anyBuffered: ()=>n,
        activeBufferRange: ()=>a,
        totalBuffered: ()=>s,
        sequentialBufferedRange: ()=>o,
        bufferInfo: ()=>l,
        lastBufferedTime: ()=>u,
        timeBeforeEndOfBuffer: ()=>d
      });
      var i = r(338)
        , n = function(t) {
        var e = t.video;
        return 0 < e.buffered.length && 0 < e.buffered.end(0)
      }
        , a = function(t) {
        for (var e = t.video, r = e.currentTime, i = 0; i < e.buffered.length; i++) {
          var n = e.buffered.start(i)
            , a = e.buffered.end(i);
          if (n <= r && r < a)
            return [n, a]
        }
        return null
      }
        , s = function(t) {
        return i.sumTimeRanges(t.video.buffered)
      }
        , o = function(t) {
        var e = t.video
          , r = e.buffered
          , i = null;
        try {
          for (var n = 0; n < r.length; n++) {
            var a = r.start(n) - .5
              , s = r.end(n) + .5;
            if (a <= e.currentTime && e.currentTime < s) {
              i = n;
              break
            }
          }
          if (null != i) {
            for (var o = i, l = i; l < r.length; l++) {
              if (!(r.start(l) - .5 <= r.end(o) + .5))
                break;
              o = l
            }
            return [r.start(i), r.end(o)]
          }
          return null
        } catch (t) {
          return logger.error(t),
          null
        }
      }
        , l = function(t, e, r) {
        var n = t.video;
        if (n) {
          var a, s = n.buffered, o = [];
          for (a = 0; a < s.length; a++)
            o.push({
              start: s.start(a),
              end: s.end(a)
            });
          return i.bufferedInfo(o, e, r)
        }
        return {
          len: 0,
          start: 0,
          end: 0,
          nextStart: void 0
        }
      }
        , u = function(t, e) {
        return l(t, t.getCurrentTime(), e).end
      }
        , d = function(t, e) {
        return u(t, e) - t.getCurrentTime()
      }
    }
    ,
    348: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        setup: ()=>o,
        teardown: ()=>l
      });
      var i = r(1)
        , n = i.default.lib("utilities/obj")
        , a = i.default.lib("utilities/event_loop").globalEventLoop
        , s = function(t) {
        var e = t.attributes;
        return (null == e.eventLoopDuration ? 300 : e.eventLoopDuration) / t.getPlaybackRate()
      }
        , o = function(t) {
        null == t.state && (t.state = {}),
        "playing" === t.getPlaybackMode() && (t.state.hasPlayed = !0),
        t.bind("playing", (function() {
          t.state.hasPlayed = !0
        }
        )),
        t.bind("waiting", (function() {
          t.state.gotWaiting = !0
        }
        )),
        t.bind("loadedmetadata", (function() {
          t.state.loadedMetadata = !0
        }
        )),
        n.assign(t.state, {
          lastPlaybackMode: t.getPlaybackMode(),
          lastTimePosition: t.getCurrentTime(),
          lastEventLoopDuration: s(t)
        });
        var e = "".concat(t.uuid, ".custom_state_and_events");
        a.add(e, s(t), (function() {
          n.assign(t.state, {
            lastTimePosition: t.getCurrentTime(),
            lastPlaybackMode: t.getPlaybackMode(),
            lastEventLoopDuration: s(t)
          }),
          a.interval(e, s(t))
        }
        ))
      }
        , l = function(t) {
        var e = "".concat(t.uuid, ".custom_state_and_events");
        a.remove(e)
      }
    }
    ,
    343: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        getCurrentTimeAfterCuts: ()=>i.getCurrentTimeAfterCuts,
        getCuts: ()=>i.getCuts,
        getDurationAfterCuts: ()=>i.getDurationAfterCuts,
        getTimeAfterCuts: ()=>i.getTimeAfterCuts,
        getTimeBeforeCuts: ()=>i.getTimeBeforeCuts,
        trimStartFromCuts: ()=>a,
        trimEndFromCuts: ()=>s,
        getTrim: ()=>o,
        setCuts: ()=>l,
        enforceCuts: ()=>d,
        teardownCuts: ()=>c,
        enforceCutsNow: ()=>f,
        setTrim: ()=>h
      });
      var i = r(344)
        , n = r(340)
        , a = function(t) {
        var e = (0,
        i.getCuts)(t);
        return 1 > e.length || 0 < e[0].start ? 0 : e[0].end
      }
        , s = function(t) {
        var e = (0,
        i.getCuts)(t)
          , r = (0,
        i.getDurationBeforeCuts)(t);
        return 1 > e.length || e[e.length - 1].end < r ? -1 : e[e.length - 1].start
      }
        , o = function(t) {
        return {
          start: a(t),
          end: s(t)
        }
      }
        , l = function(t, e) {
        t.attributes.cuts = e,
        e !== t._rawCuts && (t._cuts = void 0,
        t._rawCuts = void 0),
        d(t)
      }
        , u = function t(e, r) {
        return r || (r = {
          current: null
        }),
        r.current = requestAnimationFrame((function() {
          !1 !== e() && t(e, r)
        }
        )),
        function() {
          cancelAnimationFrame(r.current)
        }
      }
        , d = function(t) {
        if (!t._stopEnforcingCuts && 0 !== (0,
        i.getCuts)(t).length) {
          var e = function() {
            t._stopEnforcingCutsViaRafLoop && (t._stopEnforcingCutsViaRafLoop(),
            t._stopEnforcingCutsViaRafLoop = void 0)
          }
            , r = [t.on("playing", (function() {
            e(),
            t._stopEnforcingCutsViaRafLoop = u((function() {
              if (!t.state.seeking && !t.video.seeking && (f(t),
              !t._stopEnforcingCutsViaRafLoop))
                return !1
            }
            ))
          }
          )), t.on("pause", e), t.on("ended", e), t.on("beforeplay", e), t.on("timeupdate", (function() {
            f(t)
          }
          ))];
          t._stopEnforcingCuts = function() {
            e(),
            r.forEach((function(t) {
              return t()
            }
            )),
            t._stopEnforcingCuts = void 0
          }
        }
      }
        , c = function(t) {
        t._stopEnforcingCuts && (t._stopEnforcingCuts(),
        t._stopEnforcingCuts = void 0)
      }
        , f = function(t) {
        if ("beforeplay" !== t.getPlaybackMode()) {
          var e = t.video.currentTime
            , r = (0,
          i.getCuts)(t).filter((function(t) {
            if (t.start <= e && e < t.end)
              return t
          }
          ))[0]
            , a = (0,
          i.getDurationBeforeCuts)(t);
          t.state.fakeEnded && (0,
          i.getTimeAfterCuts)(t, e) < (0,
          i.getDurationAfterCuts)(t) - .1 && (t.state.fakeEnded = !1),
          r && (r.end < a - .1 ? (0,
          n.seekWithoutCuts)(t, r.end + 1e-6) : !t.state.fakeEnded && (t.state.fakeEnded = !0,
          t.attributes.loop ? (t.trigger("ended"),
          t.seek(0).then((function() {
            return t.play()
          }
          ))) : (t.pause(),
          t.trigger("ended"))))
        }
      }
        , h = function(t, e) {
        var r = e.start
          , i = e.end;
        null != r && (0 <= r ? t.attributes.trimStart = e.start : delete t.attributes.trimStart),
        null != i && (0 <= i ? t.attributes.trimEnd = e.end : delete t.attributes.trimEnd),
        t._cuts = void 0,
        f(t),
        d(t)
      }
    }
    ,
    344: (t,e,r)=>{
      "use strict";
      function i(t) {
        return function(t) {
          if (Array.isArray(t))
            return n(t)
        }(t) || function(t) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
            return Array.from(t)
        }(t) || function(t, e) {
          if (t) {
            if ("string" == typeof t)
              return n(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === r && t.constructor && (r = t.constructor.name),
            "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0
          }
        }(t) || function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
      }
      function n(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, i = Array(e); r < e; r++)
          i[r] = t[r];
        return i
      }
      r.r(e),
      r.d(e, {
        getDurationBeforeCuts: ()=>a,
        getDurationAfterCuts: ()=>s,
        getTimeBeforeCuts: ()=>o,
        getTimeAfterCuts: ()=>l,
        getCurrentTimeAfterCuts: ()=>u,
        getCuts: ()=>c
      });
      var a = function(t) {
        var e = t.attributes;
        return null != e.duration ? e.duration : 2 <= t.video.readyState ? t.video.duration : void 0
      }
        , s = function(t) {
        var e = c(t)
          , r = a(t);
        if (1 > e.length)
          return r;
        var i = r;
        return e.forEach((function(t) {
          i -= t.end - t.start
        }
        )),
        i
      }
        , o = function(t, e) {
        var r = a(t)
          , i = c(t)
          , n = 0
          , s = 0
          , o = 0;
        return i.forEach((function(t) {
          var r = t.start - s;
          if ((o += r) <= e + n) {
            var i = t.end - t.start;
            n += i,
            o += i
          }
          s = t.end
        }
        )),
        Math.min(r, e + n)
      }
        , l = function(t, e) {
        var r = c(t);
        if (1 > r.length)
          return e;
        var i = e;
        return r.forEach((function(t) {
          t.start <= e && (i -= Math.min(e, t.end) - t.start)
        }
        )),
        Math.max(0, i)
      }
        , u = function(t) {
        return l(t, t.video.currentTime)
      }
        , d = Object.freeze([])
        , c = function(t) {
        var e = t.attributes
          , r = e.cuts
          , i = e.trimStart
          , n = e.trimEnd;
        if (t._cuts && r === t._rawCuts)
          return t._cuts;
        if (!r && null == i && null == n)
          return d;
        t._rawCuts = r,
        t._cuts = f(t);
        var a = {
          start: t.attributes.trimStart,
          end: t.attributes.trimEnd
        };
        return t._cuts = h(t, a, t._cuts),
        Object.freeze(t._cuts),
        t._cuts
      }
        , f = function(t) {
        var e = a(t)
          , r = t.attributes
          , i = r.cuts
          , n = r.trimStart
          , s = r.trimEnd;
        if (!i)
          return [];
        var o = i.map((function(r) {
          var i = null == r.start ? 0 : g(t, r.start)
            , n = null != r.end && -1 !== r.end ? g(t, r.end) : e;
          return n > i ? {
            start: i,
            end: n
          } : null
        }
        )).filter(Boolean);
        null != n && o.push({
          start: 0,
          end: n
        }),
        null != s && o.push({
          start: s,
          end: e
        }),
        o = o.sort((function(t, e) {
          return t.start - e.start
        }
        ));
        var l = {
          start: 0,
          end: 0
        };
        return o = o.map((function(t) {
          return t.end < l.end ? null : (t.start < l.end && (t.start = l.end),
          l = t,
          t)
        }
        )).filter(Boolean)
      }
        , h = function(t, e, r) {
        var n = i(r)
          , s = a(t)
          , o = e.start
          , l = e.end
          , u = n[0]
          , d = n[n.length - 1]
          , c = u && (0 === u.start || 0 > u.start) ? u : void 0
          , f = d && (d.end >= s || 0 > d.end) ? d : void 0;
        if (null != o)
          if (0 <= o) {
            var h = {
              start: 0,
              end: o
            };
            c ? n.splice(0, 1, h) : n.unshift(h)
          } else
            c && n.shift();
        if (null != l)
          if (0 <= l) {
            var g = {
              start: l,
              end: s
            };
            f ? n.splice(n.length - 1, 1, g) : n.push(g)
          } else
            f && n.pop();
        return n
      }
        , g = function(t, e) {
        var r = a(t);
        return Math.min(r, Math.max(0, e))
      }
    }
    ,
    353: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        getDiagnosticData: ()=>n
      });
      var i = function(t) {
        try {
          return t()
        } catch (t) {
          return "ERROR: ".concat(t.message)
        }
      }
        , n = function(t) {
        var e = {};
        return e.state = t.state,
        e.attributes = t.attributes,
        e.currentAsset = t.currentAsset(),
        e.currentAsset && e.currentAsset.url && 100 < e.currentAsset.url.length && (e.currentAsset.url = "".concat(e.currentAsset.url.substring(0, 97), "...")),
        e.selectedAsset = t.selectedAsset(),
        e.selectedAsset && e.selectedAsset.url && 100 < e.selectedAsset.url.length && (e.selectedAsset.url = "".concat(e.selectedAsset.url.substring(0, 97), "...")),
        e.getState = i((function() {
          return t.getState()
        }
        )),
        e.getDuration = i((function() {
          return t.getDuration()
        }
        )),
        e.getPlaybackRate = i((function() {
          return t.getPlaybackRate()
        }
        )),
        e.getPlaybackMode = i((function() {
          return t.getPlaybackMode()
        }
        )),
        e.isSeeking = i((function() {
          return t.isSeeking()
        }
        )),
        e.getCurrentTime = i((function() {
          return t.getCurrentTime()
        }
        )),
        e.activeBufferRange = i((function() {
          return t.activeBufferRange()
        }
        )),
        e.sequentialBufferedRange = i((function() {
          return t.sequentialBufferedRange()
        }
        )),
        e.getVolume = i((function() {
          return t.getVolume()
        }
        )),
        e.timeBeforeEndOfBuffer = i((function() {
          return t.timeBeforeEndOfBuffer()
        }
        )),
        e.lastBufferedTime = i((function() {
          return t.lastBufferedTime()
        }
        )),
        e.totalBuffered = i((function() {
          return t.totalBuffered()
        }
        )),
        e.anyBuffered = i((function() {
          return t.anyBuffered()
        }
        )),
        e.getPreload = i((function() {
          return t.getPreload()
        }
        )),
        e.rawVideoProps = i((function() {
          return s(t)
        }
        )),
        e
      }
        , a = ["autoplay", "controls", "crossOrigin", "currentSrc", "currentTime", "defaultMuted", "defaultPlaybackRate", "duration", "ended", "error", "loop", "muted", "networkState", "paused", "playbackRate", "preload", "readyState", "seeking", "src", "startDate", "volume"]
        , s = function(t) {
        for (var e = t.video, r = {}, i = 0; i < a.length; i++) {
          var n = a[i]
            , s = e[n];
          r[n] = s
        }
        return r
      }
    }
    ,
    351: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        fixWebkitControlsBug: ()=>l
      });
      var i = r(1)
        , n = i.default.lib("utilities/detect").cachedDetect
        , a = i.default.lib("utilities/wlog").wlog
        , s = n()
        , o = a.getPrefixedFunctions("SimpleVideo")
        , l = function(t) {
        var e = t.video;
        if (s.browser.webkit) {
          o.info("fixWebkitControlsBug");
          var r = e.getAttribute("controls");
          e.setAttribute("controls", "controls"),
          e.removeAttribute("controls"),
          null != r && e.setAttribute("controls", r)
        }
      }
    }
    ,
    338: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        createElement: ()=>g,
        setupVideoElemAttributes: ()=>m,
        inferTypeAttribute: ()=>p,
        srcProtocolAndHost: ()=>y,
        tinyMp4Url: ()=>E,
        sumTimeRanges: ()=>b,
        bufferedInfo: ()=>T,
        properAssetUrl: ()=>A
      });
      var i = r(1)
        , n = i.default.lib("utilities/detect").cachedDetect
        , a = i.default.lib("player/lib/elem").elemFromObject
        , s = i.default.lib("utilities/url").Url
        , o = i.default.lib("player/lib/assets").isBakeryUrl
        , l = i.default.lib("player/lib/hosts")
        , u = l.eV1Protocol
        , d = l.eV1Host
        , c = l.deliveryHost
        , f = n()
        , h = "".concat(u(), "//").concat(d(), "/assets/images/blank.gif")
        , g = function(t, e, r) {
        var i = {
          tagName: "video",
          id: t,
          crossorigin: "anonymous",
          style: {
            background: "transparent",
            display: "block",
            height: "100%",
            maxHeight: "none",
            maxWidth: "none",
            position: "static",
            visibility: "visible",
            width: "100%"
          }
        };
        (f.browser.msie || f.trident) && (i.style.minWidth = "10px",
        i.style.minHeight = "10px");
        var n = {
          tagName: "source",
          src: A(e.url),
          type: p(e, r)
        };
        return r.excludeSourceElem || (i.childNodes = [n]),
        m(a(i), e, r)
      }
        , v = function(t, e, r) {
        null != r && !1 !== r ? !0 === r ? (t[e] = !0,
        t.setAttribute(e, "")) : (t[e] = r,
        t.setAttribute(e, r)) : (t[e] = !1,
        t.removeAttribute(e))
      }
        , m = function(t, e, r) {
        return r.poster ? (t.poster = r.poster,
        t.setAttribute("poster", r.poster)) : (t.poster = h,
        t.setAttribute("poster", h)),
        v(t, "aria-label", "Video"),
        v(t, "defaultPlaybackRate", r.defaultPlaybackRate || 1),
        v(t, "src", A(e.url)),
        v(t, "controlslist", r.controlslist || "nodownload"),
        v(t, "playsinline", r.playsinline),
        v(t, "muted", r.muted),
        v(t, "loop", r.loop),
        v(t, "controls", null != r.controls && r.controls),
        v(t, "preload", r.preload || "none"),
        v(t, "type", p(e, r)),
        v(t, "x-webkit-airplay", null == r.webkitAirplay ? "allow" : r.webkitAirplay),
        null != r.volume && (t.volume = r.volume),
        r.disablePictureInPicture && v(t, "disablePictureInPicture", r.disablePictureInPicture),
        t
      }
        , p = function(t, e) {
        if (null != e.contentType)
          return e.contentType;
        var r = "video/".concat(t.ext);
        return e.spherical && (r += ";dimension=360;"),
        r
      }
        , y = function(t) {
        if (o(t)) {
          var e = new s(t);
          if (e.protocol)
            return "".concat(e.protocol, "//").concat(e.host)
        }
        return "".concat(u(), "//").concat(c(u()))
      }
        , E = function(t) {
        return "".concat(y(t), "/tiny.mp4")
      }
        , b = function(t) {
        if (null == t)
          return null;
        for (var e = 0, r = 0; r < t.length; r++)
          e += t.end(r) - t.start(r);
        return e
      }
        , T = function(t, e, r) {
        var i, n, a, s, o, l = [];
        for (t.sort((function(t, e) {
          var r = t.start - e.start;
          return r || e.end - t.end
        }
        )),
        o = 0; o < t.length; o++) {
          var u = l.length;
          if (u) {
            var d = l[u - 1].end;
            t[o].start - d < r ? t[o].end > d && (l[u - 1].end = t[o].end) : l.push(t[o])
          } else
            l.push(t[o])
        }
        for (o = 0,
        i = 0,
        n = a = e; o < l.length; o++) {
          var c = l[o].start
            , f = l[o].end;
          if (e + r >= c && e < f)
            n = c,
            i = (a = f) - e;
          else if (e + r < c) {
            s = c;
            break
          }
        }
        return {
          len: i,
          start: n,
          end: a,
          nextStart: s
        }
      }
        , A = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "mp4";
        return o(t) && /\.bin$/.test(t) ? t.replace(/\.bin$/, "") + "/file.".concat(e) : t
      }
    }
    ,
    337: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        default: ()=>_
      });
      var i = r(1)
        , n = r(338)
        , a = r(339)
        , s = r(340)
        , o = r(345)
        , l = r(346)
        , u = r(342)
        , d = (r(350),
      r(351))
        , c = r(341)
        , f = r(352)
        , h = r(353)
        , g = r(347)
        , v = r(354)
        , m = r(343)
        , p = r(355)
        , y = r(344);
      function E(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      function b(t, e) {
        for (var r, i = 0; i < e.length; i++)
          (r = e[i]).enumerable = r.enumerable || !1,
          r.configurable = !0,
          "value"in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
      }
      var T = i.default.lib("utilities/bindify").bindify
        , A = i.default.lib("utilities/obj")
        , S = i.default.lib("player/lib/assets")
        , L = i.default.lib("utilities/seqid").seqId
        , k = i.default.lib("promiscuous")
        , D = function() {
        function t(e, r) {
          var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
            , n = 3 < arguments.length ? arguments[3] : void 0;
          E(this, t),
          this.uuid = L("wistia_simple_video_"),
          this.root = e,
          this.state = {},
          g.setupProperties(this, r, i),
          n ? g.fromOtherEngine(this, n) : g.injectVideo(this),
          d.fixWebkitControlsBug(this),
          g.setupBindingsAndLoops(this),
          f.fit(this)
        }
        return e = t,
        (r = [{
          key: "activeBufferRange",
          value: function() {
            return a.activeBufferRange(this)
          }
        }, {
          key: "anyBuffered",
          value: function() {
            return a.anyBuffered(this)
          }
        }, {
          key: "cancelFullscreen",
          value: function() {
            return u.cancelFullscreen(this)
          }
        }, {
          key: "captureCurrentFrame",
          value: function() {
            for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            return u.captureCurrentFrame.apply(u, [this].concat(e))
          }
        }, {
          key: "changeQuality",
          value: function(t) {
            return l.changeQuality(this, t)
          }
        }, {
          key: "changeStream",
          value: function(t) {
            return l.changeStream(this, t)
          }
        }, {
          key: "changeStreamWithoutLoad",
          value: function(t) {
            return l.changeStreamWithoutLoad(this, t)
          }
        }, {
          key: "changeVideo",
          value: function(t, e) {
            return l.changeVideo(this, t, e)
          }
        }, {
          key: "currentAsset",
          value: function() {
            return this._currentAsset
          }
        }, {
          key: "defaultAsset",
          value: function() {
            return this.selectableAssets()[0]
          }
        }, {
          key: "destroy",
          value: function() {
            var t = this.state || {};
            this.state = {
              eventContext: t.eventContext,
              destroyed: !0,
              issuedPlay: t.issuedPlay
            },
            g.killBindingsAndStopLoops(this),
            this._bindings = {}
          }
        }, {
          key: "diagnosticData",
          value: function() {
            return h.getDiagnosticData(this)
          }
        }, {
          key: "eventContext",
          value: function() {
            return this.state.eventContext
          }
        }, {
          key: "fit",
          value: function() {
            return f.fit(this)
          }
        }, {
          key: "hasIssuedPlay",
          value: function() {
            return !!this.state.issuedPlay
          }
        }, {
          key: "getAudioTracks",
          value: function() {
            return []
          }
        }, {
          key: "getCurrentQuality",
          value: function() {
            var t = this.currentAsset();
            if (t)
              return S.numericSizeSnapped(t.width, t.height);
            var e = this.selectedAsset();
            return e ? S.numericSizeSnapped(e.width, e.height) : "?"
          }
        }, {
          key: "getCurrentTime",
          value: function() {
            return u.getCurrentTime(this)
          }
        }, {
          key: "getCuts",
          value: function() {
            return (0,
            y.getCuts)(this)
          }
        }, {
          key: "getDuration",
          value: function() {
            return u.getDuration(this)
          }
        }, {
          key: "getMediaElement",
          value: function() {
            return this.video
          }
        }, {
          key: "getMediaType",
          value: function() {
            return this.mediaData.mediaType
          }
        }, {
          key: "getPlaybackMode",
          value: function() {
            return c.getPlaybackMode(this)
          }
        }, {
          key: "getPlaybackRate",
          value: function() {
            return u.getPlaybackRate(this)
          }
        }, {
          key: "getPreload",
          value: function() {
            return u.getPreload(this)
          }
        }, {
          key: "getState",
          value: function() {
            return u.getState(this)
          }
        }, {
          key: "getDurationBeforeCuts",
          value: function() {
            return (0,
            y.getDurationBeforeCuts)(this)
          }
        }, {
          key: "getTimeAfterCuts",
          value: function(t) {
            return (0,
            y.getTimeAfterCuts)(this, t)
          }
        }, {
          key: "getTimeBeforeCuts",
          value: function(t) {
            return (0,
            y.getTimeBeforeCuts)(this, t)
          }
        }, {
          key: "getTrim",
          value: function() {
            return (0,
            m.getTrim)(this)
          }
        }, {
          key: "getVolume",
          value: function() {
            return u.getVolume(this)
          }
        }, {
          key: "isChangingVideo",
          value: function() {
            return l.isChangingVideo(this)
          }
        }, {
          key: "isInFullscreen",
          value: function() {
            return u.isInFullscreen(this)
          }
        }, {
          key: "isInitializingFromUnmuted",
          value: function() {
            return u.isInitializingFromUnmuted(this)
          }
        }, {
          key: "isMuted",
          value: function() {
            return u.isMuted(this)
          }
        }, {
          key: "isSeeking",
          value: function() {
            return s.isSeeking(this)
          }
        }, {
          key: "isSourceOfBrowserEvent",
          value: function(t) {
            return u.isSourceOfBrowserEvent(this, t)
          }
        }, {
          key: "lastBufferedTime",
          value: function(t) {
            return a.lastBufferedTime(this, t)
          }
        }, {
          key: "mute",
          value: function() {
            return u.mute(this)
          }
        }, {
          key: "onEnterFullscreen",
          value: function() {
            return u.onEnterFullscreen(this)
          }
        }, {
          key: "onHeightChange",
          value: function(t) {
            return f.onHeightChange(this, t)
          }
        }, {
          key: "onLeaveFullscreen",
          value: function() {
            return u.onLeaveFullscreen(this)
          }
        }, {
          key: "onReady",
          value: function() {
            return o.onReady(this)
          }
        }, {
          key: "onWidthChange",
          value: function(t) {
            return f.onWidthChange(this, t)
          }
        }, {
          key: "pause",
          value: function() {
            return u.pause(this)
          }
        }, {
          key: "play",
          value: function(t) {
            return u.play(this, t)
          }
        }, {
          key: "playType",
          value: function() {
            return u.playType(this)
          }
        }, {
          key: "requestFullscreen",
          value: function() {
            return u.requestFullscreen(this)
          }
        }, {
          key: "reset",
          value: function() {
            this.state = {}
          }
        }, {
          key: "seek",
          value: function(t, e) {
            return s.seek(this, t, e)
          }
        }, {
          key: "seekOnPlay",
          value: function(t) {
            return s.seekOnPlay(this, t)
          }
        }, {
          key: "selectedAsset",
          value: function() {
            return this._currentAsset
          }
        }, {
          key: "selectableAssets",
          value: function() {
            return this.allAssets
          }
        }, {
          key: "selectableQualities",
          value: function() {
            return this.selectableAssets().map((function(t) {
              return "variable" === t.width ? t.slug : S.numericSizeSnapped(t.width, t.height)
            }
            )).sort((function(t, e) {
              return ("auto" === t ? -1 : t) - ("auto" === e ? -1 : e)
            }
            ))
          }
        }, {
          key: "selectedQuality",
          value: function() {
            var t = this.selectedAsset();
            return t ? S.numericSizeSnapped(t.width, t.height) : "?"
          }
        }, {
          key: "sequentialBufferedRange",
          value: function() {
            return a.sequentialBufferedRange(this)
          }
        }, {
          key: "setAttributes",
          value: function(t) {
            A.assign(this.attributes, t)
          }
        }, {
          key: "onMediaDataChanged",
          value: function() {}
        }, {
          key: "onPlayed",
          value: function() {
            var t = this
              , e = this.state;
            return e && e.hasPlayed ? k.resolve() : new k((function(e) {
              t.bind("playing", (function r() {
                t.unbind("playing", r),
                e()
              }
              ))
            }
            ))
          }
        }, {
          key: "setCurrentTime",
          value: function(t) {
            return u.setCurrentTime(this, t)
          }
        }, {
          key: "setCuts",
          value: function(t) {
            return (0,
            m.setCuts)(this, t)
          }
        }, {
          key: "setPlaybackRate",
          value: function(t) {
            return u.setPlaybackRate(this, t)
          }
        }, {
          key: "setTrim",
          value: function(t) {
            return (0,
            m.setTrim)(this, t)
          }
        }, {
          key: "setVolume",
          value: function(t) {
            return u.setVolume(this, t)
          }
        }, {
          key: "showFirstFrame",
          value: function() {
            return s.seek(this, .01)
          }
        }, {
          key: "canDownloadMedia",
          value: function() {
            return !0
          }
        }, {
          key: "stopStreaming",
          value: function() {
            return l.stopStreaming(this)
          }
        }, {
          key: "timeBeforeEndOfBuffer",
          value: function(t) {
            return a.timeBeforeEndOfBuffer(this, t)
          }
        }, {
          key: "totalBuffered",
          value: function() {
            return a.totalBuffered(this)
          }
        }, {
          key: "totalPlayed",
          value: function() {
            return n.sumTimeRanges(this.video.played)
          }
        }, {
          key: "unmute",
          value: function() {
            return u.unmute(this)
          }
        }, {
          key: "updateStartPosition",
          value: function() {}
        }]) && b(e.prototype, r),
        i && b(e, i),
        t;
        var e, r, i
      }();
      T(D.prototype),
      D.delegatePublicMethods = v.delegatePublicMethods,
      D.PUBLIC_METHODS = v.PUBLIC_METHODS,
      D.mediaDataWithAssets = function(t, e) {
        var r = A.clone(t);
        return r.assets = A.clone(e),
        r
      }
      ,
      (0,
      p.default)("SimpleVideo", D),
      i.default.define("player/engines/simple_video/index.js", D);
      const _ = D
    }
    ,
    347: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        setupProperties: ()=>u,
        injectVideo: ()=>d,
        fromOtherEngine: ()=>c,
        setupBindingsAndLoops: ()=>f,
        killBindingsAndStopLoops: ()=>h
      });
      var i = r(338)
        , n = r(348)
        , a = r(349)
        , s = r(350)
        , o = r(343)
        , l = r(1).default.lib("player/lib/elem").elemAppend
        , u = function(t, e, r) {
        var i = e.assets;
        0 === i.length && (i = [{}]),
        t.mediaData = e,
        t.allAssets = i,
        t.attributes = r
      }
        , d = function(t) {
        t._currentAsset = t.defaultAsset(),
        t.video = i.createElement(t.uuid, t._currentAsset, t.attributes),
        t.onReady(),
        l(t.root, t.video)
      }
        , c = function(t, e) {
        var r = e.isMuted()
          , n = e.hasIssuedPlay();
        "Audio" === e.mediaData.mediaType ? d(t) : t.video = e.getMediaElement(),
        t.onReady(),
        t.bind("loadstart", (function() {
          return setTimeout((function() {
            t.state.isInitializingFromOtherEngine = !1
          }
          ), 0),
          t.unbind
        }
        )),
        i.setupVideoElemAttributes(t.video, t.defaultAsset(), t.attributes),
        t.state.eventContext = e.eventContext(),
        t.root.appendChild(t.video),
        t._currentAsset = t.defaultAsset(),
        t.changeStreamWithoutLoad(t.defaultAsset()),
        t.state.isInitializingFromOtherEngine = !0,
        t.state.otherEngineWasMuted = r,
        t.state.otherEnginePlayed = n,
        t.video.load()
      }
        , f = function(t) {
        a.setup(t),
        (0,
        o.enforceCuts)(t),
        s.setup(t),
        n.setup(t)
      }
        , h = function(t) {
        s.teardown(t),
        (0,
        o.teardownCuts)(t),
        n.teardown(t),
        a.teardown(t)
      }
    }
    ,
    352: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        onWidthChange: ()=>d,
        onHeightChange: ()=>c,
        fit: ()=>g
      });
      var i = r(1)
        , n = i.default.lib("player/lib/elem")
        , a = n.elemStyle
        , s = n.elemWidth
        , o = n.elemHeight
        , l = i.default.lib("player/lib/assets")
        , u = (0,
      i.default.lib("utilities/detect").cachedDetect)()
        , d = function(t, e) {
        return t.setAttributes({
          width: e
        }),
        g(t)
      }
        , c = function(t, e) {
        return t.setAttributes({
          height: e
        }),
        g(t)
      }
        , f = "contain"
        , h = "fill"
        , g = function(t) {
        var e = t.attributes.fitStrategy || v(t);
        return e === f ? p(t) : "cover" === e ? m(t) : e === h ? y(t) : p(t)
      }
        , v = function(t) {
        var e = t.attributes.height
          , r = t.attributes.width
          , i = l.originalAspect(t.allAssets)
          , n = e * i
          , a = 2 * Math.floor(r / i / 2)
          , s = Math.abs(a - e)
          , o = Math.abs(n - r)
          , d = u.firefox && u.browser.mozilla && 36 <= u.browser.version;
        return (u.browser.webkit || d) && 0 < s && 10 >= s && 0 < o && 10 >= o ? h : f
      }
        , m = function(t) {
        var e = t.video
          , r = l.videoAspect(t.allAssets)
          , i = s(t.root) / o(t.root);
        u.trident || u.edge || u.browser.msie ? a(e, i <= r ? {
          height: "100%",
          left: "50%",
          objectFit: "contain",
          position: "relative",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: "1920px"
        } : {
          height: "1088px",
          left: "50%",
          objectFit: "contain",
          position: "relative",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: "100%"
        }) : a(e, {
          objectFit: "cover"
        })
      }
        , p = function(t) {
        var e = t.video;
        a(e, {
          objectFit: "contain",
          height: "100%",
          width: "100%"
        })
      }
        , y = function(t) {
        var e = t.video;
        a(e, {
          objectFit: "fill",
          height: "100%",
          width: "100%"
        })
      }
    }
    ,
    345: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        onReady: ()=>f
      });
      var i = r(1)
        , n = (i.default.lib("promiscuous"),
      i.default.lib("utilities/wlog").wlog)
        , a = i.default.lib("player/lib/elem")
        , s = (a.elemBind,
      a.elemUnbind,
      i.default.lib("utilities/detect").cachedDetect)
        , o = i.default.lib("player/lib/timeout-utils")
        , l = o.doTimeout
        , u = o.clearTimeouts
        , d = i.default.lib("utilities/stopgo")
        , c = n.getPrefixedFunctions("SimpleVideo")
        , f = (s(),
      function(t) {
        var e = t.video;
        null == t.state && (t.state = {});
        var r = t.state;
        if (r.onReadyStopGo)
          return r.onReadyStopGo;
        var i = new d;
        if (r.onReadyStopGo = i,
        !r.hasBeenReady) {
          if (2 <= e.readyState)
            c.info("ready readyState", e.src, e.readyState),
            r.hasBeenReady = !0,
            i.go();
          else {
            t.bind("loadstart", (function() {
              u("".concat(t.uuid, ".ready_fallback")),
              c.info("ready loadstart"),
              r.hasBeenReady = !0,
              i.go()
            }
            )),
            l("".concat(t.uuid, ".ready_fallback"), (function() {
              r.hasBeenReady || (c.info("ready fallback"),
              r.hasBeenReady = !0,
              i.go())
            }
            ), 200)
          }
          return i
        }
        i.go()
      }
      )
    }
    ,
    341: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        BEFORE_PLAY: ()=>n,
        ENDED: ()=>a,
        PAUSED: ()=>s,
        PLAYING: ()=>o,
        UNKNOWN: ()=>l,
        getPlaybackMode: ()=>u
      });
      var i = r(1).default.lib("utilities/wlog").wlog.getPrefixedFunctions("SimpleVideo")
        , n = "beforeplay"
        , a = "ended"
        , s = "paused"
        , o = "playing"
        , l = "unknown"
        , u = function(t) {
        var e = t.video;
        try {
          return t.state.hasPlayed ? t.state.fakeEnded || e.ended ? a : e.paused ? s : o : n
        } catch (t) {
          return i.warn(t),
          l
        }
      }
    }
    ,
    350: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        setup: ()=>o,
        teardown: ()=>l
      });
      var i = r(1).default.lib("player/lib/elem")
        , n = i.elemBind
        , a = i.elemUnbind
        , s = ["beforeplay", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "playing", "progress", "ratechange", "seeked", "volumechange", "timeupdate", "waiting", "webkitbeginfullscreen", "webkitendfullscreen", "webkitplaybacktargetavailabilitychanged"]
        , o = function(t) {
        for (var e, r = 0; r < s.length; r++)
          e = s[r],
          function(e, r) {
            var i = "_marshalEvent_".concat(r);
            t[i] = t[i] || function(i) {
              null == t.state && (t.state = {}),
              "playing" === r && ("playing" !== r || e.paused) || (t.state.eventContext = i,
              t.trigger(r, i),
              t.state.eventContext = null)
            }
            ,
            n(e, r, t[i])
          }(t.video, e)
      }
        , l = function(t) {
        for (var e = 0; e < s.length; e++) {
          var r = s[e]
            , i = "_marshalEvent_".concat(r);
          a(t.video, r, t[i])
        }
      }
    }
    ,
    340: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        seek: ()=>h,
        seekWithoutCuts: ()=>g,
        seekOnPlay: ()=>p,
        isSeeking: ()=>E
      });
      var i = r(341)
        , n = r(1)
        , a = r(342)
        , s = r(344)
        , o = n.default.lib("promiscuous")
        , l = n.default.lib("utilities/obj").assign
        , u = n.default.lib("player/lib/elem")
        , d = u.elemBind
        , c = u.elemUnbind
        , f = n.default.lib("utilities/wlog").wlog.getPrefixedFunctions("SimpleVideo")
        , h = function(t, e, r) {
        var i = (0,
        s.getTimeBeforeCuts)(t, e);
        return g(t, i, r)
      }
        , g = function(t, e, r) {
        return f.info("seek", e),
        t.getPlaybackMode() === i.BEFORE_PLAY ? v(t, e, r) : m(t, e, r)
      }
        , v = function(t, e) {
        var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
          , i = t.video;
        return f.info("seekBeforePlay", e),
        new o((function(n, s) {
          f.info("time ".concat(e, ": seek beforeplay"));
          var u = "playing" === t.getPlaybackMode();
          i.style.visibility = "hidden",
          l(t.state, {
            seeking: !0
          }),
          f.info("time ".concat(e, ": start stream by calling play")),
          (0,
          a.playWithoutCuts)(t).then((function(s) {
            f.info("time ".concat(e, ": jump to time after playing")),
            i.currentTime = e;
            var d = new o((function(i) {
              u || !1 === r.pause ? (f.info("time: ".concat(e, ": play after seek")),
              i()) : (f.info("time: ".concat(e, ": pause after seek")),
              (0,
              a.pause)(t).then(i))
            }
            ));
            y(t).then((function() {
              d.then((function() {
                i.style.visibility = "inherit",
                l(t.state, {
                  seeking: !1
                }),
                n(s)
              }
              ))
            }
            ))
          }
          )).catch((function(e) {
            i.style.visibility = "inherit",
            l(t.state, {
              seeking: !1
            }),
            s(e)
          }
          ))
        }
        ))
      }
        , m = function(t, e) {
        return f.info("seekNow", e),
        new o((function(r) {
          f.info("seekNow: start", e),
          t.video.currentTime = e,
          l(t.state, {
            seeking: !0
          }),
          y(t).then((function() {
            l(t.state, {
              seeking: !1
            }),
            f.info("seekNow: resolve", e),
            r()
          }
          ))
        }
        ))
      }
        , p = function(t, e) {
        return new o((function(r) {
          "playing" === t.getPlaybackMode() ? m(t, e).then(r) : t.bind("playing", (function() {
            return m(t, e).then(r),
            t.unbind
          }
          ))
        }
        ))
      }
        , y = function(t) {
        var e = t.video;
        return new o((function(t) {
          e.seeking ? (f.info("waiting for seek"),
          d(e, "seeked", (function() {
            return f.info("seeked"),
            t(),
            c
          }
          ))) : (f.info("no wait for seek"),
          t())
        }
        ))
      }
        , E = function(t) {
        var e = t.state
          , r = t.video;
        return !(!e.seeking && !r.seeking)
      }
    }
    ,
    342: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        play: ()=>A,
        playWithoutCuts: ()=>S,
        playType: ()=>L,
        pause: ()=>k,
        setCurrentTime: ()=>D,
        setCurrentTimeWithoutCuts: ()=>_,
        getCurrentTime: ()=>R,
        getState: ()=>C,
        setVolume: ()=>I,
        getVolume: ()=>x,
        supportsPlaybackRate: ()=>w,
        setPlaybackRate: ()=>O,
        getPlaybackRate: ()=>P,
        getDuration: ()=>F,
        isSourceOfBrowserEvent: ()=>M,
        isMuted: ()=>B,
        getPreload: ()=>N,
        mute: ()=>U,
        unmute: ()=>G,
        onEnterFullscreen: ()=>j,
        onLeaveFullscreen: ()=>H,
        isInitializingFromUnmuted: ()=>V,
        isInFullscreen: ()=>W,
        onWidthChange: ()=>K,
        onHeightChange: ()=>Y,
        requestFullscreen: ()=>q,
        cancelFullscreen: ()=>z,
        captureCurrentFrame: ()=>X
      });
      var i = r(343)
        , n = r(1)
        , a = r(344)
        , s = n.default.lib("promiscuous")
        , o = n.default.lib("player/lib/elem")
        , l = (o.elemBind,
      o.elemUnbind)
        , u = o.safeRequestAnimationFrame
        , d = o.elemRequestFullscreen
        , c = o.elemCancelFullscreen
        , f = o.inUserEventContext
        , h = n.default.lib("utilities/wlog").wlog
        , g = n.default.lib("utilities/detect").cachedDetect
        , v = n.default.lib("utilities/obj").merge
        , m = h.getPrefixedFunctions("SimpleVideo")
        , p = g()
        , y = "play"
        , E = "play-silently"
        , b = "cannot-play"
        , T = function() {
        return p.chrome || p.firefox || p.edge || p.trident ? "probably" : !!(p.safari || p.ios.version && 12 <= p.ios.version) && "maybe"
      }
        , A = function(t, e) {
        var r = (0,
        i.trimStartFromCuts)(t);
        return t.state.fakeEnded || t.video.currentTime < r ? new s((function(r, i) {
          t.seek(0, {
            pause: !1
          }).then((function(n) {
            S(t, v({}, e, {
              playType: y
            })).then((function() {
              r(n)
            }
            )).catch(i)
          }
          )).catch(i)
        }
        )) : S(t, e)
      }
        , S = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
          , r = t.video
          , i = e.playType || L(t, e);
        return null == t.state.issuedPlay && i !== b && (t.state.issuedPlay = !0),
        new s((function(n, a) {
          t.state.lastPlayRejected = !1;
          var s = t.getPlaybackMode();
          if (m.info("play: start", i),
          "playing" === s)
            m.info("play: already playing, resolve"),
            n(y);
          else if (i === b)
            a(new Error("Cannot issue play."));
          else {
            i === E && t.mute(),
            t.trigger("beforeplay"),
            "ended" === s && 0 < p.ios.version && r.load();
            var o = r.play();
            if (o && o.then && o.catch)
              o.then((function() {
                m.info("play: got", i, "resolve"),
                n(i)
              }
              )).catch((function(s) {
                m.notice(s),
                t.state.lastPlayRejected = !0;
                var o = null == e.silentAutoPlay ? t.attributes.silentAutoPlay : e.silentAutoPlay;
                i !== y || t.isMuted() || "allow" !== o && null != o ? (m.notice("play: rejected"),
                a(s)) : (t.mute(),
                r.play().then((function() {
                  m.info("play: got silent fallback, resolve"),
                  n(E)
                }
                )).catch((function(e) {
                  t.unmute(),
                  a(e)
                }
                )))
              }
              ));
            else {
              setTimeout((function() {
                p.ios.version && 10.1 > p.ios.version && r.paused && a(new Error("Video still paused after play issued."))
              }
              ), 10);
              t.bind("playing", (function() {
                return m.info("play: got playing, resolve"),
                n(i),
                l
              }
              ))
            }
          }
        }
        ))
      }
        , L = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        if ("playing" === t.getPlaybackMode())
          return y;
        if (t.isInitializingFromUnmuted())
          return y;
        if (f())
          return y;
        var r = t.attributes
          , i = null == e.silentAutoPlay ? r.silentAutoPlay : e.silentAutoPlay;
        return !0 === i ? t.isMuted() ? y : E : !1 === i ? y : "allow" === i || null == i ? T() || t.isMuted() ? y : E : y
      }
        , k = function(t) {
        var e = t.video;
        return m.info("pause"),
        new s((function(t) {
          m.info("pause: start"),
          e.pause(),
          u((function() {
            m.info("pause: resolve"),
            t()
          }
          ))
        }
        ))
      }
        , D = function(t, e) {
        var r = (0,
        a.getTimeBeforeCuts)(t, e);
        return _(t, r)
      }
        , _ = function(t, e) {
        m.info("setCurrentTime", e),
        t.video.currentTime = e
      }
        , R = function(t) {
        return (0,
        i.getCurrentTimeAfterCuts)(t)
      }
        , C = function(t) {
        return {
          playbackMode: t.getPlaybackMode(),
          currentTime: t.getCurrentTime(),
          volume: t.getVolume(),
          playbackRate: t.getPlaybackRate()
        }
      }
        , I = function(t, e) {
        m.info("setVolume", e),
        t.video.volume = e
      }
        , x = function(t) {
        return t.video.volume
      }
        , w = function(t) {
        return null != t.video.playbackRate
      }
        , O = function(t, e) {
        m.info("setPlaybackRate", e),
        w(t) ? t.video.playbackRate = e : m.info("playbackRate is not supported on", t.video)
      }
        , P = function(t) {
        return w(t) ? t.video.playbackRate : 1
      }
        , F = function(t) {
        return (0,
        i.getDurationAfterCuts)(t)
      }
        , M = function(t, e) {
        return e.target == t.video
      }
        , B = function(t) {
        var e = t.video;
        return !!(e.muted || t.state.loadedMetadata && 0 === e.volume || t.state.hasPlayed && e.audioTracks && 0 === e.audioTracks.length)
      }
        , N = function(t) {
        return t.video.getAttribute("preload")
      }
        , U = function(t) {
        t.video.muted = !0,
        t.video.setAttribute("muted", "muted")
      }
        , G = function(t) {
        t.video.muted = !1,
        t.video.removeAttribute("muted")
      }
        , j = function(t) {
        t.state.isInFullscreen = !0;
        var e = t.attributes.backgroundColor || "#000";
        t.video.style.backgroundColor = e
      }
        , H = function(t) {
        t.state.isInFullscreen = !1,
        t.video.style.backgroundColor = "transparent"
      }
        , V = function(t) {
        var e = t.state;
        return e.isInitializingFromOtherEngine && e.otherEnginePlayed && !e.otherEngineWasMuted
      }
        , W = function(t) {
        return !!t.state.isInFullscreen
      }
        , K = function(t) {}
        , Y = function(t) {}
        , q = function(t) {
        t.setAttributes({
          fitStrategy: "contain"
        }),
        t.fit(),
        d(t.video)
      }
        , z = function(t) {
        t.setAttributes({
          fitStrategy: "auto"
        }),
        t.fit(),
        c(t.video)
      }
        , X = function(t) {
        var e = t.video
          , r = document.createElement("canvas");
        r.width = e.videoWidth,
        r.height = e.videoHeight,
        r.getContext("2d").drawImage(e, 0, 0, r.width, r.height);
        for (var i = arguments.length, n = Array(1 < i ? i - 1 : 0), a = 1; a < i; a++)
          n[a - 1] = arguments[a];
        return r.toDataURL.apply(r, n)
      }
    }
    ,
    346: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        stopStreaming: ()=>g,
        changeQuality: ()=>v,
        changeStreamWithoutLoad: ()=>m,
        changeStream: ()=>p,
        changeVideo: ()=>E,
        initAfterChangeVideo: ()=>T,
        isChangingVideo: ()=>y,
        teardownBeforeChangeVideo: ()=>b
      });
      var i = r(338)
        , n = r(347)
        , a = r(1)
        , s = a.default.lib("promiscuous")
        , o = a.default.lib("utilities/wlog").wlog
        , l = a.default.lib("player/lib/elem")
        , u = l.elemInDom
        , d = l.elemBind
        , c = l.elemUnbind
        , f = a.default.lib("player/lib/assets")
        , h = o.getPrefixedFunctions("SimpleVideo")
        , g = function(t) {
        try {
          if (t.state.destroyed)
            return;
          h.info("stopStreaming");
          var e = t.video;
          e.src = "".concat(i.srcProtocolAndHost(e.getAttribute("src")), "/tiny.mp4"),
          e.load()
        } catch (t) {
          h.notice(t)
        }
      }
        , v = function(t, e, r, i) {
        var n = t.selectableAssets()
          , a = f.findClosestAssetByQuality(n, e);
        return "beforeplay" === t.getPlaybackMode() ? (m(t, a),
        s.resolve()) : p(t, a, r, i)
      }
        , m = function(t, e) {
        h.info("changeStreamWithoutLoad", e && e.slug, e);
        var r = t.video;
        if (u(r)) {
          var n = i.properAssetUrl(e.url, e.container);
          t.state = {
            eventContext: t.state.eventContext
          },
          t._currentAsset = e,
          r.src = n;
          var a = function(t) {
            for (var e, r = t.video, i = [], n = 0; n < r.childNodes.length; n++)
              1 === (e = r.childNodes[n]).nodeType && "source" === e.tagName.toLowerCase() && i.push(e);
            return i
          }(t);
          0 < a.length && (a[0].src = n),
          t.trigger("stream-changed", t._currentAsset)
        }
      }
        , p = function(t, e) {
        var r = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2]
          , n = !!(3 < arguments.length && void 0 !== arguments[3]) && arguments[3];
        h.info("changeStream", r, n, e && e.slug, e);
        var a = t.video;
        return t.asset = e,
        new s((function(s) {
          var o = i.properAssetUrl(e.url, e.container);
          if (n || o !== a.getAttribute("src")) {
            var l = t.getState();
            t.state.seeking = !0,
            d(a, "loadstart", (function() {
              return n ? (a.style.visibility = "visible",
              t.state.seeking = !1,
              s()) : 2 < l.currentTime ? t.seek(l.currentTime).then((function() {
                "playing" === l.playbackMode ? t.play().then((function() {
                  t.state.seeking = !1,
                  a.style.visibility = "visible",
                  s()
                }
                )) : t.pause().then((function() {
                  a.style.visibility = "visible",
                  t.state.seeking = !1,
                  s()
                }
                ))
              }
              )) : ("playing" === l.playbackMode && t.play(),
              a.style.visibility = "visible",
              t.state.seeking = !1,
              s()),
              t.setPlaybackRate(l.playbackRate),
              c
            }
            )),
            a.style.visibility = "hidden",
            m(t, e, n),
            "beforeplay" === l.playbackMode || r || t.play()
          } else
            s()
        }
        ))
      }
        , y = function(t) {
        return !!t.state.isChangingVideo
      }
        , E = function(t, e, r) {
        return b(t),
        t.state.isChangingVideo = !0,
        T(t, e, r),
        new s((function(e) {
          p(t, t.defaultAsset()).then((function() {
            t.state.isChangingVideo = !1,
            e()
          }
          ))
        }
        ))
      }
        , b = function(t) {
        var e = t.state.eventContext;
        t.destroy(),
        t.state.eventContext = e
      }
        , T = function(t, e, r) {
        n.setupProperties(t, e, r),
        n.setupBindingsAndLoops(t, t.allAssets, r)
      }
    }
    ,
    349: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        maybeTriggerWaiting: ()=>f,
        setup: ()=>d,
        teardown: ()=>c
      });
      var i = r(1)
        , n = i.default.lib("utilities/obj")
        , a = i.default.lib("player/lib/elem")
        , s = a.elemBind
        , o = a.elemUnbind
        , l = i.default.lib("utilities/event_loop").globalEventLoop
        , u = function(t) {
        var e = t.attributes;
        return (null == e.eventLoopDuration ? 300 : e.eventLoopDuration) / t.getPlaybackRate()
      }
        , d = function(t) {
        null == t.state && (t.state = {}),
        t.state.waiting = -1;
        var e = "".concat(t.uuid, ".waiting_events");
        l.add(e, u(t), (function() {
          f(t),
          l.interval(e, u(t))
        }
        ))
      }
        , c = function(t) {
        var e = "".concat(t.uuid, ".waiting_events");
        l.remove(e)
      }
        , f = function(t) {
        var e = t.video
          , r = t.state
          , i = r.lastPlaybackMode
          , a = r.gotWaiting && "beforeplay" === t.getPlaybackMode() || "playing" === t.getPlaybackMode()
          , l = "playing" === i || "beforeplay" === i && !r.lastPlayRejected
          , d = r.lastEventLoopDuration || u(t);
        if (a && l)
          if (t.getCurrentTime() === r.lastTimePosition) {
            var c = r.startedWaitingAt;
            c ? (r.waiting = ((new Date).getTime() - c) / 1e3,
            t.trigger("custom-waiting", r.waiting)) : (n.assign(r, {
              startedWaitingAt: (new Date).getTime() - d,
              waiting: d / 1e3
            }),
            t.trigger("custom-waiting", d / 1e3),
            s(e, "timeupdate", (function() {
              return h(t),
              o
            }
            )))
          } else
            h(t);
        else
          h(t)
      }
        , h = function(t) {
        var e = t.state.waiting;
        n.assign(t.state, {
          waiting: -1,
          startedWaitingAt: null
        }),
        null != e && 0 <= e && t.trigger("custom-done-waiting", e)
      }
    }
    ,
    2: (t,e,r)=>{
      "use strict";
      var i;
      r.r(e),
      r.d(e, {
        default: ()=>n
      });
      try {
        (i = self).self !== i && void 0 !== typeof i.self && "undefined" != typeof window && (i = window)
      } catch (t) {
        i = "undefined" == typeof globalThis ? window : globalThis
      }
      const n = i
    }
    ,
    1: (t,e,r)=>{
      "use strict";
      r.r(e),
      r.d(e, {
        default: ()=>a
      });
      var i = r(2);
      null == i.default.Wistia && (i.default.Wistia = {});
      var n = i.default.Wistia;
      null == n._initializers && (n._initializers = {}),
      null == n._destructors && (n._destructors = {}),
      null == n.mixin && (n.mixin = function(t, e) {
        for (var r in e)
          e.hasOwnProperty(r) && (t[r] = e[r])
      }
      );
      const a = i.default.Wistia
    }
    ,
    334: (t,e,r)=>{
      var i, n, a, s, o, l, u, d = function(t, e) {
        return function() {
          return t.apply(e, arguments)
        }
      };
      o = r(1).default,
      s = r(325),
      u = o.lib("utilities/wlog").wlog,
      l = u.getPrefixedFunctions("hlsabr"),
      a = r(335).default,
      i = r(336).default,
      n = function() {
        function t(t) {
          var e, r;
          this.hls = t,
          this.abandonRulesCheck = d(this.abandonRulesCheck, this),
          this._onFragLoaded = d(this._onFragLoaded, this),
          this._onFragLoading = d(this._onFragLoading, this),
          this._onError = d(this._onError, this),
          this.lastLoadedFragLevel = 0,
          this._autoLevelCapping = -1,
          this._nextAutoLevel = -1,
          this.defaultEstimate = this.hls.config.abrEwmaDefaultEstimate || 5e5,
          this.minTotalWeight = .001,
          this._sampleCount = 0,
          this._fast = new a(this.hls.config.abrEwmaFastVoD),
          this._slow = new a(this.hls.config.abrEwmaSlowVoD),
          this.minAutoLevel = 0,
          (r = this.hls.config.abrEwmaDefaultEstimate) && (e = r / 8,
          this.sample(6e3, 6 * e)),
          this.hls.on(s.Events.FRAG_LOADING, this._onFragLoading),
          this.hls.on(s.Events.FRAG_LOADED, this._onFragLoaded),
          this.hls.on(s.Events.FRAG_LOADED, this._onError)
        }
        return t.prototype.destroy = function() {
          return this.clearTimer(),
          this.hls.off(s.Events.FRAG_LOADED, this._onFragLoaded),
          this.hls.off(s.Events.FRAG_LOADING, this._onFragLoading),
          this.hls.off(s.Events.FRAG_LOADING, this._onError)
        }
        ,
        t.prototype.getNextAutoLevel = function() {
          var t, e, r, i, n;
          if (i = this.maxAutoLevel(),
          -1 !== this._nextAutoLevel)
            return Math.min(this._nextAutoLevel, i);
          for (t = this.getEstimate() / this.playbackRate(),
          e = r = 0,
          n = i; 0 <= n ? r <= n : r >= n; e = 0 <= n ? ++r : --r)
            if ((e <= this.lastLoadedFragLevel ? this.hls.config.abrBandWidthFactor * t : this.hls.config.abrBandWidthUpFactor * t) < this.bitrateForLevel(e))
              return Math.max(0, e - 1);
          return e - 1
        }
        ,
        t.prototype.bitrateForLevel = function(t) {
          return "function" == typeof this.hls.config.bitrateForLevel ? this.hls.config.bitrateForLevel(t) : this.hls.levels[t].bitrate
        }
        ,
        t.prototype._onError = function(t, e) {
          var r, i;
          if (r = e.details === s.ErrorDetails.FRAG_LOAD_ERROR,
          i = e.details === s.ErrorDetails.FRAG_LOAD_TIMEOUT,
          r || i)
            return this.clearTimer()
        }
        ,
        t.prototype._onFragLoading = function(t, e) {
          var r, i;
          if ((r = e.frag).stats.loading.start = performance.now(),
          this.fragCurrent = r,
          this.timer || (this.timer = setInterval(this.abandonRulesCheck, 100)),
          !this._setupSeekTracking)
            return this._setupSeekTracking = !0,
            this.hls.media.addEventListener("seeked", (i = this,
            function() {
              var t;
              if (null != (t = i.hls) && t.media)
                return 0 < i.hls.media.currentTime && 3 > i.hls.media.currentTime ? void 0 : (i._justSeeked = !0,
                clearTimeout(i._unsetSeekedTimeout),
                i._unsetSeekedTimeout = setTimeout((function() {
                  return i._justSeeked = !1
                }
                ), 3e3))
            }
            ))
        }
        ,
        t.prototype._onFragLoaded = function(t, e) {
          var r, i, n, a;
          if (a = (n = e.frag).stats,
          "main" === n.type && (this.clearTimer(),
          null == a.aborted && !a.alreadySampled))
            return i = performance.now() - a.loading.start,
            r = a.loaded,
            !this.hls.media.seeking && this._justSeeked && 3 > this.timeBeforeEndOfBuffer() ? this.sample(.35 * i, .35 * r) : this.sample(i, r),
            this.lastLoadedFragLevel = n.level,
            this._nextAutoLevel = -1
        }
        ,
        t.prototype.abandonRulesCheck = function() {
          var t, e, r, n, a, s, o, u, d, c, f, h, g, v, m;
          if (m = (o = this.hls).media,
          (!(n = this.fragCurrent).loader || (null == (g = n.loader.stats) ? void 0 : g.aborted)) && (o.config.debug.info("hlsjs: frag loader destroy or aborted, disarm abandonRulesCheck"),
          this.clearTimer()),
          m && !m.paused && n.autoLevel && n.level && (u = .1,
          3e3 < (v = performance.now() - n.stats.loading.start) && v > 1e3 * n.duration * .5 && (d = o.levels,
          c = Math.max(1, 1e3 * n.loaded / v),
          t = this.bitrateForLevel(n.level),
          r = Math.max(n.loaded, Math.round((n.duration - u) * t / 8)),
          h = m.currentTime,
          s = (r - n.loaded) / c,
          (e = i.bufferInfo(m, h, o.config.maxBufferHole).end - h) < 2 * n.duration && s > e))) {
            if (f = n.level - 1,
            0 === n.loaded)
              return 1 > m.currentTime && (isNaN(f) && l.error("abandonRulesCheck a: nextLoadLevel is NaN", f, s, e, h, c, v, d),
              o.startLevel = f),
              o.nextLoadLevel = f;
            for (; 0 <= f && (t = this.bitrateForLevel(f),
            a = n.duration * t / (7.2 * c) + u,
            o.config.debug.info("hlsjs: fragLoadedDelay/bufferStarvationDelay/fragLevelNextLoadedDelay[" + f + "] :" + s.toFixed(1) + "/" + e.toFixed(1) + "/" + a.toFixed(1)),
            !(a < e)); )
              f -= 1;
            return 1 < s - a && (f = Math.max(0, f),
            1 > m.currentTime && (isNaN(f) && l.error("abandonRulesCheck b: nextLoadLevel is NaN", f, s, e, h, c, v, d),
            o.startLevel = f),
            o.nextLoadLevel = f,
            this.sample(v, n.loaded)),
            o.config.debug.warn("loading too slow, abort fragment loading and switch to level " + f),
            n.loader.abort(),
            this.clearTimer(),
            o.trigger(Event.FRAG_LOAD_EMERGENCY_ABORTED, {
              frag: n
            }),
            o.startLoad()
          }
        }
        ,
        t.prototype.clearTimer = function() {
          if (this.timer)
            return clearInterval(this.timer),
            this.timer = null
        }
        ,
        t.prototype.maxAutoLevel = function() {
          var t;
          return t = this.hls.levels,
          -1 === this._autoLevelCapping && (null == t ? void 0 : t.length) ? t.length - 1 : this._autoLevelCapping
        }
        ,
        t.prototype.playbackRate = function() {
          var t;
          return 0 === (null == (t = this.hls.media) ? void 0 : t.playbackRate) ? 1 : Math.abs(t.playbackRate)
        }
        ,
        t.prototype.sample = function(t, e) {
          var r, i;
          return i = (t = Math.max(t, 50)) / 1e3,
          r = 8e3 * e / t,
          this._fast.sample(i, r),
          this._slow.sample(i, r),
          this._sampleCount += 1
        }
        ,
        t.prototype.getEstimate = function() {
          return 1 > this._sampleCount || this._fast.getTotalWeight() < this.minTotalWeight ? this.defaultEstimate : this.hls.media ? 6 >= this.timeBeforeEndOfBuffer() ? Math.min(this._fast.getEstimate(), this._slow.getEstimate()) : Math.max(this._fast.getEstimate(), this._slow.getEstimate()) : Math.min(this._fast.getEstimate(), this._slow.getEstimate())
        }
        ,
        t.prototype.timeBeforeEndOfBuffer = function() {
          return i.timeBeforeEndOfBuffer(this.hls.media, this.hls.config.maxBufferHole)
        }
        ,
        t.prototype.lastBufferedTime = function() {
          return i.lastBufferedTime(this.hls.media, this.hls.config.maxBufferHole)
        }
        ,
        Object.defineProperties(t.prototype, {
          nextAutoLevel: {
            get: function() {
              return this.getNextAutoLevel()
            },
            set: function(t) {
              return this._nextAutoLevel = t
            }
          },
          autoLevelCapping: {
            get: function() {
              return this._autoLevelCapping
            },
            set: function(t) {
              return this._autoLevelCapping = t
            }
          }
        }),
        t
      }(),
      t.exports = n
    }
    ,
    325: function(t) {
      var e;
      "undefined" != typeof window && (e = function() {
        return function(t) {
          function e(i) {
            if (r[i])
              return r[i].exports;
            var n = r[i] = {
              i,
              l: !1,
              exports: {}
            };
            return t[i].call(n.exports, n, n.exports, e),
            n.l = !0,
            n.exports
          }
          var r = {};
          return e.m = t,
          e.c = r,
          e.d = function(t, r, i) {
            e.o(t, r) || Object.defineProperty(t, r, {
              enumerable: !0,
              get: i
            })
          }
          ,
          e.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
              value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
              value: !0
            })
          }
          ,
          e.t = function(t, r) {
            if (1 & r && (t = e(t)),
            8 & r)
              return t;
            if (4 & r && "object" == typeof t && t && t.__esModule)
              return t;
            var i = Object.create(null);
            if (e.r(i),
            Object.defineProperty(i, "default", {
              enumerable: !0,
              value: t
            }),
            2 & r && "string" != typeof t)
              for (var n in t)
                e.d(i, n, function(e) {
                  return t[e]
                }
                .bind(null, n));
            return i
          }
          ,
          e.n = function(t) {
            var r = t && t.__esModule ? function() {
              return t.default
            }
            : function() {
              return t
            }
            ;
            return e.d(r, "a", r),
            r
          }
          ,
          e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }
          ,
          e.p = "/dist/",
          e(e.s = "./src/hls.ts")
        }({
          "./node_modules/eventemitter3/index.js": function(t, e, r) {
            "use strict";
            function i() {}
            function n(t, e, r) {
              this.fn = t,
              this.context = e,
              this.once = r || !1
            }
            function a(t, e, r, i, a) {
              if ("function" != typeof r)
                throw new TypeError("The listener must be a function");
              var s = new n(r,i || t,a)
                , o = u ? u + e : e;
              return t._events[o] ? t._events[o].fn ? t._events[o] = [t._events[o], s] : t._events[o].push(s) : (t._events[o] = s,
              t._eventsCount++),
              t
            }
            function s(t, e) {
              0 == --t._eventsCount ? t._events = new i : delete t._events[e]
            }
            function o() {
              this._events = new i,
              this._eventsCount = 0
            }
            var l = Object.prototype.hasOwnProperty
              , u = "~";
            Object.create && (i.prototype = Object.create(null),
            !(new i).__proto__ && (u = !1)),
            o.prototype.eventNames = function() {
              var t, e, r = [];
              if (0 === this._eventsCount)
                return r;
              for (e in t = this._events)
                l.call(t, e) && r.push(u ? e.slice(1) : e);
              return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(t)) : r
            }
            ,
            o.prototype.listeners = function(t) {
              var e = u ? u + t : t
                , r = this._events[e];
              if (!r)
                return [];
              if (r.fn)
                return [r.fn];
              for (var i = 0, n = r.length, a = Array(n); i < n; i++)
                a[i] = r[i].fn;
              return a
            }
            ,
            o.prototype.listenerCount = function(t) {
              var e = u ? u + t : t
                , r = this._events[e];
              return r ? r.fn ? 1 : r.length : 0
            }
            ,
            o.prototype.emit = function(t, e, r, i, n, a) {
              var s = u ? u + t : t;
              if (!this._events[s])
                return !1;
              var o, l, d = this._events[s], c = arguments.length;
              if (d.fn) {
                switch (d.once && this.removeListener(t, d.fn, void 0, !0),
                c) {
                case 1:
                  return d.fn.call(d.context),
                  !0;
                case 2:
                  return d.fn.call(d.context, e),
                  !0;
                case 3:
                  return d.fn.call(d.context, e, r),
                  !0;
                case 4:
                  return d.fn.call(d.context, e, r, i),
                  !0;
                case 5:
                  return d.fn.call(d.context, e, r, i, n),
                  !0;
                case 6:
                  return d.fn.call(d.context, e, r, i, n, a),
                  !0
                }
                for (l = 1,
                o = Array(c - 1); l < c; l++)
                  o[l - 1] = arguments[l];
                d.fn.apply(d.context, o)
              } else {
                var f, h = d.length;
                for (l = 0; l < h; l++)
                  switch (d[l].once && this.removeListener(t, d[l].fn, void 0, !0),
                  c) {
                  case 1:
                    d[l].fn.call(d[l].context);
                    break;
                  case 2:
                    d[l].fn.call(d[l].context, e);
                    break;
                  case 3:
                    d[l].fn.call(d[l].context, e, r);
                    break;
                  case 4:
                    d[l].fn.call(d[l].context, e, r, i);
                    break;
                  default:
                    if (!o)
                      for (f = 1,
                      o = Array(c - 1); f < c; f++)
                        o[f - 1] = arguments[f];
                    d[l].fn.apply(d[l].context, o)
                  }
              }
              return !0
            }
            ,
            o.prototype.on = function(t, e, r) {
              return a(this, t, e, r, !1)
            }
            ,
            o.prototype.once = function(t, e, r) {
              return a(this, t, e, r, !0)
            }
            ,
            o.prototype.removeListener = function(t, e, r, i) {
              var n = u ? u + t : t;
              if (!this._events[n])
                return this;
              if (!e)
                return s(this, n),
                this;
              var a = this._events[n];
              if (a.fn)
                a.fn !== e || i && !a.once || r && a.context !== r || s(this, n);
              else {
                for (var o = 0, l = [], d = a.length; o < d; o++)
                  (a[o].fn !== e || i && !a[o].once || r && a[o].context !== r) && l.push(a[o]);
                l.length ? this._events[n] = 1 === l.length ? l[0] : l : s(this, n)
              }
              return this
            }
            ,
            o.prototype.removeAllListeners = function(t) {
              var e;
              return t ? (e = u ? u + t : t,
              this._events[e] && s(this, e)) : (this._events = new i,
              this._eventsCount = 0),
              this
            }
            ,
            o.prototype.off = o.prototype.removeListener,
            o.prototype.addListener = o.prototype.on,
            o.prefixed = u,
            o.EventEmitter = o,
            t.exports = o
          },
          "./node_modules/url-toolkit/src/url-toolkit.js": function(t, e, r) {
            var i, n, a, s, o;
            i = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#[^]*)?$/,
            n = /^([^\/?#]*)([^]*)$/,
            a = /(?:\/|^)\.(?=\/)/g,
            s = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,
            o = {
              buildAbsoluteURL: function(t, e, r) {
                if (r = r || {},
                t = t.trim(),
                !(e = e.trim())) {
                  if (!r.alwaysNormalize)
                    return t;
                  var i = o.parseURL(t);
                  if (!i)
                    throw new Error("Error trying to parse base URL.");
                  return i.path = o.normalizePath(i.path),
                  o.buildURLFromParts(i)
                }
                var a = o.parseURL(e);
                if (!a)
                  throw new Error("Error trying to parse relative URL.");
                if (a.scheme)
                  return r.alwaysNormalize ? (a.path = o.normalizePath(a.path),
                  o.buildURLFromParts(a)) : e;
                var s = o.parseURL(t);
                if (!s)
                  throw new Error("Error trying to parse base URL.");
                if (!s.netLoc && s.path && "/" !== s.path[0]) {
                  var l = n.exec(s.path);
                  s.netLoc = l[1],
                  s.path = l[2]
                }
                s.netLoc && !s.path && (s.path = "/");
                var u = {
                  scheme: s.scheme,
                  netLoc: a.netLoc,
                  path: null,
                  params: a.params,
                  query: a.query,
                  fragment: a.fragment
                };
                if (!a.netLoc && (u.netLoc = s.netLoc,
                "/" !== a.path[0]))
                  if (a.path) {
                    var d = s.path
                      , c = d.substring(0, d.lastIndexOf("/") + 1) + a.path;
                    u.path = o.normalizePath(c)
                  } else
                    u.path = s.path,
                    a.params || (u.params = s.params,
                    !a.query && (u.query = s.query));
                return null === u.path && (u.path = r.alwaysNormalize ? o.normalizePath(a.path) : a.path),
                o.buildURLFromParts(u)
              },
              parseURL: function(t) {
                var e = i.exec(t);
                return e ? {
                  scheme: e[1] || "",
                  netLoc: e[2] || "",
                  path: e[3] || "",
                  params: e[4] || "",
                  query: e[5] || "",
                  fragment: e[6] || ""
                } : null
              },
              normalizePath: function(t) {
                for (t = t.split("").reverse().join("").replace(a, ""); t.length !== (t = t.replace(s, "")).length; )
                  ;
                return t.split("").reverse().join("")
              },
              buildURLFromParts: function(t) {
                return t.scheme + t.netLoc + t.path + t.params + t.query + t.fragment
              }
            },
            t.exports = o
          },
          "./node_modules/webworkify-webpack/index.js": function(t, e, r) {
            function i(t) {
              function e(i) {
                if (r[i])
                  return r[i].exports;
                var n = r[i] = {
                  i,
                  l: !1,
                  exports: {}
                };
                return t[i].call(n.exports, n, n.exports, e),
                n.l = !0,
                n.exports
              }
              var r = {};
              e.m = t,
              e.c = r,
              e.i = function(t) {
                return t
              }
              ,
              e.d = function(t, r, i) {
                e.o(t, r) || Object.defineProperty(t, r, {
                  configurable: !1,
                  enumerable: !0,
                  get: i
                })
              }
              ,
              e.r = function(t) {
                Object.defineProperty(t, "__esModule", {
                  value: !0
                })
              }
              ,
              e.n = function(t) {
                var r = t && t.__esModule ? function() {
                  return t.default
                }
                : function() {
                  return t
                }
                ;
                return e.d(r, "a", r),
                r
              }
              ,
              e.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
              }
              ,
              e.p = "/",
              e.oe = function(t) {
                throw console.error(t),
                t
              }
              ;
              var i = e(e.s = ENTRY_MODULE);
              return i.default || i
            }
            function n(t) {
              return (t + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
            }
            function a(t, e, i) {
              var a = {};
              a[i] = [];
              var s, o = e.toString(), l = o.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
              if (!l)
                return a;
              for (var u, d = l[1], c = new RegExp("(\\\\n|\\W)" + n(d) + "\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)","g"); u = c.exec(o); )
                "dll-reference" !== u[3] && a[i].push(u[3]);
              for (c = new RegExp("\\(" + n(d) + '\\("(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))"\\)\\)\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)',"g"); u = c.exec(o); )
                t[u[2]] || (a[i].push(u[1]),
                t[u[2]] = r(u[1]).m),
                a[u[2]] = a[u[2]] || [],
                a[u[2]].push(u[4]);
              for (var f = Object.keys(a), h = 0; h < f.length; h++)
                for (var g = 0; g < a[f[h]].length; g++)
                  s = a[f[h]][g],
                  !isNaN(1 * s) && (a[f[h]][g] = 1 * a[f[h]][g]);
              return a
            }
            function s(t) {
              return Object.keys(t).reduce((function(e, r) {
                return e || 0 < t[r].length
              }
              ), !1)
            }
            t.exports = function(t, e) {
              e = e || {};
              var n = {
                main: r.m
              }
                , o = e.all ? {
                main: Object.keys(n.main)
              } : function(t, e) {
                for (var r = {
                  main: [e]
                }, i = {
                  main: []
                }, n = {
                  main: {}
                }; s(r); )
                  for (var o = Object.keys(r), l = 0; l < o.length; l++) {
                    var u = o[l]
                      , d = r[u].pop();
                    if (n[u] = n[u] || {},
                    !n[u][d] && t[u][d]) {
                      n[u][d] = !0,
                      i[u] = i[u] || [],
                      i[u].push(d);
                      for (var c = a(t, t[u][d], u), f = Object.keys(c), h = 0; h < f.length; h++)
                        r[f[h]] = r[f[h]] || [],
                        r[f[h]] = r[f[h]].concat(c[f[h]])
                    }
                  }
                return i
              }(n, t)
                , l = "";
              Object.keys(o).filter((function(t) {
                return "main" !== t
              }
              )).forEach((function(t) {
                for (var e = 0; o[t][e]; )
                  e++;
                o[t].push(e),
                n[t][e] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })",
                l = l + "var " + t + " = (" + i.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o[t].map((function(e) {
                  return JSON.stringify(e) + ": " + n[t][e].toString()
                }
                )).join(",") + "});\n"
              }
              )),
              l = l + "new ((" + i.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o.main.map((function(t) {
                return JSON.stringify(t) + ": " + n.main[t].toString()
              }
              )).join(",") + "}))(self);";
              var u = new window.Blob([l],{
                type: "text/javascript"
              });
              if (e.bare)
                return u;
              var d = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(u)
                , c = new window.Worker(d);
              return c.objectURL = d,
              c
            }
          },
          "./src/config.ts": function(t, e, r) {
            "use strict";
            function i() {
              return (i = Object.assign || function(t) {
                for (var e, r = 1; r < arguments.length; r++)
                  for (var i in e = arguments[r])
                    Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t
              }
              ).apply(this, arguments)
            }
            function n(t, e) {
              var r = Object.keys(t);
              if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(t);
                e && (i = i.filter((function(e) {
                  return Object.getOwnPropertyDescriptor(t, e).enumerable
                }
                ))),
                r.push.apply(r, i)
              }
              return r
            }
            function a(t) {
              for (var e, r = 1; r < arguments.length; r++)
                e = null == arguments[r] ? {} : arguments[r],
                r % 2 ? n(Object(e), !0).forEach((function(r) {
                  s(t, r, e[r])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : n(Object(e)).forEach((function(r) {
                  Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
                }
                ));
              return t
            }
            function s(t, e, r) {
              return e in t ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }) : t[e] = r,
              t
            }
            function o(t, e) {
              if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration))
                throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
              if (void 0 !== e.liveMaxLatencyDurationCount && (void 0 === e.liveSyncDurationCount || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount))
                throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
              if (void 0 !== e.liveMaxLatencyDuration && (void 0 === e.liveSyncDuration || e.liveMaxLatencyDuration <= e.liveSyncDuration))
                throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
              return i({}, t, e)
            }
            function l(t) {
              var e = t.loader;
              e !== y.default && e !== p.default ? (b.logger.log("[config]: Custom loader detected, cannot enable progressive streaming"),
              t.progressive = !1) : Object(y.fetchSupported)() && (t.loader = y.default,
              t.progressive = !0,
              t.enableSoftwareAES = !0,
              b.logger.log("[config]: Progressive streaming enabled, using FetchLoader"))
            }
            r.r(e),
            r.d(e, "hlsDefaultConfig", (function() {
              return T
            }
            )),
            r.d(e, "mergeConfig", (function() {
              return o
            }
            )),
            r.d(e, "enableStreamingMode", (function() {
              return l
            }
            ));
            var u = r("./src/controller/abr-controller.ts")
              , d = r("./src/controller/audio-stream-controller.ts")
              , c = r("./src/controller/audio-track-controller.ts")
              , f = r("./src/empty.js")
              , h = r.n(f)
              , g = r("./src/controller/buffer-controller.ts")
              , v = r("./src/controller/cap-level-controller.ts")
              , m = r("./src/controller/fps-controller.ts")
              , p = r("./src/utils/xhr-loader.ts")
              , y = r("./src/utils/fetch-loader.ts")
              , E = r("./src/utils/mediakeys-helper.ts")
              , b = r("./src/utils/logger.ts")
              , T = a(a({
              autoStartLoad: !0,
              startPosition: -1,
              defaultAudioCodec: void 0,
              debug: !1,
              capLevelOnFPSDrop: !1,
              capLevelToPlayerSize: !1,
              initialLiveManifestSize: 1,
              maxBufferLength: 30,
              backBufferLength: 1 / 0,
              maxBufferSize: 6e7,
              maxBufferHole: .1,
              highBufferWatchdogPeriod: 2,
              nudgeOffset: .1,
              nudgeMaxRetry: 3,
              maxFragLookUpTolerance: .25,
              liveSyncDurationCount: 3,
              liveMaxLatencyDurationCount: 1 / 0,
              liveSyncDuration: void 0,
              liveMaxLatencyDuration: void 0,
              maxLiveSyncPlaybackRate: 1,
              liveDurationInfinity: !1,
              liveBackBufferLength: null,
              maxMaxBufferLength: 600,
              enableWorker: !0,
              enableSoftwareAES: !0,
              manifestLoadingTimeOut: 1e4,
              manifestLoadingMaxRetry: 1,
              manifestLoadingRetryDelay: 1e3,
              manifestLoadingMaxRetryTimeout: 64e3,
              startLevel: void 0,
              levelLoadingTimeOut: 1e4,
              levelLoadingMaxRetry: 4,
              levelLoadingRetryDelay: 1e3,
              levelLoadingMaxRetryTimeout: 64e3,
              fragLoadingTimeOut: 2e4,
              fragLoadingMaxRetry: 6,
              fragLoadingRetryDelay: 1e3,
              fragLoadingMaxRetryTimeout: 64e3,
              startFragPrefetch: !1,
              fpsDroppedMonitoringPeriod: 5e3,
              fpsDroppedMonitoringThreshold: .2,
              appendErrorMaxRetry: 3,
              loader: p.default,
              fLoader: void 0,
              pLoader: void 0,
              xhrSetup: void 0,
              licenseXhrSetup: void 0,
              licenseResponseCallback: void 0,
              abrController: u.default,
              bufferController: g.default,
              capLevelController: v.default,
              fpsController: m.default,
              stretchShortVideoTrack: !1,
              maxAudioFramesDrift: 1,
              forceKeyFrameOnDiscontinuity: !0,
              abrEwmaFastLive: 3,
              abrEwmaSlowLive: 9,
              abrEwmaFastVoD: 3,
              abrEwmaSlowVoD: 9,
              abrEwmaDefaultEstimate: 5e5,
              abrBandWidthFactor: .95,
              abrBandWidthUpFactor: .7,
              abrMaxWithRealBitrate: !1,
              maxStarvationDelay: 4,
              maxLoadingDelay: 4,
              minAutoBitrate: 0,
              emeEnabled: !1,
              widevineLicenseUrl: void 0,
              drmSystemOptions: {},
              requestMediaKeySystemAccessFunc: E.requestMediaKeySystemAccess,
              testBandwidth: !0,
              progressive: !1,
              lowLatencyMode: !0
            }, {
              cueHandler: h.a,
              enableCEA708Captions: !1,
              enableWebVTT: !1,
              enableIMSC1: !1,
              captionsTextTrack1Label: "English",
              captionsTextTrack1LanguageCode: "en",
              captionsTextTrack2Label: "Spanish",
              captionsTextTrack2LanguageCode: "es",
              captionsTextTrack3Label: "Unknown CC",
              captionsTextTrack3LanguageCode: "",
              captionsTextTrack4Label: "Unknown CC",
              captionsTextTrack4LanguageCode: "",
              renderTextTracksNatively: !0
            }), {}, {
              subtitleStreamController: void 0,
              subtitleTrackController: void 0,
              timelineController: void 0,
              audioStreamController: d.default,
              audioTrackController: c.default,
              emeController: void 0
            })
          },
          "./src/controller/abr-controller.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            r.r(e);
            var n = r("./src/polyfills/number.ts")
              , a = r("./src/utils/ewma-bandwidth-estimator.ts")
              , s = r("./src/events.ts")
              , o = r("./src/utils/buffer-helper.ts")
              , l = r("./src/errors.ts")
              , u = r("./src/types/loader.ts")
              , d = r("./src/utils/logger.ts")
              , c = function() {
              function t(t) {
                this.hls = void 0,
                this.lastLoadedFragLevel = 0,
                this._nextAutoLevel = -1,
                this.timer = void 0,
                this.onCheck = this._abandonRulesCheck.bind(this),
                this.fragCurrent = null,
                this.partCurrent = null,
                this.bitrateTestDelay = 0,
                this.bwEstimator = void 0,
                this.hls = t;
                var e = t.config;
                this.bwEstimator = new a.default(e.abrEwmaSlowVoD,e.abrEwmaFastVoD,e.abrEwmaDefaultEstimate),
                this.registerListeners()
              }
              var e, r, c, f = t.prototype;
              return f.registerListeners = function() {
                var t = this.hls;
                t.on(s.Events.FRAG_LOADING, this.onFragLoading, this),
                t.on(s.Events.FRAG_LOADED, this.onFragLoaded, this),
                t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this),
                t.on(s.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.on(s.Events.ERROR, this.onError, this)
              }
              ,
              f.unregisterListeners = function() {
                var t = this.hls;
                t.off(s.Events.FRAG_LOADING, this.onFragLoading, this),
                t.off(s.Events.FRAG_LOADED, this.onFragLoaded, this),
                t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this),
                t.off(s.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.off(s.Events.ERROR, this.onError, this)
              }
              ,
              f.destroy = function() {
                this.unregisterListeners(),
                this.clearTimer(),
                this.hls = this.onCheck = null,
                this.fragCurrent = this.partCurrent = null
              }
              ,
              f.onFragLoading = function(t, e) {
                var r, i = e.frag;
                i.type !== u.PlaylistLevelType.MAIN || this.timer || (this.fragCurrent = i,
                this.partCurrent = null == (r = e.part) ? null : r,
                this.timer = self.setInterval(this.onCheck, 100))
              }
              ,
              f.onLevelLoaded = function(t, e) {
                var r = this.hls.config;
                e.details.live ? this.bwEstimator.update(r.abrEwmaSlowLive, r.abrEwmaFastLive) : this.bwEstimator.update(r.abrEwmaSlowVoD, r.abrEwmaFastVoD)
              }
              ,
              f._abandonRulesCheck = function() {
                var t = this.fragCurrent
                  , e = this.partCurrent
                  , r = this.hls
                  , i = r.autoLevelEnabled
                  , a = r.config
                  , l = r.media;
                if (t && l) {
                  var u = e ? e.stats : t.stats
                    , c = e ? e.duration : t.duration;
                  if (u.aborted)
                    return d.logger.warn("frag loader destroy or aborted, disarm abandonRules"),
                    this.clearTimer(),
                    void (this._nextAutoLevel = -1);
                  if (i && !l.paused && l.playbackRate && l.readyState) {
                    var f = performance.now() - u.loading.start
                      , h = Math.abs(l.playbackRate);
                    if (!(f <= 500 * c / h)) {
                      var g = r.levels
                        , v = r.minAutoLevel
                        , m = g[t.level]
                        , p = u.total || Math.max(u.loaded, Math.round(c * m.maxBitrate / 8))
                        , y = Math.max(1, u.bwEstimate ? u.bwEstimate / 8 : 1e3 * u.loaded / f)
                        , E = (p - u.loaded) / y
                        , b = l.currentTime
                        , T = (o.BufferHelper.bufferInfo(l, b, a.maxBufferHole).end - b) / h;
                      if (!(T >= 2 * c / h || E <= T)) {
                        var A, S = Number.POSITIVE_INFINITY;
                        for (A = t.level - 1; A > v && !((S = c * g[A].maxBitrate / (6.4 * y)) < T); A--)
                          ;
                        if (!(S >= E)) {
                          var L = this.bwEstimator.getEstimate();
                          d.logger.warn("Fragment " + t.sn + (e ? " part " + e.index : "") + " of level " + t.level + " is loading too slowly and will cause an underbuffer; aborting and switching to level " + A + "\n      Current BW estimate: " + (Object(n.isFiniteNumber)(L) ? (L / 1024).toFixed(3) : "Unknown") + " Kb/s\n      Estimated load time for current fragment: " + E.toFixed(3) + " s\n      Estimated load time for the next fragment: " + S.toFixed(3) + " s\n      Time to underbuffer: " + T.toFixed(3) + " s"),
                          r.nextLoadLevel = A,
                          this.bwEstimator.sample(f, u.loaded),
                          this.clearTimer(),
                          t.loader && (this.fragCurrent = this.partCurrent = null,
                          t.loader.abort()),
                          r.trigger(s.Events.FRAG_LOAD_EMERGENCY_ABORTED, {
                            frag: t,
                            part: e,
                            stats: u
                          })
                        }
                      }
                    }
                  }
                }
              }
              ,
              f.onFragLoaded = function(t, e) {
                var r = e.frag
                  , i = e.part;
                if (r.type === u.PlaylistLevelType.MAIN && Object(n.isFiniteNumber)(r.sn)) {
                  var a = i ? i.stats : r.stats
                    , o = i ? i.duration : r.duration;
                  if (this.clearTimer(),
                  this.lastLoadedFragLevel = r.level,
                  this._nextAutoLevel = -1,
                  this.hls.config.abrMaxWithRealBitrate) {
                    var l = this.hls.levels[r.level]
                      , d = (l.loaded ? l.loaded.bytes : 0) + a.loaded
                      , c = (l.loaded ? l.loaded.duration : 0) + o;
                    l.loaded = {
                      bytes: d,
                      duration: c
                    },
                    l.realBitrate = Math.round(8 * d / c)
                  }
                  if (r.bitrateTest) {
                    var f = {
                      stats: a,
                      frag: r,
                      part: i,
                      id: r.type
                    };
                    this.onFragBuffered(s.Events.FRAG_BUFFERED, f),
                    r.bitrateTest = !1
                  }
                }
              }
              ,
              f.onFragBuffered = function(t, e) {
                var r = e.frag
                  , i = e.part
                  , n = i ? i.stats : r.stats;
                if (!n.aborted && r.type === u.PlaylistLevelType.MAIN && "initSegment" !== r.sn) {
                  var a = n.parsing.end - n.loading.start;
                  this.bwEstimator.sample(a, n.loaded),
                  n.bwEstimate = this.bwEstimator.getEstimate(),
                  this.bitrateTestDelay = r.bitrateTest ? a / 1e3 : 0
                }
              }
              ,
              f.onError = function(t, e) {
                switch (e.details) {
                case l.ErrorDetails.FRAG_LOAD_ERROR:
                case l.ErrorDetails.FRAG_LOAD_TIMEOUT:
                  this.clearTimer()
                }
              }
              ,
              f.clearTimer = function() {
                self.clearInterval(this.timer),
                this.timer = void 0
              }
              ,
              f.getNextABRAutoLevel = function() {
                var t = this.fragCurrent
                  , e = this.partCurrent
                  , r = this.hls
                  , i = r.maxAutoLevel
                  , n = r.config
                  , a = r.minAutoLevel
                  , s = r.media
                  , l = e ? e.duration : t ? t.duration : 0
                  , u = s ? s.currentTime : 0
                  , c = s && 0 !== s.playbackRate ? Math.abs(s.playbackRate) : 1
                  , f = this.bwEstimator ? this.bwEstimator.getEstimate() : n.abrEwmaDefaultEstimate
                  , h = (o.BufferHelper.bufferInfo(s, u, n.maxBufferHole).end - u) / c
                  , g = this.findBestLevel(f, a, i, h, n.abrBandWidthFactor, n.abrBandWidthUpFactor);
                if (0 <= g)
                  return g;
                d.logger.trace((h ? "rebuffering expected" : "buffer is empty") + ", finding optimal quality level");
                var v = l ? Math.min(l, n.maxStarvationDelay) : n.maxStarvationDelay
                  , m = n.abrBandWidthFactor
                  , p = n.abrBandWidthUpFactor;
                if (!h) {
                  var y = this.bitrateTestDelay;
                  y && (v = (l ? Math.min(l, n.maxLoadingDelay) : n.maxLoadingDelay) - y,
                  d.logger.trace("bitrate test took " + Math.round(1e3 * y) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * v) + " ms"),
                  m = p = 1)
                }
                return g = this.findBestLevel(f, a, i, h + v, m, p),
                Math.max(g, 0)
              }
              ,
              f.findBestLevel = function(t, e, r, i, n, a) {
                for (var s, o, l = this.fragCurrent, u = this.partCurrent, c = this.lastLoadedFragLevel, f = this.hls.levels, h = f[c], g = !(null == h || null === (s = h.details) || void 0 === s || !s.live), v = null == h ? void 0 : h.codecSet, m = u ? u.duration : l ? l.duration : 0, p = r; p >= e; p--)
                  if ((o = f[p]) && (!v || o.codecSet === v)) {
                    var y, E = o.details, b = (u ? null == E ? void 0 : E.partTarget : null == E ? void 0 : E.averagetargetduration) || m;
                    y = p <= c ? n * t : a * t;
                    var T = f[p].maxBitrate
                      , A = T * b / y;
                    if (d.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + p + "/" + Math.round(y) + "/" + T + "/" + b + "/" + i + "/" + A),
                    y > T && (!A || g && !this.bitrateTestDelay || A < i))
                      return p
                  }
                return -1
              }
              ,
              e = t,
              (r = [{
                key: "nextAutoLevel",
                get: function() {
                  var t = this._nextAutoLevel
                    , e = this.bwEstimator;
                  if (!(-1 === t || e && e.canEstimate()))
                    return t;
                  var r = this.getNextABRAutoLevel();
                  return -1 !== t && (r = Math.min(t, r)),
                  r
                },
                set: function(t) {
                  this._nextAutoLevel = t
                }
              }]) && i(e.prototype, r),
              c && i(e, c),
              t
            }();
            e.default = c
          },
          "./src/controller/audio-stream-controller.ts": function(t, e, r) {
            "use strict";
            function i() {
              return (i = Object.assign || function(t) {
                for (var e, r = 1; r < arguments.length; r++)
                  for (var i in e = arguments[r])
                    Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t
              }
              ).apply(this, arguments)
            }
            function n(t, e) {
              return (n = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            r.r(e);
            var a = r("./src/polyfills/number.ts")
              , s = r("./src/controller/base-stream-controller.ts")
              , o = r("./src/events.ts")
              , l = r("./src/utils/buffer-helper.ts")
              , u = r("./src/controller/fragment-tracker.ts")
              , d = r("./src/types/level.ts")
              , c = r("./src/types/loader.ts")
              , f = r("./src/loader/fragment.ts")
              , h = r("./src/demux/chunk-cache.ts")
              , g = r("./src/demux/transmuxer-interface.ts")
              , v = r("./src/types/transmuxer.ts")
              , m = r("./src/controller/fragment-finders.ts")
              , p = r("./src/utils/discontinuities.ts")
              , y = r("./src/errors.ts")
              , E = r("./src/utils/logger.ts")
              , b = function(t) {
              function e(e, r) {
                var i;
                return (i = t.call(this, e, r, "[audio-stream-controller]") || this).videoBuffer = null,
                i.videoTrackCC = -1,
                i.waitingVideoCC = -1,
                i.audioSwitch = !1,
                i.trackId = -1,
                i.waitingData = null,
                i.mainDetails = null,
                i.bufferFlushed = !1,
                i._registerListeners(),
                i
              }
              var r, b;
              b = t,
              (r = e).prototype = Object.create(b.prototype),
              r.prototype.constructor = r,
              n(r, b);
              var T = e.prototype;
              return T.onHandlerDestroying = function() {
                this._unregisterListeners(),
                this.mainDetails = null
              }
              ,
              T._registerListeners = function() {
                var t = this.hls;
                t.on(o.Events.MEDIA_ATTACHED, this.onMediaAttached, this),
                t.on(o.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.on(o.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.on(o.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.on(o.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this),
                t.on(o.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this),
                t.on(o.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this),
                t.on(o.Events.ERROR, this.onError, this),
                t.on(o.Events.BUFFER_RESET, this.onBufferReset, this),
                t.on(o.Events.BUFFER_CREATED, this.onBufferCreated, this),
                t.on(o.Events.BUFFER_FLUSHED, this.onBufferFlushed, this),
                t.on(o.Events.INIT_PTS_FOUND, this.onInitPtsFound, this),
                t.on(o.Events.FRAG_BUFFERED, this.onFragBuffered, this)
              }
              ,
              T._unregisterListeners = function() {
                var t = this.hls;
                t.off(o.Events.MEDIA_ATTACHED, this.onMediaAttached, this),
                t.off(o.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.off(o.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.off(o.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.off(o.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this),
                t.off(o.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this),
                t.off(o.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this),
                t.off(o.Events.ERROR, this.onError, this),
                t.off(o.Events.BUFFER_RESET, this.onBufferReset, this),
                t.off(o.Events.BUFFER_CREATED, this.onBufferCreated, this),
                t.off(o.Events.BUFFER_FLUSHED, this.onBufferFlushed, this),
                t.off(o.Events.INIT_PTS_FOUND, this.onInitPtsFound, this),
                t.off(o.Events.FRAG_BUFFERED, this.onFragBuffered, this)
              }
              ,
              T.onInitPtsFound = function(t, e) {
                var r = e.frag
                  , i = e.id
                  , n = e.initPTS;
                if ("main" === i) {
                  var a = r.cc;
                  this.initPTS[r.cc] = n,
                  this.log("InitPTS for cc: " + a + " found from main: " + n),
                  this.videoTrackCC = a,
                  this.state === s.State.WAITING_INIT_PTS && this.tick()
                }
              }
              ,
              T.startLoad = function(t) {
                if (!this.levels)
                  return this.startPosition = t,
                  void (this.state = s.State.STOPPED);
                var e = this.lastCurrentTime;
                this.stopLoad(),
                this.setInterval(100),
                this.fragLoadError = 0,
                0 < e && -1 === t ? (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)),
                this.state = s.State.IDLE) : (this.loadedmetadata = !1,
                this.state = s.State.WAITING_TRACK),
                this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t,
                this.tick()
              }
              ,
              T.doTick = function() {
                switch (this.state) {
                case s.State.IDLE:
                  this.doTickIdle();
                  break;
                case s.State.WAITING_TRACK:
                  var e, r = this.levels, i = this.trackId, n = null == r || null === (e = r[i]) || void 0 === e ? void 0 : e.details;
                  if (n) {
                    if (this.waitForCdnTuneIn(n))
                      break;
                    this.state = s.State.WAITING_INIT_PTS
                  }
                  break;
                case s.State.FRAG_LOADING_WAITING_RETRY:
                  var a, o = performance.now(), u = this.retryDate;
                  (!u || o >= u || null !== (a = this.media) && void 0 !== a && a.seeking) && (this.log("RetryDate reached, switch back to IDLE state"),
                  this.state = s.State.IDLE);
                  break;
                case s.State.WAITING_INIT_PTS:
                  var d = this.waitingData;
                  if (d) {
                    var c = d.frag
                      , f = d.part
                      , h = d.cache
                      , g = d.complete;
                    if (void 0 !== this.initPTS[c.cc]) {
                      this.waitingData = null,
                      this.waitingVideoCC = -1,
                      this.state = s.State.FRAG_LOADING;
                      var v = {
                        frag: c,
                        part: f,
                        payload: h.flush(),
                        networkDetails: null
                      };
                      this._handleFragmentLoadProgress(v),
                      g && t.prototype._handleFragmentLoadComplete.call(this, v)
                    } else if (this.videoTrackCC !== this.waitingVideoCC)
                      E.logger.log("Waiting fragment cc (" + c.cc + ") cancelled because video is at cc " + this.videoTrackCC),
                      this.clearWaitingFragment();
                    else {
                      var p = this.getLoadPosition()
                        , y = l.BufferHelper.bufferInfo(this.mediaBuffer, p, this.config.maxBufferHole);
                      0 > Object(m.fragmentWithinToleranceTest)(y.end, this.config.maxFragLookUpTolerance, c) && (E.logger.log("Waiting fragment cc (" + c.cc + ") @ " + c.start + " cancelled because another fragment at " + y.end + " is needed"),
                      this.clearWaitingFragment())
                    }
                  } else
                    this.state = s.State.IDLE
                }
                this.onTickEnd()
              }
              ,
              T.clearWaitingFragment = function() {
                var t = this.waitingData;
                t && (this.fragmentTracker.removeFragment(t.frag),
                this.waitingData = null,
                this.waitingVideoCC = -1,
                this.state = s.State.IDLE)
              }
              ,
              T.onTickEnd = function() {
                var t = this.media;
                if (t && t.readyState) {
                  var e = (this.mediaBuffer ? this.mediaBuffer : t).buffered;
                  !this.loadedmetadata && e.length && (this.loadedmetadata = !0),
                  this.lastCurrentTime = t.currentTime
                }
              }
              ,
              T.doTickIdle = function() {
                var t, e, r = this.hls, i = this.levels, n = this.media, a = this.trackId, l = r.config;
                if (i && i[a] && (n || !this.startFragRequested && l.startFragPrefetch)) {
                  var u = i[a].details;
                  if (!u || u.live && this.levelLastLoaded !== a || this.waitForCdnTuneIn(u))
                    return void (this.state = s.State.WAITING_TRACK);
                  this.bufferFlushed && (this.bufferFlushed = !1,
                  this.afterBufferFlushed(this.mediaBuffer ? this.mediaBuffer : this.media, f.ElementaryStreamTypes.AUDIO, c.PlaylistLevelType.AUDIO));
                  var d = this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, c.PlaylistLevelType.AUDIO);
                  if (null !== d) {
                    var h = d.len
                      , g = this.getMaxBufferLength()
                      , v = this.audioSwitch;
                    if (!(h >= g) || v) {
                      if (!v && this._streamEnded(d, u))
                        return r.trigger(o.Events.BUFFER_EOS, {
                          type: "audio"
                        }),
                        void (this.state = s.State.ENDED);
                      var m = u.fragments[0].start
                        , p = d.end;
                      if (v) {
                        var y = this.getLoadPosition();
                        p = y,
                        u.PTSKnown && y < m && (d.end > m || d.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"),
                        n.currentTime = m + .05)
                      }
                      var E = this.getNextFragment(p, u);
                      return E ? void ("identity" !== (null === (t = E.decryptdata) || void 0 === t ? void 0 : t.keyFormat) || null !== (e = E.decryptdata) && void 0 !== e && e.key ? this.loadFragment(E, u, p) : this.loadKey(E, u)) : void (this.bufferFlushed = !0)
                    }
                  }
                }
              }
              ,
              T.getMaxBufferLength = function() {
                var e = t.prototype.getMaxBufferLength.call(this)
                  , r = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, c.PlaylistLevelType.MAIN);
                return null === r ? e : Math.max(e, r.len)
              }
              ,
              T.onMediaDetaching = function() {
                this.videoBuffer = null,
                t.prototype.onMediaDetaching.call(this)
              }
              ,
              T.onAudioTracksUpdated = function(t, e) {
                var r = e.audioTracks;
                this.resetTransmuxer(),
                this.levels = r.map((function(t) {
                  return new d.Level(t)
                }
                ))
              }
              ,
              T.onAudioTrackSwitching = function(t, e) {
                var r = !!e.url;
                this.trackId = e.id;
                var i = this.fragCurrent;
                null != i && i.loader && i.loader.abort(),
                this.fragCurrent = null,
                this.clearWaitingFragment(),
                r ? this.setInterval(100) : this.resetTransmuxer(),
                r ? (this.audioSwitch = !0,
                this.state = s.State.IDLE) : this.state = s.State.STOPPED,
                this.tick()
              }
              ,
              T.onManifestLoading = function() {
                this.mainDetails = null,
                this.fragmentTracker.removeAllFragments(),
                this.startPosition = this.lastCurrentTime = 0,
                this.bufferFlushed = !1
              }
              ,
              T.onLevelLoaded = function(t, e) {
                this.mainDetails = e.details
              }
              ,
              T.onAudioTrackLoaded = function(t, e) {
                var r, i = this.levels, n = e.details, a = e.id;
                if (i) {
                  this.log("Track " + a + " loaded [" + n.startSN + "," + n.endSN + "],duration:" + n.totalduration);
                  var o = i[a]
                    , l = 0;
                  if (n.live || null !== (r = o.details) && void 0 !== r && r.live) {
                    var u = this.mainDetails;
                    if (n.fragments[0] || (n.deltaUpdateFailed = !0),
                    n.deltaUpdateFailed || !u)
                      return;
                    !o.details && n.hasProgramDateTime && u.hasProgramDateTime ? (Object(p.alignPDT)(n, u),
                    l = n.fragments[0].start) : l = this.alignPlaylists(n, o.details)
                  }
                  o.details = n,
                  this.levelLastLoaded = a,
                  this.startFragRequested || !this.mainDetails && n.live || this.setStartPosition(o.details, l),
                  this.state !== s.State.WAITING_TRACK || this.waitForCdnTuneIn(n) || (this.state = s.State.IDLE),
                  this.tick()
                } else
                  this.warn("Audio tracks were reset while loading level " + a)
              }
              ,
              T._handleFragmentLoadProgress = function(t) {
                var e, r = t.frag, i = t.part, n = t.payload, a = this.config, o = this.trackId, l = this.levels;
                if (l) {
                  var u = l[o];
                  console.assert(u, "Audio track is defined on fragment load progress");
                  var d = u.details;
                  console.assert(d, "Audio track details are defined on fragment load progress");
                  var f = a.defaultAudioCodec || u.audioCodec || "mp4a.40.2"
                    , m = this.transmuxer;
                  m || (m = this.transmuxer = new g.default(this.hls,c.PlaylistLevelType.AUDIO,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this)));
                  var p = this.initPTS[r.cc]
                    , y = null === (e = r.initSegment) || void 0 === e ? void 0 : e.data;
                  if (void 0 !== p) {
                    var b = i ? i.index : -1
                      , T = -1 !== b
                      , A = new v.ChunkMetadata(r.level,r.sn,r.stats.chunkCount,n.byteLength,b,T);
                    m.push(n, y, f, "", r, i, d.totalduration, !1, A, p)
                  } else
                    E.logger.log("Unknown video PTS for cc " + r.cc + ", waiting for video PTS before demuxing audio frag " + r.sn + " of [" + d.startSN + " ," + d.endSN + "],track " + o),
                    (this.waitingData = this.waitingData || {
                      frag: r,
                      part: i,
                      cache: new h.default,
                      complete: !1
                    }).cache.push(new Uint8Array(n)),
                    this.waitingVideoCC = this.videoTrackCC,
                    this.state = s.State.WAITING_INIT_PTS
                } else
                  this.warn("Audio tracks were reset while fragment load was in progress. Fragment " + r.sn + " of level " + r.level + " will not be buffered")
              }
              ,
              T._handleFragmentLoadComplete = function(e) {
                return this.waitingData ? void (this.waitingData.complete = !0) : void t.prototype._handleFragmentLoadComplete.call(this, e)
              }
              ,
              T.onBufferReset = function() {
                this.mediaBuffer = this.videoBuffer = null,
                this.loadedmetadata = !1
              }
              ,
              T.onBufferCreated = function(t, e) {
                var r = e.tracks.audio;
                r && (this.mediaBuffer = r.buffer),
                e.tracks.video && (this.videoBuffer = e.tracks.video.buffer)
              }
              ,
              T.onFragBuffered = function(t, e) {
                var r = e.frag
                  , i = e.part;
                return r.type === c.PlaylistLevelType.AUDIO ? this.fragContextChanged(r) ? void this.warn("Fragment " + r.sn + (i ? " p: " + i.index : "") + " of level " + r.level + " finished buffering, but was aborted. state: " + this.state + ", audioSwitch: " + this.audioSwitch) : ("initSegment" !== r.sn && (this.fragPrevious = r,
                this.audioSwitch && (this.audioSwitch = !1,
                this.hls.trigger(o.Events.AUDIO_TRACK_SWITCHED, {
                  id: this.trackId
                }))),
                void this.fragBufferedComplete(r, i)) : void 0
              }
              ,
              T.onError = function(e, r) {
                switch (r.details) {
                case y.ErrorDetails.FRAG_LOAD_ERROR:
                case y.ErrorDetails.FRAG_LOAD_TIMEOUT:
                case y.ErrorDetails.KEY_LOAD_ERROR:
                case y.ErrorDetails.KEY_LOAD_TIMEOUT:
                  this.onFragmentOrKeyLoadError(c.PlaylistLevelType.AUDIO, r);
                  break;
                case y.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                case y.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                  this.state !== s.State.ERROR && this.state !== s.State.STOPPED && (this.state = r.fatal ? s.State.ERROR : s.State.IDLE,
                  this.warn(r.details + " while loading frag, switching to " + this.state + " state"));
                  break;
                case y.ErrorDetails.BUFFER_FULL_ERROR:
                  if ("audio" === r.parent && (this.state === s.State.PARSING || this.state === s.State.PARSED)) {
                    var i = !0
                      , n = this.getFwdBufferInfo(this.mediaBuffer, c.PlaylistLevelType.AUDIO);
                    n && .5 < n.len && (i = !this.reduceMaxBufferLength(n.len)),
                    i && (this.warn("Buffer full error also media.currentTime is not buffered, flush audio buffer"),
                    this.fragCurrent = null,
                    t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")),
                    this.resetLoadingState()
                  }
                }
              }
              ,
              T.onBufferFlushed = function(t, e) {
                e.type === f.ElementaryStreamTypes.AUDIO && (this.bufferFlushed = !0)
              }
              ,
              T._handleTransmuxComplete = function(t) {
                var e, r = this.hls, n = t.remuxResult, a = t.chunkMeta, l = this.getCurrentContext(a);
                if (!l)
                  return this.warn("The loading context changed while buffering fragment " + a.sn + " of level " + a.level + ". This chunk will not be buffered."),
                  void this.resetLiveStartWhenNotLoaded(a.level);
                var u = l.frag
                  , d = l.part
                  , c = n.audio
                  , h = n.text
                  , g = n.id3
                  , v = n.initSegment;
                if (!this.fragContextChanged(u)) {
                  if (this.state = s.State.PARSING,
                  this.audioSwitch && c && this.completeAudioSwitch(),
                  null != v && v.tracks && (this._bufferInitSegment(v.tracks, u, a),
                  r.trigger(o.Events.FRAG_PARSING_INIT_SEGMENT, {
                    frag: u,
                    id: "audio",
                    tracks: v.tracks
                  })),
                  c) {
                    var m = c.startPTS
                      , p = c.endPTS
                      , y = c.startDTS
                      , E = c.endDTS;
                    d && (d.elementaryStreams[f.ElementaryStreamTypes.AUDIO] = {
                      startPTS: m,
                      endPTS: p,
                      startDTS: y,
                      endDTS: E
                    }),
                    u.setElementaryStreamInfo(f.ElementaryStreamTypes.AUDIO, m, p, y, E),
                    this.bufferFragmentData(c, u, d, a)
                  }
                  if (null != g && null !== (e = g.samples) && void 0 !== e && e.length) {
                    var b = i({
                      frag: u,
                      id: "audio"
                    }, g);
                    r.trigger(o.Events.FRAG_PARSING_METADATA, b)
                  }
                  if (h) {
                    var T = i({
                      frag: u,
                      id: "audio"
                    }, h);
                    r.trigger(o.Events.FRAG_PARSING_USERDATA, T)
                  }
                }
              }
              ,
              T._bufferInitSegment = function(t, e, r) {
                if (this.state === s.State.PARSING) {
                  t.video && delete t.video;
                  var i = t.audio;
                  if (i) {
                    i.levelCodec = i.codec,
                    i.id = "audio",
                    this.log("Init audio buffer, container:" + i.container + ", codecs[parsed]=[" + i.codec + "]"),
                    this.hls.trigger(o.Events.BUFFER_CODECS, t);
                    var n = i.initSegment;
                    if (null != n && n.byteLength) {
                      var a = {
                        type: "audio",
                        frag: e,
                        part: null,
                        chunkMeta: r,
                        parent: e.type,
                        data: n
                      };
                      this.hls.trigger(o.Events.BUFFER_APPENDING, a)
                    }
                    this.tick()
                  }
                }
              }
              ,
              T.loadFragment = function(e, r, i) {
                var n = this.fragmentTracker.getState(e);
                this.fragCurrent = e,
                (this.audioSwitch || n === u.FragmentState.NOT_LOADED || n === u.FragmentState.PARTIAL) && ("initSegment" === e.sn ? this._loadInitSegment(e) : r.live && !Object(a.isFiniteNumber)(this.initPTS[e.cc]) ? (this.log("Waiting for video PTS in continuity counter " + e.cc + " of live stream before loading audio fragment " + e.sn + " of level " + this.trackId),
                this.state = s.State.WAITING_INIT_PTS) : (this.startFragRequested = !0,
                t.prototype.loadFragment.call(this, e, r, i)))
              }
              ,
              T.completeAudioSwitch = function() {
                var e = this.hls
                  , r = this.media
                  , i = this.trackId;
                r && (this.log("Switching audio track : flushing all audio"),
                t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")),
                this.audioSwitch = !1,
                e.trigger(o.Events.AUDIO_TRACK_SWITCHED, {
                  id: i
                })
              }
              ,
              e
            }(s.default);
            e.default = b
          },
          "./src/controller/audio-track-controller.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            function n(t, e) {
              return (n = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            r.r(e);
            var a = r("./src/events.ts")
              , s = r("./src/errors.ts")
              , o = r("./src/controller/base-playlist-controller.ts")
              , l = r("./src/types/loader.ts")
              , u = function(t) {
              function e(e) {
                var r;
                return (r = t.call(this, e, "[audio-track-controller]") || this).tracks = [],
                r.groupId = null,
                r.tracksInGroup = [],
                r.trackId = -1,
                r.trackName = "",
                r.selectDefaultTrack = !0,
                r.registerListeners(),
                r
              }
              var r, o;
              o = t,
              (r = e).prototype = Object.create(o.prototype),
              r.prototype.constructor = r,
              n(r, o);
              var u, d, c, f = e.prototype;
              return f.registerListeners = function() {
                var t = this.hls;
                t.on(a.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.on(a.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.on(a.Events.LEVEL_LOADING, this.onLevelLoading, this),
                t.on(a.Events.LEVEL_SWITCHING, this.onLevelSwitching, this),
                t.on(a.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this),
                t.on(a.Events.ERROR, this.onError, this)
              }
              ,
              f.unregisterListeners = function() {
                var t = this.hls;
                t.off(a.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.off(a.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.off(a.Events.LEVEL_LOADING, this.onLevelLoading, this),
                t.off(a.Events.LEVEL_SWITCHING, this.onLevelSwitching, this),
                t.off(a.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this),
                t.off(a.Events.ERROR, this.onError, this)
              }
              ,
              f.destroy = function() {
                this.unregisterListeners(),
                this.tracks.length = 0,
                this.tracksInGroup.length = 0,
                t.prototype.destroy.call(this)
              }
              ,
              f.onManifestLoading = function() {
                this.tracks = [],
                this.groupId = null,
                this.tracksInGroup = [],
                this.trackId = -1,
                this.trackName = "",
                this.selectDefaultTrack = !0
              }
              ,
              f.onManifestParsed = function(t, e) {
                this.tracks = e.audioTracks || []
              }
              ,
              f.onAudioTrackLoaded = function(t, e) {
                var r = e.id
                  , i = e.details
                  , n = this.tracksInGroup[r];
                if (n) {
                  var a = n.details;
                  n.details = e.details,
                  this.log("audioTrack " + r + " loaded [" + i.startSN + "-" + i.endSN + "]"),
                  r === this.trackId && (this.retryCount = 0,
                  this.playlistLoaded(r, e, a))
                } else
                  this.warn("Invalid audio track id " + r)
              }
              ,
              f.onLevelLoading = function(t, e) {
                this.switchLevel(e.level)
              }
              ,
              f.onLevelSwitching = function(t, e) {
                this.switchLevel(e.level)
              }
              ,
              f.switchLevel = function(t) {
                var e = this.hls.levels[t];
                if (null != e && e.audioGroupIds) {
                  var r = e.audioGroupIds[e.urlId];
                  if (this.groupId !== r) {
                    this.groupId = r;
                    var i = this.tracks.filter((function(t) {
                      return !r || t.groupId === r
                    }
                    ));
                    this.selectDefaultTrack && !i.some((function(t) {
                      return t.default
                    }
                    )) && (this.selectDefaultTrack = !1),
                    this.tracksInGroup = i;
                    var n = {
                      audioTracks: i
                    };
                    this.log("Updating audio tracks, " + i.length + ' track(s) found in "' + r + '" group-id'),
                    this.hls.trigger(a.Events.AUDIO_TRACKS_UPDATED, n),
                    this.selectInitialTrack()
                  }
                }
              }
              ,
              f.onError = function(e, r) {
                t.prototype.onError.call(this, e, r),
                r.fatal || !r.context || r.context.type === l.PlaylistContextType.AUDIO_TRACK && r.context.id === this.trackId && r.context.groupId === this.groupId && this.retryLoadingOrFail(r)
              }
              ,
              f.setAudioTrack = function(t) {
                var e = this.tracksInGroup;
                if (0 > t || t >= e.length)
                  this.warn("Invalid id passed to audio-track controller");
                else {
                  this.clearTimer();
                  var r = e[this.trackId];
                  this.log("Now switching to audio-track index " + t);
                  var i = e[t]
                    , n = i.id
                    , s = i.groupId
                    , o = void 0 === s ? "" : s
                    , l = i.name
                    , u = i.type
                    , d = i.url;
                  if (this.trackId = t,
                  this.trackName = l,
                  this.selectDefaultTrack = !1,
                  this.hls.trigger(a.Events.AUDIO_TRACK_SWITCHING, {
                    id: n,
                    groupId: o,
                    name: l,
                    type: u,
                    url: d
                  }),
                  !i.details || i.details.live) {
                    var c = this.switchParams(i.url, null == r ? void 0 : r.details);
                    this.loadPlaylist(c)
                  }
                }
              }
              ,
              f.selectInitialTrack = function() {
                var t = this.tracksInGroup;
                console.assert(t.length, "Initial audio track should be selected when tracks are known");
                var e = this.trackName
                  , r = this.findTrackId(e) || this.findTrackId();
                -1 === r ? (this.warn("No track found for running audio group-ID: " + this.groupId),
                this.hls.trigger(a.Events.ERROR, {
                  type: s.ErrorTypes.MEDIA_ERROR,
                  details: s.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                  fatal: !0
                })) : this.setAudioTrack(r)
              }
              ,
              f.findTrackId = function(t) {
                for (var e, r = this.tracksInGroup, i = 0; i < r.length; i++)
                  if (e = r[i],
                  (!this.selectDefaultTrack || e.default) && (!t || t === e.name))
                    return e.id;
                return -1
              }
              ,
              f.loadPlaylist = function(t) {
                var e = this.tracksInGroup[this.trackId];
                if (this.shouldLoadTrack(e)) {
                  var r = e.id
                    , i = e.groupId
                    , n = e.url;
                  if (t)
                    try {
                      n = t.addDirectives(n)
                    } catch (t) {
                      this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                    }
                  this.log("loading audio-track playlist for id: " + r),
                  this.clearTimer(),
                  this.hls.trigger(a.Events.AUDIO_TRACK_LOADING, {
                    url: n,
                    id: r,
                    groupId: i,
                    deliveryDirectives: t || null
                  })
                }
              }
              ,
              u = e,
              (d = [{
                key: "audioTracks",
                get: function() {
                  return this.tracksInGroup
                }
              }, {
                key: "audioTrack",
                get: function() {
                  return this.trackId
                },
                set: function(t) {
                  this.selectDefaultTrack = !1,
                  this.setAudioTrack(t)
                }
              }]) && i(u.prototype, d),
              c && i(u, c),
              e
            }(o.default);
            e.default = u
          },
          "./src/controller/base-playlist-controller.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return l
            }
            ));
            var i = r("./src/polyfills/number.ts")
              , n = r("./src/types/level.ts")
              , a = r("./src/controller/level-helper.ts")
              , s = r("./src/utils/logger.ts")
              , o = r("./src/errors.ts")
              , l = function() {
              function t(t, e) {
                this.hls = void 0,
                this.timer = -1,
                this.canLoad = !1,
                this.retryCount = 0,
                this.log = void 0,
                this.warn = void 0,
                this.log = s.logger.log.bind(s.logger, e + ":"),
                this.warn = s.logger.warn.bind(s.logger, e + ":"),
                this.hls = t
              }
              var e = t.prototype;
              return e.destroy = function() {
                this.clearTimer(),
                this.hls = this.log = this.warn = null
              }
              ,
              e.onError = function(t, e) {
                e.fatal && e.type === o.ErrorTypes.NETWORK_ERROR && this.clearTimer()
              }
              ,
              e.clearTimer = function() {
                clearTimeout(this.timer),
                this.timer = -1
              }
              ,
              e.startLoad = function() {
                this.canLoad = !0,
                this.retryCount = 0,
                this.loadPlaylist()
              }
              ,
              e.stopLoad = function() {
                this.canLoad = !1,
                this.clearTimer()
              }
              ,
              e.switchParams = function(t, e) {
                var r = null == e ? void 0 : e.renditionReports;
                if (r)
                  for (var a = 0; a < r.length; a++) {
                    var s = r[a]
                      , o = "" + s.URI;
                    if (o === t.substr(-o.length)) {
                      var l = parseInt(s["LAST-MSN"])
                        , u = parseInt(s["LAST-PART"]);
                      if (e && this.hls.config.lowLatencyMode) {
                        var d = Math.min(e.age - e.partTarget, e.targetduration);
                        void 0 !== u && d > e.partTarget && (u += 1)
                      }
                      if (Object(i.isFiniteNumber)(l))
                        return new n.HlsUrlParameters(l,Object(i.isFiniteNumber)(u) ? u : void 0,n.HlsSkip.No)
                    }
                  }
              }
              ,
              e.loadPlaylist = function(t) {}
              ,
              e.shouldLoadTrack = function(t) {
                return this.canLoad && t && !!t.url && (!t.details || t.details.live)
              }
              ,
              e.playlistLoaded = function(t, e, r) {
                var i = this
                  , n = e.details
                  , s = e.stats
                  , o = s.loading.end ? Math.max(0, self.performance.now() - s.loading.end) : 0;
                if (n.advancedDateTime = Date.now() - o,
                n.live || null != r && r.live) {
                  if (n.reloaded(r),
                  r && this.log("live playlist " + t + " " + (n.advanced ? "REFRESHED " + n.lastPartSn + "-" + n.lastPartIndex : "MISSED")),
                  r && 0 < n.fragments.length && Object(a.mergeDetails)(r, n),
                  !this.canLoad || !n.live)
                    return;
                  var l, u = void 0, d = void 0;
                  if (n.canBlockReload && n.endSN && n.advanced) {
                    var c = this.hls.config.lowLatencyMode
                      , f = n.lastPartSn
                      , h = n.endSN
                      , g = n.lastPartIndex
                      , v = f === h;
                    -1 !== g ? (u = v ? h + 1 : f,
                    d = v ? c ? 0 : g : g + 1) : u = h + 1;
                    var m = n.age
                      , p = m + n.ageHeader
                      , y = Math.min(p - n.partTarget, 1.5 * n.targetduration);
                    if (0 < y) {
                      if (r && y > r.tuneInGoal)
                        this.warn("CDN Tune-in goal increased from: " + r.tuneInGoal + " to: " + y + " with playlist age: " + n.age),
                        y = 0;
                      else {
                        var E = Math.floor(y / n.targetduration);
                        u += E,
                        void 0 !== d && (d += Math.round(y % n.targetduration / n.partTarget)),
                        this.log("CDN Tune-in age: " + n.ageHeader + "s last advanced " + m.toFixed(2) + "s goal: " + y + " skip sn " + E + " to part " + d)
                      }
                      n.tuneInGoal = y
                    }
                    if (l = this.getDeliveryDirectives(n, e.deliveryDirectives, u, d),
                    c || !v)
                      return void this.loadPlaylist(l)
                  } else
                    l = this.getDeliveryDirectives(n, e.deliveryDirectives, u, d);
                  var b = Object(a.computeReloadInterval)(n, s);
                  void 0 !== u && n.canBlockReload && (b -= n.partTarget || 1),
                  this.log("reload live playlist " + t + " in " + Math.round(b) + " ms"),
                  this.timer = self.setTimeout((function() {
                    return i.loadPlaylist(l)
                  }
                  ), b)
                } else
                  this.clearTimer()
              }
              ,
              e.getDeliveryDirectives = function(t, e, r, i) {
                var a = Object(n.getSkipValue)(t, r);
                return null != e && e.skip && t.deltaUpdateFailed && (r = e.msn,
                i = e.part,
                a = n.HlsSkip.No),
                new n.HlsUrlParameters(r,i,a)
              }
              ,
              e.retryLoadingOrFail = function(t) {
                var e, r = this, i = this.hls.config, n = this.retryCount < i.levelLoadingMaxRetry;
                if (n)
                  if (this.retryCount++,
                  -1 < t.details.indexOf("LoadTimeOut") && null !== (e = t.context) && void 0 !== e && e.deliveryDirectives)
                    this.warn("retry playlist loading #" + this.retryCount + ' after "' + t.details + '"'),
                    this.loadPlaylist();
                  else {
                    var a = Math.min(Math.pow(2, this.retryCount) * i.levelLoadingRetryDelay, i.levelLoadingMaxRetryTimeout);
                    this.timer = self.setTimeout((function() {
                      return r.loadPlaylist()
                    }
                    ), a),
                    this.warn("retry playlist loading #" + this.retryCount + " in " + a + ' ms after "' + t.details + '"')
                  }
                else
                  this.warn('cannot recover from error "' + t.details + '"'),
                  this.clearTimer(),
                  t.fatal = !0;
                return n
              }
              ,
              t
            }()
          },
          "./src/controller/base-stream-controller.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            function n(t, e) {
              return (n = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            r.r(e),
            r.d(e, "State", (function() {
              return T
            }
            )),
            r.d(e, "default", (function() {
              return A
            }
            ));
            var a = r("./src/polyfills/number.ts")
              , s = r("./src/task-loop.ts")
              , o = r("./src/controller/fragment-tracker.ts")
              , l = r("./src/utils/buffer-helper.ts")
              , u = r("./src/utils/logger.ts")
              , d = r("./src/events.ts")
              , c = r("./src/errors.ts")
              , f = r("./src/types/transmuxer.ts")
              , h = r("./src/utils/mp4-tools.ts")
              , g = r("./src/utils/discontinuities.ts")
              , v = r("./src/controller/fragment-finders.ts")
              , m = r("./src/controller/level-helper.ts")
              , p = r("./src/loader/fragment-loader.ts")
              , y = r("./src/crypt/decrypter.ts")
              , E = r("./src/utils/time-ranges.ts")
              , b = r("./src/types/loader.ts")
              , T = {
              STOPPED: "STOPPED",
              IDLE: "IDLE",
              KEY_LOADING: "KEY_LOADING",
              FRAG_LOADING: "FRAG_LOADING",
              FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
              WAITING_TRACK: "WAITING_TRACK",
              PARSING: "PARSING",
              PARSED: "PARSED",
              BACKTRACKING: "BACKTRACKING",
              ENDED: "ENDED",
              ERROR: "ERROR",
              WAITING_INIT_PTS: "WAITING_INIT_PTS",
              WAITING_LEVEL: "WAITING_LEVEL"
            }
              , A = function(t) {
              function e(e, r, i) {
                var n;
                return (n = t.call(this) || this).hls = void 0,
                n.fragPrevious = null,
                n.fragCurrent = null,
                n.fragmentTracker = void 0,
                n.transmuxer = null,
                n._state = T.STOPPED,
                n.media = void 0,
                n.mediaBuffer = void 0,
                n.config = void 0,
                n.bitrateTest = !1,
                n.lastCurrentTime = 0,
                n.nextLoadPosition = 0,
                n.startPosition = 0,
                n.loadedmetadata = !1,
                n.fragLoadError = 0,
                n.retryDate = 0,
                n.levels = null,
                n.fragmentLoader = void 0,
                n.levelLastLoaded = null,
                n.startFragRequested = !1,
                n.decrypter = void 0,
                n.initPTS = [],
                n.onvseeking = null,
                n.onvended = null,
                n.logPrefix = "",
                n.log = void 0,
                n.warn = void 0,
                n.logPrefix = i,
                n.log = u.logger.log.bind(u.logger, i + ":"),
                n.warn = u.logger.warn.bind(u.logger, i + ":"),
                n.hls = e,
                n.fragmentLoader = new p.default(e.config),
                n.fragmentTracker = r,
                n.config = e.config,
                n.decrypter = new y.default(e,e.config),
                e.on(d.Events.KEY_LOADED, n.onKeyLoaded, function(t) {
                  if (void 0 === t)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return t
                }(n)),
                n
              }
              var r, s;
              s = t,
              (r = e).prototype = Object.create(s.prototype),
              r.prototype.constructor = r,
              n(r, s);
              var A, S, L, k = e.prototype;
              return k.doTick = function() {
                this.onTickEnd()
              }
              ,
              k.onTickEnd = function() {}
              ,
              k.startLoad = function(t) {}
              ,
              k.stopLoad = function() {
                this.fragmentLoader.abort();
                var t = this.fragCurrent;
                t && this.fragmentTracker.removeFragment(t),
                this.resetTransmuxer(),
                this.fragCurrent = null,
                this.fragPrevious = null,
                this.clearInterval(),
                this.clearNextTick(),
                this.state = T.STOPPED
              }
              ,
              k._streamEnded = function(t, e) {
                var r = this.fragCurrent
                  , i = this.fragmentTracker;
                if (!e.live && r && r.sn === e.endSN && !t.nextStart) {
                  var n = i.getState(r);
                  return n === o.FragmentState.PARTIAL || n === o.FragmentState.OK
                }
                return !1
              }
              ,
              k.onMediaAttached = function(t, e) {
                var r = this.media = this.mediaBuffer = e.media;
                this.onvseeking = this.onMediaSeeking.bind(this),
                this.onvended = this.onMediaEnded.bind(this),
                r.addEventListener("seeking", this.onvseeking),
                r.addEventListener("ended", this.onvended);
                var i = this.config;
                this.levels && i.autoStartLoad && this.state === T.STOPPED && this.startLoad(i.startPosition)
              }
              ,
              k.onMediaDetaching = function() {
                var t = this.media;
                null != t && t.ended && (this.log("MSE detaching and video ended, reset startPosition"),
                this.startPosition = this.lastCurrentTime = 0),
                t && (t.removeEventListener("seeking", this.onvseeking),
                t.removeEventListener("ended", this.onvended),
                this.onvseeking = this.onvended = null),
                this.media = this.mediaBuffer = null,
                this.loadedmetadata = !1,
                this.fragmentTracker.removeAllFragments(),
                this.stopLoad()
              }
              ,
              k.onMediaSeeking = function() {
                var t = this.config
                  , e = this.fragCurrent
                  , r = this.media
                  , i = this.mediaBuffer
                  , n = this.state
                  , s = r ? r.currentTime : 0
                  , o = l.BufferHelper.bufferInfo(i || r, s, t.maxBufferHole);
                if (this.log("media seeking to " + (Object(a.isFiniteNumber)(s) ? s.toFixed(3) : s) + ", state: " + n),
                n === T.ENDED)
                  this.resetLoadingState();
                else if (e && !o.len) {
                  var u = t.maxFragLookUpTolerance
                    , d = e.start - u
                    , c = s > e.start + e.duration + u;
                  (s < d || c) && (c && e.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),
                  e.loader.abort()),
                  this.resetLoadingState())
                }
                r && (this.lastCurrentTime = s),
                this.loadedmetadata || o.len || (this.nextLoadPosition = this.startPosition = s),
                this.tickImmediate()
              }
              ,
              k.onMediaEnded = function() {
                this.startPosition = this.lastCurrentTime = 0
              }
              ,
              k.onKeyLoaded = function(t, e) {
                if (this.state === T.KEY_LOADING && e.frag === this.fragCurrent && this.levels) {
                  this.state = T.IDLE;
                  var r = this.levels[e.frag.level].details;
                  r && this.loadFragment(e.frag, r, e.frag.start)
                }
              }
              ,
              k.onHandlerDestroying = function() {
                this.stopLoad(),
                t.prototype.onHandlerDestroying.call(this)
              }
              ,
              k.onHandlerDestroyed = function() {
                this.state = T.STOPPED,
                this.hls.off(d.Events.KEY_LOADED, this.onKeyLoaded, this),
                this.fragmentLoader && this.fragmentLoader.destroy(),
                this.decrypter && this.decrypter.destroy(),
                this.hls = this.log = this.warn = this.decrypter = this.fragmentLoader = this.fragmentTracker = null,
                t.prototype.onHandlerDestroyed.call(this)
              }
              ,
              k.loadKey = function(t, e) {
                this.log("Loading key for " + t.sn + " of [" + e.startSN + "-" + e.endSN + "], " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level),
                this.state = T.KEY_LOADING,
                this.fragCurrent = t,
                this.hls.trigger(d.Events.KEY_LOADING, {
                  frag: t
                })
              }
              ,
              k.loadFragment = function(t, e, r) {
                this._loadFragForPlayback(t, e, r)
              }
              ,
              k._loadFragForPlayback = function(t, e, r) {
                var i = this;
                this._doFragLoad(t, e, r, (function(e) {
                  return i.fragContextChanged(t) ? (i.warn("Fragment " + t.sn + (e.part ? " p: " + e.part.index : "") + " of level " + t.level + " was dropped during download."),
                  void i.fragmentTracker.removeFragment(t)) : (t.stats.chunkCount++,
                  void i._handleFragmentLoadProgress(e))
                }
                )).then((function(e) {
                  if (e) {
                    i.fragLoadError = 0;
                    var r = i.state;
                    return i.fragContextChanged(t) ? void (r !== T.FRAG_LOADING && r !== T.BACKTRACKING && (i.fragCurrent || r !== T.PARSING) || (i.fragmentTracker.removeFragment(t),
                    i.state = T.IDLE)) : "payload"in e && (i.log("Loaded fragment " + t.sn + " of level " + t.level),
                    i.hls.trigger(d.Events.FRAG_LOADED, e),
                    i.state === T.BACKTRACKING) ? (i.fragmentTracker.backtrack(t, e),
                    void i.resetFragmentLoading(t)) : void i._handleFragmentLoadComplete(e)
                  }
                }
                )).catch((function(e) {
                  i.warn(e),
                  i.resetFragmentLoading(t)
                }
                ))
              }
              ,
              k.flushMainBuffer = function(t, e, r) {
                if (void 0 === r && (r = null),
                t - e) {
                  var i = {
                    startOffset: t,
                    endOffset: e,
                    type: r
                  };
                  this.fragLoadError = 0,
                  this.hls.trigger(d.Events.BUFFER_FLUSHING, i)
                }
              }
              ,
              k._loadInitSegment = function(t) {
                var e = this;
                this._doFragLoad(t).then((function(r) {
                  if (!r || e.fragContextChanged(t) || !e.levels)
                    throw new Error("init load aborted");
                  return r
                }
                )).then((function(r) {
                  var i = e.hls
                    , n = r.payload
                    , a = t.decryptdata;
                  if (n && 0 < n.byteLength && a && a.key && a.iv && "AES-128" === a.method) {
                    var s = self.performance.now();
                    return e.decrypter.webCryptoDecrypt(new Uint8Array(n), a.key.buffer, a.iv.buffer).then((function(e) {
                      var n = self.performance.now();
                      return i.trigger(d.Events.FRAG_DECRYPTED, {
                        frag: t,
                        payload: e,
                        stats: {
                          tstart: s,
                          tdecrypt: n
                        }
                      }),
                      r.payload = e,
                      r
                    }
                    ))
                  }
                  return r
                }
                )).then((function(r) {
                  var i = e.fragCurrent
                    , n = e.hls
                    , a = e.levels;
                  if (!a)
                    throw new Error("init load aborted, missing levels");
                  var s = a[t.level].details;
                  console.assert(s, "Level details are defined when init segment is loaded");
                  var o = t.stats;
                  e.state = T.IDLE,
                  e.fragLoadError = 0,
                  t.data = new Uint8Array(r.payload),
                  o.parsing.start = o.buffering.start = self.performance.now(),
                  o.parsing.end = o.buffering.end = self.performance.now(),
                  r.frag === i && n.trigger(d.Events.FRAG_BUFFERED, {
                    stats: o,
                    frag: i,
                    part: null,
                    id: t.type
                  }),
                  e.tick()
                }
                )).catch((function(r) {
                  e.warn(r),
                  e.resetFragmentLoading(t)
                }
                ))
              }
              ,
              k.fragContextChanged = function(t) {
                var e = this.fragCurrent;
                return !t || !e || t.level !== e.level || t.sn !== e.sn || t.urlId !== e.urlId
              }
              ,
              k.fragBufferedComplete = function(t, e) {
                var r = this.mediaBuffer ? this.mediaBuffer : this.media;
                this.log("Buffered " + t.type + " sn: " + t.sn + (e ? " part: " + e.index : "") + " of " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level + " " + E.default.toString(l.BufferHelper.getBuffered(r))),
                this.state = T.IDLE,
                this.tick()
              }
              ,
              k._handleFragmentLoadComplete = function(t) {
                var e = this.transmuxer;
                if (e) {
                  var r = t.frag
                    , i = t.part
                    , n = t.partsLoaded
                    , a = !n || 0 === n.length || n.some((function(t) {
                    return !t
                  }
                  ))
                    , s = new f.ChunkMetadata(r.level,r.sn,r.stats.chunkCount + 1,0,i ? i.index : -1,!a);
                  e.flush(s)
                }
              }
              ,
              k._handleFragmentLoadProgress = function(t) {}
              ,
              k._doFragLoad = function(t, e, r, i) {
                var n = this;
                if (void 0 === r && (r = null),
                !this.levels)
                  throw new Error("frag load aborted, missing levels");
                if (r = Math.max(t.start, r || 0),
                this.config.lowLatencyMode && e) {
                  var s = e.partList;
                  if (s && i) {
                    r > t.end && e.fragmentHint && (t = e.fragmentHint);
                    var o = this.getNextPart(s, t, r);
                    if (-1 < o) {
                      var l = s[o];
                      return this.log("Loading part sn: " + t.sn + " p: " + l.index + " cc: " + t.cc + " of playlist [" + e.startSN + "-" + e.endSN + "] parts [0-" + o + "-" + (s.length - 1) + "] " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(r.toFixed(3))),
                      this.nextLoadPosition = l.start + l.duration,
                      this.state = T.FRAG_LOADING,
                      this.hls.trigger(d.Events.FRAG_LOADING, {
                        frag: t,
                        part: s[o],
                        targetBufferTime: r
                      }),
                      this.doFragPartsLoad(t, s, o, i).catch((function(t) {
                        return n.handleFragLoadError(t)
                      }
                      ))
                    }
                    if (!t.url || this.loadedEndOfParts(s, r))
                      return Promise.resolve(null)
                  }
                }
                return this.log("Loading fragment " + t.sn + " cc: " + t.cc + " " + (e ? "of [" + e.startSN + "-" + e.endSN + "] " : "") + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(r.toFixed(3))),
                Object(a.isFiniteNumber)(t.sn) && !this.bitrateTest && (this.nextLoadPosition = t.start + t.duration),
                this.state = T.FRAG_LOADING,
                this.hls.trigger(d.Events.FRAG_LOADING, {
                  frag: t,
                  targetBufferTime: r
                }),
                this.fragmentLoader.load(t, i).catch((function(t) {
                  return n.handleFragLoadError(t)
                }
                ))
              }
              ,
              k.doFragPartsLoad = function(t, e, r, i) {
                var n = this;
                return new Promise((function(a, s) {
                  var o = [];
                  !function r(l) {
                    var u = e[l];
                    n.fragmentLoader.loadPart(t, u, i).then((function(i) {
                      o[u.index] = i;
                      var s = i.part;
                      n.hls.trigger(d.Events.FRAG_LOADED, i);
                      var c = e[l + 1];
                      return c && c.fragment === t ? void r(l + 1) : a({
                        frag: t,
                        part: s,
                        partsLoaded: o
                      })
                    }
                    )).catch(s)
                  }(r)
                }
                ))
              }
              ,
              k.handleFragLoadError = function(t) {
                var e = t.data;
                return e && e.details === c.ErrorDetails.INTERNAL_ABORTED ? this.handleFragLoadAborted(e.frag, e.part) : this.hls.trigger(d.Events.ERROR, e),
                null
              }
              ,
              k._handleTransmuxerFlush = function(t) {
                var e = this.getCurrentContext(t);
                if (e && this.state === T.PARSING) {
                  var r = e.frag
                    , i = e.part
                    , n = e.level
                    , a = self.performance.now();
                  r.stats.parsing.end = a,
                  i && (i.stats.parsing.end = a),
                  this.updateLevelTiming(r, i, n, t.partial)
                } else
                  this.fragCurrent || (this.state = T.IDLE)
              }
              ,
              k.getCurrentContext = function(t) {
                var e = this.levels
                  , r = t.level
                  , i = t.sn
                  , n = t.part;
                if (!e || !e[r])
                  return this.warn("Levels object was unset while buffering fragment " + i + " of level " + r + ". The current chunk will not be buffered."),
                  null;
                var a = e[r]
                  , s = -1 < n ? Object(m.getPartWith)(a, i, n) : null
                  , o = s ? s.fragment : Object(m.getFragmentWithSN)(a, i, this.fragCurrent);
                return o ? {
                  frag: o,
                  part: s,
                  level: a
                } : null
              }
              ,
              k.bufferFragmentData = function(t, e, r, i) {
                if (t && this.state === T.PARSING) {
                  var n = t.data1
                    , a = t.data2
                    , s = n;
                  if (n && a && (s = Object(h.appendUint8Array)(n, a)),
                  s && s.length) {
                    var o = {
                      type: t.type,
                      frag: e,
                      part: r,
                      chunkMeta: i,
                      parent: e.type,
                      data: s
                    };
                    this.hls.trigger(d.Events.BUFFER_APPENDING, o),
                    t.dropped && t.independent && !r && this.flushBufferGap(e)
                  }
                }
              }
              ,
              k.flushBufferGap = function(t) {
                var e = this.media;
                if (e) {
                  if (!l.BufferHelper.isBuffered(e, e.currentTime))
                    return void this.flushMainBuffer(0, t.start);
                  var r = e.currentTime
                    , i = l.BufferHelper.bufferInfo(e, r, 0)
                    , n = t.duration
                    , a = Math.min(2 * this.config.maxFragLookUpTolerance, .25 * n)
                    , s = Math.max(Math.min(t.start - a, i.end - a), r + a);
                  t.start - s > a && this.flushMainBuffer(s, t.start)
                }
              }
              ,
              k.getFwdBufferInfo = function(t, e) {
                var r = this.config
                  , i = this.getLoadPosition();
                if (!Object(a.isFiniteNumber)(i))
                  return null;
                var n = l.BufferHelper.bufferInfo(t, i, r.maxBufferHole);
                if (0 === n.len && void 0 !== n.nextStart) {
                  var s = this.fragmentTracker.getBufferedFrag(i, e);
                  if (s && n.nextStart < s.end)
                    return l.BufferHelper.bufferInfo(t, i, Math.max(n.nextStart, r.maxBufferHole))
                }
                return n
              }
              ,
              k.getMaxBufferLength = function(t) {
                var e, r = this.config;
                return e = t ? Math.max(8 * r.maxBufferSize / t, r.maxBufferLength) : r.maxBufferLength,
                Math.min(e, r.maxMaxBufferLength)
              }
              ,
              k.reduceMaxBufferLength = function(t) {
                var e = this.config
                  , r = t || e.maxBufferLength;
                return !!(e.maxMaxBufferLength >= r) && (e.maxMaxBufferLength /= 2,
                this.warn("Reduce max buffer length to " + e.maxMaxBufferLength + "s"),
                !0)
              }
              ,
              k.getNextFragment = function(t, e) {
                var r, i, n = e.fragments, a = n.length;
                if (!a)
                  return null;
                var s, o = this.config, l = n[0].start;
                if (e.live) {
                  var u = o.initialLiveManifestSize;
                  if (a < u)
                    return this.warn("Not enough fragments to start playback (have: " + a + ", need: " + u + ")"),
                    null;
                  e.PTSKnown || this.startFragRequested || -1 !== this.startPosition || (s = this.getInitialLiveFragment(e, n),
                  this.startPosition = s ? this.hls.liveSyncPosition || s.start : t)
                } else
                  t <= l && (s = n[0]);
                if (!s) {
                  var d = o.lowLatencyMode ? e.partEnd : e.fragmentEnd;
                  s = this.getFragmentAtPosition(t, d, e)
                }
                return null === (r = s) || void 0 === r || !r.initSegment || null !== (i = s) && void 0 !== i && i.initSegment.data || this.bitrateTest || (s = s.initSegment),
                s
              }
              ,
              k.getNextPart = function(t, e, r) {
                for (var i, n, a = -1, s = !1, o = !0, l = 0, u = t.length; l < u && (i = t[l],
                o = o && !i.independent,
                !(-1 < a && r < i.start)); l++)
                  !(n = i.loaded) && (s || i.independent || o) && i.fragment === e && (a = l),
                  s = n;
                return a
              }
              ,
              k.loadedEndOfParts = function(t, e) {
                var r = t[t.length - 1];
                return r && e > r.start && r.loaded
              }
              ,
              k.getInitialLiveFragment = function(t, e) {
                var r = this.fragPrevious
                  , i = null;
                if (r) {
                  if (t.hasProgramDateTime && (this.log("Live playlist, switching playlist, load frag with same PDT: " + r.programDateTime),
                  i = Object(v.findFragmentByPDT)(e, r.endProgramDateTime, this.config.maxFragLookUpTolerance)),
                  !i) {
                    var n = r.sn + 1;
                    if (n >= t.startSN && n <= t.endSN) {
                      var a = e[n - t.startSN];
                      r.cc === a.cc && (i = a,
                      this.log("Live playlist, switching playlist, load frag with next SN: " + i.sn))
                    }
                    i || (i = Object(v.findFragWithCC)(e, r.cc)) && this.log("Live playlist, switching playlist, load frag with same CC: " + i.sn)
                  }
                } else {
                  var s = this.hls.liveSyncPosition;
                  null !== s && (i = this.getFragmentAtPosition(s, this.bitrateTest ? t.fragmentEnd : t.edge, t))
                }
                return i
              }
              ,
              k.getFragmentAtPosition = function(t, e, r) {
                var i, n = this.config, a = this.fragPrevious, s = r.fragments, l = r.endSN, u = r.fragmentHint, d = n.maxFragLookUpTolerance, c = !!(n.lowLatencyMode && r.partList && u);
                if (c && u && !this.bitrateTest && (s = s.concat(u),
                l = u.sn),
                t < e) {
                  var f = t > e - d ? 0 : d;
                  i = Object(v.findFragmentByPTS)(a, s, t, f)
                } else
                  i = s[s.length - 1];
                if (i) {
                  var h = i.sn - r.startSN
                    , g = a && i.level === a.level
                    , m = s[h + 1];
                  if (this.fragmentTracker.getState(i) === o.FragmentState.BACKTRACKED) {
                    i = null;
                    for (var p = h; s[p] && this.fragmentTracker.getState(s[p]) === o.FragmentState.BACKTRACKED; )
                      i = a ? s[p--] : s[--p];
                    i || (i = m)
                  } else
                    a && i.sn === a.sn && !c && g && (i.sn < l && this.fragmentTracker.getState(m) !== o.FragmentState.OK ? (this.log("SN " + i.sn + " just loaded, load next one: " + m.sn),
                    i = m) : i = null)
                }
                return i
              }
              ,
              k.synchronizeToLiveEdge = function(t) {
                var e = this.config
                  , r = this.media;
                if (r) {
                  var i = this.hls.liveSyncPosition
                    , n = r.currentTime
                    , a = t.fragments[0].start
                    , s = t.edge
                    , o = n >= a - e.maxFragLookUpTolerance && n <= s;
                  if (null !== i && r.duration > i && (n < i || !o)) {
                    var l = void 0 === e.liveMaxLatencyDuration ? e.liveMaxLatencyDurationCount * t.targetduration : e.liveMaxLatencyDuration;
                    (!o && 4 > r.readyState || n < s - l) && (!this.loadedmetadata && (this.nextLoadPosition = i),
                    r.readyState && (this.warn("Playback: " + n.toFixed(3) + " is located too far from the end of live sliding playlist: " + s + ", reset currentTime to : " + i.toFixed(3)),
                    r.currentTime = i))
                  }
                }
              }
              ,
              k.alignPlaylists = function(t, e) {
                var r = this.levels
                  , i = this.levelLastLoaded
                  , n = this.fragPrevious
                  , s = null === i ? null : r[i]
                  , o = t.fragments.length;
                if (!o)
                  return this.warn("No fragments in live playlist"),
                  0;
                var l = t.fragments[0].start
                  , u = !e
                  , d = t.alignedSliding && Object(a.isFiniteNumber)(l);
                if (u || !d && !l) {
                  Object(g.alignStream)(n, s, t);
                  var c = t.fragments[0].start;
                  return this.log("Live playlist sliding: " + c.toFixed(2) + " start-sn: " + (e ? e.startSN : "na") + "->" + t.startSN + " prev-sn: " + (n ? n.sn : "na") + " fragments: " + o),
                  c
                }
                return l
              }
              ,
              k.waitForCdnTuneIn = function(t) {
                return t.live && t.canBlockReload && t.tuneInGoal > Math.max(t.partHoldBack, 3 * t.partTarget)
              }
              ,
              k.setStartPosition = function(t, e) {
                var r = this.startPosition;
                if (r < e && (r = -1),
                -1 === r || -1 === this.lastCurrentTime) {
                  var i = t.startTimeOffset;
                  Object(a.isFiniteNumber)(i) ? (r = e + i,
                  0 > i && (r += t.totalduration),
                  r = Math.min(Math.max(e, r), e + t.totalduration),
                  this.log("Start time offset " + i + " found in playlist, adjust startPosition to " + r),
                  this.startPosition = r) : t.live ? r = this.hls.liveSyncPosition || e : this.startPosition = r = 0,
                  this.lastCurrentTime = r
                }
                this.nextLoadPosition = r
              }
              ,
              k.getLoadPosition = function() {
                var t = this.media
                  , e = 0;
                return this.loadedmetadata && t ? e = t.currentTime : this.nextLoadPosition && (e = this.nextLoadPosition),
                e
              }
              ,
              k.handleFragLoadAborted = function(t, e) {
                this.transmuxer && "initSegment" !== t.sn && t.stats.aborted && (this.warn("Fragment " + t.sn + (e ? " part" + e.index : "") + " of level " + t.level + " was aborted"),
                this.resetFragmentLoading(t))
              }
              ,
              k.resetFragmentLoading = function(t) {
                this.fragCurrent && this.fragContextChanged(t) || (this.state = T.IDLE)
              }
              ,
              k.onFragmentOrKeyLoadError = function(t, e) {
                if (!e.fatal) {
                  var r = e.frag;
                  if (r && r.type === t) {
                    var i = this.fragCurrent;
                    console.assert(i && r.sn === i.sn && r.level === i.level && r.urlId === i.urlId, "Frag load error must match current frag to retry");
                    var n = this.config;
                    if (this.fragLoadError + 1 <= n.fragLoadingMaxRetry) {
                      if (this.resetLiveStartWhenNotLoaded(r.level))
                        return;
                      var a = Math.min(Math.pow(2, this.fragLoadError) * n.fragLoadingRetryDelay, n.fragLoadingMaxRetryTimeout);
                      this.warn("Fragment " + r.sn + " of " + t + " " + r.level + " failed to load, retrying in " + a + "ms"),
                      this.retryDate = self.performance.now() + a,
                      this.fragLoadError++,
                      this.state = T.FRAG_LOADING_WAITING_RETRY
                    } else
                      e.levelRetry ? (t === b.PlaylistLevelType.AUDIO && (this.fragCurrent = null),
                      this.fragLoadError = 0,
                      this.state = T.IDLE) : (u.logger.error(e.details + " reaches max retry, redispatch as fatal ..."),
                      e.fatal = !0,
                      this.hls.stopLoad(),
                      this.state = T.ERROR)
                  }
                }
              }
              ,
              k.afterBufferFlushed = function(t, e, r) {
                if (t) {
                  var i = l.BufferHelper.getBuffered(t);
                  this.fragmentTracker.detectEvictedFragments(e, i, r),
                  this.state === T.ENDED && this.resetLoadingState()
                }
              }
              ,
              k.resetLoadingState = function() {
                this.fragCurrent = null,
                this.fragPrevious = null,
                this.state = T.IDLE
              }
              ,
              k.resetLiveStartWhenNotLoaded = function(t) {
                if (!this.loadedmetadata) {
                  this.startFragRequested = !1;
                  var e = this.levels ? this.levels[t].details : null;
                  if (null != e && e.live)
                    return this.startPosition = -1,
                    this.setStartPosition(e, 0),
                    this.resetLoadingState(),
                    !0;
                  this.nextLoadPosition = this.startPosition
                }
                return !1
              }
              ,
              k.updateLevelTiming = function(t, e, r, i) {
                var n = this
                  , a = r.details;
                console.assert(!!a, "level.details must be defined"),
                Object.keys(t.elementaryStreams).reduce((function(e, s) {
                  var o = t.elementaryStreams[s];
                  if (o) {
                    var l = o.endPTS - o.startPTS;
                    if (0 >= l)
                      return n.warn("Could not parse fragment " + t.sn + " " + s + " duration reliably (" + l + ") resetting transmuxer to fallback to playlist timing"),
                      n.resetTransmuxer(),
                      e || !1;
                    var u = i ? 0 : Object(m.updateFragPTSDTS)(a, t, o.startPTS, o.endPTS, o.startDTS, o.endDTS);
                    return n.hls.trigger(d.Events.LEVEL_PTS_UPDATED, {
                      details: a,
                      level: r,
                      drift: u,
                      type: s,
                      frag: t,
                      start: o.startPTS,
                      end: o.endPTS
                    }),
                    !0
                  }
                  return e
                }
                ), !1) ? (this.state = T.PARSED,
                this.hls.trigger(d.Events.FRAG_PARSED, {
                  frag: t,
                  part: e
                })) : this.resetLoadingState()
              }
              ,
              k.resetTransmuxer = function() {
                this.transmuxer && (this.transmuxer.destroy(),
                this.transmuxer = null)
              }
              ,
              A = e,
              (S = [{
                key: "state",
                get: function() {
                  return this._state
                },
                set: function(t) {
                  var e = this._state;
                  e !== t && (this._state = t,
                  this.log(e + "->" + t))
                }
              }]) && i(A.prototype, S),
              L && i(A, L),
              e
            }(s.default)
          },
          "./src/controller/buffer-controller.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return h
            }
            ));
            var i = r("./src/polyfills/number.ts")
              , n = r("./src/events.ts")
              , a = r("./src/utils/logger.ts")
              , s = r("./src/errors.ts")
              , o = r("./src/utils/buffer-helper.ts")
              , l = r("./src/utils/mediasource-helper.ts")
              , u = r("./src/loader/fragment.ts")
              , d = r("./src/controller/buffer-operation-queue.ts")
              , c = Object(l.getMediaSource)()
              , f = /([ha]vc.)(?:\.[^.,]+)+/
              , h = function() {
              function t(t) {
                var e = this;
                this.details = null,
                this._objectUrl = null,
                this.operationQueue = void 0,
                this.listeners = void 0,
                this.hls = void 0,
                this.bufferCodecEventsExpected = 0,
                this._bufferCodecEventsTotal = 0,
                this.media = null,
                this.mediaSource = null,
                this.appendError = 0,
                this.tracks = {},
                this.pendingTracks = {},
                this.sourceBuffer = void 0,
                this._onMediaSourceOpen = function() {
                  var t = e.hls
                    , r = e.media
                    , i = e.mediaSource;
                  a.logger.log("[buffer-controller]: Media source opened"),
                  r && (e.updateMediaElementDuration(),
                  t.trigger(n.Events.MEDIA_ATTACHED, {
                    media: r
                  })),
                  i && i.removeEventListener("sourceopen", e._onMediaSourceOpen),
                  e.checkPendingTracks()
                }
                ,
                this._onMediaSourceClose = function() {
                  a.logger.log("[buffer-controller]: Media source closed")
                }
                ,
                this._onMediaSourceEnded = function() {
                  a.logger.log("[buffer-controller]: Media source ended")
                }
                ,
                this.hls = t,
                this._initSourceBuffer(),
                this.registerListeners()
              }
              var e = t.prototype;
              return e.hasSourceTypes = function() {
                return 0 < this.getSourceBufferTypes().length || 0 < Object.keys(this.pendingTracks).length
              }
              ,
              e.destroy = function() {
                this.unregisterListeners(),
                this.details = null
              }
              ,
              e.registerListeners = function() {
                var t = this.hls;
                t.on(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this),
                t.on(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.on(n.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.on(n.Events.BUFFER_RESET, this.onBufferReset, this),
                t.on(n.Events.BUFFER_APPENDING, this.onBufferAppending, this),
                t.on(n.Events.BUFFER_CODECS, this.onBufferCodecs, this),
                t.on(n.Events.BUFFER_EOS, this.onBufferEos, this),
                t.on(n.Events.BUFFER_FLUSHING, this.onBufferFlushing, this),
                t.on(n.Events.LEVEL_UPDATED, this.onLevelUpdated, this),
                t.on(n.Events.FRAG_PARSED, this.onFragParsed, this),
                t.on(n.Events.FRAG_CHANGED, this.onFragChanged, this)
              }
              ,
              e.unregisterListeners = function() {
                var t = this.hls;
                t.off(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this),
                t.off(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.off(n.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.off(n.Events.BUFFER_RESET, this.onBufferReset, this),
                t.off(n.Events.BUFFER_APPENDING, this.onBufferAppending, this),
                t.off(n.Events.BUFFER_CODECS, this.onBufferCodecs, this),
                t.off(n.Events.BUFFER_EOS, this.onBufferEos, this),
                t.off(n.Events.BUFFER_FLUSHING, this.onBufferFlushing, this),
                t.off(n.Events.LEVEL_UPDATED, this.onLevelUpdated, this),
                t.off(n.Events.FRAG_PARSED, this.onFragParsed, this),
                t.off(n.Events.FRAG_CHANGED, this.onFragChanged, this)
              }
              ,
              e._initSourceBuffer = function() {
                this.sourceBuffer = {},
                this.operationQueue = new d.default(this.sourceBuffer),
                this.listeners = {
                  audio: [],
                  video: [],
                  audiovideo: []
                }
              }
              ,
              e.onManifestParsed = function(t, e) {
                var r = 2;
                (!e.audio || e.video) && e.altAudio || (r = 1),
                this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = r,
                this.details = null,
                a.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected")
              }
              ,
              e.onMediaAttaching = function(t, e) {
                var r = this.media = e.media;
                if (r && c) {
                  var i = this.mediaSource = new c;
                  i.addEventListener("sourceopen", this._onMediaSourceOpen),
                  i.addEventListener("sourceended", this._onMediaSourceEnded),
                  i.addEventListener("sourceclose", this._onMediaSourceClose),
                  r.src = self.URL.createObjectURL(i),
                  this._objectUrl = r.src
                }
              }
              ,
              e.onMediaDetaching = function() {
                var t = this.media
                  , e = this.mediaSource
                  , r = this._objectUrl;
                if (e) {
                  if (a.logger.log("[buffer-controller]: media source detaching"),
                  "open" === e.readyState)
                    try {
                      e.endOfStream()
                    } catch (t) {
                      a.logger.warn("[buffer-controller]: onMediaDetaching: " + t.message + " while calling endOfStream")
                    }
                  this.onBufferReset(),
                  e.removeEventListener("sourceopen", this._onMediaSourceOpen),
                  e.removeEventListener("sourceended", this._onMediaSourceEnded),
                  e.removeEventListener("sourceclose", this._onMediaSourceClose),
                  t && (r && self.URL.revokeObjectURL(r),
                  t.src === r ? (t.removeAttribute("src"),
                  t.load()) : a.logger.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")),
                  this.mediaSource = null,
                  this.media = null,
                  this._objectUrl = null,
                  this.bufferCodecEventsExpected = this._bufferCodecEventsTotal,
                  this.pendingTracks = {},
                  this.tracks = {}
                }
                this.hls.trigger(n.Events.MEDIA_DETACHED, void 0)
              }
              ,
              e.onBufferReset = function() {
                var t = this;
                this.getSourceBufferTypes().forEach((function(e) {
                  var r = t.sourceBuffer[e];
                  try {
                    r && (t.removeBufferListeners(e),
                    t.mediaSource && t.mediaSource.removeSourceBuffer(r),
                    t.sourceBuffer[e] = void 0)
                  } catch (t) {
                    a.logger.warn("[buffer-controller]: Failed to reset the " + e + " buffer", t)
                  }
                }
                )),
                this._initSourceBuffer()
              }
              ,
              e.onBufferCodecs = function(t, e) {
                var r = this
                  , i = this.getSourceBufferTypes().length;
                Object.keys(e).forEach((function(t) {
                  if (i) {
                    var n = r.tracks[t];
                    if (n && "function" == typeof n.buffer.changeType) {
                      var a = e[t]
                        , s = a.codec
                        , o = a.levelCodec
                        , l = a.container;
                      if ((n.levelCodec || n.codec).replace(f, "$1") !== (o || s).replace(f, "$1")) {
                        var u = l + ";codecs=" + (o || s);
                        r.appendChangeType(t, u)
                      }
                    }
                  } else
                    r.pendingTracks[t] = e[t]
                }
                )),
                i || (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0),
                this.mediaSource && "open" === this.mediaSource.readyState && this.checkPendingTracks())
              }
              ,
              e.appendChangeType = function(t, e) {
                var r = this
                  , i = this.operationQueue
                  , n = {
                  execute: function() {
                    var n = r.sourceBuffer[t];
                    n && (a.logger.log("[buffer-controller]: changing " + t + " sourceBuffer type to " + e),
                    n.changeType(e)),
                    i.shiftAndExecuteNext(t)
                  },
                  onStart: function() {},
                  onComplete: function() {},
                  onError: function(e) {
                    a.logger.warn("[buffer-controller]: Failed to change " + t + " SourceBuffer type", e)
                  }
                };
                i.append(n, t)
              }
              ,
              e.onBufferAppending = function(t, e) {
                var r = this
                  , i = this.hls
                  , l = this.operationQueue
                  , u = this.tracks
                  , d = e.data
                  , c = e.type
                  , f = e.frag
                  , h = e.part
                  , g = e.chunkMeta
                  , v = g.buffering[c]
                  , m = self.performance.now();
                v.start = m;
                var p = f.stats.buffering
                  , y = h ? h.stats.buffering : null;
                0 === p.start && (p.start = m),
                y && 0 === y.start && (y.start = m);
                var E = u.audio
                  , b = "audio" === c && 1 === g.id && "audio/mpeg" === (null == E ? void 0 : E.container)
                  , T = {
                  execute: function() {
                    if (v.executeStart = self.performance.now(),
                    b) {
                      var t = r.sourceBuffer[c];
                      if (t) {
                        var e = f.start - t.timestampOffset;
                        .1 <= Math.abs(e) && (a.logger.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + f.start + " (delta: " + e + ") sn: " + f.sn + ")"),
                        t.timestampOffset = f.start)
                      }
                    }
                    r.appendExecutor(d, c)
                  },
                  onStart: function() {},
                  onComplete: function() {
                    var t = self.performance.now();
                    v.executeEnd = v.end = t,
                    0 === p.first && (p.first = t),
                    y && 0 === y.first && (y.first = t);
                    var e = r.sourceBuffer
                      , i = {};
                    for (var a in e)
                      i[a] = o.BufferHelper.getBuffered(e[a]);
                    r.appendError = 0,
                    r.hls.trigger(n.Events.BUFFER_APPENDED, {
                      type: c,
                      frag: f,
                      part: h,
                      chunkMeta: g,
                      parent: f.type,
                      timeRanges: i
                    })
                  },
                  onError: function(t) {
                    a.logger.error("[buffer-controller]: Error encountered while trying to append to the " + c + " SourceBuffer", t);
                    var e = {
                      type: s.ErrorTypes.MEDIA_ERROR,
                      parent: f.type,
                      details: s.ErrorDetails.BUFFER_APPEND_ERROR,
                      err: t,
                      fatal: !1
                    };
                    t.code === DOMException.QUOTA_EXCEEDED_ERR ? e.details = s.ErrorDetails.BUFFER_FULL_ERROR : (r.appendError++,
                    e.details = s.ErrorDetails.BUFFER_APPEND_ERROR,
                    r.appendError > i.config.appendErrorMaxRetry && (a.logger.error("[buffer-controller]: Failed " + i.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"),
                    e.fatal = !0)),
                    i.trigger(n.Events.ERROR, e)
                  }
                };
                l.append(T, c)
              }
              ,
              e.onBufferFlushing = function(t, e) {
                var r = this
                  , i = this.operationQueue
                  , s = function(t) {
                  return {
                    execute: r.removeExecutor.bind(r, t, e.startOffset, e.endOffset),
                    onStart: function() {},
                    onComplete: function() {
                      r.hls.trigger(n.Events.BUFFER_FLUSHED, {
                        type: t
                      })
                    },
                    onError: function(e) {
                      a.logger.warn("[buffer-controller]: Failed to remove from " + t + " SourceBuffer", e)
                    }
                  }
                };
                e.type ? i.append(s(e.type), e.type) : this.getSourceBufferTypes().forEach((function(t) {
                  i.append(s(t), t)
                }
                ))
              }
              ,
              e.onFragParsed = function(t, e) {
                var r = this
                  , i = e.frag
                  , s = e.part
                  , o = []
                  , l = s ? s.elementaryStreams : i.elementaryStreams;
                l[u.ElementaryStreamTypes.AUDIOVIDEO] ? o.push("audiovideo") : (l[u.ElementaryStreamTypes.AUDIO] && o.push("audio"),
                l[u.ElementaryStreamTypes.VIDEO] && o.push("video")),
                0 === o.length && a.logger.warn("Fragments must have at least one ElementaryStreamType set. type: " + i.type + " level: " + i.level + " sn: " + i.sn),
                this.blockBuffers((function() {
                  var t = self.performance.now();
                  i.stats.buffering.end = t,
                  s && (s.stats.buffering.end = t);
                  var e = s ? s.stats : i.stats;
                  r.hls.trigger(n.Events.FRAG_BUFFERED, {
                    frag: i,
                    part: s,
                    stats: e,
                    id: i.type
                  })
                }
                ), o)
              }
              ,
              e.onFragChanged = function(t, e) {
                this.flushBackBuffer()
              }
              ,
              e.onBufferEos = function(t, e) {
                var r = this;
                this.getSourceBufferTypes().reduce((function(t, i) {
                  var n = r.sourceBuffer[i];
                  return e.type && e.type !== i || !n || n.ended || (n.ended = !0,
                  a.logger.log("[buffer-controller]: " + i + " sourceBuffer now EOS")),
                  t && (!n || n.ended)
                }
                ), !0) && this.blockBuffers((function() {
                  var t = r.mediaSource;
                  t && "open" === t.readyState && t.endOfStream()
                }
                ))
              }
              ,
              e.onLevelUpdated = function(t, e) {
                var r = e.details;
                r.fragments.length && (this.details = r,
                this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration())
              }
              ,
              e.flushBackBuffer = function() {
                var t = this.hls
                  , e = this.details
                  , r = this.media
                  , a = this.sourceBuffer;
                if (r && null !== e) {
                  var s = this.getSourceBufferTypes();
                  if (s.length) {
                    var l = e.live && null !== t.config.liveBackBufferLength ? t.config.liveBackBufferLength : t.config.backBufferLength;
                    if (Object(i.isFiniteNumber)(l) && !(0 > l)) {
                      var u = r.currentTime
                        , d = e.levelTargetDuration
                        , c = Math.max(l, d)
                        , f = Math.floor(u / d) * d - c;
                      s.forEach((function(r) {
                        var i = a[r];
                        if (i) {
                          var s = o.BufferHelper.getBuffered(i);
                          0 < s.length && f > s.start(0) && (t.trigger(n.Events.BACK_BUFFER_REACHED, {
                            bufferEnd: f
                          }),
                          e.live && t.trigger(n.Events.LIVE_BACK_BUFFER_REACHED, {
                            bufferEnd: f
                          }),
                          t.trigger(n.Events.BUFFER_FLUSHING, {
                            startOffset: 0,
                            endOffset: f,
                            type: r
                          }))
                        }
                      }
                      ))
                    }
                  }
                }
              }
              ,
              e.updateMediaElementDuration = function() {
                if (this.details && this.media && this.mediaSource && "open" === this.mediaSource.readyState) {
                  var t = this.details
                    , e = this.hls
                    , r = this.media
                    , n = this.mediaSource
                    , s = t.fragments[0].start + t.totalduration
                    , o = r.duration
                    , l = Object(i.isFiniteNumber)(n.duration) ? n.duration : 0;
                  t.live && e.config.liveDurationInfinity ? (a.logger.log("[buffer-controller]: Media Source duration is set to Infinity"),
                  n.duration = 1 / 0,
                  this.updateSeekableRange(t)) : (s > l && s > o || !Object(i.isFiniteNumber)(o)) && (a.logger.log("[buffer-controller]: Updating Media Source duration to " + s.toFixed(3)),
                  n.duration = s)
                }
              }
              ,
              e.updateSeekableRange = function(t) {
                var e = this.mediaSource
                  , r = t.fragments;
                if (r.length && t.live && null != e && e.setLiveSeekableRange) {
                  var i = Math.max(0, r[0].start)
                    , n = Math.max(i, i + t.totalduration);
                  e.setLiveSeekableRange(i, n)
                }
              }
              ,
              e.checkPendingTracks = function() {
                var t = this.bufferCodecEventsExpected
                  , e = this.operationQueue
                  , r = this.pendingTracks
                  , i = Object.keys(r).length;
                if (i && !t || 2 === i) {
                  this.createSourceBuffers(r),
                  this.pendingTracks = {};
                  var a = this.getSourceBufferTypes();
                  if (0 === a.length)
                    return void this.hls.trigger(n.Events.ERROR, {
                      type: s.ErrorTypes.MEDIA_ERROR,
                      details: s.ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR,
                      fatal: !0,
                      reason: "could not create source buffer for media codec(s)"
                    });
                  a.forEach((function(t) {
                    e.executeNext(t)
                  }
                  ))
                }
              }
              ,
              e.createSourceBuffers = function(t) {
                var e = this.sourceBuffer
                  , r = this.mediaSource;
                if (!r)
                  throw Error("createSourceBuffers called when mediaSource was null");
                var i = 0;
                for (var o in t)
                  if (!e[o]) {
                    var l = t[o];
                    if (!l)
                      throw Error("source buffer exists for track " + o + ", however track does not");
                    var u = l.levelCodec || l.codec
                      , d = l.container + ";codecs=" + u;
                    a.logger.log("[buffer-controller]: creating sourceBuffer(" + d + ")");
                    try {
                      var c = e[o] = r.addSourceBuffer(d)
                        , f = o;
                      this.addBufferListener(f, "updatestart", this._onSBUpdateStart),
                      this.addBufferListener(f, "updateend", this._onSBUpdateEnd),
                      this.addBufferListener(f, "error", this._onSBUpdateError),
                      this.tracks[o] = {
                        buffer: c,
                        codec: u,
                        container: l.container,
                        levelCodec: l.levelCodec,
                        id: l.id
                      },
                      i++
                    } catch (t) {
                      a.logger.error("[buffer-controller]: error while trying to add sourceBuffer: " + t.message),
                      this.hls.trigger(n.Events.ERROR, {
                        type: s.ErrorTypes.MEDIA_ERROR,
                        details: s.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                        fatal: !1,
                        error: t,
                        mimeType: d
                      })
                    }
                  }
                i && this.hls.trigger(n.Events.BUFFER_CREATED, {
                  tracks: this.tracks
                })
              }
              ,
              e._onSBUpdateStart = function(t) {
                this.operationQueue.current(t).onStart()
              }
              ,
              e._onSBUpdateEnd = function(t) {
                var e = this.operationQueue;
                e.current(t).onComplete(),
                e.shiftAndExecuteNext(t)
              }
              ,
              e._onSBUpdateError = function(t, e) {
                a.logger.error("[buffer-controller]: " + t + " SourceBuffer error", e),
                this.hls.trigger(n.Events.ERROR, {
                  type: s.ErrorTypes.MEDIA_ERROR,
                  details: s.ErrorDetails.BUFFER_APPENDING_ERROR,
                  fatal: !1
                });
                var r = this.operationQueue.current(t);
                r && r.onError(e)
              }
              ,
              e.removeExecutor = function(t, e, r) {
                var n = this.media
                  , s = this.mediaSource
                  , o = this.operationQueue
                  , l = this.sourceBuffer[t];
                if (!n || !s || !l)
                  return a.logger.warn("[buffer-controller]: Attempting to remove from the " + t + " SourceBuffer, but it does not exist"),
                  void o.shiftAndExecuteNext(t);
                var u = Object(i.isFiniteNumber)(n.duration) ? n.duration : 1 / 0
                  , d = Object(i.isFiniteNumber)(s.duration) ? s.duration : 1 / 0
                  , c = Math.max(0, e)
                  , f = Math.min(r, u, d);
                f > c ? (a.logger.log("[buffer-controller]: Removing [" + c + "," + f + "] from the " + t + " SourceBuffer"),
                console.assert(!l.updating, t + " sourceBuffer must not be updating"),
                l.remove(c, f)) : o.shiftAndExecuteNext(t)
              }
              ,
              e.appendExecutor = function(t, e) {
                var r = this.operationQueue
                  , i = this.sourceBuffer[e];
                return i ? (i.ended = !1,
                console.assert(!i.updating, e + " sourceBuffer must not be updating"),
                void i.appendBuffer(t)) : (a.logger.warn("[buffer-controller]: Attempting to append to the " + e + " SourceBuffer, but it does not exist"),
                void r.shiftAndExecuteNext(e))
              }
              ,
              e.blockBuffers = function(t, e) {
                var r = this;
                if (void 0 === e && (e = this.getSourceBufferTypes()),
                !e.length)
                  return a.logger.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"),
                  void Promise.resolve(t);
                var i = this.operationQueue
                  , n = e.map((function(t) {
                  return i.appendBlocker(t)
                }
                ));
                Promise.all(n).then((function() {
                  t(),
                  e.forEach((function(t) {
                    var e = r.sourceBuffer[t];
                    e && e.updating || i.shiftAndExecuteNext(t)
                  }
                  ))
                }
                ))
              }
              ,
              e.getSourceBufferTypes = function() {
                return Object.keys(this.sourceBuffer)
              }
              ,
              e.addBufferListener = function(t, e, r) {
                var i = this.sourceBuffer[t];
                if (i) {
                  var n = r.bind(this, t);
                  this.listeners[t].push({
                    event: e,
                    listener: n
                  }),
                  i.addEventListener(e, n)
                }
              }
              ,
              e.removeBufferListeners = function(t) {
                var e = this.sourceBuffer[t];
                e && this.listeners[t].forEach((function(t) {
                  e.removeEventListener(t.event, t.listener)
                }
                ))
              }
              ,
              t
            }()
          },
          "./src/controller/buffer-operation-queue.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return n
            }
            ));
            var i = r("./src/utils/logger.ts")
              , n = function() {
              function t(t) {
                this.buffers = void 0,
                this.queues = {
                  video: [],
                  audio: [],
                  audiovideo: []
                },
                this.buffers = t
              }
              var e = t.prototype;
              return e.append = function(t, e) {
                var r = this.queues[e];
                r.push(t),
                1 === r.length && this.buffers[e] && this.executeNext(e)
              }
              ,
              e.insertAbort = function(t, e) {
                this.queues[e].unshift(t),
                this.executeNext(e)
              }
              ,
              e.appendBlocker = function(t) {
                var e, r = new Promise((function(t) {
                  e = t
                }
                )), i = {
                  execute: e,
                  onStart: function() {},
                  onComplete: function() {},
                  onError: function() {}
                };
                return this.append(i, t),
                r
              }
              ,
              e.executeNext = function(t) {
                var e = this.buffers
                  , r = this.queues
                  , n = e[t]
                  , a = r[t];
                if (a.length) {
                  var s = a[0];
                  try {
                    s.execute()
                  } catch (e) {
                    i.logger.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"),
                    s.onError(e),
                    n && n.updating || (a.shift(),
                    this.executeNext(t))
                  }
                }
              }
              ,
              e.shiftAndExecuteNext = function(t) {
                this.queues[t].shift(),
                this.executeNext(t)
              }
              ,
              e.current = function(t) {
                return this.queues[t][0]
              }
              ,
              t
            }()
          },
          "./src/controller/cap-level-controller.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            r.r(e);
            var n = r("./src/events.ts")
              , a = function() {
              function t(t) {
                this.autoLevelCapping = void 0,
                this.firstLevel = void 0,
                this.media = void 0,
                this.restrictedLevels = void 0,
                this.timer = void 0,
                this.hls = void 0,
                this.streamController = void 0,
                this.clientRect = void 0,
                this.hls = t,
                this.autoLevelCapping = Number.POSITIVE_INFINITY,
                this.firstLevel = -1,
                this.media = null,
                this.restrictedLevels = [],
                this.timer = void 0,
                this.clientRect = null,
                this.registerListeners()
              }
              var e, r, a, s = t.prototype;
              return s.setStreamController = function(t) {
                this.streamController = t
              }
              ,
              s.destroy = function() {
                this.unregisterListener(),
                this.hls.config.capLevelToPlayerSize && this.stopCapping(),
                this.media = null,
                this.clientRect = null,
                this.hls = this.streamController = null
              }
              ,
              s.registerListeners = function() {
                var t = this.hls;
                t.on(n.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this),
                t.on(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this),
                t.on(n.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.on(n.Events.BUFFER_CODECS, this.onBufferCodecs, this),
                t.on(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this)
              }
              ,
              s.unregisterListener = function() {
                var t = this.hls;
                t.off(n.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this),
                t.off(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this),
                t.off(n.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.off(n.Events.BUFFER_CODECS, this.onBufferCodecs, this),
                t.off(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this)
              }
              ,
              s.onFpsDropLevelCapping = function(e, r) {
                t.isLevelAllowed(r.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(r.droppedLevel)
              }
              ,
              s.onMediaAttaching = function(t, e) {
                this.media = e.media instanceof HTMLVideoElement ? e.media : null
              }
              ,
              s.onManifestParsed = function(t, e) {
                var r = this.hls;
                this.restrictedLevels = [],
                this.firstLevel = e.firstLevel,
                r.config.capLevelToPlayerSize && e.video && this.startCapping()
              }
              ,
              s.onBufferCodecs = function(t, e) {
                this.hls.config.capLevelToPlayerSize && e.video && this.startCapping()
              }
              ,
              s.onMediaDetaching = function() {
                this.stopCapping()
              }
              ,
              s.detectPlayerSize = function() {
                if (this.media && 0 < this.mediaHeight && 0 < this.mediaWidth) {
                  var t = this.hls.levels;
                  if (t.length) {
                    var e = this.hls;
                    e.autoLevelCapping = this.getMaxLevel(t.length - 1),
                    e.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(),
                    this.autoLevelCapping = e.autoLevelCapping
                  }
                }
              }
              ,
              s.getMaxLevel = function(e) {
                var r = this
                  , i = this.hls.levels;
                if (!i.length)
                  return -1;
                var n = i.filter((function(i, n) {
                  return t.isLevelAllowed(n, r.restrictedLevels) && n <= e
                }
                ));
                return this.clientRect = null,
                t.getMaxLevelByMediaSize(n, this.mediaWidth, this.mediaHeight)
              }
              ,
              s.startCapping = function() {
                this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY,
                this.hls.firstLevel = this.getMaxLevel(this.firstLevel),
                self.clearInterval(this.timer),
                this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3),
                this.detectPlayerSize())
              }
              ,
              s.stopCapping = function() {
                this.restrictedLevels = [],
                this.firstLevel = -1,
                this.autoLevelCapping = Number.POSITIVE_INFINITY,
                this.timer && (self.clearInterval(this.timer),
                this.timer = void 0)
              }
              ,
              s.getDimensions = function() {
                if (this.clientRect)
                  return this.clientRect;
                var t = this.media
                  , e = {
                  width: 0,
                  height: 0
                };
                if (t) {
                  var r = t.getBoundingClientRect();
                  e.width = r.width,
                  e.height = r.height,
                  e.width || e.height || (e.width = r.right - r.left || t.width || 0,
                  e.height = r.bottom - r.top || t.height || 0)
                }
                return this.clientRect = e,
                e
              }
              ,
              t.isLevelAllowed = function(t, e) {
                return void 0 === e && (e = []),
                -1 === e.indexOf(t)
              }
              ,
              t.getMaxLevelByMediaSize = function(t, e, r) {
                if (!t || !t.length)
                  return -1;
                for (var i, n = t.length - 1, a = 0; a < t.length; a += 1)
                  if (((i = t[a]).width >= e || i.height >= r) && (s = i,
                  !(o = t[a + 1]) || s.width !== o.width || s.height !== o.height)) {
                    n = a;
                    break
                  }
                var s, o;
                return n
              }
              ,
              e = t,
              a = [{
                key: "contentScaleFactor",
                get: function() {
                  var t = 1;
                  try {
                    t = self.devicePixelRatio
                  } catch (t) {}
                  return t
                }
              }],
              (r = [{
                key: "mediaWidth",
                get: function() {
                  return this.getDimensions().width * t.contentScaleFactor
                }
              }, {
                key: "mediaHeight",
                get: function() {
                  return this.getDimensions().height * t.contentScaleFactor
                }
              }]) && i(e.prototype, r),
              a && i(e, a),
              t
            }();
            e.default = a
          },
          "./src/controller/fps-controller.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = r("./src/events.ts")
              , n = r("./src/utils/logger.ts")
              , a = function() {
              function t(t) {
                this.hls = void 0,
                this.isVideoPlaybackQualityAvailable = !1,
                this.timer = void 0,
                this.media = null,
                this.lastTime = void 0,
                this.lastDroppedFrames = 0,
                this.lastDecodedFrames = 0,
                this.streamController = void 0,
                this.hls = t,
                this.registerListeners()
              }
              var e = t.prototype;
              return e.setStreamController = function(t) {
                this.streamController = t
              }
              ,
              e.registerListeners = function() {
                this.hls.on(i.Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
              }
              ,
              e.unregisterListeners = function() {
                this.hls.off(i.Events.MEDIA_ATTACHING, this.onMediaAttaching)
              }
              ,
              e.destroy = function() {
                this.timer && clearInterval(this.timer),
                this.unregisterListeners(),
                this.isVideoPlaybackQualityAvailable = !1,
                this.media = null
              }
              ,
              e.onMediaAttaching = function(t, e) {
                var r = this.hls.config;
                if (r.capLevelOnFPSDrop) {
                  var i = e.media instanceof self.HTMLVideoElement ? e.media : null;
                  this.media = i,
                  i && "function" == typeof i.getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0),
                  self.clearInterval(this.timer),
                  this.timer = self.setInterval(this.checkFPSInterval.bind(this), r.fpsDroppedMonitoringPeriod)
                }
              }
              ,
              e.checkFPS = function(t, e, r) {
                var a = performance.now();
                if (e) {
                  if (this.lastTime) {
                    var s = a - this.lastTime
                      , o = r - this.lastDroppedFrames
                      , l = e - this.lastDecodedFrames
                      , u = 1e3 * o / s
                      , d = this.hls;
                    if (d.trigger(i.Events.FPS_DROP, {
                      currentDropped: o,
                      currentDecoded: l,
                      totalDroppedFrames: r
                    }),
                    0 < u && o > d.config.fpsDroppedMonitoringThreshold * l) {
                      var c = d.currentLevel;
                      n.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + c),
                      0 < c && (-1 === d.autoLevelCapping || d.autoLevelCapping >= c) && (--c,
                      d.trigger(i.Events.FPS_DROP_LEVEL_CAPPING, {
                        level: c,
                        droppedLevel: d.currentLevel
                      }),
                      d.autoLevelCapping = c,
                      this.streamController.nextLevelSwitch())
                    }
                  }
                  this.lastTime = a,
                  this.lastDroppedFrames = r,
                  this.lastDecodedFrames = e
                }
              }
              ,
              e.checkFPSInterval = function() {
                var t = this.media;
                if (t)
                  if (this.isVideoPlaybackQualityAvailable) {
                    var e = t.getVideoPlaybackQuality();
                    this.checkFPS(t, e.totalVideoFrames, e.droppedVideoFrames)
                  } else
                    this.checkFPS(t, t.webkitDecodedFrameCount, t.webkitDroppedFrameCount)
              }
              ,
              t
            }();
            e.default = a
          },
          "./src/controller/fragment-finders.ts": function(t, e, r) {
            "use strict";
            function i(t, e, r) {
              if (null === e || !Array.isArray(t) || !t.length || !Object(l.isFiniteNumber)(e))
                return null;
              if (e < (t[0].programDateTime || 0))
                return null;
              if (e >= (t[t.length - 1].endProgramDateTime || 0))
                return null;
              r = r || 0;
              for (var i, n = 0; n < t.length; ++n)
                if (s(e, r, i = t[n]))
                  return i;
              return null
            }
            function n(t, e, r, i) {
              void 0 === r && (r = 0),
              void 0 === i && (i = 0);
              var n = null;
              if (t ? n = e[t.sn - e[0].sn + 1] || null : 0 === r && 0 === e[0].start && (n = e[0]),
              n && 0 === a(r, i, n))
                return n;
              var s = u.default.search(e, a.bind(null, r, i));
              return s || n
            }
            function a(t, e, r) {
              void 0 === t && (t = 0),
              void 0 === e && (e = 0);
              var i = Math.min(e, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
              return r.start + r.duration - i <= t ? 1 : r.start - i > t && r.start ? -1 : 0
            }
            function s(t, e, r) {
              var i = 1e3 * Math.min(e, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
              return (r.endProgramDateTime || 0) - i > t
            }
            function o(t, e) {
              return u.default.search(t, (function(t) {
                return t.cc < e ? 1 : t.cc > e ? -1 : 0
              }
              ))
            }
            r.r(e),
            r.d(e, "findFragmentByPDT", (function() {
              return i
            }
            )),
            r.d(e, "findFragmentByPTS", (function() {
              return n
            }
            )),
            r.d(e, "fragmentWithinToleranceTest", (function() {
              return a
            }
            )),
            r.d(e, "pdtWithinToleranceTest", (function() {
              return s
            }
            )),
            r.d(e, "findFragWithCC", (function() {
              return o
            }
            ));
            var l = r("./src/polyfills/number.ts")
              , u = r("./src/utils/binary-search.ts")
          },
          "./src/controller/fragment-tracker.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              var e, r;
              return t.buffered && ((null === (e = t.range.video) || void 0 === e ? void 0 : e.partial) || (null === (r = t.range.audio) || void 0 === r ? void 0 : r.partial))
            }
            function n(t) {
              return t.type + "_" + t.level + "_" + t.urlId + "_" + t.sn
            }
            r.r(e),
            r.d(e, "FragmentState", (function() {
              return a
            }
            )),
            r.d(e, "FragmentTracker", (function() {
              return l
            }
            ));
            var a, s = r("./src/events.ts"), o = r("./src/types/loader.ts");
            !function(t) {
              t.NOT_LOADED = "NOT_LOADED",
              t.BACKTRACKED = "BACKTRACKED",
              t.APPENDING = "APPENDING",
              t.PARTIAL = "PARTIAL",
              t.OK = "OK"
            }(a || (a = {}));
            var l = function() {
              function t(t) {
                this.activeFragment = null,
                this.activeParts = null,
                this.fragments = Object.create(null),
                this.timeRanges = Object.create(null),
                this.bufferPadding = .2,
                this.hls = void 0,
                this.hls = t,
                this._registerListeners()
              }
              var e = t.prototype;
              return e._registerListeners = function() {
                var t = this.hls;
                t.on(s.Events.BUFFER_APPENDED, this.onBufferAppended, this),
                t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this),
                t.on(s.Events.FRAG_LOADED, this.onFragLoaded, this)
              }
              ,
              e._unregisterListeners = function() {
                var t = this.hls;
                t.off(s.Events.BUFFER_APPENDED, this.onBufferAppended, this),
                t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this),
                t.off(s.Events.FRAG_LOADED, this.onFragLoaded, this)
              }
              ,
              e.destroy = function() {
                this._unregisterListeners(),
                this.fragments = this.timeRanges = null
              }
              ,
              e.getAppendedFrag = function(t, e) {
                if (e === o.PlaylistLevelType.MAIN) {
                  var r = this.activeFragment
                    , i = this.activeParts;
                  if (!r)
                    return null;
                  if (i)
                    for (var n = i.length; n--; ) {
                      var a = i[n]
                        , s = a ? a.end : r.appendedPTS;
                      if (a.start <= t && void 0 !== s && t <= s)
                        return 9 < n && (this.activeParts = i.slice(n - 9)),
                        a
                    }
                  else if (r.start <= t && void 0 !== r.appendedPTS && t <= r.appendedPTS)
                    return r
                }
                return this.getBufferedFrag(t, e)
              }
              ,
              e.getBufferedFrag = function(t, e) {
                for (var r, i = this.fragments, n = Object.keys(i), a = n.length; a--; )
                  if ((null == (r = i[n[a]]) ? void 0 : r.body.type) === e && r.buffered) {
                    var s = r.body;
                    if (s.start <= t && t <= s.end)
                      return s
                  }
                return null
              }
              ,
              e.detectEvictedFragments = function(t, e, r) {
                var i = this;
                Object.keys(this.fragments).forEach((function(n) {
                  var a = i.fragments[n];
                  if (a) {
                    if (!a.buffered)
                      return void (a.body.type === r && i.removeFragment(a.body));
                    var s = a.range[t];
                    s && s.time.some((function(t) {
                      var r = !i.isTimeBuffered(t.startPTS, t.endPTS, e);
                      return r && i.removeFragment(a.body),
                      r
                    }
                    ))
                  }
                }
                ))
              }
              ,
              e.detectPartialFragments = function(t) {
                var e = this
                  , r = this.timeRanges
                  , i = t.frag
                  , a = t.part;
                if (r && "initSegment" !== i.sn) {
                  var s = n(i)
                    , o = this.fragments[s];
                  o && (Object.keys(r).forEach((function(t) {
                    var n = i.elementaryStreams[t];
                    if (n) {
                      var s = r[t]
                        , l = null !== a || !0 === n.partial;
                      o.range[t] = e.getBufferedTimes(i, a, l, s)
                    }
                  }
                  )),
                  o.backtrack = o.loaded = null,
                  Object.keys(o.range).length ? o.buffered = !0 : this.removeFragment(o.body))
                }
              }
              ,
              e.fragBuffered = function(t) {
                var e = n(t)
                  , r = this.fragments[e];
                r && (r.backtrack = r.loaded = null,
                r.buffered = !0)
              }
              ,
              e.getBufferedTimes = function(t, e, r, i) {
                for (var n = {
                  time: [],
                  partial: r
                }, a = e ? e.start : t.start, s = e ? e.end : t.end, o = t.minEndPTS || s, l = t.maxStartPTS || a, u = 0; u < i.length; u++) {
                  var d = i.start(u) - this.bufferPadding
                    , c = i.end(u) + this.bufferPadding;
                  if (l >= d && o <= c) {
                    n.time.push({
                      startPTS: Math.max(a, i.start(u)),
                      endPTS: Math.min(s, i.end(u))
                    });
                    break
                  }
                  if (a < c && s > d)
                    n.partial = !0,
                    n.time.push({
                      startPTS: Math.max(a, i.start(u)),
                      endPTS: Math.min(s, i.end(u))
                    });
                  else if (s <= d)
                    break
                }
                return n
              }
              ,
              e.getPartialFragment = function(t) {
                var e, r, n, a = null, s = 0, o = this.bufferPadding, l = this.fragments;
                return Object.keys(l).forEach((function(u) {
                  var d = l[u];
                  !d || i(d) && (r = d.body.start - o,
                  n = d.body.end + o,
                  t >= r && t <= n && (e = Math.min(t - r, n - t),
                  s <= e && (a = d.body,
                  s = e)))
                }
                )),
                a
              }
              ,
              e.getState = function(t) {
                var e = n(t)
                  , r = this.fragments[e];
                return r ? r.buffered ? i(r) ? a.PARTIAL : a.OK : r.backtrack ? a.BACKTRACKED : a.APPENDING : a.NOT_LOADED
              }
              ,
              e.backtrack = function(t, e) {
                var r = n(t)
                  , i = this.fragments[r];
                if (!i || i.backtrack)
                  return null;
                var a = i.backtrack = e || i.loaded;
                return i.loaded = null,
                a
              }
              ,
              e.getBacktrackData = function(t) {
                var e = n(t)
                  , r = this.fragments[e];
                if (r) {
                  var i, a = r.backtrack;
                  if (null != a && null !== (i = a.payload) && void 0 !== i && i.byteLength)
                    return a;
                  this.removeFragment(t)
                }
                return null
              }
              ,
              e.isTimeBuffered = function(t, e, r) {
                for (var i, n, a = 0; a < r.length; a++) {
                  if (i = r.start(a) - this.bufferPadding,
                  n = r.end(a) + this.bufferPadding,
                  t >= i && e <= n)
                    return !0;
                  if (e <= i)
                    return !1
                }
                return !1
              }
              ,
              e.onFragLoaded = function(t, e) {
                var r = e.frag
                  , i = e.part;
                if ("initSegment" !== r.sn && !r.bitrateTest && !i) {
                  var a = n(r);
                  this.fragments[a] = {
                    body: r,
                    loaded: e,
                    backtrack: null,
                    buffered: !1,
                    range: Object.create(null)
                  }
                }
              }
              ,
              e.onBufferAppended = function(t, e) {
                var r = this
                  , i = e.frag
                  , n = e.part
                  , a = e.timeRanges;
                if (i.type === o.PlaylistLevelType.MAIN)
                  if (this.activeFragment = i,
                  n) {
                    var s = this.activeParts;
                    s || (this.activeParts = s = []),
                    s.push(n)
                  } else
                    this.activeParts = null;
                this.timeRanges = a,
                Object.keys(a).forEach((function(t) {
                  var e = a[t];
                  if (r.detectEvictedFragments(t, e),
                  !n)
                    for (var s = 0; s < e.length; s++)
                      i.appendedPTS = Math.max(e.end(s), i.appendedPTS || 0)
                }
                ))
              }
              ,
              e.onFragBuffered = function(t, e) {
                this.detectPartialFragments(e)
              }
              ,
              e.hasFragment = function(t) {
                var e = n(t);
                return !!this.fragments[e]
              }
              ,
              e.removeFragmentsInRange = function(t, e, r) {
                var i = this;
                Object.keys(this.fragments).forEach((function(n) {
                  var a = i.fragments[n];
                  if (a && a.buffered) {
                    var s = a.body;
                    s.type === r && s.start < e && s.end > t && i.removeFragment(s)
                  }
                }
                ))
              }
              ,
              e.removeFragment = function(t) {
                var e = n(t);
                t.stats.loaded = 0,
                t.clearElementaryStreamInfo(),
                delete this.fragments[e]
              }
              ,
              e.removeAllFragments = function() {
                this.fragments = Object.create(null),
                this.activeFragment = null,
                this.activeParts = null
              }
              ,
              t
            }()
          },
          "./src/controller/gap-controller.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "STALL_MINIMUM_DURATION_MS", (function() {
              return o
            }
            )),
            r.d(e, "MAX_START_GAP_JUMP", (function() {
              return l
            }
            )),
            r.d(e, "SKIP_BUFFER_HOLE_STEP_SECONDS", (function() {
              return u
            }
            )),
            r.d(e, "SKIP_BUFFER_RANGE_START", (function() {
              return d
            }
            )),
            r.d(e, "default", (function() {
              return c
            }
            ));
            var i = r("./src/utils/buffer-helper.ts")
              , n = r("./src/errors.ts")
              , a = r("./src/events.ts")
              , s = r("./src/utils/logger.ts")
              , o = 250
              , l = 2
              , u = .1
              , d = .05
              , c = function() {
              function t(t, e, r, i) {
                this.config = void 0,
                this.media = void 0,
                this.fragmentTracker = void 0,
                this.hls = void 0,
                this.nudgeRetry = 0,
                this.stallReported = !1,
                this.stalled = null,
                this.moved = !1,
                this.seeking = !1,
                this.config = t,
                this.media = e,
                this.fragmentTracker = r,
                this.hls = i
              }
              var e = t.prototype;
              return e.destroy = function() {
                this.hls = this.fragmentTracker = this.media = null
              }
              ,
              e.poll = function(t) {
                var e = this.config
                  , r = this.media
                  , n = this.stalled
                  , a = r.currentTime
                  , o = r.seeking
                  , l = this.seeking && !o
                  , u = !this.seeking && o;
                if (this.seeking = o,
                a === t) {
                  if ((u || l) && (this.stalled = null),
                  !r.paused && !r.ended && 0 !== r.playbackRate && i.BufferHelper.getBuffered(r).length) {
                    var d = i.BufferHelper.bufferInfo(r, a, 0)
                      , c = 0 < d.len
                      , f = d.nextStart || 0;
                    if (c || f) {
                      if (o) {
                        var h = 2 < d.len
                          , g = !f || 2 < f - a && !this.fragmentTracker.getPartialFragment(a);
                        if (h || g)
                          return;
                        this.moved = !1
                      }
                      if (!this.moved && null !== this.stalled) {
                        var v, m = Math.max(f, d.start || 0) - a, p = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null, y = (null == p || null === (v = p.details) || void 0 === v ? void 0 : v.live) ? 2 * p.details.targetduration : 2;
                        if (0 < m && m <= y)
                          return void this._trySkipBufferHole(null)
                      }
                      var E = self.performance.now();
                      if (null === n)
                        return void (this.stalled = E);
                      var b = E - n;
                      !o && 250 <= b && this._reportStall(d.len);
                      var T = i.BufferHelper.bufferInfo(r, a, e.maxBufferHole);
                      this._tryFixBufferStall(T, b)
                    }
                  }
                } else if (this.moved = !0,
                null !== n) {
                  if (this.stallReported) {
                    var A = self.performance.now() - n;
                    s.logger.warn("playback not stuck anymore @" + a + ", after " + Math.round(A) + "ms"),
                    this.stallReported = !1
                  }
                  this.stalled = null,
                  this.nudgeRetry = 0
                }
              }
              ,
              e._tryFixBufferStall = function(t, e) {
                var r = this.config
                  , i = this.fragmentTracker
                  , n = this.media.currentTime
                  , a = i.getPartialFragment(n);
                a && this._trySkipBufferHole(a) || t.len > r.maxBufferHole && e > 1e3 * r.highBufferWatchdogPeriod && (s.logger.warn("Trying to nudge playhead over buffer-hole"),
                this.stalled = null,
                this._tryNudgeBuffer())
              }
              ,
              e._reportStall = function(t) {
                var e = this.hls
                  , r = this.media;
                this.stallReported || (this.stallReported = !0,
                s.logger.warn("Playback stalling at @" + r.currentTime + " due to low buffer (buffer=" + t + ")"),
                e.trigger(a.Events.ERROR, {
                  type: n.ErrorTypes.MEDIA_ERROR,
                  details: n.ErrorDetails.BUFFER_STALLED_ERROR,
                  fatal: !1,
                  buffer: t
                }))
              }
              ,
              e._trySkipBufferHole = function(t) {
                for (var e, r = this.config, o = this.hls, l = this.media, c = l.currentTime, f = 0, h = i.BufferHelper.getBuffered(l), g = 0; g < h.length; g++) {
                  if (e = h.start(g),
                  c + r.maxBufferHole >= f && c < e) {
                    var v = Math.max(e + d, l.currentTime + u);
                    return s.logger.warn("skipping hole, adjusting currentTime from " + c + " to " + v),
                    this.moved = !0,
                    this.stalled = null,
                    l.currentTime = v,
                    t && o.trigger(a.Events.ERROR, {
                      type: n.ErrorTypes.MEDIA_ERROR,
                      details: n.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                      fatal: !1,
                      reason: "fragment loaded with buffer holes, seeking from " + c + " to " + v,
                      frag: t
                    }),
                    v
                  }
                  f = h.end(g)
                }
                return 0
              }
              ,
              e._tryNudgeBuffer = function() {
                var t = this.config
                  , e = this.hls
                  , r = this.media
                  , i = r.currentTime
                  , o = (this.nudgeRetry || 0) + 1;
                if (this.nudgeRetry = o,
                o < t.nudgeMaxRetry) {
                  var l = i + o * t.nudgeOffset;
                  s.logger.warn("Nudging 'currentTime' from " + i + " to " + l),
                  r.currentTime = l,
                  e.trigger(a.Events.ERROR, {
                    type: n.ErrorTypes.MEDIA_ERROR,
                    details: n.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                    fatal: !1
                  })
                } else
                  s.logger.error("Playhead still not moving while enough data buffered @" + i + " after " + t.nudgeMaxRetry + " nudges"),
                  e.trigger(a.Events.ERROR, {
                    type: n.ErrorTypes.MEDIA_ERROR,
                    details: n.ErrorDetails.BUFFER_STALLED_ERROR,
                    fatal: !0
                  })
              }
              ,
              t
            }()
          },
          "./src/controller/id3-track-controller.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = r("./src/events.ts")
              , n = r("./src/utils/texttrack-utils.ts")
              , a = r("./src/demux/id3.ts")
              , s = function() {
              function t(t) {
                this.hls = void 0,
                this.id3Track = null,
                this.media = null,
                this.hls = t,
                this._registerListeners()
              }
              var e = t.prototype;
              return e.destroy = function() {
                this._unregisterListeners()
              }
              ,
              e._registerListeners = function() {
                var t = this.hls;
                t.on(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this),
                t.on(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.on(i.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this),
                t.on(i.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
              }
              ,
              e._unregisterListeners = function() {
                var t = this.hls;
                t.off(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this),
                t.off(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.off(i.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this),
                t.off(i.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
              }
              ,
              e.onMediaAttached = function(t, e) {
                this.media = e.media
              }
              ,
              e.onMediaDetaching = function() {
                this.id3Track && (Object(n.clearCurrentCues)(this.id3Track),
                this.id3Track = null,
                this.media = null)
              }
              ,
              e.getID3Track = function(t) {
                if (this.media) {
                  for (var e, r = 0; r < t.length; r++)
                    if ("metadata" === (e = t[r]).kind && "id3" === e.label)
                      return Object(n.sendAddTrackEvent)(e, this.media),
                      e;
                  return this.media.addTextTrack("metadata", "id3")
                }
              }
              ,
              e.onFragParsingMetadata = function(t, e) {
                if (this.media) {
                  var r = e.frag
                    , i = e.samples;
                  this.id3Track || (this.id3Track = this.getID3Track(this.media.textTracks),
                  this.id3Track.mode = "hidden");
                  for (var n, s = self.WebKitDataCue || self.VTTCue || self.TextTrackCue, o = 0; o < i.length; o++)
                    if (n = a.getID3Frames(i[o].data)) {
                      var l = i[o].pts
                        , u = o < i.length - 1 ? i[o + 1].pts : r.end;
                      0 >= u - l && (u = l + .25);
                      for (var d, c = 0; c < n.length; c++)
                        if (d = n[c],
                        !a.isTimeStampFrame(d)) {
                          var f = new s(l,u,"");
                          f.value = d,
                          this.id3Track.addCue(f)
                        }
                    }
                }
              }
              ,
              e.onBufferFlushing = function(t, e) {
                var r = e.startOffset
                  , i = e.endOffset
                  , a = e.type;
                if (!a || "audio" === a) {
                  var s = this.id3Track;
                  s && Object(n.removeCuesInRange)(s, r, i)
                }
              }
              ,
              t
            }();
            e.default = s
          },
          "./src/controller/latency-controller.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            r.r(e),
            r.d(e, "default", (function() {
              return o
            }
            ));
            var n = r("./src/errors.ts")
              , a = r("./src/events.ts")
              , s = r("./src/utils/logger.ts")
              , o = function() {
              function t(t) {
                var e = this;
                this.hls = void 0,
                this.config = void 0,
                this.media = null,
                this.levelDetails = null,
                this.currentTime = 0,
                this.stallCount = 0,
                this._latency = null,
                this.timeupdateHandler = function() {
                  return e.timeupdate()
                }
                ,
                this.hls = t,
                this.config = t.config,
                this.registerListeners()
              }
              var e, r, o, l = t.prototype;
              return l.destroy = function() {
                this.unregisterListeners(),
                this.onMediaDetaching(),
                this.levelDetails = null,
                this.hls = this.timeupdateHandler = null
              }
              ,
              l.registerListeners = function() {
                this.hls.on(a.Events.MEDIA_ATTACHED, this.onMediaAttached, this),
                this.hls.on(a.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                this.hls.on(a.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                this.hls.on(a.Events.LEVEL_UPDATED, this.onLevelUpdated, this),
                this.hls.on(a.Events.ERROR, this.onError, this)
              }
              ,
              l.unregisterListeners = function() {
                this.hls.off(a.Events.MEDIA_ATTACHED, this.onMediaAttached),
                this.hls.off(a.Events.MEDIA_DETACHING, this.onMediaDetaching),
                this.hls.off(a.Events.MANIFEST_LOADING, this.onManifestLoading),
                this.hls.off(a.Events.LEVEL_UPDATED, this.onLevelUpdated),
                this.hls.off(a.Events.ERROR, this.onError)
              }
              ,
              l.onMediaAttached = function(t, e) {
                this.media = e.media,
                this.media.addEventListener("timeupdate", this.timeupdateHandler)
              }
              ,
              l.onMediaDetaching = function() {
                this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler),
                this.media = null)
              }
              ,
              l.onManifestLoading = function() {
                this.levelDetails = null,
                this._latency = null,
                this.stallCount = 0
              }
              ,
              l.onLevelUpdated = function(t, e) {
                var r = e.details;
                this.levelDetails = r,
                r.advanced && this.timeupdate(),
                !r.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler)
              }
              ,
              l.onError = function(t, e) {
                e.details !== n.ErrorDetails.BUFFER_STALLED_ERROR || (this.stallCount++,
                s.logger.warn("[playback-rate-controller]: Stall detected, adjusting target latency"))
              }
              ,
              l.timeupdate = function() {
                var t = this.media
                  , e = this.levelDetails;
                if (t && e) {
                  this.currentTime = t.currentTime;
                  var r = this.computeLatency();
                  if (null !== r) {
                    this._latency = r;
                    var i = this.config
                      , n = i.lowLatencyMode
                      , a = i.maxLiveSyncPlaybackRate;
                    if (n && 1 !== a) {
                      var s = this.targetLatency;
                      if (null !== s) {
                        var o = r - s
                          , l = o < Math.min(this.maxLatency, s + e.targetduration);
                        if (e.live && l && .05 < o && 1 < this.forwardBufferLength) {
                          var u = Math.min(2, Math.max(1, a))
                            , d = Math.round(2 / (1 + Math.exp(-.75 * o - this.edgeStalled)) * 20) / 20;
                          t.playbackRate = Math.min(u, Math.max(1, d))
                        } else
                          1 !== t.playbackRate && 0 !== t.playbackRate && (t.playbackRate = 1)
                      }
                    }
                  }
                }
              }
              ,
              l.estimateLiveEdge = function() {
                var t = this.levelDetails;
                return null === t ? null : t.edge + t.age
              }
              ,
              l.computeLatency = function() {
                var t = this.estimateLiveEdge();
                return null === t ? null : t - this.currentTime
              }
              ,
              e = t,
              (r = [{
                key: "latency",
                get: function() {
                  return this._latency || 0
                }
              }, {
                key: "maxLatency",
                get: function() {
                  var t = this.config
                    , e = this.levelDetails;
                  return void 0 === t.liveMaxLatencyDuration ? e ? t.liveMaxLatencyDurationCount * e.targetduration : 0 : t.liveMaxLatencyDuration
                }
              }, {
                key: "targetLatency",
                get: function() {
                  var t = this.levelDetails;
                  if (null === t)
                    return null;
                  var e = t.holdBack
                    , r = t.partHoldBack
                    , i = t.targetduration
                    , n = this.config
                    , a = n.liveSyncDuration
                    , s = n.liveSyncDurationCount
                    , o = n.lowLatencyMode
                    , l = this.hls.userConfig
                    , u = o && r || e;
                  (l.liveSyncDuration || l.liveSyncDurationCount || 0 === u) && (u = void 0 === a ? s * i : a);
                  var d = i;
                  return u + Math.min(1 * this.stallCount, d)
                }
              }, {
                key: "liveSyncPosition",
                get: function() {
                  var t = this.estimateLiveEdge()
                    , e = this.targetLatency
                    , r = this.levelDetails;
                  if (null === t || null === e || null === r)
                    return null;
                  var i = r.edge
                    , n = t - e - this.edgeStalled
                    , a = i - r.totalduration
                    , s = i - (this.config.lowLatencyMode && r.partTarget || r.targetduration);
                  return Math.min(Math.max(a, n), s)
                }
              }, {
                key: "drift",
                get: function() {
                  var t = this.levelDetails;
                  return null === t ? 1 : t.drift
                }
              }, {
                key: "edgeStalled",
                get: function() {
                  var t = this.levelDetails;
                  if (null === t)
                    return 0;
                  var e = 3 * (this.config.lowLatencyMode && t.partTarget || t.targetduration);
                  return Math.max(t.age - e, 0)
                }
              }, {
                key: "forwardBufferLength",
                get: function() {
                  var t = this.media
                    , e = this.levelDetails;
                  if (!t || !e)
                    return 0;
                  var r = t.buffered.length;
                  return r ? t.buffered.end(r - 1) : e.edge - this.currentTime
                }
              }]) && i(e.prototype, r),
              o && i(e, o),
              t
            }()
          },
          "./src/controller/level-controller.ts": function(t, e, r) {
            "use strict";
            function i() {
              return (i = Object.assign || function(t) {
                for (var e, r = 1; r < arguments.length; r++)
                  for (var i in e = arguments[r])
                    Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t
              }
              ).apply(this, arguments)
            }
            function n(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            function a(t, e) {
              return (a = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            r.r(e),
            r.d(e, "default", (function() {
              return g
            }
            ));
            var s = r("./src/types/level.ts")
              , o = r("./src/events.ts")
              , l = r("./src/errors.ts")
              , u = r("./src/utils/codecs.ts")
              , d = r("./src/controller/level-helper.ts")
              , c = r("./src/controller/base-playlist-controller.ts")
              , f = r("./src/types/loader.ts")
              , h = /chrome|firefox/.test(navigator.userAgent.toLowerCase())
              , g = function(t) {
              function e(e) {
                var r;
                return (r = t.call(this, e, "[level-controller]") || this)._levels = [],
                r._firstLevel = -1,
                r._startLevel = void 0,
                r.currentLevelIndex = -1,
                r.manualLevelIndex = -1,
                r.onParsedComplete = void 0,
                r._registerListeners(),
                r
              }
              var r, c;
              c = t,
              (r = e).prototype = Object.create(c.prototype),
              r.prototype.constructor = r,
              a(r, c);
              var g, v, m, p = e.prototype;
              return p._registerListeners = function() {
                var t = this.hls;
                t.on(o.Events.MANIFEST_LOADED, this.onManifestLoaded, this),
                t.on(o.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.on(o.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this),
                t.on(o.Events.FRAG_LOADED, this.onFragLoaded, this),
                t.on(o.Events.ERROR, this.onError, this)
              }
              ,
              p._unregisterListeners = function() {
                var t = this.hls;
                t.off(o.Events.MANIFEST_LOADED, this.onManifestLoaded, this),
                t.off(o.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.off(o.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this),
                t.off(o.Events.FRAG_LOADED, this.onFragLoaded, this),
                t.off(o.Events.ERROR, this.onError, this)
              }
              ,
              p.destroy = function() {
                this._unregisterListeners(),
                this.manualLevelIndex = -1,
                this._levels.length = 0,
                t.prototype.destroy.call(this)
              }
              ,
              p.startLoad = function() {
                this._levels.forEach((function(t) {
                  t.loadError = 0
                }
                )),
                t.prototype.startLoad.call(this)
              }
              ,
              p.onManifestLoaded = function(t, e) {
                var r, i, n = [], a = [], c = [], f = {}, g = !1, v = !1, m = !1;
                if (e.levels.forEach((function(t) {
                  var e = t.attrs;
                  g = g || !(!t.width || !t.height),
                  v = v || !!t.videoCodec,
                  m = m || !!t.audioCodec,
                  h && t.audioCodec && -1 !== t.audioCodec.indexOf("mp4a.40.34") && (t.audioCodec = void 0);
                  var r = t.bitrate + "-" + t.attrs.RESOLUTION + "-" + t.attrs.CODECS;
                  (i = f[r]) ? i.url.push(t.url) : (i = new s.Level(t),
                  f[r] = i,
                  n.push(i)),
                  e && (e.AUDIO && Object(d.addGroupId)(i, "audio", e.AUDIO),
                  e.SUBTITLES && Object(d.addGroupId)(i, "text", e.SUBTITLES))
                }
                )),
                (g || v) && m && (n = n.filter((function(t) {
                  var e = t.videoCodec
                    , r = t.width
                    , i = t.height;
                  return !!e || !(!r || !i)
                }
                ))),
                n = n.filter((function(t) {
                  var e = t.audioCodec
                    , r = t.videoCodec;
                  return (!e || Object(u.isCodecSupportedInMp4)(e, "audio")) && (!r || Object(u.isCodecSupportedInMp4)(r, "video"))
                }
                )),
                e.audioTracks && (a = e.audioTracks.filter((function(t) {
                  return !t.audioCodec || Object(u.isCodecSupportedInMp4)(t.audioCodec, "audio")
                }
                )),
                Object(d.assignTrackIdsByGroup)(a)),
                e.subtitles && (c = e.subtitles,
                Object(d.assignTrackIdsByGroup)(c)),
                0 < n.length) {
                  r = n[0].bitrate,
                  n.sort((function(t, e) {
                    return t.bitrate - e.bitrate
                  }
                  )),
                  this._levels = n;
                  for (var p = 0; p < n.length; p++)
                    if (n[p].bitrate === r) {
                      this._firstLevel = p,
                      this.log("manifest loaded, " + n.length + " level(s) found, first bitrate: " + r);
                      break
                    }
                  var y = m && !v
                    , E = {
                    levels: n,
                    audioTracks: a,
                    subtitleTracks: c,
                    firstLevel: this._firstLevel,
                    stats: e.stats,
                    audio: m,
                    video: v,
                    altAudio: !y && a.some((function(t) {
                      return !!t.url
                    }
                    ))
                  };
                  this.hls.trigger(o.Events.MANIFEST_PARSED, E),
                  (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition)
                } else
                  this.hls.trigger(o.Events.ERROR, {
                    type: l.ErrorTypes.MEDIA_ERROR,
                    details: l.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                    fatal: !0,
                    url: e.url,
                    reason: "no level with compatible codecs found in manifest"
                  })
              }
              ,
              p.onError = function(e, r) {
                if (t.prototype.onError.call(this, e, r),
                !r.fatal) {
                  var i = r.context
                    , n = this._levels[this.currentLevelIndex];
                  if (i && (i.type === f.PlaylistContextType.AUDIO_TRACK && n.audioGroupIds && i.groupId === n.audioGroupIds[n.urlId] || i.type === f.PlaylistContextType.SUBTITLE_TRACK && n.textGroupIds && i.groupId === n.textGroupIds[n.urlId]))
                    return void this.redundantFailover(this.currentLevelIndex);
                  var a, s = !1, o = !0;
                  switch (r.details) {
                  case l.ErrorDetails.FRAG_LOAD_ERROR:
                  case l.ErrorDetails.FRAG_LOAD_TIMEOUT:
                  case l.ErrorDetails.KEY_LOAD_ERROR:
                  case l.ErrorDetails.KEY_LOAD_TIMEOUT:
                    if (r.frag) {
                      var u = this._levels[r.frag.level];
                      u ? (u.fragmentError++,
                      u.fragmentError > this.hls.config.fragLoadingMaxRetry && (a = r.frag.level)) : a = r.frag.level
                    }
                    break;
                  case l.ErrorDetails.LEVEL_LOAD_ERROR:
                  case l.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                    i && (i.deliveryDirectives && (o = !1),
                    a = i.level),
                    s = !0;
                    break;
                  case l.ErrorDetails.REMUX_ALLOC_ERROR:
                    a = r.level,
                    s = !0
                  }
                  void 0 !== a && this.recoverLevel(r, a, s, o)
                }
              }
              ,
              p.recoverLevel = function(t, e, r, i) {
                var n = t.details
                  , a = this._levels[e];
                if (a.loadError++,
                r) {
                  if (!this.retryLoadingOrFail(t))
                    return void (this.currentLevelIndex = -1);
                  t.levelRetry = !0
                }
                if (i) {
                  var s = a.url.length;
                  if (1 < s && a.loadError < s)
                    t.levelRetry = !0,
                    this.redundantFailover(e);
                  else if (-1 === this.manualLevelIndex) {
                    var o = 0 === e ? this._levels.length - 1 : e - 1;
                    this.currentLevelIndex !== o && 0 === this._levels[o].loadError && (this.warn(n + ": switch to " + o),
                    t.levelRetry = !0,
                    this.hls.nextAutoLevel = o)
                  }
                }
              }
              ,
              p.redundantFailover = function(t) {
                var e = this._levels[t]
                  , r = e.url.length;
                if (1 < r) {
                  var i = (e.urlId + 1) % r;
                  this.warn("Switching to redundant URL-id " + i),
                  this._levels.forEach((function(t) {
                    t.urlId = i
                  }
                  )),
                  this.level = t
                }
              }
              ,
              p.onFragLoaded = function(t, e) {
                var r = e.frag;
                if (void 0 !== r && r.type === f.PlaylistLevelType.MAIN) {
                  var i = this._levels[r.level];
                  void 0 !== i && (i.fragmentError = 0,
                  i.loadError = 0)
                }
              }
              ,
              p.onLevelLoaded = function(t, e) {
                var r, i, n = e.level, a = e.details, s = this._levels[n];
                if (!s)
                  return this.warn("Invalid level index " + n),
                  void (null !== (i = e.deliveryDirectives) && void 0 !== i && i.skip && (a.deltaUpdateFailed = !0));
                n === this.currentLevelIndex ? (0 === s.fragmentError && (s.loadError = 0,
                this.retryCount = 0),
                this.playlistLoaded(n, e, s.details)) : null !== (r = e.deliveryDirectives) && void 0 !== r && r.skip && (a.deltaUpdateFailed = !0)
              }
              ,
              p.onAudioTrackSwitched = function(t, e) {
                var r = this.hls.levels[this.currentLevelIndex];
                if (r && r.audioGroupIds) {
                  for (var i = -1, n = this.hls.audioTracks[e.id].groupId, a = 0; a < r.audioGroupIds.length; a++)
                    if (r.audioGroupIds[a] === n) {
                      i = a;
                      break
                    }
                  i !== r.urlId && (r.urlId = i,
                  this.startLoad())
                }
              }
              ,
              p.loadPlaylist = function(t) {
                var e = this.currentLevelIndex
                  , r = this._levels[e];
                if (this.canLoad && r && 0 < r.url.length) {
                  var i = r.urlId
                    , n = r.url[i];
                  if (t)
                    try {
                      n = t.addDirectives(n)
                    } catch (t) {
                      this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                    }
                  this.log("Attempt loading level index " + e + (t ? " at sn " + t.msn + " part " + t.part : "") + " with URL-id " + i + " " + n),
                  this.clearTimer(),
                  this.hls.trigger(o.Events.LEVEL_LOADING, {
                    url: n,
                    level: e,
                    id: i,
                    deliveryDirectives: t || null
                  })
                }
              }
              ,
              p.removeLevel = function(t, e) {
                var r = function(t, r) {
                  return r !== e
                }
                  , i = this._levels.filter((function(i, n) {
                  return n !== t || !!(1 < i.url.length && void 0 !== e) && (i.url = i.url.filter(r),
                  i.audioGroupIds && (i.audioGroupIds = i.audioGroupIds.filter(r)),
                  i.textGroupIds && (i.textGroupIds = i.textGroupIds.filter(r)),
                  i.urlId = 0,
                  !0)
                }
                )).map((function(t, e) {
                  var r = t.details;
                  return null != r && r.fragments && r.fragments.forEach((function(t) {
                    t.level = e
                  }
                  )),
                  t
                }
                ));
                this._levels = i,
                this.hls.trigger(o.Events.LEVELS_UPDATED, {
                  levels: i
                })
              }
              ,
              g = e,
              (v = [{
                key: "levels",
                get: function() {
                  return 0 === this._levels.length ? null : this._levels
                }
              }, {
                key: "level",
                get: function() {
                  return this.currentLevelIndex
                },
                set: function(t) {
                  var e, r = this._levels;
                  if (0 !== r.length && (this.currentLevelIndex !== t || null === (e = r[t]) || void 0 === e || !e.details)) {
                    if (0 > t || t >= r.length) {
                      var n = 0 > t;
                      if (this.hls.trigger(o.Events.ERROR, {
                        type: l.ErrorTypes.OTHER_ERROR,
                        details: l.ErrorDetails.LEVEL_SWITCH_ERROR,
                        level: t,
                        fatal: n,
                        reason: "invalid level idx"
                      }),
                      n)
                        return;
                      t = Math.min(t, r.length - 1)
                    }
                    this.clearTimer();
                    var a = this.currentLevelIndex
                      , s = r[a]
                      , u = r[t];
                    this.log("switching to level " + t + " from " + a),
                    this.currentLevelIndex = t;
                    var d = i({}, u, {
                      level: t,
                      maxBitrate: u.maxBitrate,
                      uri: u.uri,
                      urlId: u.urlId
                    });
                    delete d._urlId,
                    this.hls.trigger(o.Events.LEVEL_SWITCHING, d);
                    var c = u.details;
                    if (!c || c.live) {
                      var f = this.switchParams(u.uri, null == s ? void 0 : s.details);
                      this.loadPlaylist(f)
                    }
                  }
                }
              }, {
                key: "manualLevel",
                get: function() {
                  return this.manualLevelIndex
                },
                set: function(t) {
                  this.manualLevelIndex = t,
                  void 0 === this._startLevel && (this._startLevel = t),
                  -1 !== t && (this.level = t)
                }
              }, {
                key: "firstLevel",
                get: function() {
                  return this._firstLevel
                },
                set: function(t) {
                  this._firstLevel = t
                }
              }, {
                key: "startLevel",
                get: function() {
                  if (void 0 === this._startLevel) {
                    var t = this.hls.config.startLevel;
                    return void 0 === t ? this._firstLevel : t
                  }
                  return this._startLevel
                },
                set: function(t) {
                  this._startLevel = t
                }
              }, {
                key: "nextLoadLevel",
                get: function() {
                  return -1 === this.manualLevelIndex ? this.hls.nextAutoLevel : this.manualLevelIndex
                },
                set: function(t) {
                  this.level = t,
                  -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = t)
                }
              }]) && n(g.prototype, v),
              m && n(g, m),
              e
            }(c.default)
          },
          "./src/controller/level-helper.ts": function(t, e, r) {
            "use strict";
            function i(t, e, r) {
              "audio" === e ? (t.audioGroupIds || (t.audioGroupIds = []),
              t.audioGroupIds.push(r)) : "text" === e && (t.textGroupIds || (t.textGroupIds = []),
              t.textGroupIds.push(r))
            }
            function n(t) {
              var e = {};
              t.forEach((function(t) {
                var r = t.groupId || "";
                t.id = e[r] = e[r] || 0,
                e[r]++
              }
              ))
            }
            function a(t, e, r) {
              s(t[e], t[r])
            }
            function s(t, e) {
              var r = e.startPTS;
              if (Object(m.isFiniteNumber)(r)) {
                var i, n = 0;
                e.sn > t.sn ? (n = r - t.start,
                i = t) : (n = t.start - r,
                i = e),
                i.duration !== n && (i.duration = n)
              } else if (e.sn > t.sn) {
                var a = t.cc === e.cc;
                e.start = a && t.minEndPTS ? t.start + (t.minEndPTS - t.start) : t.start + t.duration
              } else
                e.start = Math.max(t.start - e.duration, 0)
            }
            function o(t, e, r, i, n, a) {
              0 >= i - r && (p.logger.warn("Fragment should have a positive duration", e),
              i = r + e.duration,
              a = n + e.duration);
              var o = r
                , l = i
                , u = e.startPTS
                , d = e.endPTS;
              if (Object(m.isFiniteNumber)(u)) {
                var c = Math.abs(u - r);
                e.deltaPTS = Object(m.isFiniteNumber)(e.deltaPTS) ? Math.max(c, e.deltaPTS) : c,
                o = Math.max(r, u),
                r = Math.min(r, u),
                n = Math.min(n, e.startDTS),
                l = Math.min(i, d),
                i = Math.max(i, d),
                a = Math.max(a, e.endDTS)
              }
              e.duration = i - r;
              var f = r - e.start;
              e.appendedPTS = i,
              e.start = e.startPTS = r,
              e.maxStartPTS = o,
              e.startDTS = n,
              e.endPTS = i,
              e.minEndPTS = l,
              e.endDTS = a;
              var h = e.sn;
              if (!t || h < t.startSN || h > t.endSN)
                return 0;
              var g, v = h - t.startSN, y = t.fragments;
              for (y[v] = e,
              g = v; 0 < g; g--)
                s(y[g], y[g - 1]);
              for (g = v; g < y.length - 1; g++)
                s(y[g], y[g + 1]);
              return t.fragmentHint && s(y[y.length - 1], t.fragmentHint),
              t.PTSKnown = t.alignedSliding = !0,
              f
            }
            function l(t, e) {
              for (var r, i = null, n = t.fragments, a = n.length - 1; 0 <= a; a--)
                if (r = n[a].initSegment) {
                  i = r;
                  break
                }
              t.fragmentHint && delete t.fragmentHint.endPTS;
              var s, l = 0;
              if (d(t, e, (function(t, r) {
                var n;
                t.relurl && (l = t.cc - r.cc),
                Object(m.isFiniteNumber)(t.startPTS) && Object(m.isFiniteNumber)(t.endPTS) && (r.start = r.startPTS = t.startPTS,
                r.startDTS = t.startDTS,
                r.appendedPTS = t.appendedPTS,
                r.maxStartPTS = t.maxStartPTS,
                r.endPTS = t.endPTS,
                r.endDTS = t.endDTS,
                r.minEndPTS = t.minEndPTS,
                r.duration = t.endPTS - t.startPTS,
                r.duration && (s = r),
                e.PTSKnown = e.alignedSliding = !0),
                r.elementaryStreams = t.elementaryStreams,
                r.loader = t.loader,
                r.stats = t.stats,
                r.urlId = t.urlId,
                t.initSegment ? (r.initSegment = t.initSegment,
                i = t.initSegment) : (!r.initSegment || r.initSegment.relurl == (null === (n = i) || void 0 === n ? void 0 : n.relurl)) && (r.initSegment = i)
              }
              )),
              e.skippedSegments && (e.deltaUpdateFailed = e.fragments.some((function(t) {
                return !t
              }
              )),
              e.deltaUpdateFailed)) {
                p.logger.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
                for (var f = e.skippedSegments; f--; )
                  e.fragments.shift();
                e.startSN = e.fragments[0].sn,
                e.startCC = e.fragments[0].cc
              }
              var h = e.fragments;
              if (l) {
                p.logger.warn("discontinuity sliding from playlist, take drift into account");
                for (var g = 0; g < h.length; g++)
                  h[g].cc += l
              }
              e.skippedSegments && (e.startCC = e.fragments[0].cc),
              u(t.partList, e.partList, (function(t, e) {
                e.elementaryStreams = t.elementaryStreams,
                e.stats = t.stats
              }
              )),
              s ? o(e, s, s.startPTS, s.endPTS, s.startDTS, s.endDTS) : c(t, e),
              h.length && (e.totalduration = e.edge - h[0].start),
              e.driftStartTime = t.driftStartTime,
              e.driftStart = t.driftStart;
              var v = e.advancedDateTime;
              if (e.advanced && v) {
                var y = e.edge;
                e.driftStart || (e.driftStartTime = v,
                e.driftStart = y),
                e.driftEndTime = v,
                e.driftEnd = y
              } else
                e.driftEndTime = t.driftEndTime,
                e.driftEnd = t.driftEnd,
                e.advancedDateTime = t.advancedDateTime
            }
            function u(t, e, r) {
              if (t && e)
                for (var i = 0, n = 0, a = t.length; n <= a; n++) {
                  var s = t[n]
                    , o = e[n + i];
                  s && o && s.index === o.index && s.fragment.sn === o.fragment.sn ? r(s, o) : i--
                }
            }
            function d(t, e, r) {
              for (var i = e.skippedSegments, n = Math.max(t.startSN, e.startSN) - e.startSN, a = (t.fragmentHint ? 1 : 0) + (i ? e.endSN : Math.min(t.endSN, e.endSN)) - e.startSN, s = e.startSN - t.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, l = t.fragmentHint ? t.fragments.concat(t.fragmentHint) : t.fragments, u = n; u <= a; u++) {
                var d = l[s + u]
                  , c = o[u];
                i && !c && u < i && (c = e.fragments[u] = d),
                d && c && r(d, c)
              }
            }
            function c(t, e) {
              var r = e.startSN + e.skippedSegments - t.startSN
                , i = t.fragments;
              0 > r || r >= i.length || f(e, i[r].start)
            }
            function f(t, e) {
              if (e) {
                for (var r = t.fragments, i = t.skippedSegments; i < r.length; i++)
                  r[i].start += e;
                t.fragmentHint && (t.fragmentHint.start += e)
              }
            }
            function h(t, e) {
              var r, i = 1e3 * t.levelTargetDuration, n = i / 2, a = t.age, s = 0 < a && a < 3 * i, o = e.loading.end - e.loading.start, l = t.availabilityDelay;
              if (!1 !== t.updated)
                s ? (l = Math.min(l || i / 2, a),
                t.availabilityDelay = l,
                r = l + i - a) : r = i - o;
              else if (s) {
                var u = 333 * t.misses;
                r = Math.max(Math.min(n, 2 * o), u),
                t.availabilityDelay = (t.availabilityDelay || 0) + r
              } else
                r = n;
              return Math.round(r)
            }
            function g(t, e, r) {
              if (!t || !t.details)
                return null;
              var i = t.details
                , n = i.fragments[e - i.startSN];
              return n || ((n = i.fragmentHint) && n.sn === e ? n : e < i.startSN && r && r.sn === e ? r : null)
            }
            function v(t, e, r) {
              if (!t || !t.details)
                return null;
              var i = t.details.partList;
              if (i)
                for (var n, a = i.length; a--; )
                  if ((n = i[a]).index === r && n.fragment.sn === e)
                    return n;
              return null
            }
            r.r(e),
            r.d(e, "addGroupId", (function() {
              return i
            }
            )),
            r.d(e, "assignTrackIdsByGroup", (function() {
              return n
            }
            )),
            r.d(e, "updatePTS", (function() {
              return a
            }
            )),
            r.d(e, "updateFragPTSDTS", (function() {
              return o
            }
            )),
            r.d(e, "mergeDetails", (function() {
              return l
            }
            )),
            r.d(e, "mapPartIntersection", (function() {
              return u
            }
            )),
            r.d(e, "mapFragmentIntersection", (function() {
              return d
            }
            )),
            r.d(e, "adjustSliding", (function() {
              return c
            }
            )),
            r.d(e, "addSliding", (function() {
              return f
            }
            )),
            r.d(e, "computeReloadInterval", (function() {
              return h
            }
            )),
            r.d(e, "getFragmentWithSN", (function() {
              return g
            }
            )),
            r.d(e, "getPartWith", (function() {
              return v
            }
            ));
            var m = r("./src/polyfills/number.ts")
              , p = r("./src/utils/logger.ts")
          },
          "./src/controller/stream-controller.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            function n(t, e) {
              return (n = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            r.r(e),
            r.d(e, "default", (function() {
              return y
            }
            ));
            var a = r("./src/polyfills/number.ts")
              , s = r("./src/controller/base-stream-controller.ts")
              , o = r("./src/is-supported.ts")
              , l = r("./src/events.ts")
              , u = r("./src/utils/buffer-helper.ts")
              , d = r("./src/controller/fragment-tracker.ts")
              , c = r("./src/types/loader.ts")
              , f = r("./src/loader/fragment.ts")
              , h = r("./src/demux/transmuxer-interface.ts")
              , g = r("./src/types/transmuxer.ts")
              , v = r("./src/controller/gap-controller.ts")
              , m = r("./src/errors.ts")
              , p = r("./src/utils/logger.ts")
              , y = function(t) {
              function e(e, r) {
                var i;
                return (i = t.call(this, e, r, "[stream-controller]") || this).audioCodecSwap = !1,
                i.gapController = null,
                i.level = -1,
                i._forceStartLoad = !1,
                i.altAudio = !1,
                i.audioOnly = !1,
                i.fragPlaying = null,
                i.onvplaying = null,
                i.onvseeked = null,
                i.fragLastKbps = 0,
                i.stalled = !1,
                i.couldBacktrack = !1,
                i.audioCodecSwitch = !1,
                i.videoBuffer = null,
                i._registerListeners(),
                i
              }
              var r, y;
              y = t,
              (r = e).prototype = Object.create(y.prototype),
              r.prototype.constructor = r,
              n(r, y);
              var E, b, T, A = e.prototype;
              return A._registerListeners = function() {
                var t = this.hls;
                t.on(l.Events.MEDIA_ATTACHED, this.onMediaAttached, this),
                t.on(l.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.on(l.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.on(l.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.on(l.Events.LEVEL_LOADING, this.onLevelLoading, this),
                t.on(l.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.on(l.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this),
                t.on(l.Events.ERROR, this.onError, this),
                t.on(l.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this),
                t.on(l.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this),
                t.on(l.Events.BUFFER_CREATED, this.onBufferCreated, this),
                t.on(l.Events.BUFFER_FLUSHED, this.onBufferFlushed, this),
                t.on(l.Events.LEVELS_UPDATED, this.onLevelsUpdated, this),
                t.on(l.Events.FRAG_BUFFERED, this.onFragBuffered, this)
              }
              ,
              A._unregisterListeners = function() {
                var t = this.hls;
                t.off(l.Events.MEDIA_ATTACHED, this.onMediaAttached, this),
                t.off(l.Events.MEDIA_DETACHING, this.onMediaDetaching, this),
                t.off(l.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.off(l.Events.MANIFEST_PARSED, this.onManifestParsed, this),
                t.off(l.Events.LEVEL_LOADED, this.onLevelLoaded, this),
                t.off(l.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this),
                t.off(l.Events.ERROR, this.onError, this),
                t.off(l.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this),
                t.off(l.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this),
                t.off(l.Events.BUFFER_CREATED, this.onBufferCreated, this),
                t.off(l.Events.BUFFER_FLUSHED, this.onBufferFlushed, this),
                t.off(l.Events.LEVELS_UPDATED, this.onLevelsUpdated, this),
                t.off(l.Events.FRAG_BUFFERED, this.onFragBuffered, this)
              }
              ,
              A.onHandlerDestroying = function() {
                this._unregisterListeners(),
                this.onMediaDetaching()
              }
              ,
              A.startLoad = function(t) {
                if (this.levels) {
                  var e = this.lastCurrentTime
                    , r = this.hls;
                  if (this.stopLoad(),
                  this.setInterval(100),
                  this.level = -1,
                  this.fragLoadError = 0,
                  !this.startFragRequested) {
                    var i = r.startLevel;
                    -1 === i && (r.config.testBandwidth ? (i = 0,
                    this.bitrateTest = !0) : i = r.nextAutoLevel),
                    this.level = r.nextLoadLevel = i,
                    this.loadedmetadata = !1
                  }
                  0 < e && -1 === t && (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)),
                  t = e),
                  this.state = s.State.IDLE,
                  this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t,
                  this.tick()
                } else
                  this._forceStartLoad = !0,
                  this.state = s.State.STOPPED
              }
              ,
              A.stopLoad = function() {
                this._forceStartLoad = !1,
                t.prototype.stopLoad.call(this)
              }
              ,
              A.doTick = function() {
                switch (this.state) {
                case s.State.IDLE:
                  this.doTickIdle();
                  break;
                case s.State.WAITING_LEVEL:
                  var t, e = this.levels, r = this.level, i = null == e || null === (t = e[r]) || void 0 === t ? void 0 : t.details;
                  if (i && (!i.live || this.levelLastLoaded === this.level)) {
                    if (this.waitForCdnTuneIn(i))
                      break;
                    this.state = s.State.IDLE;
                    break
                  }
                  break;
                case s.State.FRAG_LOADING_WAITING_RETRY:
                  var n, a = self.performance.now(), o = this.retryDate;
                  (!o || a >= o || null !== (n = this.media) && void 0 !== n && n.seeking) && (this.log("retryDate reached, switch back to IDLE state"),
                  this.state = s.State.IDLE)
                }
                this.onTickEnd()
              }
              ,
              A.onTickEnd = function() {
                t.prototype.onTickEnd.call(this),
                this.checkBuffer(),
                this.checkFragmentChanged()
              }
              ,
              A.doTickIdle = function() {
                var t, e, r = this.hls, i = this.levelLastLoaded, n = this.levels, a = this.media, o = r.config, u = r.nextLoadLevel;
                if (null !== i && (a || !this.startFragRequested && o.startFragPrefetch) && (!this.altAudio || !this.audioOnly) && n && n[u]) {
                  var h = n[u];
                  this.level = r.nextLoadLevel = u;
                  var g = h.details;
                  if (!g || this.state === s.State.WAITING_LEVEL || g.live && this.levelLastLoaded !== u)
                    return void (this.state = s.State.WAITING_LEVEL);
                  var v = this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : a, c.PlaylistLevelType.MAIN);
                  if (null !== v && !(v.len >= this.getMaxBufferLength(h.maxBitrate))) {
                    if (this._streamEnded(v, g)) {
                      var m = {};
                      return this.altAudio && (m.type = "video"),
                      this.hls.trigger(l.Events.BUFFER_EOS, m),
                      void (this.state = s.State.ENDED)
                    }
                    var p = v.end
                      , y = this.getNextFragment(p, g);
                    if (this.couldBacktrack && !this.fragPrevious && y && "initSegment" !== y.sn) {
                      var E = y.sn - g.startSN;
                      1 < E && (y = g.fragments[E - 1],
                      this.fragmentTracker.removeFragment(y))
                    }
                    if (y && this.fragmentTracker.getState(y) === d.FragmentState.OK && this.nextLoadPosition > p) {
                      var b = this.audioOnly && !this.altAudio ? f.ElementaryStreamTypes.AUDIO : f.ElementaryStreamTypes.VIDEO;
                      this.afterBufferFlushed(a, b, c.PlaylistLevelType.MAIN),
                      y = this.getNextFragment(this.nextLoadPosition, g)
                    }
                    y && (y.initSegment && !y.initSegment.data && !this.bitrateTest && (y = y.initSegment),
                    "identity" !== (null === (t = y.decryptdata) || void 0 === t ? void 0 : t.keyFormat) || null !== (e = y.decryptdata) && void 0 !== e && e.key ? this.loadFragment(y, g, p) : this.loadKey(y, g))
                  }
                }
              }
              ,
              A.loadFragment = function(e, r, i) {
                var n, a = this.fragmentTracker.getState(e);
                if (this.fragCurrent = e,
                a === d.FragmentState.BACKTRACKED) {
                  var s = this.fragmentTracker.getBacktrackData(e);
                  if (s)
                    return this._handleFragmentLoadProgress(s),
                    void this._handleFragmentLoadComplete(s);
                  a = d.FragmentState.NOT_LOADED
                }
                a === d.FragmentState.NOT_LOADED || a === d.FragmentState.PARTIAL ? "initSegment" === e.sn ? this._loadInitSegment(e) : this.bitrateTest ? (e.bitrateTest = !0,
                this.log("Fragment " + e.sn + " of level " + e.level + " is being downloaded to test bitrate and will not be buffered"),
                this._loadBitrateTestFrag(e)) : (this.startFragRequested = !0,
                t.prototype.loadFragment.call(this, e, r, i)) : a === d.FragmentState.APPENDING ? this.reduceMaxBufferLength(e.duration) && this.fragmentTracker.removeFragment(e) : 0 === (null === (n = this.media) || void 0 === n ? void 0 : n.buffered.length) && this.fragmentTracker.removeAllFragments()
              }
              ,
              A.getAppendedFrag = function(t) {
                var e = this.fragmentTracker.getAppendedFrag(t, c.PlaylistLevelType.MAIN);
                return e && "fragment"in e ? e.fragment : e
              }
              ,
              A.getBufferedFrag = function(t) {
                return this.fragmentTracker.getBufferedFrag(t, c.PlaylistLevelType.MAIN)
              }
              ,
              A.followingBufferedFrag = function(t) {
                return t ? this.getBufferedFrag(t.end + .5) : null
              }
              ,
              A.immediateLevelSwitch = function() {
                this.abortCurrentFrag(),
                this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
              }
              ,
              A.nextLevelSwitch = function() {
                var t = this.levels
                  , e = this.media;
                if (null != e && e.readyState) {
                  var r, i = this.getAppendedFrag(e.currentTime);
                  if (i && 1 < i.start && this.flushMainBuffer(0, i.start - 1),
                  !e.paused && t) {
                    var n = t[this.hls.nextLoadLevel]
                      , a = this.fragLastKbps;
                    r = a && this.fragCurrent ? this.fragCurrent.duration * n.maxBitrate / (1e3 * a) + 1 : 0
                  } else
                    r = 0;
                  var s = this.getBufferedFrag(e.currentTime + r);
                  if (s) {
                    var o = this.followingBufferedFrag(s);
                    if (o) {
                      this.abortCurrentFrag();
                      var l = o.maxStartPTS ? o.maxStartPTS : o.start
                        , u = o.duration
                        , d = Math.max(s.end, l + Math.min(Math.max(u - this.config.maxFragLookUpTolerance, .5 * u), .75 * u));
                      this.flushMainBuffer(d, Number.POSITIVE_INFINITY)
                    }
                  }
                }
              }
              ,
              A.abortCurrentFrag = function() {
                var t = this.fragCurrent;
                this.fragCurrent = null,
                null != t && t.loader && t.loader.abort(),
                this.state === s.State.KEY_LOADING && (this.state = s.State.IDLE),
                this.nextLoadPosition = this.getLoadPosition()
              }
              ,
              A.flushMainBuffer = function(e, r) {
                t.prototype.flushMainBuffer.call(this, e, r, this.altAudio ? "video" : null)
              }
              ,
              A.onMediaAttached = function(e, r) {
                t.prototype.onMediaAttached.call(this, e, r);
                var i = r.media;
                this.onvplaying = this.onMediaPlaying.bind(this),
                this.onvseeked = this.onMediaSeeked.bind(this),
                i.addEventListener("playing", this.onvplaying),
                i.addEventListener("seeked", this.onvseeked),
                this.gapController = new v.default(this.config,i,this.fragmentTracker,this.hls)
              }
              ,
              A.onMediaDetaching = function() {
                var e = this.media;
                e && (e.removeEventListener("playing", this.onvplaying),
                e.removeEventListener("seeked", this.onvseeked),
                this.onvplaying = this.onvseeked = null,
                this.videoBuffer = null),
                this.fragPlaying = null,
                this.gapController && (this.gapController.destroy(),
                this.gapController = null),
                t.prototype.onMediaDetaching.call(this)
              }
              ,
              A.onMediaPlaying = function() {
                this.tick()
              }
              ,
              A.onMediaSeeked = function() {
                var t = this.media
                  , e = t ? t.currentTime : null;
                Object(a.isFiniteNumber)(e) && this.log("Media seeked to " + e.toFixed(3)),
                this.tick()
              }
              ,
              A.onManifestLoading = function() {
                this.log("Trigger BUFFER_RESET"),
                this.hls.trigger(l.Events.BUFFER_RESET, void 0),
                this.fragmentTracker.removeAllFragments(),
                this.couldBacktrack = this.stalled = !1,
                this.startPosition = this.lastCurrentTime = 0,
                this.fragPlaying = null
              }
              ,
              A.onManifestParsed = function(t, e) {
                var r, i = !1, n = !1;
                e.levels.forEach((function(t) {
                  (r = t.audioCodec) && (-1 !== r.indexOf("mp4a.40.2") && (i = !0),
                  -1 !== r.indexOf("mp4a.40.5") && (n = !0))
                }
                )),
                this.audioCodecSwitch = i && n && !Object(o.changeTypeSupported)(),
                this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),
                this.levels = e.levels,
                this.startFragRequested = !1
              }
              ,
              A.onLevelLoading = function(t, e) {
                var r = this.levels;
                if (r && this.state === s.State.IDLE) {
                  var i = r[e.level];
                  (!i.details || i.details.live && this.levelLastLoaded !== e.level || this.waitForCdnTuneIn(i.details)) && (this.state = s.State.WAITING_LEVEL)
                }
              }
              ,
              A.onLevelLoaded = function(t, e) {
                var r, i = this.levels, n = e.level, a = e.details, o = a.totalduration;
                if (i) {
                  this.log("Level " + n + " loaded [" + a.startSN + "," + a.endSN + "], cc [" + a.startCC + ", " + a.endCC + "] duration:" + o);
                  var u = this.fragCurrent;
                  u && (this.state === s.State.FRAG_LOADING || this.state === s.State.FRAG_LOADING_WAITING_RETRY) && u.level !== e.level && u.loader && (this.state = s.State.IDLE,
                  u.loader.abort());
                  var d = i[n]
                    , c = 0;
                  if (a.live || null !== (r = d.details) && void 0 !== r && r.live) {
                    if (a.fragments[0] || (a.deltaUpdateFailed = !0),
                    a.deltaUpdateFailed)
                      return;
                    c = this.alignPlaylists(a, d.details)
                  }
                  if (d.details = a,
                  this.levelLastLoaded = n,
                  this.hls.trigger(l.Events.LEVEL_UPDATED, {
                    details: a,
                    level: n
                  }),
                  this.state === s.State.WAITING_LEVEL) {
                    if (this.waitForCdnTuneIn(a))
                      return;
                    this.state = s.State.IDLE
                  }
                  this.startFragRequested ? a.live && this.synchronizeToLiveEdge(a) : this.setStartPosition(a, c),
                  this.tick()
                } else
                  this.warn("Levels were reset while loading level " + n)
              }
              ,
              A._handleFragmentLoadProgress = function(t) {
                var e, r = t.frag, i = t.part, n = t.payload, a = this.levels;
                if (a) {
                  var s = a[r.level]
                    , o = s.details;
                  if (o) {
                    var l = s.videoCodec
                      , u = o.PTSKnown || !o.live
                      , d = null === (e = r.initSegment) || void 0 === e ? void 0 : e.data
                      , f = this._getAudioCodec(s)
                      , v = this.transmuxer = this.transmuxer || new h.default(this.hls,c.PlaylistLevelType.MAIN,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this))
                      , m = i ? i.index : -1
                      , p = -1 !== m
                      , y = new g.ChunkMetadata(r.level,r.sn,r.stats.chunkCount,n.byteLength,m,p)
                      , E = this.initPTS[r.cc];
                    v.push(n, d, f, l, r, i, o.totalduration, u, y, E)
                  } else
                    this.warn("Dropping fragment " + r.sn + " of level " + r.level + " after level details were reset")
                } else
                  this.warn("Levels were reset while fragment load was in progress. Fragment " + r.sn + " of level " + r.level + " will not be buffered")
              }
              ,
              A.onAudioTrackSwitching = function(t, e) {
                var r = this.altAudio
                  , i = !!e.url
                  , n = e.id;
                if (!i) {
                  if (this.mediaBuffer !== this.media) {
                    this.log("Switching on main audio, use media.buffered to schedule main fragment loading"),
                    this.mediaBuffer = this.media;
                    var a = this.fragCurrent;
                    null != a && a.loader && (this.log("Switching to main audio track, cancel main fragment load"),
                    a.loader.abort()),
                    this.resetTransmuxer(),
                    this.resetLoadingState()
                  } else
                    this.audioOnly && this.resetTransmuxer();
                  var s = this.hls;
                  r && s.trigger(l.Events.BUFFER_FLUSHING, {
                    startOffset: 0,
                    endOffset: Number.POSITIVE_INFINITY,
                    type: "audio"
                  }),
                  s.trigger(l.Events.AUDIO_TRACK_SWITCHED, {
                    id: n
                  })
                }
              }
              ,
              A.onAudioTrackSwitched = function(t, e) {
                var r = e.id
                  , i = !!this.hls.audioTracks[r].url;
                if (i) {
                  var n = this.videoBuffer;
                  n && this.mediaBuffer !== n && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"),
                  this.mediaBuffer = n)
                }
                this.altAudio = i,
                this.tick()
              }
              ,
              A.onBufferCreated = function(t, e) {
                var r, i, n = e.tracks, a = !1;
                for (var s in n) {
                  var o = n[s];
                  if ("main" !== o.id)
                    a = !0;
                  else if (i = s,
                  r = o,
                  "video" === s) {
                    var l = n[s];
                    l && (this.videoBuffer = l.buffer)
                  }
                }
                a && r ? (this.log("Alternate track found, use " + i + ".buffered to schedule main fragment loading"),
                this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
              }
              ,
              A.onFragBuffered = function(t, e) {
                var r = e.frag
                  , i = e.part;
                if (!r || r.type === c.PlaylistLevelType.MAIN) {
                  if (this.fragContextChanged(r))
                    return this.warn("Fragment " + r.sn + (i ? " p: " + i.index : "") + " of level " + r.level + " finished buffering, but was aborted. state: " + this.state),
                    void (this.state === s.State.PARSED && (this.state = s.State.IDLE));
                  var n = i ? i.stats : r.stats;
                  this.fragLastKbps = Math.round(8 * n.total / (n.buffering.end - n.loading.first)),
                  "initSegment" !== r.sn && (this.fragPrevious = r),
                  this.fragBufferedComplete(r, i)
                }
              }
              ,
              A.onError = function(t, e) {
                switch (e.details) {
                case m.ErrorDetails.FRAG_LOAD_ERROR:
                case m.ErrorDetails.FRAG_LOAD_TIMEOUT:
                case m.ErrorDetails.KEY_LOAD_ERROR:
                case m.ErrorDetails.KEY_LOAD_TIMEOUT:
                  this.onFragmentOrKeyLoadError(c.PlaylistLevelType.MAIN, e);
                  break;
                case m.ErrorDetails.LEVEL_LOAD_ERROR:
                case m.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                  this.state !== s.State.ERROR && (e.fatal ? (this.warn("" + e.details),
                  this.state = s.State.ERROR) : !e.levelRetry && this.state === s.State.WAITING_LEVEL && (this.state = s.State.IDLE));
                  break;
                case m.ErrorDetails.BUFFER_FULL_ERROR:
                  if ("main" === e.parent && (this.state === s.State.PARSING || this.state === s.State.PARSED)) {
                    var r = !0
                      , i = this.getFwdBufferInfo(this.media, c.PlaylistLevelType.MAIN);
                    i && .5 < i.len && (r = !this.reduceMaxBufferLength(i.len)),
                    r && (this.warn("buffer full error also media.currentTime is not buffered, flush main"),
                    this.immediateLevelSwitch()),
                    this.resetLoadingState()
                  }
                }
              }
              ,
              A.checkBuffer = function() {
                var t = this.media
                  , e = this.gapController;
                if (t && e && t.readyState) {
                  var r = u.BufferHelper.getBuffered(t);
                  !this.loadedmetadata && r.length ? (this.loadedmetadata = !0,
                  this.seekToStartPos()) : e.poll(this.lastCurrentTime),
                  this.lastCurrentTime = t.currentTime
                }
              }
              ,
              A.onFragLoadEmergencyAborted = function() {
                this.state = s.State.IDLE,
                this.loadedmetadata || (this.startFragRequested = !1,
                this.nextLoadPosition = this.startPosition),
                this.tickImmediate()
              }
              ,
              A.onBufferFlushed = function(t, e) {
                var r = e.type;
                if (r !== f.ElementaryStreamTypes.AUDIO || this.audioOnly && !this.altAudio) {
                  var i = (r === f.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                  this.afterBufferFlushed(i, r, c.PlaylistLevelType.MAIN)
                }
              }
              ,
              A.onLevelsUpdated = function(t, e) {
                this.levels = e.levels
              }
              ,
              A.swapAudioCodec = function() {
                this.audioCodecSwap = !this.audioCodecSwap
              }
              ,
              A.seekToStartPos = function() {
                var t = this.media
                  , e = t.currentTime
                  , r = this.startPosition;
                if (0 <= r && e < r) {
                  if (t.seeking)
                    return void p.logger.log("could not seek to " + r + ", already seeking at " + e);
                  var i = u.BufferHelper.getBuffered(t)
                    , n = (i.length ? i.start(0) : 0) - r;
                  0 < n && n < this.config.maxBufferHole && (p.logger.log("adjusting start position by " + n + " to match buffer start"),
                  r += n,
                  this.startPosition = r),
                  this.log("seek to target start position " + r + " from current time " + e),
                  t.currentTime = r
                }
              }
              ,
              A._getAudioCodec = function(t) {
                var e = this.config.defaultAudioCodec || t.audioCodec;
                return this.audioCodecSwap && e && (this.log("Swapping audio codec"),
                e = -1 === e.indexOf("mp4a.40.5") ? "mp4a.40.5" : "mp4a.40.2"),
                e
              }
              ,
              A._loadBitrateTestFrag = function(t) {
                var e = this;
                this._doFragLoad(t).then((function(r) {
                  var i = e.hls;
                  if (r && !i.nextLoadLevel && !e.fragContextChanged(t)) {
                    e.fragLoadError = 0,
                    e.state = s.State.IDLE,
                    e.startFragRequested = !1,
                    e.bitrateTest = !1;
                    var n = t.stats;
                    n.parsing.start = n.parsing.end = n.buffering.start = n.buffering.end = self.performance.now(),
                    i.trigger(l.Events.FRAG_LOADED, r)
                  }
                }
                ))
              }
              ,
              A._handleTransmuxComplete = function(t) {
                var e, r = this.hls, i = t.remuxResult, n = t.chunkMeta, o = this.getCurrentContext(n);
                if (!o)
                  return this.warn("The loading context changed while buffering fragment " + n.sn + " of level " + n.level + ". This chunk will not be buffered."),
                  void this.resetLiveStartWhenNotLoaded(n.level);
                var u = o.frag
                  , d = o.part
                  , c = o.level
                  , h = i.video
                  , g = i.text
                  , v = i.id3
                  , m = i.initSegment
                  , p = this.altAudio ? void 0 : i.audio;
                if (!this.fragContextChanged(u)) {
                  if (this.state = s.State.PARSING,
                  m) {
                    m.tracks && (this._bufferInitSegment(c, m.tracks, u, n),
                    r.trigger(l.Events.FRAG_PARSING_INIT_SEGMENT, {
                      frag: u,
                      id: "main",
                      tracks: m.tracks
                    }));
                    var y = m.initPTS
                      , E = m.timescale;
                    Object(a.isFiniteNumber)(y) && (this.initPTS[u.cc] = y,
                    r.trigger(l.Events.INIT_PTS_FOUND, {
                      frag: u,
                      id: "main",
                      initPTS: y,
                      timescale: E
                    }))
                  }
                  if (h && !1 !== i.independent) {
                    if (c.details) {
                      var b = h.startPTS
                        , T = h.endPTS
                        , A = h.startDTS
                        , S = h.endDTS;
                      if (d)
                        d.elementaryStreams[h.type] = {
                          startPTS: b,
                          endPTS: T,
                          startDTS: A,
                          endDTS: S
                        };
                      else if (h.firstKeyFrame && h.independent && (this.couldBacktrack = !0),
                      h.dropped && h.independent) {
                        if (this.getLoadPosition() + this.config.maxBufferHole < b)
                          return void this.backtrack(u);
                        u.setElementaryStreamInfo(h.type, u.start, T, u.start, S, !0)
                      }
                      u.setElementaryStreamInfo(h.type, b, T, A, S),
                      this.bufferFragmentData(h, u, d, n)
                    }
                  } else if (!1 === i.independent)
                    return void this.backtrack(u);
                  if (p) {
                    var L = p.startPTS
                      , k = p.endPTS
                      , D = p.startDTS
                      , _ = p.endDTS;
                    d && (d.elementaryStreams[f.ElementaryStreamTypes.AUDIO] = {
                      startPTS: L,
                      endPTS: k,
                      startDTS: D,
                      endDTS: _
                    }),
                    u.setElementaryStreamInfo(f.ElementaryStreamTypes.AUDIO, L, k, D, _),
                    this.bufferFragmentData(p, u, d, n)
                  }
                  if (null != v && null !== (e = v.samples) && void 0 !== e && e.length) {
                    var R = {
                      frag: u,
                      id: "main",
                      samples: v.samples
                    };
                    r.trigger(l.Events.FRAG_PARSING_METADATA, R)
                  }
                  if (g) {
                    var C = {
                      frag: u,
                      id: "main",
                      samples: g.samples
                    };
                    r.trigger(l.Events.FRAG_PARSING_USERDATA, C)
                  }
                }
              }
              ,
              A._bufferInitSegment = function(t, e, r, i) {
                var n = this;
                if (this.state === s.State.PARSING) {
                  this.audioOnly = !!e.audio && !e.video,
                  this.altAudio && !this.audioOnly && delete e.audio;
                  var a = e.audio
                    , o = e.video
                    , u = e.audiovideo;
                  if (a) {
                    var d = t.audioCodec
                      , c = navigator.userAgent.toLowerCase();
                    this.audioCodecSwitch && (d && (d = -1 === d.indexOf("mp4a.40.5") ? "mp4a.40.5" : "mp4a.40.2"),
                    1 !== a.metadata.channelCount && -1 === c.indexOf("firefox") && (d = "mp4a.40.5")),
                    -1 !== c.indexOf("android") && "audio/mpeg" !== a.container && (d = "mp4a.40.2",
                    this.log("Android: force audio codec to " + d)),
                    t.audioCodec && t.audioCodec !== d && this.log('Swapping manifest audio codec "' + t.audioCodec + '" for "' + d + '"'),
                    a.levelCodec = d,
                    a.id = "main",
                    this.log("Init audio buffer, container:" + a.container + ", codecs[selected/level/parsed]=[" + (d || "") + "/" + (t.audioCodec || "") + "/" + a.codec + "]")
                  }
                  o && (o.levelCodec = t.videoCodec,
                  o.id = "main",
                  this.log("Init video buffer, container:" + o.container + ", codecs[level/parsed]=[" + (t.videoCodec || "") + "/" + o.codec + "]")),
                  u && this.log("Init audiovideo buffer, container:" + u.container + ", codecs[level/parsed]=[" + (t.attrs.CODECS || "") + "/" + u.codec + "]"),
                  this.hls.trigger(l.Events.BUFFER_CODECS, e),
                  Object.keys(e).forEach((function(t) {
                    var a = e[t].initSegment;
                    null != a && a.byteLength && n.hls.trigger(l.Events.BUFFER_APPENDING, {
                      type: t,
                      data: a,
                      frag: r,
                      part: null,
                      chunkMeta: i,
                      parent: r.type
                    })
                  }
                  )),
                  this.tick()
                }
              }
              ,
              A.backtrack = function(t) {
                this.couldBacktrack = !0,
                this.resetTransmuxer(),
                this.flushBufferGap(t);
                var e = this.fragmentTracker.backtrack(t);
                this.fragPrevious = null,
                this.nextLoadPosition = t.start,
                e ? this.resetFragmentLoading(t) : this.state = s.State.BACKTRACKING
              }
              ,
              A.checkFragmentChanged = function() {
                var t = this.media
                  , e = null;
                if (t && 1 < t.readyState && !1 === t.seeking) {
                  var r = t.currentTime;
                  if (u.BufferHelper.isBuffered(t, r) ? e = this.getAppendedFrag(r) : u.BufferHelper.isBuffered(t, r + .1) && (e = this.getAppendedFrag(r + .1)),
                  e) {
                    var i = this.fragPlaying
                      , n = e.level;
                    i && e.sn === i.sn && i.level === n && e.urlId === i.urlId || (this.hls.trigger(l.Events.FRAG_CHANGED, {
                      frag: e
                    }),
                    (!i || i.level !== n) && this.hls.trigger(l.Events.LEVEL_SWITCHED, {
                      level: n
                    }),
                    this.fragPlaying = e)
                  }
                }
              }
              ,
              E = e,
              (b = [{
                key: "nextLevel",
                get: function() {
                  var t = this.nextBufferedFrag;
                  return t ? t.level : -1
                }
              }, {
                key: "currentLevel",
                get: function() {
                  var t = this.media;
                  if (t) {
                    var e = this.getAppendedFrag(t.currentTime);
                    if (e)
                      return e.level
                  }
                  return -1
                }
              }, {
                key: "nextBufferedFrag",
                get: function() {
                  var t = this.media;
                  if (t) {
                    var e = this.getAppendedFrag(t.currentTime);
                    return this.followingBufferedFrag(e)
                  }
                  return null
                }
              }, {
                key: "forceStartLoad",
                get: function() {
                  return this._forceStartLoad
                }
              }]) && i(E.prototype, b),
              T && i(E, T),
              e
            }(s.default)
          },
          "./src/crypt/aes-crypto.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return i
            }
            ));
            var i = function() {
              function t(t, e) {
                this.subtle = void 0,
                this.aesIV = void 0,
                this.subtle = t,
                this.aesIV = e
              }
              return t.prototype.decrypt = function(t, e) {
                return this.subtle.decrypt({
                  name: "AES-CBC",
                  iv: this.aesIV
                }, e, t)
              }
              ,
              t
            }()
          },
          "./src/crypt/aes-decryptor.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              var e = t.byteLength
                , r = e && new DataView(t.buffer).getUint8(e - 1);
              return r ? Object(n.sliceUint8)(t, 0, e - r) : t
            }
            r.r(e),
            r.d(e, "removePadding", (function() {
              return i
            }
            )),
            r.d(e, "default", (function() {
              return a
            }
            ));
            var n = r("./src/utils/typed-array.ts")
              , a = function() {
              function t() {
                this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                this.sBox = new Uint32Array(256),
                this.invSBox = new Uint32Array(256),
                this.key = new Uint32Array(0),
                this.ksRows = 0,
                this.keySize = 0,
                this.keySchedule = void 0,
                this.invKeySchedule = void 0,
                this.initTable()
              }
              var e = t.prototype;
              return e.uint8ArrayToUint32Array_ = function(t) {
                for (var e = new DataView(t), r = new Uint32Array(4), i = 0; 4 > i; i++)
                  r[i] = e.getUint32(4 * i);
                return r
              }
              ,
              e.initTable = function() {
                var t = this.sBox
                  , e = this.invSBox
                  , r = this.subMix
                  , i = r[0]
                  , n = r[1]
                  , a = r[2]
                  , s = r[3]
                  , o = this.invSubMix
                  , l = o[0]
                  , u = o[1]
                  , d = o[2]
                  , c = o[3]
                  , f = new Uint32Array(256)
                  , h = 0
                  , g = 0
                  , v = 0;
                for (v = 0; 256 > v; v++)
                  f[v] = 128 > v ? v << 1 : 283 ^ v << 1;
                for (v = 0; 256 > v; v++) {
                  var m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
                  m = m >>> 8 ^ 255 & m ^ 99,
                  t[h] = m,
                  e[m] = h;
                  var p = f[h]
                    , y = f[p]
                    , E = f[y]
                    , b = 257 * f[m] ^ 16843008 * m;
                  i[h] = b << 24 | b >>> 8,
                  n[h] = b << 16 | b >>> 16,
                  a[h] = b << 8 | b >>> 24,
                  s[h] = b,
                  b = 16843009 * E ^ 65537 * y ^ 257 * p ^ 16843008 * h,
                  l[m] = b << 24 | b >>> 8,
                  u[m] = b << 16 | b >>> 16,
                  d[m] = b << 8 | b >>> 24,
                  c[m] = b,
                  h ? (h = p ^ f[f[f[E ^ p]]],
                  g ^= f[f[g]]) : h = g = 1
                }
              }
              ,
              e.expandKey = function(t) {
                for (var e = this.uint8ArrayToUint32Array_(t), r = !0, i = 0; i < e.length && r; )
                  r = e[i] === this.key[i],
                  i++;
                if (!r) {
                  this.key = e;
                  var n = this.keySize = e.length;
                  if (4 !== n && 6 !== n && 8 !== n)
                    throw new Error("Invalid aes key size=" + n);
                  var a, s, o, l, u = this.ksRows = 4 * (n + 6 + 1), d = this.keySchedule = new Uint32Array(u), c = this.invKeySchedule = new Uint32Array(u), f = this.sBox, h = this.rcon, g = this.invSubMix, v = g[0], m = g[1], p = g[2], y = g[3];
                  for (a = 0; a < u; a++)
                    a < n ? o = d[a] = e[a] : (l = o,
                    0 == a % n ? (l = f[(l = l << 8 | l >>> 24) >>> 24] << 24 | f[255 & l >>> 16] << 16 | f[255 & l >>> 8] << 8 | f[255 & l],
                    l ^= h[0 | a / n] << 24) : 6 < n && 4 == a % n && (l = f[l >>> 24] << 24 | f[255 & l >>> 16] << 16 | f[255 & l >>> 8] << 8 | f[255 & l]),
                    d[a] = o = (d[a - n] ^ l) >>> 0);
                  for (s = 0; s < u; s++)
                    a = u - s,
                    l = 3 & s ? d[a] : d[a - 4],
                    c[s] = 4 > s || 4 >= a ? l : v[f[l >>> 24]] ^ m[f[255 & l >>> 16]] ^ p[f[255 & l >>> 8]] ^ y[f[255 & l]],
                    c[s] >>>= 0
                }
              }
              ,
              e.networkToHostOrderSwap = function(t) {
                return t << 24 | (65280 & t) << 8 | (16711680 & t) >> 8 | t >>> 24
              }
              ,
              e.decrypt = function(t, e, r) {
                for (var i, n, a, s, o, l, u, d, c, f, h, g, v, m, p = this.keySize + 6, y = this.invKeySchedule, E = this.invSBox, b = this.invSubMix, T = b[0], A = b[1], S = b[2], L = b[3], k = this.uint8ArrayToUint32Array_(r), D = k[0], _ = k[1], R = k[2], C = k[3], I = new Int32Array(t), x = new Int32Array(I.length), w = this.networkToHostOrderSwap; e < I.length; ) {
                  for (c = w(I[e]),
                  f = w(I[e + 1]),
                  h = w(I[e + 2]),
                  g = w(I[e + 3]),
                  o = c ^ y[0],
                  l = g ^ y[1],
                  u = h ^ y[2],
                  d = f ^ y[3],
                  v = 4,
                  m = 1; m < p; m++)
                    i = T[o >>> 24] ^ A[255 & l >> 16] ^ S[255 & u >> 8] ^ L[255 & d] ^ y[v],
                    n = T[l >>> 24] ^ A[255 & u >> 16] ^ S[255 & d >> 8] ^ L[255 & o] ^ y[v + 1],
                    a = T[u >>> 24] ^ A[255 & d >> 16] ^ S[255 & o >> 8] ^ L[255 & l] ^ y[v + 2],
                    s = T[d >>> 24] ^ A[255 & o >> 16] ^ S[255 & l >> 8] ^ L[255 & u] ^ y[v + 3],
                    o = i,
                    l = n,
                    u = a,
                    d = s,
                    v += 4;
                  i = E[o >>> 24] << 24 ^ E[255 & l >> 16] << 16 ^ E[255 & u >> 8] << 8 ^ E[255 & d] ^ y[v],
                  n = E[l >>> 24] << 24 ^ E[255 & u >> 16] << 16 ^ E[255 & d >> 8] << 8 ^ E[255 & o] ^ y[v + 1],
                  a = E[u >>> 24] << 24 ^ E[255 & d >> 16] << 16 ^ E[255 & o >> 8] << 8 ^ E[255 & l] ^ y[v + 2],
                  s = E[d >>> 24] << 24 ^ E[255 & o >> 16] << 16 ^ E[255 & l >> 8] << 8 ^ E[255 & u] ^ y[v + 3],
                  x[e] = w(i ^ D),
                  x[e + 1] = w(s ^ _),
                  x[e + 2] = w(a ^ R),
                  x[e + 3] = w(n ^ C),
                  D = c,
                  _ = f,
                  R = h,
                  C = g,
                  e += 4
                }
                return x.buffer
              }
              ,
              t
            }()
          },
          "./src/crypt/decrypter.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return u
            }
            ));
            var i = r("./src/crypt/aes-crypto.ts")
              , n = r("./src/crypt/fast-aes-key.ts")
              , a = r("./src/crypt/aes-decryptor.ts")
              , s = r("./src/utils/logger.ts")
              , o = r("./src/utils/mp4-tools.ts")
              , l = r("./src/utils/typed-array.ts")
              , u = function() {
              function t(t, e, r) {
                var i = (void 0 === r ? {} : r).removePKCS7Padding
                  , n = void 0 === i || i;
                if (this.logEnabled = !0,
                this.observer = void 0,
                this.config = void 0,
                this.removePKCS7Padding = void 0,
                this.subtle = null,
                this.softwareDecrypter = null,
                this.key = null,
                this.fastAesKey = null,
                this.remainderData = null,
                this.currentIV = null,
                this.currentResult = null,
                this.observer = t,
                this.config = e,
                this.removePKCS7Padding = n,
                n)
                  try {
                    var a = self.crypto;
                    a && (this.subtle = a.subtle || a.webkitSubtle)
                  } catch (t) {}
                null === this.subtle && (this.config.enableSoftwareAES = !0)
              }
              var e = t.prototype;
              return e.destroy = function() {
                this.observer = null
              }
              ,
              e.isSync = function() {
                return this.config.enableSoftwareAES
              }
              ,
              e.flush = function() {
                var t = this.currentResult;
                if (t) {
                  var e = new Uint8Array(t);
                  return this.reset(),
                  this.removePKCS7Padding ? Object(a.removePadding)(e) : e
                }
                this.reset()
              }
              ,
              e.reset = function() {
                this.currentResult = null,
                this.currentIV = null,
                this.remainderData = null,
                this.softwareDecrypter && (this.softwareDecrypter = null)
              }
              ,
              e.decrypt = function(t, e, r, i) {
                if (this.config.enableSoftwareAES) {
                  this.softwareDecrypt(new Uint8Array(t), e, r);
                  var n = this.flush();
                  n && i(n.buffer)
                } else
                  this.webCryptoDecrypt(new Uint8Array(t), e, r).then(i)
              }
              ,
              e.softwareDecrypt = function(t, e, r) {
                var i = this.currentIV
                  , n = this.currentResult
                  , s = this.remainderData;
                this.logOnce("JS AES decrypt"),
                s && (t = Object(o.appendUint8Array)(s, t),
                this.remainderData = null);
                var u = this.getValidChunk(t);
                if (!u.length)
                  return null;
                i && (r = i);
                var d = this.softwareDecrypter;
                d || (d = this.softwareDecrypter = new a.default),
                d.expandKey(e);
                var c = n;
                return this.currentResult = d.decrypt(u.buffer, 0, r),
                this.currentIV = Object(l.sliceUint8)(u, -16).buffer,
                c || null
              }
              ,
              e.webCryptoDecrypt = function(t, e, r) {
                var a = this
                  , s = this.subtle;
                return this.key === e && this.fastAesKey || (this.key = e,
                this.fastAesKey = new n.default(s,e)),
                this.fastAesKey.expandKey().then((function(e) {
                  return s ? new i.default(s,r).decrypt(t.buffer, e) : Promise.reject(new Error("web crypto not initialized"))
                }
                )).catch((function(i) {
                  return a.onWebCryptoError(i, t, e, r)
                }
                ))
              }
              ,
              e.onWebCryptoError = function(t, e, r, i) {
                return s.logger.warn("[decrypter.ts]: WebCrypto Error, disable WebCrypto API:", t),
                this.config.enableSoftwareAES = !0,
                this.logEnabled = !0,
                this.softwareDecrypt(e, r, i)
              }
              ,
              e.getValidChunk = function(t) {
                var e = t
                  , r = t.length - t.length % 16;
                return r !== t.length && (e = Object(l.sliceUint8)(t, 0, r),
                this.remainderData = Object(l.sliceUint8)(t, r)),
                e
              }
              ,
              e.logOnce = function(t) {
                this.logEnabled && (s.logger.log("[decrypter.ts]: " + t),
                this.logEnabled = !1)
              }
              ,
              t
            }()
          },
          "./src/crypt/fast-aes-key.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return i
            }
            ));
            var i = function() {
              function t(t, e) {
                this.subtle = void 0,
                this.key = void 0,
                this.subtle = t,
                this.key = e
              }
              return t.prototype.expandKey = function() {
                return this.subtle.importKey("raw", this.key, {
                  name: "AES-CBC"
                }, !1, ["encrypt", "decrypt"])
              }
              ,
              t
            }()
          },
          "./src/demux/aacdemuxer.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              return (i = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            r.r(e);
            var n = r("./src/demux/base-audio-demuxer.ts")
              , a = r("./src/demux/adts.ts")
              , s = r("./src/utils/logger.ts")
              , o = r("./src/demux/id3.ts")
              , l = function(t) {
              function e(e, r) {
                var i;
                return (i = t.call(this) || this).observer = void 0,
                i.config = void 0,
                i.observer = e,
                i.config = r,
                i
              }
              var r, n;
              n = t,
              (r = e).prototype = Object.create(n.prototype),
              r.prototype.constructor = r,
              i(r, n);
              var l = e.prototype;
              return l.resetInitSegment = function(e, r, i) {
                t.prototype.resetInitSegment.call(this, e, r, i),
                this._audioTrack = {
                  container: "audio/adts",
                  type: "audio",
                  id: 0,
                  pid: -1,
                  sequenceNumber: 0,
                  isAAC: !0,
                  samples: [],
                  manifestCodec: e,
                  duration: i,
                  inputTimeScale: 9e4,
                  dropped: 0
                }
              }
              ,
              e.probe = function(t) {
                if (!t)
                  return !1;
                for (var e = (o.getID3Data(t, 0) || []).length, r = t.length; e < r; e++)
                  if (a.probe(t, e))
                    return s.logger.log("ADTS sync word found !"),
                    !0;
                return !1
              }
              ,
              l.canParse = function(t, e) {
                return a.canParse(t, e)
              }
              ,
              l.appendFrame = function(t, e, r) {
                a.initTrackConfig(t, this.observer, e, r, t.manifestCodec);
                var i = a.appendFrame(t, e, r, this.initPTS, this.frameIndex);
                if (i && 0 === i.missing)
                  return i
              }
              ,
              e
            }(n.default);
            l.minProbeByteLength = 9,
            e.default = l
          },
          "./src/demux/adts.ts": function(t, e, r) {
            "use strict";
            function i(t, e, r, i) {
              var n, a, s, o, l = navigator.userAgent.toLowerCase(), u = i, d = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
              n = 1 + ((192 & e[r + 2]) >>> 6);
              var c = (60 & e[r + 2]) >>> 2;
              return c > d.length - 1 ? void t.trigger(m.Events.ERROR, {
                type: v.ErrorTypes.MEDIA_ERROR,
                details: v.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: !0,
                reason: "invalid ADTS sampling index:" + c
              }) : (s = (1 & e[r + 2]) << 2,
              s |= (192 & e[r + 3]) >>> 6,
              /firefox/i.test(l) ? 6 <= c ? (n = 5,
              o = [, , , , ],
              a = c - 3) : (n = 2,
              o = [, , ],
              a = c) : -1 === l.indexOf("android") ? (n = 5,
              o = [, , , , ],
              i && (-1 !== i.indexOf("mp4a.40.29") || -1 !== i.indexOf("mp4a.40.5")) || !i && 6 <= c ? a = c - 3 : ((i && -1 !== i.indexOf("mp4a.40.2") && (6 <= c && 1 === s || /vivaldi/i.test(l)) || !i && 1 === s) && (n = 2,
              o = [, , ]),
              a = c)) : (n = 2,
              o = [, , ],
              a = c),
              o[0] = n << 3,
              o[0] |= (14 & c) >> 1,
              o[1] |= (1 & c) << 7,
              o[1] |= s << 3,
              5 === n && (o[1] |= (14 & a) >> 1,
              o[2] = (1 & a) << 7,
              o[2] |= 8,
              o[3] = 0),
              {
                config: o,
                samplerate: d[c],
                channelCount: s,
                codec: "mp4a.40." + n,
                manifestCodec: u
              })
            }
            function n(t, e) {
              return 255 === t[e] && 240 == (246 & t[e + 1])
            }
            function a(t, e) {
              return 1 & t[e + 1] ? 7 : 9
            }
            function s(t, e) {
              return (3 & t[e + 3]) << 11 | t[e + 4] << 3 | (224 & t[e + 5]) >>> 5
            }
            function o(t, e) {
              return e + 5 < t.length
            }
            function l(t, e) {
              return e + 1 < t.length && n(t, e)
            }
            function u(t, e) {
              return o(t, e) && n(t, e) && s(t, e) <= t.length - e
            }
            function d(t, e) {
              if (l(t, e)) {
                var r = a(t, e);
                if (e + r >= t.length)
                  return !1;
                var i = s(t, e);
                if (i <= r)
                  return !1;
                var n = e + i;
                return n === t.length || l(t, n)
              }
              return !1
            }
            function c(t, e, r, n, a) {
              if (!t.samplerate) {
                var s = i(e, r, n, a);
                if (!s)
                  return;
                t.config = s.config,
                t.samplerate = s.samplerate,
                t.channelCount = s.channelCount,
                t.codec = s.codec,
                t.manifestCodec = s.manifestCodec
              }
            }
            function f(t) {
              return 9216e4 / t
            }
            function h(t, e, r, i, n) {
              var o = a(t, e)
                , l = s(t, e);
              if (0 < (l -= o))
                return {
                  headerLength: o,
                  frameLength: l,
                  stamp: r + i * n
                }
            }
            function g(t, e, r, i, n) {
              var a = h(e, r, i, n, f(t.samplerate));
              if (a) {
                var s, o = a.frameLength, l = a.headerLength, u = a.stamp, d = l + o, c = Math.max(0, r + d - e.length);
                c ? (s = new Uint8Array(d - l)).set(e.subarray(r + l, e.length), 0) : s = e.subarray(r + l, r + d);
                var g = {
                  unit: s,
                  pts: u
                };
                return c || t.samples.push(g),
                {
                  sample: g,
                  length: d,
                  missing: c
                }
              }
            }
            r.r(e),
            r.d(e, "getAudioConfig", (function() {
              return i
            }
            )),
            r.d(e, "isHeaderPattern", (function() {
              return n
            }
            )),
            r.d(e, "getHeaderLength", (function() {
              return a
            }
            )),
            r.d(e, "getFullFrameLength", (function() {
              return s
            }
            )),
            r.d(e, "canGetFrameLength", (function() {
              return o
            }
            )),
            r.d(e, "isHeader", (function() {
              return l
            }
            )),
            r.d(e, "canParse", (function() {
              return u
            }
            )),
            r.d(e, "probe", (function() {
              return d
            }
            )),
            r.d(e, "initTrackConfig", (function() {
              return c
            }
            )),
            r.d(e, "getFrameDuration", (function() {
              return f
            }
            )),
            r.d(e, "parseFrameHeader", (function() {
              return h
            }
            )),
            r.d(e, "appendFrame", (function() {
              return g
            }
            ));
            var v = r("./src/errors.ts")
              , m = r("./src/events.ts")
          },
          "./src/demux/base-audio-demuxer.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "initPTSFn", (function() {
              return u
            }
            ));
            var i = r("./src/polyfills/number.ts")
              , n = r("./src/demux/id3.ts")
              , a = r("./src/demux/dummy-demuxed-track.ts")
              , s = r("./src/utils/mp4-tools.ts")
              , o = r("./src/utils/typed-array.ts")
              , l = function() {
              function t() {
                this._audioTrack = void 0,
                this._id3Track = void 0,
                this.frameIndex = 0,
                this.cachedData = null,
                this.initPTS = null
              }
              var e = t.prototype;
              return e.resetInitSegment = function(t, e, r) {
                this._id3Track = {
                  type: "id3",
                  id: 0,
                  pid: -1,
                  inputTimeScale: 9e4,
                  sequenceNumber: 0,
                  samples: [],
                  dropped: 0
                }
              }
              ,
              e.resetTimeStamp = function() {}
              ,
              e.resetContiguity = function() {}
              ,
              e.canParse = function(t, e) {
                return !1
              }
              ,
              e.appendFrame = function(t, e, r) {}
              ,
              e.demux = function(t, e) {
                this.cachedData && (t = Object(s.appendUint8Array)(this.cachedData, t),
                this.cachedData = null);
                var r, i, l = n.getID3Data(t, 0), d = l ? l.length : 0, c = this._audioTrack, f = this._id3Track, h = l ? n.getTimeStamp(l) : void 0, g = t.length;
                for ((0 === this.frameIndex || null === this.initPTS) && (this.initPTS = u(h, e)),
                l && 0 < l.length && f.samples.push({
                  pts: this.initPTS,
                  dts: this.initPTS,
                  data: l
                }),
                i = this.initPTS; d < g; ) {
                  if (this.canParse(t, d)) {
                    var v = this.appendFrame(c, t, d);
                    v ? (this.frameIndex++,
                    i = v.sample.pts,
                    r = d += v.length) : d = g
                  } else
                    n.canParse(t, d) ? (l = n.getID3Data(t, d),
                    f.samples.push({
                      pts: i,
                      dts: i,
                      data: l
                    }),
                    r = d += l.length) : d++;
                  if (d === g && r !== g) {
                    var m = Object(o.sliceUint8)(t, r);
                    this.cachedData = this.cachedData ? Object(s.appendUint8Array)(this.cachedData, m) : m
                  }
                }
                return {
                  audioTrack: c,
                  avcTrack: Object(a.dummyTrack)(),
                  id3Track: f,
                  textTrack: Object(a.dummyTrack)()
                }
              }
              ,
              e.demuxSampleAes = function(t, e, r) {
                return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"))
              }
              ,
              e.flush = function(t) {
                var e = this.cachedData;
                return e && (this.cachedData = null,
                this.demux(e, 0)),
                this.frameIndex = 0,
                {
                  audioTrack: this._audioTrack,
                  avcTrack: Object(a.dummyTrack)(),
                  id3Track: this._id3Track,
                  textTrack: Object(a.dummyTrack)()
                }
              }
              ,
              e.destroy = function() {}
              ,
              t
            }()
              , u = function(t, e) {
              return Object(i.isFiniteNumber)(t) ? 90 * t : 9e4 * e
            };
            e.default = l
          },
          "./src/demux/chunk-cache.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return i
            }
            ));
            var i = function() {
              function t() {
                this.chunks = [],
                this.dataLength = 0
              }
              var e = t.prototype;
              return e.push = function(t) {
                this.chunks.push(t),
                this.dataLength += t.length
              }
              ,
              e.flush = function() {
                var t, e = this.chunks, r = this.dataLength;
                return e.length ? (t = 1 === e.length ? e[0] : function(t, e) {
                  for (var r, i = new Uint8Array(e), n = 0, a = 0; a < t.length; a++)
                    r = t[a],
                    i.set(r, n),
                    n += r.length;
                  return i
                }(e, r),
                this.reset(),
                t) : new Uint8Array(0)
              }
              ,
              e.reset = function() {
                this.chunks.length = 0,
                this.dataLength = 0
              }
              ,
              t
            }()
          },
          "./src/demux/dummy-demuxed-track.ts": function(t, e, r) {
            "use strict";
            function i() {
              return {
                type: "",
                id: -1,
                pid: -1,
                inputTimeScale: 9e4,
                sequenceNumber: -1,
                samples: [],
                dropped: 0
              }
            }
            r.r(e),
            r.d(e, "dummyTrack", (function() {
              return i
            }
            ))
          },
          "./src/demux/exp-golomb.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = r("./src/utils/logger.ts")
              , n = function() {
              function t(t) {
                this.data = void 0,
                this.bytesAvailable = void 0,
                this.word = void 0,
                this.bitsAvailable = void 0,
                this.data = t,
                this.bytesAvailable = t.byteLength,
                this.word = 0,
                this.bitsAvailable = 0
              }
              var e = t.prototype;
              return e.loadWord = function() {
                var t = this.data
                  , e = this.bytesAvailable
                  , r = t.byteLength - e
                  , i = new Uint8Array(4)
                  , n = Math.min(4, e);
                if (0 === n)
                  throw new Error("no bytes available");
                i.set(t.subarray(r, r + n)),
                this.word = new DataView(i.buffer).getUint32(0),
                this.bitsAvailable = 8 * n,
                this.bytesAvailable -= n
              }
              ,
              e.skipBits = function(t) {
                var e;
                this.bitsAvailable > t ? (this.word <<= t,
                this.bitsAvailable -= t) : (t -= this.bitsAvailable,
                t -= (e = t >> 3) >> 3,
                this.bytesAvailable -= e,
                this.loadWord(),
                this.word <<= t,
                this.bitsAvailable -= t)
              }
              ,
              e.readBits = function(t) {
                var e = Math.min(this.bitsAvailable, t)
                  , r = this.word >>> 32 - e;
                return 32 < t && i.logger.error("Cannot read more than 32 bits at a time"),
                this.bitsAvailable -= e,
                0 < this.bitsAvailable ? this.word <<= e : 0 < this.bytesAvailable && this.loadWord(),
                0 < (e = t - e) && this.bitsAvailable ? r << e | this.readBits(e) : r
              }
              ,
              e.skipLZ = function() {
                var t;
                for (t = 0; t < this.bitsAvailable; ++t)
                  if (0 != (this.word & 2147483648 >>> t))
                    return this.word <<= t,
                    this.bitsAvailable -= t,
                    t;
                return this.loadWord(),
                t + this.skipLZ()
              }
              ,
              e.skipUEG = function() {
                this.skipBits(1 + this.skipLZ())
              }
              ,
              e.skipEG = function() {
                this.skipBits(1 + this.skipLZ())
              }
              ,
              e.readUEG = function() {
                var t = this.skipLZ();
                return this.readBits(t + 1) - 1
              }
              ,
              e.readEG = function() {
                var t = this.readUEG();
                return 1 & t ? 1 + t >>> 1 : -1 * (t >>> 1)
              }
              ,
              e.readBoolean = function() {
                return 1 === this.readBits(1)
              }
              ,
              e.readUByte = function() {
                return this.readBits(8)
              }
              ,
              e.readUShort = function() {
                return this.readBits(16)
              }
              ,
              e.readUInt = function() {
                return this.readBits(32)
              }
              ,
              e.skipScalingList = function(t) {
                for (var e = 8, r = 8, i = 0; i < t; i++)
                  0 !== r && (r = (e + this.readEG() + 256) % 256),
                  e = 0 === r ? e : r
              }
              ,
              e.readSPS = function() {
                var t, e, r, i = 0, n = 0, a = 0, s = 0, o = this.readUByte.bind(this), l = this.readBits.bind(this), u = this.readUEG.bind(this), d = this.readBoolean.bind(this), c = this.skipBits.bind(this), f = this.skipEG.bind(this), h = this.skipUEG.bind(this), g = this.skipScalingList.bind(this);
                o();
                var v = o();
                if (l(5),
                c(3),
                o(),
                h(),
                100 === v || 110 === v || 122 === v || 244 === v || 44 === v || 83 === v || 86 === v || 118 === v || 128 === v) {
                  var m = u();
                  if (3 === m && c(1),
                  h(),
                  h(),
                  c(1),
                  d())
                    for (e = 3 === m ? 12 : 8,
                    r = 0; r < e; r++)
                      d() && g(6 > r ? 16 : 64)
                }
                h();
                var p = u();
                if (0 === p)
                  u();
                else if (1 === p)
                  for (c(1),
                  f(),
                  f(),
                  t = u(),
                  r = 0; r < t; r++)
                    f();
                h(),
                c(1);
                var y = u()
                  , E = u()
                  , b = l(1);
                0 === b && c(1),
                c(1),
                d() && (i = u(),
                n = u(),
                a = u(),
                s = u());
                var T = [1, 1];
                if (d() && d())
                  switch (o()) {
                  case 1:
                    T = [1, 1];
                    break;
                  case 2:
                    T = [12, 11];
                    break;
                  case 3:
                    T = [10, 11];
                    break;
                  case 4:
                    T = [16, 11];
                    break;
                  case 5:
                    T = [40, 33];
                    break;
                  case 6:
                    T = [24, 11];
                    break;
                  case 7:
                    T = [20, 11];
                    break;
                  case 8:
                    T = [32, 11];
                    break;
                  case 9:
                    T = [80, 33];
                    break;
                  case 10:
                    T = [18, 11];
                    break;
                  case 11:
                    T = [15, 11];
                    break;
                  case 12:
                    T = [64, 33];
                    break;
                  case 13:
                    T = [160, 99];
                    break;
                  case 14:
                    T = [4, 3];
                    break;
                  case 15:
                    T = [3, 2];
                    break;
                  case 16:
                    T = [2, 1];
                    break;
                  case 255:
                    T = [o() << 8 | o(), o() << 8 | o()]
                  }
                return {
                  width: Math.ceil(16 * (y + 1) - 2 * i - 2 * n),
                  height: (2 - b) * (E + 1) * 16 - (b ? 2 : 4) * (a + s),
                  pixelRatio: T
                }
              }
              ,
              e.readSliceType = function() {
                return this.readUByte(),
                this.readUEG(),
                this.readUEG()
              }
              ,
              t
            }();
            e.default = n
          },
          "./src/demux/id3.ts": function(t, e, r) {
            "use strict";
            function i() {
              return n || void 0 === self.TextDecoder || (n = new self.TextDecoder("utf-8")),
              n
            }
            r.r(e),
            r.d(e, "isHeader", (function() {
              return a
            }
            )),
            r.d(e, "isFooter", (function() {
              return s
            }
            )),
            r.d(e, "getID3Data", (function() {
              return o
            }
            )),
            r.d(e, "canParse", (function() {
              return u
            }
            )),
            r.d(e, "getTimeStamp", (function() {
              return d
            }
            )),
            r.d(e, "isTimeStampFrame", (function() {
              return c
            }
            )),
            r.d(e, "getID3Frames", (function() {
              return h
            }
            )),
            r.d(e, "decodeFrame", (function() {
              return g
            }
            )),
            r.d(e, "utf8ArrayToStr", (function() {
              return E
            }
            )),
            r.d(e, "testables", (function() {
              return b
            }
            ));
            var n, a = function(t, e) {
              return !!(e + 10 <= t.length && 73 === t[e] && 68 === t[e + 1] && 51 === t[e + 2] && 255 > t[e + 3] && 255 > t[e + 4] && 128 > t[e + 6] && 128 > t[e + 7] && 128 > t[e + 8] && 128 > t[e + 9])
            }, s = function(t, e) {
              return !!(e + 10 <= t.length && 51 === t[e] && 68 === t[e + 1] && 73 === t[e + 2] && 255 > t[e + 3] && 255 > t[e + 4] && 128 > t[e + 6] && 128 > t[e + 7] && 128 > t[e + 8] && 128 > t[e + 9])
            }, o = function(t, e) {
              for (var r = e, i = 0; a(t, e); )
                i += 10,
                i += l(t, e + 6),
                s(t, e + 10) && (i += 10),
                e += i;
              return 0 < i ? t.subarray(r, r + i) : void 0
            }, l = function(t, e) {
              var r = 0;
              return r = (127 & t[e]) << 21,
              r |= (127 & t[e + 1]) << 14,
              r |= (127 & t[e + 2]) << 7,
              r |= 127 & t[e + 3]
            }, u = function(t, e) {
              return a(t, e) && l(t, e + 6) + 10 <= t.length - e
            }, d = function(t) {
              for (var e, r = h(t), i = 0; i < r.length; i++)
                if (e = r[i],
                c(e))
                  return y(e)
            }, c = function(t) {
              return t && "PRIV" === t.key && "com.apple.streaming.transportStreamTimestamp" === t.info
            }, f = function(t) {
              var e = String.fromCharCode(t[0], t[1], t[2], t[3])
                , r = l(t, 4);
              return {
                type: e,
                size: r,
                data: t.subarray(10, 10 + r)
              }
            }, h = function(t) {
              for (var e, r = 0, i = []; a(t, r); ) {
                e = l(t, r + 6);
                for (var n = (r += 10) + e; r + 8 < n; ) {
                  var o = f(t.subarray(r))
                    , u = g(o);
                  u && i.push(u),
                  r += o.size + 10
                }
                s(t, r) && (r += 10)
              }
              return i
            }, g = function(t) {
              return "PRIV" === t.type ? v(t) : "W" === t.type[0] ? p(t) : m(t)
            }, v = function(t) {
              if (!(2 > t.size)) {
                var e = E(t.data, !0)
                  , r = new Uint8Array(t.data.subarray(e.length + 1));
                return {
                  key: t.type,
                  info: e,
                  data: r.buffer
                }
              }
            }, m = function(t) {
              if (!(2 > t.size)) {
                if ("TXXX" === t.type) {
                  var e = 1
                    , r = E(t.data.subarray(e), !0);
                  e += r.length + 1;
                  var i = E(t.data.subarray(e));
                  return {
                    key: t.type,
                    info: r,
                    data: i
                  }
                }
                var n = E(t.data.subarray(1));
                return {
                  key: t.type,
                  data: n
                }
              }
            }, p = function(t) {
              if ("WXXX" === t.type) {
                if (2 > t.size)
                  return;
                var e = 1
                  , r = E(t.data.subarray(e), !0);
                e += r.length + 1;
                var i = E(t.data.subarray(e));
                return {
                  key: t.type,
                  info: r,
                  data: i
                }
              }
              var n = E(t.data);
              return {
                key: t.type,
                data: n
              }
            }, y = function(t) {
              if (8 === t.data.byteLength) {
                var e = new Uint8Array(t.data)
                  , r = 1 & e[3]
                  , i = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
                return i /= 45,
                r && (i += 47721858.84),
                Math.round(i)
              }
            }, E = function(t, e) {
              void 0 === e && (e = !1);
              var r = i();
              if (r) {
                var n = r.decode(t);
                if (e) {
                  var a = n.indexOf("\0");
                  return -1 === a ? n : n.substring(0, a)
                }
                return n.replace(/\0/g, "")
              }
              for (var s, o, l, u = t.length, d = "", c = 0; c < u; ) {
                if (0 === (s = t[c++]) && e)
                  return d;
                if (0 !== s && 3 !== s)
                  switch (s >> 4) {
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    d += String.fromCharCode(s);
                    break;
                  case 12:
                  case 13:
                    o = t[c++],
                    d += String.fromCharCode((31 & s) << 6 | 63 & o);
                    break;
                  case 14:
                    o = t[c++],
                    l = t[c++],
                    d += String.fromCharCode((15 & s) << 12 | (63 & o) << 6 | (63 & l) << 0)
                  }
              }
              return d
            }, b = {
              decodeTextFrame: m
            }
          },
          "./src/demux/mp3demuxer.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              return (i = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            r.r(e);
            var n = r("./src/demux/base-audio-demuxer.ts")
              , a = r("./src/demux/id3.ts")
              , s = r("./src/utils/logger.ts")
              , o = r("./src/demux/mpegaudio.ts")
              , l = function(t) {
              function e() {
                return t.apply(this, arguments) || this
              }
              var r, n;
              n = t,
              (r = e).prototype = Object.create(n.prototype),
              r.prototype.constructor = r,
              i(r, n);
              var l = e.prototype;
              return l.resetInitSegment = function(e, r, i) {
                t.prototype.resetInitSegment.call(this, e, r, i),
                this._audioTrack = {
                  container: "audio/mpeg",
                  type: "audio",
                  id: 0,
                  pid: -1,
                  sequenceNumber: 0,
                  isAAC: !1,
                  samples: [],
                  manifestCodec: e,
                  duration: i,
                  inputTimeScale: 9e4,
                  dropped: 0
                }
              }
              ,
              e.probe = function(t) {
                if (!t)
                  return !1;
                for (var e = (a.getID3Data(t, 0) || []).length, r = t.length; e < r; e++)
                  if (o.probe(t, e))
                    return s.logger.log("MPEG Audio sync word found !"),
                    !0;
                return !1
              }
              ,
              l.canParse = function(t, e) {
                return o.canParse(t, e)
              }
              ,
              l.appendFrame = function(t, e, r) {
                return null === this.initPTS ? void 0 : o.appendFrame(t, e, r, this.initPTS, this.frameIndex)
              }
              ,
              e
            }(n.default);
            l.minProbeByteLength = 4,
            e.default = l
          },
          "./src/demux/mp4demuxer.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = r("./src/utils/mp4-tools.ts")
              , n = r("./src/demux/dummy-demuxed-track.ts")
              , a = function() {
              function t(t, e) {
                this.remainderData = null,
                this.config = void 0,
                this.config = e
              }
              var e = t.prototype;
              return e.resetTimeStamp = function() {}
              ,
              e.resetInitSegment = function() {}
              ,
              e.resetContiguity = function() {}
              ,
              t.probe = function(t) {
                return 0 < Object(i.findBox)({
                  data: t,
                  start: 0,
                  end: Math.min(t.length, 16384)
                }, ["moof"]).length
              }
              ,
              e.demux = function(t) {
                var e = t
                  , r = Object(n.dummyTrack)();
                if (this.config.progressive) {
                  this.remainderData && (e = Object(i.appendUint8Array)(this.remainderData, t));
                  var a = Object(i.segmentValidRange)(e);
                  this.remainderData = a.remainder,
                  r.samples = a.valid || new Uint8Array
                } else
                  r.samples = e;
                return {
                  audioTrack: Object(n.dummyTrack)(),
                  avcTrack: r,
                  id3Track: Object(n.dummyTrack)(),
                  textTrack: Object(n.dummyTrack)()
                }
              }
              ,
              e.flush = function() {
                var t = Object(n.dummyTrack)();
                return t.samples = this.remainderData || new Uint8Array,
                this.remainderData = null,
                {
                  audioTrack: Object(n.dummyTrack)(),
                  avcTrack: t,
                  id3Track: Object(n.dummyTrack)(),
                  textTrack: Object(n.dummyTrack)()
                }
              }
              ,
              e.demuxSampleAes = function(t, e, r) {
                return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"))
              }
              ,
              e.destroy = function() {}
              ,
              t
            }();
            a.minProbeByteLength = 1024,
            e.default = a
          },
          "./src/demux/mpegaudio.ts": function(t, e, r) {
            "use strict";
            function i(t, e, r, i, a) {
              if (!(r + 24 > e.length)) {
                var s = n(e, r);
                if (s && r + s.frameLength <= e.length) {
                  var o = i + a * (9e4 * s.samplesPerFrame / s.sampleRate)
                    , l = {
                    unit: e.subarray(r, r + s.frameLength),
                    pts: o,
                    dts: o
                  };
                  return t.config = [],
                  t.channelCount = s.channelCount,
                  t.samplerate = s.sampleRate,
                  t.samples.push(l),
                  {
                    sample: l,
                    length: s.frameLength,
                    missing: 0
                  }
                }
              }
            }
            function n(t, e) {
              var r = 3 & t[e + 1] >> 3
                , i = 3 & t[e + 1] >> 1
                , n = 15 & t[e + 2] >> 4
                , a = 3 & t[e + 2] >> 2;
              if (1 != r && 0 !== n && 15 !== n && 3 !== a) {
                var s = 1 & t[e + 2] >> 1
                  , o = t[e + 3] >> 6
                  , l = 1e3 * d[14 * (3 === r ? 3 - i : 3 === i ? 3 : 4) + n - 1]
                  , g = c[3 * (3 === r ? 0 : 2 === r ? 1 : 2) + a]
                  , v = 3 === o ? 1 : 2
                  , m = f[r][i]
                  , p = h[i]
                  , y = 8 * m * p
                  , E = Math.floor(m * l / g + s) * p;
                if (null === u) {
                  var b = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                  u = b ? parseInt(b[1]) : 0
                }
                return !!u && 87 >= u && 2 === i && 224e3 <= l && 0 === o && (t[e + 3] = 128 | t[e + 3]),
                {
                  sampleRate: g,
                  channelCount: v,
                  frameLength: E,
                  samplesPerFrame: y
                }
              }
            }
            function a(t, e) {
              return 255 === t[e] && 224 == (224 & t[e + 1]) && 0 != (6 & t[e + 1])
            }
            function s(t, e) {
              return e + 1 < t.length && a(t, e)
            }
            function o(t, e) {
              return a(t, e) && 4 <= t.length - e
            }
            function l(t, e) {
              if (e + 1 < t.length && a(t, e)) {
                var r = n(t, e)
                  , i = 4;
                null != r && r.frameLength && (i = r.frameLength);
                var o = e + i;
                return o === t.length || s(t, o)
              }
              return !1
            }
            r.r(e),
            r.d(e, "appendFrame", (function() {
              return i
            }
            )),
            r.d(e, "parseHeader", (function() {
              return n
            }
            )),
            r.d(e, "isHeaderPattern", (function() {
              return a
            }
            )),
            r.d(e, "isHeader", (function() {
              return s
            }
            )),
            r.d(e, "canParse", (function() {
              return o
            }
            )),
            r.d(e, "probe", (function() {
              return l
            }
            ));
            var u = null
              , d = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
              , c = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3]
              , f = [[0, 72, 144, 12], [0, 0, 0, 0], [0, 72, 144, 12], [0, 144, 144, 12]]
              , h = [0, 1, 1, 4]
          },
          "./src/demux/sample-aes.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = r("./src/crypt/decrypter.ts")
              , n = r("./src/demux/tsdemuxer.ts")
              , a = function() {
              function t(t, e, r) {
                this.keyData = void 0,
                this.decrypter = void 0,
                this.keyData = r,
                this.decrypter = new i.default(t,e,{
                  removePKCS7Padding: !1
                })
              }
              var e = t.prototype;
              return e.decryptBuffer = function(t, e) {
                this.decrypter.decrypt(t, this.keyData.key.buffer, this.keyData.iv.buffer, e)
              }
              ,
              e.decryptAacSample = function(t, e, r, i) {
                var n = t[e].unit
                  , a = n.subarray(16, n.length - n.length % 16)
                  , s = a.buffer.slice(a.byteOffset, a.byteOffset + a.length)
                  , o = this;
                this.decryptBuffer(s, (function(a) {
                  var s = new Uint8Array(a);
                  n.set(s, 16),
                  i || o.decryptAacSamples(t, e + 1, r)
                }
                ))
              }
              ,
              e.decryptAacSamples = function(t, e, r) {
                for (; ; e++) {
                  if (e >= t.length)
                    return void r();
                  if (!(32 > t[e].unit.length)) {
                    var i = this.decrypter.isSync();
                    if (this.decryptAacSample(t, e, r, i),
                    !i)
                      return
                  }
                }
              }
              ,
              e.getAvcEncryptedData = function(t) {
                for (var e = 16 * Math.floor((t.length - 48) / 160) + 16, r = new Int8Array(e), i = 0, n = 32; n <= t.length - 16; n += 160,
                i += 16)
                  r.set(t.subarray(n, n + 16), i);
                return r
              }
              ,
              e.getAvcDecryptedUnit = function(t, e) {
                for (var r = new Uint8Array(e), i = 0, n = 32; n <= t.length - 16; n += 160,
                i += 16)
                  t.set(r.subarray(i, i + 16), n);
                return t
              }
              ,
              e.decryptAvcSample = function(t, e, r, i, a, s) {
                var o = Object(n.discardEPB)(a.data)
                  , l = this.getAvcEncryptedData(o)
                  , u = this;
                this.decryptBuffer(l.buffer, (function(n) {
                  a.data = u.getAvcDecryptedUnit(o, n),
                  s || u.decryptAvcSamples(t, e, r + 1, i)
                }
                ))
              }
              ,
              e.decryptAvcSamples = function(t, e, r, i) {
                if (t instanceof Uint8Array)
                  throw new Error("Cannot decrypt samples of type Uint8Array");
                for (; ; e++,
                r = 0) {
                  if (e >= t.length)
                    return void i();
                  for (var n = t[e].units; !(r >= n.length); r++) {
                    var a = n[r];
                    if (!(48 >= a.data.length || 1 !== a.type && 5 !== a.type)) {
                      var s = this.decrypter.isSync();
                      if (this.decryptAvcSample(t, e, r, i, a, s),
                      !s)
                        return
                    }
                  }
                }
              }
              ,
              t
            }();
            e.default = a
          },
          "./src/demux/transmuxer-interface.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return c
            }
            ));
            var i = r("./node_modules/webworkify-webpack/index.js")
              , n = r("./src/events.ts")
              , a = r("./src/demux/transmuxer.ts")
              , s = r("./src/utils/logger.ts")
              , o = r("./src/errors.ts")
              , l = r("./src/utils/mediasource-helper.ts")
              , u = r("./node_modules/eventemitter3/index.js")
              , d = Object(l.getMediaSource)() || {
              isTypeSupported: function() {
                return !1
              }
            }
              , c = function() {
              function t(t, e, r, l) {
                var c = this;
                this.hls = void 0,
                this.id = void 0,
                this.observer = void 0,
                this.frag = null,
                this.part = null,
                this.worker = void 0,
                this.onwmsg = void 0,
                this.transmuxer = null,
                this.onTransmuxComplete = void 0,
                this.onFlush = void 0,
                this.hls = t,
                this.id = e,
                this.onTransmuxComplete = r,
                this.onFlush = l;
                var f = t.config
                  , h = function(e, r) {
                  (r = r || {}).frag = c.frag,
                  r.id = c.id,
                  t.trigger(e, r)
                };
                this.observer = new u.EventEmitter,
                this.observer.on(n.Events.FRAG_DECRYPTED, h),
                this.observer.on(n.Events.ERROR, h);
                var g = {
                  mp4: d.isTypeSupported("video/mp4"),
                  mpeg: d.isTypeSupported("audio/mpeg"),
                  mp3: d.isTypeSupported('audio/mp4; codecs="mp3"')
                }
                  , v = navigator.vendor;
                if (f.enableWorker && "undefined" != typeof Worker) {
                  var m;
                  s.logger.log("demuxing in webworker");
                  try {
                    m = this.worker = i("./src/demux/transmuxer-worker.ts"),
                    this.onwmsg = this.onWorkerMessage.bind(this),
                    m.addEventListener("message", this.onwmsg),
                    m.onerror = function(e) {
                      t.trigger(n.Events.ERROR, {
                        type: o.ErrorTypes.OTHER_ERROR,
                        details: o.ErrorDetails.INTERNAL_EXCEPTION,
                        fatal: !0,
                        event: "demuxerWorker",
                        error: new Error(e.message + "  (" + e.filename + ":" + e.lineno + ")")
                      })
                    }
                    ,
                    m.postMessage({
                      cmd: "init",
                      typeSupported: g,
                      vendor: v,
                      id: e,
                      config: JSON.stringify(f)
                    })
                  } catch (t) {
                    s.logger.warn("Error in worker:", t),
                    s.logger.error("Error while initializing DemuxerWorker, fallback to inline"),
                    m && self.URL.revokeObjectURL(m.objectURL),
                    this.transmuxer = new a.default(this.observer,g,f,v,e),
                    this.worker = null
                  }
                } else
                  this.transmuxer = new a.default(this.observer,g,f,v,e)
              }
              var e = t.prototype;
              return e.destroy = function() {
                var t = this.worker;
                if (t)
                  t.removeEventListener("message", this.onwmsg),
                  t.terminate(),
                  this.worker = null;
                else {
                  var e = this.transmuxer;
                  e && (e.destroy(),
                  this.transmuxer = null)
                }
                var r = this.observer;
                r && r.removeAllListeners(),
                this.observer = null
              }
              ,
              e.push = function(t, e, r, i, n, o, l, u, d, c) {
                var f = this;
                d.transmuxing.start = self.performance.now();
                var h = this.transmuxer
                  , g = this.worker
                  , v = o ? o.start : n.start
                  , m = n.decryptdata
                  , p = this.frag
                  , y = !(p && n.cc === p.cc)
                  , E = !(p && d.level === p.level)
                  , b = p ? d.sn - p.sn : -1
                  , T = this.part ? d.part - this.part.index : 1
                  , A = !E && (1 === b || 0 === b && 1 === T)
                  , S = self.performance.now();
                (E || b || 0 === n.stats.parsing.start) && (n.stats.parsing.start = S),
                o && (T || !A) && (o.stats.parsing.start = S);
                var L = new a.TransmuxState(y,A,u,E,v);
                if (!A || y) {
                  s.logger.log("[transmuxer-interface, " + n.type + "]: Starting new transmux session for sn: " + d.sn + " p: " + d.part + " level: " + d.level + " id: " + d.id + "\n        discontinuity: " + y + "\n        trackSwitch: " + E + "\n        contiguous: " + A + "\n        accurateTimeOffset: " + u + "\n        timeOffset: " + v);
                  var k = new a.TransmuxConfig(r,i,e,l,c);
                  this.configureTransmuxer(k)
                }
                if (this.frag = n,
                this.part = o,
                g)
                  g.postMessage({
                    cmd: "demux",
                    data: t,
                    decryptdata: m,
                    chunkMeta: d,
                    state: L
                  }, t instanceof ArrayBuffer ? [t] : []);
                else if (h) {
                  var D = h.push(t, m, d, L);
                  Object(a.isPromise)(D) ? D.then((function(t) {
                    f.handleTransmuxComplete(t)
                  }
                  )) : this.handleTransmuxComplete(D)
                }
              }
              ,
              e.flush = function(t) {
                var e = this;
                t.transmuxing.start = self.performance.now();
                var r = this.transmuxer
                  , i = this.worker;
                if (i)
                  i.postMessage({
                    cmd: "flush",
                    chunkMeta: t
                  });
                else if (r) {
                  var n = r.flush(t);
                  Object(a.isPromise)(n) ? n.then((function(r) {
                    e.handleFlushResult(r, t)
                  }
                  )) : this.handleFlushResult(n, t)
                }
              }
              ,
              e.handleFlushResult = function(t, e) {
                var r = this;
                t.forEach((function(t) {
                  r.handleTransmuxComplete(t)
                }
                )),
                this.onFlush(e)
              }
              ,
              e.onWorkerMessage = function(t) {
                var e = t.data
                  , r = this.hls;
                switch (e.event) {
                case "init":
                  self.URL.revokeObjectURL(this.worker.objectURL);
                  break;
                case "transmuxComplete":
                  this.handleTransmuxComplete(e.data);
                  break;
                case "flush":
                  this.onFlush(e.data);
                  break;
                default:
                  e.data = e.data || {},
                  e.data.frag = this.frag,
                  e.data.id = this.id,
                  r.trigger(e.event, e.data)
                }
              }
              ,
              e.configureTransmuxer = function(t) {
                var e = this.worker
                  , r = this.transmuxer;
                e ? e.postMessage({
                  cmd: "configure",
                  config: t
                }) : r && r.configure(t)
              }
              ,
              e.handleTransmuxComplete = function(t) {
                t.chunkMeta.transmuxing.end = self.performance.now(),
                this.onTransmuxComplete(t)
              }
              ,
              t
            }()
          },
          "./src/demux/transmuxer-worker.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              var e = new d.EventEmitter
                , r = function(e, r) {
                t.postMessage({
                  event: e,
                  data: r
                })
              };
              e.on(l.Events.FRAG_DECRYPTED, r),
              e.on(l.Events.ERROR, r),
              t.addEventListener("message", (function(i) {
                var a = i.data;
                switch (a.cmd) {
                case "init":
                  var l = JSON.parse(a.config);
                  t.transmuxer = new o.default(e,a.typeSupported,l,a.vendor,a.id),
                  Object(u.enableLogs)(l.debug),
                  r("init", null);
                  break;
                case "configure":
                  t.transmuxer.configure(a.config);
                  break;
                case "demux":
                  var d = t.transmuxer.push(a.data, a.decryptdata, a.chunkMeta, a.state);
                  Object(o.isPromise)(d) ? d.then((function(e) {
                    n(t, e)
                  }
                  )) : n(t, d);
                  break;
                case "flush":
                  var c = a.chunkMeta
                    , f = t.transmuxer.flush(c);
                  Object(o.isPromise)(f) ? f.then((function(e) {
                    s(t, e, c)
                  }
                  )) : s(t, f, c)
                }
              }
              ))
            }
            function n(t, e) {
              if ((o = e.remuxResult).audio || o.video || o.text || o.id3 || o.initSegment) {
                var r = []
                  , i = e.remuxResult
                  , n = i.audio
                  , s = i.video;
                n && a(r, n),
                s && a(r, s),
                t.postMessage({
                  event: "transmuxComplete",
                  data: e
                }, r)
              }
              var o
            }
            function a(t, e) {
              e.data1 && t.push(e.data1.buffer),
              e.data2 && t.push(e.data2.buffer)
            }
            function s(t, e, r) {
              e.forEach((function(e) {
                n(t, e)
              }
              )),
              t.postMessage({
                event: "flush",
                data: r
              })
            }
            r.r(e),
            r.d(e, "default", (function() {
              return i
            }
            ));
            var o = r("./src/demux/transmuxer.ts")
              , l = r("./src/events.ts")
              , u = r("./src/utils/logger.ts")
              , d = r("./node_modules/eventemitter3/index.js")
          },
          "./src/demux/transmuxer.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              return "then"in t && t.then instanceof Function
            }
            r.r(e),
            r.d(e, "default", (function() {
              return E
            }
            )),
            r.d(e, "isPromise", (function() {
              return i
            }
            )),
            r.d(e, "TransmuxConfig", (function() {
              return T
            }
            )),
            r.d(e, "TransmuxState", (function() {
              return A
            }
            ));
            var n, a = r("./src/events.ts"), s = r("./src/errors.ts"), o = r("./src/crypt/decrypter.ts"), l = r("./src/demux/aacdemuxer.ts"), u = r("./src/demux/mp4demuxer.ts"), d = r("./src/demux/tsdemuxer.ts"), c = r("./src/demux/mp3demuxer.ts"), f = r("./src/remux/mp4-remuxer.ts"), h = r("./src/remux/passthrough-remuxer.ts"), g = r("./src/demux/chunk-cache.ts"), v = r("./src/utils/mp4-tools.ts"), m = r("./src/utils/logger.ts");
            try {
              n = self.performance.now.bind(self.performance)
            } catch (t) {
              m.logger.debug("Unable to use Performance API on this environment"),
              n = self.Date.now
            }
            var p = [{
              demux: d.default,
              remux: f.default
            }, {
              demux: u.default,
              remux: h.default
            }, {
              demux: l.default,
              remux: f.default
            }, {
              demux: c.default,
              remux: f.default
            }]
              , y = 1024;
            p.forEach((function(t) {
              var e = t.demux;
              y = Math.max(y, e.minProbeByteLength)
            }
            ));
            var E = function() {
              function t(t, e, r, i, n) {
                this.observer = void 0,
                this.typeSupported = void 0,
                this.config = void 0,
                this.vendor = void 0,
                this.id = void 0,
                this.demuxer = void 0,
                this.remuxer = void 0,
                this.decrypter = void 0,
                this.probe = void 0,
                this.decryptionPromise = null,
                this.transmuxConfig = void 0,
                this.currentTransmuxState = void 0,
                this.cache = new g.default,
                this.observer = t,
                this.typeSupported = e,
                this.config = r,
                this.vendor = i,
                this.id = n
              }
              var e = t.prototype;
              return e.configure = function(t) {
                this.transmuxConfig = t,
                this.decrypter && this.decrypter.reset()
              }
              ,
              e.push = function(t, e, r, i) {
                var a = this
                  , s = r.transmuxing;
                s.executeStart = n();
                var o = new Uint8Array(t)
                  , l = this.cache
                  , u = this.config
                  , d = this.currentTransmuxState
                  , c = this.transmuxConfig;
                i && (this.currentTransmuxState = i);
                var f = function(t, e) {
                  var r = null;
                  return 0 < t.byteLength && null != e && null != e.key && null !== e.iv && null != e.method && (r = e),
                  r
                }(o, e);
                if (f && "AES-128" === f.method) {
                  var h = this.getDecrypter();
                  if (!u.enableSoftwareAES)
                    return this.decryptionPromise = h.webCryptoDecrypt(o, f.key.buffer, f.iv.buffer).then((function(t) {
                      var e = a.push(t, null, r);
                      return a.decryptionPromise = null,
                      e
                    }
                    )),
                    this.decryptionPromise;
                  var g = h.softwareDecrypt(o, f.key.buffer, f.iv.buffer);
                  if (!g)
                    return s.executeEnd = n(),
                    b(r);
                  o = new Uint8Array(g)
                }
                var m = i || d
                  , p = m.contiguous
                  , y = m.discontinuity
                  , E = m.trackSwitch
                  , T = m.accurateTimeOffset
                  , A = m.timeOffset
                  , S = c.audioCodec
                  , L = c.videoCodec
                  , k = c.defaultInitPts
                  , D = c.duration
                  , _ = c.initSegmentData;
                if ((y || E) && this.resetInitSegment(_, S, L, D),
                y && this.resetInitialTimestamp(k),
                p || this.resetContiguity(),
                this.needsProbing(o, y, E)) {
                  if (l.dataLength) {
                    var R = l.flush();
                    o = Object(v.appendUint8Array)(R, o)
                  }
                  this.configureTransmuxer(o, c)
                }
                var C = this.transmux(o, f, A, T, r)
                  , I = this.currentTransmuxState;
                return I.contiguous = !0,
                I.discontinuity = !1,
                I.trackSwitch = !1,
                s.executeEnd = n(),
                C
              }
              ,
              e.flush = function(t) {
                var e = this
                  , r = t.transmuxing;
                r.executeStart = n();
                var o = this.decrypter
                  , l = this.cache
                  , u = this.currentTransmuxState
                  , d = this.decryptionPromise;
                if (d)
                  return d.then((function() {
                    return e.flush(t)
                  }
                  ));
                var c = []
                  , f = u.timeOffset;
                if (o) {
                  var h = o.flush();
                  h && c.push(this.push(h, null, t))
                }
                var g = l.dataLength;
                l.reset();
                var v = this.demuxer
                  , m = this.remuxer;
                if (!v || !m)
                  return g >= y && this.observer.emit(a.Events.ERROR, a.Events.ERROR, {
                    type: s.ErrorTypes.MEDIA_ERROR,
                    details: s.ErrorDetails.FRAG_PARSING_ERROR,
                    fatal: !0,
                    reason: "no demux matching with content found"
                  }),
                  r.executeEnd = n(),
                  [b(t)];
                var p = v.flush(f);
                return i(p) ? p.then((function(r) {
                  return e.flushRemux(c, r, t),
                  c
                }
                )) : (this.flushRemux(c, p, t),
                c)
              }
              ,
              e.flushRemux = function(t, e, r) {
                var i = e.audioTrack
                  , a = e.avcTrack
                  , s = e.id3Track
                  , o = e.textTrack
                  , l = this.currentTransmuxState
                  , u = l.accurateTimeOffset
                  , d = l.timeOffset
                  , c = this.remuxer.remux(i, a, s, o, d, u, !0, this.id);
                t.push({
                  remuxResult: c,
                  chunkMeta: r
                }),
                r.transmuxing.executeEnd = n()
              }
              ,
              e.resetInitialTimestamp = function(t) {
                var e = this.demuxer
                  , r = this.remuxer;
                e && r && (e.resetTimeStamp(t),
                r.resetTimeStamp(t))
              }
              ,
              e.resetContiguity = function() {
                var t = this.demuxer
                  , e = this.remuxer;
                t && e && (t.resetContiguity(),
                e.resetNextTimestamp())
              }
              ,
              e.resetInitSegment = function(t, e, r, i) {
                var n = this.demuxer
                  , a = this.remuxer;
                n && a && (n.resetInitSegment(e, r, i),
                a.resetInitSegment(t, e, r))
              }
              ,
              e.destroy = function() {
                this.demuxer && (this.demuxer.destroy(),
                this.demuxer = void 0),
                this.remuxer && (this.remuxer.destroy(),
                this.remuxer = void 0)
              }
              ,
              e.transmux = function(t, e, r, i, n) {
                return e && "SAMPLE-AES" === e.method ? this.transmuxSampleAes(t, e, r, i, n) : this.transmuxUnencrypted(t, r, i, n)
              }
              ,
              e.transmuxUnencrypted = function(t, e, r, i) {
                var n = this.demuxer.demux(t, e, !1, !this.config.progressive)
                  , a = n.audioTrack
                  , s = n.avcTrack
                  , o = n.id3Track
                  , l = n.textTrack;
                return {
                  remuxResult: this.remuxer.remux(a, s, o, l, e, r, !1, this.id),
                  chunkMeta: i
                }
              }
              ,
              e.transmuxSampleAes = function(t, e, r, i, n) {
                var a = this;
                return this.demuxer.demuxSampleAes(t, e, r).then((function(t) {
                  return {
                    remuxResult: a.remuxer.remux(t.audioTrack, t.avcTrack, t.id3Track, t.textTrack, r, i, !1, a.id),
                    chunkMeta: n
                  }
                }
                ))
              }
              ,
              e.configureTransmuxer = function(t, e) {
                for (var r, i = this.config, n = this.observer, a = this.typeSupported, s = this.vendor, o = e.audioCodec, l = e.defaultInitPts, d = e.duration, c = e.initSegmentData, f = e.videoCodec, g = 0, v = p.length; g < v; g++)
                  if (p[g].demux.probe(t)) {
                    r = p[g];
                    break
                  }
                r || (m.logger.warn("Failed to find demuxer by probing frag, treating as mp4 passthrough"),
                r = {
                  demux: u.default,
                  remux: h.default
                });
                var y = this.demuxer
                  , E = this.remuxer
                  , b = r.remux
                  , T = r.demux;
                E && E instanceof b || (this.remuxer = new b(n,i,a,s)),
                y && y instanceof T || (this.demuxer = new T(n,i,a),
                this.probe = T.probe),
                this.resetInitSegment(c, o, f, d),
                this.resetInitialTimestamp(l)
              }
              ,
              e.needsProbing = function(t, e, r) {
                return !this.demuxer || !this.remuxer || e || r
              }
              ,
              e.getDecrypter = function() {
                var t = this.decrypter;
                return t || (t = this.decrypter = new o.default(this.observer,this.config)),
                t
              }
              ,
              t
            }()
              , b = function(t) {
              return {
                remuxResult: {},
                chunkMeta: t
              }
            }
              , T = function(t, e, r, i, n) {
              this.audioCodec = void 0,
              this.videoCodec = void 0,
              this.initSegmentData = void 0,
              this.duration = void 0,
              this.defaultInitPts = void 0,
              this.audioCodec = t,
              this.videoCodec = e,
              this.initSegmentData = r,
              this.duration = i,
              this.defaultInitPts = n
            }
              , A = function(t, e, r, i, n) {
              this.discontinuity = void 0,
              this.contiguous = void 0,
              this.accurateTimeOffset = void 0,
              this.trackSwitch = void 0,
              this.timeOffset = void 0,
              this.discontinuity = t,
              this.contiguous = e,
              this.accurateTimeOffset = r,
              this.trackSwitch = i,
              this.timeOffset = n
            }
          },
          "./src/demux/tsdemuxer.ts": function(t, e, r) {
            "use strict";
            function i(t, e, r, i) {
              return {
                key: t,
                frame: !1,
                pts: e,
                dts: r,
                units: [],
                debug: i,
                length: 0
              }
            }
            function n(t, e) {
              return (31 & t[e + 10]) << 8 | t[e + 11]
            }
            function a(t, e, r, i) {
              var n = {
                audio: -1,
                avc: -1,
                id3: -1,
                isAAC: !0
              }
                , a = e + 3 + ((15 & t[e + 1]) << 8 | t[e + 2]) - 4;
              for (e += 12 + ((15 & t[e + 10]) << 8 | t[e + 11]); e < a; ) {
                var s = (31 & t[e + 1]) << 8 | t[e + 2];
                switch (t[e]) {
                case 207:
                  if (!i) {
                    p.logger.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream");
                    break
                  }
                case 15:
                  -1 === n.audio && (n.audio = s);
                  break;
                case 21:
                  -1 === n.id3 && (n.id3 = s);
                  break;
                case 219:
                  if (!i) {
                    p.logger.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream");
                    break
                  }
                case 27:
                  -1 === n.avc && (n.avc = s);
                  break;
                case 3:
                case 4:
                  r ? -1 === n.audio && (n.audio = s,
                  n.isAAC = !1) : p.logger.log("MPEG audio found, not supported in this browser");
                  break;
                case 36:
                  p.logger.warn("Unsupported HEVC stream type found")
                }
                e += 5 + ((15 & t[e + 3]) << 8 | t[e + 4])
              }
              return n
            }
            function s(t) {
              var e, r, i, n, a, s = 0, o = t.data;
              if (!t || 0 === t.size)
                return null;
              for (; 19 > o[0].length && 1 < o.length; ) {
                var l = new Uint8Array(o[0].length + o[1].length);
                l.set(o[0]),
                l.set(o[1], o[0].length),
                o[0] = l,
                o.splice(1, 1)
              }
              if (1 === ((e = o[0])[0] << 16) + (e[1] << 8) + e[2]) {
                if ((r = (e[4] << 8) + e[5]) && r > t.size - 6)
                  return null;
                var u = e[7];
                192 & u && (n = 536870912 * (14 & e[9]) + 4194304 * (255 & e[10]) + 16384 * (254 & e[11]) + 128 * (255 & e[12]) + (254 & e[13]) / 2,
                64 & u ? 54e5 < n - (a = 536870912 * (14 & e[14]) + 4194304 * (255 & e[15]) + 16384 * (254 & e[16]) + 128 * (255 & e[17]) + (254 & e[18]) / 2) && (p.logger.warn(Math.round((n - a) / 9e4) + "s delta between PTS and DTS, align them"),
                n = a) : a = n);
                var d = (i = e[8]) + 9;
                if (t.size <= d)
                  return null;
                t.size -= d;
                for (var c = new Uint8Array(t.size), f = 0, h = o.length; f < h; f++) {
                  var g = (e = o[f]).byteLength;
                  if (d) {
                    if (d > g) {
                      d -= g;
                      continue
                    }
                    e = e.subarray(d),
                    g -= d,
                    d = 0
                  }
                  c.set(e, s),
                  s += g
                }
                return r && (r -= i + 3),
                {
                  data: c,
                  pts: n,
                  dts: a,
                  len: r
                }
              }
              return null
            }
            function o(t, e) {
              if (t.units.length && t.frame) {
                if (void 0 === t.pts) {
                  var r = e.samples
                    , i = r.length;
                  if (!i)
                    return void e.dropped++;
                  var n = r[i - 1];
                  t.pts = n.pts,
                  t.dts = n.dts
                }
                e.samples.push(t)
              }
              t.debug.length && p.logger.log(t.pts + "/" + t.dts + ":" + t.debug)
            }
            function l(t, e) {
              var r = t.length;
              if (0 < r) {
                if (e.pts >= t[r - 1].pts)
                  t.push(e);
                else
                  for (var i = r - 1; 0 <= i; i--)
                    if (e.pts < t[i].pts) {
                      t.splice(i, 0, e);
                      break
                    }
              } else
                t.push(e)
            }
            function u(t) {
              for (var e = t.byteLength, r = [], i = 1; i < e - 2; )
                0 === t[i] && 0 === t[i + 1] && 3 === t[i + 2] ? (r.push(i + 2),
                i += 2) : i++;
              if (0 === r.length)
                return t;
              var n = e - r.length
                , a = new Uint8Array(n)
                , s = 0;
              for (i = 0; i < n; s++,
              i++)
                s === r[0] && (s++,
                r.shift()),
                a[i] = t[s];
              return a
            }
            r.r(e),
            r.d(e, "discardEPB", (function() {
              return u
            }
            ));
            var d = r("./src/demux/adts.ts")
              , c = r("./src/demux/mpegaudio.ts")
              , f = r("./src/demux/exp-golomb.ts")
              , h = r("./src/demux/id3.ts")
              , g = r("./src/demux/sample-aes.ts")
              , v = r("./src/events.ts")
              , m = r("./src/utils/mp4-tools.ts")
              , p = r("./src/utils/logger.ts")
              , y = r("./src/errors.ts")
              , E = {
              video: 1,
              audio: 2,
              id3: 3,
              text: 4
            }
              , b = function() {
              function t(t, e, r) {
                this.observer = void 0,
                this.config = void 0,
                this.typeSupported = void 0,
                this.sampleAes = null,
                this.pmtParsed = !1,
                this.audioCodec = void 0,
                this.videoCodec = void 0,
                this._duration = 0,
                this.aacLastPTS = null,
                this._initPTS = null,
                this._initDTS = null,
                this._pmtId = -1,
                this._avcTrack = void 0,
                this._audioTrack = void 0,
                this._id3Track = void 0,
                this._txtTrack = void 0,
                this.aacOverFlow = null,
                this.avcSample = null,
                this.remainderData = null,
                this.observer = t,
                this.config = e,
                this.typeSupported = r
              }
              t.probe = function(e) {
                var r = t.syncOffset(e);
                return !(0 > r || (r && p.logger.warn("MPEG2-TS detected but first sync word found @ offset " + r + ", junk ahead ?"),
                0))
              }
              ,
              t.syncOffset = function(t) {
                for (var e = Math.min(1e3, t.length - 564), r = 0; r < e; ) {
                  if (71 === t[r] && 71 === t[r + 188] && 71 === t[r + 376])
                    return r;
                  r++
                }
                return -1
              }
              ,
              t.createTrack = function(t, e) {
                return {
                  container: "video" === t || "audio" === t ? "video/mp2t" : void 0,
                  type: t,
                  id: E[t],
                  pid: -1,
                  inputTimeScale: 9e4,
                  sequenceNumber: 0,
                  samples: [],
                  dropped: 0,
                  duration: "audio" === t ? e : void 0
                }
              }
              ;
              var e = t.prototype;
              return e.resetInitSegment = function(e, r, i) {
                this.pmtParsed = !1,
                this._pmtId = -1,
                this._avcTrack = t.createTrack("video", i),
                this._audioTrack = t.createTrack("audio", i),
                this._id3Track = t.createTrack("id3", i),
                this._txtTrack = t.createTrack("text", i),
                this._audioTrack.isAAC = !0,
                this.aacOverFlow = null,
                this.aacLastPTS = null,
                this.avcSample = null,
                this.audioCodec = e,
                this.videoCodec = r,
                this._duration = i
              }
              ,
              e.resetTimeStamp = function() {}
              ,
              e.resetContiguity = function() {
                var t = this._audioTrack
                  , e = this._avcTrack
                  , r = this._id3Track;
                t && (t.pesData = null),
                e && (e.pesData = null),
                r && (r.pesData = null),
                this.aacOverFlow = null,
                this.aacLastPTS = null
              }
              ,
              e.demux = function(e, r, i, o) {
                void 0 === i && (i = !1),
                void 0 === o && (o = !1),
                i || (this.sampleAes = null);
                var l, u = this._avcTrack, d = this._audioTrack, c = this._id3Track, f = u.pid, h = u.pesData, g = d.pid, E = c.pid, b = d.pesData, T = c.pesData, A = !1, S = this.pmtParsed, L = this._pmtId, k = e.length;
                if (this.remainderData && (k = (e = Object(m.appendUint8Array)(this.remainderData, e)).length,
                this.remainderData = null),
                188 > k && !o)
                  return this.remainderData = e,
                  {
                    audioTrack: d,
                    avcTrack: u,
                    id3Track: c,
                    textTrack: this._txtTrack
                  };
                var D = Math.max(0, t.syncOffset(e));
                (k -= (k + D) % 188) < e.byteLength && !o && (this.remainderData = new Uint8Array(e.buffer,k,e.buffer.byteLength - k));
                for (var _ = D; _ < k; _ += 188)
                  if (71 === e[_]) {
                    var R = !!(64 & e[_ + 1])
                      , C = ((31 & e[_ + 1]) << 8) + e[_ + 2]
                      , I = void 0;
                    if (1 < (48 & e[_ + 3]) >> 4) {
                      if ((I = _ + 5 + e[_ + 4]) === _ + 188)
                        continue
                    } else
                      I = _ + 4;
                    switch (C) {
                    case f:
                      R && (h && (l = s(h)) && this.parseAVCPES(l, !1),
                      h = {
                        data: [],
                        size: 0
                      }),
                      h && (h.data.push(e.subarray(I, _ + 188)),
                      h.size += _ + 188 - I);
                      break;
                    case g:
                      R && (b && (l = s(b)) && (d.isAAC ? this.parseAACPES(l) : this.parseMPEGPES(l)),
                      b = {
                        data: [],
                        size: 0
                      }),
                      b && (b.data.push(e.subarray(I, _ + 188)),
                      b.size += _ + 188 - I);
                      break;
                    case E:
                      R && (T && (l = s(T)) && this.parseID3PES(l),
                      T = {
                        data: [],
                        size: 0
                      }),
                      T && (T.data.push(e.subarray(I, _ + 188)),
                      T.size += _ + 188 - I);
                      break;
                    case 0:
                      R && (I += e[I] + 1),
                      L = this._pmtId = n(e, I);
                      break;
                    case L:
                      R && (I += e[I] + 1);
                      var x = a(e, I, !0 === this.typeSupported.mpeg || !0 === this.typeSupported.mp3, i);
                      0 < (f = x.avc) && (u.pid = f),
                      0 < (g = x.audio) && (d.pid = g,
                      d.isAAC = x.isAAC),
                      0 < (E = x.id3) && (c.pid = E),
                      A && !S && (p.logger.log("reparse from beginning"),
                      A = !1,
                      _ = D - 188),
                      S = this.pmtParsed = !0;
                      break;
                    case 17:
                    case 8191:
                      break;
                    default:
                      A = !0
                    }
                  } else
                    this.observer.emit(v.Events.ERROR, v.Events.ERROR, {
                      type: y.ErrorTypes.MEDIA_ERROR,
                      details: y.ErrorDetails.FRAG_PARSING_ERROR,
                      fatal: !1,
                      reason: "TS packet did not start with 0x47"
                    });
                u.pesData = h,
                d.pesData = b,
                c.pesData = T;
                var w = {
                  audioTrack: d,
                  avcTrack: u,
                  id3Track: c,
                  textTrack: this._txtTrack
                };
                return o && this.extractRemainingSamples(w),
                w
              }
              ,
              e.flush = function() {
                var t, e = this.remainderData;
                return this.remainderData = null,
                t = e ? this.demux(e, -1, !1, !0) : {
                  audioTrack: this._audioTrack,
                  avcTrack: this._avcTrack,
                  textTrack: this._txtTrack,
                  id3Track: this._id3Track
                },
                this.extractRemainingSamples(t),
                this.sampleAes ? this.decrypt(t, this.sampleAes) : t
              }
              ,
              e.extractRemainingSamples = function(t) {
                var e, r = t.audioTrack, i = t.avcTrack, n = t.id3Track, a = i.pesData, o = r.pesData, l = n.pesData;
                a && (e = s(a)) ? (this.parseAVCPES(e, !0),
                i.pesData = null) : i.pesData = a,
                o && (e = s(o)) ? (r.isAAC ? this.parseAACPES(e) : this.parseMPEGPES(e),
                r.pesData = null) : (null != o && o.size && p.logger.log("last AAC PES packet truncated,might overlap between fragments"),
                r.pesData = o),
                l && (e = s(l)) ? (this.parseID3PES(e),
                n.pesData = null) : n.pesData = l
              }
              ,
              e.demuxSampleAes = function(t, e, r) {
                var i = this.demux(t, r, !0, !this.config.progressive)
                  , n = this.sampleAes = new g.default(this.observer,this.config,e);
                return this.decrypt(i, n)
              }
              ,
              e.decrypt = function(t, e) {
                return new Promise((function(r) {
                  var i = t.audioTrack
                    , n = t.avcTrack;
                  i.samples && i.isAAC ? e.decryptAacSamples(i.samples, 0, (function() {
                    n.samples ? e.decryptAvcSamples(n.samples, 0, 0, (function() {
                      r(t)
                    }
                    )) : r(t)
                  }
                  )) : n.samples && e.decryptAvcSamples(n.samples, 0, 0, (function() {
                    r(t)
                  }
                  ))
                }
                ))
              }
              ,
              e.destroy = function() {
                this._initPTS = this._initDTS = null,
                this._duration = 0
              }
              ,
              e.parseAVCPES = function(t, e) {
                var r, n = this, a = this._avcTrack, s = this.parseAVCNALu(t.data), d = this.avcSample, c = !1;
                t.data = null,
                d && s.length && !a.audFound && (o(d, a),
                d = this.avcSample = i(!1, t.pts, t.dts, "")),
                s.forEach((function(e) {
                  switch (e.type) {
                  case 1:
                    r = !0,
                    d || (d = n.avcSample = i(!0, t.pts, t.dts, "")),
                    d.frame = !0;
                    var s = e.data;
                    if (c && 4 < s.length) {
                      var g = new f.default(s).readSliceType();
                      (2 === g || 4 === g || 7 === g || 9 === g) && (d.key = !0)
                    }
                    break;
                  case 5:
                    r = !0,
                    d || (d = n.avcSample = i(!0, t.pts, t.dts, "")),
                    d.key = !0,
                    d.frame = !0;
                    break;
                  case 6:
                    r = !0;
                    var v = new f.default(u(e.data));
                    v.readUByte();
                    for (var m = 0, p = 0, y = !1, E = 0; !y && 1 < v.bytesAvailable; ) {
                      m = 0;
                      do {
                        m += E = v.readUByte()
                      } while (255 === E);p = 0;
                      do {
                        p += E = v.readUByte()
                      } while (255 === E);if (4 === m && 0 !== v.bytesAvailable) {
                        if (y = !0,
                        181 === v.readUByte() && 49 === v.readUShort() && 1195456820 === v.readUInt() && 3 === v.readUByte()) {
                          for (var b = v.readUByte(), T = 31 & b, A = [b, v.readUByte()], S = 0; S < T; S++)
                            A.push(v.readUByte()),
                            A.push(v.readUByte()),
                            A.push(v.readUByte());
                          l(n._txtTrack.samples, {
                            type: 3,
                            pts: t.pts,
                            bytes: A
                          })
                        }
                      } else if (5 === m && 0 !== v.bytesAvailable) {
                        if (y = !0,
                        16 < p) {
                          for (var L = [], k = 0; 16 > k; k++)
                            L.push(v.readUByte().toString(16)),
                            (3 == k || 5 === k || 7 === k || 9 === k) && L.push("-");
                          for (var D = p - 16, _ = new Uint8Array(D), R = 0; R < D; R++)
                            _[R] = v.readUByte();
                          l(n._txtTrack.samples, {
                            pts: t.pts,
                            payloadType: m,
                            uuid: L.join(""),
                            userData: Object(h.utf8ArrayToStr)(_),
                            userDataBytes: _
                          })
                        }
                      } else if (p < v.bytesAvailable)
                        for (var C = 0; C < p; C++)
                          v.readUByte()
                    }
                    break;
                  case 7:
                    if (r = !0,
                    c = !0,
                    !a.sps) {
                      var I = new f.default(e.data).readSPS();
                      a.width = I.width,
                      a.height = I.height,
                      a.pixelRatio = I.pixelRatio,
                      a.sps = [e.data],
                      a.duration = n._duration;
                      for (var x, w = e.data.subarray(1, 4), O = "avc1.", P = 0; 3 > P; P++)
                        2 > (x = w[P].toString(16)).length && (x = "0" + x),
                        O += x;
                      a.codec = O
                    }
                    break;
                  case 8:
                    r = !0,
                    a.pps || (a.pps = [e.data]);
                    break;
                  case 9:
                    r = !1,
                    a.audFound = !0,
                    d && o(d, a),
                    d = n.avcSample = i(!1, t.pts, t.dts, "");
                    break;
                  case 12:
                    r = !1;
                    break;
                  default:
                    r = !1,
                    d && (d.debug += "unknown NAL " + e.type + " ")
                  }
                  d && r && d.units.push(e)
                }
                )),
                e && d && (o(d, a),
                this.avcSample = null)
              }
              ,
              e.getLastNalUnit = function() {
                var t, e, r = this.avcSample;
                if (!r || 0 === r.units.length) {
                  var i = this._avcTrack.samples;
                  r = i[i.length - 1]
                }
                if (null !== (t = r) && void 0 !== t && t.units) {
                  var n = r.units;
                  e = n[n.length - 1]
                }
                return e
              }
              ,
              e.parseAVCNALu = function(t) {
                var e, r, i = t.byteLength, n = this._avcTrack, a = n.naluState || 0, s = a, o = [], l = 0, u = -1, d = 0;
                for (-1 === a && (u = 0,
                d = 31 & t[0],
                a = 0,
                l = 1); l < i; )
                  if (e = t[l++],
                  a)
                    if (1 !== a)
                      if (e)
                        if (1 === e) {
                          if (0 <= u) {
                            var c = {
                              data: t.subarray(u, l - a - 1),
                              type: d
                            };
                            o.push(c)
                          } else {
                            var f = this.getLastNalUnit();
                            if (f && (s && l <= 4 - s && f.state && (f.data = f.data.subarray(0, f.data.byteLength - s)),
                            0 < (r = l - a - 1))) {
                              var h = new Uint8Array(f.data.byteLength + r);
                              h.set(f.data, 0),
                              h.set(t.subarray(0, r), f.data.byteLength),
                              f.data = h
                            }
                          }
                          l < i ? (u = l,
                          d = 31 & t[l],
                          a = 0) : a = -1
                        } else
                          a = 0;
                      else
                        a = 3;
                    else
                      a = e ? 0 : 2;
                  else
                    a = e ? 0 : 1;
                if (0 <= u && 0 <= a) {
                  var g = {
                    data: t.subarray(u, i),
                    type: d,
                    state: a
                  };
                  o.push(g)
                }
                if (0 === o.length) {
                  var v = this.getLastNalUnit();
                  if (v) {
                    var m = new Uint8Array(v.data.byteLength + t.byteLength);
                    m.set(v.data, 0),
                    m.set(t, v.data.byteLength),
                    v.data = m
                  }
                }
                return n.naluState = a,
                o
              }
              ,
              e.parseAACPES = function(t) {
                var e, r, i, n, a, s = 0, o = this._audioTrack, l = this.aacOverFlow, u = t.data;
                if (l) {
                  this.aacOverFlow = null;
                  var c = l.sample.unit.byteLength
                    , f = Math.min(l.missing, c)
                    , h = c - f;
                  l.sample.unit.set(u.subarray(0, f), h),
                  o.samples.push(l.sample),
                  s = l.missing
                }
                for (e = s,
                r = u.length; e < r - 1 && !d.isHeader(u, e); e++)
                  ;
                if (e === s || (e < r - 1 ? (i = "AAC PES did not start with ADTS header,offset:" + e,
                n = !1) : (i = "no ADTS header found in AAC PES",
                n = !0),
                p.logger.warn("parsing error:" + i),
                this.observer.emit(v.Events.ERROR, v.Events.ERROR, {
                  type: y.ErrorTypes.MEDIA_ERROR,
                  details: y.ErrorDetails.FRAG_PARSING_ERROR,
                  fatal: n,
                  reason: i
                }),
                !n)) {
                  if (d.initTrackConfig(o, this.observer, u, e, this.audioCodec),
                  void 0 !== t.pts)
                    a = t.pts;
                  else {
                    if (!l)
                      return void p.logger.warn("[tsdemuxer]: AAC PES unknown PTS");
                    var g = d.getFrameDuration(o.samplerate);
                    a = l.sample.pts + g
                  }
                  for (var m = 0; e < r; ) {
                    if (d.isHeader(u, e)) {
                      if (e + 5 < r) {
                        var E = d.appendFrame(o, u, e, a, m);
                        if (E) {
                          if (!E.missing) {
                            e += E.length,
                            m++;
                            continue
                          }
                          this.aacOverFlow = E
                        }
                      }
                      break
                    }
                    e++
                  }
                }
              }
              ,
              e.parseMPEGPES = function(t) {
                var e = t.data
                  , r = e.length
                  , i = 0
                  , n = 0
                  , a = t.pts;
                if (void 0 !== a)
                  for (; n < r; )
                    if (c.isHeader(e, n)) {
                      var s = c.appendFrame(this._audioTrack, e, n, a, i);
                      if (!s)
                        break;
                      n += s.length,
                      i++
                    } else
                      n++;
                else
                  p.logger.warn("[tsdemuxer]: MPEG PES unknown PTS")
              }
              ,
              e.parseID3PES = function(t) {
                return void 0 === t.pts ? void p.logger.warn("[tsdemuxer]: ID3 PES unknown PTS") : void this._id3Track.samples.push(t)
              }
              ,
              t
            }();
            b.minProbeByteLength = 188,
            e.default = b
          },
          "./src/empty.js": function(t, e) {
            t.exports = void 0
          },
          "./src/errors.ts": function(t, e, r) {
            "use strict";
            var i, n;
            r.r(e),
            r.d(e, "ErrorTypes", (function() {
              return i
            }
            )),
            r.d(e, "ErrorDetails", (function() {
              return n
            }
            )),
            function(t) {
              t.NETWORK_ERROR = "networkError",
              t.MEDIA_ERROR = "mediaError",
              t.KEY_SYSTEM_ERROR = "keySystemError",
              t.MUX_ERROR = "muxError",
              t.OTHER_ERROR = "otherError"
            }(i || (i = {})),
            function(t) {
              t.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys",
              t.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess",
              t.KEY_SYSTEM_NO_SESSION = "keySystemNoSession",
              t.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed",
              t.KEY_SYSTEM_NO_INIT_DATA = "keySystemNoInitData",
              t.MANIFEST_LOAD_ERROR = "manifestLoadError",
              t.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut",
              t.MANIFEST_PARSING_ERROR = "manifestParsingError",
              t.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError",
              t.LEVEL_EMPTY_ERROR = "levelEmptyError",
              t.LEVEL_LOAD_ERROR = "levelLoadError",
              t.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut",
              t.LEVEL_SWITCH_ERROR = "levelSwitchError",
              t.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError",
              t.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut",
              t.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError",
              t.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut",
              t.FRAG_LOAD_ERROR = "fragLoadError",
              t.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut",
              t.FRAG_DECRYPT_ERROR = "fragDecryptError",
              t.FRAG_PARSING_ERROR = "fragParsingError",
              t.REMUX_ALLOC_ERROR = "remuxAllocError",
              t.KEY_LOAD_ERROR = "keyLoadError",
              t.KEY_LOAD_TIMEOUT = "keyLoadTimeOut",
              t.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError",
              t.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError",
              t.BUFFER_APPEND_ERROR = "bufferAppendError",
              t.BUFFER_APPENDING_ERROR = "bufferAppendingError",
              t.BUFFER_STALLED_ERROR = "bufferStalledError",
              t.BUFFER_FULL_ERROR = "bufferFullError",
              t.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole",
              t.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall",
              t.INTERNAL_EXCEPTION = "internalException",
              t.INTERNAL_ABORTED = "aborted",
              t.UNKNOWN = "unknown"
            }(n || (n = {}))
          },
          "./src/events.ts": function(t, e, r) {
            "use strict";
            var i;
            r.r(e),
            r.d(e, "Events", (function() {
              return i
            }
            )),
            function(t) {
              t.MEDIA_ATTACHING = "hlsMediaAttaching",
              t.MEDIA_ATTACHED = "hlsMediaAttached",
              t.MEDIA_DETACHING = "hlsMediaDetaching",
              t.MEDIA_DETACHED = "hlsMediaDetached",
              t.BUFFER_RESET = "hlsBufferReset",
              t.BUFFER_CODECS = "hlsBufferCodecs",
              t.BUFFER_CREATED = "hlsBufferCreated",
              t.BUFFER_APPENDING = "hlsBufferAppending",
              t.BUFFER_APPENDED = "hlsBufferAppended",
              t.BUFFER_EOS = "hlsBufferEos",
              t.BUFFER_FLUSHING = "hlsBufferFlushing",
              t.BUFFER_FLUSHED = "hlsBufferFlushed",
              t.MANIFEST_LOADING = "hlsManifestLoading",
              t.MANIFEST_LOADED = "hlsManifestLoaded",
              t.MANIFEST_PARSED = "hlsManifestParsed",
              t.LEVEL_SWITCHING = "hlsLevelSwitching",
              t.LEVEL_SWITCHED = "hlsLevelSwitched",
              t.LEVEL_LOADING = "hlsLevelLoading",
              t.LEVEL_LOADED = "hlsLevelLoaded",
              t.LEVEL_UPDATED = "hlsLevelUpdated",
              t.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated",
              t.LEVELS_UPDATED = "hlsLevelsUpdated",
              t.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated",
              t.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching",
              t.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched",
              t.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading",
              t.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded",
              t.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated",
              t.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared",
              t.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch",
              t.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading",
              t.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded",
              t.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed",
              t.CUES_PARSED = "hlsCuesParsed",
              t.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound",
              t.INIT_PTS_FOUND = "hlsInitPtsFound",
              t.FRAG_LOADING = "hlsFragLoading",
              t.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted",
              t.FRAG_LOADED = "hlsFragLoaded",
              t.FRAG_DECRYPTED = "hlsFragDecrypted",
              t.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment",
              t.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata",
              t.FRAG_PARSING_METADATA = "hlsFragParsingMetadata",
              t.FRAG_PARSED = "hlsFragParsed",
              t.FRAG_BUFFERED = "hlsFragBuffered",
              t.FRAG_CHANGED = "hlsFragChanged",
              t.FPS_DROP = "hlsFpsDrop",
              t.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping",
              t.ERROR = "hlsError",
              t.DESTROYING = "hlsDestroying",
              t.KEY_LOADING = "hlsKeyLoading",
              t.KEY_LOADED = "hlsKeyLoaded",
              t.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached",
              t.BACK_BUFFER_REACHED = "hlsBackBufferReached"
            }(i || (i = {}))
          },
          "./src/hls.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            r.r(e),
            r.d(e, "default", (function() {
              return y
            }
            ));
            var n = r("./node_modules/url-toolkit/src/url-toolkit.js")
              , a = r("./src/loader/playlist-loader.ts")
              , s = r("./src/loader/key-loader.ts")
              , o = r("./src/controller/id3-track-controller.ts")
              , l = r("./src/controller/latency-controller.ts")
              , u = r("./src/controller/level-controller.ts")
              , d = r("./src/controller/fragment-tracker.ts")
              , c = r("./src/controller/stream-controller.ts")
              , f = r("./src/is-supported.ts")
              , h = r("./src/utils/logger.ts")
              , g = r("./src/config.ts")
              , v = r("./node_modules/eventemitter3/index.js")
              , m = r("./src/events.ts")
              , p = r("./src/errors.ts")
              , y = function() {
              function t(e) {
                void 0 === e && (e = {}),
                this.config = void 0,
                this.userConfig = void 0,
                this.coreComponents = void 0,
                this.networkControllers = void 0,
                this._emitter = new v.EventEmitter,
                this._autoLevelCapping = void 0,
                this.abrController = void 0,
                this.bufferController = void 0,
                this.capLevelController = void 0,
                this.latencyController = void 0,
                this.levelController = void 0,
                this.streamController = void 0,
                this.audioTrackController = void 0,
                this.subtitleTrackController = void 0,
                this.emeController = void 0,
                this._media = null,
                this.url = null;
                var r = this.config = Object(g.mergeConfig)(t.DefaultConfig, e);
                this.userConfig = e,
                Object(h.enableLogs)(r.debug),
                this._autoLevelCapping = -1,
                r.progressive && Object(g.enableStreamingMode)(r);
                var i = r.abrController
                  , n = r.bufferController
                  , f = r.capLevelController
                  , m = r.fpsController
                  , p = this.abrController = new i(this)
                  , y = this.bufferController = new n(this)
                  , E = this.capLevelController = new f(this)
                  , b = new m(this)
                  , T = new a.default(this)
                  , A = new s.default(this)
                  , S = new o.default(this)
                  , L = this.levelController = new u.default(this)
                  , k = new d.FragmentTracker(this)
                  , D = this.streamController = new c.default(this,k);
                E.setStreamController(D),
                b.setStreamController(D);
                var _ = [L, D];
                this.networkControllers = _;
                var R = [T, A, p, y, E, b, S, k];
                this.audioTrackController = this.createController(r.audioTrackController, null, _),
                this.createController(r.audioStreamController, k, _),
                this.subtitleTrackController = this.createController(r.subtitleTrackController, null, _),
                this.createController(r.subtitleStreamController, k, _),
                this.createController(r.timelineController, null, R),
                this.emeController = this.createController(r.emeController, null, R),
                this.latencyController = this.createController(l.default, null, R),
                this.coreComponents = R
              }
              t.isSupported = function() {
                return Object(f.isSupported)()
              }
              ;
              var e, r, y, E = t.prototype;
              return E.createController = function(t, e, r) {
                if (t) {
                  var i = e ? new t(this,e) : new t(this);
                  return r && r.push(i),
                  i
                }
                return null
              }
              ,
              E.on = function(t, e, r) {
                void 0 === r && (r = this),
                this._emitter.on(t, e, r)
              }
              ,
              E.once = function(t, e, r) {
                void 0 === r && (r = this),
                this._emitter.once(t, e, r)
              }
              ,
              E.removeAllListeners = function(t) {
                this._emitter.removeAllListeners(t)
              }
              ,
              E.off = function(t, e, r, i) {
                void 0 === r && (r = this),
                this._emitter.off(t, e, r, i)
              }
              ,
              E.listeners = function(t) {
                return this._emitter.listeners(t)
              }
              ,
              E.emit = function(t, e, r) {
                return this._emitter.emit(t, e, r)
              }
              ,
              E.trigger = function(t, e) {
                if (this.config.debug)
                  return this.emit(t, t, e);
                try {
                  return this.emit(t, t, e)
                } catch (e) {
                  h.logger.error("An internal error happened while handling event " + t + '. Error message: "' + e.message + '". Here is a stacktrace:', e),
                  this.trigger(m.Events.ERROR, {
                    type: p.ErrorTypes.OTHER_ERROR,
                    details: p.ErrorDetails.INTERNAL_EXCEPTION,
                    fatal: !1,
                    event: t,
                    error: e
                  })
                }
                return !1
              }
              ,
              E.listenerCount = function(t) {
                return this._emitter.listenerCount(t)
              }
              ,
              E.destroy = function() {
                h.logger.log("destroy"),
                this.trigger(m.Events.DESTROYING, void 0),
                this.detachMedia(),
                this.removeAllListeners(),
                this._autoLevelCapping = -1,
                this.url = null,
                this.networkControllers.forEach((function(t) {
                  return t.destroy()
                }
                )),
                this.networkControllers.length = 0,
                this.coreComponents.forEach((function(t) {
                  return t.destroy()
                }
                )),
                this.coreComponents.length = 0
              }
              ,
              E.attachMedia = function(t) {
                h.logger.log("attachMedia"),
                this._media = t,
                this.trigger(m.Events.MEDIA_ATTACHING, {
                  media: t
                })
              }
              ,
              E.detachMedia = function() {
                h.logger.log("detachMedia"),
                this.trigger(m.Events.MEDIA_DETACHING, void 0),
                this._media = null
              }
              ,
              E.loadSource = function(t) {
                this.stopLoad();
                var e = this.media
                  , r = this.url
                  , i = this.url = n.buildAbsoluteURL(self.location.href, t, {
                  alwaysNormalize: !0
                });
                h.logger.log("loadSource:" + i),
                e && r && r !== i && this.bufferController.hasSourceTypes() && (this.detachMedia(),
                this.attachMedia(e)),
                this.trigger(m.Events.MANIFEST_LOADING, {
                  url: t
                })
              }
              ,
              E.startLoad = function(t) {
                void 0 === t && (t = -1),
                h.logger.log("startLoad(" + t + ")"),
                this.networkControllers.forEach((function(e) {
                  e.startLoad(t)
                }
                ))
              }
              ,
              E.stopLoad = function() {
                h.logger.log("stopLoad"),
                this.networkControllers.forEach((function(t) {
                  t.stopLoad()
                }
                ))
              }
              ,
              E.swapAudioCodec = function() {
                h.logger.log("swapAudioCodec"),
                this.streamController.swapAudioCodec()
              }
              ,
              E.recoverMediaError = function() {
                h.logger.log("recoverMediaError");
                var t = this._media;
                this.detachMedia(),
                t && this.attachMedia(t)
              }
              ,
              E.removeLevel = function(t, e) {
                void 0 === e && (e = 0),
                this.levelController.removeLevel(t, e)
              }
              ,
              e = t,
              y = [{
                key: "version",
                get: function() {
                  return "1.0.10"
                }
              }, {
                key: "Events",
                get: function() {
                  return m.Events
                }
              }, {
                key: "ErrorTypes",
                get: function() {
                  return p.ErrorTypes
                }
              }, {
                key: "ErrorDetails",
                get: function() {
                  return p.ErrorDetails
                }
              }, {
                key: "DefaultConfig",
                get: function() {
                  return t.defaultConfig ? t.defaultConfig : g.hlsDefaultConfig
                },
                set: function(e) {
                  t.defaultConfig = e
                }
              }],
              (r = [{
                key: "levels",
                get: function() {
                  var t = this.levelController.levels;
                  return t || []
                }
              }, {
                key: "currentLevel",
                get: function() {
                  return this.streamController.currentLevel
                },
                set: function(t) {
                  h.logger.log("set currentLevel:" + t),
                  this.loadLevel = t,
                  this.abrController.clearTimer(),
                  this.streamController.immediateLevelSwitch()
                }
              }, {
                key: "nextLevel",
                get: function() {
                  return this.streamController.nextLevel
                },
                set: function(t) {
                  h.logger.log("set nextLevel:" + t),
                  this.levelController.manualLevel = t,
                  this.streamController.nextLevelSwitch()
                }
              }, {
                key: "loadLevel",
                get: function() {
                  return this.levelController.level
                },
                set: function(t) {
                  h.logger.log("set loadLevel:" + t),
                  this.levelController.manualLevel = t
                }
              }, {
                key: "nextLoadLevel",
                get: function() {
                  return this.levelController.nextLoadLevel
                },
                set: function(t) {
                  this.levelController.nextLoadLevel = t
                }
              }, {
                key: "firstLevel",
                get: function() {
                  return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                },
                set: function(t) {
                  h.logger.log("set firstLevel:" + t),
                  this.levelController.firstLevel = t
                }
              }, {
                key: "startLevel",
                get: function() {
                  return this.levelController.startLevel
                },
                set: function(t) {
                  h.logger.log("set startLevel:" + t),
                  -1 !== t && (t = Math.max(t, this.minAutoLevel)),
                  this.levelController.startLevel = t
                }
              }, {
                key: "capLevelToPlayerSize",
                get: function() {
                  return this.config.capLevelToPlayerSize
                },
                set: function(t) {
                  var e = !!t;
                  e !== this.config.capLevelToPlayerSize && (e ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(),
                  this.autoLevelCapping = -1,
                  this.streamController.nextLevelSwitch()),
                  this.config.capLevelToPlayerSize = e)
                }
              }, {
                key: "autoLevelCapping",
                get: function() {
                  return this._autoLevelCapping
                },
                set: function(t) {
                  this._autoLevelCapping !== t && (h.logger.log("set autoLevelCapping:" + t),
                  this._autoLevelCapping = t)
                }
              }, {
                key: "bandwidthEstimate",
                get: function() {
                  var t = this.abrController.bwEstimator;
                  return t ? t.getEstimate() : NaN
                }
              }, {
                key: "autoLevelEnabled",
                get: function() {
                  return -1 === this.levelController.manualLevel
                }
              }, {
                key: "manualLevel",
                get: function() {
                  return this.levelController.manualLevel
                }
              }, {
                key: "minAutoLevel",
                get: function() {
                  var t = this.levels
                    , e = this.config.minAutoBitrate;
                  if (!t)
                    return 0;
                  for (var r = t.length, i = 0; i < r; i++)
                    if (t[i].maxBitrate > e)
                      return i;
                  return 0
                }
              }, {
                key: "maxAutoLevel",
                get: function() {
                  var t = this.levels
                    , e = this.autoLevelCapping;
                  return -1 === e && t && t.length ? t.length - 1 : e
                }
              }, {
                key: "nextAutoLevel",
                get: function() {
                  return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel)
                },
                set: function(t) {
                  this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, t)
                }
              }, {
                key: "audioTracks",
                get: function() {
                  var t = this.audioTrackController;
                  return t ? t.audioTracks : []
                }
              }, {
                key: "audioTrack",
                get: function() {
                  var t = this.audioTrackController;
                  return t ? t.audioTrack : -1
                },
                set: function(t) {
                  var e = this.audioTrackController;
                  e && (e.audioTrack = t)
                }
              }, {
                key: "subtitleTracks",
                get: function() {
                  var t = this.subtitleTrackController;
                  return t ? t.subtitleTracks : []
                }
              }, {
                key: "subtitleTrack",
                get: function() {
                  var t = this.subtitleTrackController;
                  return t ? t.subtitleTrack : -1
                },
                set: function(t) {
                  var e = this.subtitleTrackController;
                  e && (e.subtitleTrack = t)
                }
              }, {
                key: "media",
                get: function() {
                  return this._media
                }
              }, {
                key: "subtitleDisplay",
                get: function() {
                  var t = this.subtitleTrackController;
                  return !!t && t.subtitleDisplay
                },
                set: function(t) {
                  var e = this.subtitleTrackController;
                  e && (e.subtitleDisplay = t)
                }
              }, {
                key: "lowLatencyMode",
                get: function() {
                  return this.config.lowLatencyMode
                },
                set: function(t) {
                  this.config.lowLatencyMode = t
                }
              }, {
                key: "liveSyncPosition",
                get: function() {
                  return this.latencyController.liveSyncPosition
                }
              }, {
                key: "latency",
                get: function() {
                  return this.latencyController.latency
                }
              }, {
                key: "maxLatency",
                get: function() {
                  return this.latencyController.maxLatency
                }
              }, {
                key: "targetLatency",
                get: function() {
                  return this.latencyController.targetLatency
                }
              }, {
                key: "drift",
                get: function() {
                  return this.latencyController.drift
                }
              }, {
                key: "forceStartLoad",
                get: function() {
                  return this.streamController.forceStartLoad
                }
              }]) && i(e.prototype, r),
              y && i(e, y),
              t
            }();
            y.defaultConfig = void 0
          },
          "./src/is-supported.ts": function(t, e, r) {
            "use strict";
            function i() {
              return self.SourceBuffer || self.WebKitSourceBuffer
            }
            function n() {
              var t = Object(s.getMediaSource)();
              if (!t)
                return !1;
              var e = i()
                , r = t && "function" == typeof t.isTypeSupported && t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                , n = !e || e.prototype && "function" == typeof e.prototype.appendBuffer && "function" == typeof e.prototype.remove;
              return !!r && !!n
            }
            function a() {
              var t, e = i();
              return "function" == typeof (null == e || null === (t = e.prototype) || void 0 === t ? void 0 : t.changeType)
            }
            r.r(e),
            r.d(e, "isSupported", (function() {
              return n
            }
            )),
            r.d(e, "changeTypeSupported", (function() {
              return a
            }
            ));
            var s = r("./src/utils/mediasource-helper.ts")
          },
          "./src/loader/fragment-loader.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              var e = "function" == typeof Map ? new Map : void 0;
              return (i = function(t) {
                function r() {
                  return n(t, arguments, o(this).constructor)
                }
                if (null === t || (i = t,
                -1 === Function.toString.call(i).indexOf("[native code]")))
                  return t;
                var i;
                if ("function" != typeof t)
                  throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== e) {
                  if (e.has(t))
                    return e.get(t);
                  e.set(t, r)
                }
                return r.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                  }
                }),
                s(r, t)
              }
              )(t)
            }
            function n(t, e, r) {
              return (n = a() ? Reflect.construct : function(t, e, r) {
                var i = [null];
                i.push.apply(i, e);
                var n = new (Function.bind.apply(t, i));
                return r && s(n, r.prototype),
                n
              }
              ).apply(null, arguments)
            }
            function a() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham)
                return !1;
              if ("function" == typeof Proxy)
                return !0;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
              } catch (t) {
                return !1
              }
            }
            function s(t, e) {
              return (s = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            function o(t) {
              return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
              }
              )(t)
            }
            function l(t, e) {
              void 0 === e && (e = null);
              var r = e || t
                , i = {
                frag: t,
                part: e,
                responseType: "arraybuffer",
                url: r.url,
                rangeStart: 0,
                rangeEnd: 0
              }
                , n = r.byteRangeStartOffset
                , a = r.byteRangeEndOffset;
              return Object(u.isFiniteNumber)(n) && Object(u.isFiniteNumber)(a) && (i.rangeStart = n,
              i.rangeEnd = a),
              i
            }
            r.r(e),
            r.d(e, "default", (function() {
              return c
            }
            )),
            r.d(e, "LoadError", (function() {
              return f
            }
            ));
            var u = r("./src/polyfills/number.ts")
              , d = r("./src/errors.ts")
              , c = (Math.pow(2, 17),
            function() {
              function t(t) {
                this.config = void 0,
                this.loader = null,
                this.partLoadTimeout = -1,
                this.config = t
              }
              var e = t.prototype;
              return e.destroy = function() {
                this.loader && (this.loader.destroy(),
                this.loader = null)
              }
              ,
              e.abort = function() {
                this.loader && this.loader.abort()
              }
              ,
              e.load = function(t, e) {
                var r = this
                  , i = t.url;
                if (!i)
                  return Promise.reject(new f({
                    type: d.ErrorTypes.NETWORK_ERROR,
                    details: d.ErrorDetails.FRAG_LOAD_ERROR,
                    fatal: !1,
                    frag: t,
                    networkDetails: null
                  },"Fragment does not have a " + (i ? "part list" : "url")));
                this.abort();
                var n = this.config
                  , a = n.fLoader
                  , s = n.loader;
                return new Promise((function(i, o) {
                  r.loader && r.loader.destroy();
                  var u = r.loader = t.loader = a ? new a(n) : new s(n)
                    , c = l(t)
                    , h = {
                    timeout: n.fragLoadingTimeOut,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: n.fragLoadingMaxRetryTimeout,
                    highWaterMark: 131072
                  };
                  t.stats = u.stats,
                  u.load(c, h, {
                    onSuccess: function(e, n, a, s) {
                      r.resetLoader(t, u),
                      i({
                        frag: t,
                        part: null,
                        payload: e.data,
                        networkDetails: s
                      })
                    },
                    onError: function(e, i, n) {
                      r.resetLoader(t, u),
                      o(new f({
                        type: d.ErrorTypes.NETWORK_ERROR,
                        details: d.ErrorDetails.FRAG_LOAD_ERROR,
                        fatal: !1,
                        frag: t,
                        response: e,
                        networkDetails: n
                      }))
                    },
                    onAbort: function(e, i, n) {
                      r.resetLoader(t, u),
                      o(new f({
                        type: d.ErrorTypes.NETWORK_ERROR,
                        details: d.ErrorDetails.INTERNAL_ABORTED,
                        fatal: !1,
                        frag: t,
                        networkDetails: n
                      }))
                    },
                    onTimeout: function(e, i, n) {
                      r.resetLoader(t, u),
                      o(new f({
                        type: d.ErrorTypes.NETWORK_ERROR,
                        details: d.ErrorDetails.FRAG_LOAD_TIMEOUT,
                        fatal: !1,
                        frag: t,
                        networkDetails: n
                      }))
                    },
                    onProgress: function(r, i, n, a) {
                      e && e({
                        frag: t,
                        part: null,
                        payload: n,
                        networkDetails: a
                      })
                    }
                  })
                }
                ))
              }
              ,
              e.loadPart = function(t, e, r) {
                var i = this;
                this.abort();
                var n = this.config
                  , a = n.fLoader
                  , s = n.loader;
                return new Promise((function(o, u) {
                  i.loader && i.loader.destroy();
                  var c = i.loader = t.loader = a ? new a(n) : new s(n)
                    , h = l(t, e)
                    , g = {
                    timeout: n.fragLoadingTimeOut,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: n.fragLoadingMaxRetryTimeout,
                    highWaterMark: 131072
                  };
                  e.stats = c.stats,
                  c.load(h, g, {
                    onSuccess: function(n, a, s, l) {
                      i.resetLoader(t, c),
                      i.updateStatsFromPart(t, e);
                      var u = {
                        frag: t,
                        part: e,
                        payload: n.data,
                        networkDetails: l
                      };
                      r(u),
                      o(u)
                    },
                    onError: function(r, n, a) {
                      i.resetLoader(t, c),
                      u(new f({
                        type: d.ErrorTypes.NETWORK_ERROR,
                        details: d.ErrorDetails.FRAG_LOAD_ERROR,
                        fatal: !1,
                        frag: t,
                        part: e,
                        response: r,
                        networkDetails: a
                      }))
                    },
                    onAbort: function(r, n, a) {
                      t.stats.aborted = e.stats.aborted,
                      i.resetLoader(t, c),
                      u(new f({
                        type: d.ErrorTypes.NETWORK_ERROR,
                        details: d.ErrorDetails.INTERNAL_ABORTED,
                        fatal: !1,
                        frag: t,
                        part: e,
                        networkDetails: a
                      }))
                    },
                    onTimeout: function(r, n, a) {
                      i.resetLoader(t, c),
                      u(new f({
                        type: d.ErrorTypes.NETWORK_ERROR,
                        details: d.ErrorDetails.FRAG_LOAD_TIMEOUT,
                        fatal: !1,
                        frag: t,
                        part: e,
                        networkDetails: a
                      }))
                    }
                  })
                }
                ))
              }
              ,
              e.updateStatsFromPart = function(t, e) {
                var r = t.stats
                  , i = e.stats
                  , n = i.total;
                if (r.loaded += i.loaded,
                n) {
                  var a = Math.round(t.duration / e.duration)
                    , s = Math.min(Math.round(r.loaded / n), a)
                    , o = (a - s) * Math.round(r.loaded / s);
                  r.total = r.loaded + o
                } else
                  r.total = Math.max(r.loaded, r.total);
                var l = r.loading
                  , u = i.loading;
                l.start ? l.first += u.first - u.start : (l.start = u.start,
                l.first = u.first),
                l.end = u.end
              }
              ,
              e.resetLoader = function(t, e) {
                t.loader = null,
                this.loader === e && (self.clearTimeout(this.partLoadTimeout),
                this.loader = null),
                e.destroy()
              }
              ,
              t
            }())
              , f = function(t) {
              function e(e) {
                for (var r, i = arguments.length, n = Array(1 < i ? i - 1 : 0), a = 1; a < i; a++)
                  n[a - 1] = arguments[a];
                return (r = t.call.apply(t, [this].concat(n)) || this).data = void 0,
                r.data = e,
                r
              }
              return i = t,
              (r = e).prototype = Object.create(i.prototype),
              r.prototype.constructor = r,
              s(r, i),
              e;
              var r, i
            }(i(Error))
          },
          "./src/loader/fragment.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              t.prototype = Object.create(e.prototype),
              t.prototype.constructor = t,
              n(t, e)
            }
            function n(t, e) {
              return (n = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            function a(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            function s(t, e, r) {
              return e && a(t.prototype, e),
              r && a(t, r),
              t
            }
            r.r(e),
            r.d(e, "ElementaryStreamTypes", (function() {
              return o
            }
            )),
            r.d(e, "BaseSegment", (function() {
              return h
            }
            )),
            r.d(e, "Fragment", (function() {
              return g
            }
            )),
            r.d(e, "Part", (function() {
              return v
            }
            ));
            var o, l = r("./src/polyfills/number.ts"), u = r("./node_modules/url-toolkit/src/url-toolkit.js"), d = r("./src/utils/logger.ts"), c = r("./src/loader/level-key.ts"), f = r("./src/loader/load-stats.ts");
            !function(t) {
              t.AUDIO = "audio",
              t.VIDEO = "video",
              t.AUDIOVIDEO = "audiovideo"
            }(o || (o = {}));
            var h = function() {
              function t(t) {
                var e;
                this._byteRange = null,
                this._url = null,
                this.baseurl = void 0,
                this.relurl = void 0,
                this.elementaryStreams = ((e = {})[o.AUDIO] = null,
                e[o.VIDEO] = null,
                e[o.AUDIOVIDEO] = null,
                e),
                this.baseurl = t
              }
              return t.prototype.setByteRange = function(t, e) {
                var r = t.split("@", 2)
                  , i = [];
                i[0] = 1 === r.length ? e ? e.byteRangeEndOffset : 0 : parseInt(r[1]),
                i[1] = parseInt(r[0]) + i[0],
                this._byteRange = i
              }
              ,
              s(t, [{
                key: "byteRange",
                get: function() {
                  return this._byteRange ? this._byteRange : []
                }
              }, {
                key: "byteRangeStartOffset",
                get: function() {
                  return this.byteRange[0]
                }
              }, {
                key: "byteRangeEndOffset",
                get: function() {
                  return this.byteRange[1]
                }
              }, {
                key: "url",
                get: function() {
                  return !this._url && this.baseurl && this.relurl && (this._url = Object(u.buildAbsoluteURL)(this.baseurl, this.relurl, {
                    alwaysNormalize: !0
                  })),
                  this._url || ""
                },
                set: function(t) {
                  this._url = t
                }
              }]),
              t
            }()
              , g = function(t) {
              function e(e, r) {
                var i;
                return (i = t.call(this, r) || this)._decryptdata = null,
                i.rawProgramDateTime = null,
                i.programDateTime = null,
                i.tagList = [],
                i.duration = 0,
                i.sn = 0,
                i.levelkey = void 0,
                i.type = void 0,
                i.loader = null,
                i.level = -1,
                i.cc = 0,
                i.startPTS = void 0,
                i.endPTS = void 0,
                i.appendedPTS = void 0,
                i.startDTS = void 0,
                i.endDTS = void 0,
                i.start = 0,
                i.deltaPTS = void 0,
                i.maxStartPTS = void 0,
                i.minEndPTS = void 0,
                i.stats = new f.LoadStats,
                i.urlId = 0,
                i.data = void 0,
                i.bitrateTest = !1,
                i.title = null,
                i.initSegment = null,
                i.type = e,
                i
              }
              i(e, t);
              var r = e.prototype;
              return r.createInitializationVector = function(t) {
                for (var e = new Uint8Array(16), r = 12; 16 > r; r++)
                  e[r] = 255 & t >> 8 * (15 - r);
                return e
              }
              ,
              r.setDecryptDataFromLevelKey = function(t, e) {
                var r = t;
                return "AES-128" === (null == t ? void 0 : t.method) && t.uri && !t.iv && ((r = c.LevelKey.fromURI(t.uri)).method = t.method,
                r.iv = this.createInitializationVector(e),
                r.keyFormat = "identity"),
                r
              }
              ,
              r.setElementaryStreamInfo = function(t, e, r, i, n, a) {
                void 0 === a && (a = !1);
                var s = this.elementaryStreams
                  , o = s[t];
                return o ? (o.startPTS = Math.min(o.startPTS, e),
                o.endPTS = Math.max(o.endPTS, r),
                o.startDTS = Math.min(o.startDTS, i),
                void (o.endDTS = Math.max(o.endDTS, n))) : void (s[t] = {
                  startPTS: e,
                  endPTS: r,
                  startDTS: i,
                  endDTS: n,
                  partial: a
                })
              }
              ,
              r.clearElementaryStreamInfo = function() {
                var t = this.elementaryStreams;
                t[o.AUDIO] = null,
                t[o.VIDEO] = null,
                t[o.AUDIOVIDEO] = null
              }
              ,
              s(e, [{
                key: "decryptdata",
                get: function() {
                  if (!this.levelkey && !this._decryptdata)
                    return null;
                  if (!this._decryptdata && this.levelkey) {
                    var t = this.sn;
                    "number" != typeof t && (this.levelkey && "AES-128" === this.levelkey.method && !this.levelkey.iv && d.logger.warn('missing IV for initialization segment with method="' + this.levelkey.method + '" - compliance issue'),
                    t = 0),
                    this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, t)
                  }
                  return this._decryptdata
                }
              }, {
                key: "end",
                get: function() {
                  return this.start + this.duration
                }
              }, {
                key: "endProgramDateTime",
                get: function() {
                  if (null === this.programDateTime)
                    return null;
                  if (!Object(l.isFiniteNumber)(this.programDateTime))
                    return null;
                  var t = Object(l.isFiniteNumber)(this.duration) ? this.duration : 0;
                  return this.programDateTime + 1e3 * t
                }
              }, {
                key: "encrypted",
                get: function() {
                  var t;
                  return !(null === (t = this.decryptdata) || void 0 === t || !t.keyFormat || !this.decryptdata.uri)
                }
              }]),
              e
            }(h)
              , v = function(t) {
              function e(e, r, i, n, a) {
                var s;
                (s = t.call(this, i) || this).fragOffset = 0,
                s.duration = 0,
                s.gap = !1,
                s.independent = !1,
                s.relurl = void 0,
                s.fragment = void 0,
                s.index = void 0,
                s.stats = new f.LoadStats,
                s.duration = e.decimalFloatingPoint("DURATION"),
                s.gap = e.bool("GAP"),
                s.independent = e.bool("INDEPENDENT"),
                s.relurl = e.enumeratedString("URI"),
                s.fragment = r,
                s.index = n;
                var o = e.enumeratedString("BYTERANGE");
                return o && s.setByteRange(o, a),
                a && (s.fragOffset = a.fragOffset + a.duration),
                s
              }
              return i(e, t),
              s(e, [{
                key: "start",
                get: function() {
                  return this.fragment.start + this.fragOffset
                }
              }, {
                key: "end",
                get: function() {
                  return this.start + this.duration
                }
              }, {
                key: "loaded",
                get: function() {
                  var t = this.elementaryStreams;
                  return !!(t.audio || t.video || t.audiovideo)
                }
              }]),
              e
            }(h)
          },
          "./src/loader/key-loader.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return s
            }
            ));
            var i = r("./src/events.ts")
              , n = r("./src/errors.ts")
              , a = r("./src/utils/logger.ts")
              , s = function() {
              function t(t) {
                this.hls = void 0,
                this.loaders = {},
                this.decryptkey = null,
                this.decrypturl = null,
                this.hls = t,
                this._registerListeners()
              }
              var e = t.prototype;
              return e._registerListeners = function() {
                this.hls.on(i.Events.KEY_LOADING, this.onKeyLoading, this)
              }
              ,
              e._unregisterListeners = function() {
                this.hls.off(i.Events.KEY_LOADING, this.onKeyLoading)
              }
              ,
              e.destroy = function() {
                for (var t in this._unregisterListeners(),
                this.loaders) {
                  var e = this.loaders[t];
                  e && e.destroy()
                }
                this.loaders = {}
              }
              ,
              e.onKeyLoading = function(t, e) {
                var r = e.frag
                  , n = r.type
                  , s = this.loaders[n];
                if (r.decryptdata) {
                  var o = r.decryptdata.uri;
                  if (o !== this.decrypturl || null === this.decryptkey) {
                    var l = this.hls.config;
                    if (s && (a.logger.warn("abort previous key loader for type:" + n),
                    s.abort()),
                    !o)
                      return void a.logger.warn("key uri is falsy");
                    var u = l.loader
                      , d = r.loader = this.loaders[n] = new u(l);
                    this.decrypturl = o,
                    this.decryptkey = null;
                    var c = {
                      url: o,
                      frag: r,
                      responseType: "arraybuffer"
                    }
                      , f = {
                      timeout: l.fragLoadingTimeOut,
                      maxRetry: 0,
                      retryDelay: l.fragLoadingRetryDelay,
                      maxRetryDelay: l.fragLoadingMaxRetryTimeout,
                      highWaterMark: 0
                    }
                      , h = {
                      onSuccess: this.loadsuccess.bind(this),
                      onError: this.loaderror.bind(this),
                      onTimeout: this.loadtimeout.bind(this)
                    };
                    d.load(c, f, h)
                  } else
                    this.decryptkey && (r.decryptdata.key = this.decryptkey,
                    this.hls.trigger(i.Events.KEY_LOADED, {
                      frag: r
                    }))
                } else
                  a.logger.warn("Missing decryption data on fragment in onKeyLoading")
              }
              ,
              e.loadsuccess = function(t, e, r) {
                var n = r.frag;
                return n.decryptdata ? (this.decryptkey = n.decryptdata.key = new Uint8Array(t.data),
                n.loader = null,
                delete this.loaders[n.type],
                void this.hls.trigger(i.Events.KEY_LOADED, {
                  frag: n
                })) : void a.logger.error("after key load, decryptdata unset")
              }
              ,
              e.loaderror = function(t, e) {
                var r = e.frag
                  , a = r.loader;
                a && a.abort(),
                delete this.loaders[r.type],
                this.hls.trigger(i.Events.ERROR, {
                  type: n.ErrorTypes.NETWORK_ERROR,
                  details: n.ErrorDetails.KEY_LOAD_ERROR,
                  fatal: !1,
                  frag: r,
                  response: t
                })
              }
              ,
              e.loadtimeout = function(t, e) {
                var r = e.frag
                  , a = r.loader;
                a && a.abort(),
                delete this.loaders[r.type],
                this.hls.trigger(i.Events.ERROR, {
                  type: n.ErrorTypes.NETWORK_ERROR,
                  details: n.ErrorDetails.KEY_LOAD_TIMEOUT,
                  fatal: !1,
                  frag: r
                })
              }
              ,
              t
            }()
          },
          "./src/loader/level-details.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            r.r(e),
            r.d(e, "LevelDetails", (function() {
              return a
            }
            ));
            var n = r("./src/polyfills/number.ts")
              , a = function() {
              function t(t) {
                this.PTSKnown = !1,
                this.alignedSliding = !1,
                this.averagetargetduration = void 0,
                this.endCC = 0,
                this.endSN = 0,
                this.fragments = void 0,
                this.fragmentHint = void 0,
                this.partList = null,
                this.live = !0,
                this.ageHeader = 0,
                this.advancedDateTime = void 0,
                this.updated = !0,
                this.advanced = !0,
                this.availabilityDelay = void 0,
                this.misses = 0,
                this.needSidxRanges = !1,
                this.startCC = 0,
                this.startSN = 0,
                this.startTimeOffset = null,
                this.targetduration = 0,
                this.totalduration = 0,
                this.type = null,
                this.url = void 0,
                this.m3u8 = "",
                this.version = null,
                this.canBlockReload = !1,
                this.canSkipUntil = 0,
                this.canSkipDateRanges = !1,
                this.skippedSegments = 0,
                this.recentlyRemovedDateranges = void 0,
                this.partHoldBack = 0,
                this.holdBack = 0,
                this.partTarget = 0,
                this.preloadHint = void 0,
                this.renditionReports = void 0,
                this.tuneInGoal = 0,
                this.deltaUpdateFailed = void 0,
                this.driftStartTime = 0,
                this.driftEndTime = 0,
                this.driftStart = 0,
                this.driftEnd = 0,
                this.fragments = [],
                this.url = t
              }
              var e, r, a;
              return t.prototype.reloaded = function(t) {
                if (!t)
                  return this.advanced = !0,
                  void (this.updated = !0);
                var e = this.lastPartSn - t.lastPartSn
                  , r = this.lastPartIndex - t.lastPartIndex;
                this.updated = this.endSN !== t.endSN || !!r || !!e,
                this.advanced = this.endSN > t.endSN || 0 < e || 0 === e && 0 < r,
                this.misses = this.updated || this.advanced ? Math.floor(.6 * t.misses) : t.misses + 1,
                this.availabilityDelay = t.availabilityDelay
              }
              ,
              e = t,
              (r = [{
                key: "hasProgramDateTime",
                get: function() {
                  return !!this.fragments.length && Object(n.isFiniteNumber)(this.fragments[this.fragments.length - 1].programDateTime)
                }
              }, {
                key: "levelTargetDuration",
                get: function() {
                  return this.averagetargetduration || this.targetduration || 10
                }
              }, {
                key: "drift",
                get: function() {
                  var t = this.driftEndTime - this.driftStartTime;
                  return 0 < t ? 1e3 * (this.driftEnd - this.driftStart) / t : 1
                }
              }, {
                key: "edge",
                get: function() {
                  return this.partEnd || this.fragmentEnd
                }
              }, {
                key: "partEnd",
                get: function() {
                  var t;
                  return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd
                }
              }, {
                key: "fragmentEnd",
                get: function() {
                  var t;
                  return null !== (t = this.fragments) && void 0 !== t && t.length ? this.fragments[this.fragments.length - 1].end : 0
                }
              }, {
                key: "age",
                get: function() {
                  return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0
                }
              }, {
                key: "lastPartIndex",
                get: function() {
                  var t;
                  return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].index : -1
                }
              }, {
                key: "lastPartSn",
                get: function() {
                  var t;
                  return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN
                }
              }]) && i(e.prototype, r),
              a && i(e, a),
              t
            }()
          },
          "./src/loader/level-key.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            r.r(e),
            r.d(e, "LevelKey", (function() {
              return a
            }
            ));
            var n = r("./node_modules/url-toolkit/src/url-toolkit.js")
              , a = function() {
              function t(t, e) {
                this._uri = null,
                this.method = null,
                this.keyFormat = null,
                this.keyFormatVersions = null,
                this.keyID = null,
                this.key = null,
                this.iv = null,
                this._uri = e ? Object(n.buildAbsoluteURL)(t, e, {
                  alwaysNormalize: !0
                }) : t
              }
              return t.fromURL = function(e, r) {
                return new t(e,r)
              }
              ,
              t.fromURI = function(e) {
                return new t(e)
              }
              ,
              e = t,
              (r = [{
                key: "uri",
                get: function() {
                  return this._uri
                }
              }]) && i(e.prototype, r),
              a && i(e, a),
              t;
              var e, r, a
            }()
          },
          "./src/loader/load-stats.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "LoadStats", (function() {
              return i
            }
            ));
            var i = function() {
              this.aborted = !1,
              this.loaded = 0,
              this.retry = 0,
              this.total = 0,
              this.chunkCount = 0,
              this.bwEstimate = 0,
              this.loading = {
                start: 0,
                first: 0,
                end: 0
              },
              this.parsing = {
                start: 0,
                end: 0
              },
              this.buffering = {
                start: 0,
                first: 0,
                end: 0
              }
            }
          },
          "./src/loader/m3u8-parser.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              ["video", "audio", "text"].forEach((function(r) {
                var i = t.filter((function(t) {
                  return Object(h.isCodecType)(t, r)
                }
                ));
                if (i.length) {
                  var n = i.filter((function(t) {
                    return 0 === t.lastIndexOf("avc1", 0) || 0 === t.lastIndexOf("mp4a", 0)
                  }
                  ));
                  e[r + "Codec"] = 0 < n.length ? n[0] : i[0],
                  t = t.filter((function(t) {
                    return -1 === i.indexOf(t)
                  }
                  ))
                }
              }
              )),
              e.unknownCodecs = t
            }
            function n(t, e, r) {
              var i = e[r];
              i && (t[r] = i)
            }
            function a(t, e) {
              t.rawProgramDateTime ? t.programDateTime = Date.parse(t.rawProgramDateTime) : null != e && e.programDateTime && (t.programDateTime = e.endProgramDateTime),
              Object(s.isFiniteNumber)(t.programDateTime) || (t.programDateTime = null,
              t.rawProgramDateTime = null)
            }
            r.r(e),
            r.d(e, "default", (function() {
              return E
            }
            ));
            var s = r("./src/polyfills/number.ts")
              , o = r("./node_modules/url-toolkit/src/url-toolkit.js")
              , l = r("./src/loader/fragment.ts")
              , u = r("./src/loader/level-details.ts")
              , d = r("./src/loader/level-key.ts")
              , c = r("./src/utils/attr-list.ts")
              , f = r("./src/utils/logger.ts")
              , h = r("./src/utils/codecs.ts")
              , g = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+/g
              , v = /#EXT-X-MEDIA:(.*)/g
              , m = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /(?!#) *(\S[\S ]*)/.source, /#EXT-X-BYTERANGE:*(.+)/.source, /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /#.*/.source].join("|"),"g")
              , p = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(PLAYLIST-TYPE):(.+)/.source, /#EXT-X-(MEDIA-SEQUENCE): *(\d+)/.source, /#EXT-X-(SKIP):(.+)/.source, /#EXT-X-(TARGETDURATION): *(\d+)/.source, /#EXT-X-(KEY):(.+)/.source, /#EXT-X-(START):(.+)/.source, /#EXT-X-(ENDLIST)/.source, /#EXT-X-(DISCONTINUITY-SEQ)UENCE: *(\d+)/.source, /#EXT-X-(DIS)CONTINUITY/.source, /#EXT-X-(VERSION):(\d+)/.source, /#EXT-X-(MAP):(.+)/.source, /#EXT-X-(SERVER-CONTROL):(.+)/.source, /#EXT-X-(PART-INF):(.+)/.source, /#EXT-X-(GAP)/.source, /#EXT-X-(BITRATE):\s*(\d+)/.source, /#EXT-X-(PART):(.+)/.source, /#EXT-X-(PRELOAD-HINT):(.+)/.source, /#EXT-X-(RENDITION-REPORT):(.+)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|"))
              , y = /\.(mp4|m4s|m4v|m4a)$/i
              , E = function() {
              function t() {}
              return t.findGroup = function(t, e) {
                for (var r, i = 0; i < t.length; i++)
                  if ((r = t[i]).id === e)
                    return r
              }
              ,
              t.convertAVC1ToAVCOTI = function(t) {
                var e = t.split(".");
                if (2 < e.length) {
                  var r = e.shift() + ".";
                  return r += parseInt(e.shift()).toString(16),
                  r += ("000" + parseInt(e.shift()).toString(16)).substr(-4)
                }
                return t
              }
              ,
              t.resolve = function(t, e) {
                return o.buildAbsoluteURL(e, t, {
                  alwaysNormalize: !0
                })
              }
              ,
              t.parseMasterPlaylist = function(e, r) {
                var n, a = [], s = {}, o = !1;
                for (g.lastIndex = 0; null != (n = g.exec(e)); )
                  if (n[1]) {
                    var l = new c.AttrList(n[1])
                      , u = {
                      attrs: l,
                      bitrate: l.decimalInteger("AVERAGE-BANDWIDTH") || l.decimalInteger("BANDWIDTH"),
                      name: l.NAME,
                      url: t.resolve(n[2], r)
                    }
                      , d = l.decimalResolution("RESOLUTION");
                    d && (u.width = d.width,
                    u.height = d.height),
                    i((l.CODECS || "").split(/[ ,]+/).filter((function(t) {
                      return t
                    }
                    )), u),
                    u.videoCodec && -1 !== u.videoCodec.indexOf("avc1") && (u.videoCodec = t.convertAVC1ToAVCOTI(u.videoCodec)),
                    a.push(u)
                  } else if (n[3]) {
                    var f = new c.AttrList(n[3]);
                    f["DATA-ID"] && (o = !0,
                    s[f["DATA-ID"]] = f)
                  }
                return {
                  levels: a,
                  sessionData: o ? s : null
                }
              }
              ,
              t.parseMasterPlaylistMedia = function(e, r, i, a) {
                void 0 === a && (a = []);
                var s, o = [], l = 0;
                for (v.lastIndex = 0; null !== (s = v.exec(e)); ) {
                  var u = new c.AttrList(s[1]);
                  if (u.TYPE === i) {
                    var d = {
                      attrs: u,
                      bitrate: 0,
                      id: l++,
                      groupId: u["GROUP-ID"],
                      instreamId: u["INSTREAM-ID"],
                      name: u.NAME || u.LANGUAGE || "",
                      type: i,
                      default: u.bool("DEFAULT"),
                      autoselect: u.bool("AUTOSELECT"),
                      forced: u.bool("FORCED"),
                      lang: u.LANGUAGE,
                      url: u.URI ? t.resolve(u.URI, r) : ""
                    };
                    if (a.length) {
                      var f = t.findGroup(a, d.groupId) || a[0];
                      n(d, f, "audioCodec"),
                      n(d, f, "textCodec")
                    }
                    o.push(d)
                  }
                }
                return o
              }
              ,
              t.parseLevelPlaylist = function(t, e, r, i, n) {
                var h, g, v, E = new u.LevelDetails(e), b = E.fragments, T = null, A = 0, S = 0, L = 0, k = 0, D = null, _ = new l.Fragment(i,e), R = -1, C = !1;
                for (m.lastIndex = 0,
                E.m3u8 = t; null !== (h = m.exec(t)); ) {
                  C && (C = !1,
                  (_ = new l.Fragment(i,e)).start = L,
                  _.sn = A,
                  _.cc = k,
                  _.level = r,
                  T && (_.initSegment = T,
                  _.rawProgramDateTime = T.rawProgramDateTime));
                  var I = h[1];
                  if (I) {
                    _.duration = parseFloat(I);
                    var x = (" " + h[2]).slice(1);
                    _.title = x || null,
                    _.tagList.push(x ? ["INF", I, x] : ["INF", I])
                  } else if (h[3])
                    Object(s.isFiniteNumber)(_.duration) && (_.start = L,
                    v && (_.levelkey = v),
                    _.sn = A,
                    _.level = r,
                    _.cc = k,
                    _.urlId = n,
                    b.push(_),
                    _.relurl = (" " + h[3]).slice(1),
                    a(_, D),
                    D = _,
                    L += _.duration,
                    A++,
                    S = 0,
                    C = !0);
                  else if (h[4]) {
                    var w = (" " + h[4]).slice(1);
                    D ? _.setByteRange(w, D) : _.setByteRange(w)
                  } else if (h[5])
                    _.rawProgramDateTime = (" " + h[5]).slice(1),
                    _.tagList.push(["PROGRAM-DATE-TIME", _.rawProgramDateTime]),
                    -1 === R && (R = b.length);
                  else {
                    if (!(h = h[0].match(p))) {
                      f.logger.warn("No matches on slow regex match for level playlist!");
                      continue
                    }
                    for (g = 1; g < h.length && void 0 === h[g]; g++)
                      ;
                    var O = (" " + h[g]).slice(1)
                      , P = (" " + h[g + 1]).slice(1)
                      , F = h[g + 2] ? (" " + h[g + 2]).slice(1) : "";
                    switch (O) {
                    case "PLAYLIST-TYPE":
                      E.type = P.toUpperCase();
                      break;
                    case "MEDIA-SEQUENCE":
                      A = E.startSN = parseInt(P);
                      break;
                    case "SKIP":
                      var M = new c.AttrList(P)
                        , B = M.decimalInteger("SKIPPED-SEGMENTS");
                      if (Object(s.isFiniteNumber)(B)) {
                        E.skippedSegments = B;
                        for (var N = B; N--; )
                          b.unshift(null);
                        A += B
                      }
                      var U = M.enumeratedString("RECENTLY-REMOVED-DATERANGES");
                      U && (E.recentlyRemovedDateranges = U.split("\t"));
                      break;
                    case "TARGETDURATION":
                      E.targetduration = parseFloat(P);
                      break;
                    case "VERSION":
                      E.version = parseInt(P);
                      break;
                    case "EXTM3U":
                      break;
                    case "ENDLIST":
                      E.live = !1;
                      break;
                    case "#":
                      (P || F) && _.tagList.push(F ? [P, F] : [P]);
                      break;
                    case "DIS":
                      k++;
                    case "GAP":
                      _.tagList.push([O]);
                      break;
                    case "BITRATE":
                      _.tagList.push([O, P]);
                      break;
                    case "DISCONTINUITY-SEQ":
                      k = parseInt(P);
                      break;
                    case "KEY":
                      var G, j = new c.AttrList(P), H = j.enumeratedString("METHOD"), V = j.URI, W = j.hexadecimalInteger("IV"), K = j.enumeratedString("KEYFORMATVERSIONS"), Y = j.enumeratedString("KEYID"), q = null == (G = j.enumeratedString("KEYFORMAT")) ? "identity" : G;
                      if (-1 < ["com.apple.streamingkeydelivery", "com.microsoft.playready", "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", "com.widevine"].indexOf(q)) {
                        f.logger.warn("Keyformat " + q + " is not supported from the manifest");
                        continue
                      }
                      if ("identity" !== q)
                        continue;
                      H && (v = d.LevelKey.fromURL(e, V),
                      V && 0 <= ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(H) && (v.method = H,
                      v.keyFormat = q,
                      Y && (v.keyID = Y),
                      K && (v.keyFormatVersions = K),
                      v.iv = W));
                      break;
                    case "START":
                      var z = new c.AttrList(P).decimalFloatingPoint("TIME-OFFSET");
                      Object(s.isFiniteNumber)(z) && (E.startTimeOffset = z);
                      break;
                    case "MAP":
                      var X = new c.AttrList(P);
                      _.relurl = X.URI,
                      X.BYTERANGE && _.setByteRange(X.BYTERANGE),
                      _.level = r,
                      _.sn = "initSegment",
                      v && (_.levelkey = v),
                      _.initSegment = null,
                      T = _,
                      C = !0;
                      break;
                    case "SERVER-CONTROL":
                      var Q = new c.AttrList(P);
                      E.canBlockReload = Q.bool("CAN-BLOCK-RELOAD"),
                      E.canSkipUntil = Q.optionalFloat("CAN-SKIP-UNTIL", 0),
                      E.canSkipDateRanges = 0 < E.canSkipUntil && Q.bool("CAN-SKIP-DATERANGES"),
                      E.partHoldBack = Q.optionalFloat("PART-HOLD-BACK", 0),
                      E.holdBack = Q.optionalFloat("HOLD-BACK", 0);
                      break;
                    case "PART-INF":
                      var $ = new c.AttrList(P);
                      E.partTarget = $.decimalFloatingPoint("PART-TARGET");
                      break;
                    case "PART":
                      var Z = E.partList;
                      Z || (Z = E.partList = []);
                      var J = 0 < S ? Z[Z.length - 1] : void 0
                        , tt = S++
                        , et = new l.Part(new c.AttrList(P),_,e,tt,J);
                      Z.push(et),
                      _.duration += et.duration;
                      break;
                    case "PRELOAD-HINT":
                      var rt = new c.AttrList(P);
                      E.preloadHint = rt;
                      break;
                    case "RENDITION-REPORT":
                      var it = new c.AttrList(P);
                      E.renditionReports = E.renditionReports || [],
                      E.renditionReports.push(it);
                      break;
                    default:
                      f.logger.warn("line parsed but not handled: " + h)
                    }
                  }
                }
                D && !D.relurl ? (b.pop(),
                L -= D.duration,
                E.partList && (E.fragmentHint = D)) : E.partList && (a(_, D),
                _.cc = k,
                E.fragmentHint = _);
                var nt = b.length
                  , at = b[0]
                  , st = b[nt - 1];
                if (0 < (L += E.skippedSegments * E.targetduration) && nt && st) {
                  E.averagetargetduration = L / nt;
                  var ot = st.sn;
                  E.endSN = "initSegment" === ot ? 0 : ot,
                  at && (E.startCC = at.cc,
                  !at.initSegment && E.fragments.every((function(t) {
                    return t.relurl && (e = t.relurl,
                    y.test(null == (r = null === (i = o.parseURL(e)) || void 0 === i ? void 0 : i.path) ? "" : r));
                    var e, r, i
                  }
                  )) && (f.logger.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"),
                  (_ = new l.Fragment(i,e)).relurl = st.relurl,
                  _.level = r,
                  _.sn = "initSegment",
                  at.initSegment = _,
                  E.needSidxRanges = !0))
                } else
                  E.endSN = 0,
                  E.startCC = 0;
                return E.fragmentHint && (L += E.fragmentHint.duration),
                E.totalduration = L,
                E.endCC = k,
                0 < R && function(t, e) {
                  for (var r, i = t[e], n = e; n--; ) {
                    if (!(r = t[n]))
                      return;
                    r.programDateTime = i.programDateTime - 1e3 * r.duration,
                    i = r
                  }
                }(b, R),
                E
              }
              ,
              t
            }()
          },
          "./src/loader/playlist-loader.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              var r = t.url;
              return (void 0 === r || 0 === r.indexOf("data:")) && (r = e.url),
              r
            }
            r.r(e);
            var n = r("./src/polyfills/number.ts")
              , a = r("./src/events.ts")
              , s = r("./src/errors.ts")
              , o = r("./src/utils/logger.ts")
              , l = r("./src/utils/mp4-tools.ts")
              , u = r("./src/loader/m3u8-parser.ts")
              , d = r("./src/types/loader.ts")
              , c = r("./src/utils/attr-list.ts")
              , f = function() {
              function t(t) {
                this.hls = void 0,
                this.loaders = Object.create(null),
                this.hls = t,
                this.registerListeners()
              }
              var e = t.prototype;
              return e.registerListeners = function() {
                var t = this.hls;
                t.on(a.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.on(a.Events.LEVEL_LOADING, this.onLevelLoading, this),
                t.on(a.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this),
                t.on(a.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
              }
              ,
              e.unregisterListeners = function() {
                var t = this.hls;
                t.off(a.Events.MANIFEST_LOADING, this.onManifestLoading, this),
                t.off(a.Events.LEVEL_LOADING, this.onLevelLoading, this),
                t.off(a.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this),
                t.off(a.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
              }
              ,
              e.createInternalLoader = function(t) {
                var e = this.hls.config
                  , r = e.pLoader
                  , i = e.loader
                  , n = new (r || i)(e);
                return t.loader = n,
                this.loaders[t.type] = n,
                n
              }
              ,
              e.getInternalLoader = function(t) {
                return this.loaders[t.type]
              }
              ,
              e.resetInternalLoader = function(t) {
                this.loaders[t] && delete this.loaders[t]
              }
              ,
              e.destroyInternalLoaders = function() {
                for (var t in this.loaders) {
                  var e = this.loaders[t];
                  e && e.destroy(),
                  this.resetInternalLoader(t)
                }
              }
              ,
              e.destroy = function() {
                this.unregisterListeners(),
                this.destroyInternalLoaders()
              }
              ,
              e.onManifestLoading = function(t, e) {
                var r = e.url;
                this.load({
                  id: null,
                  groupId: null,
                  level: 0,
                  responseType: "text",
                  type: d.PlaylistContextType.MANIFEST,
                  url: r,
                  deliveryDirectives: null
                })
              }
              ,
              e.onLevelLoading = function(t, e) {
                var r = e.id
                  , i = e.level
                  , n = e.url
                  , a = e.deliveryDirectives;
                this.load({
                  id: r,
                  groupId: null,
                  level: i,
                  responseType: "text",
                  type: d.PlaylistContextType.LEVEL,
                  url: n,
                  deliveryDirectives: a
                })
              }
              ,
              e.onAudioTrackLoading = function(t, e) {
                var r = e.id
                  , i = e.groupId
                  , n = e.url
                  , a = e.deliveryDirectives;
                this.load({
                  id: r,
                  groupId: i,
                  level: null,
                  responseType: "text",
                  type: d.PlaylistContextType.AUDIO_TRACK,
                  url: n,
                  deliveryDirectives: a
                })
              }
              ,
              e.onSubtitleTrackLoading = function(t, e) {
                var r = e.id
                  , i = e.groupId
                  , n = e.url
                  , a = e.deliveryDirectives;
                this.load({
                  id: r,
                  groupId: i,
                  level: null,
                  responseType: "text",
                  type: d.PlaylistContextType.SUBTITLE_TRACK,
                  url: n,
                  deliveryDirectives: a
                })
              }
              ,
              e.load = function(t) {
                var e, r, i, n, a, s, l = this.hls.config, u = this.getInternalLoader(t);
                if (u) {
                  var c = u.context;
                  if (c && c.url === t.url)
                    return void o.logger.trace("[playlist-loader]: playlist request ongoing");
                  o.logger.log("[playlist-loader]: aborting previous loader for type: " + t.type),
                  u.abort()
                }
                switch (t.type) {
                case d.PlaylistContextType.MANIFEST:
                  r = l.manifestLoadingMaxRetry,
                  i = l.manifestLoadingTimeOut,
                  n = l.manifestLoadingRetryDelay,
                  a = l.manifestLoadingMaxRetryTimeout;
                  break;
                case d.PlaylistContextType.LEVEL:
                case d.PlaylistContextType.AUDIO_TRACK:
                case d.PlaylistContextType.SUBTITLE_TRACK:
                  r = 0,
                  i = l.levelLoadingTimeOut;
                  break;
                default:
                  r = l.levelLoadingMaxRetry,
                  i = l.levelLoadingTimeOut,
                  n = l.levelLoadingRetryDelay,
                  a = l.levelLoadingMaxRetryTimeout
                }
                if (u = this.createInternalLoader(t),
                null !== (e = t.deliveryDirectives) && void 0 !== e && e.part && (t.type === d.PlaylistContextType.LEVEL && null !== t.level ? s = this.hls.levels[t.level].details : t.type === d.PlaylistContextType.AUDIO_TRACK && null !== t.id ? s = this.hls.audioTracks[t.id].details : t.type === d.PlaylistContextType.SUBTITLE_TRACK && null !== t.id && (s = this.hls.subtitleTracks[t.id].details),
                s)) {
                  var f = s.partTarget
                    , h = s.targetduration;
                  f && h && (i = Math.min(1e3 * Math.max(3 * f, .8 * h), i))
                }
                var g = {
                  timeout: i,
                  maxRetry: r,
                  retryDelay: n,
                  maxRetryDelay: a,
                  highWaterMark: 0
                }
                  , v = {
                  onSuccess: this.loadsuccess.bind(this),
                  onError: this.loaderror.bind(this),
                  onTimeout: this.loadtimeout.bind(this)
                };
                u.load(t, g, v)
              }
              ,
              e.loadsuccess = function(t, e, r, i) {
                if (void 0 === i && (i = null),
                r.isSidxRequest)
                  return this.handleSidxRequest(t, r),
                  void this.handlePlaylistLoaded(t, e, r, i);
                this.resetInternalLoader(r.type);
                var n = t.data;
                return 0 === n.indexOf("#EXTM3U") ? (e.parsing.start = performance.now(),
                void (0 < n.indexOf("#EXTINF:") || 0 < n.indexOf("#EXT-X-TARGETDURATION:") ? this.handleTrackOrLevelPlaylist(t, e, r, i) : this.handleMasterPlaylist(t, e, r, i))) : void this.handleManifestParsingError(t, r, "no EXTM3U delimiter", i)
              }
              ,
              e.loaderror = function(t, e, r) {
                void 0 === r && (r = null),
                this.handleNetworkError(e, r, !1, t)
              }
              ,
              e.loadtimeout = function(t, e, r) {
                void 0 === r && (r = null),
                this.handleNetworkError(e, r, !0)
              }
              ,
              e.handleMasterPlaylist = function(t, e, r, n) {
                var s = this.hls
                  , l = t.data
                  , d = i(t, r)
                  , f = u.default.parseMasterPlaylist(l, d)
                  , h = f.levels
                  , g = f.sessionData;
                if (h.length) {
                  var v = h.map((function(t) {
                    return {
                      id: t.attrs.AUDIO,
                      audioCodec: t.audioCodec
                    }
                  }
                  ))
                    , m = h.map((function(t) {
                    return {
                      id: t.attrs.SUBTITLES,
                      textCodec: t.textCodec
                    }
                  }
                  ))
                    , p = u.default.parseMasterPlaylistMedia(l, d, "AUDIO", v)
                    , y = u.default.parseMasterPlaylistMedia(l, d, "SUBTITLES", m)
                    , E = u.default.parseMasterPlaylistMedia(l, d, "CLOSED-CAPTIONS");
                  p.length && (p.some((function(t) {
                    return !t.url
                  }
                  )) || !h[0].audioCodec || h[0].attrs.AUDIO || (o.logger.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"),
                  p.unshift({
                    type: "main",
                    name: "main",
                    default: !1,
                    autoselect: !1,
                    forced: !1,
                    id: -1,
                    attrs: new c.AttrList({}),
                    bitrate: 0,
                    url: ""
                  }))),
                  s.trigger(a.Events.MANIFEST_LOADED, {
                    levels: h,
                    audioTracks: p,
                    subtitles: y,
                    captions: E,
                    url: d,
                    stats: e,
                    networkDetails: n,
                    sessionData: g
                  })
                } else
                  this.handleManifestParsingError(t, r, "no level found in manifest", n)
              }
              ,
              e.handleTrackOrLevelPlaylist = function(t, e, r, o) {
                var l = this.hls
                  , f = r.id
                  , h = r.level
                  , g = r.type
                  , v = i(t, r)
                  , m = Object(n.isFiniteNumber)(f) ? f : 0
                  , p = Object(n.isFiniteNumber)(h) ? h : m
                  , y = function(t) {
                  var e = t.type;
                  return e === d.PlaylistContextType.AUDIO_TRACK ? d.PlaylistLevelType.AUDIO : e === d.PlaylistContextType.SUBTITLE_TRACK ? d.PlaylistLevelType.SUBTITLE : d.PlaylistLevelType.MAIN
                }(r)
                  , E = u.default.parseLevelPlaylist(t.data, v, p, y, m);
                if (E.fragments.length) {
                  if (g === d.PlaylistContextType.MANIFEST) {
                    var b = {
                      attrs: new c.AttrList({}),
                      bitrate: 0,
                      details: E,
                      name: "",
                      url: v
                    };
                    l.trigger(a.Events.MANIFEST_LOADED, {
                      levels: [b],
                      audioTracks: [],
                      url: v,
                      stats: e,
                      networkDetails: o,
                      sessionData: null
                    })
                  }
                  if (e.parsing.end = performance.now(),
                  E.needSidxRanges) {
                    var T, A = null === (T = E.fragments[0].initSegment) || void 0 === T ? void 0 : T.url;
                    this.load({
                      url: A,
                      isSidxRequest: !0,
                      type: g,
                      level: h,
                      levelDetails: E,
                      id: f,
                      groupId: null,
                      rangeStart: 0,
                      rangeEnd: 2048,
                      responseType: "arraybuffer",
                      deliveryDirectives: null
                    })
                  } else
                    r.levelDetails = E,
                    this.handlePlaylistLoaded(t, e, r, o)
                } else
                  l.trigger(a.Events.ERROR, {
                    type: s.ErrorTypes.NETWORK_ERROR,
                    details: s.ErrorDetails.LEVEL_EMPTY_ERROR,
                    fatal: !1,
                    url: v,
                    reason: "no fragments found in level",
                    level: "number" == typeof r.level ? r.level : void 0
                  })
              }
              ,
              e.handleSidxRequest = function(t, e) {
                var r = Object(l.parseSegmentIndex)(new Uint8Array(t.data));
                if (r) {
                  var i = r.references
                    , n = e.levelDetails;
                  i.forEach((function(t, e) {
                    var i = t.info
                      , a = n.fragments[e];
                    0 === a.byteRange.length && a.setByteRange(1 + i.end - i.start + "@" + i.start),
                    a.initSegment && a.initSegment.setByteRange(r.moovEndOffset + "@0")
                  }
                  ))
                }
              }
              ,
              e.handleManifestParsingError = function(t, e, r, i) {
                this.hls.trigger(a.Events.ERROR, {
                  type: s.ErrorTypes.NETWORK_ERROR,
                  details: s.ErrorDetails.MANIFEST_PARSING_ERROR,
                  fatal: e.type === d.PlaylistContextType.MANIFEST,
                  url: t.url,
                  reason: r,
                  response: t,
                  context: e,
                  networkDetails: i
                })
              }
              ,
              e.handleNetworkError = function(t, e, r, i) {
                void 0 === r && (r = !1),
                o.logger.warn("[playlist-loader]: A network " + (r ? "timeout" : "error") + " occurred while loading " + t.type + " level: " + t.level + " id: " + t.id + ' group-id: "' + t.groupId + '"');
                var n = s.ErrorDetails.UNKNOWN
                  , l = !1
                  , u = this.getInternalLoader(t);
                switch (t.type) {
                case d.PlaylistContextType.MANIFEST:
                  n = r ? s.ErrorDetails.MANIFEST_LOAD_TIMEOUT : s.ErrorDetails.MANIFEST_LOAD_ERROR,
                  l = !0;
                  break;
                case d.PlaylistContextType.LEVEL:
                  n = r ? s.ErrorDetails.LEVEL_LOAD_TIMEOUT : s.ErrorDetails.LEVEL_LOAD_ERROR,
                  l = !1;
                  break;
                case d.PlaylistContextType.AUDIO_TRACK:
                  n = r ? s.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : s.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                  l = !1;
                  break;
                case d.PlaylistContextType.SUBTITLE_TRACK:
                  n = r ? s.ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT : s.ErrorDetails.SUBTITLE_LOAD_ERROR,
                  l = !1
                }
                u && this.resetInternalLoader(t.type);
                var c = {
                  type: s.ErrorTypes.NETWORK_ERROR,
                  details: n,
                  fatal: l,
                  url: t.url,
                  loader: u,
                  context: t,
                  networkDetails: e
                };
                i && (c.response = i),
                this.hls.trigger(a.Events.ERROR, c)
              }
              ,
              e.handlePlaylistLoaded = function(t, e, r, i) {
                var n = r.type
                  , s = r.level
                  , o = r.id
                  , l = r.groupId
                  , u = r.loader
                  , c = r.levelDetails
                  , f = r.deliveryDirectives;
                return null != c && c.targetduration ? void (u && (c.live && (u.getCacheAge && (c.ageHeader = u.getCacheAge() || 0),
                (!u.getCacheAge || isNaN(c.ageHeader)) && (c.ageHeader = 0)),
                n === d.PlaylistContextType.MANIFEST || n === d.PlaylistContextType.LEVEL ? this.hls.trigger(a.Events.LEVEL_LOADED, {
                  details: c,
                  level: s || 0,
                  id: o || 0,
                  stats: e,
                  networkDetails: i,
                  deliveryDirectives: f
                }) : n === d.PlaylistContextType.AUDIO_TRACK ? this.hls.trigger(a.Events.AUDIO_TRACK_LOADED, {
                  details: c,
                  id: o || 0,
                  groupId: l || "",
                  stats: e,
                  networkDetails: i,
                  deliveryDirectives: f
                }) : n === d.PlaylistContextType.SUBTITLE_TRACK && this.hls.trigger(a.Events.SUBTITLE_TRACK_LOADED, {
                  details: c,
                  id: o || 0,
                  groupId: l || "",
                  stats: e,
                  networkDetails: i,
                  deliveryDirectives: f
                }))) : void this.handleManifestParsingError(t, r, "invalid target duration", i)
              }
              ,
              t
            }();
            e.default = f
          },
          "./src/polyfills/number.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "isFiniteNumber", (function() {
              return i
            }
            )),
            r.d(e, "MAX_SAFE_INTEGER", (function() {
              return n
            }
            ));
            var i = Number.isFinite || function(t) {
              return "number" == typeof t && isFinite(t)
            }
              , n = Number.MAX_SAFE_INTEGER || 9007199254740991
          },
          "./src/remux/aac-helper.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = function() {
              function t() {}
              return t.getSilentFrame = function(t, e) {
                switch (t) {
                case "mp4a.40.2":
                  if (1 === e)
                    return new Uint8Array([0, 200, 0, 128, 35, 128]);
                  if (2 === e)
                    return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                  if (3 === e)
                    return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                  if (4 === e)
                    return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                  if (5 === e)
                    return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                  if (6 === e)
                    return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                  break;
                default:
                  if (1 === e)
                    return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                  if (2 === e)
                    return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                  if (3 === e)
                    return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                }
              }
              ,
              t
            }();
            e.default = i
          },
          "./src/remux/mp4-generator.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            Math.pow(2, 32);
            var i = function() {
              function t() {}
              return t.init = function() {
                var e;
                for (e in t.types = {
                  avc1: [],
                  avcC: [],
                  btrt: [],
                  dinf: [],
                  dref: [],
                  esds: [],
                  ftyp: [],
                  hdlr: [],
                  mdat: [],
                  mdhd: [],
                  mdia: [],
                  mfhd: [],
                  minf: [],
                  moof: [],
                  moov: [],
                  mp4a: [],
                  ".mp3": [],
                  mvex: [],
                  mvhd: [],
                  pasp: [],
                  sdtp: [],
                  stbl: [],
                  stco: [],
                  stsc: [],
                  stsd: [],
                  stsz: [],
                  stts: [],
                  tfdt: [],
                  tfhd: [],
                  traf: [],
                  trak: [],
                  trun: [],
                  trex: [],
                  tkhd: [],
                  vmhd: [],
                  smhd: []
                },
                t.types)
                  t.types.hasOwnProperty(e) && (t.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
                var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0])
                  , i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                t.HDLR_TYPES = {
                  video: r,
                  audio: i
                };
                var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1])
                  , a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                t.STTS = t.STSC = t.STCO = a,
                t.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                t.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]),
                t.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                t.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                var s = new Uint8Array([105, 115, 111, 109])
                  , o = new Uint8Array([97, 118, 99, 49])
                  , l = new Uint8Array([0, 0, 0, 1]);
                t.FTYP = t.box(t.types.ftyp, s, l, s, o),
                t.DINF = t.box(t.types.dinf, t.box(t.types.dref, n))
              }
              ,
              t.box = function(t) {
                for (var e = 8, r = arguments.length, i = Array(1 < r ? r - 1 : 0), n = 1; n < r; n++)
                  i[n - 1] = arguments[n];
                for (var a = i.length, s = a; a--; )
                  e += i[a].byteLength;
                var o = new Uint8Array(e);
                for (o[0] = 255 & e >> 24,
                o[1] = 255 & e >> 16,
                o[2] = 255 & e >> 8,
                o[3] = 255 & e,
                o.set(t, 4),
                a = 0,
                e = 8; a < s; a++)
                  o.set(i[a], e),
                  e += i[a].byteLength;
                return o
              }
              ,
              t.hdlr = function(e) {
                return t.box(t.types.hdlr, t.HDLR_TYPES[e])
              }
              ,
              t.mdat = function(e) {
                return t.box(t.types.mdat, e)
              }
              ,
              t.mdhd = function(e, r) {
                r *= e;
                var i = Math.floor(r / 4294967296)
                  , n = Math.floor(r % 4294967296);
                return t.box(t.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 255 & e >> 24, 255 & e >> 16, 255 & e >> 8, 255 & e, i >> 24, 255 & i >> 16, 255 & i >> 8, 255 & i, n >> 24, 255 & n >> 16, 255 & n >> 8, 255 & n, 85, 196, 0, 0]))
              }
              ,
              t.mdia = function(e) {
                return t.box(t.types.mdia, t.mdhd(e.timescale, e.duration), t.hdlr(e.type), t.minf(e))
              }
              ,
              t.mfhd = function(e) {
                return t.box(t.types.mfhd, new Uint8Array([0, 0, 0, 0, e >> 24, 255 & e >> 16, 255 & e >> 8, 255 & e]))
              }
              ,
              t.minf = function(e) {
                return "audio" === e.type ? t.box(t.types.minf, t.box(t.types.smhd, t.SMHD), t.DINF, t.stbl(e)) : t.box(t.types.minf, t.box(t.types.vmhd, t.VMHD), t.DINF, t.stbl(e))
              }
              ,
              t.moof = function(e, r, i) {
                return t.box(t.types.moof, t.mfhd(e), t.traf(i, r))
              }
              ,
              t.moov = function(e) {
                for (var r = e.length, i = []; r--; )
                  i[r] = t.trak(e[r]);
                return t.box.apply(null, [t.types.moov, t.mvhd(e[0].timescale, e[0].duration)].concat(i).concat(t.mvex(e)))
              }
              ,
              t.mvex = function(e) {
                for (var r = e.length, i = []; r--; )
                  i[r] = t.trex(e[r]);
                return t.box.apply(null, [t.types.mvex].concat(i))
              }
              ,
              t.mvhd = function(e, r) {
                r *= e;
                var i = Math.floor(r / 4294967296)
                  , n = Math.floor(r % 4294967296)
                  , a = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 255 & e >> 24, 255 & e >> 16, 255 & e >> 8, 255 & e, i >> 24, 255 & i >> 16, 255 & i >> 8, 255 & i, n >> 24, 255 & n >> 16, 255 & n >> 8, 255 & n, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                return t.box(t.types.mvhd, a)
              }
              ,
              t.sdtp = function(e) {
                var r, i, n = e.samples || [], a = new Uint8Array(4 + n.length);
                for (r = 0; r < n.length; r++)
                  i = n[r].flags,
                  a[r + 4] = i.dependsOn << 4 | i.isDependedOn << 2 | i.hasRedundancy;
                return t.box(t.types.sdtp, a)
              }
              ,
              t.stbl = function(e) {
                return t.box(t.types.stbl, t.stsd(e), t.box(t.types.stts, t.STTS), t.box(t.types.stsc, t.STSC), t.box(t.types.stsz, t.STSZ), t.box(t.types.stco, t.STCO))
              }
              ,
              t.avc1 = function(e) {
                var r, i, n, a = [], s = [];
                for (r = 0; r < e.sps.length; r++)
                  n = (i = e.sps[r]).byteLength,
                  a.push(255 & n >>> 8),
                  a.push(255 & n),
                  a = a.concat(Array.prototype.slice.call(i));
                for (r = 0; r < e.pps.length; r++)
                  n = (i = e.pps[r]).byteLength,
                  s.push(255 & n >>> 8),
                  s.push(255 & n),
                  s = s.concat(Array.prototype.slice.call(i));
                var o = t.box(t.types.avcC, new Uint8Array([1, a[3], a[4], a[5], 255, 224 | e.sps.length].concat(a).concat([e.pps.length]).concat(s)))
                  , l = e.width
                  , u = e.height
                  , d = e.pixelRatio[0]
                  , c = e.pixelRatio[1];
                return t.box(t.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255 & l >> 8, 255 & l, 255 & u >> 8, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, t.box(t.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), t.box(t.types.pasp, new Uint8Array([d >> 24, 255 & d >> 16, 255 & d >> 8, 255 & d, c >> 24, 255 & c >> 16, 255 & c >> 8, 255 & c])))
              }
              ,
              t.esds = function(t) {
                var e = t.config.length;
                return new Uint8Array([0, 0, 0, 0, 3, 23 + e, 0, 1, 0, 4, 15 + e, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([e]).concat(t.config).concat([6, 1, 2]))
              }
              ,
              t.mp4a = function(e) {
                var r = e.samplerate;
                return t.box(t.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, 255 & r >> 8, 255 & r, 0, 0]), t.box(t.types.esds, t.esds(e)))
              }
              ,
              t.mp3 = function(e) {
                var r = e.samplerate;
                return t.box(t.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, 255 & r >> 8, 255 & r, 0, 0]))
              }
              ,
              t.stsd = function(e) {
                return "audio" === e.type ? e.isAAC || "mp3" !== e.codec ? t.box(t.types.stsd, t.STSD, t.mp4a(e)) : t.box(t.types.stsd, t.STSD, t.mp3(e)) : t.box(t.types.stsd, t.STSD, t.avc1(e))
              }
              ,
              t.tkhd = function(e) {
                var r = e.id
                  , i = e.duration * e.timescale
                  , n = e.width
                  , a = e.height
                  , s = Math.floor(i / 4294967296)
                  , o = Math.floor(i % 4294967296);
                return t.box(t.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 255 & r >> 24, 255 & r >> 16, 255 & r >> 8, 255 & r, 0, 0, 0, 0, s >> 24, 255 & s >> 16, 255 & s >> 8, 255 & s, o >> 24, 255 & o >> 16, 255 & o >> 8, 255 & o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 255 & n >> 8, 255 & n, 0, 0, 255 & a >> 8, 255 & a, 0, 0]))
              }
              ,
              t.traf = function(e, r) {
                var i = t.sdtp(e)
                  , n = e.id
                  , a = Math.floor(r / 4294967296)
                  , s = Math.floor(r % 4294967296);
                return t.box(t.types.traf, t.box(t.types.tfhd, new Uint8Array([0, 0, 0, 0, n >> 24, 255 & n >> 16, 255 & n >> 8, 255 & n])), t.box(t.types.tfdt, new Uint8Array([1, 0, 0, 0, a >> 24, 255 & a >> 16, 255 & a >> 8, 255 & a, s >> 24, 255 & s >> 16, 255 & s >> 8, 255 & s])), t.trun(e, i.length + 16 + 20 + 8 + 16 + 8 + 8), i)
              }
              ,
              t.trak = function(e) {
                return e.duration = e.duration || 4294967295,
                t.box(t.types.trak, t.tkhd(e), t.mdia(e))
              }
              ,
              t.trex = function(e) {
                var r = e.id;
                return t.box(t.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, 255 & r >> 16, 255 & r >> 8, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
              }
              ,
              t.trun = function(e, r) {
                var i, n, a, s, o, l, u = e.samples || [], d = u.length, c = 12 + 16 * d, f = new Uint8Array(c);
                for (r += 8 + c,
                f.set([0, 0, 15, 1, 255 & d >>> 24, 255 & d >>> 16, 255 & d >>> 8, 255 & d, 255 & r >>> 24, 255 & r >>> 16, 255 & r >>> 8, 255 & r], 0),
                i = 0; i < d; i++)
                  a = (n = u[i]).duration,
                  s = n.size,
                  o = n.flags,
                  l = n.cts,
                  f.set([255 & a >>> 24, 255 & a >>> 16, 255 & a >>> 8, 255 & a, 255 & s >>> 24, 255 & s >>> 16, 255 & s >>> 8, 255 & s, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, 255 & l >>> 24, 255 & l >>> 16, 255 & l >>> 8, 255 & l], 12 + 16 * i);
                return t.box(t.types.trun, f)
              }
              ,
              t.initSegment = function(e) {
                t.types || t.init();
                var r = t.moov(e)
                  , i = new Uint8Array(t.FTYP.byteLength + r.byteLength);
                return i.set(t.FTYP),
                i.set(r, t.FTYP.byteLength),
                i
              }
              ,
              t
            }();
            i.types = void 0,
            i.HDLR_TYPES = void 0,
            i.STTS = void 0,
            i.STSC = void 0,
            i.STCO = void 0,
            i.STSZ = void 0,
            i.VMHD = void 0,
            i.SMHD = void 0,
            i.STSD = void 0,
            i.FTYP = void 0,
            i.DINF = void 0,
            e.default = i
          },
          "./src/remux/mp4-remuxer.ts": function(t, e, r) {
            "use strict";
            function i() {
              return (i = Object.assign || function(t) {
                for (var e, r = 1; r < arguments.length; r++)
                  for (var i in e = arguments[r])
                    Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t
              }
              ).apply(this, arguments)
            }
            function n(t, e) {
              var r;
              if (null === e)
                return t;
              for (r = e < t ? -8589934592 : 8589934592; 4294967296 < Math.abs(t - e); )
                t += r;
              return t
            }
            r.r(e),
            r.d(e, "default", (function() {
              return m
            }
            )),
            r.d(e, "normalizePts", (function() {
              return n
            }
            ));
            var a = r("./src/polyfills/number.ts")
              , s = r("./src/remux/aac-helper.ts")
              , o = r("./src/remux/mp4-generator.ts")
              , l = r("./src/events.ts")
              , u = r("./src/errors.ts")
              , d = r("./src/utils/logger.ts")
              , c = r("./src/types/loader.ts")
              , f = r("./src/utils/timescale-conversion.ts")
              , h = null
              , g = null
              , v = !1
              , m = function() {
              function t(t, e, r, i) {
                if (void 0 === i && (i = ""),
                this.observer = void 0,
                this.config = void 0,
                this.typeSupported = void 0,
                this.ISGenerated = !1,
                this._initPTS = void 0,
                this._initDTS = void 0,
                this.nextAvcDts = null,
                this.nextAudioPts = null,
                this.isAudioContiguous = !1,
                this.isVideoContiguous = !1,
                this.observer = t,
                this.config = e,
                this.typeSupported = r,
                this.ISGenerated = !1,
                null === h) {
                  var n = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                  h = n ? parseInt(n[1]) : 0
                }
                if (null === g) {
                  var a = navigator.userAgent.match(/Safari\/(\d+)/i);
                  g = a ? parseInt(a[1]) : 0
                }
                v = !!h && 75 > h || !!g && 600 > g
              }
              var e = t.prototype;
              return e.destroy = function() {}
              ,
              e.resetTimeStamp = function(t) {
                this._initPTS = this._initDTS = t
              }
              ,
              e.resetNextTimestamp = function() {
                this.isVideoContiguous = !1,
                this.isAudioContiguous = !1
              }
              ,
              e.resetInitSegment = function() {
                this.ISGenerated = !1
              }
              ,
              e.getVideoStartPts = function(t) {
                var e = !1
                  , r = t.reduce((function(t, r) {
                  var i = r.pts - t;
                  return -4294967296 > i ? (e = !0,
                  n(t, r.pts)) : 0 < i ? t : r.pts
                }
                ), t[0].pts);
                return e && d.logger.debug("PTS rollover detected"),
                r
              }
              ,
              e.remux = function(t, e, r, i, a, s, o, l) {
                var u, f, h, g, v, m, p = a, y = a, E = -1 < t.pid, b = -1 < e.pid, T = e.samples.length, A = 0 < t.samples.length, S = 1 < T;
                if ((!E || A) && (!b || S) || this.ISGenerated || o) {
                  this.ISGenerated || (h = this.generateIS(t, e, a));
                  var L = this.isVideoContiguous
                    , k = -1;
                  if (S && (k = function(t) {
                    for (var e = 0; e < t.length; e++)
                      if (t[e].key)
                        return e;
                    return -1
                  }(e.samples),
                  !L && this.config.forceKeyFrameOnDiscontinuity))
                    if (m = !0,
                    0 < k) {
                      d.logger.warn("[mp4-remuxer]: Dropped " + k + " out of " + T + " video samples due to a missing keyframe");
                      var D = this.getVideoStartPts(e.samples);
                      e.samples = e.samples.slice(k),
                      e.dropped += k,
                      y += (e.samples[0].pts - D) / (e.timescale || 9e4)
                    } else
                      -1 === k && (d.logger.warn("[mp4-remuxer]: No keyframe found out of " + T + " video samples"),
                      m = !1);
                  if (this.ISGenerated) {
                    if (A && S) {
                      var _ = this.getVideoStartPts(e.samples)
                        , R = (n(t.samples[0].pts, _) - _) / e.inputTimeScale;
                      p += Math.max(0, R),
                      y += Math.max(0, -R)
                    }
                    if (A) {
                      if (t.samplerate || (d.logger.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"),
                      h = this.generateIS(t, e, a)),
                      f = this.remuxAudio(t, p, this.isAudioContiguous, s, b || S || l === c.PlaylistLevelType.AUDIO ? y : void 0),
                      S) {
                        var C = f ? f.endPTS - f.startPTS : 0;
                        e.inputTimeScale || (d.logger.warn("[mp4-remuxer]: regenerate InitSegment as video detected"),
                        h = this.generateIS(t, e, a)),
                        u = this.remuxVideo(e, y, L, C)
                      }
                    } else
                      S && (u = this.remuxVideo(e, y, L, 0));
                    u && (u.firstKeyFrame = k,
                    u.independent = -1 !== k)
                  }
                }
                return this.ISGenerated && (r.samples.length && (v = this.remuxID3(r, a)),
                i.samples.length && (g = this.remuxText(i, a))),
                {
                  audio: f,
                  video: u,
                  initSegment: h,
                  independent: m,
                  text: g,
                  id3: v
                }
              }
              ,
              e.generateIS = function(t, e, r) {
                var i, s, l, u = t.samples, d = e.samples, c = this.typeSupported, f = {}, h = !Object(a.isFiniteNumber)(this._initPTS), g = "audio/mp4";
                if (h && (i = s = 1 / 0),
                t.config && u.length && (t.timescale = t.samplerate,
                !t.isAAC && (c.mpeg ? (g = "audio/mpeg",
                t.codec = "") : c.mp3 && (t.codec = "mp3")),
                f.audio = {
                  id: "audio",
                  container: g,
                  codec: t.codec,
                  initSegment: !t.isAAC && c.mpeg ? new Uint8Array(0) : o.default.initSegment([t]),
                  metadata: {
                    channelCount: t.channelCount
                  }
                },
                h && (l = t.inputTimeScale,
                i = s = u[0].pts - Math.round(l * r))),
                e.sps && e.pps && d.length && (e.timescale = e.inputTimeScale,
                f.video = {
                  id: "main",
                  container: "video/mp4",
                  codec: e.codec,
                  initSegment: o.default.initSegment([e]),
                  metadata: {
                    width: e.width,
                    height: e.height
                  }
                },
                h)) {
                  l = e.inputTimeScale;
                  var v = this.getVideoStartPts(d)
                    , m = Math.round(l * r);
                  s = Math.min(s, n(d[0].dts, v) - m),
                  i = Math.min(i, v - m)
                }
                return Object.keys(f).length ? (this.ISGenerated = !0,
                h && (this._initPTS = i,
                this._initDTS = s),
                {
                  tracks: f,
                  initPTS: i,
                  timescale: l
                }) : void 0
              }
              ,
              e.remuxVideo = function(t, e, r, a) {
                var s, c, g, m = t.inputTimeScale, y = t.samples, E = [], b = y.length, T = this._initPTS, A = this.nextAvcDts, S = 8, L = Number.POSITIVE_INFINITY, k = Number.NEGATIVE_INFINITY, D = 0, _ = !1;
                r && null !== A || (A = e * m - (y[0].pts - n(y[0].dts, y[0].pts)));
                for (var R, C = 0; C < b; C++)
                  (R = y[C]).pts = n(R.pts - T, A),
                  R.dts = n(R.dts - T, A),
                  R.dts > R.pts && (D = Math.max(Math.min(D, R.pts - R.dts), -18e3)),
                  R.dts < y[0 < C ? C - 1 : C].dts && (_ = !0);
                _ && y.sort((function(t, e) {
                  var r = t.dts - e.dts
                    , i = t.pts - e.pts;
                  return r || i
                }
                )),
                c = y[0].dts,
                g = y[y.length - 1].dts;
                var I = Math.round((g - c) / (b - 1));
                if (0 > D) {
                  if (D < -2 * I) {
                    d.logger.warn("PTS < DTS detected in video samples, offsetting DTS from PTS by " + Object(f.toMsFromMpegTsClock)(-I, !0) + " ms");
                    for (var x = D, w = 0; w < b; w++)
                      y[w].dts = x = Math.max(x, y[w].pts - I),
                      y[w].pts = Math.max(x, y[w].pts)
                  } else {
                    d.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Object(f.toMsFromMpegTsClock)(D, !0) + " ms to overcome this issue");
                    for (var O = 0; O < b; O++)
                      y[O].dts += D
                  }
                  c = y[0].dts
                }
                if (r) {
                  var P = c - A
                    , F = P > I;
                  if (F || -1 > P) {
                    F ? d.logger.warn("AVC: " + Object(f.toMsFromMpegTsClock)(P, !0) + " ms (" + P + "dts) hole between fragments detected, filling it") : d.logger.warn("AVC: " + Object(f.toMsFromMpegTsClock)(-P, !0) + " ms (" + P + "dts) overlapping between fragments detected"),
                    c = A;
                    var M = y[0].pts - P;
                    y[0].dts = c,
                    y[0].pts = M,
                    d.logger.log("Video: First PTS/DTS adjusted: " + Object(f.toMsFromMpegTsClock)(M, !0) + "/" + Object(f.toMsFromMpegTsClock)(c, !0) + ", delta: " + Object(f.toMsFromMpegTsClock)(P, !0) + " ms")
                  }
                }
                v && (c = Math.max(0, c));
                for (var B = 0, N = 0, U = 0; U < b; U++) {
                  for (var G = y[U], j = G.units, H = j.length, V = 0, W = 0; W < H; W++)
                    V += j[W].data.length;
                  N += V,
                  B += H,
                  G.length = V,
                  G.dts = Math.max(G.dts, c),
                  G.pts = Math.max(G.pts, G.dts, 0),
                  L = Math.min(G.pts, L),
                  k = Math.max(G.pts, k)
                }
                g = y[b - 1].dts;
                var K, Y = N + 4 * B + 8;
                try {
                  K = new Uint8Array(Y)
                } catch (t) {
                  return void this.observer.emit(l.Events.ERROR, l.Events.ERROR, {
                    type: u.ErrorTypes.MUX_ERROR,
                    details: u.ErrorDetails.REMUX_ALLOC_ERROR,
                    fatal: !1,
                    bytes: Y,
                    reason: "fail allocating video mdat " + Y
                  })
                }
                var q = new DataView(K.buffer);
                q.setUint32(0, Y),
                K.set(o.default.types.mdat, 4);
                for (var z = 0; z < b; z++) {
                  for (var X = y[z], Q = X.units, $ = 0, Z = 0, J = Q.length; Z < J; Z++) {
                    var tt = Q[Z]
                      , et = tt.data
                      , rt = tt.data.byteLength;
                    q.setUint32(S, rt),
                    S += 4,
                    K.set(et, S),
                    S += rt,
                    $ += 4 + rt
                  }
                  if (z < b - 1)
                    s = y[z + 1].dts - X.dts;
                  else {
                    var it = this.config
                      , nt = X.dts - y[0 < z ? z - 1 : z].dts;
                    if (it.stretchShortVideoTrack && null !== this.nextAudioPts) {
                      var at = Math.floor(it.maxBufferHole * m)
                        , st = (a ? L + a * m : this.nextAudioPts) - X.pts;
                      st > at ? (0 > (s = st - nt) && (s = nt),
                      d.logger.log("[mp4-remuxer]: It is approximately " + st / 90 + " ms to the next segment; using duration " + s / 90 + " ms for the last video frame.")) : s = nt
                    } else
                      s = nt
                  }
                  var ot = Math.round(X.pts - X.dts);
                  E.push(new p(X.key,s,$,ot))
                }
                if (E.length && h && 70 > h) {
                  var lt = E[0].flags;
                  lt.dependsOn = 2,
                  lt.isNonSync = 0
                }
                console.assert(void 0 !== s, "mp4SampleDuration must be computed"),
                this.nextAvcDts = A = g + s,
                this.isVideoContiguous = !0;
                var ut = {
                  data1: o.default.moof(t.sequenceNumber++, c, i({}, t, {
                    samples: E
                  })),
                  data2: K,
                  startPTS: L / m,
                  endPTS: (k + s) / m,
                  startDTS: c / m,
                  endDTS: A / m,
                  type: "video",
                  hasAudio: !1,
                  hasVideo: !0,
                  nb: E.length,
                  dropped: t.dropped
                };
                return t.samples = [],
                t.dropped = 0,
                console.assert(K.length, "MDAT length must not be zero"),
                ut
              }
              ,
              e.remuxAudio = function(t, e, r, a, c) {
                var f = t.inputTimeScale
                  , h = f / (t.samplerate ? t.samplerate : f)
                  , g = t.isAAC ? 1024 : 1152
                  , v = g * h
                  , m = this._initPTS
                  , y = !t.isAAC && this.typeSupported.mpeg
                  , E = []
                  , b = t.samples
                  , T = y ? 0 : 8
                  , A = this.nextAudioPts || -1
                  , S = e * f;
                if (this.isAudioContiguous = r = r || b.length && 0 < A && (a && 9e3 > Math.abs(S - A) || Math.abs(n(b[0].pts - m, S) - A) < 20 * v),
                b.forEach((function(t) {
                  t.pts = n(t.pts - m, S)
                }
                )),
                !r || 0 > A) {
                  if (!(b = b.filter((function(t) {
                    return 0 <= t.pts
                  }
                  ))).length)
                    return;
                  A = 0 === c ? 0 : a ? Math.max(0, S) : b[0].pts
                }
                if (t.isAAC)
                  for (var L = void 0 !== c, k = this.config.maxAudioFramesDrift, D = 0, _ = A; D < b.length; D++) {
                    var R = b[D]
                      , C = R.pts
                      , I = C - _
                      , x = Math.abs(1e3 * I / f);
                    if (I <= -k * v && L)
                      0 === D && (d.logger.warn("Audio frame @ " + (C / f).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1e3 * I / f) + " ms."),
                      this.nextAudioPts = A = _ = C);
                    else if (I >= k * v && 1e4 > x && L) {
                      var w = Math.round(I / v);
                      0 > (_ = C - w * v) && (w--,
                      _ += v),
                      0 === D && (this.nextAudioPts = A = _),
                      d.logger.warn("[mp4-remuxer]: Injecting " + w + " audio frame @ " + (_ / f).toFixed(3) + "s due to " + Math.round(1e3 * I / f) + " ms gap.");
                      for (var O = 0; O < w; O++) {
                        var P = Math.max(_, 0)
                          , F = s.default.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                        F || (d.logger.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."),
                        F = R.unit.subarray()),
                        b.splice(D, 0, {
                          unit: F,
                          pts: P
                        }),
                        _ += v,
                        D++
                      }
                    }
                    R.pts = _,
                    _ += v
                  }
                for (var M, B = null, N = null, U = 0, G = b.length; G--; )
                  U += b[G].unit.byteLength;
                for (var j = 0, H = b.length; j < H; j++) {
                  var V = b[j]
                    , W = V.unit
                    , K = V.pts;
                  if (null !== N)
                    E[j - 1].duration = Math.round((K - N) / h);
                  else {
                    if (r && t.isAAC && (K = A),
                    B = K,
                    !(0 < U))
                      return;
                    U += T;
                    try {
                      M = new Uint8Array(U)
                    } catch (t) {
                      return void this.observer.emit(l.Events.ERROR, l.Events.ERROR, {
                        type: u.ErrorTypes.MUX_ERROR,
                        details: u.ErrorDetails.REMUX_ALLOC_ERROR,
                        fatal: !1,
                        bytes: U,
                        reason: "fail allocating audio mdat " + U
                      })
                    }
                    y || (new DataView(M.buffer).setUint32(0, U),
                    M.set(o.default.types.mdat, 4))
                  }
                  M.set(W, T);
                  var Y = W.byteLength;
                  T += Y,
                  E.push(new p(!0,g,Y,0)),
                  N = K
                }
                var q = E.length;
                if (q) {
                  var z = E[E.length - 1];
                  this.nextAudioPts = A = N + h * z.duration;
                  var X = y ? new Uint8Array(0) : o.default.moof(t.sequenceNumber++, B / h, i({}, t, {
                    samples: E
                  }));
                  t.samples = [];
                  var Q = B / f
                    , $ = A / f
                    , Z = {
                    data1: X,
                    data2: M,
                    startPTS: Q,
                    endPTS: $,
                    startDTS: Q,
                    endDTS: $,
                    type: "audio",
                    hasAudio: !0,
                    hasVideo: !1,
                    nb: q
                  };
                  return this.isAudioContiguous = !0,
                  console.assert(M.length, "MDAT length must not be zero"),
                  Z
                }
              }
              ,
              e.remuxEmptyAudio = function(t, e, r, i) {
                var n = t.inputTimeScale
                  , a = n / (t.samplerate ? t.samplerate : n)
                  , o = this.nextAudioPts
                  , l = (null === o ? i.startDTS * n : o) + this._initDTS
                  , u = i.endDTS * n + this._initDTS
                  , c = 1024 * a
                  , f = Math.ceil((u - l) / c)
                  , h = s.default.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                if (d.logger.warn("[mp4-remuxer]: remux empty Audio"),
                h) {
                  for (var g, v = [], m = 0; m < f; m++)
                    g = l + m * c,
                    v.push({
                      unit: h,
                      pts: g,
                      dts: g
                    });
                  return t.samples = v,
                  this.remuxAudio(t, e, r, !1)
                }
                d.logger.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec")
              }
              ,
              e.remuxID3 = function(t, e) {
                var r = t.samples.length;
                if (r) {
                  for (var i, a = t.inputTimeScale, s = this._initPTS, o = this._initDTS, l = 0; l < r; l++)
                    (i = t.samples[l]).pts = n(i.pts - s, e * a) / a,
                    i.dts = n(i.dts - o, e * a) / a;
                  var u = t.samples;
                  return t.samples = [],
                  {
                    samples: u
                  }
                }
              }
              ,
              e.remuxText = function(t, e) {
                var r = t.samples.length;
                if (r) {
                  for (var i, a = t.inputTimeScale, s = this._initPTS, o = 0; o < r; o++)
                    (i = t.samples[o]).pts = n(i.pts - s, e * a) / a;
                  t.samples.sort((function(t, e) {
                    return t.pts - e.pts
                  }
                  ));
                  var l = t.samples;
                  return t.samples = [],
                  {
                    samples: l
                  }
                }
              }
              ,
              t
            }()
              , p = function(t, e, r, i) {
              this.size = void 0,
              this.duration = void 0,
              this.cts = void 0,
              this.flags = void 0,
              this.duration = e,
              this.size = r,
              this.cts = i,
              this.flags = new y(t)
            }
              , y = function(t) {
              this.isLeading = 0,
              this.isDependedOn = 0,
              this.hasRedundancy = 0,
              this.degradPrio = 0,
              this.dependsOn = 1,
              this.isNonSync = 1,
              this.dependsOn = t ? 2 : 1,
              this.isNonSync = t ? 0 : 1
            }
          },
          "./src/remux/passthrough-remuxer.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              var r = null == t ? void 0 : t.codec;
              return r && 4 < r.length ? r : "hvc1" === r ? "hvc1.1.c.L120.90" : "av01" === r ? "av01.0.04M.08" : "avc1" === r || e === s.ElementaryStreamTypes.VIDEO ? "avc1.42e01e" : "mp4a.40.5"
            }
            r.r(e);
            var n = r("./src/polyfills/number.ts")
              , a = r("./src/utils/mp4-tools.ts")
              , s = r("./src/loader/fragment.ts")
              , o = r("./src/utils/logger.ts")
              , l = function() {
              function t() {
                this.emitInitSegment = !1,
                this.audioCodec = void 0,
                this.videoCodec = void 0,
                this.initData = void 0,
                this.initPTS = void 0,
                this.initTracks = void 0,
                this.lastEndDTS = null
              }
              var e = t.prototype;
              return e.destroy = function() {}
              ,
              e.resetTimeStamp = function(t) {
                this.initPTS = t,
                this.lastEndDTS = null
              }
              ,
              e.resetNextTimestamp = function() {
                this.lastEndDTS = null
              }
              ,
              e.resetInitSegment = function(t, e, r) {
                this.audioCodec = e,
                this.videoCodec = r,
                this.generateInitSegment(t),
                this.emitInitSegment = !0
              }
              ,
              e.generateInitSegment = function(t) {
                var e = this.audioCodec
                  , r = this.videoCodec;
                if (!t || !t.byteLength)
                  return this.initTracks = void 0,
                  void (this.initData = void 0);
                var n = this.initData = Object(a.parseInitSegment)(t);
                e || (e = i(n.audio, s.ElementaryStreamTypes.AUDIO)),
                r || (r = i(n.video, s.ElementaryStreamTypes.VIDEO));
                var l = {};
                n.audio && n.video ? l.audiovideo = {
                  container: "video/mp4",
                  codec: e + "," + r,
                  initSegment: t,
                  id: "main"
                } : n.audio ? l.audio = {
                  container: "audio/mp4",
                  codec: e,
                  initSegment: t,
                  id: "audio"
                } : n.video ? l.video = {
                  container: "video/mp4",
                  codec: r,
                  initSegment: t,
                  id: "main"
                } : o.logger.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."),
                this.initTracks = l
              }
              ,
              e.remux = function(t, e, r, i, s) {
                var l = this.initPTS
                  , d = this.lastEndDTS
                  , c = {
                  audio: void 0,
                  video: void 0,
                  text: i,
                  id3: r,
                  initSegment: void 0
                };
                Object(n.isFiniteNumber)(d) || (d = this.lastEndDTS = s || 0);
                var f = e.samples;
                if (!f || !f.length)
                  return c;
                var h = {
                  initPTS: void 0,
                  timescale: 1
                }
                  , g = this.initData;
                if (g && g.length || (this.generateInitSegment(f),
                g = this.initData),
                !g || !g.length)
                  return o.logger.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."),
                  c;
                this.emitInitSegment && (h.tracks = this.initTracks,
                this.emitInitSegment = !1),
                Object(n.isFiniteNumber)(l) || (this.initPTS = h.initPTS = l = u(g, f, d));
                var v = Object(a.getDuration)(f, g)
                  , m = d
                  , p = v + m;
                Object(a.offsetStartDTS)(g, f, l),
                0 < v ? this.lastEndDTS = p : (o.logger.warn("Duration parsed from mp4 should be greater than zero"),
                this.resetNextTimestamp());
                var y = !!g.audio
                  , E = !!g.video
                  , b = "";
                y && (b += "audio"),
                E && (b += "video");
                var T = {
                  data1: f,
                  startPTS: m,
                  startDTS: m,
                  endPTS: p,
                  endDTS: p,
                  type: b,
                  hasAudio: y,
                  hasVideo: E,
                  nb: 1,
                  dropped: 0
                };
                return c.audio = "audio" === T.type ? T : void 0,
                c.video = "audio" === T.type ? void 0 : T,
                c.text = i,
                c.id3 = r,
                c.initSegment = h,
                c
              }
              ,
              t
            }()
              , u = function(t, e, r) {
              return Object(a.getStartDTS)(t, e) - r
            };
            e.default = l
          },
          "./src/task-loop.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "default", (function() {
              return i
            }
            ));
            var i = function() {
              function t() {
                this._boundTick = void 0,
                this._tickTimer = null,
                this._tickInterval = null,
                this._tickCallCount = 0,
                this._boundTick = this.tick.bind(this)
              }
              var e = t.prototype;
              return e.destroy = function() {
                this.onHandlerDestroying(),
                this.onHandlerDestroyed()
              }
              ,
              e.onHandlerDestroying = function() {
                this.clearNextTick(),
                this.clearInterval()
              }
              ,
              e.onHandlerDestroyed = function() {}
              ,
              e.hasInterval = function() {
                return !!this._tickInterval
              }
              ,
              e.hasNextTick = function() {
                return !!this._tickTimer
              }
              ,
              e.setInterval = function(t) {
                return !this._tickInterval && (this._tickInterval = self.setInterval(this._boundTick, t),
                !0)
              }
              ,
              e.clearInterval = function() {
                return !!this._tickInterval && (self.clearInterval(this._tickInterval),
                this._tickInterval = null,
                !0)
              }
              ,
              e.clearNextTick = function() {
                return !!this._tickTimer && (self.clearTimeout(this._tickTimer),
                this._tickTimer = null,
                !0)
              }
              ,
              e.tick = function() {
                this._tickCallCount++,
                1 === this._tickCallCount && (this.doTick(),
                1 < this._tickCallCount && this.tickImmediate(),
                this._tickCallCount = 0)
              }
              ,
              e.tickImmediate = function() {
                this.clearNextTick(),
                this._tickTimer = self.setTimeout(this._boundTick, 0)
              }
              ,
              e.doTick = function() {}
              ,
              t
            }()
          },
          "./src/types/level.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = 0; i < e.length; i++)
                (r = e[i]).enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
            function n(t, e) {
              var r = t.canSkipUntil
                , i = t.canSkipDateRanges
                , n = t.endSN;
              return r && (void 0 === e ? 0 : e - n) < r ? i ? a.v2 : a.Yes : a.No
            }
            var a;
            r.r(e),
            r.d(e, "HlsSkip", (function() {
              return a
            }
            )),
            r.d(e, "getSkipValue", (function() {
              return n
            }
            )),
            r.d(e, "HlsUrlParameters", (function() {
              return s
            }
            )),
            r.d(e, "Level", (function() {
              return o
            }
            )),
            function(t) {
              t.No = "",
              t.Yes = "YES",
              t.v2 = "v2"
            }(a || (a = {}));
            var s = function() {
              function t(t, e, r) {
                this.msn = void 0,
                this.part = void 0,
                this.skip = void 0,
                this.msn = t,
                this.part = e,
                this.skip = r
              }
              return t.prototype.addDirectives = function(t) {
                var e = new self.URL(t);
                return void 0 !== this.msn && e.searchParams.set("_HLS_msn", this.msn.toString()),
                void 0 !== this.part && e.searchParams.set("_HLS_part", this.part.toString()),
                this.skip && e.searchParams.set("_HLS_skip", this.skip),
                e.toString()
              }
              ,
              t
            }()
              , o = function() {
              function t(t) {
                this.attrs = void 0,
                this.audioCodec = void 0,
                this.bitrate = void 0,
                this.codecSet = void 0,
                this.height = void 0,
                this.id = void 0,
                this.name = void 0,
                this.videoCodec = void 0,
                this.width = void 0,
                this.unknownCodecs = void 0,
                this.audioGroupIds = void 0,
                this.details = void 0,
                this.fragmentError = 0,
                this.loadError = 0,
                this.loaded = void 0,
                this.realBitrate = 0,
                this.textGroupIds = void 0,
                this.url = void 0,
                this._urlId = 0,
                this.url = [t.url],
                this.attrs = t.attrs,
                this.bitrate = t.bitrate,
                t.details && (this.details = t.details),
                this.id = t.id || 0,
                this.name = t.name,
                this.width = t.width || 0,
                this.height = t.height || 0,
                this.audioCodec = t.audioCodec,
                this.videoCodec = t.videoCodec,
                this.unknownCodecs = t.unknownCodecs,
                this.codecSet = [t.videoCodec, t.audioCodec].filter((function(t) {
                  return t
                }
                )).join(",").replace(/\.[^.,]+/g, "")
              }
              return e = t,
              (r = [{
                key: "maxBitrate",
                get: function() {
                  return Math.max(this.realBitrate, this.bitrate)
                }
              }, {
                key: "uri",
                get: function() {
                  return this.url[this._urlId] || ""
                }
              }, {
                key: "urlId",
                get: function() {
                  return this._urlId
                },
                set: function(t) {
                  var e = t % this.url.length;
                  this._urlId !== e && (this.details = void 0,
                  this._urlId = e)
                }
              }]) && i(e.prototype, r),
              n && i(e, n),
              t;
              var e, r, n
            }()
          },
          "./src/types/loader.ts": function(t, e, r) {
            "use strict";
            var i, n;
            r.r(e),
            r.d(e, "PlaylistContextType", (function() {
              return i
            }
            )),
            r.d(e, "PlaylistLevelType", (function() {
              return n
            }
            )),
            function(t) {
              t.MANIFEST = "manifest",
              t.LEVEL = "level",
              t.AUDIO_TRACK = "audioTrack",
              t.SUBTITLE_TRACK = "subtitleTrack"
            }(i || (i = {})),
            function(t) {
              t.MAIN = "main",
              t.AUDIO = "audio",
              t.SUBTITLE = "subtitle"
            }(n || (n = {}))
          },
          "./src/types/transmuxer.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "ChunkMetadata", (function() {
              return i
            }
            ));
            var i = function(t, e, r, i, n, a) {
              void 0 === i && (i = 0),
              void 0 === n && (n = -1),
              void 0 === a && (a = !1),
              this.level = void 0,
              this.sn = void 0,
              this.part = void 0,
              this.id = void 0,
              this.size = void 0,
              this.partial = void 0,
              this.transmuxing = {
                start: 0,
                executeStart: 0,
                executeEnd: 0,
                end: 0
              },
              this.buffering = {
                audio: {
                  start: 0,
                  executeStart: 0,
                  executeEnd: 0,
                  end: 0
                },
                video: {
                  start: 0,
                  executeStart: 0,
                  executeEnd: 0,
                  end: 0
                },
                audiovideo: {
                  start: 0,
                  executeStart: 0,
                  executeEnd: 0,
                  end: 0
                }
              },
              this.level = t,
              this.sn = e,
              this.id = r,
              this.size = i,
              this.part = n,
              this.partial = a
            }
          },
          "./src/utils/attr-list.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "AttrList", (function() {
              return a
            }
            ));
            var i = /^(\d+)x(\d+)$/
              , n = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g
              , a = function() {
              function t(e) {
                for (var r in "string" == typeof e && (e = t.parseAttrList(e)),
                e)
                  e.hasOwnProperty(r) && (this[r] = e[r])
              }
              var e = t.prototype;
              return e.decimalInteger = function(t) {
                var e = parseInt(this[t], 10);
                return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
              }
              ,
              e.hexadecimalInteger = function(t) {
                if (this[t]) {
                  var e = (this[t] || "0x").slice(2);
                  e = (1 & e.length ? "0" : "") + e;
                  for (var r = new Uint8Array(e.length / 2), i = 0; i < e.length / 2; i++)
                    r[i] = parseInt(e.slice(2 * i, 2 * i + 2), 16);
                  return r
                }
                return null
              }
              ,
              e.hexadecimalIntegerAsNumber = function(t) {
                var e = parseInt(this[t], 16);
                return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
              }
              ,
              e.decimalFloatingPoint = function(t) {
                return parseFloat(this[t])
              }
              ,
              e.optionalFloat = function(t, e) {
                var r = this[t];
                return r ? parseFloat(r) : e
              }
              ,
              e.enumeratedString = function(t) {
                return this[t]
              }
              ,
              e.bool = function(t) {
                return "YES" === this[t]
              }
              ,
              e.decimalResolution = function(t) {
                var e = i.exec(this[t]);
                return null === e ? void 0 : {
                  width: parseInt(e[1], 10),
                  height: parseInt(e[2], 10)
                }
              }
              ,
              t.parseAttrList = function(t) {
                var e, r = {};
                for (n.lastIndex = 0; null !== (e = n.exec(t)); ) {
                  var i = e[2];
                  0 === i.indexOf('"') && i.lastIndexOf('"') === i.length - 1 && (i = i.slice(1, -1)),
                  r[e[1]] = i
                }
                return r
              }
              ,
              t
            }()
          },
          "./src/utils/binary-search.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            e.default = {
              search: function(t, e) {
                for (var r = 0, i = t.length - 1, n = null, a = null; r <= i; ) {
                  var s = e(a = t[n = 0 | (r + i) / 2]);
                  if (0 < s)
                    r = n + 1;
                  else {
                    if (!(0 > s))
                      return a;
                    i = n - 1
                  }
                }
                return null
              }
            }
          },
          "./src/utils/buffer-helper.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, "BufferHelper", (function() {
              return a
            }
            ));
            var i = r("./src/utils/logger.ts")
              , n = {
              length: 0,
              start: function() {
                return 0
              },
              end: function() {
                return 0
              }
            }
              , a = function() {
              function t() {}
              return t.isBuffered = function(e, r) {
                try {
                  if (e)
                    for (var i = t.getBuffered(e), n = 0; n < i.length; n++)
                      if (r >= i.start(n) && r <= i.end(n))
                        return !0
                } catch (t) {}
                return !1
              }
              ,
              t.bufferInfo = function(e, r, i) {
                try {
                  if (e) {
                    var n, a = t.getBuffered(e), s = [];
                    for (n = 0; n < a.length; n++)
                      s.push({
                        start: a.start(n),
                        end: a.end(n)
                      });
                    return this.bufferedInfo(s, r, i)
                  }
                } catch (t) {}
                return {
                  len: 0,
                  start: r,
                  end: r,
                  nextStart: void 0
                }
              }
              ,
              t.bufferedInfo = function(t, e, r) {
                e = Math.max(0, e),
                t.sort((function(t, e) {
                  var r = t.start - e.start;
                  return r || e.end - t.end
                }
                ));
                var i = [];
                if (r)
                  for (var n, a = 0; a < t.length; a++)
                    if (n = i.length) {
                      var s = i[n - 1].end;
                      t[a].start - s < r ? t[a].end > s && (i[n - 1].end = t[a].end) : i.push(t[a])
                    } else
                      i.push(t[a]);
                else
                  i = t;
                for (var o, l = 0, u = e, d = e, c = 0; c < i.length; c++) {
                  var f = i[c].start
                    , h = i[c].end;
                  if (e + r >= f && e < h)
                    u = f,
                    l = (d = h) - e;
                  else if (e + r < f) {
                    o = f;
                    break
                  }
                }
                return {
                  len: l,
                  start: u || 0,
                  end: d || 0,
                  nextStart: o
                }
              }
              ,
              t.getBuffered = function(t) {
                try {
                  return t.buffered
                } catch (t) {
                  return i.logger.log("failed to get media.buffered", t),
                  n
                }
              }
              ,
              t
            }()
          },
          "./src/utils/codecs.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              var r = a[e];
              return !!r && !0 === r[t.slice(0, 4)]
            }
            function n(t, e) {
              return MediaSource.isTypeSupported((e || "video") + '/mp4;codecs="' + t + '"')
            }
            r.r(e),
            r.d(e, "isCodecType", (function() {
              return i
            }
            )),
            r.d(e, "isCodecSupportedInMp4", (function() {
              return n
            }
            ));
            var a = {
              audio: {
                a3ds: !0,
                "ac-3": !0,
                "ac-4": !0,
                alac: !0,
                alaw: !0,
                dra1: !0,
                "dts+": !0,
                "dts-": !0,
                dtsc: !0,
                dtse: !0,
                dtsh: !0,
                "ec-3": !0,
                enca: !0,
                g719: !0,
                g726: !0,
                m4ae: !0,
                mha1: !0,
                mha2: !0,
                mhm1: !0,
                mhm2: !0,
                mlpa: !0,
                mp4a: !0,
                "raw ": !0,
                Opus: !0,
                samr: !0,
                sawb: !0,
                sawp: !0,
                sevc: !0,
                sqcp: !0,
                ssmv: !0,
                twos: !0,
                ulaw: !0
              },
              video: {
                avc1: !0,
                avc2: !0,
                avc3: !0,
                avc4: !0,
                avcp: !0,
                av01: !0,
                drac: !0,
                dvav: !0,
                dvhe: !0,
                encv: !0,
                hev1: !0,
                hvc1: !0,
                mjp2: !0,
                mp4v: !0,
                mvc1: !0,
                mvc2: !0,
                mvc3: !0,
                mvc4: !0,
                resv: !0,
                rv60: !0,
                s263: !0,
                svc1: !0,
                svc2: !0,
                "vc-1": !0,
                vp08: !0,
                vp09: !0
              },
              text: {
                stpp: !0,
                wvtt: !0
              }
            }
          },
          "./src/utils/discontinuities.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              for (var r, i = null, n = 0, a = t.length; n < a; n++)
                if ((r = t[n]) && r.cc === e) {
                  i = r;
                  break
                }
              return i
            }
            function n(t, e, r) {
              return !(!e.details || !(r.endCC > r.startCC || t && t.cc < r.startCC))
            }
            function a(t, e) {
              var r = t.fragments
                , n = e.fragments;
              if (n.length && r.length) {
                var a = i(r, n[0].cc);
                return !a || a && !a.startPTS ? void c.logger.log("No frag in previous level to align on") : a
              }
              c.logger.log("No fragments to align")
            }
            function s(t, e) {
              if (t) {
                var r = t.start + e;
                t.start = t.startPTS = r,
                t.endPTS = r + t.duration
              }
            }
            function o(t, e) {
              for (var r = e.fragments, i = 0, n = r.length; i < n; i++)
                s(r[i], t);
              e.fragmentHint && s(e.fragmentHint, t),
              e.alignedSliding = !0
            }
            function l(t, e, r) {
              e && (function(t, e, r) {
                if (n(t, r, e)) {
                  var i = a(r.details, e);
                  i && Object(d.isFiniteNumber)(i.start) && (c.logger.log("Adjusting PTS using last level due to CC increase within current level " + e.url),
                  o(i.start, e))
                }
              }(t, r, e),
              !r.alignedSliding && e.details && u(r, e.details),
              !r.alignedSliding && e.details && !r.skippedSegments && Object(f.adjustSliding)(e.details, r))
            }
            function u(t, e) {
              if (e.fragments.length && t.hasProgramDateTime && e.hasProgramDateTime) {
                var r = e.fragments[0].programDateTime
                  , i = t.fragments[0].programDateTime
                  , n = (i - r) / 1e3 + e.fragments[0].start;
                n && Object(d.isFiniteNumber)(n) && (c.logger.log("Adjusting PTS using programDateTime delta " + (i - r) + "ms, sliding:" + n.toFixed(3) + " " + t.url + " "),
                o(n, t))
              }
            }
            r.r(e),
            r.d(e, "findFirstFragWithCC", (function() {
              return i
            }
            )),
            r.d(e, "shouldAlignOnDiscontinuities", (function() {
              return n
            }
            )),
            r.d(e, "findDiscontinuousReferenceFrag", (function() {
              return a
            }
            )),
            r.d(e, "adjustSlidingStart", (function() {
              return o
            }
            )),
            r.d(e, "alignStream", (function() {
              return l
            }
            )),
            r.d(e, "alignPDT", (function() {
              return u
            }
            ));
            var d = r("./src/polyfills/number.ts")
              , c = r("./src/utils/logger.ts")
              , f = r("./src/controller/level-helper.ts")
          },
          "./src/utils/ewma-bandwidth-estimator.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = r("./src/utils/ewma.ts")
              , n = function() {
              function t(t, e, r) {
                this.defaultEstimate_ = void 0,
                this.minWeight_ = void 0,
                this.minDelayMs_ = void 0,
                this.slow_ = void 0,
                this.fast_ = void 0,
                this.defaultEstimate_ = r,
                this.minWeight_ = .001,
                this.minDelayMs_ = 50,
                this.slow_ = new i.default(t),
                this.fast_ = new i.default(e)
              }
              var e = t.prototype;
              return e.update = function(t, e) {
                var r = this.slow_
                  , n = this.fast_;
                this.slow_.halfLife !== t && (this.slow_ = new i.default(t,r.getEstimate(),r.getTotalWeight())),
                this.fast_.halfLife !== e && (this.fast_ = new i.default(e,n.getEstimate(),n.getTotalWeight()))
              }
              ,
              e.sample = function(t, e) {
                var r = (t = Math.max(t, this.minDelayMs_)) / 1e3
                  , i = 8 * e / r;
                this.fast_.sample(r, i),
                this.slow_.sample(r, i)
              }
              ,
              e.canEstimate = function() {
                var t = this.fast_;
                return t && t.getTotalWeight() >= this.minWeight_
              }
              ,
              e.getEstimate = function() {
                return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
              }
              ,
              e.destroy = function() {}
              ,
              t
            }();
            e.default = n
          },
          "./src/utils/ewma.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = function() {
              function t(t, e, r) {
                void 0 === e && (e = 0),
                void 0 === r && (r = 0),
                this.halfLife = void 0,
                this.alpha_ = void 0,
                this.estimate_ = void 0,
                this.totalWeight_ = void 0,
                this.halfLife = t,
                this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0,
                this.estimate_ = e,
                this.totalWeight_ = r
              }
              var e = t.prototype;
              return e.sample = function(t, e) {
                var r = Math.pow(this.alpha_, t);
                this.estimate_ = e * (1 - r) + r * this.estimate_,
                this.totalWeight_ += t
              }
              ,
              e.getTotalWeight = function() {
                return this.totalWeight_
              }
              ,
              e.getEstimate = function() {
                if (this.alpha_) {
                  var t = 1 - Math.pow(this.alpha_, this.totalWeight_);
                  if (t)
                    return this.estimate_ / t
                }
                return this.estimate_
              }
              ,
              t
            }();
            e.default = i
          },
          "./src/utils/fetch-loader.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              var e = "function" == typeof Map ? new Map : void 0;
              return (i = function(t) {
                function r() {
                  return n(t, arguments, o(this).constructor)
                }
                if (null === t || (i = t,
                -1 === Function.toString.call(i).indexOf("[native code]")))
                  return t;
                var i;
                if ("function" != typeof t)
                  throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== e) {
                  if (e.has(t))
                    return e.get(t);
                  e.set(t, r)
                }
                return r.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                  }
                }),
                s(r, t)
              }
              )(t)
            }
            function n(t, e, r) {
              return (n = a() ? Reflect.construct : function(t, e, r) {
                var i = [null];
                i.push.apply(i, e);
                var n = new (Function.bind.apply(t, i));
                return r && s(n, r.prototype),
                n
              }
              ).apply(null, arguments)
            }
            function a() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham)
                return !1;
              if ("function" == typeof Proxy)
                return !0;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
              } catch (t) {
                return !1
              }
            }
            function s(t, e) {
              return (s = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e,
                t
              }
              )(t, e)
            }
            function o(t) {
              return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
              }
              )(t)
            }
            function l() {
              if (self.fetch && self.AbortController && self.ReadableStream && self.Request)
                try {
                  return new self.ReadableStream({}),
                  !0
                } catch (t) {}
              return !1
            }
            function u(t, e) {
              return new self.Request(t.url,e)
            }
            r.r(e),
            r.d(e, "fetchSupported", (function() {
              return l
            }
            ));
            var d = r("./src/polyfills/number.ts")
              , c = r("./src/loader/load-stats.ts")
              , f = r("./src/demux/chunk-cache.ts")
              , h = function() {
              function t(t) {
                this.fetchSetup = void 0,
                this.requestTimeout = void 0,
                this.request = void 0,
                this.response = void 0,
                this.controller = void 0,
                this.context = void 0,
                this.config = null,
                this.callbacks = null,
                this.stats = void 0,
                this.loader = null,
                this.fetchSetup = t.fetchSetup || u,
                this.controller = new self.AbortController,
                this.stats = new c.LoadStats
              }
              var e = t.prototype;
              return e.destroy = function() {
                this.loader = this.callbacks = null,
                this.abortInternal()
              }
              ,
              e.abortInternal = function() {
                var t = this.response;
                t && t.ok || (this.stats.aborted = !0,
                this.controller.abort())
              }
              ,
              e.abort = function() {
                var t;
                this.abortInternal(),
                null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response)
              }
              ,
              e.load = function(t, e, r) {
                var i = this
                  , n = this.stats;
                if (n.loading.start)
                  throw new Error("Loader can only be used once.");
                n.loading.start = self.performance.now();
                var a = function(t, e) {
                  var r = {
                    method: "GET",
                    mode: "cors",
                    credentials: "same-origin",
                    signal: e
                  };
                  return t.rangeEnd && (r.headers = new self.Headers({
                    Range: "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)
                  })),
                  r
                }(t, this.controller.signal)
                  , s = r.onProgress
                  , o = "arraybuffer" === t.responseType
                  , l = o ? "byteLength" : "length";
                this.context = t,
                this.config = e,
                this.callbacks = r,
                this.request = this.fetchSetup(t, a),
                self.clearTimeout(this.requestTimeout),
                this.requestTimeout = self.setTimeout((function() {
                  i.abortInternal(),
                  r.onTimeout(n, t, i.response)
                }
                ), e.timeout),
                self.fetch(this.request).then((function(r) {
                  if (i.response = i.loader = r,
                  !r.ok) {
                    var a = r.status
                      , l = r.statusText;
                    throw new g(l || "fetch, bad network response",a,r)
                  }
                  return n.loading.first = Math.max(self.performance.now(), n.loading.start),
                  n.total = parseInt(r.headers.get("Content-Length") || "0"),
                  s && Object(d.isFiniteNumber)(e.highWaterMark) ? i.loadProgressively(r, n, t, e.highWaterMark, s) : o ? r.arrayBuffer() : r.text()
                }
                )).then((function(a) {
                  var o = i.response;
                  self.clearTimeout(i.requestTimeout),
                  n.loading.end = Math.max(self.performance.now(), n.loading.first),
                  n.loaded = n.total = a[l];
                  var u = {
                    url: o.url,
                    data: a
                  };
                  s && !Object(d.isFiniteNumber)(e.highWaterMark) && s(n, t, a, o),
                  r.onSuccess(u, n, t, o)
                }
                )).catch((function(e) {
                  if (self.clearTimeout(i.requestTimeout),
                  !n.aborted) {
                    var a = e.code || 0;
                    r.onError({
                      code: a,
                      text: e.message
                    }, t, e.details)
                  }
                }
                ))
              }
              ,
              e.getCacheAge = function() {
                var t = null;
                if (this.response) {
                  var e = this.response.headers.get("age");
                  t = e ? parseFloat(e) : null
                }
                return t
              }
              ,
              e.loadProgressively = function(t, e, r, i, n) {
                void 0 === i && (i = 0);
                var a = new f.default
                  , s = t.body.getReader();
                return function o() {
                  return s.read().then((function(s) {
                    if (s.done)
                      return a.dataLength && n(e, r, a.flush(), t),
                      Promise.resolve(new ArrayBuffer(0));
                    var l = s.value
                      , u = l.length;
                    return e.loaded += u,
                    u < i || a.dataLength ? (a.push(l),
                    a.dataLength >= i && n(e, r, a.flush(), t)) : n(e, r, l, t),
                    o()
                  }
                  )).catch((function() {
                    return Promise.reject()
                  }
                  ))
                }()
              }
              ,
              t
            }()
              , g = function(t) {
              function e(e, r, i) {
                var n;
                return (n = t.call(this, e) || this).code = void 0,
                n.details = void 0,
                n.code = r,
                n.details = i,
                n
              }
              return i = t,
              (r = e).prototype = Object.create(i.prototype),
              r.prototype.constructor = r,
              s(r, i),
              e;
              var r, i
            }(i(Error));
            e.default = h
          },
          "./src/utils/logger.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              var e = self.console[t];
              return e ? e.bind(self.console, "[" + t + "] >") : a
            }
            function n(t) {
              if (self.console && !0 === t || "object" == typeof t) {
                !function(t) {
                  for (var e = arguments.length, r = Array(1 < e ? e - 1 : 0), n = 1; n < e; n++)
                    r[n - 1] = arguments[n];
                  r.forEach((function(e) {
                    o[e] = t[e] ? t[e].bind(t) : i(e)
                  }
                  ))
                }(t, "debug", "log", "info", "warn", "error");
                try {
                  o.log()
                } catch (t) {
                  o = s
                }
              } else
                o = s
            }
            r.r(e),
            r.d(e, "enableLogs", (function() {
              return n
            }
            )),
            r.d(e, "logger", (function() {
              return l
            }
            ));
            var a = function() {}
              , s = {
              trace: a,
              debug: a,
              log: a,
              warn: a,
              info: a,
              error: a
            }
              , o = s
              , l = s
          },
          "./src/utils/mediakeys-helper.ts": function(t, e, r) {
            "use strict";
            var i;
            r.r(e),
            r.d(e, "KeySystems", (function() {
              return i
            }
            )),
            r.d(e, "requestMediaKeySystemAccess", (function() {
              return n
            }
            )),
            function(t) {
              t.WIDEVINE = "com.widevine.alpha",
              t.PLAYREADY = "com.microsoft.playready"
            }(i || (i = {}));
            var n = "undefined" != typeof self && self.navigator && self.navigator.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null
          },
          "./src/utils/mediasource-helper.ts": function(t, e, r) {
            "use strict";
            function i() {
              return self.MediaSource || self.WebKitMediaSource
            }
            r.r(e),
            r.d(e, "getMediaSource", (function() {
              return i
            }
            ))
          },
          "./src/utils/mp4-tools.ts": function(t, e, r) {
            "use strict";
            function i(t) {
              return String.fromCharCode.apply(null, t)
            }
            function n(t, e) {
              "data"in t && (e += t.start,
              t = t.data);
              var r = t[e] << 8 | t[e + 1];
              return 0 > r ? 65536 + r : r
            }
            function a(t, e) {
              "data"in t && (e += t.start,
              t = t.data);
              var r = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3];
              return 0 > r ? 4294967296 + r : r
            }
            function s(t, e, r) {
              "data"in t && (e += t.start,
              t = t.data),
              t[e] = r >> 24,
              t[e + 1] = 255 & r >> 16,
              t[e + 2] = 255 & r >> 8,
              t[e + 3] = 255 & r
            }
            function o(t, e) {
              var r, n, s, l = [];
              if (!e.length)
                return l;
              "data"in t ? (r = t.data,
              n = t.start,
              s = t.end) : (n = 0,
              s = (r = t).byteLength);
              for (var u = n; u < s; ) {
                var d = a(r, u)
                  , c = 1 < d ? u + d : s;
                if (i(r.subarray(u + 4, u + 8)) === e[0])
                  if (1 === e.length)
                    l.push({
                      data: r,
                      start: u + 8,
                      end: c
                    });
                  else {
                    var f = o({
                      data: r,
                      start: u + 8,
                      end: c
                    }, e.slice(1));
                    f.length && y.apply(l, f)
                  }
                u = c
              }
              return l
            }
            function l(t) {
              var e = o(t, ["moov"])[0]
                , r = e ? e.end : null
                , i = o(t, ["sidx"]);
              if (!i || !i[0])
                return null;
              var s = []
                , l = i[0]
                , u = l.data[0]
                , d = 0 === u ? 8 : 16
                , c = a(l, d);
              d += 4,
              d += 0 === u ? 8 : 16,
              d += 2;
              var f = l.end + 0
                , h = n(l, d);
              d += 2;
              for (var g = 0; g < h; g++) {
                var v = d
                  , m = a(l, v);
                v += 4;
                var p = 2147483647 & m;
                if (1 == (2147483648 & m) >>> 31)
                  return console.warn("SIDX has hierarchical references (not supported)"),
                  null;
                var y = a(l, v);
                v += 4,
                s.push({
                  referenceSize: p,
                  subsegmentDuration: y,
                  info: {
                    duration: y / c,
                    start: f,
                    end: f + p - 1
                  }
                }),
                f += p,
                d = v += 4
              }
              return {
                earliestPresentationTime: 0,
                timescale: c,
                version: u,
                referencesCount: h,
                references: s,
                moovEndOffset: r
              }
            }
            function u(t) {
              for (var e = [], r = o(t, ["moov", "trak"]), n = 0; n < r.length; n++) {
                var s = r[n]
                  , l = o(s, ["tkhd"])[0];
                if (l) {
                  var u = l.data[l.start]
                    , d = 0 === u ? 12 : 20
                    , c = a(l, d)
                    , f = o(s, ["mdia", "mdhd"])[0];
                  if (f) {
                    var h = a(f, d = 0 === (u = f.data[f.start]) ? 12 : 20)
                      , g = o(s, ["mdia", "hdlr"])[0];
                    if (g) {
                      var v = i(g.data.subarray(g.start + 8, g.start + 12))
                        , m = {
                        soun: p.ElementaryStreamTypes.AUDIO,
                        vide: p.ElementaryStreamTypes.VIDEO
                      }[v];
                      if (m) {
                        var y = o(s, ["mdia", "minf", "stbl", "stsd"])[0]
                          , E = void 0;
                        y && (E = i(y.data.subarray(y.start + 12, y.start + 16))),
                        e[c] = {
                          timescale: h,
                          type: m
                        },
                        e[m] = {
                          timescale: h,
                          id: c,
                          codec: E
                        }
                      }
                    }
                  }
                }
              }
              return o(t, ["moov", "mvex", "trex"]).forEach((function(t) {
                var r = a(t, 4)
                  , i = e[r];
                i && (i.default = {
                  duration: a(t, 12),
                  flags: a(t, 20)
                })
              }
              )),
              e
            }
            function d(t, e) {
              return o(e, ["moof", "traf"]).reduce((function(e, r) {
                var i = o(r, ["tfdt"])[0]
                  , n = i.data[i.start]
                  , s = o(r, ["tfhd"]).reduce((function(e, r) {
                  var s = a(r, 4)
                    , o = t[s];
                  if (o) {
                    var l = a(i, 4);
                    1 === n && (l *= Math.pow(2, 32),
                    l += a(i, 8));
                    var u = l / (o.timescale || 9e4);
                    if (isFinite(u) && (null === e || u < e))
                      return u
                  }
                  return e
                }
                ), null);
                return null !== s && isFinite(s) && (null === e || s < e) ? s : e
              }
              ), null) || 0
            }
            function c(t, e) {
              for (var r = 0, i = 0, n = 0, s = o(t, ["moof", "traf"]), u = 0; u < s.length; u++) {
                var d = s[u]
                  , c = o(d, ["tfhd"])[0]
                  , h = e[a(c, 4)];
                if (h) {
                  var g = h.default
                    , v = a(c, 0) | (null == g ? void 0 : g.flags)
                    , m = null == g ? void 0 : g.duration;
                  8 & v && (m = a(c, 2 & v ? 12 : 8));
                  for (var y = h.timescale || 9e4, E = o(d, ["trun"]), b = 0; b < E.length; b++)
                    r = m ? m * a(E[b], 4) : f(E[b]),
                    h.type === p.ElementaryStreamTypes.VIDEO ? i += r / y : h.type === p.ElementaryStreamTypes.AUDIO && (n += r / y)
                }
              }
              if (0 === i && 0 === n) {
                var T = l(t);
                if (null != T && T.references)
                  return T.references.reduce((function(t, e) {
                    return t + e.info.duration || 0
                  }
                  ), 0)
              }
              return i || n
            }
            function f(t) {
              var e = a(t, 0)
                , r = 8;
              1 & e && (r += 4),
              4 & e && (r += 4);
              for (var i = 0, n = a(t, 4), s = 0; s < n; s++)
                256 & e && (i += a(t, r),
                r += 4),
                512 & e && (r += 4),
                1024 & e && (r += 4),
                2048 & e && (r += 4);
              return i
            }
            function h(t, e, r) {
              o(e, ["moof", "traf"]).forEach((function(e) {
                o(e, ["tfhd"]).forEach((function(i) {
                  var n = a(i, 4)
                    , l = t[n];
                  if (l) {
                    var u = l.timescale || 9e4;
                    o(e, ["tfdt"]).forEach((function(t) {
                      var e = t.data[t.start]
                        , i = a(t, 4);
                      if (0 === e)
                        s(t, 4, i - r * u);
                      else {
                        i *= Math.pow(2, 32),
                        i += a(t, 8),
                        i -= r * u,
                        i = Math.max(i, 0);
                        var n = Math.floor(i / 4294967296)
                          , o = Math.floor(i % 4294967296);
                        s(t, 4, n),
                        s(t, 8, o)
                      }
                    }
                    ))
                  }
                }
                ))
              }
              ))
            }
            function g(t) {
              var e = {
                valid: null,
                remainder: null
              }
                , r = o(t, ["moof"]);
              if (!r)
                return e;
              if (2 > r.length)
                return e.remainder = t,
                e;
              var i = r[r.length - 1];
              return e.valid = Object(m.sliceUint8)(t, 0, i.start - 8),
              e.remainder = Object(m.sliceUint8)(t, i.start - 8),
              e
            }
            function v(t, e) {
              var r = new Uint8Array(t.length + e.length);
              return r.set(t),
              r.set(e, t.length),
              r
            }
            r.r(e),
            r.d(e, "bin2str", (function() {
              return i
            }
            )),
            r.d(e, "readUint16", (function() {
              return n
            }
            )),
            r.d(e, "readUint32", (function() {
              return a
            }
            )),
            r.d(e, "writeUint32", (function() {
              return s
            }
            )),
            r.d(e, "findBox", (function() {
              return o
            }
            )),
            r.d(e, "parseSegmentIndex", (function() {
              return l
            }
            )),
            r.d(e, "parseInitSegment", (function() {
              return u
            }
            )),
            r.d(e, "getStartDTS", (function() {
              return d
            }
            )),
            r.d(e, "getDuration", (function() {
              return c
            }
            )),
            r.d(e, "computeRawDurationFromSamples", (function() {
              return f
            }
            )),
            r.d(e, "offsetStartDTS", (function() {
              return h
            }
            )),
            r.d(e, "segmentValidRange", (function() {
              return g
            }
            )),
            r.d(e, "appendUint8Array", (function() {
              return v
            }
            ));
            var m = r("./src/utils/typed-array.ts")
              , p = r("./src/loader/fragment.ts")
              , y = (Math.pow(2, 32),
            [].push)
          },
          "./src/utils/texttrack-utils.ts": function(t, e, r) {
            "use strict";
            function i(t, e) {
              var r;
              try {
                r = new Event("addtrack")
              } catch (t) {
                (r = document.createEvent("Event")).initEvent("addtrack", !1, !1)
              }
              r.track = t,
              e.dispatchEvent(r)
            }
            function n(t, e) {
              var r = t.mode;
              if ("disabled" === r && (t.mode = "hidden"),
              t.cues && !t.cues.getCueById(e.id))
                try {
                  if (t.addCue(e),
                  !t.cues.getCueById(e.id))
                    throw new Error("addCue is failed for: " + e)
                } catch (r) {
                  l.logger.debug("[texttrack-utils]: " + r);
                  var i = new self.TextTrackCue(e.startTime,e.endTime,e.text);
                  i.id = e.id,
                  t.addCue(i)
                }
              "disabled" === r && (t.mode = r)
            }
            function a(t) {
              var e = t.mode;
              if ("disabled" === e && (t.mode = "hidden"),
              t.cues)
                for (var r = t.cues.length; r--; )
                  t.removeCue(t.cues[r]);
              "disabled" === e && (t.mode = e)
            }
            function s(t, e, r) {
              var i = t.mode;
              if ("disabled" === i && (t.mode = "hidden"),
              t.cues && 0 < t.cues.length)
                for (var n = o(t.cues, e, r), a = 0; a < n.length; a++)
                  t.removeCue(n[a]);
              "disabled" === i && (t.mode = i)
            }
            function o(t, e, r) {
              var i = []
                , n = function(t, e) {
                if (e < t[0].startTime)
                  return 0;
                var r = t.length - 1;
                if (e > t[r].endTime)
                  return -1;
                for (var i, n = 0, a = r; n <= a; )
                  if (e < t[i = Math.floor((a + n) / 2)].startTime)
                    a = i - 1;
                  else {
                    if (!(e > t[i].startTime && n < r))
                      return i;
                    n = i + 1
                  }
                return t[n].startTime - e < e - t[a].startTime ? n : a
              }(t, e);
              if (-1 < n)
                for (var a, s = n, o = t.length; s < o; s++)
                  if ((a = t[s]).startTime >= e && a.endTime <= r)
                    i.push(a);
                  else if (a.startTime > r)
                    return i;
              return i
            }
            r.r(e),
            r.d(e, "sendAddTrackEvent", (function() {
              return i
            }
            )),
            r.d(e, "addCueToTrack", (function() {
              return n
            }
            )),
            r.d(e, "clearCurrentCues", (function() {
              return a
            }
            )),
            r.d(e, "removeCuesInRange", (function() {
              return s
            }
            )),
            r.d(e, "getCuesInRange", (function() {
              return o
            }
            ));
            var l = r("./src/utils/logger.ts")
          },
          "./src/utils/time-ranges.ts": function(t, e, r) {
            "use strict";
            r.r(e),
            e.default = {
              toString: function(t) {
                for (var e = "", r = t.length, i = 0; i < r; i++)
                  e += "[" + t.start(i).toFixed(3) + "," + t.end(i).toFixed(3) + "]";
                return e
              }
            }
          },
          "./src/utils/timescale-conversion.ts": function(t, e, r) {
            "use strict";
            function i(t, e, r, i) {
              void 0 === r && (r = 1),
              void 0 === i && (i = !1);
              var n = t * e * r;
              return i ? Math.round(n) : n
            }
            function n(t, e, r, n) {
              return void 0 === r && (r = 1),
              void 0 === n && (n = !1),
              i(t, e, 1 / r, n)
            }
            function a(t, e) {
              return void 0 === e && (e = !1),
              i(t, 1e3, 1 / 9e4, e)
            }
            function s(t, e) {
              return void 0 === e && (e = 1),
              i(t, 9e4, 1 / e)
            }
            r.r(e),
            r.d(e, "toTimescaleFromBase", (function() {
              return i
            }
            )),
            r.d(e, "toTimescaleFromScale", (function() {
              return n
            }
            )),
            r.d(e, "toMsFromMpegTsClock", (function() {
              return a
            }
            )),
            r.d(e, "toMpegTsClockFromTimescale", (function() {
              return s
            }
            ))
          },
          "./src/utils/typed-array.ts": function(t, e, r) {
            "use strict";
            function i(t, e, r) {
              return Uint8Array.prototype.slice ? t.slice(e, r) : new Uint8Array(Array.prototype.slice.call(t, e, r))
            }
            r.r(e),
            r.d(e, "sliceUint8", (function() {
              return i
            }
            ))
          },
          "./src/utils/xhr-loader.ts": function(t, e, r) {
            "use strict";
            r.r(e);
            var i = r("./src/utils/logger.ts")
              , n = r("./src/loader/load-stats.ts")
              , a = /^age:\s*[\d.]+\s*$/m
              , s = function() {
              function t(t) {
                this.xhrSetup = void 0,
                this.requestTimeout = void 0,
                this.retryTimeout = void 0,
                this.retryDelay = void 0,
                this.config = null,
                this.callbacks = null,
                this.context = void 0,
                this.loader = null,
                this.stats = void 0,
                this.xhrSetup = t ? t.xhrSetup : null,
                this.stats = new n.LoadStats,
                this.retryDelay = 0
              }
              var e = t.prototype;
              return e.destroy = function() {
                this.callbacks = null,
                this.abortInternal(),
                this.loader = null,
                this.config = null
              }
              ,
              e.abortInternal = function() {
                var t = this.loader;
                self.clearTimeout(this.requestTimeout),
                self.clearTimeout(this.retryTimeout),
                t && (t.onreadystatechange = null,
                t.onprogress = null,
                4 !== t.readyState && (this.stats.aborted = !0,
                t.abort()))
              }
              ,
              e.abort = function() {
                var t;
                this.abortInternal(),
                null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader)
              }
              ,
              e.load = function(t, e, r) {
                if (this.stats.loading.start)
                  throw new Error("Loader can only be used once.");
                this.stats.loading.start = self.performance.now(),
                this.context = t,
                this.config = e,
                this.callbacks = r,
                this.retryDelay = e.retryDelay,
                this.loadInternal()
              }
              ,
              e.loadInternal = function() {
                var t = this.config
                  , e = this.context;
                if (t) {
                  var r = this.loader = new self.XMLHttpRequest
                    , i = this.stats;
                  i.loading.first = 0,
                  i.loaded = 0;
                  var n = this.xhrSetup;
                  try {
                    if (n)
                      try {
                        n(r, e.url)
                      } catch (t) {
                        r.open("GET", e.url, !0),
                        n(r, e.url)
                      }
                    r.readyState || r.open("GET", e.url, !0)
                  } catch (t) {
                    return void this.callbacks.onError({
                      code: r.status,
                      text: t.message
                    }, e, r)
                  }
                  e.rangeEnd && r.setRequestHeader("Range", "bytes=" + e.rangeStart + "-" + (e.rangeEnd - 1)),
                  r.onreadystatechange = this.readystatechange.bind(this),
                  r.onprogress = this.loadprogress.bind(this),
                  r.responseType = e.responseType,
                  self.clearTimeout(this.requestTimeout),
                  this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), t.timeout),
                  r.send()
                }
              }
              ,
              e.readystatechange = function() {
                var t = this.context
                  , e = this.loader
                  , r = this.stats;
                if (t && e) {
                  var n = e.readyState
                    , a = this.config;
                  if (!r.aborted && 2 <= n)
                    if (self.clearTimeout(this.requestTimeout),
                    0 === r.loading.first && (r.loading.first = Math.max(self.performance.now(), r.loading.start)),
                    4 === n) {
                      e.onreadystatechange = null,
                      e.onprogress = null;
                      var s = e.status;
                      if (200 <= s && 300 > s) {
                        var o, l;
                        if (r.loading.end = Math.max(self.performance.now(), r.loading.first),
                        l = "arraybuffer" === t.responseType ? (o = e.response).byteLength : (o = e.responseText).length,
                        r.loaded = r.total = l,
                        !this.callbacks)
                          return;
                        var u = this.callbacks.onProgress;
                        if (u && u(r, t, o, e),
                        !this.callbacks)
                          return;
                        var d = {
                          url: e.responseURL,
                          data: o
                        };
                        this.callbacks.onSuccess(d, r, t, e)
                      } else
                        r.retry >= a.maxRetry || 400 <= s && 499 > s ? (i.logger.error(s + " while loading " + t.url),
                        this.callbacks.onError({
                          code: s,
                          text: e.statusText
                        }, t, e)) : (i.logger.warn(s + " while loading " + t.url + ", retrying in " + this.retryDelay + "..."),
                        this.abortInternal(),
                        this.loader = null,
                        self.clearTimeout(this.retryTimeout),
                        this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay),
                        this.retryDelay = Math.min(2 * this.retryDelay, a.maxRetryDelay),
                        r.retry++)
                    } else
                      self.clearTimeout(this.requestTimeout),
                      this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), a.timeout)
                }
              }
              ,
              e.loadtimeout = function() {
                i.logger.warn("timeout while loading " + this.context.url);
                var t = this.callbacks;
                t && (this.abortInternal(),
                t.onTimeout(this.stats, this.context, this.loader))
              }
              ,
              e.loadprogress = function(t) {
                var e = this.stats;
                e.loaded = t.loaded,
                t.lengthComputable && (e.total = t.total)
              }
              ,
              e.getCacheAge = function() {
                var t = null;
                if (this.loader && a.test(this.loader.getAllResponseHeaders())) {
                  var e = this.loader.getResponseHeader("age");
                  t = e ? parseFloat(e) : null
                }
                return t
              }
              ,
              t
            }();
            e.default = s
          }
        }).default
      }
      ,
      t.exports = e())
    }
  }
    , e = {};
  function r(i) {
    var n = e[i];
    if (void 0 !== n)
      return n.exports;
    var a = e[i] = {
      exports: {}
    };
    return t[i].call(a.exports, a, a.exports, r),
    a.exports
  }
  r.n = t=>{
    var e = t && t.__esModule ? ()=>t.default : ()=>t;
    return r.d(e, {
      a: e
    }),
    e
  }
  ,
  r.d = (t,e)=>{
    for (var i in e)
      r.o(e, i) && !r.o(t, i) && Object.defineProperty(t, i, {
        enumerable: !0,
        get: e[i]
      })
  }
  ,
  r.o = (t,e)=>Object.prototype.hasOwnProperty.call(t, e),
  r.r = t=>{
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }),
    Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }
  ;
  var i = {};
  (()=>{
    "use strict";
    r.r(i);
    var t = r(1)
      , e = r(323);
    t.default.define("engines/hls_video.js", e.default)
  }
  )()
}
)();
