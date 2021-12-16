/*! For license information please see the LICENSE file. */
(this.webpackJsonpapp = this.webpackJsonpapp || []).push([
  [0],
  {
    103: function (e, c, t) {},
    105: function (e, c, t) {},
    106: function (e, c, t) {},
    107: function (e, c, t) {},
    111: function (e, c, t) {},
    112: function (e, c, t) {},
    113: function (e, c, t) {},
    115: function (e, c, t) {},
    116: function (e, c, t) {},
    117: function (e, c, t) {},
    118: function (e, c, t) {},
    123: function (e, c, t) {},
    124: function (e, c, t) {},
    125: function (e, c, t) {},
    126: function (e, c, t) {},
    127: function (e, c, t) {},
    129: function (e, c, t) {
      "use strict";
      t.r(c),
        t.d(c, "store", function () {
          return ke;
        });
      var n = t(0),
        a = t.n(n),
        s = t(31),
        r = t.n(s),
        o = (t(75), t(28)),
        i = t(3),
        u = t(21),
        b = t(17),
        l = (t(81), t(7)),
        h = t.n(l),
        d = t(15),
        k = t(59),
        m = t.n(k),
        f = t(34),
        g = t.n(f);
      g.a.config();
      var j = "/api/get_all_message",
        p = "/api/get_all_users",
        v = "/api/sign_up",
        x = "/api/login",
        O = "/api/get_user",
        y = m.a.create({ baseURL: "https://chill-chat.alvinc888.repl.co/" }),
        w = (function () {
          var e = Object(d.a)(
            h.a.mark(function e(c, t) {
              var n;
              return h.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ((n = !1),
                          void 0 === c || void 0 === t
                            ? (console.error(
                                "Uncaught Error: username and password must be provided\n  do not leave field blank\n   at <input> LoginPage.tsx\nIf you have found a bug, please report bug at: https://github.com/AlvinC888/Chill-chat/issues"
                              ),
                              (n = !1))
                            : (n = !0),
                          !n)
                        ) {
                          e.next = 12;
                          break;
                        }
                        return (
                          (e.prev = 3),
                          (e.next = 6),
                          y
                            .post(x, { user: c, password: t })
                            .then(function (e) {
                              (404 !== e.status && 400 !== e.status) ||
                                (n = !1),
                                200 === e.status && (n = !0);
                            })
                        );
                      case 6:
                        e.next = 12;
                        break;
                      case 8:
                        (e.prev = 8),
                          (e.t0 = e.catch(3)),
                          console.error(e.t0),
                          (n = !1);
                      case 12:
                        return e.abrupt("return", n);
                      case 13:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[3, 8]]
              );
            })
          );
          return function (c, t) {
            return e.apply(this, arguments);
          };
        })(),
        C = t.p + "static/media/User.a412ce97.png",
        E = (t(103), t(1)),
        U = function () {
          return Object(E.jsx)("div", {
            children: Object(E.jsx)("div", {
              id: "wrapper",
              children: Object(E.jsx)("img", {
                src: C,
                id: "userIcon",
                alt: "Error",
              }),
            }),
          });
        },
        _ =
          (t(105),
          function (e) {
            return e.password
              ? Object(E.jsx)("div", {
                  id: "container",
                  children: Object(E.jsx)("input", {
                    placeholder: e.formPlaceHolder,
                    id: "textBox",
                    type: "password",
                    onChange: e.onChange,
                  }),
                })
              : Object(E.jsx)("div", {
                  id: "container",
                  children: Object(E.jsx)("input", {
                    placeholder: e.formPlaceHolder,
                    id: "textBox",
                    onChange: e.onChange,
                  }),
                });
          }),
        z =
          (t(106),
          function (e) {
            var c = Object(n.useRef)(null);
            return (
              Object(n.useEffect)(function () {
                var e = c.current;
                return (
                  window.addEventListener("keydown", function (c) {
                    "Enter" === c.code && e.click();
                  }),
                  window.removeEventListener("keydown", function () {})
                );
              }, []),
              Object(E.jsx)("div", {
                children: Object(E.jsx)("button", {
                  onClick: e.onclick,
                  id: "button",
                  ref: c,
                  children: e.text,
                }),
              })
            );
          }),
        S = t.p + "static/media/logo.02871b95.svg",
        T =
          (t(107),
          function () {
            return window.innerWidth < 600
              ? null
              : Object(E.jsxs)("div", {
                  id: "logoWrapper",
                  children: [
                    Object(E.jsx)("h1", {
                      id: "logoText",
                      children: "Chill&chat",
                    }),
                    Object(E.jsx)("img", { src: S, id: "logoImage" }),
                  ],
                });
          }),
        N = function () {
          var e,
            c,
            t = Object(n.useState)(""),
            a = Object(u.a)(t, 2),
            s = a[0],
            r = a[1],
            l = Object(b.c)(function (e) {
              return e.login;
            }),
            h = Object(b.b)();
          return l
            ? l
              ? Object(E.jsx)("div", {
                  children: Object(E.jsx)(i.a, {
                    to: "/public-chat-room:8080170",
                  }),
                })
              : void 0
            : Object(E.jsxs)("div", {
                children: [
                  Object(E.jsx)(T, {}),
                  Object(E.jsxs)("div", {
                    id: "loginParent",
                    children: [
                      Object(E.jsx)(U, {}),
                      Object(E.jsxs)("div", {
                        id: "form",
                        children: [
                          Object(E.jsx)(_, {
                            formPlaceHolder: "Your username",
                            password: !1,
                            onChange: function (c) {
                              e = c.target.value;
                            },
                          }),
                          Object(E.jsx)(_, {
                            formPlaceHolder: "Your password",
                            password: !0,
                            onChange: function (e) {
                              c = e.target.value;
                            },
                          }),
                        ],
                      }),
                      Object(E.jsx)("strong", {
                        id: "errorMessage",
                        children: s,
                      }),
                      Object(E.jsx)("br", {}),
                      Object(E.jsxs)("div", {
                        id: "signup",
                        children: [
                          Object(E.jsx)(o.b, {
                            to: "/signup",
                            id: "signupLink",
                            children: Object(E.jsx)("p", {
                              children: "New? Sign up today!",
                            }),
                          }),
                          Object(E.jsx)(z, {
                            text: "LET'S GO!!",
                            onclick: function () {
                              w(e, c).then(function (c) {
                                c &&
                                  (h({ type: "AUTH_SIGN_IN" }),
                                  h({ type: "AUTH_SET_USERNAME", payload: e })),
                                  c ||
                                    (console.error(
                                      "Uncaught error: Cannot login to ".concat(
                                        e,
                                        " using the provided password and information."
                                      )
                                    ),
                                    r("Your password or username is invalid."),
                                    setTimeout(function () {
                                      r("");
                                    }, 5e3));
                              });
                            },
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
        },
        A = t(141),
        L = (function () {
          var e = Object(d.a)(
            h.a.mark(function e(c, t, n) {
              var a;
              return h.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ((a = !1),
                          n !== t
                            ? ((a = !1),
                              console.error(
                                "Uncaught Error: both password and password confirm must be the same \nat <input> SignUpPage.tsx\nIf you have found a bug, please report bug at: https://github.com/AlvinC888/Chill-chat/issues"
                              ))
                            : (a = !0),
                          (void 0 !== c && void 0 !== t && void 0 !== n) ||
                            ((a = !1),
                            console.error(
                              "Uncaught Error: username and password must be provided\ndo not leave field blank.\nat <input> SignUpPage.tsx\nIf you have found a bug, please report bug at: https://github.com/AlvinC888/Chill-chat/issues"
                            )),
                          !a)
                        ) {
                          e.next = 13;
                          break;
                        }
                        return (
                          (e.prev = 4),
                          (e.next = 7),
                          y
                            .post(v, {
                              id: Object(A.a)(),
                              username: c,
                              password: t,
                              blocked: !1,
                              verified: !1,
                              bot: !1,
                            })
                            .then(function (e) {
                              a =
                                400 !== e.status &&
                                404 !== e.status &&
                                500 !== e.status;
                            })
                        );
                      case 7:
                        e.next = 13;
                        break;
                      case 9:
                        (e.prev = 9),
                          (e.t0 = e.catch(4)),
                          console.error(e.t0),
                          (a = !1);
                      case 13:
                        return e.abrupt("return", a);
                      case 14:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[4, 9]]
              );
            })
          );
          return function (c, t, n) {
            return e.apply(this, arguments);
          };
        })(),
        H =
          (t(111),
          function () {
            var e,
              c,
              t,
              a = Object(n.useState)(""),
              s = Object(u.a)(a, 2),
              r = s[0],
              b = s[1],
              l = Object(n.useState)(!1),
              h = Object(u.a)(l, 2),
              d = h[0],
              k = h[1];
            return d
              ? d
                ? Object(E.jsx)("div", {
                    children: Object(E.jsx)(i.a, { to: "/" }),
                  })
                : void 0
              : Object(E.jsxs)("div", {
                  children: [
                    Object(E.jsx)(T, {}),
                    Object(E.jsxs)("div", {
                      id: "signupParent",
                      children: [
                        Object(E.jsx)(U, {}),
                        Object(E.jsxs)("div", {
                          id: "form",
                          children: [
                            Object(E.jsx)(_, {
                              password: !1,
                              formPlaceHolder: "Your username",
                              onChange: function (c) {
                                e = c.target.value;
                              },
                            }),
                            Object(E.jsx)(_, {
                              password: !0,
                              formPlaceHolder: "Your password",
                              onChange: function (e) {
                                c = e.target.value;
                              },
                            }),
                            Object(E.jsx)(_, {
                              password: !0,
                              formPlaceHolder: "Confirm password",
                              onChange: function (e) {
                                t = e.target.value;
                              },
                            }),
                          ],
                        }),
                        Object(E.jsx)("strong", {
                          id: "errorMessage",
                          children: r,
                        }),
                        Object(E.jsx)("br", {}),
                        Object(E.jsx)(o.b, {
                          to: "/",
                          id: "loginLink",
                          children: "Have an account? Login Here!",
                        }),
                        Object(E.jsx)("div", {
                          id: "buttonParent",
                          children: Object(E.jsx)(z, {
                            onclick: function () {
                              L(e, c, t).then(function (e) {
                                e
                                  ? k(!0)
                                  : (b("Unkown error, please try again."),
                                    setTimeout(function () {
                                      b("");
                                    }, 5e3));
                              });
                            },
                            text: "SIGN UP!",
                          }),
                        }),
                      ],
                    }),
                  ],
                });
          }),
        P =
          (t(112),
          function (e) {
            return Object(E.jsx)("div", {
              children: Object(E.jsx)("input", {
                id: "inputField",
                placeholder: e.placeholder,
                onChange: e.onChangeEvent,
              }),
            });
          }),
        I = t(61),
        M = t.n(I),
        R =
          (t(113),
          function (e) {
            return Object(E.jsx)("div", {
              children: Object(E.jsx)(M.a, {
                id: "sendButton",
                onClick: e.onclick,
              }),
            });
          }),
        B = (function () {
          var e = Object(d.a)(
            h.a.mark(function e() {
              var c, t;
              return h.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          y.get(p).then(function (e) {
                            200 === e.status
                              ? ((c = !0), (t = e.data))
                              : ((c = !1),
                                console.error(
                                  "Uncaught Error: The server responded with a status of: " +
                                    e.status
                                ));
                          })
                        );
                      case 3:
                        e.next = 9;
                        break;
                      case 5:
                        (e.prev = 5),
                          (e.t0 = e.catch(0)),
                          (c = !1),
                          console.error(e.t0);
                      case 9:
                        return e.abrupt("return", { status: c, data: t });
                      case 10:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 5]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        G =
          (t(115),
          function () {
            return Object(E.jsx)("div", {
              id: "wrapper",
              children: Object(E.jsx)("img", {
                src: C,
                alt: "Error",
                id: "icon",
              }),
            });
          }),
        F = t(62),
        Y = t.n(F),
        q =
          (t(116),
          function () {
            return Object(E.jsx)("div", {
              children: Object(E.jsx)("p", {
                id: "verifyCheckMark",
                children: "Verified",
              }),
            });
          }),
        D =
          (t(117),
          function (e) {
            var c = Object(n.useState)([]),
              t = Object(u.a)(c, 2),
              a = t[0],
              s = t[1];
            return (
              Object(n.useEffect)(function () {
                B().then(function (e) {
                  s(e.data);
                });
              }, []),
              Object(E.jsxs)("div", {
                children: [
                  Object(E.jsxs)("div", {
                    id: "outerList",
                    children: [
                      Object(E.jsx)(Y.a, {
                        id: "hideButton",
                        onClick: e.viewOnClick,
                      }),
                      " ",
                    ],
                  }),
                  Object(E.jsxs)("div", {
                    id: "userList",
                    children: [
                      Object(E.jsx)("h2", { id: "tittle", children: "Users:" }),
                      a.map(function (e) {
                        return e.verified
                          ? Object(E.jsxs)(
                              "div",
                              {
                                id: "user",
                                children: [
                                  Object(E.jsx)(G, {}),
                                  Object(E.jsx)("strong", {
                                    className: "userDisplayName",
                                    children: e.username,
                                  }),
                                  Object(E.jsx)(q, {}),
                                ],
                              },
                              e.id
                            )
                          : Object(E.jsxs)(
                              "div",
                              {
                                id: "user",
                                children: [
                                  Object(E.jsx)(G, {}),
                                  Object(E.jsx)("strong", {
                                    className: "userDisplayName",
                                    children: e.username,
                                  }),
                                ],
                              },
                              e.id
                            );
                      }),
                    ],
                  }),
                ],
              })
            );
          }),
        W = t(68),
        V =
          (t(118),
          function (e) {
            return e.verified
              ? Object(E.jsxs)("div", {
                  id: "heroWrapper",
                  children: [
                    Object(E.jsxs)("div", {
                      id: "userWrapper",
                      children: [
                        Object(E.jsx)("h3", {
                          id: "heroUser",
                          children: e.user,
                        }),
                        Object(E.jsx)("div", {
                          id: "checkMark",
                          children: Object(E.jsx)(q, {}),
                        }),
                      ],
                    }),
                    Object(E.jsx)("p", {
                      id: "heroContent",
                      children: e.content,
                    }),
                  ],
                })
              : Object(E.jsxs)("div", {
                  id: "heroWrapper",
                  children: [
                    Object(E.jsx)("h3", { id: "heroUser", children: e.user }),
                    Object(E.jsx)("p", {
                      id: "heroContent",
                      children: e.content,
                    }),
                  ],
                });
          }),
        J = t(44),
        $ = (function () {
          var e = Object(d.a)(
            h.a.mark(function e() {
              var c, t;
              return h.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          y.get(j).then(function (e) {
                            200 === e.status
                              ? ((c = !0), (t = e.data))
                              : ((c = !1),
                                console.error(
                                  "Uncaught Error: Server responded with a status of: " +
                                    e.status
                                ));
                          })
                        );
                      case 3:
                        e.next = 9;
                        break;
                      case 5:
                        (e.prev = 5),
                          (e.t0 = e.catch(0)),
                          console.error(e.t0),
                          (c = !1);
                      case 9:
                        return e.abrupt("return", { messages: t, status: c });
                      case 10:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 5]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        K = (t(123), Object(J.a)("https://Chill-chat-1.alvinc888.repl.co")),
        Q = function () {
          var e = Object(n.useRef)(null),
            c = Object(b.c)(function (e) {
              return e.username;
            }),
            t = Object(n.useState)([]),
            a = Object(u.a)(t, 2),
            s = a[0],
            r = a[1];
          return (
            Object(n.useEffect)(function () {
              $().then(function (e) {
                r(e.messages);
              }),
                g.a.config();
            }, []),
            Object(n.useEffect)(function () {
              K.on("message", function (e) {
                var t, n;
                "Notification" in window &&
                  (("SYSTEM" === e.user && e.user === c) ||
                    ((n = {
                      tittle: "You have a new message from Chill&chat!",
                      body: "".concat(e.user, " says: ").concat(e.content),
                    }),
                    new window.Notification(n.tittle, {
                      body: n.body,
                      icon: S,
                    }))),
                  (t = [].concat(Object(W.a)(s), [e])),
                  r([]),
                  r(t);
              });
            }),
            Object(n.useEffect)(
              function () {
                e.current.scrollIntoView();
              },
              [s]
            ),
            Object(E.jsxs)("div", {
              id: "chatBubble",
              children: [
                s.map(function (e) {
                  return Object(E.jsx)("div", {
                    children: Object(E.jsx)(
                      V,
                      {
                        user: e.user,
                        content: e.content,
                        verified: e.verified,
                      },
                      e.id
                    ),
                  });
                }),
                Object(E.jsx)("div", { ref: e, id: "showMessageHandler" }),
              ],
            })
          );
        },
        X = [
          "2 girls 1 cup",
          "2g1c",
          "4r5e",
          "5h1t",
          "5hit",
          "5ht",
          "666",
          "@$$",
          "a s s",
          "a s shole",
          "a55",
          "a55hole",
          "a_s_s",
          "abbo",
          "abeed",
          "abuse",
          "acrotomophilia",
          "aeolus",
          "africoon",
          "ahole",
          "alabama hot pocket",
          "alaskan pipeline",
          "alligator bait",
          "alligatorbait",
          "amcik",
          "anal",
          "analannie",
          "analprobe",
          "analsex",
          "andskota",
          "anilingus",
          "anus",
          "apeshit",
          "ar5e",
          "arabush",
          "arabushs",
          "areola",
          "areole",
          "argie",
          "arian",
          "armo",
          "armos",
          "aroused",
          "arrse",
          "arschloch",
          "arse",
          "arsehole",
          "aryan",
          "ash0le",
          "ash0les",
          "asholes",
          "ass monkey",
          "ass",
          "ass-fucker",
          "ass-hat",
          "ass-pirate",
          "assbag",
          "assbagger",
          "assbandit",
          "assbang",
          "assbanged",
          "assbanger",
          "assbangs",
          "assbite",
          "assblaster",
          "assclown",
          "asscock",
          "asscowboy",
          "asscracker",
          "asses",
          "assface",
          "assfuck",
          "assfucker",
          "assfukka",
          "assgoblin",
          "assh0le",
          "assh0lez",
          "asshat",
          "asshead",
          "assho1e",
          "asshole",
          "assholes",
          "assholz",
          "asshopper",
          "asshore",
          "assjacker",
          "assjockey",
          "asskiss",
          "asskisser",
          "assklown",
          "asslick",
          "asslicker",
          "asslover",
          "assman",
          "assmaster",
          "assmonkey",
          "assmunch",
          "assmuncher",
          "assnigger",
          "asspacker",
          "asspirate",
          "asspuppies",
          "assrammer",
          "assranger",
          "assshit",
          "assshole",
          "asssucker",
          "asswad",
          "asswhole",
          "asswhore",
          "asswipe",
          "asswipes",
          "auto erotic",
          "autoerotic",
          "ayir",
          "azazel",
          "azz",
          "azzhole",
          "b a s t a r d",
          "b i t c h",
          "b o o b",
          "b!+ch",
          "b!tch",
          "b!tchin",
          "b*tch",
          "b00b",
          "b00bies",
          "b00biez",
          "b00bs",
          "b00bz",
          "b17ch",
          "b1tch",
          "b7ch",
          "babeland",
          "babes",
          "baby batter",
          "baby juice",
          "backdoor",
          "backdoorman",
          "badfuck",
          "bagging",
          "ball gag",
          "ball gravy",
          "ball kicking",
          "ball licking",
          "ball sack",
          "ball sucking",
          "ballbag",
          "balllicker",
          "ballsack",
          "bampot",
          "bangbro",
          "bangbros",
          "banger",
          "banging",
          "bareback",
          "barely legal",
          "barelylegal",
          "barenaked",
          "barf",
          "barface",
          "barfface",
          "bassterd",
          "bassterds",
          "bastard",
          "bastardo",
          "bastards",
          "bastardz",
          "basterds",
          "basterdz",
          "bastinado",
          "bawdy",
          "bazongas",
          "bazooms",
          "bbw",
          "bdsm",
          "beaner",
          "beaners",
          "beaney",
          "beaneys",
          "beardedclam",
          "beastality",
          "beastial",
          "beastiality",
          "beastility",
          "beatch",
          "beatoff",
          "beatyourmeat",
          "beaver cleaver",
          "beaver lips",
          "beaver",
          "beef curtains",
          "beeyotch",
          "bellend",
          "beotch",
          "bestial",
          "bestiality",
          "bi curious",
          "bi+ch",
          "bi7ch",
          "biatch",
          "bicurious",
          "big black",
          "big breasts",
          "big knockers",
          "big tits",
          "bigass",
          "bigbastard",
          "bigbreasts",
          "bigbutt",
          "bigtits",
          "bimbo",
          "bimbos",
          "bint",
          "birdlock",
          "bitch",
          "bitchass",
          "bitched",
          "bitcher",
          "bitchers",
          "bitches",
          "bitchez",
          "bitchin",
          "bitching",
          "bitchslap",
          "bitchtit",
          "bitchy",
          "biteme",
          "bitties",
          "black cock",
          "blackcock",
          "blackman",
          "blackout",
          "blacks",
          "blonde action",
          "blonde on blonde action",
          "blonde on blonde",
          "bloodclaat",
          "bloody",
          "blow j",
          "blow job",
          "blow your l",
          "blow your load",
          "blowjob",
          "blowjobs",
          "blue waffle",
          "bluegum",
          "bluegums",
          "blumpkin",
          "bo ob",
          "bo obs",
          "boang",
          "boche",
          "boches",
          "bodily",
          "boffing",
          "bogan",
          "bohunk",
          "boink",
          "boiolas",
          "bollick",
          "bollock",
          "bollocks",
          "bollok",
          "bollox",
          "bombers",
          "bombing",
          "bomd",
          "bondage",
          "boned",
          "boner",
          "boners",
          "bong",
          "boob",
          "boobies",
          "boobs",
          "booby",
          "boobz",
          "boody",
          "booger",
          "bookie",
          "boong",
          "boonga",
          "boongas",
          "boongs",
          "boonie",
          "boonies",
          "booobs",
          "boooobs",
          "booooobs",
          "booooooobs",
          "breasts",
          "buceta",
          "bugger",
          "bum",
          "bunny fucker",
          "butt",
          "butthole",
          "buttmuch",
          "buttplug",
          "c0ck",
          "c0cksucker",
          "carpet muncher",
          "cawk",
          "chink",
          "cipa",
          "cl1t",
          "clit",
          "clitoris",
          "clits",
          "cnut",
          "cock",
          "cock-sucker",
          "cockface",
          "cockhead",
          "cockmunch",
          "cockmuncher",
          "cocks",
          "bootee",
          "bootlip",
          "bootlips",
          "booty call",
          "booty",
          "bootycall",
          "boozer",
          "boozy",
          "bosch",
          "bosche",
          "bosches",
          "boschs",
          "bosomy",
          "bounty bar",
          "bounty bars",
          "bountybar",
          "brea5t",
          "breastjob",
          "breastlover",
          "breastman",
          "brothel",
          "brown showers",
          "brunette action",
          "btch",
          "buceta",
          "buddhahead",
          "buddhaheads",
          "buffies",
          "bugger",
          "buggered",
          "buggery",
          "bukkake",
          "bule",
          "bules",
          "bullcrap",
          "bulldike",
          "bulldyke",
          "bullet vibe",
          "bullshit",
          "bullshits",
          "bullshitted",
          "bullturds",
          "bumblefuck",
          "bumfuck",
          "bung hole",
          "bung",
          "bunga",
          "bungas",
          "bunghole",
          "bunny fucker",
          "burr head",
          "burr heads",
          "burrhead",
          "burrheads",
          "butchbabes",
          "butchdike",
          "butchdyke",
          "butt plug",
          "butt-pirate",
          "buttbang",
          "buttcheeks",
          "buttface",
          "buttfuck",
          "buttfucker",
          "buttfuckers",
          "butthead",
          "butthole",
          "buttman",
          "buttmuch",
          "buttmunch",
          "buttmuncher",
          "buttons",
          "buttpirate",
          "buttplug",
          "buttstain",
          "buttwipe",
          "byatch",
          "c u n t",
          "c-0-c-k",
          "c-o-c-k",
          "c-u-n-t",
          "c.0.c.k",
          "c.o.c.k.",
          "c.u.n.t",
          "c0ck",
          "c0cks",
          "c0cksucker",
          "c0k",
          "cabron",
          "caca",
          "cacker",
          "cahone",
          "camel jockey",
          "camel jockeys",
          "camel toe",
          "cameljockey",
          "cameltoe",
          "camgirl",
          "camslut",
          "camwhore",
          "carpet muncher",
          "carpetmuncher",
          "carruth",
          "cawk",
          "cawks",
          "cazzo",
          "cervix",
          "chav",
          "cheese eating surrender monkey",
          "cheese eating surrender monkies",
          "cheeseeating surrender monkey",
          "cheeseeating surrender monkies",
          "cheesehead",
          "cheeseheads",
          "cherrypopper",
          "chickslick",
          "china swede",
          "china swedes",
          "chinaman",
          "chinamen",
          "chinaswede",
          "chinaswedes",
          "chinc",
          "chincs",
          "ching chong",
          "ching chongs",
          "chinga",
          "chingchong",
          "chingchongs",
          "chink",
          "chinks",
          "chinky",
          "choad",
          "chocolate rosebuds",
          "chode",
          "chodes",
          "chonkies",
          "chonky",
          "chonkys",
          "chraa",
          "christ killer",
          "christ killers",
          "chug",
          "chugs",
          "chuj",
          "chunger",
          "chungers",
          "chunkies",
          "chunkys",
          "chute",
          "cipa",
          "circlejerk",
          "cl1t",
          "clamdigger",
          "clamdiver",
          "clamps",
          "clansman",
          "clansmen",
          "clanswoman",
          "clanswomen",
          "cleveland steamer",
          "climax",
          "clit",
          "clitface",
          "clitfuck",
          "clitoris",
          "clitorus",
          "clits",
          "clitty",
          "clogwog",
          "clover clamps",
          "clusterfuck",
          "cnts",
          "cntz",
          "cnut",
          "cocain",
          "cocaine",
          "cock",
          "cock-head",
          "cock-sucker",
          "cockbite",
          "cockblock",
          "cockblocker",
          "cockburger",
          "cockcowboy",
          "cockface",
          "cockfight",
          "cockfucker",
          "cockhead",
          "cockholster",
          "cockknob",
          "cockknocker",
          "cocklicker",
          "cocklover",
          "cockmonkey",
          "cockmunch",
          "cockmuncher",
          "cocknob",
          "cocknose",
          "cocknugget",
          "cockqueen",
          "cockrider",
          "cocks",
          "cockshit",
          "cocksman",
          "cocksmith",
          "cocksmoker",
          "cocksucer",
          "cocksuck",
          "cocksucked",
          "cocksucker",
          "cocksucking",
          "cocksucks",
          "cocksuka",
          "cocksukka",
          "cok",
          "cokmuncher",
          "coksucka",
          "coon",
          "cox",
          "crap",
          "cum",
          "cummer",
          "cumming",
          "cums",
          "cumshot",
          "cunilingus",
          "cunillingus",
          "cunnilingus",
          "cunt",
          "cuntlick",
          "cuntlicker",
          "cuntlicking",
          "cunts",
          "cocktease",
          "cocky",
          "cohee",
          "coital",
          "coitus",
          "cok",
          "cokmuncher",
          "coksucka",
          "commie",
          "condom",
          "coochie",
          "coochy",
          "coolie",
          "coolies",
          "cooly",
          "coon ass",
          "coon asses",
          "coon",
          "coonass",
          "coonasses",
          "coondog",
          "coons",
          "cooter",
          "coprolagnia",
          "coprophilia",
          "copulate",
          "corksucker",
          "cornhole",
          "cowgirl",
          "cox",
          "cra5h",
          "crabs",
          "crackcocain",
          "cracker",
          "crackpipe",
          "crackwhore",
          "crap",
          "crapola",
          "crapper",
          "crappy",
          "crash",
          "creampie",
          "crotch",
          "crotchjockey",
          "crotchmonkey",
          "crotchrot",
          "cum",
          "cumbubble",
          "cumdumpster",
          "cum face",
          "cumfest",
          "cumjockey",
          "cum licker",
          "cumlickr",
          "cumm",
          "cummer",
          "cummin",
          "cumming",
          "cumquat",
          "cumqueen",
          "cums",
          "cumshot",
          "cumshots",
          "cumslut",
          "cumstain",
          "cumtart",
          "cumsucker",
          "cunilingus",
          "cunillingus",
          "cunn",
          "cunnie",
          "cunnilingus",
          "cunntt",
          "cunny",
          "cunt",
          "cunteyed",
          "cuntface",
          "cuntfuck",
          "cuntfucker",
          "cunthole",
          "cunthunter",
          "cuntlick",
          "cuntlicker",
          "cuntlicking",
          "cuntrag",
          "cunts",
          "cuntslut",
          "cuntsucker",
          "cuntz",
          "curry muncher",
          "curry munchers",
          "currymuncher",
          "currymunchers",
          "cushi",
          "cushis",
          "cyalis",
          "cyberfuc",
          "cyberfuck",
          "cyberfucked",
          "cyberfucker",
          "cyberfuckers",
          "cyberfucking",
          "d1ck",
          "damn",
          "dick",
          "dickhead",
          "dildo",
          "dildos",
          "dink",
          "dinks",
          "dirsa",
          "dlck",
          "dog-fucker",
          "doggin",
          "dogging",
          "donkeyribber",
          "doosh",
          "duche",
          "dyke",
          "ejaculate",
          "ejaculated",
          "ejaculates",
          "ejaculating",
          "ejaculatings",
          "ejaculation",
          "ejakulate",
          "f u c k",
          "f u c k e r",
          "f4nny",
          "fag",
          "fagging",
          "faggitt",
          "faggot",
          "faggs",
          "fagot",
          "fagots",
          "fags",
          "fanny",
          "fannyflaps",
          "fannyfucker",
          "fanyy",
          "fatass",
          "fcuk",
          "fcuker",
          "fcuking",
          "feck",
          "fecker",
          "felching",
          "fellate",
          "fellatio",
          "fingerfuck",
          "fingerfucked",
          "fingerfucker",
          "fingerfuckers",
          "fingerfucking",
          "fingerfucks",
          "fistfuck",
          "fistfucked",
          "fistfucker",
          "fistfuckers",
          "fistfucking",
          "fistfuckings",
          "fistfucks",
          "flange",
          "fook",
          "fooker",
          "fuck",
          "Fucker",
          "AssFucker",
          "fucka",
          "fucked",
          "fucker",
          "fuckers",
          "fuckhead",
          "fuckheads",
          "fuckin",
          "fucking",
          "fuckings",
          "fuckingshitmotherfucker",
          "fuckme",
          "fucks",
          "fuckwhit",
          "fuckwit",
          "fudge packer",
          "fudgepacker",
          "fuk",
          "fuker",
          "fukker",
          "fukkin",
          "fuks",
          "fukwhit",
          "fukwit",
          "fux",
          "fux0r",
          "f_u_c_k",
          "gangbang",
          "gangbanged",
          "gangbangs",
          "gaylord",
          "gaysex",
          "goatse",
          "God",
          "god-dam",
          "god-damned",
          "goddamn",
          "goddamned",
          "hardcoresex",
          "heshe",
          "hoar",
          "hoare",
          "hoer",
          "homo",
          "hore",
          "horniest",
          "horny",
          "hotsex",
          "jack-off",
          "jackoff",
          "jap",
          "jerk-off",
          "jism",
          "jiz",
          "jizm",
          "jizz",
          "kawk",
          "knob",
          "knobead",
          "knobed",
          "knobend",
          "knobhead",
          "knobjocky",
          "knobjokey",
          "kock",
          "kondum",
          "kondums",
          "kum",
          "kummer",
          "kumming",
          "kums",
          "kunilingus",
          "l3i+ch",
          "l3itch",
          "labia",
          "lust",
          "lusting",
          "m0f0",
          "m0fo",
          "m45terbate",
          "ma5terb8",
          "ma5terbate",
          "mabuno",
          "mabunos",
          "macaca",
          "macacas",
          "magicwand",
          "mahbuno",
          "mahbunos",
          "make me come",
          "makemecome",
          "makemecum",
          "male squirting",
          "mamhoon",
          "mams",
          "manhater",
          "manpaste",
          "maricon",
          "maric\xf3n",
          "marijuana",
          "masochist",
          "masokist",
          "massa",
          "massterbait",
          "masstrbait",
          "masstrbate",
          "mastabate",
          "mastabater",
          "master-bate",
          "masterb8",
          "masterbaiter",
          "masterbat",
          "masterbat3",
          "masterbate",
          "masterbates",
          "masterbating",
          "masterbation",
          "masterbations",
          "masterblaster",
          "mastrabator",
          "masturbat",
          "masturbate",
          "masturbating",
          "masturbation",
          "mattressprincess",
          "mau mau",
          "mau maus",
          "maumau",
          "maumaus",
          "mcfagget",
          "meatbeatter",
          "meatrack",
          "menage a trois",
          "menage",
          "menses",
          "menstruate",
          "menstruation",
          "merd",
          "meth",
          "mgger",
          "mggor",
          "mibun",
          "mick",
          "mickeyfinn",
          "mideast",
          "mierda",
          "milf",
          "minge",
          "minger",
          "missionary position",
          "missionary",
          "mo-fo",
          "mockey",
          "mockie",
          "mocky",
          "mof0",
          "mofo",
          "moky",
          "molest",
          "molestation",
          "molester",
          "molestor",
          "moneyshot",
          "monkleigh",
          "moolie",
          "moon cricket",
          "moon crickets",
          "mooncricket",
          "mooncrickets",
          "mormon",
          "moron",
          "moskal",
          "moskals",
          "moslem",
          "mosshead",
          "motha fucker",
          "motha fuker",
          "motha fukkah",
          "motha fukker",
          "mothafuck",
          "mothafucka",
          "mothafuckas",
          "mothafuckaz",
          "mothafucked",
          "mothafucker",
          "mothafuckers",
          "mothafuckin",
          "mothafucking",
          "mothafuckings",
          "mothafucks",
          "mother fucker",
          "motherfuck",
          "motherfucked",
          "motherfucker",
          "motherfuckers",
          "motherfuckin",
          "motherfucking",
          "motherfuckings",
          "motherfuckka",
          "motherfucks",
          "muff",
          "mutha",
          "muthafecker",
          "muthafuckker",
          "muther",
          "mutherfucker",
          "n1gga",
          "n1gger",
          "nazi",
          "nigg3r",
          "nigg4h",
          "nigga",
          "niggah",
          "niggas",
          "niggaz",
          "nigger",
          "niggers",
          "nob",
          "nob jokey",
          "nobhead",
          "nobjocky",
          "nobjokey",
          "numbnuts",
          "nutsack",
          "orgasim",
          "orgasims",
          "orgasm",
          "orgasms",
          "p0rn",
          "pawn",
          "pecker",
          "penis",
          "penisfucker",
          "phonesex",
          "phuck",
          "phuk",
          "phuked",
          "phuking",
          "phukked",
          "phukking",
          "phuks",
          "phuq",
          "pigfucker",
          "pimpis",
          "piss",
          "pissed",
          "pisser",
          "pissers",
          "pisses",
          "pissflaps",
          "pissin",
          "pissing",
          "pissoff",
          "poop",
          "porn",
          "porno",
          "pornography",
          "pornos",
          "prick",
          "pricks",
          "pron",
          "pube",
          "pusse",
          "pussi",
          "pussies",
          "pussy",
          "pussys",
          "rectum",
          "retard",
          "rimjaw",
          "rimming",
          "s hit",
          "s.o.b.",
          "sadist",
          "schlong",
          "screwing",
          "scroat",
          "scrote",
          "scrotum",
          "semen",
          "sex",
          "sh!+",
          "sh!t",
          "sh1t",
          "shag",
          "shagger",
          "shaggin",
          "shagging",
          "shemale",
          "shi+",
          "shit",
          "shitdick",
          "shite",
          "shited",
          "shitey",
          "shitfuck",
          "shitfull",
          "shithead",
          "shiting",
          "shitings",
          "shits",
          "shitted",
          "shitter",
          "shitters",
          "shitting",
          "shittings",
          "shitty",
          "skank",
          "slut",
          "sluts",
          "smegma",
          "smut",
          "snatch",
          "son-of-a-bitch",
          "spac",
          "spunk",
          "s_h_i_t",
          "t1tt1e5",
          "t1tties",
          "teets",
          "teez",
          "testical",
          "testicle",
          "tit",
          "titfuck",
          "tits",
          "titt",
          "tittie5",
          "tittiefucker",
          "titties",
          "tittyfuck",
          "tittywank",
          "titwank",
          "tosser",
          "turd",
          "tw4t",
          "twat",
          "twathead",
          "twatty",
          "twunt",
          "twunter",
          "v14gra",
          "v1gra",
          "vagina",
          "viagra",
          "vulva",
          "w00se",
          "wang",
          "wank",
          "wanker",
          "wanky",
          "whoar",
          "whore",
          "willies",
          "willy",
          "xrated",
        ],
        Z = (function () {
          var e = Object(d.a)(
            h.a.mark(function e(c) {
              var t, n;
              return h.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = !1),
                          (e.prev = 1),
                          (e.next = 4),
                          y.get("".concat(O, "/").concat(c)).then(function (e) {
                            200 === e.status && ((t = e.data), (n = !0));
                          })
                        );
                      case 4:
                        e.next = 10;
                        break;
                      case 6:
                        (e.prev = 6),
                          (e.t0 = e.catch(1)),
                          console.error(e.t0),
                          (n = !1);
                      case 10:
                        return e.abrupt("return", { okStatus: n, data: t });
                      case 11:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 6]]
              );
            })
          );
          return function (c) {
            return e.apply(this, arguments);
          };
        })();
      g.a.config();
      var ee = (function () {
          var e = Object(d.a)(
            h.a.mark(function e(c) {
              var t, n, a, s;
              return h.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (t = c.user),
                        (n = c.content.toLowerCase()),
                        (a = Object(J.a)(
                          "https://Chill-chat-1.alvinc888.repl.co"
                        )),
                        (e.next = 5),
                        Z(c.user).then(function (e) {
                          e.data.verified
                            ? (c.verified = !0)
                            : (c.verified = !1);
                        })
                      );
                    case 5:
                      if (void 0 !== c.content && "" !== c.content) {
                        e.next = 7;
                        break;
                      }
                      return e.abrupt("return");
                    case 7:
                      s = 0;
                    case 8:
                      if (!(s < X.length)) {
                        e.next = 20;
                        break;
                      }
                      if (!n.includes(X[s])) {
                        e.next = 16;
                        break;
                      }
                      return (
                        (c.content =
                          "ERROR: Message UNAVAILABLE, The message that @".concat(
                            t,
                            " was trying send was DELETED by the profanity filter."
                          )),
                        (c.user = "SYSTEM"),
                        (c.verified = !0),
                        e.abrupt("break", 20)
                      );
                    case 16:
                      return e.abrupt("continue", 17);
                    case 17:
                      s++, (e.next = 8);
                      break;
                    case 20:
                      a.emit("message", c),
                        a.on("connect_error", function (e) {
                          console.error(
                            "Uncaught Connection Error: ".concat(e.message)
                          ),
                            console.warn(
                              "If you have found a bug please report bugs here: https://github.com/AlvinC888/Chill-chat/issues"
                            ),
                            a.disconnect();
                        });
                    case 22:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (c) {
            return e.apply(this, arguments);
          };
        })(),
        ce = t(67),
        te = t.n(ce),
        ne = t(66),
        ae = t.n(ne),
        se =
          (t(124),
          function (e) {
            return Object(E.jsx)("div", {
              children: Object(E.jsx)(ae.a, {
                onClick: e.onClick,
                id: "logout",
              }),
            });
          }),
        re =
          (t(125),
          function (e) {
            var c = Object(b.b)();
            return Object(E.jsx)("div", {
              children: Object(E.jsxs)("div", {
                id: "menu",
                children: [
                  Object(E.jsx)(se, {
                    onClick: function () {
                      c({ type: "AUTH_SIGN_OUT" }),
                        c({ type: "AUTH_LOGOUT_CLEAR_USERNAME" });
                    },
                  }),
                  Object(E.jsx)("strong", {
                    id: "menuText",
                    children: "Public chat room",
                  }),
                  Object(E.jsx)(te.a, {
                    id: "viewButton",
                    onClick: function () {
                      e.viewOnClick();
                    },
                  }),
                ],
              }),
            });
          }),
        oe =
          (t(126),
          function () {
            var e = Object(n.useState)(!1),
              c = Object(u.a)(e, 2),
              t = c[0],
              a = c[1],
              s = void 0;
            Object(n.useEffect)(function () {
              "Notification" in window &&
                (("denied" !== Notification.permission &&
                  "default" !== Notification.permission) ||
                  window.Notification.requestPermission());
            });
            var r = Object(b.c)(function (e) {
                return e.username;
              }),
              o = Object(b.c)(function (e) {
                return e.login;
              });
            return t
              ? Object(E.jsx)("div", {
                  children: Object(E.jsx)(D, {
                    viewOnClick: function () {
                      a(!1);
                    },
                  }),
                })
              : o
              ? Object(E.jsxs)("div", {
                  id: "chatRoom",
                  children: [
                    Object(E.jsx)(re, {
                      viewOnClick: function () {
                        a(!0);
                      },
                    }),
                    Object(E.jsx)(Q, {}),
                    Object(E.jsxs)("div", {
                      id: "sendBar",
                      children: [
                        Object(E.jsx)(P, {
                          placeholder: "Type a message...",
                          onChangeEvent: function (e) {
                            s = e.target.value;
                          },
                        }),
                        Object(E.jsx)(R, {
                          onclick: function () {
                            ee({
                              id: Object(A.a)(),
                              user: r,
                              content: s,
                              verified: null,
                            });
                          },
                        }),
                      ],
                    }),
                  ],
                })
              : Object(E.jsx)("div", {
                  children: Object(E.jsx)(i.a, { to: "/" }),
                });
          }),
        ie =
          (t(127),
          function () {
            return Object(E.jsx)("div", {
              className: "App",
              children: Object(E.jsx)(o.a, {
                children: Object(E.jsxs)(i.d, {
                  children: [
                    Object(E.jsx)(i.b, { path: "/", component: N, exact: !0 }),
                    Object(E.jsx)(i.b, {
                      exact: !0,
                      path: "/signup",
                      component: H,
                    }),
                    Object(E.jsx)(i.b, {
                      path: "/public-chat-room:8080170",
                      component: oe,
                    }),
                  ],
                }),
              }),
            });
          }),
        ue = function (e) {
          e &&
            e instanceof Function &&
            t
              .e(3)
              .then(t.bind(null, 142))
              .then(function (c) {
                var t = c.getCLS,
                  n = c.getFID,
                  a = c.getFCP,
                  s = c.getLCP,
                  r = c.getTTFB;
                t(e), n(e), a(e), s(e), r(e);
              });
        },
        be = t(45),
        le = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            c = arguments.length > 1 ? arguments[1] : void 0;
          switch (c.type) {
            case "AUTH_SIGN_IN":
              return !0;
            case "AUTH_SIGN_OUT":
              return !1;
            default:
              return e;
          }
        },
        he = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            c = arguments.length > 1 ? arguments[1] : void 0;
          switch (c.type) {
            case "AUTH_SET_USERNAME":
              return c.payload;
            case "AUTH_LOGOUT_CLEAR_USERNAME":
              return "";
            default:
              return e;
          }
        },
        de = Object(be.a)({ username: he, login: le }),
        ke = Object(be.b)(de);
      r.a.render(
        Object(E.jsx)(E.Fragment, {
          children: Object(E.jsx)(a.a.StrictMode, {
            children: Object(E.jsx)(b.a, {
              store: ke,
              children: Object(E.jsx)(ie, {}),
            }),
          }),
        }),
        document.getElementById("root")
      ),
        ue();
    },
    75: function (e, c, t) {},
    81: function (e, c, t) {},
  },
  [[129, 1, 2]],
]);
//# sourceMappingURL=main.8d217ea0.chunk.js.map
