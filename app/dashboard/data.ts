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
  { id: "TXN-98213", player: "marcus_v", paymentMethod: "bKash", amount: "$1,250.00", status: "completed", date: "2026-07-04 14:12", agent: "agent1" },
  { id: "TXN-98211", player: "kj_highroller", paymentMethod: "Crypto (BTC)", amount: "$5,000.00", status: "completed", date: "2026-07-04 12:58", agent: "agent1" },
  { id: "TXN-98209", player: "diceKing", paymentMethod: "Rocket", amount: "$275.50", status: "pending", date: "2026-07-04 10:05", agent: "agent2" },
  { id: "TXN-98207", player: "vegasqueen", paymentMethod: "Visa •••• 7731", amount: "$2,100.00", status: "completed", date: "2026-07-03 20:15" },
  { id: "TXN-98206", player: "rollthe7", paymentMethod: "Crypto (USDT)", amount: "$640.00", status: "failed", date: "2026-07-03 18:52" },
  { id: "TXN-98205", player: "luna88", paymentMethod: "bKash", amount: "$300.00", status: "pending", date: "2026-07-03 16:30" },
  { id: "TXN-98203", player: "annab", paymentMethod: "Nagad", amount: "$150.00", status: "completed", date: "2026-07-03 13:20" },
  { id: "TXN-98201", player: "shadowbet", paymentMethod: "Upay", amount: "$90.00", status: "completed", date: "2026-07-02 19:44" },
];

export const cashOutTransactions: Transaction[] = [
  { id: "WD-55201", player: "luna88", paymentMethod: "Nagad", accountNumber: "017••••2201", amount: "$430.00", status: "pending", date: "2026-07-04 13:47", agent: "agent2" },
  { id: "WD-55200", player: "annab", paymentMethod: "Bank card", accountNumber: "Mastercard •••• 1090", amount: "$120.00", status: "pending", date: "2026-07-04 11:30" },
  { id: "WD-55199", player: "shadowbet", paymentMethod: "Upay", accountNumber: "018••••3390", amount: "$960.00", status: "pending", date: "2026-07-03 22:41", agent: "agent1" },
  { id: "WD-55198", player: "kj_highroller", paymentMethod: "Nagad", accountNumber: "016••••8815", amount: "$8,200.00", status: "completed", date: "2026-07-03 15:02" },
  { id: "WD-55197", player: "marcus_v", paymentMethod: "bKash", accountNumber: "019••••7734", amount: "$610.00", status: "completed", date: "2026-07-03 09:18" },
  { id: "WD-55196", player: "diceKing", paymentMethod: "Crypto (USDT)", accountNumber: "TXn9...4kQe", amount: "$1,340.00", status: "failed", date: "2026-07-02 21:05" },
];

export const kycSubmissions: Array<{
  id: string;
  player: string;
  documentType: string;
  submittedDate: string;
  status: "pending" | "verified" | "rejected";
  documentImage: string;
  selfieImage: string;
}> = [
  { id: "KYC-3011", player: "diceKing", documentType: "Passport", submittedDate: "2026-07-04 09:12", status: "pending", documentImage: "/file.svg", selfieImage: "/window.svg" },
  { id: "KYC-3010", player: "luna88", documentType: "Driver's license", submittedDate: "2026-07-03 17:40", status: "pending", documentImage: "/file.svg", selfieImage: "/window.svg" },
  { id: "KYC-3009", player: "marcus_v", documentType: "National ID", submittedDate: "2026-07-03 11:05", status: "verified", documentImage: "/file.svg", selfieImage: "/window.svg" },
  { id: "KYC-3008", player: "kj_highroller", documentType: "Passport", submittedDate: "2026-07-02 15:22", status: "verified", documentImage: "/file.svg", selfieImage: "/window.svg" },
  { id: "KYC-3007", player: "shadowbet", documentType: "National ID", submittedDate: "2026-07-02 08:47", status: "rejected", documentImage: "/file.svg", selfieImage: "/window.svg" },
  { id: "KYC-3006", player: "rollthe7", documentType: "Driver's license", submittedDate: "2026-07-01 20:10", status: "pending", documentImage: "/file.svg", selfieImage: "/window.svg" },
];

export type ChatMessage = {
  id: string;
  from: "agent" | "player";
  text: string;
  time: string;
  // Username of the staff account that sent the message. Only set when from === "agent".
  agent?: string;
};

export type Conversation = {
  id: string;
  player: string;
  online: boolean;
  unread: number;
  lastMessageTime: string;
  // Staff account this conversation is assigned to — used to divide the inbox by account.
  assignedAgent: string;
  messages: ChatMessage[];
};

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    player: "kj_highroller",
    online: true,
    unread: 2,
    lastMessageTime: "09:41",
    assignedAgent: "agent1",
    messages: [
      { id: "m1", from: "player", text: "Hey, my withdrawal from yesterday still hasn't landed.", time: "09:12" },
      { id: "m2", from: "agent", agent: "agent1", text: "Let me check that for you — one moment.", time: "09:14" },
      { id: "m3", from: "player", text: "Sure, it's WD-55198 for $8,200.", time: "09:15" },
      { id: "m4", from: "player", text: "Any update?", time: "09:41" },
    ],
  },
  {
    id: "conv-2",
    player: "marcus_v",
    online: true,
    unread: 0,
    lastMessageTime: "Yesterday",
    assignedAgent: "agent1",
    messages: [
      { id: "m1", from: "player", text: "Can I get a deposit bonus for this weekend?", time: "Yesterday 18:02" },
      { id: "m2", from: "agent", agent: "agent1", text: "I've applied a 10% bonus to your next cash-in.", time: "Yesterday 18:10" },
      { id: "m3", from: "player", text: "Appreciate it, thanks!", time: "Yesterday 18:11" },
    ],
  },
  {
    id: "conv-3",
    player: "diceKing",
    online: false,
    unread: 1,
    lastMessageTime: "Yesterday",
    assignedAgent: "agent2",
    messages: [
      { id: "m1", from: "player", text: "My KYC documents got rejected, why?", time: "Yesterday 15:22" },
      { id: "m2", from: "agent", agent: "agent2", text: "The passport photo was blurry — could you resubmit a clearer scan?", time: "Yesterday 15:30" },
      { id: "m3", from: "player", text: "Just uploaded a new one, please check.", time: "Yesterday 20:10" },
    ],
  },
  {
    id: "conv-4",
    player: "luna88",
    online: false,
    unread: 0,
    lastMessageTime: "Jul 3",
    assignedAgent: "agent2",
    messages: [
      { id: "m1", from: "agent", agent: "agent2", text: "Your cash-in of $300 has been confirmed.", time: "Jul 3 16:31" },
      { id: "m2", from: "player", text: "Great, thank you!", time: "Jul 3 16:33" },
    ],
  },
  {
    id: "conv-5",
    player: "shadowbet",
    online: false,
    unread: 0,
    lastMessageTime: "Jul 2",
    assignedAgent: "admin",
    messages: [
      { id: "m1", from: "player", text: "Why is my account suspended?", time: "Jul 2 19:50" },
      { id: "m2", from: "agent", agent: "admin", text: "It's flagged for a review by compliance — I've escalated it to KYC.", time: "Jul 2 20:05" },
    ],
  },
  {
    id: "conv-6",
    player: "vegasqueen",
    online: true,
    unread: 0,
    lastMessageTime: "Jul 1",
    assignedAgent: "admin",
    messages: [
      { id: "m1", from: "player", text: "Is Rocket available as a cash-in method now?", time: "Jul 1 12:00" },
      { id: "m2", from: "agent", agent: "admin", text: "Not yet, but it's on the roadmap for next month.", time: "Jul 1 12:04" },
    ],
  },
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
