create type public.account_type as enum ('entreprise','particulier');
create type public.app_role as enum ('admin','user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  account_type public.account_type not null default 'particulier',
  full_name text,
  company_name text,
  siret text,
  team_size text,
  specialty text,
  city text,
  plan text not null default 'gratuit',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles read" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  category text not null default 'portfolio',
  tier text not null default 'gratuit',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.templates to anon, authenticated;
grant all on public.templates to service_role;
alter table public.templates enable row level security;
create policy "published templates public" on public.templates for select to anon, authenticated using (is_published);
create policy "admins manage templates" on public.templates for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  template_id uuid references public.templates(id) on delete set null,
  name text not null,
  kind text not null default 'site',
  status text not null default 'brouillon',
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "own projects" on public.projects for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create table public.api_keys (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  label text not null,
  key_prefix text not null,
  key_hash text not null,
  trial_ends_at timestamptz not null default (now() + interval '30 days'),
  plan text not null default 'essai',
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.api_keys to authenticated;
grant all on public.api_keys to service_role;
alter table public.api_keys enable row level security;
create policy "own api keys" on public.api_keys for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create table public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 255),
  organization text not null check (char_length(organization) between 2 and 160),
  partner_type text not null,
  website text,
  message text check (char_length(message) <= 3000),
  status text not null default 'en_attente',
  created_at timestamptz not null default now()
);
grant insert on public.partner_applications to anon, authenticated;
grant select on public.partner_applications to authenticated;
grant all on public.partner_applications to service_role;
alter table public.partner_applications enable row level security;
create policy "anyone can apply" on public.partner_applications for insert to anon, authenticated with check (status = 'en_attente');
create policy "admins read applications" on public.partner_applications for select to authenticated using (public.has_role(auth.uid(),'admin') or auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, account_type, full_name, company_name, siret, team_size, specialty, city)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'account_type','')::public.account_type, 'particulier'),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'siret',
    new.raw_user_meta_data->>'team_size',
    new.raw_user_meta_data->>'specialty',
    new.raw_user_meta_data->>'city'
  );
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

insert into public.templates (slug, name, description, category, tier) values
 ('monolithe','Monolithe','Grille stricte, grandes photographies pleine page, typographie serif.','portfolio','gratuit'),
 ('atrium','Atrium','Mise en page centrée sur un projet phare et ses plans.','portfolio','essentiel'),
 ('trame','Trame','Index de projets filtrable par typologie et par année.','catalogue','pro'),
 ('beton','Béton','Studio plus brut, grandes coupes, sobriété totale.','studio','pro');