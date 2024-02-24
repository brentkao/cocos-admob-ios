/**  admob相關配置 */
export namespace AdmobConfig {
  /**是否打開日誌輸出 */
  export const openLog = true;

  /** 是否啟用測試廣告id( google廣告id 測試時候用google的測試廣告不然可能有封號風險)  */
  export const isUseTestAd = true; //=> dev
  // export const isUseTestAd = false; //=> prod

  /** 配置的廣告id(根據 isUseTestAd參數自動使用測試廣告id) */
  export const admobAdIds = {
    /**激勵視頻廣告id */
    rewardedVideoADId: isUseTestAd
      ? "ca-app-pub-3940256099942544/1712485313"
      : "your admob rewardedVideoADId",
    /**插屏廣告id */
    interstitialAdId: isUseTestAd
      ? "ca-app-pub-3940256099942544/4411468910"
      : "your admob interstitialAdId",
    /**banner(橫幅)廣告id */
    bannerAdId: isUseTestAd
      ? "ca-app-pub-3940256099942544/2934735716"
      : "your admob bannerAdId",
  };
}
