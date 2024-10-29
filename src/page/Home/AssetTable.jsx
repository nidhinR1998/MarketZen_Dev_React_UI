import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssetTable = ({ coin, category }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Coin</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24h</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {/* Scrollable TableBody */}
      <ScrollArea className={`${category === "all" ? "h-[74vh]" : "h-[82vh]"} overflow-y-auto`}>
        <Table className="min-w-full">
          <TableBody>
            {coin.map((item) => (
              <TableRow key={item.id} onClick={() => navigate(`/market/${item.id}`)} className="cursor-pointer">
                <TableCell className="flex items-center gap-2 w-[100px]">
                  <Avatar className="-z-50">
                    <AvatarImage src={item.image} />
                  </Avatar>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell>{item.price_change_percentage_24h}</TableCell>
                <TableCell className="text-right">${item.current_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default AssetTable;
