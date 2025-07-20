export const plans = {
  Personal: [
    {
      name: "Basic Plan",
      price: "₫0/tháng",
      type: "Personal",
      description: [
        "Tìm kiếm cửa hàng",
        "Xem quán cà phê",
        "Đọc bình luận của người dùng khác",
        "Đọc bài viết của người dùng khác",
        "Xem bản đồ",
        "Đổi ảnh cá nhân"
      ],
      current: true, // nếu user chưa nâng cấp
    },
    {
      name: "Premium Plan",
      price: "₫30,000/tháng",
      type: "Personal",
      description: [
        "Huy hiệu",
        "Được bình luận nhiều lần",
        "Thêm cửa hàng yêu thích",
        "Được đăng bài viết về quán"
      ],
      current: false, // nếu user đã nâng cấp
    }
  ],
  Business: [
    {
      name: "Premium Business Plan",
      price: "₫300,000/tháng",
      type: "Business",
      description: [
        "Quản lý nhiều chi nhánh",
        "Báo cáo nâng cao cho doanh nghiệp",
        "Hỗ trợ ưu tiên cho chủ cửa hàng"
      ],
      current: false,
    }
  ]
}
