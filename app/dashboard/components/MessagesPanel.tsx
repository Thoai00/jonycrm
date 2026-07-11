"use client";

import { useState } from "react";
import type { Conversation } from "@/app/dashboard/data";

export function MessagesPanel({
  conversations,
  currentUser,
}: {
  conversations: Conversation[];
  currentUser: string;
}) {
  const accounts = Array.from(new Set(conversations.map((c) => c.assignedAgent)));

  const [threads, setThreads] = useState(conversations);
  const [accountFilter, setAccountFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState(conversations[0]?.id);
  const [showThreadOnMobile, setShowThreadOnMobile] = useState(false);
  const [draft, setDraft] = useState("");

  const filteredThreads = accountFilter === "all" ? threads : threads.filter((c) => c.assignedAgent === accountFilter);
  const selected = filteredThreads.find((c) => c.id === selectedId) ?? filteredThreads[0] ?? null;

  function selectAccount(account: string) {
    setAccountFilter(account);
    const nextList = account === "all" ? threads : threads.filter((c) => c.assignedAgent === account);
    setSelectedId(nextList[0]?.id);
    setShowThreadOnMobile(false);
  }

  function selectConversation(id: string) {
    setSelectedId(id);
    setShowThreadOnMobile(true);
    setThreads((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text || !selected) return;

    setThreads((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? {
              ...c,
              lastMessageTime: "Just now",
              messages: [
                ...c.messages,
                { id: crypto.randomUUID(), from: "agent", agent: currentUser, text, time: "Just now" },
              ],
            }
          : c
      )
    );
    setDraft("");
  }

  return (
    <div className="flex h-[70vh] min-h-[420px] overflow-hidden rounded-2xl border border-border-hairline bg-surface-1">
      <div
        className={`w-full shrink-0 flex-col border-border-hairline md:flex md:w-72 md:border-r ${
          showThreadOnMobile ? "hidden" : "flex"
        }`}
      >
        <div className="border-b border-border-hairline px-4 py-3.5">
          <h2 className="mb-2.5 text-sm font-semibold text-text-primary">Messages</h2>
          <div className="flex flex-wrap gap-1.5">
            <AccountTab label="All" active={accountFilter === "all"} onClick={() => selectAccount("all")} />
            {accounts.map((account) => (
              <AccountTab
                key={account}
                label={account}
                active={accountFilter === account}
                onClick={() => selectAccount(account)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredThreads.length === 0 && (
            <p className="px-3.5 py-6 text-center text-sm text-text-muted">No conversations for this account.</p>
          )}
          {filteredThreads.map((conv) => {
            const active = conv.id === selected?.id;
            const lastMessage = conv.messages[conv.messages.length - 1];
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => selectConversation(conv.id)}
                className={`flex w-full items-start gap-2.5 border-l-2 px-3.5 py-3 text-left transition-colors ${
                  active
                    ? "border-gold bg-linear-to-r from-gold/12 to-transparent"
                    : "border-transparent hover:bg-surface-2"
                }`}
              >
                <Avatar name={conv.player} online={conv.online} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-text-primary">{conv.player}</p>
                    <span className="shrink-0 text-[11px] text-text-muted">{conv.lastMessageTime}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-text-muted">{lastMessage?.text}</p>
                    {conv.unread > 0 && (
                      <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-gold-bright text-[10px] font-semibold text-surface-page">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  {accountFilter === "all" && (
                    <span className="mt-1 inline-block rounded-full border border-border-hairline bg-surface-2 px-1.5 py-0.5 text-[10px] text-text-muted">
                      {conv.assignedAgent}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`min-w-0 flex-1 flex-col md:flex ${showThreadOnMobile ? "flex" : "hidden"}`}>
        {selected ? (
          <>
            <div className="flex items-center gap-2.5 border-b border-border-hairline px-4 py-3">
              <button
                type="button"
                onClick={() => setShowThreadOnMobile(false)}
                aria-label="Back to conversations"
                className="-ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-2 hover:text-text-primary md:hidden"
              >
                <BackIcon />
              </button>
              <Avatar name={selected.player} online={selected.online} />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-medium text-text-primary">{selected.player}</p>
                <p className="text-[11px] text-text-muted">
                  {selected.online ? "Online" : "Offline"} · Assigned to {selected.assignedAgent}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {selected.messages.map((msg) => {
                const isAgent = msg.from === "agent";
                return (
                  <div key={msg.id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[75%]">
                      {isAgent && msg.agent && (
                        <p className="mb-1 text-right text-[11px] font-medium text-gold">{msg.agent}</p>
                      )}
                      <div
                        className={`rounded-2xl px-3.5 py-2 text-sm ${
                          isAgent
                            ? "rounded-br-sm border border-gold/30 bg-gold/12 text-text-primary"
                            : "rounded-bl-sm border border-border-hairline bg-surface-2 text-text-primary"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p className={`mt-1 text-[11px] text-text-muted ${isAgent ? "text-right" : "text-left"}`}>{msg.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 border-t border-border-hairline px-3 py-3"
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-border-hairline bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-gold"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-b from-gold-bright to-gold text-surface-page transition-opacity hover:opacity-90 disabled:opacity-40"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-text-muted">Select a conversation</div>
        )}
      </div>
    </div>
  );
}

function AccountTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
        active
          ? "border-gold/40 bg-gold/15 text-gold-bright"
          : "border-border-hairline text-text-muted hover:bg-surface-2 hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function Avatar({ name, online }: { name: string; online: boolean }) {
  return (
    <div className="relative shrink-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border-hairline bg-surface-3 text-xs font-semibold text-text-secondary">
        {name.slice(0, 1).toUpperCase()}
      </div>
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface-1 bg-status-good" />
      )}
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}
