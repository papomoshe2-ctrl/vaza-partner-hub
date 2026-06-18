-- VAZA Partner Hub — Supabase Schema
-- Run this in the Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ───────────────────────────────────────────────
-- PRODUCTS
-- ───────────────────────────────────────────────
create table if not exists products (
  id               uuid primary key default uuid_generate_v4(),
  name             text not null,
  description_short text,
  description_full  text,
  sku              text unique not null,
  category         text not null,
  tags             text[] default '{}',
  price_store      numeric(10,2) not null,
  price_retail     numeric(10,2) not null,
  profit_per_unit  numeric(10,2) generated always as (price_retail - price_store) stored,
  profit_percent   numeric(5,2)  generated always as (
    case when price_retail > 0
    then round(((price_retail - price_store) / price_retail) * 100, 2)
    else 0 end
  ) stored,
  moq              integer not null default 1,
  stock_quantity   integer not null default 0,
  carton_qty       integer not null default 1,
  brand            text,
  suitable_for     text[] default '{}',
  images           text[] default '{}',
  video_url        text,
  is_new           boolean default false,
  is_featured      boolean default false,
  is_top_seller    boolean default false,
  is_seasonal      boolean default false,
  season           text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger products_updated_at
  before update on products
  for each row execute procedure update_updated_at();

-- ───────────────────────────────────────────────
-- LEADS (CRM)
-- ───────────────────────────────────────────────
create table if not exists leads (
  id                  uuid primary key default uuid_generate_v4(),
  business_name       text not null,
  contact_name        text not null,
  phone               text not null,
  email               text,
  city                text,
  business_type       text not null default 'flower_shop',
  works_with_vaza     boolean default false,
  interested_products uuid[] default '{}',
  notes               text,
  status              text not null default 'new'
    check (status in ('new','in_progress','proposal_sent','closed','not_relevant')),
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create trigger leads_updated_at
  before update on leads
  for each row execute procedure update_updated_at();

-- ───────────────────────────────────────────────
-- PACKAGES
-- ───────────────────────────────────────────────
create table if not exists packages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  description text,
  price       numeric(10,2) not null,
  type        text not null default 'starter'
    check (type in ('starter','growth','premium','holiday','corporate')),
  is_seasonal boolean default false,
  season      text,
  created_at  timestamptz default now()
);

create table if not exists package_products (
  package_id uuid references packages(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity   integer not null default 1,
  primary key (package_id, product_id)
);

-- ───────────────────────────────────────────────
-- CATEGORIES (static seed reference)
-- ───────────────────────────────────────────────
create table if not exists categories (
  id    text primary key,
  label text not null,
  emoji text,
  sort  integer default 0
);

insert into categories (id, label, emoji, sort) values
  ('chocolates',  'שוקולדים',      '🍫', 1),
  ('wines',       'יינות',         '🍷', 2),
  ('gift_sets',   'מארזי מתנה',    '🎁', 3),
  ('desserts',    'קינוחים',       '🧁', 4),
  ('cakes',       'עוגות',         '🎂', 5),
  ('cookies',     'עוגיות',        '🍪', 6),
  ('crackers',    'קרקרים',        '🧇', 7),
  ('tea',         'תה וחליטות',    '🍵', 8),
  ('accessories', 'אביזרי מתנה',   '🎀', 9),
  ('romantic',    'מוצרים רומנטיים','❤️', 10),
  ('newborn',     'יולדת',         '👶', 11),
  ('birthday',    'ימי הולדת',     '🎈', 12),
  ('holidays',    'חגים',          '✨', 13),
  ('rosh_hashana','ראש השנה',      '🍯', 14),
  ('pesach',      'פסח',           '🍷', 15),
  ('valentines',  'ולנטיין',       '💝', 16),
  ('tu_beav',     'ט"ו באב',       '🌹', 17),
  ('b2b',         'B2B',           '🏢', 18)
on conflict do nothing;

-- ───────────────────────────────────────────────
-- CONTACT FORM SUBMISSIONS
-- ───────────────────────────────────────────────
create table if not exists contact_submissions (
  id            uuid primary key default uuid_generate_v4(),
  business_name text not null,
  contact_name  text not null,
  phone         text not null,
  email         text,
  city          text,
  message       text,
  created_at    timestamptz default now()
);

-- ───────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ───────────────────────────────────────────────

-- Products: public read, admin write
alter table products enable row level security;
create policy "products_public_read" on products for select using (true);
create policy "products_admin_write" on products for all
  using (auth.role() = 'authenticated');

-- Leads: admin only
alter table leads enable row level security;
create policy "leads_admin_only" on leads for all
  using (auth.role() = 'authenticated');

-- Packages: public read
alter table packages enable row level security;
create policy "packages_public_read" on packages for select using (true);
create policy "packages_admin_write" on packages for all
  using (auth.role() = 'authenticated');

-- Categories: public read
alter table categories enable row level security;
create policy "categories_public_read" on categories for select using (true);

-- Contact: public insert
alter table contact_submissions enable row level security;
create policy "contact_public_insert" on contact_submissions for insert
  with check (true);
create policy "contact_admin_read" on contact_submissions for select
  using (auth.role() = 'authenticated');

-- ───────────────────────────────────────────────
-- SEED — sample products
-- ───────────────────────────────────────────────
insert into products (name, description_short, description_full, sku, category, tags, price_store, price_retail, moq, stock_quantity, carton_qty, brand, suitable_for, is_featured, is_top_seller) values
(
  'שוקולד בלגי פרימיום',
  'שוקולד בלגי שחור 70% קקאו באריזת מתנה',
  'שוקולד בלגי פרימיום 70% קקאו, אריזת מתנה יפהפייה המתאימה לכל אירוע.',
  'CHOC-001', 'chocolates', array['שוקולד','בלגי','פרימיום'],
  28, 55, 12, 240, 24, 'Belgian Premium',
  array['flowers','gift_sets','newborn','birthday'],
  true, true
),
(
  'יין אדום בוטיק גבעות',
  'יין אדום בוטיק ישראלי יבול 2021',
  'יין אדום בוטיק מגפן ישראלית נבחרת. טעמים עמוקים של פירות יער.',
  'WINE-001', 'wines', array['יין','אדום','בוטיק'],
  65, 120, 6, 120, 6, 'גבעות',
  array['gift_sets','catering','corporate'],
  true, true
),
(
  'מארז מתנה יוקרה',
  'מארז כולל שוקולד, תה ועוגיות בקופסת עץ',
  'מארז מתנה יוקרתי בקופסת עץ ממוחזרת.',
  'GIFT-001', 'gift_sets', array['מארז','מתנה','יוקרה'],
  85, 160, 6, 80, 6, 'VAZA Collection',
  array['flowers','gift_sets','catering','corporate','employees'],
  true, false
);
