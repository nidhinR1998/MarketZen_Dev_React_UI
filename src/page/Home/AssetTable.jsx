import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const AssetTable = () => {
  return (
    <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">
        Coin
      </TableHead>
      <TableHead>SYMBOL</TableHead>
      <TableHead>VOLUME</TableHead>
      <TableHead>MARKET CAP</TableHead>
      <TableHead>24h</TableHead>
      <TableHead className="text-right">PRICE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium flex items-center gap-2">
        <Avatar className="-z-50">
            <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
        </Avatar>
        <span>Bitcoin</span>
      </TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>

  )
}

export default AssetTable