import { _decorator, Component, Label } from "cc";
// import AdmobAdManger, { GameCenterManagerConfig } from "./Admob/AdmobManger";
import AdmobAdManger, { GameCenterManagerConfig } from "cocos-admob-ios";
const { ccclass, property } = _decorator;

@ccclass("AdmobManger")
export class AdmobManger extends Component {

  @property({ type: Label })
  public RewardLabel: Label = null;
  /** 完成獎勵廣告次數 */
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
      console.log("獎勵廣告错误", error);
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
