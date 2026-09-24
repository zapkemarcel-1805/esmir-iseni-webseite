-- ESMIR ISENI – Datenbankschema für das Terminanfragesystem
-- Ausführen im Supabase SQL-Editor (Projekt → SQL Editor → New query)

create extension if not exists "pgcrypto";

create type booking_status as enum ('PENDING', 'CONFIRMED', 'DECLINED', 'EXPIRED');

create table if not exists booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,

  service text not null check (
    service in ('sportwagenvermietung', 'autoaufbereitung', 'fahrzeugankauf', 'fahrzeugverkauf')
  ),

  requested_date date not null,
  requested_time time not null,

  vehicle jsonb,          -- Fahrzeugdaten (z.B. bei Vorauswahl aus Fahrzeugkarte oder Fahrzeugankauf)
  message text,

  status booking_status not null default 'PENDING',

  -- Es werden NIEMALS die rohen Tokens gespeichert, nur ihre SHA-256 Hashes.
  confirm_token_hash text not null,
  decline_token_hash text not null,
  token_expires_at timestamptz not null,

  decided_at timestamptz,

  confirm_email_sent boolean not null default false,
  decline_email_sent boolean not null default false,
  receipt_email_sent boolean not null default false,
  owner_notified_at timestamptz,

  -- Für Kollisionsschutz bei derselben Ressource (Dienstleistung + ggf. Fahrzeug)
  resource_key text generated always as (
    coalesce(service, '') || '|' || coalesce(vehicle->>'model', '') || '|' ||
    requested_date::text || '|' || requested_time::text
  ) stored
);

create index if not exists idx_booking_requests_status on booking_requests (status);
create index if not exists idx_booking_requests_date on booking_requests (requested_date);
create index if not exists idx_booking_requests_email on booking_requests (email);

-- Verhindert, dass zwei Anfragen für DIESELBE Dienstleistung/Fahrzeug + Datum/Uhrzeit
-- gleichzeitig CONFIRMED sein können (echte doppelte Terminvergabe der begrenzten Ressource).
-- Mehrere PENDING-Anfragen für denselben Slot sind weiterhin möglich, wie gefordert.
create unique index if not exists uniq_confirmed_slot
  on booking_requests (resource_key)
  where status = 'CONFIRMED';

-- Row Level Security aktivieren — Zugriff ausschließlich über den
-- Service-Role-Key aus den serverseitigen API-Routen, niemals vom Client direkt.
alter table booking_requests enable row level security;

-- Es wird bewusst KEINE Policy für anon/authenticated angelegt:
-- Der Service-Role-Key umgeht RLS ohnehin (für die API-Routen),
-- ein direkter Zugriff vom Browser aus ist damit ausgeschlossen.
