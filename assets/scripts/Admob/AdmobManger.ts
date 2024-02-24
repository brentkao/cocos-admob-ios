import { native } from "cc";

export declare interface GameCenterManagerConfig {
  /** 是否開啟日誌 */
  openLog?: boolean;
  /** banner(橫幅)廣告 */
  bannerAdId?: string;
  /** 插頁式廣告 */
  interstitialAdId?: string;
  /** 獎勵廣告 */
  rewardedVideoADId?: string;
}

class AdmobAdManger {
  /**是否開啟日誌 */
  openLog: boolean;

  private _admobConfig = {
    openLog: false,
    // 預設的測試廣告id
    bannerAdId: "ca-app-pub-3940256099942544/2934735716",
    interstitialAdId: "ca-app-pub-3940256099942544/4411468910",
    rewardedVideoADId: "ca-app-pub-3940256099942544/1712485313",
  };

  constructor() {
    /** 將實例化的對象放到全局環境中供原生代碼調用 */
    globalThis.AdmobAdManger = this;
  }

  /** 初始化廣告ids */
  initAd(config: {
    /** 是否開啟日誌 */
    openLog?: boolean;
    /** banner(橫幅)廣告 */
    bannerAdId?: string;
    /** 插頁式廣告 */
    interstitialAdId?: string;
    /** 獎勵廣告 */
    rewardedVideoADId?: string;
  }) {
    console.log("初始化廣告ids", this._admobConfig);
    if (config.openLog) this.openLog = true;
    if (config.bannerAdId) this._admobConfig.bannerAdId = config.bannerAdId;
    if (config.interstitialAdId)
      this._admobConfig.interstitialAdId = config.interstitialAdId;
    if (config.rewardedVideoADId)
      this._admobConfig.rewardedVideoADId = config.rewardedVideoADId;
    
    this.registerAndLoadAd(
      this._admobConfig.rewardedVideoADId,
      this._admobConfig.interstitialAdId,
      this._admobConfig.bannerAdId
    );
  }

  /**
   * 註冊廣告ids
   * @param rewardedVideoADId 激励视频id
   * @param interstitialAdId 插頁式id
   * @param bannerAdId banner id
   */
  private registerAndLoadAd(
    rewardedVideoADId: string,
    interstitialAdId: string,
    bannerAdId: string
  ) {
    let info = {
      rewardedVideoADId: rewardedVideoADId,
      interstitialAdId: interstitialAdId,
      bannerAdId: bannerAdId,
      openLog: this.openLog,
    };
    native.reflection.callStaticMethod(
      "AdmobAdManager",
      "registerAndLoadAd:",
      JSON.stringify(info)
    );
  }

  /** 暫存獎勵廣告回調 */
  _rewardedVideoAdResolveCallback: (value: {
    result: "complete" | "cancel" | "fail";
  }) => void;

  /**
   * 調用原生層顯示admob獎勵廣告
   * @returns
   */
  showRewardedVideoAd(): Promise<{ result: "complete" | "cancel" | "fail" }> {
    return new Promise<{ result: "complete" | "cancel" | "fail" }>(
      (resolve, reject) => {
        this._rewardedVideoAdResolveCallback = resolve;
        //@ts-ignore
        let bool = native.reflection.callStaticMethod(
          "AdmobAdManager",
          "showRewardedVideoAd"
        );
        if (!bool) {
          resolve({ result: "fail" });
        }
      }
    );
  }

  /**
   * 原生層調用js層 admob獎勵廣告返回回調
   * @param str json字符串
   */
  overRewardedVideoAd(str: string) {
    if (this._rewardedVideoAdResolveCallback) {
      try {
        let dataObj = JSON.parse(str);
        if (dataObj["result"]) {
          if (
            dataObj["result"] === "complete" ||
            dataObj["result"] === "cancel" ||
            dataObj["result"] === "fail"
          ) {
            this._rewardedVideoAdResolveCallback(dataObj);
          } else {
            this._rewardedVideoAdResolveCallback({ result: "fail" });
          }
        } else {
          this._rewardedVideoAdResolveCallback({ result: "fail" });
        }
      } catch (error) {
        this._rewardedVideoAdResolveCallback({ result: "fail" });
      } finally {
        this._rewardedVideoAdResolveCallback = undefined;
      }
    }
  }

  /**
   * 顯示 admob 的插頁式廣告
   * @returns
   */
  showInterstitialAd(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      //@ts-ignore
      let bool = native.reflection.callStaticMethod(
        "AdmobAdManager",
        "showInterstitialAd"
      );
      resolve(bool);
    });
  }

  /**
   * 顯示 banner 廣告
   * @param style
   * @param refreshInterval
   * @returns
   */
  showBannerAd(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      //@ts-ignore
      let bool = native.reflection.callStaticMethod(
        "AdmobAdManager",
        "showBannerAd"
      );
      resolve(bool);
    });
  }

  /** 隱藏 banner 廣告 */
  hideBannerAd() {
    //@ts-ignore
    native.reflection.callStaticMethod("AdmobAdManager", "hideBannerAd");
  }

  /**
   * 加載(緩存) admob 的獎勵廣告
   * @returns true:加载成功
   */
  loadRewardedVideoAd() {
    return new Promise<boolean>((resolve, reject) => {
      //@ts-ignore
      let bool = native.reflection.callStaticMethod(
        "AdmobAdManager",
        "loadRewardedVideoAd"
      );
      resolve(bool);
    });
  }

  /**
   * 加載(緩存) admob 的插頁式廣告
   * @returns true:加载成功
   */
  loadInterstitialAd() {
    return new Promise<boolean>((resolve, reject) => {
      //@ts-ignore
      let bool = native.reflection.callStaticMethod(
        "AdmobAdManager",
        "loadInterstitialAd"
      );
      resolve(bool);
    });
  }

  /**
   * 加載(緩存) admob 的横幅廣告
   * @returns true:加载成功
   */
  loadBannerAd() {
    return new Promise<boolean>((resolve, reject) => {
      //@ts-ignore
      let bool = native.reflection.callStaticMethod(
        "AdmobAdManager",
        "loadBannerAd"
      );
      resolve(bool);
    });
  }
}

export default new AdmobAdManger();
