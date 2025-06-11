-- Create the table
create table sections (
  id bigint primary key generated always as identity,
  content text not null,
  creator_id uuid NOT NULL references profiles,
  createdAt timestamptz default now(),
  updatedAt timestamptz default now()
);

alter table sections enable row level security;

-- Only authenticated users can create a section
create policy "Authenticated users can create a section."
  on sections
  for insert
  to authenticated;

-- Sections are only viewable by the users who created them
create policy "Users can view their own sections."
  on sections
  for select
  using ((select auth.uid()) = creator_id);

-- Sections are only editable by the users who created them
create policy "Users can update their own sections."
  on sections
  for update
  using ((select auth.uid()) = creator_id);

-- Sections are only deletable by the users who created them
create policy "Users can delete their own sections."
  on sections
  for delete
  using ((select auth.uid()) = creator_id);
