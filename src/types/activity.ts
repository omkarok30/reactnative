export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  date: string;
  time_slot: string;
  status: ReservationStatus;
  total_amount: number;
  date_time_end?: string;
  viewed: boolean;
  address?: string;
  instructions?: string;
  client_id: string;
  service?: {
    title: string;
    provider: {
      first_name: string;
      last_name: string;
    };
    provider_id: string;
  };
}