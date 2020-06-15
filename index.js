"use strict"

function SYHHIM(cbk) {
  this.tim = {}
  this.IM = {}
  // this.options = options
  this.use = function (IM, SDKAppID, logLevel) {
    this.IM = IM
    this.tim = this.IM.create({
      SDKAppID,
    })
    this.tim.setLogLevel(logLevel)
    this.onEVENT()
  }

  this.login = function (options) {
    return new Promise((resolve, reject) => {
      this.tim
        .login({
          userID: options.userID,
          userSig: options.userSig,
        })
        .then(function (imResponse) {
          resolve(imResponse)
        })
        .catch(function (imError) {
          reject(imError)
        })
    })
  }

  this.logout = function () {
    return new Promise((resolve, reject) => {
      this.tim.logout()
    })
  }

  this.handler = function (event) {
    const EVENT = {
      BLACKLIST_UPDATED: "blacklistUpdated",
      CONVERSATION_LIST_UPDATED: "onConversationListUpdated",
      ERROR: "error",
      GROUP_LIST_UPDATED: "onGroupListUpdated",
      GROUP_SYSTEM_NOTICE_RECEIVED: "receiveGroupSystemNotice",
      KICKED_OUT: "kickedOut",
      MESSAGE_RECEIVED: "onMessageReceived",
      MESSAGE_REVOKED: "onMessageRevoked",
      NET_STATE_CHANGE: "netStateChange",
      PROFILE_UPDATED: "onProfileUpdated",
      SDK_DESTROY: "sdkDestroy",
      SDK_NOT_READY: "sdkStateNotReady",
      SDK_READY: "sdkStateReady",
    }
    const { name, data } = event
    switch (name) {
      case EVENT.MESSAGE_RECEIVED:
        data.forEach((i) => {
          const {
            payload: { data, description },
          } = i
          const messageContent = {
            event: description,
            message: data,
          }
          cbk({ name, messageContent })
        })
        break

      default:
        cbk({ name, messageContent: data })
        break
    }
  }

  this.onEVENT = function () {
    // 监听事件，例如：
    this.tim.on(this.IM.EVENT.SDK_READY, this.handler)

    this.tim.on(this.IM.EVENT.SDK_NOT_READY, this.handler)

    this.tim.on(this.IM.EVENT.MESSAGE_RECEIVED, this.handler)

    this.tim.on(this.IM.EVENT.NET_STATE_CHANGE, this.handler)

    this.tim.on(this.IM.EVENT.MESSAGE_REVOKED, this.handler)

    this.tim.on(this.IM.EVENT.CONVERSATION_LIST_UPDATED, this.handler)

    this.tim.on(this.IM.EVENT.GROUP_LIST_UPDATED, this.handler)

    this.tim.on(this.IM.EVENT.PROFILE_UPDATED, this.handler)

    this.tim.on(this.IM.EVENT.BLACKLIST_UPDATED, this.handler)

    this.tim.on(this.IM.EVENT.ERROR, this.handler)

    this.tim.on(this.IM.EVENT.SDK_NOT_READY, this.handler)

    this.tim.on(this.IM.EVENT.KICKED_OUT, this.handler)
  }
}

if (typeof module !== "undefined" && module.exports) {
  SYHHIM.default = SYHHIM
  module.exports = SYHHIM
} else if (
  typeof define === "function" &&
  typeof define.amd === "object" &&
  define.amd
) {
  // register as 'SYHHIM', consistent with npm package name
  define("SYHHIM", [], function () {
    return SYHHIM
  })
} else {
  window.SYHHIM = SYHHIM
}
