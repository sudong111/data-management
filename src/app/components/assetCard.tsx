'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {getRate} from "@/lib/utils"

interface AssetProps {
    title: string,
    price: number,
    amount: number,
    buy_price: number,
    current_price: number
}

export default function AssetCard({title, price, amount, buy_price, current_price}: AssetProps) {
  const rate = getRate(buy_price, current_price);

    return (

        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <p className="text-2xl">{title}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p>{price.toLocaleString()} 원</p>
            <p className={`text-sm ${rate >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
              {rate}%</p>
          </div>
        </CardTitle>
        <CardDescription>
          <p>{amount} 주</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <p>매수가</p>
              <p className="text-sm text-gray-500">(주당 매수 가격)</p>
            </div>
            <p>{buy_price} 원</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <p>현재가</p>
              <p className="text-sm text-gray-500">(주당 매수 가격)</p>
            </div>
            <p>{current_price} 원</p>
          </div>
        </div>
      </CardContent>
    </Card>
    )


}