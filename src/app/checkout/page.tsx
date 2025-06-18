"use client"

import CustomDropdown from "@/components/CustomDropdown"
import React, { useState } from "react"

const page = () => {
  const [selected, setSelected] = useState("")
  const options = [
    { value: "vnpay", label: "VNPAY" },
    { value: "paypal", label: "PayPal" },
  ]
  return (
    <div className="px-5">
      <div className="max-w-[1000px] w-full mx-auto">
        <h1 className="title">Check out</h1>

        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2 container h-fit ">
            <h2 className="subtitle">Billing Details</h2>
            <div className="grid grid-cols-2 gap-[10px] mb-[28px]">
              <input type="text" placeholder="Full Name" className="input" />
              <input
                type="email"
                placeholder="Email Address"
                className="input"
              />
              <input type="text" placeholder="Address" className="input" />
              <input type="text" placeholder="City" className="input" />
              <input type="text" placeholder="State" className="input" />
              <input type="text" placeholder="Zip Code" className="input" />
            </div>

            <h2 className="subtitle">Payment Method</h2>
            <div className="w-fit">
              <CustomDropdown
                options={options}
                value={selected}
                onChange={setSelected}
                placeholder="Choose payment"
              />
            </div>
          </div>

          <div className="col-span-1 container h-fit ">
            <h2 className="subtitle mb-[28px]">Order Summary</h2>
            <div className="text-[13px] flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[5px] ">
                  <span>Item 1</span>
                  <span>Item 2</span>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span>$19.99</span>
                  <span>$29.99</span>
                </div>
              </div>

              <div className="bg-black h-[1px] my-[5px]"></div>

              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">$49.98</span>
              </div>
            </div>

            <div className="mt-[28px] flex justify-end">
              <button className="text-white w-fit h-fit min-w-[130px] min-h-[32px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-80 duration-300">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
