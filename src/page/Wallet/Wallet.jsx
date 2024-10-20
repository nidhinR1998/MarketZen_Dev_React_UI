import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReloadIcon } from '@radix-ui/react-icons'
import { CopyIcon, DollarSign, WalletIcon } from 'lucide-react'
import React from 'react'

export const Wallet = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={30} />
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className="flex item-center gap-2">
                    <p className="text-gray-200 text-sm">
                      #A475Ed
                    </p>
                    <CopyIcon size={12}
                      className="cursor-pointer hover:text-slate-300" />
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon className="w-6 h-6 cursor-pointer hover:text-gray-400" />
              </div>

            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign />
              <span className="text-2xl font-semibold">
                20000
              </span>
            </div>
            <div className="flex gap-7 mt-5">

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Wallet