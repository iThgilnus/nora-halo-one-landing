export type NavItem = {
  label: string;
  href: string;
};

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
};

export type Spec = {
  label: string;
  value: string;
};

export type Accessory = {
  id: string;
  name: string;
  description: string;
  tag: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navItems: NavItem[] = [
  { label: "Cách hoạt động", href: "#product-explorer" },
  { label: "Công nghệ", href: "#technology" },
  { label: "Tính năng", href: "#features" },
  { label: "Thông số kỹ thuật", href: "#specs" },
  { label: "Hỏi đáp", href: "#faq" },
];

export const painPoints: Feature[] = [
  {
    eyebrow: "Odor",
    title: "Mùi hôi dễ làm không gian sống mất cân bằng.",
    description:
      "Một khay cát chưa được xử lý kịp thời có thể ảnh hưởng cả căn phòng, đặc biệt trong căn hộ nhỏ.",
  },
  {
    eyebrow: "Routine",
    title: "Dọn khay cát là việc lặp lại mỗi ngày.",
    description:
      "Công việc nhỏ nhưng đều đặn này dễ bị quên khi lịch làm việc, học tập hoặc di chuyển thay đổi.",
  },
  {
    eyebrow: "Signals",
    title: "Thay đổi nhỏ của boss thường khó nhận ra.",
    description:
      "Tần suất sử dụng, thời lượng và thói quen mới cần được quan sát liên tục để chủ nuôi chú ý sớm hơn.",
  },
];

export const promises: Feature[] = [
  {
    eyebrow: "Observe",
    title: "Quan sát thói quen sử dụng",
    description:
      "NORA Vision ghi nhận hoạt động theo thời gian thực và tổng hợp thành nhật ký dễ đọc.",
  },
  {
    eyebrow: "Protect",
    title: "Hỗ trợ vận hành an toàn",
    description:
      "Hệ cảm biến đa điểm giúp máy chờ đúng thời điểm trước khi bắt đầu chu trình làm sạch.",
  },
  {
    eyebrow: "Clean",
    title: "Tự xử lý chất thải sau mỗi lượt",
    description:
      "Chu trình tự động giúp khay luôn sẵn sàng hơn mà không cần chủ nuôi can thiệp liên tục.",
  },
  {
    eyebrow: "Inform",
    title: "Đồng bộ tín hiệu lên ứng dụng",
    description:
      "Ứng dụng NORA App hiển thị trạng thái, lịch sử và gợi ý quan sát khi có dữ liệu đáng chú ý.",
  },
];

export const storyChapters: Feature[] = [
  {
    eyebrow: "01 / NORA Vision",
    title: "Camera góc rộng, quan sát rõ từng lượt vào cabin.",
    description:
      "Lens đặt phía trên cửa vào giúp ghi nhận hoạt động trong khung nhìn rộng mà không cần xoay cơ học.",
  },
  {
    eyebrow: "02 / NORA Guard",
    title: "10 cảm biến hỗ trợ vận hành an toàn.",
    description:
      "Các điểm cảm biến quanh cabin và cửa vào giúp nhận biết trạng thái trước khi máy xử lý chu trình.",
  },
  {
    eyebrow: "03 / NORA Clean",
    title: "Làm sạch tự động sau khi boss rời cabin.",
    description:
      "Halo One chờ vùng an toàn ổn định, sau đó gom chất thải vào hộp kín để giảm việc dọn thủ công.",
  },
  {
    eyebrow: "04 / NORA Seal",
    title: "Hộp kín mùi và cơ chế thay túi tiện lợi.",
    description:
      "Ngăn chứa 8L được thiết kế để hạn chế mùi thoát ra và giúp thao tác thay túi nhanh gọn.",
  },
];

export const careCycle = [
  "Boss bước vào",
  "Halo One nhận diện hoạt động",
  "Máy chờ trạng thái an toàn",
  "Hệ thống làm sạch tự động",
  "Dữ liệu đồng bộ về NORA App",
];

export const appProfiles = [
  { name: "Milo", visits: "3 visits", status: "Within usual range" },
  { name: "Mochi", visits: "2 visits", status: "Quiet afternoon" },
];

export const specs: Spec[] = [
  { label: "Cabin volume", value: "74L" },
  { label: "Cat weight range", value: "1.5kg - 10kg" },
  { label: "Camera", value: "NORA Vision 200° + infrared" },
  { label: "Supported profiles", value: "Up to 8 cats" },
  { label: "Safety system", value: "10 multi-point sensors" },
  { label: "Waste drawer", value: "8L sealed unit" },
  { label: "Noise level", value: "≤36 dB" },
  { label: "Connectivity", value: "Wi-Fi 2.4GHz / 5GHz" },
  { label: "Control", value: "Physical button + NORA App" },
  { label: "Supported litter", value: "Clay, tofu, mixed litter" },
  { label: "Dimensions", value: "61 × 53 × 55 cm" },
  { label: "Weight", value: "12.8 kg" },
];

export const accessories: Accessory[] = [
  {
    id: "halo-one",
    name: "Halo One",
    description: "Intelligent cat care station with vision, safety and cleaning.",
    tag: "Core",
  },
  {
    id: "odor-seal-pods",
    name: "Odor Seal Pods",
    description: "Replaceable deodorizing pods for the sealed waste drawer.",
    tag: "Care",
  },
  {
    id: "waste-bag-refill",
    name: "Waste Bag Refill",
    description: "Pre-cut drawstring bags sized for the Halo One drawer.",
    tag: "Refill",
  },
  {
    id: "entry-mat",
    name: "Entry Mat",
    description: "Low-profile mat that helps catch litter near the entry.",
    tag: "Home",
  },
  {
    id: "litter-guard",
    name: "Litter Guard",
    description: "Clip-on guard for homes with cats that dig energetically.",
    tag: "Add-on",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Halo One phù hợp với những bé mèo nào?",
    answer:
      "Concept này được mô phỏng cho mèo từ 1.5kg đến 10kg. Với mèo con, mèo già hoặc mèo đang điều trị, chủ nuôi nên quan sát phản ứng ban đầu và tham khảo chuyên gia khi cần.",
  },
  {
    question: "Có dùng được cho nhà nuôi nhiều mèo không?",
    answer:
      "Có. NORA App mô phỏng khả năng lưu tối đa 8 hồ sơ mèo để chủ nuôi theo dõi lượt sử dụng và thói quen riêng của từng bé.",
  },
  {
    question: "Tôi có thể đặt máy ở đâu?",
    answer:
      "Nên đặt trên nền phẳng, cứng, khô thoáng và có không gian trước cửa vào để mèo làm quen tự nhiên. Tránh đặt ở vị trí quá ẩm hoặc bị che kín lối vào.",
  },
  {
    question: "Máy có ồn khi hoạt động không?",
    answer:
      "Thông số concept đặt mục tiêu tối đa 36 dB, phù hợp với một chu trình làm sạch nhẹ và hạn chế ảnh hưởng sinh hoạt trong nhà.",
  },
  {
    question: "Ứng dụng có thể chia sẻ cho người thân không?",
    answer:
      "Trong trải nghiệm concept, NORA App có thể chia sẻ quyền xem trạng thái để nhiều thành viên cùng theo dõi lịch sử chăm sóc.",
  },
  {
    question: "Tôi nên chọn loại cát nào?",
    answer:
      "Halo One được mô phỏng hỗ trợ cát đất sét, cát đậu nành và một số loại cát hỗn hợp có khả năng vón tốt.",
  },
];
