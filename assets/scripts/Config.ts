/**
 * admob相关配置
 */
export namespace AdmobConfig {
  /**是否打开日志输出 */
  export const openLog = true;

  /** 是否启用测试广告id( google广告id 测试时候用google的测试广告不然可能有封号风险)  */
  export const isUseTestAd = true;
  // export const isUseTestAd = false;

  /**
   * 配置的广告id(根据 isUseTestAd参数自动使用测试广告id)
   */
  export const admobAdIds = {
    /**激励视频广告id */
    rewardVideoAdId: isUseTestAd
      ? "ca-app-pub-3940256099942544/1712485313"
      : "ca-app-pub-3575797160018144/3343136568",
    /**插屏广告id */
    interstitialAdId: isUseTestAd
      ? "ca-app-pub-3940256099942544/4411468910"
      : "ca-app-pub-3575797160018144/5823365216",
    /**banner(横幅)广告id */
    bannerAdId: isUseTestAd
      ? "ca-app-pub-3940256099942544/2934735716"
      : "ca-app-pub-3575797160018144/9996530708",
  };
}
