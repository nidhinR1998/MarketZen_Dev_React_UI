import React, { useEffect } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAsset } from '@/State/Asset/Action'
import { store } from '@/State/Store'
const Portfolio = () => {
  const dispatch=useDispatch();
  const {asset}=useSelector(store=>store)
  useEffect(()=> {
    dispatch(getUserAsset(localStorage.getItem("jwt")))

  },[]);

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">
              Asset
            </TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>UNIT</TableHead>
            <TableHead>PRICE CHANGE 24H</TableHead>
            <TableHead>PRICE CHANGE% 24H</TableHead>
            <TableHead className="text-right">VOLUME</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asset.userAssets.map((item, index) => <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              <Avatar className="-z-50">
                <AvatarImage src={item.coin.image} />
              </Avatar>
              <span>{item.coin.name}</span>
            </TableCell>
            <TableCell>{item.coin.current_price}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.coin.price_change_24h}</TableCell>
            <TableCell>{item.coin.price_change_percentage_24h}</TableCell>
            <TableCell className="text-right">{item.coin.total_volume}</TableCell>
          </TableRow>)}

        </TableBody>
      </Table>


    </div>
  )
}

export default Portfolio