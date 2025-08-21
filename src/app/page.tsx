'use client'
export default function Home() {

  const data = {
    asset: 33493920,
    current_asset: 42894890
  }

  const getRate = (asset: number, current_asset: number) => {
    const rate = ((current_asset - asset) / asset) * 100;
    return Number(rate.toFixed(2));
  };

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
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </div>
    </div>
  );
}
