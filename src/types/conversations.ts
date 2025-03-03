export interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  read: boolean;
}

export interface ConversationParticipant {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_picture_url?: string | null;
}

export interface Conversation {
  id: string;
  created_at: string;
  messages: Message[];
  participants: ConversationParticipant[];
  unreadCount?: number;
}