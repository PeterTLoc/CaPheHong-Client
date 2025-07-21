"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length === 0) return;

    const { code, desc, ...rest } = params;
    const payload = {
      code: code || undefined,
      desc: desc || undefined,
      data: rest
    };

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/confirm-webhook/`, payload)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "pending") return <div className="text-center py-10">Đang xác nhận thanh toán...</div>;
  if (status === "success") return <div className="text-center py-10 text-green-600">Thanh toán thành công!</div>;
  return <div className="text-center py-10 text-red-500">Thanh toán thất bại hoặc bị hủy.</div>;
}

export default function PaymentReturnPage() {
  return (
    <Suspense>
      <PaymentReturnContent />
    </Suspense>
  );
}
