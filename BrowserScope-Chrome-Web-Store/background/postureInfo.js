class SystemInfoCollector {
  constructor() {
    this.data = {};
  }

  async collectBasicInfo() {
    const browserInfo = await this.parseBrowserInfo();
    const vmInfo = await this.detectVirtualization();

    return {
      architecture: browserInfo.architecture,
      bitness: `${browserInfo.bitness}-bit`,
      browser: `${browserInfo.name} ${browserInfo.version}`,
      cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
      doNotTrack: navigator.doNotTrack ? "Enabled" : "Disabled",
      environmentType: vmInfo.environmentType,
      language: navigator.languages
        ? navigator.languages[0]
        : navigator.language,
      onlineStatus: navigator.onLine ? "Online" : "Offline",
      operatingSystem: `${browserInfo.osName}`,
      platform: browserInfo.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      vmDetails: vmInfo.details,
    };
  }

  async parseBrowserInfo() {
    const e = navigator.userAgent;
    const t = await this.parseOSInfo();
    let n = "";
    let r = "";
    let a = 0;
    let s = "";
    let i = "";
    let o = false;

    o =
      /HeadlessChrome/.test(e) ||
      navigator.webdriver ||
      !window.chrome ||
      (0 === navigator.plugins.length && !navigator.languages) ||
      ("Linux" === t.name && 0 === navigator.plugins.length);

    if (
      "userAgentData" in navigator &&
      "function" == typeof navigator.userAgentData.getHighEntropyValues
    ) {
      try {
        const highEntropyValues =
          await navigator.userAgentData.getHighEntropyValues([
            "architecture",
            "bitness",
            "brands",
            "fullVersionList",
            "model",
            "platformVersion",
            "uaFullVersion",
          ]);
        if (highEntropyValues.brands && highEntropyValues.brands.length > 0) {
          const filteredBrands = highEntropyValues.brands.filter(
            (e) => !e.brand.includes("Not") && !e.brand.includes(":")
          );
          const selectedBrand =
            filteredBrands.length > 0
              ? filteredBrands.find(
                  (e) =>
                    !e.brand.includes("Chromium") && !e.brand.includes("Google")
                ) || filteredBrands[0]
              : highEntropyValues.brands[0];
          if (selectedBrand) {
            n = selectedBrand.brand.replace(/Not:|:Brand/g, "").trim();
            if (n.includes("Chromium")) {
              const hasChrome = highEntropyValues.brands.some((e) =>
                e.brand.includes("Google Chrome")
              );
              if (
                hasChrome ||
                (!hasChrome &&
                  /Chrome/.test(e) &&
                  !/Edg|OPR|SamsungBrowser/.test(e))
              ) {
                n = "Chrome";
              }
            }
            if ("macOS" === t.name && n.includes("Safari")) {
              n = "Safari";
            } else if (t.name.includes("Windows") && n.includes("Edge")) {
              n = "Edge";
            }
            if (n.includes("Opera")) {
              n = "Opera";
            }
            if (highEntropyValues.uaFullVersion) {
              r = highEntropyValues.uaFullVersion;
            } else if (
              highEntropyValues.fullVersionList &&
              highEntropyValues.fullVersionList.length > 0
            ) {
              const versionEntry = highEntropyValues.fullVersionList.find(
                (e) => e.brand === selectedBrand.brand
              );
              if (versionEntry) {
                r = versionEntry.version;
              } else {
                const nonChromiumEntry = highEntropyValues.fullVersionList.find(
                  (e) => !e.brand.includes("Chromium")
                );
                r = nonChromiumEntry
                  ? nonChromiumEntry.version
                  : selectedBrand.version;
              }
            } else {
              r = selectedBrand.version;
            }
            const majorMatch = r.match(/^(\d+)/);
            if (majorMatch) {
              a = parseInt(majorMatch[1], 10);
            }
            if (!n.includes(":") && "" !== n && "Unknown" !== n) {
              return {
                name: n,
                version: r,
                majorVersion: a,
                engine: "Blink",
                engineVersion: r.split(".")[0] || "",
                isHeadless: o,
                osName: t.name || "Unknown",
                osVersion: t.version || "Unknown",
                platform: t.platform || "Unknown",
                architecture: t.architecture || "Unknown",
                bitness: t.bitness || "Unknown",
              };
            }
          }
        }
      } catch (c) {}
    }

    if (/Chrome\/([0-9.]+)/.test(e)) {
      const chromeMatch = e.match(/Chrome\/([0-9.]+)/);
      if (chromeMatch) {
        n = "Chrome";
        r = chromeMatch[1];
        if (/Edg\//.test(e)) {
          n = "Edge";
          const edgeMatch = e.match(/Edg\/([0-9.]+)/);
          if (edgeMatch) {
            r = edgeMatch[1];
          }
          if (t.name.includes("Windows")) {
            s = "Blink";
          }
        } else if (/OPR\//.test(e)) {
          n = "Opera";
          const operaMatch = e.match(/OPR\/([0-9.]+)/);
          if (operaMatch) {
            r = operaMatch[1];
          }
        } else if (/SamsungBrowser\//.test(e)) {
          n = "Samsung Browser";
          const samsungMatch = e.match(/SamsungBrowser\/([0-9.]+)/);
          if (samsungMatch) {
            r = samsungMatch[1];
          }
        }
      }
    } else if (/Firefox\/([0-9.]+)/.test(e)) {
      n = "Firefox";
      const firefoxMatch = e.match(/Firefox\/([0-9.]+)/);
      if (firefoxMatch) {
        r = firefoxMatch[1];
      }
      s = "Gecko";
    } else if (/Safari\/([0-9.]+)/.test(e) && /Version\/([0-9.]+)/.test(e)) {
      if ("macOS" === t.name || "iOS" === t.name) {
        n = "Safari";
        const safariMatch = e.match(/Version\/([0-9.]+)/);
        if (safariMatch) {
          r = safariMatch[1];
        }
        s = "WebKit";
      }
    } else if (
      (/MSIE ([0-9.]+)/.test(e) || /Trident\/.*rv:([0-9.]+)/.test(e)) &&
      t.name.includes("Windows")
    ) {
      n = "Internet Explorer";
      const ieMatch =
        e.match(/MSIE ([0-9.]+)/) || e.match(/Trident\/.*rv:([0-9.]+)/);
      if (ieMatch) {
        r = ieMatch[1];
      }
      s = "Trident";
    }

    const majorMatch = r.match(/^(\d+)/);
    if (majorMatch) {
      a = parseInt(majorMatch[1], 10);
    }

    if (/AppleWebKit\/([0-9.]+)/.test(e)) {
      s = "WebKit";
      const webkitMatch = e.match(/AppleWebKit\/([0-9.]+)/);
      if (webkitMatch) {
        i = webkitMatch[1];
      }
    } else if (/Gecko\//.test(e) && /rv:([0-9.]+)/.test(e)) {
      s = "Gecko";
      const geckoMatch = e.match(/rv:([0-9.]+)/);
      if (geckoMatch) {
        i = geckoMatch[1];
      }
    } else if (/Trident\/([0-9.]+)/.test(e)) {
      s = "Trident";
      const tridentMatch = e.match(/Trident\/([0-9.]+)/);
      if (tridentMatch) {
        i = tridentMatch[1];
      }
    }

    try {
      if (
        typeof window.safari !== "undefined" &&
        "Safari" !== n &&
        ("macOS" === t.name || "iOS" === t.name)
      ) {
        n = "Safari";
        s = "WebKit";
        const safariVersionTests = [
          { version: "15", feature: "structuredClone" in window },
          {
            version: "14",
            feature:
              "AbortSignal" in window &&
              typeof AbortSignal !== "undefined" &&
              "abort" in AbortSignal,
          },
          {
            version: "13",
            feature:
              "IntersectionObserver" in window && "ResizeObserver" in window,
          },
          { version: "12", feature: "globalThis" in window },
          { version: "11", feature: "fetch" in window },
        ];
        for (const test of safariVersionTests) {
          if (test.feature) {
            r = test.version;
            a = parseInt(test.version);
            break;
          }
        }
      }
      if ("InstallTrigger" in window && "Firefox" !== n) {
        n = "Firefox";
        s = "Gecko";
      }
      if (
        ("msLaunchUri" in navigator || "documentMode" in document) &&
        "Edge" !== n &&
        t.name.includes("Windows")
      ) {
        n = "Edge";
        s = "Internet Explorer" === n ? "Trident" : "Blink";
      }
      if (
        ("Linux" !== t.name && "Android" !== t.name) ||
        !window.chrome ||
        "Chrome" === n ||
        n.includes("Edge") ||
        n.includes("Opera")
      ) {
      } else {
        n = "Chrome";
        s = "Blink";
      }
    } catch (qR) {}

    return {
      name: n || "Unknown",
      version: r || "Unknown",
      majorVersion: a || 0,
      engine: s || "Unknown",
      engineVersion: i || "Unknown",
      osName: t.name || "Unknown",
      osVersion: t.version || "Unknown",
      platform: t.platform || "Unknown",
      architecture: t.architecture || "Unknown",
      bitness: t.bitness || "Unknown",
      isHeadless: o,
    };
  }

  async collectFingerprintInfo() {
    const fingerprints = {
      canvas: this.getCanvasFingerprint(),
      fonts: await this.getInstalledFonts(),
      webgl: this.getWebGLFingerprint(),
      webglParams: this.getWebGLParameters(),
    };
    return fingerprints;
  }

  getCanvasFingerprint() {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 200;
      canvas.height = 50;

      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText("Canvas fingerprint 🔍", 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText("Canvas fingerprint 🔍", 4, 17);

      return canvas.toDataURL().slice(-50);
    } catch (e) {
      return "Canvas unavailable";
    }
  }

  getWebGLFingerprint() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) return "WebGL unavailable";

      const vendor = gl.getParameter(gl.VENDOR);
      const renderer = gl.getParameter(gl.RENDERER);
      const version = gl.getParameter(gl.VERSION);
      const shading = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);

      return `${vendor}|${renderer}|${version}|${shading}`.slice(-100);
    } catch (e) {
      return "WebGL error";
    }
  }

  async getInstalledFonts() {
    const fonts = [
      "Arial",
      "Arial Black",
      "Calibri",
      "Cambria",
      "Comic Sans MS",
      "Courier New",
      "Georgia",
      "Helvetica",
      "Impact",
      "Lucida Console",
      "Lucida Sans Unicode",
      "Microsoft Sans Serif",
      "Palatino Linotype",
      "Tahoma",
      "Times New Roman",
      "Trebuchet MS",
      "Verdana",
      "MS Sans Serif",
      "MS Serif",
      "System",
      "Roboto",
      "Open Sans",
      "Lato",
      "Montserrat",
      "Source Sans Pro",
      "Oswald",
      "Raleway",
      "PT Sans",
      "Ubuntu",
      "Droid Sans",
      "Noto Sans",
      "Oxygen",
      "Fira Sans",
      "Work Sans",
      "Nunito Sans",
      "IBM Plex Sans",
      "Inter",
    ];

    const detected = [];
    const testString = "mmmmmmmmmmlli";
    const testSize = "72px";

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.font = testSize + " monospace";
    const baselineWidth = context.measureText(testString).width;

    for (const font of fonts) {
      context.font = testSize + " " + font + ", monospace";
      const width = context.measureText(testString).width;
      if (width !== baselineWidth) {
        detected.push(font);
      }
    }

    return detected.length > 0 ? detected.join(", ") : "Default fonts only";
  }

  getWebGLParameters() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) return { extensions: 0, parameters: "WebGL unavailable" };

      const extensions = gl.getSupportedExtensions();
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      const maxVertexTextures = gl.getParameter(
        gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS
      );
      const maxFragmentTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
      const maxVaryingVectors = gl.getParameter(gl.MAX_VARYING_VECTORS);

      return {
        extensions: extensions ? extensions.length : 0,
        maxTextureSize: maxTextureSize,
        maxVertexTextures: maxVertexTextures,
        maxFragmentTextures: maxFragmentTextures,
        maxVaryingVectors: maxVaryingVectors,
      };
    } catch (e) {
      return { extensions: 0, parameters: "WebGL error" };
    }
  }

  async parseOSInfo() {
    let osName = "";
    let osVersion = "";
    let platform = navigator.platform;
    let architecture = "";
    let bitness = "";

    if (
      "userAgentData" in navigator &&
      "function" == typeof navigator.userAgentData.getHighEntropyValues
    ) {
      try {
        const highEntropyValues =
          await navigator.userAgentData.getHighEntropyValues([
            "architecture",
            "bitness",
            "platform",
            "platformVersion",
          ]);

        if (
          (highEntropyValues.platform &&
            ((platform = highEntropyValues.platform),
            (osName = highEntropyValues.platform)),
          highEntropyValues.architecture &&
            (architecture = highEntropyValues.architecture),
          highEntropyValues.bitness && (bitness = highEntropyValues.bitness),
          "Windows" === highEntropyValues.platform &&
            highEntropyValues.platformVersion)
        ) {
          const versionNumber = parseInt(
            highEntropyValues.platformVersion.split(".")[0]
          );
          versionNumber >= 13
            ? ((osVersion = versionNumber), (osName = "Windows 11+"))
            : versionNumber > 0
            ? ((osVersion = versionNumber), (osName = "Windows 10"))
            : ((osVersion = versionNumber), (osName = "Windows (Legacy)"));
        } else if (
          highEntropyValues.platform &&
          highEntropyValues.platformVersion
        ) {
          osVersion = highEntropyValues.platformVersion;
        }
      } catch (error) {
        // Fallback to user agent parsing
      }
    }

    if (!osName && navigator.userAgent) {
      const userAgent = navigator.userAgent;

      if (/Windows NT 10.0/.test(userAgent)) {
        osName = "Windows 10";
        osVersion = "Windows 10";
      } else if (/Windows NT 6.3/.test(userAgent)) {
        osName = "Windows 8.1";
        osVersion = "Windows 8.1";
      } else if (/Windows NT 6.2/.test(userAgent)) {
        osName = "Windows 8";
        osVersion = "Windows 8";
      } else if (/Windows NT 6.1/.test(userAgent)) {
        osName = "Windows 7";
        osVersion = "Windows 7";
      } else if (/Mac OS X/.test(userAgent)) {
        osName = "macOS";
        const match = userAgent.match(/Mac OS X ([0-9._]+)/);
        if (match) {
          osVersion = match[1].replace(/_/g, ".");
        }
      } else if (/Linux/.test(userAgent)) {
        osName = "Linux";
        osVersion = "Linux";
      } else if (/Android/.test(userAgent)) {
        osName = "Android";
        const match = userAgent.match(/Android ([0-9.]+)/);
        if (match) {
          osVersion = match[1];
        }
      } else if (/iPhone|iPad/.test(userAgent)) {
        osName = "iOS";
        const match = userAgent.match(/OS ([0-9_]+)/);
        if (match) {
          osVersion = match[1].replace(/_/g, ".");
        }
      }
    }

    return {
      name: osName || "Unknown",
      version: osVersion || "Unknown",
      platform: platform || "Unknown",
      architecture: architecture || "Unknown",
      bitness: bitness || "Unknown",
    };
  }

  async collectDisplayInfo() {
    return {
      colorDepth: `${screen.colorDepth}-bit`,
      pixelRatio: `${window.devicePixelRatio}x`,
      screenResolution: `${screen.width} x ${screen.height}`,
      touchSupport: navigator.maxTouchPoints > 0 ? "Yes" : "No",
    };
  }

  async collectHardwareInfo() {
    const cores = navigator.hardwareConcurrency || "Unknown";

    let batteryInfo = "Not available";
    try {
      if ("getBattery" in navigator) {
        const battery = await navigator.getBattery();
        const level = Math.round(battery.level * 100);
        batteryInfo = `${level}% (${
          battery.charging ? "Charging" : "Not charging"
        })`;
      }
    } catch (e) {
      batteryInfo = "Not available";
    }

    return {
      battery: batteryInfo,
      gpu: this.getGPUInfo(),
      processorCores: cores === "Unknown" ? cores : `${cores} cores`,
    };
  }

  getGPUInfo() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) return "WebGL not supported";

      let renderer = "Unknown GPU";

      try {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          renderer =
            gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "Unknown GPU";
        } else {
          renderer = gl.getParameter(gl.RENDERER) || "Unknown GPU";
        }
      } catch (e) {
        renderer = "Access restricted";
      }

      return renderer;
    } catch (e) {
      return "Unable to determine";
    }
  }

  async collectStorageInfo() {
    const storage = {
      indexedDB: "indexedDB" in window ? "Supported" : "Not supported",
      localStorage: "Not available",
      sessionStorage: "Not available",
    };

    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      storage.localStorage = "Available";
    } catch (e) {
      storage.localStorage = "Not available";
    }

    try {
      sessionStorage.setItem("test", "test");
      sessionStorage.removeItem("test");
      storage.sessionStorage = "Available";
    } catch (e) {
      storage.sessionStorage = "Not available";
    }

    return storage;
  }

  async collectPermissionInfo() {
    const permissions = {};
    const permissionTypes = [
      { name: "camera", label: "camera" },
      { name: "microphone", label: "microphone" },
      { name: "geolocation", label: "location" },
      { name: "notifications", label: "notifications" },
      { name: "clipboard-read", label: "clipboardRead" },
      { name: "clipboard-write", label: "clipboardWrite" },
    ];

    for (const perm of permissionTypes) {
      try {
        if ("permissions" in navigator) {
          const result = await navigator.permissions.query({ name: perm.name });
          permissions[perm.label] =
            result.state === "granted"
              ? "Allowed"
              : result.state === "denied"
              ? "Blocked"
              : "Not set";
        } else {
          permissions[perm.label] = "Unknown";
        }
      } catch (e) {
        permissions[perm.label] = "Unknown";
      }
    }

    permissions.screenCapturePermission =
      await this.getScreenCapturePermission();
    return permissions;
  }

  async collectSecurityInfo() {
    const currentTab = await this.getCurrentTabInfo();
    const pageUrl = currentTab?.url || location.href;
    const pageProtocol = new URL(pageUrl).protocol;

    return {
      adBlocker: await this.detectAdBlocker(),
      csp: await this.detectCSP(currentTab),
      devToolsOpen: this.detectDevToolsOpen(),
      hsts: this.detectHSTS(pageProtocol, pageUrl),
      privateBrowsing: await this.detectPrivateBrowsing(),
      secureConnection:
        pageProtocol === "https:"
          ? "Yes (HTTPS)"
          : pageProtocol === "http:"
          ? "No (HTTP)"
          : `${pageProtocol.replace(":", "")} protocol`,
    };
  }

  async collectBrowserSecurityInfo() {
    const security = {
      pushSubscriptions: await this.checkPushSubscriptions(),
      safeBrowsing: await this.checkSafeBrowsing(),
      sameSiteCookies: this.checkSameSiteCookies(),
      serviceWorkers: await this.getServiceWorkerRegistrations(),
      thirdPartyCookies: await this.checkThirdPartyCookies(),
      webAuthn:
        "credentials" in navigator && "create" in navigator.credentials
          ? "Supported"
          : "Not supported",
    };

    return security;
  }

  async collectDeviceSensorsInfo() {
    const sensors = {
      bluetooth: "bluetooth" in navigator ? "Supported" : "Not supported",
      motionSensor:
        "DeviceMotionEvent" in window ? "Available" : "Not available",
      nfc:
        "NFC" in window || "nfc" in navigator ? "Supported" : "Not supported",
      orientationSensor:
        "DeviceOrientationEvent" in window ? "Available" : "Not available",
      usb: "usb" in navigator ? "Supported" : "Not supported",
    };

    if (sensors.motionSensor === "Available") {
      try {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
          const permission = await DeviceMotionEvent.requestPermission();
          sensors.motionSensor = `Available (${permission})`;
        }
      } catch (e) {
        sensors.motionSensor = "Available (permission unknown)";
      }
    }

    return sensors;
  }

  async collectNetworkPrivacyInfo() {
    const network = {
      connectionType: "Unknown",
      dnsOverHttps: await this.detectDNSOverHTTPS(),
      ipv6Support: await this.detectIPv6Support(),
      proxyDetected: await this.detectProxy(),
      timezoneVpnMismatch: await this.detectTimezoneVPNMismatch(),
      webrtcSupport:
        "RTCPeerConnection" in window ? "Supported" : "Not supported",
    };

    if ("connection" in navigator) {
      const conn = navigator.connection;
      if (conn.effectiveType) {
        network.connectionType = conn.effectiveType;
      }
    }

    return network;
  }

  async collectUserBehaviorInfo() {
    const behavior = {
      autofillAvailable: this.checkAutofillAvailability(),
      passwordManager: this.detectPasswordManager(),
    };

    return behavior;
  }

  async checkSafeBrowsing() {
    try {
      if (
        typeof chrome !== "undefined" &&
        chrome.privacy &&
        chrome.privacy.services
      ) {
        const safeBrowsingEnabled = await new Promise((resolve, reject) => {
          chrome.privacy.services.safeBrowsingEnabled.get({}, (details) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(details.value);
            }
          });
        });

        let safeBrowsingExtendedReporting = false;
        try {
          safeBrowsingExtendedReporting = await new Promise(
            (resolve, reject) => {
              chrome.privacy.services.safeBrowsingExtendedReportingEnabled.get(
                {},
                (details) => {
                  if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                  } else {
                    resolve(details.value);
                  }
                }
              );
            }
          );
        } catch (e) {
          safeBrowsingExtendedReporting = false;
        }

        if (safeBrowsingEnabled) {
          return safeBrowsingExtendedReporting
            ? "Enhanced Protection"
            : "Standard Protection";
        } else {
          return "Disabled";
        }
      }

      if (typeof chrome !== "undefined" && chrome.webRequest) {
        return "Available (cannot determine level)";
      }

      return "API not available";
    } catch (e) {
      return "Detection failed";
    }
  }

  async checkThirdPartyCookies() {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src =
        'data:text/html,<script>try{document.cookie="test=1";parent.postMessage(document.cookie.includes("test"),"*");}catch(e){parent.postMessage(false,"*");}</script>';
      document.body.appendChild(iframe);

      return new Promise((resolve) => {
        const handler = (e) => {
          window.removeEventListener("message", handler);
          document.body.removeChild(iframe);
          resolve(e.data ? "Allowed" : "Blocked");
        };
        window.addEventListener("message", handler);
        setTimeout(() => {
          window.removeEventListener("message", handler);
          if (iframe.parentNode) document.body.removeChild(iframe);
          resolve("Unknown");
        }, 1000);
      });
    } catch (e) {
      return "Unknown";
    }
  }

  checkSameSiteCookies() {
    try {
      document.cookie = "samesite-test=1; SameSite=Strict";
      const hasStrictCookie = document.cookie.includes("samesite-test=1");
      document.cookie = "samesite-test=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return hasStrictCookie ? "Supported" : "Not supported";
    } catch (e) {
      return "Unknown";
    }
  }

  async getServiceWorkerRegistrations() {
    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        return registrations.length > 0
          ? `${registrations.length} registered`
          : "None";
      }
      return "Not supported";
    } catch (e) {
      return "Unknown";
    }
  }

  async checkPushSubscriptions() {
    try {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        return subscription ? "Active subscription" : "No subscription";
      }
      return "Not supported";
    } catch (e) {
      return "Unknown";
    }
  }

  detectPasswordManager() {
    const indicators = [
      () => document.querySelector("input[data-1p-ignore]"),
      () => document.querySelector("[data-lastpass-icon-root]"),
      () => window.chrome && window.chrome.runtime,
    ];

    return indicators.some((check) => check()) ? "Detected" : "None detected";
  }

  checkAutofillAvailability() {
    try {
      const input = document.createElement("input");
      input.setAttribute("autocomplete", "username");
      return input.autocomplete === "username" ? "Supported" : "Not supported";
    } catch (e) {
      return "Unknown";
    }
  }

  async collectMediaInfo() {
    const media = {
      cameras: 0,
      microphones: 0,
      speakers: 0,
    };

    try {
      if (
        "mediaDevices" in navigator &&
        "enumerateDevices" in navigator.mediaDevices
      ) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        media.cameras = devices.filter((d) => d.kind === "videoinput").length;
        media.microphones = devices.filter(
          (d) => d.kind === "audioinput"
        ).length;
        media.speakers = devices.filter((d) => d.kind === "audiooutput").length;
      }
    } catch (e) {
      media.cameras = "Permission required";
      media.microphones = "Permission required";
      media.speakers = "Permission required";
    }

    return media;
  }

  async collectExtensionsInfo() {
    const extensions = {
      totalInstalled: 0,
      enabledCount: 0,
      disabledCount: 0,
      installedExtensions: [],
    };

    try {
      if (typeof chrome !== "undefined" && chrome.management) {
        const installedExtensions = await chrome.management.getAll();

        extensions.totalInstalled = installedExtensions.length;
        extensions.enabledCount = installedExtensions.filter(
          (ext) => ext.enabled
        ).length;
        extensions.disabledCount = installedExtensions.filter(
          (ext) => !ext.enabled
        ).length;

        extensions.installedExtensions = installedExtensions.map(
          (ext) =>
            `${ext.name} (${ext.version}) - ${
              ext.enabled ? "Enabled" : "Disabled"
            }`
        );
      } else {
        extensions.error = "Chrome management API not available";
      }
    } catch (e) {
      extensions.error = `Error accessing extensions: ${e.message}`;
    }

    return extensions;
  }

  async collectAutomationInfo() {
    const automation = {
      automation: this.detectAutomationFrameworks(),
      browserAutomation: this.calculateAutomationLikelihood(),
      headless: this.detectHeadless(),
      phantom: this.detectPhantom(),
      puppeteer: this.detectPuppeteer(),
      selenium: this.detectSelenium(),
      webdriver: navigator.webdriver || false,
    };
    return automation;
  }

  detectAutomationFrameworks() {
    const frameworks = [];
    if (window.__webdriver_script_fn || window.__selenium_unwrapped)
      frameworks.push("Selenium");
    if (window.__nightmare) frameworks.push("Nightmare");
    if (window._phantom || window.callPhantom) frameworks.push("PhantomJS");
    if (window.__playwright) frameworks.push("Playwright");
    if (navigator.userAgent.includes("PhantomJS"))
      frameworks.push("PhantomJS (UA)");
    if (navigator.userAgent.includes("HeadlessChrome"))
      frameworks.push("Headless Chrome");
    return frameworks.length > 0 ? frameworks.join(", ") : "None detected";
  }

  calculateAutomationLikelihood() {
    let score = 0;
    if (navigator.webdriver) score += 30;
    if (window.callPhantom || window._phantom) score += 25;
    if (window.__webdriver_script_fn) score += 20;
    if (window.__selenium_unwrapped) score += 20;
    if (navigator.userAgent.includes("HeadlessChrome")) score += 15;
    if (navigator.userAgent.includes("PhantomJS")) score += 15;
    if (navigator.plugins.length === 0) score += 5;
    if (navigator.languages.length === 0) score += 5;
    return `${Math.min(score, 100)}% likelihood`;
  }

  detectHeadless() {
    return navigator.userAgent.includes("HeadlessChrome") ||
      navigator.userAgent.includes("PhantomJS") ||
      (navigator.plugins.length === 0 && navigator.mimeTypes.length === 0)
      ? "Yes"
      : "No";
  }

  detectPhantom() {
    return window._phantom ||
      window.callPhantom ||
      navigator.userAgent.includes("PhantomJS")
      ? "Detected"
      : "Not detected";
  }

  detectPuppeteer() {
    return navigator.userAgent.includes("HeadlessChrome") ||
      window.navigator.webdriver
      ? "Detected"
      : "Not detected";
  }

  detectSelenium() {
    return window.__webdriver_script_fn ||
      window.__selenium_unwrapped ||
      navigator.webdriver
      ? "Detected"
      : "Not detected";
  }

  async detectVirtualization() {
    let score = 0;
    const indicators = [];

    if (navigator.hardwareConcurrency <= 2) {
      score += 10;
      indicators.push("Low CPU cores");
    }
    if (navigator.deviceMemory && navigator.deviceMemory <= 2) {
      score += 10;
      indicators.push("Low memory");
    }
    if (screen.width <= 1024 || screen.height <= 768) {
      score += 5;
      indicators.push("Low resolution");
    }

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      if (gl) {
        const renderer = gl.getParameter(gl.RENDERER);
        if (
          renderer.includes("VMware") ||
          renderer.includes("VirtualBox") ||
          renderer.includes("Parallels") ||
          renderer.includes("QEMU")
        ) {
          score += 30;
          indicators.push("VM GPU detected");
        }
      }
    } catch (e) {}

    if (
      navigator.userAgent.includes("VirtualBox") ||
      navigator.userAgent.includes("VMware")
    ) {
      score += 20;
      indicators.push("VM in user agent");
    }

    return {
      environmentType: score > 15 ? "Virtual Machine" : "Physical Hardware",
      details: `Canvas fingerprint suggests virtualization / Confidence Score: ${score}%`,
    };
  }

  async detectCSP(currentTab) {
    try {
      if (currentTab && chrome.scripting) {
        const results = await chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          func: () => {
            const metaCSP = document.querySelector(
              'meta[http-equiv="Content-Security-Policy"]'
            );
            const metaCSPRO = document.querySelector(
              'meta[http-equiv="Content-Security-Policy-Report-Only"]'
            );
            return metaCSP || metaCSPRO ? "Present" : "Not present";
          },
        });
        return results[0]?.result || "Unknown";
      }
      return "Cannot detect (no tab access)";
    } catch (e) {
      return "Cannot detect (permission denied)";
    }
  }

  detectHSTS(protocol, url) {
    if (protocol !== "https:") return "Not applicable (HTTP)";

    try {
      const httpUrl = url.replace("https://", "http://");
      return fetch(httpUrl, {
        method: "HEAD",
        mode: "no-cors",
        signal: AbortSignal.timeout(2000),
      })
        .then(() => "Likely disabled")
        .catch(() => "Likely enabled");
    } catch (e) {
      return "Likely enabled";
    }
  }

  detectPrivateBrowsing() {
    try {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        return navigator.storage
          .estimate()
          .then((estimate) => (estimate.quota < 120000000 ? "Yes" : "No"))
          .catch(() => "Unknown");
      }

      try {
        localStorage.setItem("_test", "1");
        localStorage.removeItem("_test");
        return "No";
      } catch (e) {
        return "Yes";
      }
    } catch (e) {
      return "Unknown";
    }
  }

  detectDevToolsOpen() {
    try {
      let devtools = false;

      const start = performance.now();
      console.log("%c", "font-size: 0;");
      const end = performance.now();
      if (end - start > 5) devtools = true;

      const element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          devtools = true;
          return "detected";
        },
      });
      console.log(element);

      setTimeout(() => {}, 1);

      return devtools ? "Possibly open" : "Likely closed";
    } catch (e) {
      return "Unknown";
    }
  }

  async detectAdBlocker() {
    try {
      const adDomains = [
        "https://pagead2.googlesyndication.com/pagead/show_ads.js",
        "https://www.googletagservices.com/tag/js/gpt.js",
        "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
      ];

      const results = await Promise.allSettled(
        adDomains.map((url) =>
          fetch(url, {
            method: "HEAD",
            mode: "no-cors",
            signal: AbortSignal.timeout(3000),
          })
        )
      );

      const blocked = results.filter((r) => r.status === "rejected").length;
      const total = results.length;

      if (blocked >= total * 0.7) return "Likely detected";
      if (blocked > 0) return "Partially detected";
      return "None detected";
    } catch (e) {
      return "Unknown";
    }
  }

  async detectIPv6Support() {
    try {
      const pc = new RTCPeerConnection();
      const offer = await pc.createOffer();
      const hasIPv6 = offer.sdp.includes("c=IN IP6");
      pc.close();

      if (hasIPv6) return "Supported";

      const ipv6Tests = [
        "https://ipv6.google.com/favicon.ico",
        "https://ipv6-test.com/favicon.ico",
      ];

      const results = await Promise.race([
        Promise.allSettled(
          ipv6Tests.map((url) =>
            fetch(url, {
              method: "HEAD",
              mode: "no-cors",
              signal: AbortSignal.timeout(3000),
            })
          )
        ),
        new Promise((resolve) => setTimeout(() => resolve([]), 3000)),
      ]);

      return results.some((r) => r.status === "fulfilled")
        ? "Likely supported"
        : "IPv4 only";
    } catch (e) {
      return "IPv4 only";
    }
  }

  async detectDNSOverHTTPS() {
    try {
      const testDomains = ["cloudflare-dns.com", "dns.google"];
      const results = await Promise.allSettled(
        testDomains.map((domain) =>
          fetch(`https://${domain}/resolve?name=example.com&type=A`, {
            method: "HEAD",
            mode: "no-cors",
          })
            .then(() => "accessible")
            .catch(() => "blocked")
        )
      );

      const accessible = results.filter((r) => r.status === "fulfilled").length;
      return accessible > 0 ? "Likely enabled" : "Likely disabled";
    } catch (e) {
      return "Unknown";
    }
  }

  async detectProxy() {
    try {
      const indicators = [];

      const startTime = performance.now();
      const requests = [
        "https://httpbin.org/ip",
        "https://api.ipify.org",
        "https://checkip.amazonaws.com",
      ].map((url) =>
        fetch(url, {
          method: "HEAD",
          mode: "no-cors",
          signal: AbortSignal.timeout(5000),
        }).catch(() => null)
      );

      await Promise.allSettled(requests);
      const totalTime = performance.now() - startTime;

      if (totalTime > 8000) indicators.push("High latency detected");

      if (typeof navigator.connection !== "undefined") {
        const conn = navigator.connection;
        if (conn.type === "other" && conn.effectiveType === "slow-2g") {
          indicators.push("Unusual connection profile");
        }
      }

      try {
        const pc = new RTCPeerConnection();
        const offer = await pc.createOffer();
        if (
          offer.sdp.includes("typ relay") &&
          !offer.sdp.includes("typ host")
        ) {
          indicators.push("Only relay candidates");
        }
        pc.close();
      } catch (e) {}

      return indicators.length > 0
        ? `Possible proxy (${indicators.join(", ")})`
        : "Unlikely";
    } catch (e) {
      return "Unknown";
    }
  }

  async detectTimezoneVPNMismatch() {
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const services = [
      { url: "https://ipapi.co/timezone/", parser: (text) => text.trim() },
      {
        url: "https://api.ipgeolocation.io/timezone?apiKey=free",
        parser: (data) => JSON.parse(data).timezone,
      },
      {
        url: "https://worldtimeapi.org/api/ip",
        parser: (data) => JSON.parse(data).timezone,
      },
    ];

    for (const service of services) {
      try {
        const response = await fetch(service.url, {
          mode: "cors",
          signal: AbortSignal.timeout(3000),
        });
        const text = await response.text();
        const ipTz = service.parser(text);

        if (browserTz !== ipTz) {
          return "Possible VPN/Proxy";
        }
        return "No mismatch detected";
      } catch (e) {
        continue;
      }
    }
    return "Unable to determine";
  }

  async getScreenCapturePermission() {
    try {
      if ("permissions" in navigator) {
        const result = await navigator.permissions.query({ name: "camera" });
        return result.state === "prompt" ? "prompt" : result.state;
      }
      return "Unknown";
    } catch (e) {
      return "prompt";
    }
  }

  async collectLocationInfo() {
    try {
      const response = await fetch("https://ipapi.co/json/", { mode: "cors" });
      const data = await response.json();

      return {
        ip: data.ip || "Unknown",
        isp: data.org || "Unknown",
        location: `${data.city || "Unknown"}, ${data.region || "Unknown"}, ${
          data.country_name || "Unknown"
        }`,
        timezone: data.timezone || "Unknown",
      };
    } catch (e) {
      return {
        ip: "Unable to determine",
        isp: "Unable to determine",
        location: "Unable to determine",
        timezone: "Unable to determine",
      };
    }
  }

  async getCurrentTabInfo() {
    try {
      if (typeof chrome !== "undefined" && chrome.tabs) {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        return tab;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async detectBrowserExtensions() {
    try {
      const extensionAPIs = {
        adBlock: () => typeof window.chrome?.webRequest !== "undefined",
        uBlock: () => document.querySelector("[data-ublock]") !== null,
        ghostery: () => typeof window.ghostery !== "undefined",
        privacy: () => typeof window.chrome?.privacy !== "undefined",
      };

      const detected = Object.entries(extensionAPIs)
        .filter(([name, check]) => check())
        .map(([name]) => name);

      return detected.length > 0 ? detected.join(", ") : "None detected";
    } catch (e) {
      return "Unknown";
    }
  }

  async collectAll() {
    console.log("Collecting comprehensive system information...");

    const results = {
      scannedAt: new Date().toLocaleString(),
      basicInfo: await this.collectBasicInfo(),
      browserSecurity: await this.collectBrowserSecurityInfo(),
      deviceSensors: await this.collectDeviceSensorsInfo(),
      display: await this.collectDisplayInfo(),
      extensions: await this.collectExtensionsInfo(),
      hardware: await this.collectHardwareInfo(),
      location: await this.collectLocationInfo(),
      media: await this.collectMediaInfo(),
      networkPrivacy: await this.collectNetworkPrivacyInfo(),
      permissions: await this.collectPermissionInfo(),
      security: await this.collectSecurityInfo(),
      storage: await this.collectStorageInfo(),
      userBehavior: await this.collectUserBehaviorInfo(),
      automation: await this.collectAutomationInfo(),
      fingerprints: await this.collectFingerprintInfo(),
    };

    console.log("System scan completed successfully");
    return results;
  }
}

export async function getAllSystemInfo() {
  const collector = new SystemInfoCollector();
  return await collector.collectAll();
}
