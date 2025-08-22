'use client'

import AssetCard from "./components/assetCard";
import {getRate} from "@/lib/utils"

export default function Home() {
  const data = {
    asset: 33493920,
    current_asset: 42894890
  }

  const rate = getRate(data.asset, data.current_asset);

  return (
    <div className="inner-wrapper">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col">
          <p>투자 금액</p>
          <div className="flex items-end gap-3">
            <p className="text-4xl">{data.asset.toLocaleString()} 원</p>
            <p className={`text-2xl ${rate >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
              {rate}%
            </p>
          </div>
        </div>
        <div>
          <p className="mb-3">투자 종목 (국내)</p>
          <div className="flex gap-5">
            <AssetCard title={"삼성전자"} price={12760000} amount={200} buy_price={63800} current_price={71400} />
            <AssetCard title={"삼성전자"} price={12760000} amount={200} buy_price={63800} current_price={71400} />
            <AssetCard title={"삼성전자"} price={12760000} amount={200} buy_price={63800} current_price={71400} />
            <AssetCard title={"삼성전자"} price={12760000} amount={200} buy_price={63800} current_price={71400} />
          </div>
        </div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </div>
    </div>
  );
}
