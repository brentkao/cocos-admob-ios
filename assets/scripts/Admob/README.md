# Cocos Creator 3.8 Admob iOS app

## 介紹

cocos-admob-ios 這個 npm 是提供給 cocos creator 3.8 版本以上的 iOS app，內有 3 個基礎的功能。

1. 顯示橫幅廣告
2. 顯示插頁廣告
3. 獎勵廣告

## 工具

自動文件補足工具(cocos-native-ios-helper) : [Download](https://github.com/brentkao/cocos-native-ios-helper)。

## 配置設定

```ts
const config: GameCenterManagerConfig = {
  /** 是否開啟日誌 */
  openLog: true;
  /** banner(橫幅)廣告 */
   bannerAdId: "ca-app-pub-3940256099942544/2934735716",
  /** 插頁式廣告 */
    interstitialAdId: "ca-app-pub-3940256099942544/4411468910",
  /** 獎勵廣告 */
    rewardVideoAdId: "ca-app-pub-3940256099942544/1712485313",
}

// 使用 Admob 廣告前需要 initAd
AdmobAdManger.initAd(config);
```

## 使用範例

```ts
import { _decorator, Component, Label } from "cc";
import AdmobAdManger, { GameCenterManagerConfig } from "cocos-admob-ios";
const { ccclass, property } = _decorator;

@ccclass("AdmobManger")
export class AdmobManger extends Component {
  @property({ type: Label })
  public RewardLabel: Label = null;
  private _count: number = 0;

  start() {
    const config: GameCenterManagerConfig = { openLog: true };
    AdmobAdManger.initAd(config);
  }

  update(deltaTime: number) {}
  /** 觸發顯示獎勵廣告彈窗 */
  async onShowRewardedVideoAdClick(event: Event, str: string) {
    console.log("觸發顯示獎勵廣告彈窗");
    try {
      const reward = await AdmobAdManger.showRewardedVideoAd();
      console.log("弹出獎勵廣告事件", JSON.stringify(reward));
      if (reward.result === "complete") {
        console.log("獎勵廣告完成");
        // 增加獎勵廣告次數
        this._count++;
        if (this.RewardLabel) {
          this.RewardLabel.string = `獎勵次數：${this._count}`;
        }
      } else {
        console.log("獎勵廣告未完成");
      }
    } catch (error) {
      console.log("獎勵廣告錯誤", error);
    }
  }

  /** 顯示 橫幅廣告 */
  onShowBannerAdClick(event: Event, str: string) {
    console.log("顯示 橫幅廣告");
    AdmobAdManger.showBannerAd();
  }

  /** 關閉 橫幅廣告 */
  onHideBannerAdClick() {
    console.log("關閉 橫幅廣告");
    AdmobAdManger.hideBannerAd();
  }

  /** 觸發 插頁式廣告 */
  async onShowInterstitialAdClick(event: Event, str: string) {
    console.log("觸發 插頁式廣告");
    try {
      let result = await AdmobAdManger.showInterstitialAd();
      console.log("插頁式廣告 結果：", result);
    } catch (error) {
      console.log("插頁式廣告 錯誤：", error);
    }
  }
}
```

## Issues

如果你發現了一個問題，或者有任何疑問，請訪問我們的 [Issues 頁面](https://github.com/brentkao/cocos-admob-ios/issues) 報告它。在創建一個新的 Issue 之前，請先檢查是否已有其他用戶報告了相同的問題。

## Contact Me

若您在操作上遇到任何問題，或有無法解決的困難，歡迎透過 Discord (parazeni.ko) 聯繫我。
如果您有其他功能的相關知識，或願意分享技術資源，我也非常歡迎您的聯繫和交流。

Should you encounter any issues or have questions during the operation, feel free to reach out to me via Discord (parazeni.ko).
Additionally, if you're willing to share more technical resources or interested in learning about other features, I'm open to communication as well.