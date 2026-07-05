import type { StatusKey } from "@/app/dashboard/components/StatusBadge";
import type { Transaction } from "@/app/dashboard/components/TransactionsTable";

export const revenueData = [
  { label: "Mon", value: 18200 },
  { label: "Tue", value: 21400 },
  { label: "Wed", value: 19800 },
  { label: "Thu", value: 24600 },
  { label: "Fri", value: 28300 },
  { label: "Sat", value: 33750 },
  { label: "Sun", value: 30100 },
];

export const volumeData = [
  { label: "Mon", deposits: 42000, withdrawals: 21000 },
  { label: "Tue", deposits: 38500, withdrawals: 24500 },
  { label: "Wed", deposits: 45200, withdrawals: 19800 },
  { label: "Thu", deposits: 51000, withdrawals: 27300 },
  { label: "Fri", deposits: 58400, withdrawals: 31200 },
  { label: "Sat", deposits: 67200, withdrawals: 35600 },
  { label: "Sun", deposits: 60900, withdrawals: 29400 },
];

export const cashInTransactions: Transaction[] = [
  { id: "TXN-98213", player: "marcus_v", paymentMethod: "bKash", amount: "$1,250.00", status: "completed", date: "2026-07-04 14:12" },
  { id: "TXN-98211", player: "kj_highroller", paymentMethod: "Crypto (BTC)", amount: "$5,000.00", status: "completed", date: "2026-07-04 12:58" },
  { id: "TXN-98209", player: "diceKing", paymentMethod: "Rocket", amount: "$275.50", status: "pending", date: "2026-07-04 10:05" },
  { id: "TXN-98207", player: "vegasqueen", paymentMethod: "Visa •••• 7731", amount: "$2,100.00", status: "completed", date: "2026-07-03 20:15" },
  { id: "TXN-98206", player: "rollthe7", paymentMethod: "Crypto (USDT)", amount: "$640.00", status: "failed", date: "2026-07-03 18:52" },
  { id: "TXN-98205", player: "luna88", paymentMethod: "bKash", amount: "$300.00", status: "pending", date: "2026-07-03 16:30" },
  { id: "TXN-98203", player: "annab", paymentMethod: "Nagad", amount: "$150.00", status: "completed", date: "2026-07-03 13:20" },
  { id: "TXN-98201", player: "shadowbet", paymentMethod: "Upay", amount: "$90.00", status: "completed", date: "2026-07-02 19:44" },
];

export const cashOutTransactions: Transaction[] = [
  { id: "WD-55201", player: "luna88", paymentMethod: "Nagad", accountNumber: "017••••2201", amount: "$430.00", status: "pending", date: "2026-07-04 13:47" },
  { id: "WD-55200", player: "annab", paymentMethod: "Bank card", accountNumber: "Mastercard •••• 1090", amount: "$120.00", status: "pending", date: "2026-07-04 11:30" },
  { id: "WD-55199", player: "shadowbet", paymentMethod: "Upay", accountNumber: "018••••3390", amount: "$960.00", status: "pending", date: "2026-07-03 22:41" },
  { id: "WD-55198", player: "kj_highroller", paymentMethod: "Nagad", accountNumber: "016••••8815", amount: "$8,200.00", status: "completed", date: "2026-07-03 15:02" },
  { id: "WD-55197", player: "marcus_v", paymentMethod: "bKash", accountNumber: "019••••7734", amount: "$610.00", status: "completed", date: "2026-07-03 09:18" },
  { id: "WD-55196", player: "diceKing", paymentMethod: "Crypto (USDT)", accountNumber: "TXn9...4kQe", amount: "$1,340.00", status: "failed", date: "2026-07-02 21:05" },
];

export const topPlayers: Array<{
  name: string;
  email: string;
  lifetimeValue: string;
  lastActive: string;
  status: StatusKey;
}> = [
  { name: "kj_highroller", email: "kj@example.com", lifetimeValue: "$84,200", lastActive: "Today", status: "vip" },
  { name: "marcus_v", email: "marcus.v@example.com", lifetimeValue: "$41,750", lastActive: "Today", status: "active" },
  { name: "diceKing", email: "diceking@example.com", lifetimeValue: "$29,900", lastActive: "Yesterday", status: "active" },
  { name: "luna88", email: "luna88@example.com", lifetimeValue: "$18,340", lastActive: "2 days ago", status: "active" },
  { name: "shadowbet", email: "shadowbet@example.com", lifetimeValue: "$12,600", lastActive: "1 week ago", status: "suspended" },
];
