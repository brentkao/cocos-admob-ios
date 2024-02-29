# Cocos Creator 3.8 Admob iOS App

## Introduction

The `cocos-admob-ios` npm package is designed for iOS apps using Cocos Creator version 3.8 and above, providing three basic functionalities:

1. Display banner ads
2. Display interstitial ads
3. Reward ads

## Tools

Automatic documentation completion tool (cocos-native-ios-helper): [Download](https://github.com/brentkao/cocos-native-ios-helper).

## Configuration

```ts
const config: GameCenterManagerConfig = {
  /** Whether to open logs */
  openLog: true,
  /** Banner ad ID */
   bannerAdId: "ca-app-pub-3940256099942544/2934735716",
  /** Interstitial ad ID */
    interstitialAdId: "ca-app-pub-3940256099942544/4411468910",
  /** Reward video ad ID */
    rewardVideoAdId: "ca-app-pub-3940256099942544/1712485313",
}

// Initialize Admob ad before using it
AdmobAdManger.initAd(config);
```

## Usage Example

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
  /** Trigger the display of the rewarded video ad popup */
  async onShowRewardedVideoAdClick(event: Event, str: string) {
    console.log("Trigger the display of the rewarded video ad popup");
    try {
      const reward = await AdmobAdManger.showRewardedVideoAd();
      console.log("Popup event for reward ad", JSON.stringify(reward));
      if (reward.result === "complete") {
        console.log("Reward ad completed");
        // Increase the count of reward ads
        this._count++;
        if (this.RewardLabel) {
          this.RewardLabel.string = `Reward count: ${this._count}`;
        }
      } else {
        console.log("Reward ad not completed");
      }
    } catch (error) {
      console.log("Reward ad error", error);
    }
  }

  /** Display banner ad */
  onShowBannerAdClick(event: Event, str: string) {
    console.log("Display banner ad");
    AdmobAdManger.showBannerAd();
  }

  /** Close banner ad */
  onHideBannerAdClick() {
    console.log("Close banner ad");
    AdmobAdManger.hideBannerAd();
  }

  /** Trigger interstitial ad */
  async onShowInterstitialAdClick(event: Event, str: string) {
    console.log("Trigger interstitial ad");
    try {
      let result = await AdmobAdManger.showInterstitialAd();
      console.log("Interstitial ad result:", result);
    } catch (error) {
      console.log("Interstitial ad error:", error);
    }
  }
}
```

## Issues

If you discover an issue or have any questions, please visit our [Issues page](https://github.com/brentkao/cocos-admob-ios/issues) to report it. Before creating a new issue, please check if there is already a report of the same issue by another user.

## Contact Me

Should you encounter any operational issues or difficulties that you cannot resolve, please feel free to contact me via Discord (parazeni.ko).
Additionally, if you have knowledge about other features or are willing to share technical resources, I also welcome your contact and exchange.